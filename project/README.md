# Fresh Harvest - Bulk Produce Ordering Platform

A modern web application for ordering fresh vegetables and fruits in bulk, built with React, TypeScript, and Supabase.

## Features

### For Customers
- Browse a catalog of fresh produce with detailed information and pricing
- Add items to cart and manage quantities
- Place bulk orders with delivery information
- Track order status (Pending, In Progress, Delivered)

### For Administrators
- Secure admin dashboard
- Manage product catalog (add, edit, remove products)
- Process and update order statuses
- View comprehensive order details

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── admin/     # Admin dashboard components
│   ├── cart/      # Shopping cart components
│   ├── layout/    # Layout components
│   ├── orders/    # Order management components
│   ├── products/  # Product catalog components
│   └── ui/        # Base UI components
├── pages/         # Page components
├── services/      # API services
├── store/         # State management
├── types/         # TypeScript types
└── lib/           # Utility functions
```

## Database Schema

### Products
- `id`: UUID (Primary Key)
- `name`: Text
- `price`: Numeric
- `image_url`: Text
- `description`: Text
- `created_at`: Timestamp

### Orders
- `id`: UUID (Primary Key)
- `buyer_name`: Text
- `email`: Text
- `phone`: Text
- `address`: Text
- `status`: Enum ('pending', 'in_progress', 'delivered')
- `created_at`: Timestamp

### Order Items
- `id`: UUID (Primary Key)
- `order_id`: UUID (Foreign Key)
- `product_id`: UUID (Foreign Key)
- `quantity`: Integer
- `price`: Numeric
- `created_at`: Timestamp

## Security

- Row Level Security (RLS) enabled on all tables
- Admin-only access for product management
- Public read access for products
- Order access restricted to respective customers

## Admin Access

For demo purposes:
- Admin login path: `/admin/login`
- Demo password: `admin123`

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request