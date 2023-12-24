const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const {
  SemiFinalProduct,
  Company,
  FinalProducts,
  Manufacturer,
} = require("../db");
const router = express.Router();

router.get("/manufacturer", authenticateJwt, async (req, res) => {
  console.log("checking for " + req.number);
  const user = await Manufacturer.findOne({ UserNumber: req.number });
  console.log(user);
  if (!user) {
    res.json({ msg: "Empty" });
    return;
  }
  res.json({ msg: "Filled" });
});
router.get("/company", authenticateJwt, async (req, res) => {
  console.log("checking for " + req.number);
  const user = await Company.findOne({ pNumber: req.number });
  console.log(user);
  if (!user) {
    res.json({ msg: "Empty" });
    return;
  }
  res.json({ msg: "Filled" });
});

module.exports = router;
