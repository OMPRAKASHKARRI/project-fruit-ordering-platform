import React from 'react';
import Layout from '../components/layout/Layout';
import OrderTracker from '../components/orders/OrderTracker';

const TrackOrderPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
        <p className="text-gray-600 mb-8">
          Enter your order ID to check the current status of your delivery.
        </p>
        
        <OrderTracker />
      </div>
    </Layout>
  );
};

export default TrackOrderPage;