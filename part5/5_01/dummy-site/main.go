package main

import (
	"fmt"
	"os"
)

func main() {
	websiteUrl, exists := os.LookupEnv("WEBSITE_URL")
	if exists {
		fmt.Printf("Retrieved WEBSITE_URL=%s\n", websiteUrl)
	} else {
		fmt.Printf("Failed to retrieve WEBSITE_URL from environment!\n")
	}
}
