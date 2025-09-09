import express from "express";
import { uplode } from "../config/multer.js";
import authSeller from "../middlewares/authSeller.middleware.js";
import {addProduct,changeStock,productById,productList,} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/add", uplode.array(["images"]), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.get("/stock", authSeller, changeStock);

export default productRouter