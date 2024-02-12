pipeline {
    agent any

    environment {
        // Define environment variables if needed
        DOCKER_IMAGE = 'tom455/delaychecker'
    }

    stages {
        stage('Checkout') {
            steps {
                // Check out the source code from GitHub using SSH
                checkout([$class: 'GitSCM', branches: [[name: '*/6issues#6']], userRemoteConfigs: [[url: 'git@github.com:tds455/DelayChecker.git']]])
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile in the repository
                script {
                    docker.build("${DOCKER_IMAGE}", '.')
                }
            }
        }


        stage('Run Docker Container') {
            steps {
                // Run the Docker container
                script {
                    // Remove existing container 
                    sh 'docker container rm -f delay-checker-container'

                    // Run new container 
                    docker.image("${DOCKER_IMAGE}").run("-p 80:80 --name delay-checker-container-" )

                    // Remove unused images
                    sh 'docker image prune -f'
                }
            }
        }
    }

}