import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
},
    track: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    issuedDate: {
      type: Date,
      required: true,
    },
    certificateId: { type: String, required: true, unique: true }, 
    verifyToken: { type: String, required: true, unique: true }, 
  },
  { timestamps: true },
);

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
