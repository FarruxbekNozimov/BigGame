import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
	res.render("index", {
		isIndex: true,
	});
});

router.get("/login", (req, res) => {
	res.render("login", {
		isLogin: true,
	});
});

router.get("/register", (req, res) => {
	res.render("register", {
		isLogin: true,
	});
});

export default router;
