import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.get("/", authMiddleware, (req, res) => {
	res.render("index", {
		isIndex: true,
	});
});

router.get("/:username", authMiddleware, (req, res) => {
	res.render("profile", {
		isProfile: true,
	});
});

export default router;
