import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";
import { slugify } from "../utils/slugify.js";

export async function getItems(req, res) {
  const { category, q, active } = req.query;

  const filter = {};
  if (category) filter.categorySlug = String(category).toLowerCase();
  if (active === "true") filter.isActive = true;
  if (active === "false") filter.isActive = false;

  let itemsQuery;

  if (q && String(q).trim()) {
    itemsQuery = MenuItem.find({ ...filter, $text: { $search: String(q).trim() } });
  } else {
    itemsQuery = MenuItem.find(filter);
  }

  const items = await itemsQuery.sort({ categorySlug: 1, sortOrder: 1, createdAt: 1 }).lean();
  res.json({ items });
}

export async function getItem(req, res) {
  const item = await MenuItem.findOne({ slug: req.params.slug }).lean();
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ item });
}

export async function createItem(req, res) {
  const body = req.body ?? {};
  const { name, slug, price, categorySlug } = body;

  if (!name) return res.status(400).json({ message: "name is required" });
  if (price === undefined || price === null) return res.status(400).json({ message: "price is required" });
  if (!categorySlug) return res.status(400).json({ message: "categorySlug is required" });

  const cat = await Category.findOne({ slug: String(categorySlug).toLowerCase() });
  if (!cat) return res.status(400).json({ message: "categorySlug does not exist" });

  const finalSlug = slugify(slug || name);
  const exists = await MenuItem.findOne({ slug: finalSlug });
  if (exists) return res.status(409).json({ message: "Item slug already exists" });

  const item = await MenuItem.create({
    ...body,
    slug: finalSlug,
    categorySlug: String(categorySlug).toLowerCase()
  });

  res.status(201).json({ item });
}

export async function updateItem(req, res) {
  const updates = req.body ?? {};
  if (updates.slug) updates.slug = slugify(updates.slug);
  if (updates.categorySlug) updates.categorySlug = String(updates.categorySlug).toLowerCase();

  if (updates.categorySlug) {
    const cat = await Category.findOne({ slug: updates.categorySlug });
    if (!cat) return res.status(400).json({ message: "categorySlug does not exist" });
  }

  const item = await MenuItem.findOneAndUpdate({ slug: req.params.slug }, updates, { new: true }).lean();
  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json({ item });
}

export async function deleteItem(req, res) {
  const item = await MenuItem.findOneAndDelete({ slug: req.params.slug });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ ok: true });
}
