pipeline {
    agent {
        docker "node:latest"
    }

    environment {
        recaptchaWebsiteKey = '6LfruKEUAAAAABLOf4rcgxuG-T_SVtDrFGl5kyHp',
        apiHost = 'https://vosouth.net/resources',
        thisSite = 'https://vosouth.net'
    }

    stages {
        stage("build") {
            steps {
                sh 'npm build:ssr'
            }
        }

        stage("run") {
            steps {
                sh 'npm serve:ssr'
            }
        }
    }
}