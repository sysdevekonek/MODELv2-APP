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

        stage('Install Dependencies') {
            steps {
                dir('modelv2-app') {
                    bat 'npm ci'
                }
            }
        }

        stage('Lint') {
            steps {
                dir('modelv2-app') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Build Application') {
            steps {
                dir('modelv2-app') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('modelv2-app') {
                    bat "docker build -t ${APP_NAME}:${BUILD_NUMBER} -t ${APP_NAME}:latest ."
                }
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS% ${DOCKER_REGISTRY}
                        docker tag ${APP_NAME}:${BUILD_NUMBER} ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER}
                        docker tag ${APP_NAME}:latest ${DOCKER_REGISTRY}/${APP_NAME}:latest
                        docker push ${DOCKER_REGISTRY}/${APP_NAME}:${BUILD_NUMBER}
                        docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Deploying to Development environment...'
                // Add your deployment commands here
                // Example: bat 'kubectl apply -f k8s/dev/'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy'
                echo 'Deploying to Production environment...'
                // Add your deployment commands here
                // Example: bat 'kubectl apply -f k8s/prod/'
            }
        }
    }

    post {
        always {
            bat "docker rmi ${APP_NAME}:${BUILD_NUMBER} || exit 0"
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            // Add notification here (email, Slack, etc.)
        }
    }
}
