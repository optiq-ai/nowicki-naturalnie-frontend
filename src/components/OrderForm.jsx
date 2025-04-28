import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "./ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Define validation schema with Zod
const formSchema = z.object({
  customerName: z.string().min(2, { message: "Imię i nazwisko musi mieć co najmniej 2 znaki." }),
  customerEmail: z.string().email({ message: "Nieprawidłowy adres email." }),
  customerPhone: z.string().min(9, { message: "Numer telefonu musi mieć co najmniej 9 cyfr." }),
  deliveryAddress: z.string().min(5, { message: "Adres dostawy musi mieć co najmniej 5 znaków." }),
  notes: z.string().optional(),
});

const OrderForm = ({ onSubmit }) => {
  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "", // Placeholder - will be pre-filled later
      customerEmail: "", // Placeholder
      customerPhone: "", // Placeholder
      deliveryAddress: "", // Placeholder
      notes: "",
    },
  });

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Call the onSubmit prop passed from the parent (Orders.jsx)
    // This function will have access to selectedProducts from the parent state
    onSubmit(values);
    // Optionally reset the form or show success message
    // form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Customer Name (Placeholder) */}
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię i Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Jan Kowalski (pobrane z logowania)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Customer Email (Placeholder) */}
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="jan.kowalski@example.com (pobrane z logowania)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Customer Phone (Placeholder) */}
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="123-456-789 (pobrane z logowania)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Delivery Address (Placeholder) */}
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adres Dostawy</FormLabel>
              <FormControl>
                <Textarea placeholder="ul. Przykładowa 1, 00-000 Warszawa (pobrane z logowania)" {...field} />
              </FormControl>
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
  );
};

export default OrderForm;
