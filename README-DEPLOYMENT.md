
# C.P REDDY IT SOLUTIONS - Deployment Guide

This document outlines the complete process for deploying the C.P REDDY IT SOLUTIONS application using a DevOps pipeline with Git, Jenkins, Docker, AWS EC2, and AWS RDS.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Architecture Overview](#architecture-overview)
- [Step 1: Set Up AWS Resources](#step-1-set-up-aws-resources)
- [Step 2: Set Up Git Repository](#step-2-set-up-git-repository)
- [Step 3: Set Up Jenkins](#step-3-set-up-jenkins)
- [Step 4: Configure Docker](#step-4-configure-docker)
- [Step 5: Create CI/CD Pipeline](#step-5-create-cicd-pipeline)
- [Step 6: Database Migration](#step-6-database-migration)
- [Step 7: Application Configuration](#step-7-application-configuration)
- [Troubleshooting](#troubleshooting)
- [Maintenance](#maintenance)

## Prerequisites

Before starting the deployment process, ensure you have:

- AWS account with necessary permissions
- Git installed locally
- Docker installed locally (for testing)
- Domain name (optional, but recommended for production)

## Architecture Overview

The deployment architecture consists of:
- **Frontend**: React application deployed on EC2 with Docker
- **Database**: AWS RDS (MySQL/PostgreSQL) for storing form submissions
- **CI/CD**: Jenkins for automated build and deployment
- **Version Control**: Git for source code management
- **Container**: Docker for consistent deployment environments

## Step 1: Set Up AWS Resources

### 1.1 Create RDS Instance

1. Log in to the AWS Management Console
2. Navigate to RDS service
3. Click "Create database"
4. Select database engine (MySQL or PostgreSQL recommended)
5. Configure settings:
   - Instance identifier: `cp-reddy-db`
   - Master username: `admin` (use a strong username in production)
   - Master password: Create a secure password
   - Instance size: Choose appropriate for your workload (db.t3.micro for testing)
   - Storage: Start with 20 GB (can be increased later)
   - Enable storage autoscaling
   - VPC: Use default VPC or create a new one
   - Subnet group: Create new or use existing
   - Public accessibility: No (for security)
   - VPC security group: Create new or use existing (ensure it allows traffic from EC2)
   - Database name: `cpreddy_data`
   - Parameter group: Default
   - Encryption: Enable
   - Backup: Enable with 7-day retention
   - Monitoring: Enable enhanced monitoring
6. Click "Create database"
7. Note the endpoint URL, database name, username, and password

### 1.2 Create EC2 Instance

1. Navigate to EC2 service in AWS Console
2. Click "Launch Instance"
3. Select an Amazon Linux 2 AMI
4. Choose instance type (t2.micro for testing, t2.small or larger for production)
5. Configure instance details:
   - Network: Same VPC as RDS
   - Auto-assign Public IP: Enable
   - IAM role: Create a role with permissions for EC2, RDS, and other required services
6. Add storage (at least 20 GB)
7. Add tags (Key: Name, Value: cp-reddy-app-server)
8. Configure security group:
   - Allow SSH (port 22) from your IP
   - Allow HTTP (port 80) from anywhere
   - Allow HTTPS (port 443) from anywhere
   - Allow custom TCP on the port your app runs (e.g., 3000) from anywhere
9. Review and launch
10. Create or select a key pair, download it, and secure it
11. Launch the instance

### 1.3 Configure Security Groups

Ensure the RDS security group allows inbound traffic from the EC2 security group on the database port (3306 for MySQL, 5432 for PostgreSQL).

## Step 2: Set Up Git Repository

### 2.1 Initialize Git Repository

If starting from scratch:

```bash
# Initialize git in your project directory
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"
```

### 2.2 Push to a Remote Repository

Create a repository on GitHub, GitLab, or your preferred Git service, then:

```bash
# Add remote repository
git remote add origin <repository-url>

# Push to remote
git push -u origin main
```

### 2.3 Create Branches

Create branches for development, staging, and production:

```bash
# Create and switch to development branch
git checkout -b development

# Create staging branch
git checkout -b staging

# Create production branch
git checkout -b production

# Push all branches
git push --all
```

## Step 3: Set Up Jenkins

### 3.1 Install Jenkins on EC2

Connect to your EC2 instance:

```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

Install Jenkins:

```bash
# Update system
sudo yum update -y

# Install Java
sudo amazon-linux-extras install java-openjdk11 -y

# Add Jenkins repository
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

# Install Jenkins
sudo yum install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Access Jenkins at http://your-ec2-public-ip:8080 and complete the setup wizard.

### 3.2 Install Required Jenkins Plugins

Navigate to "Manage Jenkins" > "Manage Plugins" > "Available" and install:
- Git Integration
- Docker Pipeline
- Pipeline
- AWS Integration
- Blue Ocean (optional, for better UI)

### 3.3 Configure Jenkins Credentials

In Jenkins, go to "Manage Jenkins" > "Manage Credentials" > "System" > "Global credentials" and add:

1. Git credentials (username/password or SSH key)
2. Docker Hub credentials (if using Docker Hub)
3. AWS credentials (access key and secret key)
4. Database credentials

## Step 4: Configure Docker

### 4.1 Install Docker on EC2

```bash
# Install Docker
sudo yum install docker -y

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### 4.2 Create Dockerfile

Create a Dockerfile in your project root:

```Dockerfile
# Use Node.js as the base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 4.3 Create nginx.conf

```nginx
server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # API proxy if needed
    location /api/ {
        proxy_pass http://your-api-endpoint/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Step 5: Create CI/CD Pipeline

### 5.1 Create Jenkinsfile

Create a Jenkinsfile in your project root:

```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'cpreddy/webapp'
        DOCKER_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
        RDS_ENDPOINT = credentials('rds-endpoint')
        RDS_DATABASE = credentials('rds-database')
        RDS_USERNAME = credentials('rds-username')
        RDS_PASSWORD = credentials('rds-password')
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
```

### 5.2 Create Jenkins Pipeline

1. In Jenkins, click "New Item"
2. Enter a name (e.g., "CPReddy-Pipeline")
3. Select "Pipeline" and click "OK"
4. Configure:
   - Description: Add a meaningful description
   - Pipeline Definition: Select "Pipeline script from SCM"
   - SCM: Git
   - Repository URL: Your Git repository URL
   - Credentials: Select your Git credentials
   - Branch Specifier: */production
   - Script Path: Jenkinsfile
5. Save

### 5.3 Configure Webhook (Optional)

Set up a webhook in your Git repository to trigger the Jenkins pipeline automatically on code changes.

## Step 6: Database Migration

### 6.1 Create Database Schema

Connect to your RDS instance and create the necessary tables:

```sql
CREATE TABLE form_submissions (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    company VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6.2 Configure Database Connection

Ensure your application's configuration includes the correct database connection details from environment variables.

## Step 7: Application Configuration

### 7.1 Create Environment Variables

Update the application to use environment variables for sensitive information. Create a .env file for local development:

```
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_RDS_ENDPOINT=your-rds-endpoint
REACT_APP_RDS_DATABASE=cpreddy_data
REACT_APP_RDS_USERNAME=admin
REACT_APP_RDS_PASSWORD=your-password
```

These variables will be replaced with the Jenkins credentials during deployment.

### 7.2 Update Application Code

Ensure your application properly handles database connections, form submissions, and any other required functionality.

## Troubleshooting

### Common Issues

1. **Jenkins cannot connect to Git**
   - Check credentials
   - Ensure Jenkins has internet access

2. **Docker build fails**
   - Check Dockerfile syntax
   - Ensure all dependencies are available

3. **Deployment to EC2 fails**
   - Check SSH connectivity
   - Verify EC2 security group settings

4. **Database connection issues**
   - Check RDS security group settings
   - Verify connection details
   - Ensure EC2 can reach RDS

### Logs

- Jenkins logs: `/var/log/jenkins/jenkins.log`
- Docker logs: `docker logs webapp`
- Application logs: Check your application's logging mechanism

## Maintenance

### Regular Updates

1. **Security Updates**
   - Regularly update the EC2 instance
   - Update Docker images
   - Keep dependencies updated

2. **Backups**
   - RDS automated backups should be enabled
   - Periodically test backup restoration

3. **Monitoring**
   - Set up CloudWatch alarms for EC2 and RDS
   - Monitor application health

### Scaling

For increased traffic:
1. Increase EC2 instance size
2. Consider using Auto Scaling Groups
3. Implement a load balancer
4. Scale RDS instance accordingly

---

**Note**: This deployment guide is tailored for the C.P REDDY IT SOLUTIONS application. Adjust parameters, credentials, and configurations according to your specific requirements.
