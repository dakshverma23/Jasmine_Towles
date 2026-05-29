import express from "express";
import { adminOnly, protect } from "../middleware/auth.js";
import Category from "../models/Category.js";

const router = express.Router();

// Get all categories (public)
router.get("/", async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// Get single category by slug (public)
router.get("/:slug", async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

// Create category (admin)
router.post("/", protect, adminOnly, async (req, res) => {
  const { name, description, images, videos } = req.body;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const exists = await Category.findOne({ slug });
  if (exists) return res.status(400).json({ message: "Category already exists" });

  if (images && images.length > 10) {
    return res.status(400).json({ message: "Maximum 10 images allowed" });
  }
  if (videos && videos.length > 2) {
    return res.status(400).json({ message: "Maximum 2 videos allowed" });
  }

  const category = await Category.create({ name, slug, description, images: images || [], videos: videos || [] });
  res.status(201).json(category);
});

// Update category (admin)
router.put("/:id", protect, adminOnly, async (req, res) => {
  const { name, description, images, videos } = req.body;

  if (images && images.length > 10) {
    return res.status(400).json({ message: "Maximum 10 images allowed" });
  }
  if (videos && videos.length > 2) {
    return res.status(400).json({ message: "Maximum 2 videos allowed" });
  }

  const updateData = { description };
  if (name) {
    updateData.name = name;
    updateData.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }
  if (images !== undefined) updateData.images = images;
  if (videos !== undefined) updateData.videos = videos;

  const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
  if (!updated) return res.status(404).json({ message: "Category not found" });
  res.json(updated);
});

// Delete category (admin)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  const deleted = await Category.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category deleted" });
});

export default router;
