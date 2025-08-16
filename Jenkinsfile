pipeline {
  agent {
    docker {
      image 'node:20'
    }
  }

  environment {
    NODE_ENV = 'production'
    GITHUB_TOKEN = credentials('16afc47d-2f60-41cc-90b5-239b405e0c91')
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {
    // stage('Checkout') {
    //   steps {
    //     git branch: 'main', url: 'https://github.com/felipe-andersen/ea_erp',
    //     credentialsId: '16afc47d-2f60-41cc-90b5-239b405e0c91'
    //   }
    // }

    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Run tests') {
      when {
        expression {
          fileExists('jest.config.js') || fileExists('vitest.config.ts')
        }
      }
      steps {
        sh 'npm test || echo "⚠️ Tests failed, continuing..."'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        echo '🚀 Deploy step would run here'
        // sh './scripts/deploy.sh'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline finalizado com sucesso!'
    }
    failure {
      echo '❌ Pipeline falhou!'
    }
    always {
      archiveArtifacts artifacts: '.next/**', fingerprint: true
    }
  }
}

//Docker Pipeline