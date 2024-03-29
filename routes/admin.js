//this router is not being used. 

const express = require("express");
const { User,  Admin, FinalProducts } = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/addProduct", async (req, res) => {
  console.log("adding product ", req.body);
  const product = new Products(req.body);
  await product.save();
  res.json({ message: "Product added successfully", productID: product.id });
});
router.post("/addFinalProduct", async (req, res) => {

  console.log("adding final product ");
  console.log("adding final product ", req.body);
  
  const FinalProduct = new FinalProducts(req.body);
  await FinalProduct.save();
  res.json({
    message: "Final Product added successfully",
    productID: FinalProduct.id,
  });
});

router.get("/allProducts", authenticateJwt, async (req, res) => {
  const products = await FinalProducts.find({});
  res.json({ products });
});

router.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  const product = await FinalProducts.findById(productId);
  console.log(product)
  res.json({ product });
});

module.exports = router;
