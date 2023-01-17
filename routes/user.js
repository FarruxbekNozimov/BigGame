import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();
import fs from "fs";
import path from "path";

// Import Models
import User from "../models/User.js";
import Setting from "../models/Setting.js";
import downloadImg from "../utils/download.js";

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

router.post("/profile", (req, res) => {
	console.log(req.body, req.files);

	let { userImageURL, fullName, gender, mobilePhone, location, description } =
		req.body;
	let userImage = req.files ? req.files["userImage"] : null;
	try {
		if (userImage) {
			fs.writeFile(
				path.resolve("./public/img/user", req.user._id + ".png"),
				userImage.data,
				"binary",
				function (err) {
					if (err) console.log(err);
					else console.log("Saved");
				}
			);
		} else if (userImageURL.includes("https://")) {
			downloadImg(
				userImageURL,
				"./public/img/user/" + req.user._id + ".png",
				() => console.log("Saved")
			);
		}
	} catch (error) {
		console.log("File error : ", error);
	}
	console.log(fullName, gender, mobilePhone, location, description);
	res.send(`<img src="/img/user/${req.user._id}.png" />`);
});

router.get("/:username", authMiddleware, async (req, res) => {
	let user = await User.findOne({ username: req.params.username });
	res.render("profile", {
		isProfile: true,
		user: req.user,
	});
});
export default router;
