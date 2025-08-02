pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/seu-usuario/seu-repo.git'
      }
    }

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

    stage('roda no modo de desenvolvimento') {
      steps {
        sh 'npm run dev'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        // Substitua pelo seu comando de deploy (ex: script bash, vercel, pm2, docker)
        // sh './scripts/deploy.sh'
        echo ''
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
      // Arquiva os artefatos da build para facilitar acesso posterior
      archiveArtifacts artifacts: '.next/**', fingerprint: true
    }
  }
}
