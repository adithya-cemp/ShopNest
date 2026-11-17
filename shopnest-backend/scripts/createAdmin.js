require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
(async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    await mongoose.connect(process.env.MONGODB_URI);
    const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    const user = await User.findOneAndUpdate({ email }, { name: 'ShopNest Admin', email, password, role: 'admin' }, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    console.log(`Admin ready: ${user.email}`);
  } catch (err) { console.error(err.message); process.exitCode = 1; }
  finally { await mongoose.disconnect(); }
})();
