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
   stage ('SonarQube analysis') {
   withSonarQubeEnv('Sonar') {
      sh "/var/lib/jenkins/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube/bin/sonar-scanner -Dsonar.projectKey=Mingeso -Dsonar.java.binaries=./backend/target/classes -Dsonar.sources=./backend/src -Dsonar.projectBaseDir=./"
      
   }
   
   def qualitygate = waitForQualityGate()
   if (qualitygate.status != "OK") {
      error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
   }

}
   
   
}
