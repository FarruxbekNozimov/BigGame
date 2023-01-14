import express from "express";
import { create } from "express-handlebars";

// Routes
import UserRoutes from "./routes/user.js";

const app = express();

// Middleware

const hbs = create({
	defaultLayout: "main",
	extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));

app.use(UserRoutes);

const PORT = process.env.PORT || 7700;

app.listen(PORT, () => console.log("Server listening on port", PORT));
