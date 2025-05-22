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
                    sh 'echo "htmlhint"'

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
