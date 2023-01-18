import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

// Import Models
import User from "../models/User.js";
import Game from "../models/Game.js";

router.get("/games", authMiddleware, (req, res) => {
	res.render("games", {
		isGames: true,
		user: req.user,
	});
});

export default router;
