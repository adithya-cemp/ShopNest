const Order = require('../models/Order');
const asyncHandler = require('../utils/asyncHandler');
exports.createOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
  for (const item of items) {
    if (!item.name || !Number.isInteger(Number(item.quantity)) || Number(item.quantity) < 1 || !Number.isFinite(Number(item.price)) || Number(item.price) < 0)
      return res.status(400).json({ success: false, message: 'Each item needs a name, positive integer quantity and non-negative price.' });
  }
  const normalizedItems = items.map(({ name, quantity, price }) => ({ name, quantity: Number(quantity), price: Number(price) }));
  const totalAmount = Number(normalizedItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2));
  const order = await Order.create({ userId: req.user._id, items: normalizedItems, totalAmount });
  res.status(201).json({ success: true, order });
});
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).populate('userId', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, count: orders.length, orders });
});
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'shipped', 'delivered'].includes(status)) return res.status(400).json({ success: false, message: 'Status must be pending, shipped or delivered.' });
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true }).populate('userId', 'name email');
  if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
  res.json({ success: true, order });
});
