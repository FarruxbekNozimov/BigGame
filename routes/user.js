import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();
import fs from "fs";
import path from "path";

// Import Models
import User from "../models/User.js";
import Setting from "../models/Setting.js";
import downloadImg from "../utils/download.js";
import { hashing, unhashing } from "../utils/hashing.js";

router.get("/", authMiddleware, async (req, res) => {
	let user = await User.findById(req.user._id);
	let userSetting = await Setting.findOne({ userId: user._id });
	res.render("index", {
		isIndex: true,
		user: req.user,
		user: { ...req.user, password: unhashing(req.user.password) },
		userSetting: userSetting,
	});
});

router.get("/pay", authMiddleware, async (req, res) => {
	let user = await User.findById(req.user._id);
	let userSetting = await Setting.findOne({ userId: user._id });
	res.render("pay", {
		user: req.user,
		user: { ...req.user, password: unhashing(req.user.password) },
		userSetting: userSetting,
	});
});

router.get("/profile", authMiddleware, async (req, res) => {
	let user = await User.findById(req.user._id);
	let userSetting = await Setting.findOne({ userId: user._id });
	res.render("userSetting", {
		isProfile: true,
		user: { ...req.user, password: unhashing(req.user.password) },
		userSetting: userSetting,
		settingError: req.flash("settingError"),
	});
});

router.post("/profile", async (req, res) => {
	console.log(req.body);
	let {
		userImageURL,
		fullName,
		gender,
		mobilePhone,
		location,
		description,
		username,
		email,
		password,
		passwordCon,
		telegramLink,
		instagramLink,
		facebookLink,
		websiteLink,
	} = req.body;
	if (password != passwordCon) {
		req.flash("settingError", "Passwords do not match");
		return res.redirect("/profile");
	}
	// IMAGE DOWNLOADER
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
	// UPDATE ALL
	password = hashing(password);
	let updateUser = await User.findOneAndUpdate(
		req.user._id,
		{ username, email, password },
		{ upsert: true }
	);
	let updateSetting = await Setting.findOneAndUpdate(
		{ userId: req.user._id },
		{
			fullName,
			gender,
			description,
			image: req.user._id + ".png",
			mobilePhone,
			location,
			telegramLink,
			instagramLink,
			facebookLink,
			websiteLink,
		},
		{ upsert: true }
	);
	res.redirect("/profile");
});

router.get("/:username", authMiddleware, async (req, res) => {
	let user = await User.findOne({ username: req.params.username });
	res.render("profile", {
		isProfile: true,
		user: req.user,
	});
});
export default router;
