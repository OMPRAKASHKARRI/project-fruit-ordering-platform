import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import OrderDetails from '../orders/OrderDetails';
import { getOrderById, updateOrderStatus } from '../../services/orderService';
import { OrderWithItems } from '../../types/supabase';
import { OrderStatus } from '../../types';

interface AdminOrderDetailsProps {
  orderId: string;
  onBack: () => void;
}

const AdminOrderDetails: React.FC<AdminOrderDetailsProps> = ({ orderId, onBack }) => {
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError('Failed to load order details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrder();
  }, [orderId]);
  
  const handleUpdateStatus = async (status: OrderStatus) => {
    if (!order) return;
    
    try {
      setUpdating(true);
      await updateOrderStatus(order.id, status);
      fetchOrder(); // Refresh order data
    } catch (err) {
      setError('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading order details...</p>
      </div>
    );
  }
  
  if (error || !order) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error || 'Order not found'}</p>
        <Button variant="outline" onClick={onBack} className="mt-4">
          Back to Orders
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          leftIcon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Back to Orders
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Update Status:</span>
          
          <Button
            variant={order.status === 'pending' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleUpdateStatus('pending')}
            disabled={order.status === 'pending' || updating}
            isLoading={updating && order.status !== 'pending'}
          >
            Pending
          </Button>
          
          <Button
            variant={order.status === 'in_progress' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleUpdateStatus('in_progress')}
            disabled={order.status === 'in_progress' || updating}
            isLoading={updating && order.status !== 'in_progress'}
          >
            In Progress
          </Button>
          
          <Button
            variant={order.status === 'delivered' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleUpdateStatus('delivered')}
            disabled={order.status === 'delivered' || updating}
            isLoading={updating && order.status !== 'delivered'}
          >
            Delivered
          </Button>
        </div>
      </div>
      
      <OrderDetails order={order} showContactInfo={true} />
    </div>
  );
};

export default AdminOrderDetails;