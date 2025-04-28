import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { toast } from "../hooks/use-toast";

const ProductCard = ({ product, onProductSelect }) => {
  const [quantity, setQuantity] = useState(1); // Default quantity

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
      // Show toast notification when product is added
      toast({
        title: "Produkt dodany do koszyka",
        description: `${product.name} (${quantity} ${product.unit}) został dodany do koszyka.`,
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
      <Card className="flex flex-col h-full">
        <CardHeader>
          {/* Placeholder for Image */}
          <div className="aspect-square w-full bg-muted rounded-md mb-4 flex items-center justify-center overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
            >
              <span className="text-sm text-muted-foreground">[Zdjęcie]</span>
              {/* <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full rounded-md" /> */}
            </motion.div>
          </div>
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <CardDescription>{product.category} / {product.subcategory}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{product.price.toFixed(2)} zł / {product.unit}</span>
            <Badge variant={getAvailabilityBadgeVariant(product.availability)}>{product.availability}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
          <div className="flex-grow flex items-center gap-2">
            <Label htmlFor={`quantity-${product.id}`} className="sr-only">Ilość</Label>
            <Input
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 text-center"
              disabled={product.availability === 'niedostępny'}
            />
            <span className="text-sm text-muted-foreground">{product.unit}</span>
          </div>
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              onClick={handleAddClick}
              disabled={product.availability === 'niedostępny' || !quantity || quantity <= 0}
              className="w-full"
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
