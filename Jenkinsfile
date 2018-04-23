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
   stage 'Instalar'
   echo 'Instala el paquete generado en el repositorio maven'
   sh 'mvn -f backend/ install -Dmaven.test.skip=true'
   
   
      // ------------------------------------
  // -- ETAPA: Sonarqube
   // ------------------------------------
   stage 'Sonarqube'
   echo 'Inicio procedimiento'
   sh 'mvn sonar:sonar -f backend/ -Dsonar.host.url=http://206.189.175.48:9000 ******** -Dsonar.projectName=Mingeso -Dsonar.jacoco.reportPaths=/var/lib/jenkins/workspace/marketMingeso/backend/target/jacoco.exec -Dsonar.projectKey=Mingeso -Dsonar.java.binaries=/var/lib/jenkins/workspace/marketMingeso/backend/target/classes "-Dsonar.sources=/var/lib/jenkins/workspace/marketMingeso/backend/src, /var/lib/jenkins/workspace/marketMingeso/frontend/src" -Dsonar.projectBaseDir=/var/lib/jenkins/workspace/marketMinges'
   
   
}
