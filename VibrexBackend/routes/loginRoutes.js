import express from "express";
import login from "../controller/Login_Controller.js";

const router = express.Router();

router.post("/login", login);

export default router;
