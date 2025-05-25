pipeline {
    agent any
    tools { 
        jdk 'jdk17'
        nodejs 'node18'
    }
    environment {
        SCANNER_HOME = tool 'SonarScanner'
        APP_NAME = "red-data-capture-hub"
        RELEASE = "1.0.0"
        DOCKER_USER = "pavanreddych"
        DOCKER_CREDENTIALS_ID = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/Pavanreddy56/red-data-capture-hub'
            }
        }

        stage("Sonarqube Analysis") {
            steps {
                withSonarQubeEnv('MySonarQube') {
                    sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=red-data-capture-hub \
                    -Dsonar.projectName=red-data-capture-hub
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                rm -rf node_modules package-lock.json
                npm install
                '''
            }
        }

        stage('Scan with Trivy') {
            steps {
                sh '''
                mkdir -p .trivy-cache
                docker run --rm \
                    -v "$WORKSPACE:/app" \
                    -v "$WORKSPACE/.trivy-cache:/root/.cache/" \
                    aquasec/trivy fs /app
                '''
            }
        }

        stage("Build & Push Docker Image") {
            steps {
                script {
                    def imageTag = "${RELEASE}-${env.BUILD_NUMBER}"
                    def dockerImage = docker.build("${IMAGE_NAME}:${imageTag}")
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }
    }
}
