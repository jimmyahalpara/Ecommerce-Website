const express = require("express");
const { addCategory, getCategories } = require("../controlles/category");
const { requireSignIn, adminMiddlewere } = require("../commen-middleware");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname); //shortid is to generate random id
  },
});

const upload = multer({ storage });

router.post(
  "/category/create",
  requireSignIn,
  adminMiddlewere,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getcategory", getCategories);

module.exports = router;
