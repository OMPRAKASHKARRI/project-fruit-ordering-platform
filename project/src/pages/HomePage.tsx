import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShoppingBag, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import ProductList from '../components/products/ProductList';

const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Fresh Produce<br />Delivered in Bulk
              </h1>
              <p className="text-lg mb-6 text-green-100">
                Quality vegetables and fruits sourced directly from farms.
                Perfect for restaurants, cafeterias, and large families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<ShoppingBag size={20} />}
                  >
                    Browse Products
                  </Button>
                </Link>
                <Link to="/track-order">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 border-white hover:bg-white/20"
                  >
                    Track Your Order
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg"
                alt="Fresh vegetables and fruits"
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FreshHarvest?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Our efficient logistics ensure your orders are delivered promptly and in perfect condition.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bulk Ordering</h3>
              <p className="text-gray-600">
                Easy bulk ordering process designed for business needs with no minimum order requirements.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full text-green-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track your order status in real-time from processing to delivery at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-green-600 hover:text-green-700 font-semibold">
              View All →
            </Link>
          </div>
          
          <ProductList />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Fresh Produce?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust FreshHarvest for their bulk produce needs.
          </p>
          <Link to="/products">
            <Button
              variant="primary"
              size="lg"
            >
              Start Ordering Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;