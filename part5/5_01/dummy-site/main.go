package main

import (
	"fmt"
	"net/url"
	"os"
	"os/exec"
)

func GetFolderName(websiteUrl string) (string, error) {

	parsedUrl, err := url.Parse(websiteUrl)

	if err == nil {
		folderName := parsedUrl.Hostname()

		return folderName, nil
	}

	return "", err
}

func main() {
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
				err := cmd.Run()
				if err != nil {
					fmt.Printf("Failed to serve %s\n", folderName)
				}
			}
		}
	} else {
		fmt.Printf("Failed to retrieve WEBSITE_URL from environment!\n")
	}
}
