const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { authenticateJwt } = require("../middleware/auth");
const {
  SemiFinalProduct,
  Company,
  FinalProducts,
  Manufacturer,
} = require("../db");
const app = express();
const router = express.Router();
// mongoose.connect(
//   "mongodb+srv://symblesolutions:GlobalVistar2023@cluster0.wsgyalp.mongodb.net/exp"
// );

cloudinary.config({
  cloud_name: "dwrlwv8gz",
  api_key: "347916874514594",
  api_secret: "iAeix3iBN2R8ln1zFDyKdGMbDzg",
});

async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    cloudinary.image("cld-sample-5.jpg", {
      transformation: [
        { height: 800, width: 800, crop: "thumb" },
        {
          color: "#00C3358C",
          overlay: {
            font_family: "helvetica",
            font_size: 40,
            text_decoration: "underline",
            text_align: "left",
            text: "Global%20Vistar",
          },
        },
        { flags: "layer_apply", gravity: "south", x: 0, y: 12 },
        { height: 10, width: 10, crop: "mpad" },
      ],
    });
    console.log("File uploaded successfully to Cloudinary:", result);

    deleteFileAfterDelay("./" + filePath);
    return result;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

function deleteFileAfterDelay(filePath) {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting the file: ${err}`);
      } else {
        console.log(`File ${filePath} has been successfully deleted.`);
      }
    });
  }, 3000);
}
router.post(
  "/addManufacturer",
  authenticateJwt,
  upload.single("file"),
  async (req, res) => {
    const {
      UserNumber,
      UserName,
      UserEmail,
      brandName,
      BusinessName,
      BusinessType,
    } = req.body;
    console.log(
      UserNumber,
      UserName,
      UserEmail,
      brandName,
      BusinessName,
      BusinessType
    );
    console.log(req.body);

    const product = new Manufacturer({
      UserNumber,
      UserName,
      UserEmail,
      brandName,
      BusinessName,
      BusinessType,
    });
    product.save();
    res.json({ message: "Product added successfully" });
  }
);
router.post(
  "/uploadCompanyDetails",
  authenticateJwt,
  upload.single("file"),
  async (req, res) => {
    const {
      pNumber,
      pName,
      AboutCompany,
      GST,
      YearPresence,
      DistributionLocations,
      shipping,
      RnR,
      Storage,
      Sampling,
      TPMWhiteLabelling,
      pLife,
      manufac,
      capa,
      pType,
      pSize,
    } = req.body;
    console.log(
      pNumber,
      pName,
      AboutCompany,
      GST,
      YearPresence,
      DistributionLocations,
      shipping,
      RnR,
      Storage,
      Sampling,
      TPMWhiteLabelling,
      pLife,
      manufac,
      capa,
      pType,
      pSize
    );
    console.log(req.body);
    console.log(req.file);
    let cloudinaryRes = await uploadToCloudinary(req.file.path);
    console.log(cloudinaryRes);
    console.log(cloudinaryRes["url"]);
    const product = new Company({
      pNumber,
      pName,
      AboutCompany,
      GST,
      YearPresence,
      DistributionLocations,
      shipping,
      RnR,
      Storage,
      Sampling,
      TPMWhiteLabelling,
      pLife,
      manufac,
      capa,
      pType,
      pSize,
      fssaiImage: cloudinaryRes["url"],
    });
    product.save();
    res.json({ message: "Product added successfully" });
  }
);
router.post(
  "/addProduct",
  authenticateJwt,
  upload.single("image"),
  async (req, res) => {
    const {
      ProductShelfLife,
      ProductSizes,
      ProductionLead,
      StorageType,
      SupplyCapacityPerMonth,
      Type,
      expectedMargin,
      image,
      minOrderQuantity,
      minOrderQuantity2,
      minOrderQuantity3,
      name,
      price,
      price2,
      price3,
    } = req.body;
    console.log(req.file);
    try {
      var cloudinaryRes = await uploadToCloudinary(req.file.path);

      console.log("Cloudinary response:", cloudinaryRes);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error uploading to Cloudinary",
        error: error.message,
      });
    }

    console.log(cloudinaryRes["url"]);
    const product = new FinalProducts({
      title: name,
      owner: req.number,
      ProductShelfLife,
      ProductSizes,
      ProductionLead,
      StorageType,
      SupplyCapacityPerMonth,
      Type,
      expectedMargin,
      image: cloudinaryRes["url"],
      minOrderQuantity,
      minOrderQuantity2,
      minOrderQuantity3,
      name,
      price,
      price2,
      price3,
    });
    product.save();
    res.json({ message: "Product added successfully" });
  }
);
module.exports = router;
// app.listen(3003, () => {
//   console.log("started");
// });
