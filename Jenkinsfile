pipeline {
    agent any
    
    environment {
        // Define global environment variables
        PROJECT_NAME = 'portfolio-website'
        DOCKER_REGISTRY = 'your-docker-registry' // Replace with your Docker registry
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_COMMIT_SHORT = sh(
            script: "git rev-parse --short HEAD",
            returnStdout: true
        ).trim()
    }
    
    tools {
        nodejs 'Node 20'
        dockerTool 'docker'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git submodule update --init --recursive'
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    // Install dependencies for all services
                    sh '''
                        npm ci
                        cd backend && npm ci
                    '''
                }
            }
        }
        
        stage('Lint and Style Checks') {
            parallel {
                stage('Frontend Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Backend Lint') {
                    steps {
                        sh 'cd backend && npm run lint'
                    }
                }
            }
        }
        
        stage('Unit Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        sh 'npm test'
                    }
                    post {
                        always {
                            junit 'junit-frontend.xml'
                        }
                    }
                }
                stage('Backend Tests') {
                    steps {
                        sh 'cd backend && npm test'
                    }
                    post {
                        always {
                            junit 'backend/junit-backend.xml'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build frontend image
                    docker.build("${PROJECT_NAME}-frontend:${GIT_COMMIT_SHORT}", "-f Dockerfile .")
                    
                    // Build backend image
                    docker.build("${PROJECT_NAME}-backend:${GIT_COMMIT_SHORT}", "-f backend/Dockerfile backend")
                    
                    // Build Nginx image
                    docker.build("${PROJECT_NAME}-nginx:${GIT_COMMIT_SHORT}", "-f nginx/Dockerfile nginx")
                }
            }
        }
        
        stage('Integration Tests') {
            steps {
                script {
                    // Use docker-compose for integration testing
                    sh '''
                        docker-compose -f docker-compose.yml up -d
                        sleep 30 # Wait for services to start
                        
                        # Run integration tests
                        docker-compose exec -T frontend npm run test:integration
                        docker-compose exec -T backend npm run test:integration
                        
                        docker-compose down
                    '''
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        // Push frontend image
                        docker.image("${PROJECT_NAME}-frontend:${GIT_COMMIT_SHORT}").push()
                        docker.image("${PROJECT_NAME}-frontend:${GIT_COMMIT_SHORT}").push('latest')
                        
                        // Push backend image
                        docker.image("${PROJECT_NAME}-backend:${GIT_COMMIT_SHORT}").push()
                        docker.image("${PROJECT_NAME}-backend:${GIT_COMMIT_SHORT}").push('latest')
                        
                        // Push Nginx image
                        docker.image("${PROJECT_NAME}-nginx:${GIT_COMMIT_SHORT}").push()
                        docker.image("${PROJECT_NAME}-nginx:${GIT_COMMIT_SHORT}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Example deployment to a staging environment
                    sh '''
                        ssh staging-server "
                            cd /path/to/staging/deployment
                            docker-compose pull
                            docker-compose down
                            docker-compose up -d
                        "
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Blue-Green deployment strategy
                    sh '''
                        ssh production-server "
                            cd /path/to/production/deployment
                            docker-compose -f docker-compose.prod.yml pull
                            docker-compose -f docker-compose.prod.yml down blue
                            docker-compose -f docker-compose.prod.yml up -d green
                            # Run health checks
                            # If green is healthy, switch traffic
                            # If not, roll back to blue
                        "
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up Docker resources
            sh '''
                docker system prune -f
                docker volume prune -f
            '''
            
            // Archive build artifacts
            archiveArtifacts artifacts: 'build/**,backend/build/**', fingerprint: true
            
            // Send notifications
            script {
                if (currentBuild.result == 'FAILURE') {
                    emailext (
                        subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                        body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
                        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
                        to: 'your-email@example.com'
                    )
                }
            }
        }
        
        cleanup {
            // Ensure complete workspace cleanup
            cleanWs()
        }
    }
}
