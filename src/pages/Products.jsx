import React from 'react';
import ProductList from '../components/ProductList';
import { Button } from '../components/ui/button';
import { ShoppingCart } from 'lucide-react';

function Products() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produkty</h1>
      <p className="text-gray-600 mb-8">
        Przeglądaj naszą ofertę produktów mięsnych najwyższej jakości. Wszystkie produkty pochodzą z lokalnych hodowli i są przetwarzane zgodnie z tradycyjnymi recepturami.
      </p>
      
      <ProductList />
    </div>
  )
}

export default Products
