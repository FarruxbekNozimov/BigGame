import { Router } from "express";
const router = Router();
import authMiddleware from "../middleware/auth.js";
import fs from "fs";
import User from "../models/User.js";
import Setting from "../models/Setting.js";

router.get("/games", authMiddleware, async (req, res) => {
	let games = JSON.parse(fs.readFileSync("./models/games.json"));
	res.render("games", {
		isGames: true,
		user: req.user,
		userSetting: req.userSetting,
		games,
	});
});

router.get("/games/bugvsdev/", authMiddleware, (req, res) => {
	res.render("games/bugvsdev", {
		isGames: true,
		user: req.user,
		userSetting: req.userSetting,
	});
});

router.get("/games/bugvsdev/junior", authMiddleware, (req, res) => {
	res.render("games/buvsdevEasy", {
		isGames: true,
		user: req.user,
		userSetting: req.userSetting,
	});
});

router.get("/games/bugvsdev/middle", authMiddleware, (req, res) => {
	res.render("games/bugvsdevMiddle", {
		isGames: true,
		user: req.user,
		userSetting: req.userSetting,
	});
});

router.get("/games/bugvsdev/senior", authMiddleware, (req, res) => {
	res.render("games/bugvsdevSenior", {
		isGames: true,
		user: req.user,
		userSetting: req.userSetting,
	});
});

router.post("/games/bugvsdev/junior", authMiddleware, (req, res) => {
	let { winner } = req.body;
	req.flash("winBoardDis", true);
	res.redirect("/games/bugvsdev/junior");
});

router.post("/games/bugvsdev/middle", authMiddleware, (req, res) => {
	let { winner } = req.body;
	req.flash("winBoardDis", true);
	res.redirect("/games/bugvsdev/middle");
});

router.post("/games/bugvsdev/senior", authMiddleware, (req, res) => {
	let { winner } = req.body;
	req.flash("winBoardDis", true);
	res.redirect("/games/bugvsdev/senior");
});

export default router;
