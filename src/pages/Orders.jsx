import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ClipboardList, FileText, Package } from "lucide-react";
import useSound from "../hooks/use-sound";

function Orders() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [orderDetails, setOrderDetails] = useState(null);
  const { playButtonClick } = useSound();

  // Handler for when a product is selected from the product list
  const handleProductSelect = (product) => {
    // Check if product is already in the list
    const existingProductIndex = selectedProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex > -1) {
      // If product exists, update its quantity
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex] = {
        ...updatedProducts[existingProductIndex],
        quantity: updatedProducts[existingProductIndex].quantity + product.quantity
      };
      setSelectedProducts(updatedProducts);
    } else {
      // If product doesn't exist, add it
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Handler for when order form is submitted
  const handleOrderSubmit = (formData) => {
    // Create order details object combining form data and selected products
    const order = {
      ...formData,
      products: selectedProducts,
      orderDate: new Date().toISOString(),
      totalAmount: selectedProducts.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      )
    };

    // Set order details and switch to confirmation tab
    setOrderDetails(order);
    setActiveTab("confirmation");
    playButtonClick();

    // In a real application, you would send this data to a backend API
    console.log("Order submitted:", order);
  };

  // Handler for starting a new order
  const handleNewOrder = () => {
    setSelectedProducts([]);
    setOrderDetails(null);
    setActiveTab("products");
    playButtonClick();
  };

  // Handler for the "Go to order" button
  const handleGoToOrder = () => {
    setActiveTab("order");
    playButtonClick();
  };

  const totalItemsInCart = selectedProducts.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = selectedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[var(--primary-color)] font-[var(--header-font)]">Panel Zamówień B2B</h1>
        {/* Conditionally render Go to Order button */}
        {activeTab === "products" && selectedProducts.length > 0 && (
          <Button 
            onClick={handleGoToOrder} 
            className="flex items-center gap-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
            onMouseEnter={playButtonClick}
          >
            <ClipboardList className="h-4 w-4" />
            Przejdź do formularza ({totalItemsInCart} poz. | {totalValue.toFixed(2)} zł)
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[var(--background-color)] border border-[var(--border-color)]">
          <TabsTrigger 
            value="products" 
            className="data-[state=active]:bg-[var(--primary-color)] data-[state=active]:text-white flex items-center gap-2"
            onClick={() => playButtonClick()}
          >
            <Package className="h-4 w-4" />
            Produkty
          </TabsTrigger>
          <TabsTrigger 
            value="order" 
            disabled={selectedProducts.length === 0}
            className="data-[state=active]:bg-[var(--primary-color)] data-[state=active]:text-white flex items-center gap-2"
            onClick={() => playButtonClick()}
          >
            <ClipboardList className="h-4 w-4" />
            Formularz zamówienia
          </TabsTrigger>
          <TabsTrigger 
            value="confirmation" 
            disabled={!orderDetails}
            className="data-[state=active]:bg-[var(--primary-color)] data-[state=active]:text-white flex items-center gap-2"
            onClick={() => playButtonClick()}
          >
            <FileText className="h-4 w-4" />
            Potwierdzenie
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card className="border-[var(--border-color)] shadow-md">
            <CardContent className="pt-6">
              <ProductList onProductSelect={handleProductSelect} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order" className="mt-6">
          <Card className="border-[var(--border-color)] shadow-md">
            <CardContent className="pt-6">
              <OrderForm
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                onSubmit={handleOrderSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmation" className="mt-6">
          <Card className="border-[var(--border-color)] shadow-md">
            <CardContent className="pt-6">
              {orderDetails && (
                <OrderDetails
                  orderDetails={orderDetails}
                  onNewOrder={handleNewOrder}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Orders;
