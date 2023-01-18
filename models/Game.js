import { Schema, model } from "mongoose";

const GameSchema = new Schema(
	{
		image: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true }
);

const Game = model("Game", GameSchema);
export default Game;
