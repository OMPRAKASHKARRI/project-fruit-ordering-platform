import React from 'react';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';

const ProductsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">
            Browse our selection of fresh, high-quality produce available for bulk ordering.
          </p>
        </div>
        
        <ProductList />
      </div>
    </Layout>
  );
};

export default ProductsPage;