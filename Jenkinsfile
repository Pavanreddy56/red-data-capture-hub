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
                withSonarQubeEnv('SonarQube') {
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

        stage('Scan with Trivy (Filesystem)') {
            steps {
                sh '''
                mkdir -p .trivy-cache
                docker run --rm \
                    -v "$WORKSPACE:/app" \
                    -v "$WORKSPACE/.trivy-cache:/root/.cache/" \
                    aquasec/trivy fs /app | tee trivyfs.txt
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

        stage("Trivy Image Scan") {
            steps {
                script {
                    sh '''
                    docker run \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy image pavanreddych/red-data-capture-hub:latest \
                        --no-progress --scanners vuln \
                        --exit-code 0 \
                        --severity HIGH,CRITICAL \
                        --format table > trivyimage.txt
                    '''
                }
            }
        }
    }

    post {
        always {
            emailext attachLog: true,
                subject: "'${currentBuild.result}'",
                body: "Project: ${env.JOB_NAME}<br/>" +
                      "Build Number: ${env.BUILD_NUMBER}<br/>" +
                      "URL: ${env.BUILD_URL}<br/>",
                to: 'pavanreddy56177@gmail.com',                              
                attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
            
            cleanWs()
        }
    }
}
