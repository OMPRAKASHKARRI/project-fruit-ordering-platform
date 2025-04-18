import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { CartItem } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface OrderSummaryProps {
  items?: CartItem[];
  total?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  const cartItems = items || useCartStore(state => state.items);
  const cartTotal = total !== undefined ? total : useCartStore(state => state.getTotal());
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cartItems.map(item => (
            <div key={item.product.id} className="flex justify-between">
              <span className="text-gray-700">
                {item.product.name} × {item.quantity}
              </span>
              <span className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;