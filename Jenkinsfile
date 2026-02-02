pipeline {
    agent any

    environment {
        APP_NAME = 'modelv2-app'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('modelv2-app') {
                    sh "docker build -t ${APP_NAME}:${BUILD_NUMBER} -t ${APP_NAME}:latest ."
                }
            }
        }

        stage('Run Container') {
            steps {
                sh """
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d --name ${APP_NAME} -p 3305:3305 --restart unless-stopped ${APP_NAME}:latest
                """
             }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "App is running at http://172.21.79.32:3305"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
