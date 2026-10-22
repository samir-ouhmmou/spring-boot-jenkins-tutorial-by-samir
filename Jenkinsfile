
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('1 - Verification de l environnement') {
            steps {
                sh '''
                    echo "Verification de Java..."
                    java --version

                    echo "Verification de Maven..."
                    mvn --version

                    echo "Verification de Git..."
                    git --version
                '''
            }
        }

        stage('2 - Compilation et tests') {
            steps {
                sh 'mvn -B -f backend/pom.xml clean verify'
            }
        }

        stage('3 - Verification du JAR') {
            steps {
                sh '''
                    echo "Fichiers JAR generes :"
                    find backend/target -maxdepth 1 -type f -name "*.jar"

                    test -n "$(find backend/target -maxdepth 1 -type f -name "*.jar" -print -quit)"
                '''
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
            echo 'Pipeline reussi : compilation et verification terminees.'
        }

        failure {
            echo 'Pipeline echoue : consulte les logs pour identifier le probleme.'
        }
    }
}

