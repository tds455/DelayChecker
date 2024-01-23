pipeline {
    agent any

    environment {
        // Define environment variables if needed
        DOCKER_IMAGE = 'delaychecker'
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from GitHub using SSH
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'git@github.com:tds455/DelayChecker.git']]])
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile in the repository
                script {
                    docker.build("${DOCKER_IMAGE}:${BUILD_ID}", '.')
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                script {
                    docker.image("${DOCKER_IMAGE}:${BUILD_ID}").run("-p 80:80 --name delay-checker-container")
                }
            }
        }
    }

}