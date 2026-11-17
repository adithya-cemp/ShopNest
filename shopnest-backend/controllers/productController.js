const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

exports.getProducts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category.toLowerCase();
  if (req.query.maxPrice !== undefined) {
    const maxPrice = Number(req.query.maxPrice);
    if (!Number.isFinite(maxPrice) || maxPrice < 0) return res.status(400).json({ success: false, message: 'maxPrice must be a non-negative number.' });
    filter.price = { $lte: maxPrice };
  }
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: products.length, products });
});
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json(product);
});
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, product });
});
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  res.json({ success: true, message: 'Product deleted successfully.' });
});
