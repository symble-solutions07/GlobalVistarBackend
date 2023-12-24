const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: Number,
  name: String,
  email: String,
  JoinedAs: String,
});

const ManufacturerSchema = new mongoose.Schema({
  UserNumber: String,
  UserName: String,
  UserEmail: String,
  brandName: String,
  BusinessName: String,
  BusinessType: String,
});
const product = new mongoose.Schema({
  nameOfProduct: String,
  moq1: Number,
  ppp1: Number,
  moq2: Number,
  ppp2: Number,
  moq3: Number,
  ppp3: Number,
  verified: Boolean,
});
const productDetails = new mongoose.Schema({
  phoneNumber: String,
  Pname: String,
  LeadTimeInDays: String,
  YearPresence: String,
  shipping: String,
  RnR: String,
  storage: String,
  Sampling: String,
  TPM: String,
  productLife: String,
  manufacturingPlace: String,
  capacity: String,
  productType: String,
  productSize: String,
});
const finalProducts = new mongoose.Schema({
  title: String,
  owner: String,
  ProductSizes: String,
  ProductionLead: String,
  ProductShelfLife:String,
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
});
//products in add multiple products page.
//cloudinary image link
const productSchema = new mongoose.Schema({
  productName: String,
  creator: String,
  imageLink: String,
  price: String,
  MoQ: String,
  margin: String,
});
const enquiryForm = new mongoose.Schema({
  productName: String,
  EnquiredBy: String,
  Quantity: String,
  Unit: String,
  time: String,
});
const companyDetails = new mongoose.Schema({
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
});
const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companyDetails);
const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
const Products = mongoose.model("Products", product);
const ProductDetails = mongoose.model("ProductDetails", productDetails);
const FinalProducts = mongoose.model("FinalProducts", finalProducts);
const SemiFinalProduct = mongoose.model("ProductSchema", productSchema);
const EnquiryForm = mongoose.model("EnquiryForm", enquiryForm);
module.exports = {
  User,
  Company,
  Products,
  ProductDetails,
  FinalProducts,
  EnquiryForm,
  SemiFinalProduct,
  Manufacturer,
};
