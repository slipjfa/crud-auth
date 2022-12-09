import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if(connection.readyState == 1) {
      return Promise.resolve(true)
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
