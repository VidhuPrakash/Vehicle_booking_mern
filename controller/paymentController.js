import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51NywUVSHP47YPyINagltDsQLDS9aiKiLm53x5hJXU6G84Sx4IDD5czYAhOcJMzToJzji7ENplF09oRjTCp7hBrXy001x9pR9Yb"
);
import orderModel from "../models/orderModel.js";

export const paymentController = async (req, res) => {
  try {
    const { id, name, category, price } = req.body.vehicle;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${name} (${category})`,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000",
    });

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

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while making payment",
      error,
    });
  }
};
