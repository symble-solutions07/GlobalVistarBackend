import { FinalProducts } from "../db";
import { router } from "./filters";

router.post("/products/filter", async (req, res) => {
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

    // Construct MongoDB query based on the received filters
    const query = {};

    if (margin) {
      // Assuming margin is an object with min and max values
      query.margin = { $gte: margin.min, $lte: margin.max };
    }
    if (samples) {
      query.samples = samples;
    }
    if (thirdPartyManufacturing) {
      query.thirdPartyManufacturing = thirdPartyManufacturing;
    }
    if (price) {
      query.price = { $gte: price.min, $lte: price.max };
    }
    if (moq) {
      query.moq = { $gte: moq.min, $lte: moq.max };
    }
    if (shipping) {
      query.shipping = shipping;
    }
    if (shelfLife) {
      query.shelfLife = shelfLife;
    }
    if (certifications) {
      query.certifications = certifications;
    }
    // Add more conditions for other filters...
    const filteredProducts = await FinalProducts.find(query);

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
