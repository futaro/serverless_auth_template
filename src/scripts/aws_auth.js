import {CognitoAuth} from 'amazon-cognito-auth-js'
import {aws}         from '../../config'

export const AuthConfig = {
  region             : aws.Region,
  userPoolId         : aws.UserPoolId,
  userPoolWebClientId: aws.ClientId
}

export const GetCognitoAuth = (identifyProvider, onSuccess, onFailure) => {

  const authData = {
    ClientId          : aws.ClientId,
    AppWebDomain      : aws.AppWebDomain,
    TokenScopesArray  : aws.Scopes,
    RedirectUriSignIn : aws.SignInUri,
    RedirectUriSignOut: aws.SignOutUri,
    IdentityProvider  : identifyProvider
  }

  const auth = new CognitoAuth(authData)

  auth.userhandler = {
    onSuccess: function (result) {
      if (onSuccess) {
        onSuccess(result)
      }
    },
    onFailure: function (err) {
      console.error(err)
      if (onFailure) {
        onFailure(err)
      }
    }
  }

  auth.useCodeGrantFlow()

  return auth
}