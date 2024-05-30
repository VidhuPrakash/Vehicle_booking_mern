import orderModel from "../models/orderModel.js";
import vehicleModel from "../models/vehicleModel.js";
import { Stripe } from "stripe"; // Import the stripe module

export const paymentController = async (req, res) => {
  try {
    const stripeInstance = new Stripe(process.env.SECRET_STRIPE_KEY);

    const { id, name, category, price, photo } = req.body.vehicle;

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: name,
              images: [photo],
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancelled",
    });
    await vehicleModel.findByIdAndUpdate(id, { $inc: { quantity: -1 } });

    if (session.payment_status === "paid") {
      // Create a new order
      const order = new orderModel({
        vehicle: {
          id,
          name,
          category,
          price,
        },
        buyer: req.user._id,
        payment: {
          stripeSessionId: session.id,
        },
        status: "Not Process",
      });

      // Save the order to the database
      await order.save();
    }

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while making payment",
      error,
    });
  }
};
