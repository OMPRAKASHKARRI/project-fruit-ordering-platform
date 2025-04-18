export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          image_url: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          image_url: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          image_url?: string
          description?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_name: string
          email: string
          phone: string
          address: string
          status: 'pending' | 'in_progress' | 'delivered'
          created_at: string
        }
        Insert: {
          id?: string
          buyer_name: string
          email: string
          phone: string
          address: string
          status?: 'pending' | 'in_progress' | 'delivered'
          created_at?: string
        }
        Update: {
          id?: string
          buyer_name?: string
          email?: string
          phone?: string
          address?: string
          status?: 'pending' | 'in_progress' | 'delivered'
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type OrderItem = Database['public']['Tables']['order_items']['Row']

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[]
}