pipeline {
    agent any

    environment {
        NODE_VERSION = '18.17.1'
        NODE_DIR = "${env.WORKSPACE}/node"
        PATH = "${env.WORKSPACE}/node/bin:${env.PATH}"
    }

    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    if [ ! -d "$NODE_DIR" ]; then
                        curl -O https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz
                        mkdir -p $NODE_DIR
                        tar -xf node-v$NODE_VERSION-linux-x64.tar.xz --strip-components=1 -C $NODE_DIR
                    fi
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    sh 'npm run build'
                }
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