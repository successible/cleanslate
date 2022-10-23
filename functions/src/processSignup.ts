/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

export const processSignupFunction = functions.auth
  .user()
  .onCreate((user: any) => {
    const customClaims = {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user', 'admin'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.uid,
        'x-hasura-username': user.providerData[0].providerId,
      },
    }

    return admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)
      .catch((error: any) => {
        console.log(error)
      })
  })
