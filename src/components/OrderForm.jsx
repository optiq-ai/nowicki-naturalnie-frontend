import React, { useState } from 'react';
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarIcon, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import useSound from "../hooks/use-sound";

const OrderForm = ({ selectedProducts, setSelectedProducts, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    deliveryDate: null,
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const { playButtonClick, playPigGrunt } = useSound();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDateSelect = (date) => {
    setFormData(prev => ({ ...prev, deliveryDate: date }));
    if (errors.deliveryDate) {
      setErrors(prev => ({ ...prev, deliveryDate: null }));
    }
    playButtonClick();
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    playButtonClick();
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setSelectedProducts(prev => 
      prev.map(p => 
        p.id === productId 
          ? { ...p, quantity: newQuantity } 
          : p
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Nazwa firmy jest wymagana';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Niepoprawny format email';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Telefon jest wymagany';
    }
    
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Adres dostawy jest wymagany';
    }
    
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Data dostawy jest wymagana';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      playPigGrunt();
    }
  };

  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--primary-color)] font-[var(--header-font)]">Dane zamawiającego</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Nazwa firmy</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className={errors.customerName ? "border-red-500" : ""}
              />
              {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
            </div>
            
            <div>
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={handleChange}
                className={errors.customerEmail ? "border-red-500" : ""}
              />
              {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
            </div>
            
            <div>
              <Label htmlFor="customerPhone">Telefon</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                className={errors.customerPhone ? "border-red-500" : ""}
              />
              {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
            </div>
            
            <div>
              <Label htmlFor="deliveryAddress">Adres dostawy</Label>
              <Textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                className={errors.deliveryAddress ? "border-red-500" : ""}
                rows={3}
              />
              {errors.deliveryAddress && <p className="text-red-500 text-sm mt-1">{errors.deliveryAddress}</p>}
            </div>
            
            <div>
              <Label htmlFor="deliveryDate">Data dostawy</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      errors.deliveryDate ? "border-red-500" : ""
                    }`}
                    onMouseEnter={playButtonClick}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.deliveryDate ? (
                      format(formData.deliveryDate, "PPP", { locale: pl })
                    ) : (
                      <span>Wybierz datę</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.deliveryDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    locale={pl}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
            </div>
            
            <div>
              <Label htmlFor="notes">Uwagi do zamówienia</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--primary-color)] font-[var(--header-font)]">Podsumowanie zamówienia</h2>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-[var(--primary-color)]/10">
                <TableRow>
                  <TableHead>Produkt</TableHead>
                  <TableHead className="text-center">Ilość</TableHead>
                  <TableHead className="text-right">Cena jedn.</TableHead>
                  <TableHead className="text-right">Wartość</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => {
                              handleUpdateQuantity(product.id, product.quantity - 1);
                              playButtonClick();
                            }}
                            disabled={product.quantity <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-2 w-8 text-center">{product.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => {
                              handleUpdateQuantity(product.id, product.quantity + 1);
                              playButtonClick();
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{product.price.toFixed(2)} zł</TableCell>
                      <TableCell className="text-right font-medium">
                        {(product.price * product.quantity).toFixed(2)} zł
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveProduct(product.id)}
                          className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      Brak produktów w zamówieniu
                    </TableCell>
                  </TableRow>
                )}
                {selectedProducts.length > 0 && (
                  <TableRow className="bg-[var(--background-color)]">
                    <TableCell colSpan={3} className="text-right font-bold">
                      Suma:
                    </TableCell>
                    <TableCell className="text-right font-bold text-[var(--primary-color)]">
                      {totalAmount.toFixed(2)} zł
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={handleSubmit} 
              disabled={selectedProducts.length === 0}
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-lg py-6"
              onMouseEnter={playButtonClick}
            >
              Złóż zamówienie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
