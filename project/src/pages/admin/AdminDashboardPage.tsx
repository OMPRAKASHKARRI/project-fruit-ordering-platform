import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ShoppingBag, Package, LayoutDashboard } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import AdminProductList from '../../components/admin/AdminProductList';
import AdminOrderList from '../../components/admin/AdminOrderList';
import Button from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

type Tab = 'orders' | 'products';

const AdminDashboardPage: React.FC = () => {
  const { isAdmin } = useAuthStore();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  
  // If not logged in as admin, redirect to login page
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold flex items-center">
              <LayoutDashboard className="h-8 w-8 mr-2 text-green-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your products and orders
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant={activeTab === 'orders' ? 'primary' : 'outline'}
              leftIcon={<Package size={16} />}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </Button>
            <Button
              variant={activeTab === 'products' ? 'primary' : 'outline'}
              leftIcon={<ShoppingBag size={16} />}
              onClick={() => setActiveTab('products')}
            >
              Products
            </Button>
          </div>
        </div>
        
        {activeTab === 'orders' ? (
          <AdminOrderList />
        ) : (
          <AdminProductList />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;