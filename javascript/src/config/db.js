import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI)
    console.log("Mongoosdb are conected successfully");
  } catch (error) {
    // console.log(error)
    console.error("mongoose not connected");
    process.exit(1);
  }
};

export default connectDB;