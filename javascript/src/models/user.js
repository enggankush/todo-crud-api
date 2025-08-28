import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    dob: {type: String, required: true},
    mobile: {type: Number, required: true},
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true }
});

export default model("user", userSchema)