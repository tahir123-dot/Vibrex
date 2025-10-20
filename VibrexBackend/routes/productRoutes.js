import express from "express";
import upload from "../middleware/multer.js";
import { addProduct, getProducts } from "../controller/productController.js";

const router = express.Router();

router.post("/add", upload.single("file"), addProduct);
router.get("/gallary", getProducts);

export default router;
