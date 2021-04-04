pipeline {

  environment {
	registry_dev = "docker-repo:5500/chat_app_backend_dev"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git url: 'https://git.hyperlogy.com/esoft/worktalk/backend/worktalk-api.git', credentialsId: 'login-gitlab', branch: 'dev'
            
      }
    }

	stage('Build image Dev') {
	  when {
		branch 'dev'
	  }
      steps{
        script {
          dockerImage_dev = docker.build registry_dev + ":$BUILD_NUMBER"
          //dockerImage_dev = docker.build("-f Dockerfile", "no-cache", -t "registry_dev + :$BUILD_NUMBER" .)
        }
      }
    }

	stage('Push Image for Dev') {
      when {
		branch 'dev'
	  }
	  steps{
        script {
          docker.withRegistry( "" ) {
            dockerImage_dev.push()
          }
        }
      }
    }

    stage('Deploy App dev ') {
	  when {
	    branch 'dev'
	  }
	  steps {
		script {
		  //kubernetesDeploy(configs: "service_chat_dev.yaml", kubeconfigId: "mykubeconfig", enableConfigSubstitution: true)
		  //sh 'ssh root@172.16.20.55 kubectl delete -f /root/chat_app/dev-backend/service_chat_dev.yaml'
		  sh 'ssh root@172.16.20.55 rm -f /root/chat_app/dev-backend/service_chat_dev.yaml'
		  sh 'scp /var/lib/jenkins/workspace/backend-worktalk-api_dev/service_chat_dev.yaml root@172.16.20.55:/root/chat_app/dev-backend/'
		  sh "ssh root@172.16.20.55 sed -i 's/abc123/$BUILD_NUMBER/g' /root/chat_app/dev-backend/service_chat_dev.yaml"
		  sh 'ssh root@172.16.20.55 kubectl apply -f /root/chat_app/dev-backend/service_chat_dev.yaml'
		}
	  }
    }
  }

}