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
                    def packageJson = readJSON file: 'package.json'
                    if (packageJson.scripts?.test) {
                        sh 'npm test'
                    } else {
                        echo 'Test stage skipped, no test script found in package.json'
                    }
                }
            }
        }
    }
}
