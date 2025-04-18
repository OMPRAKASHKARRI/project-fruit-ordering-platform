import React, { useState, useEffect } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { getOrders } from '../../services/orderService';
import { Order } from '../../types/supabase';
import { ORDER_STATUS_MAP } from '../../types';
import AdminOrderDetails from './AdminOrderDetails';

const AdminOrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
  };
  
  const handleBackToList = () => {
    setSelectedOrderId(null);
    fetchOrders(); // Refresh the order list when coming back
  };
  
  // If an order is selected, show its details
  if (selectedOrderId) {
    return (
      <AdminOrderDetails
        orderId={selectedOrderId}
        onBack={handleBackToList}
      />
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Orders</h2>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw size={16} />}
          onClick={fetchOrders}
          isLoading={loading}
        >
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center py-4 text-gray-600">No orders available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => {
                  const statusInfo = ORDER_STATUS_MAP[order.status];
                  const orderDate = new Date(order.created_at).toLocaleDateString();
                  
                  return (
                    <tr key={order.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{order.buyer_name}</div>
                        <div className="text-gray-500 text-xs">{order.email}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {orderDate}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <Badge
                          variant={
                            order.status === 'pending'
                              ? 'warning'
                              : order.status === 'in_progress'
                              ? 'secondary'
                              : 'success'
                          }
                        >
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminOrderList;