import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

// Import Models
import User from "../models/User.js";
import Setting from "../models/Setting.js";

router.get("/", authMiddleware, (req, res) => {
	res.render("index", {
		isIndex: true,
		user: req.user,
	});
});

router.get("/profile", authMiddleware, async (req, res) => {
	let user = await User.findById(req.user._id);
	let userSetting = await Setting.findOne({ userId: user._id });
	res.render("profile", {
		isProfile: true,
		user: req.user,
		userSetting: userSetting,
	});
});

router.get("/:username", authMiddleware, async (req, res) => {
	let user = await User.findOne({ username: req.params.username });
	res.render("profile", {
		isProfile: true,
		user: req.user,
	});
});
export default router;
