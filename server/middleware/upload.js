import multer from "multer";
import path from "node:path";
const storage = multer.diskStorage({
  destination: "uploads/",

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(16).slice(2)}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    };
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes[file.mimetype]?.includes(extension)) {
      return cb(null, true);
    }

    const error = new Error("Please upload a JPEG, PNG, or WebP image");
    error.status = 400;
    cb(error);
  },
});

export default upload;
