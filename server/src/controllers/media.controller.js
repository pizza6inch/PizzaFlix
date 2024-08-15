import responseHandler from '../handlers/response.handler.js'
import tmdbApi from '../tmdb/tmdb.api.js'
import usermodel from '../models/user.model.js'
import favoriteModel from '../models/favorite.model.js'
import reviewModel from '../models/review.model.js'
import tokenMiddlerware from '../middlewares/token.middleware.js'

const getList = async (req, res) => {
  try {
    const { page } = req.query // why query not params?
    const { mediaType, mediaCategory } = req.params // why params not query? leave it for now

    const response = await tmdbApi.MediaList({ mediaType, mediaCategory, page }) // why not use destructuring?

    return responseHandler.ok(res, response)
  } catch {
    responseHandler.error(res)
  }
}

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params // why params not query? leave it for now
    const response = await tmdbApi.MediaGenres({ mediaType })

    return responseHandler.ok(res, response)
  } catch {
    responseHandler.error(res)
  }
}

const search = async (req, res) => {
  try {
    const { mediaType } = req.params // why params not query? leave it for now
    const { query, page } = req.query // why query not params?

    const response = await tmdbApi.MediaSearch({
      query,
      page,
      mediaType: mediaType === 'people' ? 'person' : mediaType, // 順序不對嗎？
    })

    responseHandler.ok(res, response)
  } catch {
    responseHandler.error(res)
  }
}

const getDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params // why params not query? leave it for now

    const params = { mediaType, mediaId }

    const media = await tmdbApi.MediaDetail(params)

    media.credits = await tmdbApi.MediaCredits(params)

    const videos = await tmdbApi.MediaVideos(params)

    media.videos = videos

    const recommand = await tmdbApi.MediaRecommend(params)

    media.recommand = recommand.results

    media.images = await tmdbApi.MediaImages(params)

    const tokenDecoded = tokenMiddlerware.tokenDecode(req)

    if (tokenDecoded) {
      const user = await usermodel.findById(tokenDecoded.data)

      if (user) {
        const isFavorite = await favoriteModel.findOne({ user: user.id, mediaId })
        if (isFavorite) media.isFavorite = isFavorite
      }
    }

    media.reviews = await reviewModel.find({ mediaId }).poulate('user').sort('-createdAt')

    responseHandler.ok(res, media)
  } catch {
    responseHandler.error(res)
  }
}

export default { getList, getGenres, search, getDetails }
