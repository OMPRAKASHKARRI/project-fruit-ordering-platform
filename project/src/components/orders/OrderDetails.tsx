import React from 'react';
import { Check, Clock, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { OrderWithItems } from '../../types/supabase';
import { ORDER_STATUS_MAP } from '../../types';

interface OrderDetailsProps {
  order: OrderWithItems;
  showContactInfo?: boolean;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, showContactInfo = true }) => {
  const statusInfo = ORDER_STATUS_MAP[order.status];
  const orderDate = new Date(order.created_at).toLocaleDateString();
  
  const getStatusIcon = () => {
    switch (order.status) {
      case 'pending':
        return <Clock size={18} className="text-yellow-600" />;
      case 'in_progress':
        return <Truck size={18} className="text-blue-600" />;
      case 'delivered':
        return <Check size={18} className="text-green-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Order #{order.id.substring(0, 8)}</h2>
          <Badge
            variant={
              order.status === 'pending'
                ? 'warning'
                : order.status === 'in_progress'
                ? 'secondary'
                : 'success'
            }
            className="flex items-center space-x-1"
          >
            <span className="mr-1">{getStatusIcon()}</span>
            <span>{statusInfo.label}</span>
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Information</h3>
              <p className="text-sm text-gray-600">Order Date: {orderDate}</p>
              <p className="text-sm text-gray-600">Status: {statusInfo.label}</p>
            </div>
            
            {showContactInfo && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
                <p className="text-sm text-gray-600">Name: {order.buyer_name}</p>
                <p className="text-sm text-gray-600">Email: {order.email}</p>
                <p className="text-sm text-gray-600">Phone: {order.phone}</p>
                <p className="text-sm text-gray-600">Address: {order.address}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Order Items</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={item.product.image_url}
                            alt={item.product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="px-4 py-4 text-right font-medium">
                    Order Total:
                  </td>
                  <td className="px-4 py-4 text-right text-green-700 font-bold">
                    ${order.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;