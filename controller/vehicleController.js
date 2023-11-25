import slugify from "slugify";
import vehicleModel from "../models/vehicleModel.js";
import fs from "fs";
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new vehicleModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const vehicles = await vehicleModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: vehicles.length,
      message: "All products",
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in sending message",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductsController = async (req, res) => {
  try {
    const vehicles = await vehicleModel
      .findOne({ slug: req.params.slug })
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};
// get photo
export const productPhotoController = async (req, res) => {
  try {
    const vehicles = await vehicleModel.findById(req.params.pid);

    if (!vehicles) {
      console.log("Vehicle not found");
      return res.status(404).send({
        success: false,
        message: "Vehicle not found",
      });
    } else if (!vehicles.photo || !vehicles.photo.data) {
      console.log("Photo not found");
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    } else {
      res.set("content-type", vehicles.photo.contentType);
      return res.status(200).send(vehicles.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching photo",
      error,
    });
  }
};

// delete controller
export const deleteProductController = async (req, res) => {
  try {
    const product = await vehicleModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Deleted the product",
      error,
    });
  }
};
// update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Get the current product data
    const currentProduct = await vehicleModel.findById(req.params.pid);

    // validation
    switch (true) {
      case !name:
        return res.send({ error: "Name is Required" });
      case !description:
        return res.send({ error: "Description is Required" });
      case !price:
        return res.send({ error: "Price is Required" });
      case !category:
        return res.send({ error: "Category is Required" });
      case !quantity:
        return res.send({ error: "Quantity is Required" });
      case photo && photo.size > 100000:
        return res.send({
          error: "Photo is Required and should be less than 1 mb",
        });
      // Same value validation
      case name === currentProduct.name &&
        description === currentProduct.description &&
        price === currentProduct.price &&
        category === currentProduct.category &&
        quantity === currentProduct.quantity &&
        shipping === currentProduct.shipping:
        return res.send({ error: "No changes were made" });
    }

    const products = await vehicleModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating product",
    });
  }
};

// search vehicle
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await vehicleModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Updating product",
      error,
    });
  }
};
