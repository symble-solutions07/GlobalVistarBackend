// To know whether the user has already filled a form.
// If the user has already filled a particular form, go to next one.

//Both these routes could be avoided if we add a property in user's document, denoting the current step he is at.
//Steps would be, manufacturerForm, companyDetails, addProduct. Then display that step's form.

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
  try {
    const user = await Company.findOne({ pNumber: req.number });
    console.log(user);
    if (!user) {
      res.json({ msg: "Empty" });
      return;
    }
    res.json({ msg: "Filled" });
  } catch (error) {
    res.status(405).json({ message: "not Found"+error });
  }
});

module.exports = router;
