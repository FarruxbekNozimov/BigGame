import express from "express";
import { create } from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import session from "express-session";

// MIDLEWARES
import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";

// Routes
import UserRoutes from "./routes/user.js";
import AuthRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Middleware

const hbs = create({
	defaultLayout: "main",
	extname: "hbs",
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
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

// Use Middleware
app.use(varMiddleware);
app.use(userMiddleware);

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
