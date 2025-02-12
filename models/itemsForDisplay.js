const mongoose = require("mongoose");

// Define the schema for items
const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    item_name: {
      type: String,
      required: true
    },
    current_price: {
      type: String,
      required: true
    },
    discount_percentage: {
      type: Number,
      required: true
    },
    return_period: {
      type: Number,
      required: true
    },
    delivery_date: {
      type: Date,
      required: true
    },
    rating: {
      Material: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

// Create a model from the schema
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
