import { Schema, model } from "mongoose";

const SettingSchema = new Schema(
	{
		userId: { type: String, required: true, unique: true },
		fullName: { type: String },
		gender: { type: String },
		description: { type: String },
		image: { type: String },
		bgImage: { type: String },
		mobilePhone: { type: String },
		location: { type: String },
		telegramLink: { type: String },
		instagramLink: { type: String },
		facebookLink: { type: String },
		websiteLink: { type: String },
	},
	{ timestamps: true }
);

const Setting = model("Setting", SettingSchema);
export default Setting;
