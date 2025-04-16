pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                script {
                    def testExists = fileExists('package.json') && sh(script: "npm run | grep test", returnStatus: true) == 0
                    if (testExists) {
                        sh 'npm test'
                    } else {
                        echo 'Test stage skipped – no test script found'
                    }
                }
            }
        }
    }
}
