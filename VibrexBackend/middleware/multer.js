import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".mp4") {
    cb(new Error("File type not supported"), false);
    return;
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });
export default upload;
