import express from 'express';
import { getConnection } from '../db/connection.js';

const parseJson = (value, fallback) => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'object') return value;
  if (typeof value === 'string') {
    const str = value.trim();
    if (str.length === 0) return fallback;
    try {
      return JSON.parse(str);
    } catch (_e) {
      return fallback;
    }
  }
  return fallback;
};

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM products WHERE in_stock = true';
    const params = [];
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY created_at DESC';

    const [products] = await getConnection().execute(query, params);
    
    // Parse JSON fields
    const formattedProducts = products.map(product => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : undefined,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      sku: product.sku,
      images: parseJson(product.images, []),
      sizes: parseJson(product.sizes, []),
      colors: parseJson(product.colors, []),
      inStock: Boolean(product.in_stock),
      stockQuantity: product.stock_quantity,
      isNew: Boolean(product.is_new),
      isSale: Boolean(product.is_sale),
      isFeatured: Boolean(product.is_featured),
      tags: parseJson(product.tags, []),
      weight: product.weight ? parseFloat(product.weight) : undefined,
      dimensions: parseJson(product.dimensions, null),
      careInstructions: product.care_instructions,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [products] = await getConnection().execute(
      'SELECT * FROM products WHERE id = ?',
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = products[0];
    const formattedProduct = {
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      originalPrice: product.original_price ? parseFloat(product.original_price) : undefined,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand,
      sku: product.sku,
      images: parseJson(product.images, []),
      sizes: parseJson(product.sizes, []),
      colors: parseJson(product.colors, []),
      inStock: Boolean(product.in_stock),
      stockQuantity: product.stock_quantity,
      isNew: Boolean(product.is_new),
      isSale: Boolean(product.is_sale),
      isFeatured: Boolean(product.is_featured),
      tags: parseJson(product.tags, []),
      weight: product.weight ? parseFloat(product.weight) : undefined,
      dimensions: parseJson(product.dimensions, null),
      careInstructions: product.care_instructions,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      brand,
      sku,
      images = [],
      sizes = [],
      colors = [],
      inStock = true,
      stockQuantity = 0,
      isNew = false,
      isSale = false,
      isFeatured = false,
      tags = [],
      weight,
      dimensions,
      careInstructions
    } = req.body;

    const [result] = await getConnection().execute(
      `INSERT INTO products (
        name, description, price, original_price, category, subcategory, brand, sku,
        images, sizes, colors, in_stock, stock_quantity, is_new, is_sale, is_featured,
        tags, weight, dimensions, care_instructions
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name || '',
        description || '',
        price ?? 0,
        originalPrice ?? null,
        category,
        subcategory || null,
        brand || null,
        sku || null,
        JSON.stringify(images || []),
        JSON.stringify(sizes || []),
        JSON.stringify(colors || []),
        !!inStock,
        stockQuantity ?? 0,
        !!isNew,
        !!isSale,
        !!isFeatured,
        JSON.stringify(tags || []),
        weight ?? null,
        JSON.stringify(dimensions || null),
        careInstructions || null
      ]
    );

    res.json({ id: result.insertId.toString(), message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      brand,
      sku,
      images,
      sizes,
      colors,
      inStock,
      stockQuantity,
      isNew,
      isSale,
      isFeatured,
      tags,
      weight,
      dimensions,
      careInstructions
    } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (name !== undefined) { updateFields.push('name = ?'); updateValues.push(name); }
    if (description !== undefined) { updateFields.push('description = ?'); updateValues.push(description); }
    if (price !== undefined) { updateFields.push('price = ?'); updateValues.push(price); }
    if (originalPrice !== undefined) { updateFields.push('original_price = ?'); updateValues.push(originalPrice); }
    if (category !== undefined) { updateFields.push('category = ?'); updateValues.push(category); }
    if (subcategory !== undefined) { updateFields.push('subcategory = ?'); updateValues.push(subcategory); }
    if (brand !== undefined) { updateFields.push('brand = ?'); updateValues.push(brand); }
    if (sku !== undefined) { updateFields.push('sku = ?'); updateValues.push(sku); }
    if (images !== undefined) { updateFields.push('images = ?'); updateValues.push(JSON.stringify(images)); }
    if (sizes !== undefined) { updateFields.push('sizes = ?'); updateValues.push(JSON.stringify(sizes)); }
    if (colors !== undefined) { updateFields.push('colors = ?'); updateValues.push(JSON.stringify(colors)); }
    if (inStock !== undefined) { updateFields.push('in_stock = ?'); updateValues.push(inStock); }
    if (stockQuantity !== undefined) { updateFields.push('stock_quantity = ?'); updateValues.push(stockQuantity); }
    if (isNew !== undefined) { updateFields.push('is_new = ?'); updateValues.push(isNew); }
    if (isSale !== undefined) { updateFields.push('is_sale = ?'); updateValues.push(isSale); }
    if (isFeatured !== undefined) { updateFields.push('is_featured = ?'); updateValues.push(isFeatured); }
    if (tags !== undefined) { updateFields.push('tags = ?'); updateValues.push(JSON.stringify(tags)); }
    if (weight !== undefined) { updateFields.push('weight = ?'); updateValues.push(weight); }
    if (dimensions !== undefined) { updateFields.push('dimensions = ?'); updateValues.push(JSON.stringify(dimensions)); }
    if (careInstructions !== undefined) { updateFields.push('care_instructions = ?'); updateValues.push(careInstructions); }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(id);

    await getConnection().execute(
      `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await getConnection().execute('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
