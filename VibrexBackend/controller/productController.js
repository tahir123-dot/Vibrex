import Product from "../models/Product.js";
import cloudinary from "../middleware/cloudinary.js";

export const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image or video is required" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: req.body.mediaType === "video" ? "video" : "image",
      folder: "products",
    });

    // Save in MongoDB
    const product = new Product({
      name: req.body.name || "",
      description: req.body.description || "",
      mediaType: req.body.mediaType,
      mediaUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
