import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Check, ArrowRight } from "lucide-react";

const OrderDetails = ({ orderDetails, onNewOrder }) => {
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Zamówienie przyjęte</h2>
        <p className="text-muted-foreground">
          Dziękujemy za złożenie zamówienia. Poniżej znajdują się szczegóły Twojego zamówienia.
        </p>
      </div>

      <div className="space-y-6">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium">Podsumowanie zamówienia</h3>
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Numer zamówienia</p>
              <p className="font-medium">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data zamówienia</p>
              <p className="font-medium">{formatDate(orderDetails.orderDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wartość zamówienia</p>
              <p className="font-medium">{orderDetails.totalAmount.toFixed(2)} zł</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium">Przyjęte do realizacji</p>
            </div>
          </div>
        </motion.div>

        {/* Customer Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium">Dane zamawiającego</h3>
          <div className="p-4 border rounded-lg space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Imię i nazwisko</p>
              <p className="font-medium">{orderDetails.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{orderDetails.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{orderDetails.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adres dostawy</p>
              <p className="font-medium">{orderDetails.deliveryAddress}</p>
            </div>
            {orderDetails.notes && (
              <div>
                <p className="text-sm text-muted-foreground">Uwagi</p>
                <p className="font-medium">{orderDetails.notes}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-medium">Zamówione produkty</h3>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead className="text-right">Cena</TableHead>
                  <TableHead className="text-center">Ilość</TableHead>
                  <TableHead className="text-right">Suma</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category} / {product.subcategory}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{product.price.toFixed(2)} zł/{product.unit}</TableCell>
                    <TableCell className="text-center">{product.quantity}</TableCell>
                    <TableCell className="text-right font-medium">
                      {(product.price * product.quantity).toFixed(2)} zł
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col space-y-1.5 pt-4 border-t">
            <div className="flex justify-between text-sm">
              <span>Suma częściowa</span>
              <span>{orderDetails.totalAmount.toFixed(2)} zł</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Dostawa</span>
              <span>0.00 zł</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Razem</span>
              <span>{orderDetails.totalAmount.toFixed(2)} zł</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-6 flex justify-center"
        >
          <Button onClick={onNewOrder} className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            Złóż nowe zamówienie
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetails;
