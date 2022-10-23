import { isDebug } from '../ui/isDebug'
import { isProduction } from '../ui/isProduction'

export const getApiUrl = () =>
  isProduction() || isDebug()
    ? [
        'https://api.cleanslate.sh/v1/graphql',
        'wss://api.cleanslate.sh/v1/graphql',
      ]
    : ['http://localhost:8120/v1/graphql', 'ws://localhost:8120/v1/graphql']
