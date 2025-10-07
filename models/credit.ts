import mongoose from "mongoose";

const creditSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    credits: Number,
    amount: Number,
  },
  { timestamps: true }
);

const Credit = mongoose.models.Credit || mongoose.model("Credit", creditSchema);
export default Credit;
