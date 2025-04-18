import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import { Order, OrderItem, OrderWithItems, Product } from '../types/supabase';
import { CartItem, OrderFormData, OrderStatus } from '../types';
import { mockOrders, mockOrderItems, mockProducts } from '../data/mockData';

export const createOrder = async (
  formData: OrderFormData, 
  cartItems: CartItem[]
): Promise<Order> => {
  const newOrder: Order = {
    id: uuidv4(),
    buyer_name: formData.buyerName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    status: 'pending',
    created_at: new Date().toISOString()
  };
  
  const orderItems: OrderItem[] = cartItems.map(item => ({
    id: uuidv4(),
    order_id: newOrder.id,
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
    created_at: newOrder.created_at
  }));
  
  try {
    // In a real app, this would use a transaction in Supabase
    const { error: orderError } = await supabase
      .from('orders')
      .insert(newOrder);
    
    if (orderError) throw orderError;
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    // For mock data, just add to the arrays
    mockOrders.push(newOrder);
    mockOrderItems.push(...orderItems);
    return newOrder;
  }
};

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data?.length ? data : mockOrders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return mockOrders;
  }
};

export const getOrderById = async (id: string): Promise<OrderWithItems | null> => {
  try {
    // In a real app, this would be a join query in Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (orderError) throw orderError;
    
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', id);
    
    if (itemsError) throw itemsError;
    
    // If using real data
    if (order && orderItems) {
      // We'd need to fetch product details for each item
      const enrichedItems = await Promise.all(
        orderItems.map(async (item) => {
          const { data: product } = await supabase
            .from('products')
            .select('*')
            .eq('id', item.product_id)
            .single();
          
          return { ...item, product: product as Product };
        })
      );
      
      return { ...order, items: enrichedItems };
    }
    
    // Fallback to mock data
    const mockOrder = mockOrders.find(o => o.id === id);
    if (!mockOrder) return null;
    
    const mockItems = mockOrderItems.filter(item => item.order_id === id);
    const enrichedMockItems = mockItems.map(item => {
      const product = mockProducts.find(p => p.id === item.product_id) as Product;
      return { ...item, product };
    });
    
    return { ...mockOrder, items: enrichedMockItems };
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    
    // Fallback to mock data
    const mockOrder = mockOrders.find(o => o.id === id);
    if (!mockOrder) return null;
    
    const mockItems = mockOrderItems.filter(item => item.order_id === id);
    const enrichedMockItems = mockItems.map(item => {
      const product = mockProducts.find(p => p.id === item.product_id) as Product;
      return { ...item, product };
    });
    
    return { ...mockOrder, items: enrichedMockItems };
  }
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<Order | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      // Update in mock data
      const index = mockOrders.findIndex(o => o.id === id);
      if (index >= 0) {
        mockOrders[index] = { ...mockOrders[index], status };
        return mockOrders[index];
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating order ${id}:`, error);
    
    // Update in mock data
    const index = mockOrders.findIndex(o => o.id === id);
    if (index >= 0) {
      mockOrders[index] = { ...mockOrders[index], status };
      return mockOrders[index];
    }
    return null;
  }
};