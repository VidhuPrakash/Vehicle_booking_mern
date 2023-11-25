import express from "express";
import { paymentController } from "../controller/paymentController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/checkout", requireSignIn, paymentController);
export default router;
