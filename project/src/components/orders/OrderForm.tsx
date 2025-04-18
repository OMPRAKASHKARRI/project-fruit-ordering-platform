import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/Card';
import { useCartStore } from '../../store/cartStore';
import { createOrder } from '../../services/orderService';
import { OrderFormData } from '../../types';

const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    buyerName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.buyerName.trim()) {
      newErrors.buyerName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      const order = await createOrder(formData, items);
      
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Delivery Information</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleChange}
            placeholder="John Smith"
            error={errors.buyerName}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            error={errors.phone}
            required
          />
          
          <Input
            label="Delivery Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Anytown, USA"
            error={errors.address}
            required
          />
          
          {errors.submit && (
            <p className="text-red-600 text-sm">{errors.submit}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          onClick={() => navigate('/cart')}
        >
          Back to Cart
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          disabled={items.length === 0}
        >
          {isSubmitting ? 'Placing Order...' : `Place Order ($${getTotal().toFixed(2)})`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;