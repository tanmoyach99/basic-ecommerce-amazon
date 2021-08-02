const express = require("express");
const data = require("../Data/data.js");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");
const productRouter = express.Router();

productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send({ products });
  })
);

productRouter.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send({ product });
    } else {
      res.status(404).send({ message: "product not found" });
    }
  })
);

module.exports = productRouter;
