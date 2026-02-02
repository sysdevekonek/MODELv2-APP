pipeline {
    agent any

    environment {
        APP_NAME = 'modelv2-app'
        DOCKER_IMAGE = "${APP_NAME}:${BUILD_NUMBER}"
        DOCKER_REGISTRY = 'your-registry.com'  // Update with your registry
        DOCKER_CREDENTIALS_ID = 'docker-credentials'  // Update with your Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            when {
                branch 'deployment'
            }
            steps {
                dir('modelv2-app') {
                    sh "docker build -t ${APP_NAME}:${BUILD_NUMBER} -t ${APP_NAME}:latest ."
                }
            }
        }

        stage('Run Container') {
            when {
                branch 'deployment'
            }
            steps {
                sh """
                    docker stop ${APP_NAME} || true
                    docker rm ${APP_NAME} || true
                    docker run -d --name ${APP_NAME} -p 3305:3305 --restart unless-stopped ${APP_NAME}:latest
                """
            }
        }

        stage('Push to Registry') {
            when {
                branch 'deployment'
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        docker login -u \$DOCKER_USER -p \$DOCKER_PASS ${DOCKER_REGISTRY}
                        docker tag ${APP_NAME}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER}
                        docker tag ${APP_NAME}:latest ${DOCKER_REGISTRY}/${APP_NAME}:latest
                        docker push ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest
                    """
                }
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
