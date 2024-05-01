const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.processSignup = functions.auth.user().onCreate((user) => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-role': 'user',
      'x-hasura-user-id': user.uid,
      'x-hasura-username': user.providerData[0].providerId,
    },
  }

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .catch((error) => {
      console.log(error)
    })
})
