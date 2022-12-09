import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const Auth = models.auth || model("auth", userSchema);

export default Auth;
