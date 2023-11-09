const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, EnquiryForm } = require("../db");
const router = express.Router();

router.post("/product", async (req, res) => {
  const { ProductName, PhoneNumber, quantity, unit } = req.body;
  console.log(ProductName, PhoneNumber, quantity);
 const newEnquiry = new EnquiryForm({
   productName: ProductName,
   EnquiredBy: PhoneNumber,
   Quantity: quantity,
   Unit: unit,
 });
 await newEnquiry.save();
 res.json("success")
});

module.exports = router;
