const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });

    if (cart) {
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;

      // If cart already exist then update cart by quantity
      if (item) {
        condition = { user: req.user._id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$": {
              //Here we add $ otherwise it overwrite new item and on privious
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        //if item not exists privious then add new
        condition = { user: req.user._id };
        action = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }

      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ error });

        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      // If cart already exist then create cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });

        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
