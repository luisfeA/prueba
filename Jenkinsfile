node {
   // ------------------------------------
   // -- ETAPA: Compilar
   // ------------------------------------
   stage 'Compiler'
   
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
   // -- ETAPA: Test
   // ------------------------------------
   stage 'Test'
   echo 'Ejecutando tests'
  try{
     sh 'mvn -f backend/ verify'
    step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])
   }catch(err) {
    step([$class: 'JUnitResultArchiver', testResults: '**/target/surefire-reports/TEST-*.xml'])
      if (currentBuild.result == 'UNSTABLE')
       currentBuild.result = 'FAILURE'
    throw err
  }
   
   
   // ------------------------------------
   // -- ETAPA: Instalar
   // ------------------------------------
   stage 'Install'
   echo 'Instala el paquete generado en el repositorio maven'
   sh 'mvn -f backend/ install -Dmaven.test.skip=true'
   
   
   // ------------------------------------
   // -- ETAPA: Sonarqube
   // ------------------------------------
 
   stage ('SonarQube analysis') {
   withSonarQubeEnv('Sonar') {
      echo 'Realiza el escaneo del programa'
      sh "/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube/bin/sonar-scanner -Dsonar.projectKey=Mingeso -Dsonar.jacoco.reportPaths=./backend/target/jacoco.exec -Dsonar.java.binaries=./backend/target/classes -Dsonar.sources=./backend/src,./frontend/src -Dsonar.projectBaseDir=./"
      
      }
   
  
   }
   // ------------------------------------
   // -- ETAPA: Testlisnk
   // ------------------------------------
  /* stage ('Testlink'){
      echo 'Se inicia testlink'
      sh '/bin/sh -xe /tmp/jenkins6938644856222977257.sh'
      sh 'cd frontend'
      sh 'yarn'
   }*/
   stage ('Deploy'){
         set +x
         echo "Deploying to Tomcat at http://tomcat:8080/myapp"
         curl -s --upload-file target/market-0.0.1-SNAPSHOT.war "http://user:password@tomcat:8080/manager/text/deploy?path=/myapp&update=true&tag=${BUILD_TAG}"
      }
    
   
 
   
}
