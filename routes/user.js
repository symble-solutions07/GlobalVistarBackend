//this router exposes,

const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const {
  User,
  Products,
  ProductDetails,
  FinalProducts,
  Company,
  Manufacturer,
} = require("../db");
const router = express.Router();
//to return the user details, using the authenticateJwt.
router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.number });
  console.log(user);
  if (!user) {
    res.status(403).json({ msg: "User doesn't exist" });
    return;
  }
  res.json({
    user,
  });
});

router.post("/signup", async (req, res) => {
  const { phoneNumber, name, email, registerAs } = req.body;
  console.log(name);
  const user = await User.findOne({ phoneNumber });
  if (user) {
    console.log(user);
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      phoneNumber,
      name,
      email,
      JoinedAs: registerAs,
    });
    await newUser.save();
    const token = jwt.sign({ phoneNumber, role: "user" }, SECRET, {
      expiresIn: "10h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  console.log(phoneNumber + "trying to login");
  if (user) {
    const token = jwt.sign({ phoneNumber, role: "user" }, SECRET, {
      expiresIn: "10h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});
//this route is used before sending OTP to the user(on login page and signup page.)
router.post("/check", async (req, res) => {
  const { phoneNumber } = req.body;
  const user = await User.findOne({ phoneNumber });
  console.log("checking" + user);
  if (user) {
    res.status(200).json({ message: "Exists" });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

//addProduct route expects body to be in this form
// title: String,
// description: String,
// price: Number,
// moq: Number,
//deprecated. to be removed.
router.post("/addProduct", async (req, res) => {
  console.log("adding product", req.body);
  req.body.verified = false;
  const product = new Products(req.body);
  product.save();
  // if (product._id) return 1;
  // let check = addProductToDB(req.body);
  // if (check !== 1) res.json({ message: "Unable to add product" });
  res.json({ message: "Product added successfully" });
});

router.post("/ProductDetails", async (req, res) => {
  // const products = req.body;
  console.log("here");
  console.log(req.body);
  const productd = new ProductDetails(req.body);
  productd.save();
  res.json("hello");
});

router.get("/products", authenticateJwt, async (req, res) => {
  const products = await Products.find({ verified: true });
  console.log(products);
  res.json({ products });
});

//internal product page.
router.get("/ProductDetails/:productID", async (req, res) => {
  const productId = req.params.productID;
  const product = await FinalProducts.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  const companyDetails = await Company.find({ pNumber: product.owner });
  const ManufacturerDetails = await Manufacturer.find({
    UserNumber: product.owner,
  });
  console.log(product, companyDetails[0], ManufacturerDetails[0]);

  const combined = {
    product,
    companyDetails: companyDetails[0],
    ManufacturerDetails: ManufacturerDetails[0],
  };

  console.log(combined);
  res.json({ combined });
});

router.get("/allProducts", async (req, res) => {
  const products = await FinalProducts.find({ verified: true });
  res.json({ products });
});

//to display featuredProducts on the homepage.
router.get("/featuredProducts", async (req, res) => {
  const products = await FinalProducts.find({ verified: true, featured: true });
  console.log(products);
  res.json({ products });
});

module.exports = router;
