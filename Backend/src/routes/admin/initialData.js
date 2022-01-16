const express = require("express");
const { initialData } = require("../../controlles/admin/initialData");
const router = express.Router();

router.post("/initialdata", initialData);

module.exports = router;
