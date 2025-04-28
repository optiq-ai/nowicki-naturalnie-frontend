import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import mockProducts from '../data/mockProducts';
import ProductCard from './ProductCard';
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

const ProductList = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');

  // Unique categories and subcategories for filters
  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];
  const subcategories = ['all', ...new Set(mockProducts.map(p => p.subcategory))];
  const availabilities = ['all', 'dostępny', 'mało', 'niedostępny'];

  // Load products on mount
  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  // Filter logic
  useEffect(() => {
    let tempProducts = products;

    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }
    if (selectedSubcategory !== 'all') {
      tempProducts = tempProducts.filter(p => p.subcategory === selectedSubcategory);
    }
    if (selectedAvailability !== 'all') {
      tempProducts = tempProducts.filter(p => p.availability === selectedAvailability);
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedCategory, selectedSubcategory, selectedAvailability, products]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
        <div>
          <Label htmlFor="search">Wyszukaj</Label>
          <Input
            id="search"
            type="text"
            placeholder="Szukaj produktu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="category">Kategoria</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category" className="mt-1">
              <SelectValue placeholder="Wszystkie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat === 'all' ? 'Wszystkie' : cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="subcategory">Podkategoria</Label>
          <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
            <SelectTrigger id="subcategory" className="mt-1">
              <SelectValue placeholder="Wszystkie" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map(subcat => (
                <SelectItem key={subcat} value={subcat}>{subcat === 'all' ? 'Wszystkie' : subcat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="availability">Dostępność</Label>
          <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
            <SelectTrigger id="availability" className="mt-1">
              <SelectValue placeholder="Wszystkie" />
            </SelectTrigger>
            <SelectContent>
              {availabilities.map(avail => (
                <SelectItem key={avail} value={avail}>{avail === 'all' ? 'Wszystkie' : avail}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid with Animation */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onProductSelect={onProductSelect} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-muted-foreground py-8"
            >
              Nie znaleziono produktów spełniających kryteria.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProductList;
