// This router will serve the dashboard routes,

const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const {
  User,
  Products,
  ProductDetails,
  FinalProducts,
  enquiryForm,
  Company,
  Manufacturer,
} = require("../db");
const router = express.Router();

//this route responds an array containing how many forms have been filled by the user, to display his profile's completeness.
router.get("/", authenticateJwt, async (req, res) => {
  let formsfilled = [];
  console.log("checking for " + req.number);
  const manuForm = await Manufacturer.findOne({ UserNumber: req.number });

  if (manuForm) formsfilled.push("manufacturer");

  const companyForm = await Company.findOne({ pNumber: req.number });
  console.log(companyForm);
  if (companyForm) {
    formsfilled.push("company");
  }
  res.json({ formsfilled });
});

//will respond the products listed by the currently logged in user.
router.get("/products", authenticateJwt, async (req, res) => {
  //req.number is set by the authenticateJwt middleware.
  const products = await FinalProducts.find({
    verified: true,
    owner: String(req.number),
  });
  console.log(products);
  res.json({ products });
});

//responds the enquiries for the products by currently logged in user.
router.get("/enquiries", authenticateJwt, async (req, res) => {
  console.log(req.number);
  const products = await FinalProducts.find({
    verified: true,
    owner: String(req.number),
  });
  let enquiries = [];
  products.map(async (product) => {
    product.title;
    const enquiry = await enquiryForm.find({
      productName: product.title,
    });
    enquiries.push(enquiry);
  });
  res.json({ enquiries });
});

module.exports = router;
