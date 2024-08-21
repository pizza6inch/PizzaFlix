import responseHandler from '../handlers/response.handler.js'
import reviewModel from '../models/review.model.js'

const create = async (req, res) => {
  try {
    const { movieId } = req.params

    const review = new reviewModel({
      user: req.user._id,
      movieId,
      ...req.body,
    })

    await review.save()

    responseHandler.created(res, {
      ...review._doc,
      id: review._id,
      user: req.user,
    })
  } catch {
    responseHandler.error(res)
  }
}

const remove = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await reviewModel.findOne({
      user: req.user.id,
      _id: reviewId,
    })
    if (!review) return responseHandler.notfound(res)

    await reviewModel.deleteOne({ _id: reviewId }) // Use deleteOne instead of remove

    responseHandler.ok(res)
  } catch {
    responseHandler.error(res)
  }
}

const getReviewsOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user._id,
      })
      .sort('-createdAt')

    responseHandler.ok(res, reviews)
  } catch {
    responseHandler.error(res)
  }
}

export default { create, remove, getReviewsOfUser }
