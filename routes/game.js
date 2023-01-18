import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.get("/games", authMiddleware, (req, res) => {
	res.render("games", {
		isGames: true,
		user: req.user,
	});
});

router.get("/games/tictactoe", authMiddleware, (req, res) => {
	res.render("games/tictactoe", {
		isGames: true,
		user: req.user,
	});
});

export default router;
