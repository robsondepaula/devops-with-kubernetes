/*
Copyright 2021.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controllers

import (
	"context"
	"math/rand"
	"time"

	v1 "k8s.io/api/apps/v1"
	core "k8s.io/api/core/v1"
	kmeta "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	stablev1 "github.com/robsondepaula/devops-with-kubernetes/part5/5_01/controller/api/v1"
)

// DummySiteReconciler reconciles a DummySite object
type DummySiteReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

const charset = "abcdefghijklmnopqrstuvwxyz0123456789"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func (r *DummySiteReconciler) createDummySiteDeployment(ctx context.Context, dummySite *stablev1.DummySite) (*v1.Deployment, error) {
	deploymentName := "dummysite-dep-" + StringWithCharset(8, charset)
	numReplicas := int32(1)
	deployment := &v1.Deployment{
		ObjectMeta: kmeta.ObjectMeta{
			Namespace: dummySite.Namespace,
			Name:      deploymentName,
		},
		Spec: v1.DeploymentSpec{
			Replicas: &numReplicas,
			Selector: &kmeta.LabelSelector{
				MatchLabels: map[string]string{
					"stable.devopswithkubernetes.com/deployment-name": deploymentName,
				},
			},
			Template: core.PodTemplateSpec{
				ObjectMeta: kmeta.ObjectMeta{
					Labels: map[string]string{
						"stable.devopswithkubernetes.com/deployment-name": deploymentName,
					},
				},
				Spec: core.PodSpec{
					Containers: []core.Container{
						{
							Name:            "dummy",
							Image:           dummySite.Spec.Image,
							ImagePullPolicy: "Always",
							Env: []core.EnvVar{
								{
									Name:  "WEBSITE_URL",
									Value: dummySite.Spec.WebsiteURL,
								},
							},
							Ports: []core.ContainerPort{
								{
									ContainerPort: int32(5000),
								},
							},
						},
					},
				},
			},
		},
	}

	if err := ctrl.SetControllerReference(dummySite, deployment, r.Scheme); err != nil {
		return nil, err
	}

	return deployment, nil
}

//+kubebuilder:rbac:groups=stable.devopswithkubernetes.com,resources=dummysites,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=stable.devopswithkubernetes.com,resources=dummysites/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=stable.devopswithkubernetes.com,resources=dummysites/finalizers,verbs=update
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;delete

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the DummySite object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.10.0/pkg/reconcile
func (r *DummySiteReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	dummySite := stablev1.DummySite{}
	if err := r.Get(ctx, req.NamespacedName, &dummySite); err != nil {
		logger.Error(err, "Failed to fetch DummySite!")
		return ctrl.Result{}, nil
	}
	logger.Info("A new DummySite started reconciling...", "website_url=", dummySite.Spec.WebsiteURL, "image=", dummySite.Spec.Image)

	deployment, err := r.createDummySiteDeployment(ctx, &dummySite)
	if err != nil {
		logger.Info("Unable to create deployment from template")
		return ctrl.Result{}, err
	}

	if err := r.Create(ctx, deployment); err != nil {
		logger.Info("Unable to create Deployment for DummySite")
		return ctrl.Result{}, err
	}

	logger.Info("Created Deployment for DummySite")

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *DummySiteReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&stablev1.DummySite{}).
		Complete(r)
}
