import crypto from "crypto";
import Certificate from "../models/Certificate.js";

// helper: random verify token generate karta hai
function generateToken() {
  return crypto.randomBytes(4).toString("hex").toUpperCase(); // e.g. "9F3A2B7C"
}

async function generateCertificateId(issuedDate) {
  const year = new Date(issuedDate).getFullYear();
  const count = await Certificate.countDocuments({
    certificateId: { $regex: `^VXT-${year}-` },
  });
  const seq = String(count + 1).padStart(4, "0"); // 0001, 0002...
  return `VXT-${year}-${seq}`;
}

// -------------------- ADD --------------------
// POST /certificates
export const addCertificate = async (req, res) => {
  try {
    const { name, email, track, startDate, endDate, issuedDate } = req.body;

    if (!name || !email || !track || !startDate || !endDate || !issuedDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const certificateId = await generateCertificateId(issuedDate);
    const verifyToken = generateToken();

    const certificate = await Certificate.create({
      name,
      email,
      track,
      startDate,
      endDate,
      issuedDate,
      certificateId,
      verifyToken,
    });

    

    res.status(201).json({ certificate });
  } catch (err) {
    res.status(500).json({ message: "Failed to create certificate", error: err.message });
  }
};

// -------------------- DELETE --------------------
// DELETE /certificates/:id   (id = MongoDB _id)
export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Certificate.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json({ message: "Certificate deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete certificate", error: err.message });
  }
};

// -------------------- VERIFY (fetch by URL token) --------------------
// GET /certificates/verify/:certificateId/:token
// Jab koi QR scan kare / URL pe click kare, ye function chalega
export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId, token } = req.params;

    const certificate = await Certificate.findOne({
      certificateId,
      verifyToken: token,
    });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found or invalid link" });
    }

    res.status(200).json({ valid: true, certificate });
  } catch (err) {
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
};