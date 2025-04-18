import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Product } from '../../types/supabase';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, items, updateItemQuantity, removeItem } = useCartStore();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  const handleIncreaseQuantity = () => {
    updateItemQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateItemQuantity(product.id, quantity - 1);
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="relative pb-[60%] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="flex-grow flex flex-col p-4">
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-green-700 font-bold">${product.price.toFixed(2)}/unit</p>
          
          {quantity > 0 ? (
            <div className="flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecreaseQuantity}
                className="rounded-r-none px-2"
              >
                <Minus size={16} />
              </Button>
              <span className="px-3 py-1 border-t border-b border-gray-300">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleIncreaseQuantity}
                className="rounded-l-none px-2"
              >
                <Plus size={16} />
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;