import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export type IUser = InferSchemaType<typeof userSchema> & { _id: string };

const userModel = model<IUser>("User", userSchema);
export default userModel;
