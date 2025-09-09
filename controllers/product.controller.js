import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";

// Add product : /api/v1/product/add

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.bodu.productData);
    const image = req.files;
    let imageUrl = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_urll;
      })
    );
    await Product.create({ ...productData, image: imageUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get product : /api/v1/product/list

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: false, products });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get single product : /api/v1/product/id

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// change product instock : /api/v1/product/stock

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock updated" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
