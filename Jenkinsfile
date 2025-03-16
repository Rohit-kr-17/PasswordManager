pipeline {
    agent { label 'docker-agent' }

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-credentials'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: '8b206e77-4dac-4354-94e9-f3256f99e348', url: 'https://github.com/Rohit-kr-17/PasswordManager.git'
            }
        }
        stage('Image Build and Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh '''
                            sudo su
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                            cd backend
                            docker build -t pm-backend .
                            docker tag pm-backend $DOCKER_USER/pm-backend:trial
                            docker push $DOCKER_USER/pm-backend:trial
                        '''
                    }
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['EC2_credential']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@65.0.122.237
                        sudo docker stop pm-backend
                        sudo docker rm pm-backend
                        sudo docker rmi znxare/pm-backend:latest
                        sudo docker pull znxare/pm-backend:latest
                    """
                }
            }
        }
    }
}
