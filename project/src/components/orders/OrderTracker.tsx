import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import OrderDetails from './OrderDetails';
import { getOrderById } from '../../services/orderService';
import { OrderWithItems } from '../../types/supabase';

const OrderTracker: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
      if (!data) {
        setError('Order not found. Please check the ID and try again.');
      }
    } catch (err) {
      setError('Failed to retrieve order information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Track Your Order</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackOrder} className="flex flex-col md:flex-row gap-3">
            <div className="flex-grow">
              <Input
                placeholder="Enter your order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                error={error || ''}
                fullWidth
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              leftIcon={<Search size={18} />}
              isLoading={isLoading}
            >
              Track Order
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {searched && !isLoading && (
        <>
          {order ? (
            <OrderDetails order={order} />
          ) : !error && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                No order found with the provided ID. Please check and try again.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTracker;