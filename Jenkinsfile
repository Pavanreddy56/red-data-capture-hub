pipeline {
    agent any
    tools { 
        jdk 'jdk17'
        nodejs 'node18'
    }
    environment {
        SCANNER_HOME = tool 'Sonar-Scanner'
        APP_NAME = "red-data-capture-hub"
        RELEASE = "1.0.0"
        DOCKER_USER = "pavanreddych"
        DOCKER_PASS = 'DOCKER-HUB'
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
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
                withSonarQubeEnv('SonarQube-server') {
                    sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectName=red-data-capture-hub \
                    -Dsonar.projectKey=red-data-capture-hub
                    '''
                }
            }
        }

        stage("Quality Gate") {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonarqube-token'
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
        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
    }
}
