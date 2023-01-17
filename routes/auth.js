import { Router } from "express";
import { sendCodeToGmail, randomCode } from "../utils/email.js";
import { generateJWTtoken } from "../utils/token.js";
import { hashing, unhashing } from "../utils/hashing.js";
const router = Router();

// Import Models
import User from "../models/User.js";
import Setting from "../models/Setting.js";
import downloadImg from "../utils/download.js";

// Vaqtinchalik variables
let getCode = 0;
let userData = "";

router.get("/logout", (req, res) => {
	res.clearCookie("token");
	res.redirect("/login");
});

router.get("/login", (req, res) => {
	req.cookies.token ? res.redirect("/") : "";
	res.render("login", {
		isLogin: true,
		loginError: req.flash("loginError"),
		userData,
	});
});

router.get("/register", (req, res) => {
	req.cookies.token ? res.redirect("/") : "";
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
	const usernameExist = await User.findOne({ username });
	const emailExist = await User.findOne({ email });
	if (usernameExist) {
		req.flash("loginError", "This username already use");
		return res.redirect("/register");
	}
	if (emailExist) {
		req.flash("loginError", "This email already exists");
		return res.redirect("/register");
	}

	if (!getCode) {
		getCode = randomCode();
		sendCodeToGmail(email, getCode, username);
		return res.redirect("/register");
	}
	if (userCode && getCode == userCode) {
		userData.password = hashing(userData.password);
		const user = await User.create({ stars: 0, money: 0, ...userData });
		const setting = await Setting.create({
			userId: user.id,
			fullName: "",
			gender: "",
			description: "",
			image: "/img/user/default-user.png",
			mobilePhone: "",
			location: "Uzbekistan",
			telegramLink: "",
			instagramLink: "",
			facebookLink: "",
			websiteLink: "",
		});
		const token = generateJWTtoken(user._id);
		res.cookie("token", token, { httpOnly: true, secure: true });
		return res.redirect("/");
	} else {
		req.flash("loginError", "Code is invalid");
		return res.redirect("/register");
	}
});

router.post("/login", async (req, res) => {
	let { username, password } = req.body;
	userData = {
		username: username,
		password: password,
	};

	if (!username || !password) {
		req.flash("loginError", "All fields must be required");
		return res.redirect("/login");
	}
	password = hashing(password);
	const existUser = await User.findOne({ username });
	if (!existUser) {
		req.flash("loginError", "User not found");
		return res.redirect("/login");
	}
	if (existUser.password != password) {
		req.flash("loginError", "Password is Wrong");
		return res.redirect("/login");
	}
	const token = generateJWTtoken(existUser._id);
	res.cookie("token", token, { httpOnly: true, secure: true });
	return res.redirect("/");
});

export default router;
