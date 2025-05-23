pipeline {
    agent any
    tools { 
        jdk 'jdk17'
        nodejs 'node16'

    }
    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        APP_NAME = "red-data-capture-hub"
        RELEASE = "1.0.0"
        DOCKER_USER = "pavanreddych"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"

    }
    
}
