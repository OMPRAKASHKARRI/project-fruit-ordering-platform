import { Product, Order } from './supabase';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderFormData = {
  buyerName: string;
  email: string;
  phone: string;
  address: string;
};

export type OrderStatus = 'pending' | 'in_progress' | 'delivered';

export type OrderStatusInfo = {
  label: string;
  color: string;
  bgColor: string;
};

export const ORDER_STATUS_MAP: Record<OrderStatus, OrderStatusInfo> = {
  pending: {
    label: 'Pending',
    color: 'text-yellow-800',
    bgColor: 'bg-yellow-100',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-blue-800',
    bgColor: 'bg-blue-100',
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-800',
    bgColor: 'bg-green-100',
  },
};