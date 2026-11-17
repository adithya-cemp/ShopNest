
require('dotenv').config();
require('dns').setServers(['8.8.8.8']);
const mongoose = require('mongoose');
const Product = require('../models/Product');

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const products = [
  {
    title: "Wireless Headphones",
    description: "Comfortable Bluetooth headphones with rich sound.",
    price: 49.99, category: "electronics", brand: "ShopNest",
    thumbnail: imageUrl("photo-1505740420928-5e560c06d30e"),
    rating: 4.3, stock: 16
  },
  {
    title: "Smart Watch",
    description: "Fitness tracking and everyday smart notifications.",
    price: 79.99, category: "electronics", brand: "ShopNest",
    thumbnail: imageUrl("photo-1523275335684-37898b6baf30"),
    rating: 4.4, stock: 17
  },
  {
    title: "Portable Bluetooth Speaker",
    description: "Compact speaker with clear audio.",
    price: 35.5, category: "electronics", brand: "ShopNest",
    thumbnail: imageUrl("photo-1608043152269-423dbba4e7e1"),
    rating: 4.5, stock: 18
  },
  {
    title: "Classic Backpack",
    description: "Everyday backpack with multiple compartments.",
    price: 39.99, category: "mens-bags", brand: "ShopNest",
    thumbnail: imageUrl("photo-1553062407-98eeb64c6a62"),
    rating: 4.6, stock: 19
  },
  {
    title: "Leather Wallet",
    description: "Slim wallet with practical card slots.",
    price: 24.99, category: "mens-accessories", brand: "ShopNest",
    thumbnail: imageUrl("photo-1627123424574-724758594e93"),
    rating: 4.7, stock: 20
  },
  {
    title: "Running Shoes",
    description: "Lightweight shoes for daily running.",
    price: 59.99, category: "mens-shoes", brand: "ShopNest",
    thumbnail: imageUrl("photo-1542291026-7eec264c27ff"),
    rating: 4.8, stock: 21
  },
  {
    title: "Cotton T-Shirt",
    description: "Soft cotton everyday T-shirt.",
    price: 18.99, category: "mens-shirts", brand: "ShopNest",
    thumbnail: imageUrl("photo-1521572163474-6864f9cf17ab"),
    rating: 4.2, stock: 22
  },
  {
    title: "Women Handbag",
    description: "Versatile handbag for daily use.",
    price: 54.99, category: "womens-bags", brand: "ShopNest",
    thumbnail: imageUrl("photo-1584917865442-de89df76afd3"),
    rating: 4.3, stock: 23
  },
  {
    title: "Sunglasses",
    description: "Modern sunglasses with UV protection.",
    price: 22.5, category: "womens-accessories", brand: "ShopNest",
    thumbnail: imageUrl("photo-1511499767150-a48a237f0083"),
    rating: 4.4, stock: 24
  },
  {
    title: "Skincare Set",
    description: "Daily skincare essentials set.",
    price: 29.99, category: "beauty", brand: "ShopNest",
    thumbnail: imageUrl("photo-1608248543803-ba4f8c70ae0b"),
    rating: 4.5, stock: 25
  },
  {
    title: "Ceramic Coffee Mug",
    description: "Minimal ceramic mug for hot beverages.",
    price: 12.99, category: "home-decoration", brand: "ShopNest",
    thumbnail: imageUrl("photo-1514228742587-6b1558fcca3d"),
    rating: 4.6, stock: 26
  },
  {
    title: "Desk Lamp",
    description: "Adjustable desk lamp for study and work.",
    price: 27.99, category: "home-decoration", brand: "ShopNest",
    thumbnail: imageUrl("photo-1507473885765-e6ed057f782c"),
    rating: 4.7, stock: 27
  }
].map(product => ({
  ...product,
  images: [product.thumbnail]
}));

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    const inserted = await Product.insertMany(products);

    console.log(`Seeded ${inserted.length} ShopNest products.`);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
