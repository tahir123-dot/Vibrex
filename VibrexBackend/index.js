import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import lgoinRoutes from "./routes/loginRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const Port = process.env.PORT || 5000;

app.use("/api", lgoinRoutes);
app.use("/api/products", productRoutes);
app.use("/api/certificates", certificateRoutes);

connectDB().then(() => {
  app.listen(Port, "0.0.0.0", () => {
    console.log("Port runing on this", Port);
  });
});
