import { model, Schema } from "mongoose";

const userTodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  // completed: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("todo", userTodoSchema);
