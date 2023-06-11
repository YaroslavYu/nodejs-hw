const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers");

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
    cb(HttpError(400, "File can have only .jpg or .png extension"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: multerConfig,
  limits,
  fileFilter,
});

module.exports = upload;
