import { model, Schema } from "mongoose";

const teamSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default model("Team", teamSchema);
