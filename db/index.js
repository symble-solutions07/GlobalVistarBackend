const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: Number,
    name: String,
    email: String,
    JoinedAs: String,
    createdAt: Number,
    time: {
      type: String,
      default: String(
        Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

const ManufacturerSchema = new mongoose.Schema(
  {
    UserNumber: String,
    UserName: String,
    UserEmail: String,
    brandName: String,
    BusinessName: String,
    BusinessType: String,
    createdAt: Number,
    time: {
      type: String,
      default: String(
        Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

const finalProducts = new mongoose.Schema(
  {
    title: String,
    owner: String,
    ownerName:String,
    companyName: String,
    joinedAs: String,
    featured: { type: Boolean, default: false },
    ProductSizes: String,
    ProductionLead: String,
    ProductShelfLife: String,
    StorageType: String,
    SupplyCapacityPerMonth: String,
    Type: String,
    expectedMargin: String,
    productimg1: String,
    image1: String,
    image2: String,
    image3: String,
    minOrderQuantity: String,
    minOrderQuantity2: String,
    minOrderQuantity3: String,
    price1: String,
    price2: String,
    price3: String,
    verified: Boolean,
    createdAt: Number,
    time: {
      type: String,
      default: String(
        Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
//products in add multiple products page.
//cloudinary image link
const enquiryForm = new mongoose.Schema(
  {
    productName: String,
    EnquiredBy: String,
    Quantity: String,
    Unit: String,
    createdAt: Number,
    time: {
      type: String,
      default: String(
        Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
   
  }
);
const companyDetails = new mongoose.Schema(
  {
    pNumber: String,
    pName: String,
    AboutCompany: String,
    GST: String,
    YearPresence: String,
    DistributionLocations: String,
    shipping: String,
    RnR: String,
    Storage: String,
    Sampling: String,
    TPMWhiteLabelling: String,
    pLife: String,
    manufac: String,
    capa: String,
    pType: String,
    pSize: String,
    fssaiImage: String,
    createdAt: Number,
    time: {
      type: String,
      default: String(
        Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ),
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companyDetails);
const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
const FinalProducts = mongoose.model("FinalProducts", finalProducts);
const EnquiryForm = mongoose.model("EnquiryForm", enquiryForm);
module.exports = {
  User,
  Company,
  FinalProducts,
  EnquiryForm,
  Manufacturer,
};
