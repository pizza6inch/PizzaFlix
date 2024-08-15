import publicClient from '../client/public.client.js'

const genreEndpoints = {
  List: ({ mediaType }) => `${mediaType}/genres`,
}

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genreEndpoints.List({ mediaType }))

      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default genreApi
