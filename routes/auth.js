import { Router } from "express";
import { sendCodeToGmail, randomCode } from "../utils/email.js";
import User from "../models/User.js";
const router = Router();

// Vaqtinchalik variables
let getCode = 0;
let userData = "";

router.get("/login", (req, res) => {
	res.render("login", {
		isLogin: true,
	});
});

router.get("/register", (req, res) => {
	res.render("register", {
		isLogin: true,
		loginError: req.flash("loginError"),
		getCode,
		userData,
	});
});

router.post("/register", async (req, res) => {
	let { username, email, password, a, b, c, d } = req.body;
	let userCode = +(a + b + c + d);
	userData = {
		username: username,
		email: email,
		password: password,
		role: "user",
	};

	if (!username || !email || !password) {
		req.flash("loginError", "All fields must be required");
		return res.redirect("/register");
	}
	if (password.length < 8) {
		req.flash("loginError", "Password must least 8 characters");
		return res.redirect("/register");
	}
	// const usernameExist = await User.findOne({ username });
	// const emailExist = await User.findOne({ email });
	// if (usernameExist) {
	// 	req.flash("loginError", "This username already use");
	// 	return res.redirect("/register");
	// }
	// if (emailExist) {
	// 	req.flash("loginError", "This email already exists");
	// 	return res.redirect("/register");
	// }
	if (!getCode) {
		getCode = randomCode();
		sendCodeToGmail(email, getCode, username);
		res.redirect("/register");
	}
	if (userCode && getCode == userCode) {
		console.log(userData);
		const user = await User.create(userData);
		console.log(user);
	}
});

export default router;
