import React, { useEffect, useState } from 'react';
import { Plus, X, Upload, Trash2, Tag, Link as LinkIcon } from 'lucide-react';
import { productsService } from '../services/firestore';
import type { Product } from '../types/Product';

const EnhancedAddProductModal = ({ isOpen, onClose, initialProduct }: { isOpen: boolean; onClose: (didSave?: boolean) => void; initialProduct?: Partial<Product> & { id?: string } }) => {
  const [currentTab, setCurrentTab] = useState('basic');
  const [productData, setProductData] = useState({
    // Basic Information
    name: '',
    shortDescription: '',
    description: '',
    brand: '',
    sku: '',
    category: 'women',
    subcategory: '',
    tags: [],
    
    // Pricing & Inventory
    price: 0,
    originalPrice: 0,
    costPrice: 0,
    stockQuantity: 0,
    lowStockThreshold: 5,
    manageStock: true,
    inStock: true,
    
    // Product Variants
    hasVariants: false,
    colors: [],
    sizes: [],
    materials: [],
    
    // Images & Media
    images: [],
    
    // Shipping & Dimensions
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0
    },
    shippingClass: 'standard',
    
    // SEO & Marketing
    metaTitle: '',
    metaDescription: '',
    isNew: false,
    isFeatured: false,
    isSale: false,
    
    // Additional Info
    careInstructions: '',
    returnPolicy: 'returnable',
    warranty: '',
    taxClass: 'standard'
  });

  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState({ name: '', code: '#000000' });
  const [newSize, setNewSize] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const API_BASE = (import.meta as any).env.VITE_API_URL || 'http://localhost:4001/api';

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    try {
      setUploading(true);
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append('files', f));
      const resp = await fetch(`${API_BASE}/uploads`, { method: 'POST', body: fd });
      if (!resp.ok) throw new Error('Upload failed');
      const data = await resp.json();
      const urls = (data.files || []).map((f: any) => f.url).filter(Boolean);
      if (urls.length) updateProductData('images', [...productData.images, ...urls]);
    } catch (e) {
      console.error(e);
      alert('One or more images failed to upload');
    } finally {
      setUploading(false);
    }
  };

  // Prefill when editing
  React.useEffect(() => {
    if (!initialProduct) return;
    setProductData((prev: any) => ({
      ...prev,
      name: initialProduct.name ?? prev.name,
      description: initialProduct.description ?? prev.description,
      category: (initialProduct.category as any) ?? prev.category,
      price: initialProduct.price ?? prev.price,
      originalPrice: (initialProduct as any).originalPrice ?? prev.originalPrice,
      images: Array.isArray(initialProduct.images) ? initialProduct.images : prev.images,
      sizes: Array.isArray(initialProduct.sizes) ? initialProduct.sizes : prev.sizes,
      colors: Array.isArray(initialProduct.colors) ? initialProduct.colors : prev.colors,
      inStock: initialProduct.inStock ?? prev.inStock,
      isNew: (initialProduct as any).isNew ?? prev.isNew,
      isSale: (initialProduct as any).isSale ?? prev.isSale,
      brand: (initialProduct as any).brand ?? prev.brand,
      sku: (initialProduct as any).sku ?? prev.sku,
      subcategory: (initialProduct as any).subcategory ?? prev.subcategory,
      tags: Array.isArray((initialProduct as any).tags) ? (initialProduct as any).tags : prev.tags,
    }));
  }, [initialProduct]);

  const categories = [
    { value: 'women', label: 'Women' },
    { value: 'men', label: 'Men' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const subcategories = {
    women: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Lingerie', 'Shoes'],
    men: ['Shirts', 'T-Shirts', 'Pants', 'Suits', 'Shoes', 'Accessories'],
    kids: ['Boys Clothing', 'Girls Clothing', 'Baby Clothes', 'Shoes', 'Toys'],
    accessories: ['Bags', 'Jewelry', 'Watches', 'Belts', 'Sunglasses', 'Hats']
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'pricing', label: 'Pricing & Stock', icon: '💰' },
    { id: 'variants', label: 'Variants', icon: '🎨' },
    { id: 'media', label: 'Images', icon: '📸' },
    { id: 'shipping', label: 'Shipping', icon: '📦' },
    { id: 'seo', label: 'SEO & Marketing', icon: '🔍' }
  ];

  const updateProductData = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !productData.tags.includes(newTag.trim())) {
      updateProductData('tags', [...productData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    updateProductData('tags', productData.tags.filter(tag => tag !== tagToRemove));
  };

  const addColor = () => {
    if (newColor.name.trim()) {
      updateProductData('colors', [...productData.colors, { ...newColor, id: Date.now() }]);
      setNewColor({ name: '', code: '#000000' });
    }
  };

  const removeColor = (colorId) => {
    updateProductData('colors', productData.colors.filter(color => color.id !== colorId));
  };

  const addSize = () => {
    if (newSize.trim() && !productData.sizes.includes(newSize.trim())) {
      updateProductData('sizes', [...productData.sizes, newSize.trim()]);
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    updateProductData('sizes', productData.sizes.filter(size => size !== sizeToRemove));
  };

  const handleSave = async () => {
    if (!productData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (productData.price <= 0) {
      alert('Please enter a valid price');
      return;
    }
    if (!productData.description.trim()) {
      alert('Product description is required');
      return;
    }

    // Map to LUXE Product shape expected by storefront/API
    const payload = {
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      originalPrice: productData.originalPrice ? Number(productData.originalPrice) : undefined,
      category: productData.category as 'women' | 'men' | 'kids' | 'accessories',
      images: productData.images, // string[] of URLs
      sizes: productData.sizes && productData.sizes.length ? productData.sizes : undefined,
      colors: productData.colors && productData.colors.length ? productData.colors.map((c: any) => c.name || c) : undefined,
      inStock: Boolean(productData.inStock),
      isNew: Boolean(productData.isNew),
      isSale: Boolean(productData.isSale)
    } as any;

    try {
      setSaving(true);
      if (initialProduct?.id) {
        await productsService.update(String(initialProduct.id), payload);
        alert('Product updated successfully');
      } else {
        await productsService.add(payload);
        alert('Product added successfully');
      }
      setSaving(false);
      onClose(true);
    } catch (e) {
      console.error(e);
      setSaving(false);
      alert('Failed to add product');
    }
  };

  if (!isOpen) return null;

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
        <input
          type="text"
          value={productData.name}
          onChange={(e) => updateProductData('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <input
          type="text"
          value={productData.shortDescription}
          onChange={(e) => updateProductData('shortDescription', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Brief description for product listings"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          value={productData.description}
          onChange={(e) => updateProductData('description', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Detailed product description, features, benefits..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            value={productData.brand}
            onChange={(e) => updateProductData('brand', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Brand name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input
            type="text"
            value={productData.sku}
            onChange={(e) => updateProductData('sku', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Product code"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={productData.category}
            onChange={(e) => updateProductData('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
          <select
            value={productData.subcategory}
            onChange={(e) => updateProductData('subcategory', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select subcategory</option>
            {subcategories[productData.category]?.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Add tags for better search"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {productData.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 text-blue-600 hover:text-blue-800">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹) *</label>
          <input
            type="number"
            value={productData.price || ''}
            onChange={(e) => updateProductData('price', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
          <input
            type="number"
            value={productData.originalPrice || ''}
            onChange={(e) => updateProductData('originalPrice', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (₹)</label>
          <input
            type="number"
            value={productData.costPrice || ''}
            onChange={(e) => updateProductData('costPrice', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={productData.inStock}
            onChange={(e) => updateProductData('inStock', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          In stock
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={productData.isNew}
            onChange={(e) => updateProductData('isNew', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          Mark as New Arrival
        </label>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={productData.isSale}
            onChange={(e) => updateProductData('isSale', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          Mark as On Sale
        </label>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-48 bg-gray-50 border-r p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {currentTab === 'basic' && renderBasicInfo()}
              {currentTab === 'pricing' && renderPricing()}
              {currentTab === 'variants' && (
                <div className="text-center py-8 text-gray-500">
                  Variants tab content (Colors, Sizes, Materials)
                </div>
              )}
              {currentTab === 'media' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Add Image URL</label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newImageUrl.trim()) {
                            updateProductData('images', [...productData.images, newImageUrl.trim()]);
                            setNewImageUrl('');
                          }
                        }}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                      >
                        <LinkIcon className="h-4 w-4" /> Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleUploadFiles(e.target.files)}
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {productData.images.map((url, idx) => (
                      <div key={idx} className="relative border rounded-lg overflow-hidden">
                        <img src={url} alt="" className="w-full h-40 object-cover" />
                        <button
                          type="button"
                          onClick={() => updateProductData('images', productData.images.filter((_: string, i: number) => i !== idx))}
                          className="absolute top-2 right-2 bg-white/80 text-red-600 rounded-full p-1 hover:bg-white"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {currentTab === 'shipping' && (
                <div className="text-center py-8 text-gray-500">
                  Shipping & dimensions
                </div>
              )}
              {currentTab === 'seo' && (
                <div className="text-center py-8 text-gray-500">
                  SEO & marketing options
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo Component
const ProductsPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const items = await productsService.getAll();
      setProducts(items);
      setError(null);
    } catch (e) {
      console.error(e);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-5 w-5" /> Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 capitalize">{p.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{p.price?.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.inStock ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{Array.isArray(p.images) ? p.images.length : 0}</td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    <button
                      onClick={() => { setEditingProduct(p); setShowModal(true); }}
                      className="px-2 py-1 text-blue-600 hover:text-blue-800 border border-blue-200 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Delete ${p.name}?`)) return;
                        try {
                          await productsService.delete(p.id as unknown as string);
                          await fetchProducts();
                        } catch (e) {
                          alert('Failed to delete');
                        }
                      }}
                      className="px-2 py-1 text-red-600 hover:text-red-800 border border-red-200 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EnhancedAddProductModal
        isOpen={showModal}
        initialProduct={editingProduct ?? undefined}
        onClose={(didSave?: boolean) => {
          setShowModal(false);
          setEditingProduct(null);
          if (didSave) fetchProducts();
        }}
      />
    </div>
  );
};

export default ProductsPage;