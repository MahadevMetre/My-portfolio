pipeline {
    agent any

    parameters {
        choice(
            name: 'BRANCH_NAME',
            choices: ['try-skills-slider', 'skills-carosoul', '3D-skills', 'staging'],
            description: 'Select Git branch to deploy'
        )
    }

    environment {
        IMAGE_NAME = "my-portfolio"
        CONTAINER_NAME = "my-portfolio-container"
        PORT = "8081"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH_NAME}"]],
                    userRemoteConfigs: [[url: 'https://github.com/YOUR_GITHUB_USERNAME/My-portfolio.git']]
                ])
            }
        }

        stage('Cleanup Old Container') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                docker rmi ${IMAGE_NAME}:latest || true
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${params.BRANCH_NAME} ."
            }
        }

        stage('Deploy Container') {
            steps {
                sh """
                docker run -d -p ${PORT}:80 \
                --name ${CONTAINER_NAME} \
                ${IMAGE_NAME}:${params.BRANCH_NAME}
                """
            }
        }
    }
}
