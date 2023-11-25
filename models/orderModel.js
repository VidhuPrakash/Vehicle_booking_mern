import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    vehicle: {},
    payment: { stripeSessionId: String, success: { type: Boolean } },
    buyer: { type: mongoose.ObjectId, ref: "users" },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Process", "Shipped", "Deliverd", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
