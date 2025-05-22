pipeline {
    agent any

    environment {
        SONARQUBE = 'SonarQube'  // name in Jenkins global config
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Pavanreddy56/red-data-capture-hub.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                           sonar-scanner \
                           -Dsonar.projectKey=html-css-app \
                             -Dsonar.sources=. \
                           -Dsonar.host.url=http://13.203.212.216:9000 \
                           -Dsonar.login=sqa_061cc65428d4b59c00a3346909d07eb3baeccb97
                           '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t html-css-app .'
            }
        }

        stage('Deploy App') {
            steps {
                sh '''
                    docker rm -f html-css-container || true
                    docker run -d --name html-css-container -p 80:80 html-css-app
                '''
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        docker login -u $USERNAME -p $PASSWORD
                        docker tag html-css-app $USERNAME/html-css-app:latest
                        docker push $USERNAME/html-css-app:latest
                    '''
                }
            }
        }
    } // 👈 Correctly closed "stages"
} // 👈 Correctly closed "pipeline"
