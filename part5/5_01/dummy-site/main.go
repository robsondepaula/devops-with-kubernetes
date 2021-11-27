package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"os"
	"os/exec"

	"github.com/gorilla/mux"
)

func GetFolderName(websiteUrl string) (string, error) {

	parsedUrl, err := url.Parse(websiteUrl)

	if err == nil {
		folderName := parsedUrl.Hostname()

		return folderName, nil
	}

	return "", err
}

func GetHealth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	fmt.Fprintf(w, "service is healthy")
}

func GetLive(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	fmt.Fprintf(w, "service is live")
}

func GetReady(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)

	fmt.Fprintf(w, "service is ready")
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/healthz", GetHealth).Methods("GET")
	router.HandleFunc("/livez", GetLive).Methods("GET")
	router.HandleFunc("/readyz", GetReady).Methods("GET")

	websiteUrl, exists := os.LookupEnv("WEBSITE_URL")
	if exists {
		fmt.Printf("Retrieved WEBSITE_URL=%s\n", websiteUrl)

		goPath := os.Getenv("GOPATH")
		cmd := exec.Command(goPath+"/bin/goclone", websiteUrl)
		err := cmd.Run()
		if err != nil {
			fmt.Printf("Failed to clone %s\n", websiteUrl)
		} else {
			folderName, err := GetFolderName(websiteUrl)
			if err != nil {
				fmt.Printf("Failed to clone %s\n", websiteUrl)
			} else {
				cmd := exec.Command(goPath+"/bin/goclone", "-s", folderName)
				err := cmd.Start()
				if err != nil {
					fmt.Printf("Failed to serve %s\n", folderName)
					log.Fatal(err)
				}

				cmd.Wait()
			}
		}
	} else {
		fmt.Printf("Failed to retrieve WEBSITE_URL from environment!\n")
	}

	http.ListenAndServe(":8080", router)
}
