import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Trash2, MinusCircle, PlusCircle, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";

// Define validation schema with Zod
const formSchema = z.object({
  customerName: z.string().min(2, { message: "Imię i nazwisko musi mieć co najmniej 2 znaki." }),
  customerEmail: z.string().email({ message: "Nieprawidłowy adres email." }),
  customerPhone: z.string().min(9, { message: "Numer telefonu musi mieć co najmniej 9 cyfr." }),
  deliveryAddress: z.string().min(5, { message: "Adres dostawy musi mieć co najmniej 5 znaków." }),
  deliveryDate: z.date({
    required_error: "Proszę wybrać datę dostawy.",
  }),
  notes: z.string().optional(),
});

const OrderForm = ({ selectedProducts, setSelectedProducts, onSubmit }) => {
  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "", // Placeholder - will be pre-filled later
      customerEmail: "", // Placeholder
      customerPhone: "", // Placeholder
      deliveryAddress: "", // Placeholder
      deliveryDate: undefined, // New field for delivery date
      notes: "",
    },
  });

  // Calculate order total
  const orderTotal = selectedProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setSelectedProducts(
        selectedProducts.map(p => 
          p.id === productId 
            ? { ...p, quantity: newQuantity } 
            : p
        )
      );
    }
  };

  // Handle product removal
  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Call the onSubmit prop passed from the parent (Orders.jsx)
    onSubmit(values);
  };

  return (
    <div className="space-y-8">
      {/* Selected Products Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Wybrane produkty</h3>
        
        {selectedProducts.length > 0 ? (
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
                <TableBody>
                  {selectedProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
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
                          onClick={() => handleRemoveProduct(product.id)}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col space-y-1.5 pt-4 border-t">
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
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground border rounded-md">
            <p>Brak wybranych produktów</p>
            <p className="text-sm mt-2">Wróć do zakładki Produkty, aby dodać produkty do zamówienia</p>
          </div>
        )}
      </div>

      {/* Customer Information Form */}
      {selectedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Dane zamawiającego</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię i Nazwisko</FormLabel>
                    <FormControl>
                      <Input placeholder="Jan Kowalski" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Customer Email */}
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jan.kowalski@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Customer Phone */}
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="123-456-789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Delivery Address */}
              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres Dostawy</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ul. Przykładowa 1, 00-000 Warszawa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Delivery Date - New Field */}
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data dostawy</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: pl })
                            ) : (
                              <span>Wybierz datę dostawy</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Wybierz preferowaną datę dostawy zamówienia.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uwagi do zamówienia</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Np. Proszę o wcześniejszy kontakt telefoniczny" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Złóż zamówienie</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
