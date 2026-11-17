const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication required. Provide a Bearer token.' });
  const token = header.split(' ')[1];
  let decoded;
  try { decoded = jwt.verify(token, process.env.JWT_SECRET); }
  catch { return res.status(401).json({ success: false, message: 'Invalid or expired token.' }); }
  const user = await User.findById(decoded.id).select('_id name email role');
  if (!user) return res.status(401).json({ success: false, message: 'User associated with this token no longer exists.' });
  req.user = user;
  next();
});

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden: administrator access required.' });
  next();
};
module.exports = { protect, adminOnly };
