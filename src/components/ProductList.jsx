import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { toast } from "../hooks/use-toast";
import useSound from "../hooks/use-sound";
import { Plus, Minus, Trash2 } from "lucide-react";

const ProductList = ({ onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const { playButtonClick, playPigGrunt } = useSound();

  // Load products on mount
  React.useEffect(() => {
    // Import the products dynamically to avoid bundling issues
    import('../data/products_meat.json')
      .then((module) => {
        const loadedProducts = module.default;
        setProducts(loadedProducts);
        setFilteredProducts(loadedProducts);
      })
      .catch((error) => {
        console.error('Error loading products:', error);
        toast({
          title: "Błąd ładowania produktów",
          description: "Nie udało się załadować listy produktów. Spróbuj odświeżyć stronę.",
          variant: "destructive",
        });
      });
  }, []);

  // Generate unique categories and subcategories from the actual data
  const categories = ['all', ...new Set(products.map(p => p.category))];
  const subcategories = ['all', ...new Set(products.map(p => p.subcategory))];
  const availabilities = ['all', 'dostępny', 'mało', 'niedostępny'];

  // Filter logic
  React.useEffect(() => {
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

  const handleAddProduct = (product, quantity = 1) => {
    if (quantity > 0) {
      onProductSelect({ ...product, quantity });
      playPigGrunt();
      toast({
        title: "Produkt dodany do zamówienia",
        description: `${product.name} (${quantity} ${product.unit}) został dodany do zamówienia.`,
        duration: 3000,
      });
    }
  };

  const getAvailabilityBadgeVariant = (availability) => {
    switch (availability) {
      case 'dostępny':
        return 'success';
      case 'mało':
        return 'warning';
      case 'niedostępny':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-[var(--background-color)] text-[var(--text-color)] shadow-sm">
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
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-[var(--border-color)] rounded-md bg-[var(--background-color)] text-[var(--text-color)]"
            onMouseEnter={playButtonClick}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'Wszystkie' : cat}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="subcategory">Podkategoria</Label>
          <select
            id="subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="w-full mt-1 p-2 border border-[var(--border-color)] rounded-md bg-[var(--background-color)] text-[var(--text-color)]"
            onMouseEnter={playButtonClick}
          >
            {subcategories.map(subcat => (
              <option key={subcat} value={subcat}>{subcat === 'all' ? 'Wszystkie' : subcat}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="availability">Dostępność</Label>
          <select
            id="availability"
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="w-full mt-1 p-2 border border-[var(--border-color)] rounded-md bg-[var(--background-color)] text-[var(--text-color)]"
            onMouseEnter={playButtonClick}
          >
            {availabilities.map(avail => (
              <option key={avail} value={avail}>{avail === 'all' ? 'Wszystkie' : avail}</option>
            ))}
          </select>
        </div>
      </div>

      {/* B2B Table View */}
      <div className="rounded-md border border-[var(--border-color)] overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--primary-color)]/10">
            <TableRow>
              <TableHead className="w-[80px]">Kod</TableHead>
              <TableHead className="w-[80px]">Zdjęcie</TableHead>
              <TableHead>Nazwa produktu</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Dostępność</TableHead>
              <TableHead className="text-right">Cena (zł)</TableHead>
              <TableHead className="text-center w-[150px]">Ilość</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-[var(--background-color)]">
                  <TableCell className="font-medium">{product.id.split('_')[1]}</TableCell>
                  <TableCell>
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-[var(--accent-color)] flex items-center justify-center">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-xs text-[var(--text-color)]">[Zdjęcie]</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category} / {product.subcategory}</TableCell>
                  <TableCell>
                    <Badge variant={getAvailabilityBadgeVariant(product.availability)}>
                      {product.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{product.price.toFixed(2)} / {product.unit}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          const input = document.getElementById(`quantity-${product.id}`);
                          const currentValue = parseInt(input.value, 10) || 0;
                          if (currentValue > 1) {
                            input.value = currentValue - 1;
                          }
                          playButtonClick();
                        }}
                        disabled={product.availability === 'niedostępny'}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id={`quantity-${product.id}`}
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-14 mx-1 text-center"
                        disabled={product.availability === 'niedostępny'}
                      />
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => {
                          const input = document.getElementById(`quantity-${product.id}`);
                          const currentValue = parseInt(input.value, 10) || 0;
                          input.value = currentValue + 1;
                          playButtonClick();
                        }}
                        disabled={product.availability === 'niedostępny'}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
                      onClick={() => {
                        const input = document.getElementById(`quantity-${product.id}`);
                        const quantity = parseInt(input.value, 10) || 1;
                        handleAddProduct(product, quantity);
                      }}
                      disabled={product.availability === 'niedostępny'}
                      onMouseEnter={playButtonClick}
                    >
                      Dodaj
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  Nie znaleziono produktów spełniających kryteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
