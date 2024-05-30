import express from "express";
import {
  registerController,
  loginController,
  testController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
  getAllUser,
  cancelOrder,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { updateProductController } from "../controller/vehicleController.js";

// routing object
const router = express.Router();

// routing

// Register||METHOD POST
router.post("/register", registerController);

// LOGIN||POST
router.post("/login", loginController);

// test routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected User Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Admin Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
// update profile
router.put("/profile", requireSignIn, updateProfileController);

// order
router.get("/orders", requireSignIn, getOrderController);
//all order
router.get("/all-orders", requireSignIn, isAdmin, getAllOrderController);
//all status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
// get all user
router.get("/all-users", requireSignIn, isAdmin, getAllUser);
// cancel request
router.put("/orders/:id/cancel", requireSignIn, cancelOrder);
export default router;
