import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import OrderDetails from '../components/orders/OrderDetails';
import Button from '../components/ui/Button';
import { getOrderById } from '../services/orderService';
import { OrderWithItems } from '../types/supabase';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (err) {
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);
  
  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading order information...</p>
        </div>
      </Layout>
    );
  }
  
  if (error || !order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
          <Link to="/products">
            <Button variant="primary">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We'll start processing it right away.
          </p>
        </div>
        
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <p className="text-gray-700 mb-1">
                Your order reference number is:
              </p>
              <p className="text-lg font-bold text-green-700">
                #{order.id}
              </p>
            </div>
            <Link to="/track-order" className="mt-4 md:mt-0">
              <Button variant="outline">
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
        
        <OrderDetails order={order} />
        
        <div className="mt-8 text-center">
          <Link to="/products">
            <Button variant="primary">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;