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

// get products
router.get("/get-product", getProductsController);

// single product
router.get("/get-product/:slug", getSingleProductsController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/delete-product/:pid", deleteProductController);

// search product
router.get("/search/:keyword", searchProductController);
export default router;
