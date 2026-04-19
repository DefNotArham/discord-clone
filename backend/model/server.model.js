import mongoose from "mongoose";

const serverSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  inviteCode: { type: mongoose.Schema.Types.ObjectId, unique: true },
  channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "channel",
    },
  ],
  isPublic: { type: Boolean, default: true },
});

const Server = mongoose.model("server", serverSchema);

export default Server;
