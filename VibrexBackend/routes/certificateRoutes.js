import express from "express";
import { addCertificate, deleteCertificate, verifyCertificate } from "../controller/Certificate.js";

const router = express.Router();

router.post("/", addCertificate);                          // POST   /certificates
router.delete("/:id", deleteCertificate);                   // DELETE /certificates/:id
router.get("/verify/:certificateId/:token", verifyCertificate); // GET /certificates/verify/:certificateId/:token

export default router;