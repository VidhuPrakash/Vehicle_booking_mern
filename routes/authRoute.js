import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

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
router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
