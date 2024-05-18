import userModel from '../models/user.model.js';
import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';

const signup = async (req, res) => {
    try {
        const { username, password, displayName } = req.body;

        const checkUser = await userModel.findOne({ username });

        if (checkUser) return responseHandler.badrequest(res, "Username already exists");

        const user = new userModel();

        user.displayName = displayName;
        user.username = username;
        user.password = user.setPassword(password);

        await user.save();

        const token = jsonwebtoken.sign(
            { data: user.id }, // 要加密的數據
            process.env.TOKEN_SECRET, // 加密的密鑰
            { expiresIn: '24h' } // 過期時間
        );

        responseHandler.created(res, {
            token,
            ...user._doc,
            id: user.id
        });
    } catch {
        responseHandler.error(res);
    }
};

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userModel.findOne({ username }).select("username password salt id displayName");
        // 利用username查找user，並只返回username, password, salt, id, displayName

        if (!user) return responseHandler.badrequest(res, "User not exists");

        if (!user.validatePassword(password)) return responseHandler.badrequest(res, "Password incorrect");

        const token = jsonwebtoken.sign(
            { data: user.id }, // 要加密的數據
            process.env.TOKEN_SECRET, // 加密的密鑰
            { expiresIn: '24h' } // 過期時間
        );

        user.password = undefined; // 不返回密碼
        user.salt = undefined; // 不返回加密鹽

        responseHandler.created(res, {
            token,
            ...user._doc, // 等同於傳入user的所有屬性用一行代碼
            id: user.id
        });
    } catch {
        responseHandler.error(res);
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;

        const user = await userModel.findById(req.user.data).select("password id salt");

        if (!user) return responseHandler.unathorized(res);

        if (!user.validatePassword(password)) return responseHandler.badrequest(res, "Password incorrect");

        user.setPassword(newPassword);

        await user.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
}

const getInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.data);

        if (!user) return responseHandler.notfound(res);

        responseHandler.ok(res, user);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    signup,
    signin,
    updatePassword,
    getInfo,
};