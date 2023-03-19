import axios from 'axios'
import { toast } from 'react-hot-toast'
const controller = new AbortController()

let callsPending = 0

export const ax = () => {
  const client = axios.create({
    withCredentials: true,
  }) as typeof axios

  client.interceptors.request.use(
    (config) => {
      if (callsPending >= 1) {
        toast.error('Previous request still pending')
        controller.abort()
      }
      callsPending += 1
      return config
    },
    (error) => {
      throw error
    }
  )

  client.interceptors.response.use(
    (response) => {
      console.log(callsPending)
      if (callsPending >= 1) {
        callsPending += -1
      }
      return response
    },
    (error) => {
      if (callsPending >= 1) {
        callsPending += -1
      }
      const message = error?.response?.data?.error
      error.message = message || error.message
      throw error
    }
  )
  return client
}
