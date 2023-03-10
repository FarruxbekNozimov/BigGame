import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Setting from "../models/Setting.js";

export default async function (req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		next();
		return;
	}

	const decode = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decode.userId).lean();
	const setting = await Setting.findOne({ userId: decode.userId });
	req.user = user;
	req.userSetting = setting;
	req.userId = user ? user._id : null;
	next();
}
