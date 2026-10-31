
pipeline {
    agent any

options {
        timestamps()
        disableConcurrentBuilds()
    }
environment {
     BACKEND_DIR = 'backend'
     FRONTEND_DIR = 'frontend'
    }
stages {

        stage('1 - Checkout') {
            steps {
                 echo 'Recuperation du projet depuis Github'
                 checkout scm
            }
        }

        stage('2 -Verification environment') {
            steps {
              sh ''' 
                    echo "===JAVA==="
                    java --version
                    echo "===MAVEN==="
                    mvn --version
                    echo "==NODE==="
                    node --version
                    echo "===NPM==="
                    npm --version
                    
                   '''
            }
        }

        stage('3 - BACKEND BUILD') {
            steps {
                 dir("${BACKEND_DIR}"){
                 sh 'mvn -B clean package -DskipTests '
                 }
            }
        }
        stage('4 - BACKEND Tests') {
	   steps{
	    dir("${BACKEND_DIR}"){
	     sh 'mvn -B test'
	    }
	    
	    }
	}
	stage('5 - Frontend Verification') {
    steps {
        dir("${FRONTEND_DIR}") {
            sh '''
                echo "Verification du frontend..."
                test -f index.html
                test -f app.js
                test -f style.css
                echo "Frontend files verified successfully!"
            '''
        }
    }
}
	
        
    }
	
	
post {
        always {
            junit(
                testResults: 'backend/target/surefire-reports/*.xml',
                allowEmptyResults: true
            )

            archiveArtifacts(
                artifacts: 'backend/target/*.jar',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'CI reussie : backend et front valides.'
        }

        failure {
            echo 'CI  echoue : verifer les logs Jenkins.'
        }
    }
}

