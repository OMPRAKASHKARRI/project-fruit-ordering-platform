/*
  # Create initial schema for Fresh Harvest bulk ordering platform

  1. New Tables
    - `products` - Stores product information including name, price, image URL, and description
    - `orders` - Stores customer order information and delivery details
    - `order_items` - Junction table connecting orders to products with quantity and price information
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10, 2) NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'delivered')),
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric(10, 2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read, admin write)
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

-- Create policies for orders
CREATE POLICY "Customers can view their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.email() = email);

CREATE POLICY "Admins can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

-- Create policies for order_items
CREATE POLICY "Customers can view their own order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT id FROM orders WHERE auth.email() = email
    )
  );

CREATE POLICY "Admins can view all order items"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users WHERE auth.email() = 'admin@example.com'
  ));

CREATE POLICY "Anyone can create order items"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (true);