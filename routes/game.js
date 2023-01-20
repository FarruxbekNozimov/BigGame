import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.get("/games", authMiddleware, (req, res) => {
	res.render("games", {
		isGames: true,
		user: req.user,
	});
});

router.get("/games/bugvsdev/", authMiddleware, (req, res) => {
	res.render("games/bugvsdev", {
		isGames: true,
		user: req.user,
	});
});

router.get("/games/bugvsdev/junior", authMiddleware, (req, res) => {
	res.render("games/buvsdeveasy", {
		isGames: true,
		user: req.user,
	});
});

router.post("/games/bugvsdev/junior", authMiddleware, (req, res) => {
	let { winner } = req.body;
	req.flash("winBoardDis", true);
	res.redirect("/games/bugvsdev/junior");
});

export default router;
