import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, require: true },
  dob: { type: Number, require: true },
  mobile: { type: Number, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

export default model("user", userSchema);
