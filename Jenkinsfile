pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'cpreddy/webapp'
        DOCKER_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        RDS_ENDPOINT = credentials('database.czy2egy4azhp.ap-south-1.rds.amazonaws.com')
        RDS_DATABASE = credentials('rds credentials')
        RDS_USERNAME = credentials('database')
        RDS_PASSWORD = credentials('Pavanreddy56')
        SONARQUBE_SERVER = 'SonarQube'  // Name of SonarQube server in Jenkins Global Tool Configuration
        
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Code Analysis - SonarQube') {
            steps {
                withSonarQubeEnv("${SonarQube}") {
                    sh "sonar-scanner -Dsonar.projectKey=webapp -Dsonar.sources=. -Dsonar.host.url=$http://3.110.207.144:9000/ -Dsonar.login=$squ_6c7d509b72b17f9223cfe498cadb553a1c096d00"
                }
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
                sh 'npm test'
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
                branch 'production'
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
                branch 'production'
            }
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@your-ec2-ip '
                        docker pull ${DOCKER_IMAGE}:latest
                        docker stop webapp || true
                        docker rm webapp || true
                        docker run -d --name webapp \\
                            -p 80:80 \\
                            -e RDS_ENDPOINT=${RDS_ENDPOINT} \\
                            -e RDS_DATABASE=${RDS_DATABASE} \\
                            -e RDS_USERNAME=${RDS_USERNAME} \\
                            -e RDS_PASSWORD=${RDS_PASSWORD} \\
                            ${DOCKER_IMAGE}:latest
                        '
                    """
                }
            }
        }

        stage('Prometheus Metrics Config') {
            when {
                branch 'production'
            }
            steps {
                echo 'Ensure your application exposes /metrics endpoint.'
                echo 'Prometheus will scrape metrics from the EC2 instance.'
            }
        }

        stage('Grafana Dashboard Setup') {
            when {
                branch 'production'
            }
            steps {
                echo 'Grafana should be connected to Prometheus as a data source.'
                echo 'Dashboards can be imported manually or via provisioning.'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build or deployment failed!'
        }
    }
}
