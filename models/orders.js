const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  user_id: String,
  products: [],
  total_price: Number,
  total_quantity: Number,
  status: {
    type: String,
    enum: ["pending", "printing", "shipped", "delivered"],
  },
  created: { type: Date, default: Date.now() },
});

const Orders = mongoose.model("Order", ordersSchema, "orders");

module.exports = Orders;
