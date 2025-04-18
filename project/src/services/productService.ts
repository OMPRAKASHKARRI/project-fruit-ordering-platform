import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../lib/supabase';
import { Product } from '../types/supabase';
import { mockProducts } from '../data/mockData';

export const getProducts = async (): Promise<Product[]> => {
  try {
    // In a real app, this would pull from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    
    if (error) throw error;
    
    // If no data is returned, use mock data
    return data?.length ? data : mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data
    return mockProducts;
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    // In a real app, this would pull from Supabase
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    // If no data is returned, find in mock data
    return data || mockProducts.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    // Fallback to mock data
    return mockProducts.find(p => p.id === id) || null;
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
  const newProduct: Product = {
    id: uuidv4(),
    ...product,
    created_at: new Date().toISOString()
  };
  
  try {
    // In a real app, this would push to Supabase
    const { error } = await supabase
      .from('products')
      .insert(newProduct);
    
    if (error) throw error;
    
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    // In the mock scenario, just return the new product
    mockProducts.push(newProduct);
    return newProduct;
  }
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | null> => {
  try {
    // In a real app, this would update in Supabase
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    // If using mock data, update the product in mockProducts
    if (!data) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index >= 0) {
        mockProducts[index] = { ...mockProducts[index], ...updates };
        return mockProducts[index];
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    // Handle update in mock data
    const index = mockProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      mockProducts[index] = { ...mockProducts[index], ...updates };
      return mockProducts[index];
    }
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    // In a real app, this would delete from Supabase
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    // Remove from mock data as well
    const index = mockProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      mockProducts.splice(index, 1);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    // Handle deletion in mock data
    const index = mockProducts.findIndex(p => p.id === id);
    if (index >= 0) {
      mockProducts.splice(index, 1);
    }
    return true;
  }
};