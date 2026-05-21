'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Edit, Trash2, Eye, Star, Shield,
  X, Upload, Save, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  rank: string;
  level: number;
  skins: number;
  price: number;
  region: string;
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
}

const mockProducts: Product[] = [];

export default function AdminProductsPage() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', originalPrice: '', rank: 'Legendary',
    level: '', skins: '', legendarySkins: '', epicSkins: '', region: 'Global',
    battlePass: '', cpBalance: '', weapons: '', tags: '', status: 'available' as string,
    featured: false,
  });

  const handleSave = () => {
    // In production: save to Firebase Firestore
    alert('Product saved! (Connect Firebase to persist data)');
    setShowForm(false);
    setEditProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-white/50">Manage your CODM account listings</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowForm(true); }}
          className="btn-primary-blue !py-2.5 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="input-field !pl-10"
          />
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center overflow-y-auto p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="glass rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/5 text-white/50">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/60 mb-2">Account Name *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Legendary Commander Account" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/60 mb-2">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field !h-24 resize-none" placeholder="Describe the account..." />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Price (GHS) *</label>
                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" placeholder="2500" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Original Price (optional)</label>
                    <input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input-field" placeholder="3200" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Rank *</label>
                    <select value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })} className="input-field">
                      <option>Legendary</option><option>Master</option><option>Grand Master</option>
                      <option>Elite</option><option>Veteran</option><option>Pro</option><option>Hardened</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Level *</label>
                    <input type="number" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="input-field" placeholder="150" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Total Skins</label>
                    <input type="number" value={form.skins} onChange={(e) => setForm({ ...form, skins: e.target.value })} className="input-field" placeholder="85" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Legendary Skins</label>
                    <input type="number" value={form.legendarySkins} onChange={(e) => setForm({ ...form, legendarySkins: e.target.value })} className="input-field" placeholder="12" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Region</label>
                    <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="input-field">
                      <option>Global</option><option>NA</option><option>EU</option><option>ASIA</option><option>ME</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Battle Pass</label>
                    <input type="text" value={form.battlePass} onChange={(e) => setForm({ ...form, battlePass: e.target.value })} className="input-field" placeholder="Season 1-12" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">CP Balance</label>
                    <input type="number" value={form.cpBalance} onChange={(e) => setForm({ ...form, cpBalance: e.target.value })} className="input-field" placeholder="500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/60 mb-2">Images</label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary-bright/30 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-white/20 mx-auto mb-2" />
                      <p className="text-sm text-white/40">Click to upload images</p>
                      <p className="text-xs text-white/20 mt-1">Connect Cloudinary for image uploads</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-white/60 mb-2">Tags (comma-separated)</label>
                    <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="input-field" placeholder="featured, premium, rare" />
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-white/20 bg-surface-navy text-primary-bright focus:ring-primary-bright"
                    />
                    <label className="text-sm text-white/60">Featured product (shown on homepage)</label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button onClick={() => setShowForm(false)} className="btn-ghost text-sm">Cancel</button>
                  <button onClick={handleSave} className="btn-primary-blue text-sm">
                    <Save className="w-4 h-4 mr-2" />
                    {editProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Table */}
      <div className="glass rounded-xl overflow-hidden">
        {mockProducts.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Shield className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white/50 mb-2">No Products Yet</h3>
            <p className="text-sm text-white/30 mb-6">Add your first CODM account listing to get started</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary-blue text-sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-white/40 font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-white/40 font-medium">Price</th>
                  <th className="text-left px-4 py-3 text-white/40 font-medium">Rank</th>
                  <th className="text-left px-4 py-3 text-white/40 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-white/40 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map products here in production */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
