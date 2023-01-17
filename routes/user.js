import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();
import fs from "fs";
import path from "path";
// Import Models
import User from "../models/User.js";
import Setting from "../models/Setting.js";
import downloadImg from "../../UY/utils/downloadImg.js";

router.get("/", authMiddleware, (req, res) => {
	res.render("index", {
		isIndex: true,
		user: req.user,
	});
});

router.get("/profile", authMiddleware, async (req, res) => {
	let user = await User.findById(req.user._id);
	let userSetting = await Setting.findOne({ userId: user._id });
	res.render("userSetting", {
		isProfile: true,
		user: req.user,
		userSetting: userSetting,
	});
});

router.post("/profile", authMiddleware, async (req, res) => {
	let { fullName, gender, mobilePhone, location, description } = req.body;
	let { userImage, bgImage } = req.files;

	try {
		if (!userImage) userImage = "/img/user/default-user.png";
		else
			fs.writeFile(
				path.resolve("./public/img/user", req.user._id + ".png"),
				userImage.data,
				"binary",
				function (err) {
					if (err) console.log(err);
					else console.log("Saved");
				}
			);
		if (!bgImage) bgImage = "/img/bg.avif";
		else
			fs.writeFile(
				path.resolve("./public/img/user", req.user._id + "-bg" + ".png"),
				bgImage.data,
				"binary",
				function (err) {
					if (err) console.log(err);
					else console.log("Saved");
				}
			);
	} catch (error) {
		console.log("File error : ", error);
	}
	console.log(fullName, gender, mobilePhone, location, description);
	res.send(`<img src="data:${userImage.mimetype};base64" />`);
});

router.get("/:username", authMiddleware, async (req, res) => {
	let user = await User.findOne({ username: req.params.username });
	res.render("profile", {
		isProfile: true,
		user: req.user,
	});
});
export default router;
