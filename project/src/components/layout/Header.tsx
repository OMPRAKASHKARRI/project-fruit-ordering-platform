import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Truck, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartTotalItems = useCartStore(state => state.getTotalItems());
  const { isAdmin, logout } = useAuthStore();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Track Order', path: '/track-order' },
  ];
  
  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-green-600 hover:text-green-700 transition"
            >
              <Truck className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">FreshHarvest</span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Cart icon */}
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            
            {/* Auth buttons */}
            {isAdmin ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut size={16} />}
              >
                Logout
              </Button>
            ) : (
              <Link to="/admin/login">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<LogIn size={16} />}
                >
                  Admin
                </Button>
              </Link>
            )}
          </nav>
          
          {/* Mobile nav button */}
          <div className="flex md:hidden items-center">
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-green-600 transition-colors mr-4"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile nav menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3">
            <div className="space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium ${
                    isActive(link.path)
                      ? 'text-green-600'
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Auth buttons for mobile */}
              {isAdmin ? (
                <button
                  className="block w-full text-left py-2 text-base font-medium text-gray-700 hover:text-green-600"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/admin/login"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;