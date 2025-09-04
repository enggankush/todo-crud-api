// import { model, Schema } from "mongoose";

// const userSchema = new Schema({
//   name: { type: String, require: true },
//   dob: { type: String, require: true },
//   mobile: { type: Number, require: true },
//   email: { type: String, require: true, unique: true },
//   password: { type: String, require: true },
// });

// export default model("user", userSchema);

import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  dob: string;
  mobile: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IUser>("User", userSchema);
