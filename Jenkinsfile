pipeline {
    agent any
    tools { 
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        SCANNER_HOME = tool 'Sonar-Scanner'
        APP_NAME = "red-data-capture-hub"
        RELEASE = "1.0.0"
        DOCKER_USER = "pavanreddych"
        DOCKER_PASS = 'DOCKER-HUB'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }
    stages {
        stage('clean workspace') {
            steps {
                cleanWs()
            }
        } 
      }
    } 

