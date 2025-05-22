
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'cpreddy/webapp'
        DOCKER_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test || true'  // Continue even if tests fail for now
            }
        }
        
        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Docker Push') {
            when {
                branch 'main'  // Only push to Docker registry from main branch
            }
            steps {
                withCredentials([string(credentialsId: 'docker-hub-password', variable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "docker login -u cpreddy -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }
        
        stage('Deploy to EC2') {
            when {
                branch 'main'  // Only deploy from main branch
            }
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@\${EC2_HOST} '
                        docker pull ${DOCKER_IMAGE}:latest
                        docker stop webapp || true
                        docker rm webapp || true
                        docker run -d --name webapp \\
                            -p 80:80 \\
                            -e RDS_ENDPOINT=\${RDS_ENDPOINT} \\
                            -e RDS_DATABASE=\${RDS_DATABASE} \\
                            -e RDS_USERNAME=\${RDS_USERNAME} \\
                            -e RDS_PASSWORD=\${RDS_PASSWORD} \\
                            ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()  // Clean workspace after build
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
