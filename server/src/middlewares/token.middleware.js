import jsonwebtoken from 'jsonwebtoken'
import responseHandler from '../handlers/response.handler.js'
import userModel from '../models/user.model.js'

const tokenDecode = req => {
  try {
    const bearerHeader = req.headers['authorization']
    //console.log(req.headers)
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1] //取出"Bearer "後面的token

      return jsonwebtoken.verify(
        //使用jsonwebtoken中的verify解碼token
        token,
        process.env.TOKEN_SECRET
      )
    }

    return false
  } catch {
    return false
  }
}

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)

  if (!tokenDecoded) return responseHandler.unauthorized(res)

  const user = await userModel.findById(tokenDecoded.data)

  if (!user) {
    return responseHandler.unauthorized(res)
  }

  req.user = user
  //console.log(req.body)
  next()
}

export default { auth, tokenDecode }
