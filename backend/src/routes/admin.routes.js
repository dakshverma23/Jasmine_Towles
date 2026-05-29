import express from "express";
import { adminOnly, protect } from "../middleware/auth.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const router = express.Router();

// Dashboard stats
router.get("/stats", protect, adminOnly, async (_req, res) => {
  const [totalUsers, totalOrders, totalProducts, totalCategories, recentOrders] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Category.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email")
  ]);

  const ordersByStatus = await Order.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);

  const productsByCategory = await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);

  res.json({
    totalUsers,
    totalOrders,
    totalProducts,
    totalCategories,
    recentOrders,
    ordersByStatus,
    productsByCategory
  });
});

// Users management
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

router.patch("/users/:id/role", protect, adminOnly, async (req, res) => {
  const { role } = req.body;
  if (!["customer", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(updated);
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.role === "admin") return res.status(400).json({ message: "Cannot delete admin users" });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// Categories (derived from products)
router.get("/categories", protect, adminOnly, async (_req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

export default router;
