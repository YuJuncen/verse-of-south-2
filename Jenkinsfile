pipeline {
    agent {
        docker "node:latest"
    }

    environment {
        recaptchaWebsiteKey = '6LfruKEUAAAAABLOf4rcgxuG-T_SVtDrFGl5kyHp'
        apiHost = 'https://vosouth.net/resources'
        thisSite = 'https://vosouth.net'
    }

    stages {
        stage("make-config") {
            steps {
                sh '''
echo 'module.exports = { \
    recaptchaWebsiteKey: "$recaptchaWebsiteKey", \
    apiHost: "$apiHost", \
    thisSite: "$thisSite" \
}; > src/assets/app.config.ts'
                '''
            }
        }

        stage("build") {
            steps {
                // this registry just for local test.
                sh 'npm i --registry=https://registry.npm.taobao.org'
                sh 'npm run build:ssr'
            }
        }

        stage("deploy") {
            sh '''
scp -P 233 dist/server.js vosouth.net:/var/www/static
            '''
        }
    }
}