const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { authenticateJwt } = require("../middleware/auth");
const {
  Company,
  FinalProducts,
  Manufacturer,
} = require("../db");

const router = express.Router();

cloudinary.config({
  cloud_name: "darvi8iej",
  api_key: "256717274762731",
  api_secret: "zhxPyCQ20J15mrWPZoby4E-9ZTA",
});
//upload a single image to cloudinary and delete the image after its done.
async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath); 
    //transformation is supposed to add the globalvistar name on each photo, but this is not currently working.  
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
// multer setup.
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
//api of first form.
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

//api of second form.
router.post(
  "/uploadCompanyDetails",
  authenticateJwt,
  upload.single("file"),
  // uploadMultiple,
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
      pNumber: req.number,
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

// var uploadMultiple = upload.fields([{ name: "images", maxCount: 5 }]);
//adds one product.
//to add multiple products, multiple POST requests are sent from frontend.
router.post(
  "/addProduct",
  authenticateJwt,
  upload.single("image"),
  // uploadMultiple,
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
    console.log(ProductShelfLife);
    // console.log(req.images);
    // console.log(req.files.images);
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
      image1: cloudinaryRes["url"],
      minOrderQuantity,
      minOrderQuantity2,
      minOrderQuantity3,
      name,
      price1:price,
      price2,
      price3,
      verified:false,
    });
    product.save();
    res.json({ message: "Product added successfully" });
  }
);
module.exports = router;
