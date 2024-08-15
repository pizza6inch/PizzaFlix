import privateClient from '../client/private.client.js'
import publicClient from '../client/public.client.js'

const userEndpoints = {
  signin: 'user/signin',
  signup: 'user/signup',
  getInfo: 'user/info',
  passwordUpdate: 'user/update-password',
}

const userApi = {
  signin: async ({ username, password }) => {
    try {
      //console.log('send request')
      const response = await publicClient.post(userEndpoints.signin, { username, password })

      return { response }
    } catch (err) {
      //console.log('err')
      return { err }
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      console.log('send request')
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      })

      return { response }
    } catch (error) {
      console.log(error)
      return { error }
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo)

      return { response }
    } catch (error) {
      return { error }
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
