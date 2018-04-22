node {
   // ------------------------------------
   // -- ETAPA: Compilar
   // ------------------------------------
   stage 'Compilar'
   
   // -- Configura variables
   echo 'Configurando variables'
   def mvnHome = tool 'M3'
   env.PATH = "${mvnHome}/bin:${env.PATH}"
   echo "var mvnHome='${mvnHome}'"
   echo "var env.PATH='${env.PATH}'"
   
   // -- Descarga código desde SCM
   echo 'Descargando código de SCM'
   sh 'rm -rf *'
   checkout scm
   
   // -- Compilando
   echo 'Compilando aplicación'
   sh 'mvn -f backend/ clean compile'
   
   
   
   // ------------------------------------
   // -- ETAPA: Instalar
   // ------------------------------------
   stage 'Instalar'
   echo 'Instala el paquete generado en el repositorio maven'
   sh 'mvn -f backend/ install -Dmaven.test.skip=true'
   
   stage 'Sonar'
   echo 'Se ejecuta sonarqube'
   sh '/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube/bin/sonar-scanner -Dsonar.host.url=http://206.189.175.48:9000 ******** -Dsonar.projectName=Mingeso -Dsonar.projectKey=Mingeso -Dsonar.java.binaries=**/target/classes "-Dsonar.sources=/var/lib/jenkins/workspace/marketMingeso/backend/src, /var/lib/jenkins/workspace/marketMingeso/frontend/src" -Dsonar.projectBaseDir=/var/lib/jenkins/workspace/marketMingeso'
}
