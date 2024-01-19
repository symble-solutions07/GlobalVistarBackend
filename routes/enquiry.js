const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, EnquiryForm } = require("../db");
const router = express.Router();

router.post("/product", async (req, res) => {
  const { ProductName, PhoneNumber, quantity, unit } = req.body;
  console.log(ProductName, PhoneNumber, quantity);
  let time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  console.log(time);
  const newEnquiry = new EnquiryForm({
    productName: ProductName,
    EnquiredBy: PhoneNumber,
    Quantity: quantity,
    Unit: unit,
    time:String(time),
  });
  await newEnquiry.save();
  res.json("success");
});

module.exports = router;
