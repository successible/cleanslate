import axios from 'axios'

export const ax = () => {
  const client = axios.create({}) as typeof axios

  client.interceptors.request.use(
    (request) => {
      return request
    },
    (error) => {
      throw error
    }
  )

  client.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const message = error?.response?.data?.error
      error.message = message || error.message
      throw error
    }
  )
  return client
}
