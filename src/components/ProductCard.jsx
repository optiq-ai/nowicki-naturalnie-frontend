import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { toast } from "../hooks/use-toast";
import useSound from "../hooks/use-sound";

const ProductCard = ({ product, onProductSelect }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity
  const { playButtonClick, playPigGrunt } = useSound();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(''); // Allow clearing the input
    }
  };

  const handleAddClick = () => {
    if (quantity > 0) {
      onProductSelect({ ...product, quantity });
      // Play pig grunt sound when product is added
      playPigGrunt();
      // Show toast notification when product is added
      toast({
        title: "Produkt dodany do zamówienia",
        description: `${product.name} (${quantity} ${product.unit}) został dodany do zamówienia.`,
        duration: 3000,
      });
      // Reset quantity after adding
      setQuantity(1);
    }
  };

  const getAvailabilityBadgeVariant = (availability) => {
    switch (availability) {
      case 'dostępny':
        return 'success'; // Assuming you have a 'success' variant or default green
      case 'mało':
        return 'warning'; // Assuming you have a 'warning' variant or default yellow/orange
      case 'niedostępny':
        return 'destructive'; // Assuming you have a 'destructive' variant or default red
      default:
        return 'secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="card-premium flex flex-col h-full border-[var(--secondary-color)] hover:border-[var(--primary-color)]">
        <CardHeader className="bg-[var(--background-color)] rounded-t-lg">
          {/* Product Image */}
          <div className="aspect-square w-full bg-[var(--accent-color)] rounded-md mb-4 flex items-center justify-center overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full rounded-md" />
              ) : (
                <span className="text-sm text-[var(--text-color)]">[Zdjęcie]</span>
              )}
            </motion.div>
          </div>
          <CardTitle className="text-lg font-[var(--header-font)] text-[var(--primary-color)]">{product.name}</CardTitle>
          <CardDescription className="text-[var(--text-color)]">{product.category} / {product.subcategory}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
          <p className="text-sm text-[var(--text-color)]">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[var(--primary-color)]">{product.price.toFixed(2)} zł / {product.unit}</span>
            <Badge variant={getAvailabilityBadgeVariant(product.availability)} className="badge-premium">{product.availability}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 bg-[var(--background-color)] rounded-b-lg">
          <div className="flex-grow flex items-center gap-2">
            <Label htmlFor={`quantity-${product.id}`} className="sr-only">Ilość</Label>
            <Input
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="form-input-premium w-20 text-center"
              disabled={product.availability === 'niedostępny'}
            />
            <span className="text-sm text-[var(--text-color)]">{product.unit}</span>
          </div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={handleAddClick}
              disabled={product.availability === 'niedostępny' || !quantity || quantity <= 0}
              className="w-full hover-lift bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
              onMouseEnter={playButtonClick}
            >
              Dodaj
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
