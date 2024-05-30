import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  getSingleProductsController,
  productPhotoController,
  searchProductController,
  updateProductController,
  vehicleFilterController,
} from "../controller/vehicleController.js";
import formidable from "express-formidable";
const router = express.Router();
// Routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
// Routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get vehicles
router.get("/get-product", getProductsController);

// single vehicles
router.get("/get-product/:slug", getSingleProductsController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete vehicles
router.delete("/delete-product/:pid", deleteProductController);

// search vehicles
router.get("/search/:keyword", searchProductController);

// filter vehicles
router.post("/product-filters", vehicleFilterController);

export default router;
