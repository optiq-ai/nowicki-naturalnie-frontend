import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";

function Orders() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [orderDetails, setOrderDetails] = useState(null);

  // Handler for when a product is selected from the product list
  const handleProductSelect = (product) => {
    // Check if product is already in the list
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      // If product exists, update its quantity
      setSelectedProducts(
        selectedProducts.map(p => 
          p.id === product.id 
            ? { ...p, quantity: p.quantity + 1 } 
            : p
        )
      );
    } else {
      // If product doesn't exist, add it with quantity 1
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    
    // Optionally switch to the order tab after adding a product
    setActiveTab("order");
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
    
    // In a real application, you would send this data to a backend API
    console.log("Order submitted:", order);
  };

  // Handler for starting a new order
  const handleNewOrder = () => {
    setSelectedProducts([]);
    setOrderDetails(null);
    setActiveTab("products");
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Zamówienia</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Produkty</TabsTrigger>
          <TabsTrigger value="order" disabled={selectedProducts.length === 0}>
            Formularz zamówienia
          </TabsTrigger>
          <TabsTrigger value="confirmation" disabled={!orderDetails}>
            Potwierdzenie
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ProductList onProductSelect={handleProductSelect} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="order" className="mt-6">
          <Card>
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
          <Card>
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
