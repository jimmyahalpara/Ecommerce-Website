const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("firstName is required"),
  check("lastName").notEmpty().withMessage("Last Name is empty"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must required atleast 6 character"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must required atleast 6 character"),
];
exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length != 0) {
    return res.status(400).json({
      errors: errors.array()[0].msg,
    });
  }
  next();
};
