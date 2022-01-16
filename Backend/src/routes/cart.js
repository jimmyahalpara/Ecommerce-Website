const express = require("express");
const router = express.Router();

const { addItemToCart } = require("../controlles/cart");
const { requireSignIn, userMiddlewere } = require("../commen-middleware");

router.post("/cart/addToCart", requireSignIn, userMiddlewere, addItemToCart);
// router.get("/category/getcategory", getCategories);

module.exports = router;
