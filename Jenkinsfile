pipeline {
    agent {label 'docker-agent'}

    stages {
        stage('Image Build and Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'b502b9f2-5251-4b52-83ea-fdd19e840cf7', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh '''
                            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" docker.io --password-stdin 
                            cd backend
                            docker build -t pm-backend .
                            docker tag pm-backend znxare/pm-backend:latest
                            docker push znxare/pm-backend:latest
                        '''
                    }
                }
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['EC2_credential']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ec2-user@$EC2_IP <<EOF
                        sudo docker pull znxare/pm-backend:latest
                        sudo docker kill pm-backend
                        sudo docker rm pm-backend
                        sudo docker run -d --name pm-backend -p 8000:8000 -e PORT=$PORT -e DATABASE_URL=$DATABASE_URL -e JWT_SECRET=$JWT_SECRET -e CRYPTR_SECRET=$CRYPTR_SECRET -e AWS_REGION=$AWS_REGION -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY znxare/pm-backend:latest
                    """
                }
            }
        }
    }
}
