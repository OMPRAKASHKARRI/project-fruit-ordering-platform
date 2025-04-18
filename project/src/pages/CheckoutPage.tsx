import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import OrderForm from '../components/orders/OrderForm';
import OrderSummary from '../components/orders/OrderSummary';
import { useCartStore } from '../store/cartStore';

const CheckoutPage: React.FC = () => {
  const { items } = useCartStore();
  
  // Redirect to cart if there are no items
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderForm />
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;