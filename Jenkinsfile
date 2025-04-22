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
                script {
                    docker.image('node:18').inside {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    if (packageJson.scripts?.test) {
                        docker.image('node:18').inside {
                            sh 'npm test'
                        }
                    } else {
                        echo 'Test stage skipped no test script found'
                    }
                }
            }
        }
    }
}