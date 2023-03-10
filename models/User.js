import { Schema, model } from "mongoose";

const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		money: { type: String, required: true },
		role: { type: String, required: true },
		level: { type: String, required: true },
		gameCount: { type: String, required: true },
		winCount: { type: String, required: true },
	},
	{ timestamps: true }
);

const User = model("User", UserSchema);
export default User;
