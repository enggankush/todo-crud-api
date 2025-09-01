import { connect } from "mongoose";

const connectdb = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("Mongoosdb are conected successfully");
  } catch (error) {
    console.error("mongoose are not connected", error);
    process.exit(1);
  }
};

export default connectdb;
