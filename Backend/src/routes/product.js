const express = require("express");
const { requireSignIn, adminMiddlewere } = require("../commen-middleware");
const { createProduct } = require("../controlles/product");
const router = express.Router();
const path = require('path')
const multer = require("multer");
const shortid = require("shortid");

/**
 * We manually create folder upload and link that path using 'path' inbuilt directory.
 * we create storage of file and upload it 
 * can do without storage direct giving to multer but direct it store not readable formate
 * const upload = multer({ dist:'uploads/' }); // It will make /upload folder and store file there.
 */
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);    //shortid is to generate random id
  },
});


const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignIn,
  adminMiddlewere,
  upload.array("productPictures"),
  createProduct
);

// router.get("/product/getcategory", getCategories);

module.exports = router;
