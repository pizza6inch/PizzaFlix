import publicClient from '../client/public.client.js'

const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
}

const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.detail({ personId }))

      return { response }
    } catch (error) {
      return { error }
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(personEndpoints.medias({ personId }))

      return { response }
    } catch (error) {
      return { error }
    }
  },
}

<<<<<<< HEAD
export default personApi
=======
export default personApi
>>>>>>> d58861f0c0cab312335f4ca2ae2441b8988f645b
