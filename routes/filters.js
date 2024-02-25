//this router exposes,

const { Router } = require("express");
const { FinalProducts, Company } = require("../db");
const router = Router();

router.post("/products", async (req, res) => {
  try {
    const {
      margin,
      samples,
      thirdPartyManufacturing,
      price,
      moq,
      shipping,
      shelfLife,
      certifications,
    } = req.body;
    console.log(req.body);
    // Construct MongoDB query based on the received filters
    const query = { verified: true };

    if (margin) {
      // Assuming margin is an object with min and max values
      query.margin = { $gte: margin.min, $lte: margin.max };
    }

    if (price) {
      query.price = { $gte: price.min, $lte: price.max };
    }
    if (moq) {
      query.moq = { $gte: moq.min, $lte: moq.max };
    }

    if (shelfLife) {
      query.shelfLife = shelfLife;
    }

    // construct query to filter out companies based on filters..
    let companyQuery = {};
    if (shipping) {
      companyQuery.shipping = "Available";
    }
    if (certifications) {
      companyQuery.certifications = certifications;
    }
    if (samples) {
      companyQuery.Sampling = "yes";
    }
    if (thirdPartyManufacturing) {
      companyQuery["TPMWhiteLabelling"] = thirdPartyManufacturing;
      // console.log("setting");
    }

    if (Object.keys(companyQuery).length > 0) {
      const filteredCompanies = await Company.find(companyQuery);
      const companyIDs = filteredCompanies.map((company) => company.pNumber);
      // console.log(companyIDs);
      query.owner = { $in: companyIDs };
    }
    // console.log(query);

    const filteredProducts = await FinalProducts.find(query);
    console.log(filteredProducts.length);
    res.json(filteredProducts);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
