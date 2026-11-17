const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, lowercase: true },
  brand: { type: String, default: 'ShopNest' },
  thumbnail: { type: String, default: '' },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  stock: { type: Number, default: 0, min: 0 }
}, { timestamps: true });
productSchema.index({ category: 1, price: 1 });
module.exports = mongoose.model('Product', productSchema);
