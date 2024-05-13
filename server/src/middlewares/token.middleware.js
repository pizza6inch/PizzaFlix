import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import userModel from '../models/user.model.js';

const tokenDecode = (req) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1]; //取出"Bearer "後面的token

            return jsonwebtoken.verify( //使用jsonwebtoken中的verify解碼token
                token,
                process.env.TOKEN_SECRET
            );
        }

        return false;
    } catch {
        return false;
    }
};

const auth = async (req, res, next) => {
    const tokenDecode = tokenDecode(req);

    if (!tokenDecode) return responseHandler.unathorized(res)

    const user = await userModel.findById(tokenDecode.id);

    if (!user) {
        return responseHandler.unathorized(res);
    }

    req.user = user;

    next();
};

export default { auth, tokenDecode }