import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.get("/games", authMiddleware, (req, res) => {
	res.render("games", {
		isGames: true,
		user: req.user,
	});
});

router.get("/games/bugvsdev/easy", authMiddleware, (req, res) => {
	res.render("games/buvsdeveasy", {
		isGames: true,
		user: req.user,
	});
});

export default router;
