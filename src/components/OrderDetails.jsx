import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";

const OrderDetails = ({ products = [], onUpdateQuantity, onRemoveProduct }) => {
  // Calculate order total
  const orderTotal = products.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-4">
      {products.length > 0 ? (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead className="text-right">Cena</TableHead>
                  <TableHead className="text-center">Ilość</TableHead>
                  <TableHead className="text-right">Suma</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <AnimatePresence initial={false}>
                <TableBody>
                  {products.map((product) => (
                    <motion.tr
                      key={product.id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout // Enable layout animation for smooth reordering/removal
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category} / {product.subcategory}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)} zł/{product.unit}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                            disabled={product.quantity <= 1}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={product.quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 1) {
                                handleQuantityChange(product.id, value);
                              }
                            }}
                            className="h-8 w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {(product.price * product.quantity).toFixed(2)} zł
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveProduct(product.id)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </AnimatePresence>
            </Table>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col space-y-1.5 pt-4 border-t"
          >
            <div className="flex justify-between text-sm">
              <span>Suma częściowa</span>
              <span>{orderTotal.toFixed(2)} zł</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Dostawa</span>
              <span>0.00 zł</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Razem</span>
              <span>{orderTotal.toFixed(2)} zł</span>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-muted-foreground"
        >
          <p>Brak wybranych produktów</p>
          <p className="text-sm mt-2">Wybierz produkty z listy, aby dodać je do zamówienia</p>
        </motion.div>
      )}
    </div>
  );
};

export default OrderDetails;
