import multer from "multer";

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ message: "Photo must be 5 MB or smaller" });
    }
    return res.status(400).json({ message: error.message });
  }

  const status = error.status || 500;
  return res.status(status).json({
    message: status === 500 ? "An unexpected error occurred" : error.message,
  });
};
