import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  team: { type: Schema.Types.ObjectId, ref: "Team", default: null },
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    unique: true,
  },
  userRole: {
    type: String,
    enum: ["SQUAD_LEADER", "SQUAD_MEMBER", "STAGIAIRE"],
    default: "STAGIAIRE",
  },
});

export default model("User", userSchema);
