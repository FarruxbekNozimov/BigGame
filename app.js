import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

// Routes
import UserRoutes from "./routes/user.js";
import AuthRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware

const hbs = create({
	defaultLayout: "main",
	extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.urlencoded({ extented: true }));

app.use(express.static("public"));
app.use(express.urlencoded({ extented: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
	session({ secret: "FarruxDEV", reserve: false, saveUninitialized: false })
);
app.use(flash());

app.use(AuthRoutes);
app.use(UserRoutes);

const PORT = process.env.PORT || 7700;

const startApp = () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
			console.log("Mongo DB connected")
		);
		const PORT = process.env.PORT || 7700;
		app.listen(PORT, () => console.log(`Server is running ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};
startApp();
