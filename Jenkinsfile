//////////////////////////////////////////////////////////////////////////////////////////

def withSecretEnv(List<Map> varAndPasswordList, Closure closure) {
    wrap([$class: 'MaskPasswordsBuildWrapper', varPasswordPairs: varAndPasswordList]) {
        withEnv(varAndPasswordList.collect { "${it.var}=${it.password}" }) {
            closure()
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////

node {

    env.PROJECT_NAME = 'polymesh-apps'
    env.GIT_REPO     = "ssh://git@ssh.gitea.polymesh.dev:4444/Deployment/${PROJECT_NAME}.git"

    properties([[$class: 'BuildDiscarderProperty',
                 strategy: [$class: 'LogRotator',
                            numToKeepStr: '7',
                            daysToKeepStr: '7',
                            artifactNumToKeepStr: '7',
                            artifactDaysToKeepStr: '7']]])

    if (env.CHANGE_BRANCH) {
        env.GIT_BRANCH = env.CHANGE_BRANCH // Job was started from a pull request
    } else {
        env.GIT_BRANCH = env.BRANCH_NAME
    }

    dir("${JENKINS_HOME}/workspace/${JOB_NAME}/${BUILD_NUMBER}") {

        withCredentials([
            usernamePassword(credentialsId: 'vault_approle',
                             usernameVariable: 'VAULT_ROLE_ID',
                             passwordVariable: 'VAULT_SECRET_ID'),
        ]) {

            env.VAULT_ADDR   = 'https://127.0.0.1:8200/'
            env.VAULT_CACERT = '/etc/ssl/certs/vault.tls.chain.pem'

            withSecretEnv([[var: 'VAULT_TOKEN',
                            password: sh (returnStdout: true,
                                          label: 'Login To Vault',
                                          script: '''\
                                                  vault write -field=token \
                                                              -format=table \
                                                              auth/approle/login \
                                                              role_id="$VAULT_ROLE_ID" \
                                                              secret_id="$VAULT_SECRET_ID"
                                                  '''.stripIndent()).trim()]]) {
                stage('Clone Repo') {
                    sh (label: 'Clone Repo',
                        script: '/usr/local/bin/gitea-clone-repo.sh')
                }
            }
        }

        dir("${PROJECT_NAME}") {

            env.GIT_COMMIT = sh (returnStdout: true,
                                 label: 'Read Git Commit',
                                 script: 'git rev-parse HEAD').trim()

            echo "GIT_COMMIT: ${env.GIT_COMMIT}"

            stage('Build') {
                sh (label: 'Run `./deploy/build.sh`',
                    script: './deploy/build.sh')
            }

            stage('Push') {
                sh (label: 'Run `./deploy/push.sh`',
                    script: './deploy/push.sh')
            }

        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
