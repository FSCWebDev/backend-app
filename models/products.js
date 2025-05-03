const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  base_price: Number,
  available_colors: [],
  image_urls: [],
  thumbnail_url: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.methods.setThumbnail = function () {
  if (!this.image_urls.length) this.thumbnail_url = "N/A";
  else this.thumbnail_url = this.image_urls[0];
};

productSchema.pre("save", function (next) {
  this.setThumbnail();
  next();
});

productSchema.set("toJSON", {
  versionKey: false,
});

const Products = mongoose.model("Product", productSchema, "products");

module.exports = Products;
