import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  inviteCode: { type: String, unique: true },
});

const Server = mongoose.model("server", serverSchema);

export default Server;
