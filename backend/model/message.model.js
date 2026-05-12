import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "channel",
  },
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
});

const Messaage = mongoose.model("message", messageSchema);

export default Messaage;
