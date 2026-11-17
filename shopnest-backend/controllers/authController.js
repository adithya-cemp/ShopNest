const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const makeToken = (user) => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  if (String(password).length < 8) return res.status(400).json({ success: false, message: 'Password must contain at least 8 characters.' });
  const normalizedEmail = String(email).trim().toLowerCase();
  if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  const hashedPassword = await bcrypt.hash(password, 12);
  // Public registration always creates a regular user. Admins are provisioned separately.
  const user = await User.create({ name, email: normalizedEmail, password: hashedPassword, role: 'user' });
  res.status(201).json({ success: true, message: 'Registration successful.', token: makeToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required.' });
  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  res.json({ success: true, message: 'Login successful.', token: makeToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});
