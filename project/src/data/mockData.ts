import { v4 as uuidv4 } from 'uuid';
import { Product, Order, OrderItem } from '../types/supabase';

// Mock products data
export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Organic Apples',
    price: 2.99,
    image_url: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    description: 'Fresh, juicy organic apples. Perfect for healthy snacking or baking.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Fresh Tomatoes',
    price: 1.99,
    image_url: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    description: 'Vine-ripened tomatoes, bursting with flavor. Ideal for salads and sauces.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Organic Bananas',
    price: 0.89,
    image_url: 'https://images.pexels.com/photos/47305/bananas-yellow-fruit-tropical-47305.jpeg',
    description: 'Perfectly ripened organic bananas. Rich in potassium and natural sweetness.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Fresh Spinach',
    price: 3.49,
    image_url: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg',
    description: 'Tender, nutrient-packed spinach leaves. Perfect for salads and cooking.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Ripe Avocados',
    price: 2.49,
    image_url: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg',
    description: 'Creamy, ripe avocados. Perfect for guacamole, salads, or as a healthy spread.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Sweet Carrots',
    price: 1.29,
    image_url: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
    description: 'Crunchy, sweet carrots. Excellent for snacking, roasting, or juicing.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Fresh Strawberries',
    price: 4.99,
    image_url: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg',
    description: 'Sweet, juicy strawberries. Perfect for desserts or eating fresh.',
    created_at: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Green Bell Peppers',
    price: 1.79,
    image_url: 'https://images.pexels.com/photos/6316515/pexels-photo-6316515.jpeg',
    description: 'Crisp green bell peppers. Great for salads, stir-fries, or stuffing.',
    created_at: new Date().toISOString()
  }
];

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: uuidv4(),
    buyer_name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    status: 'pending',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: uuidv4(),
    buyer_name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    status: 'in_progress',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: uuidv4(),
    buyer_name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '555-456-7890',
    address: '789 Pine Rd, Nowhere, USA',
    status: 'delivered',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
];

// Generate mock order items
export const mockOrderItems: OrderItem[] = [
  // Order 1 items
  {
    id: uuidv4(),
    order_id: mockOrders[0].id,
    product_id: mockProducts[0].id,
    quantity: 10,
    price: mockProducts[0].price,
    created_at: mockOrders[0].created_at
  },
  {
    id: uuidv4(),
    order_id: mockOrders[0].id,
    product_id: mockProducts[3].id,
    quantity: 5,
    price: mockProducts[3].price,
    created_at: mockOrders[0].created_at
  },
  // Order 2 items
  {
    id: uuidv4(),
    order_id: mockOrders[1].id,
    product_id: mockProducts[1].id,
    quantity: 20,
    price: mockProducts[1].price,
    created_at: mockOrders[1].created_at
  },
  {
    id: uuidv4(),
    order_id: mockOrders[1].id,
    product_id: mockProducts[4].id,
    quantity: 8,
    price: mockProducts[4].price,
    created_at: mockOrders[1].created_at
  },
  // Order 3 items
  {
    id: uuidv4(),
    order_id: mockOrders[2].id,
    product_id: mockProducts[2].id,
    quantity: 15,
    price: mockProducts[2].price,
    created_at: mockOrders[2].created_at
  },
  {
    id: uuidv4(),
    order_id: mockOrders[2].id,
    product_id: mockProducts[5].id,
    quantity: 12,
    price: mockProducts[5].price,
    created_at: mockOrders[2].created_at
  }
];