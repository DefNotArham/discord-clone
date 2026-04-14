import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    DOB: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

export default User;
