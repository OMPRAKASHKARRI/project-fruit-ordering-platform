import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import Button from '../ui/Button';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;
  
  const handleIncreaseQuantity = () => {
    updateItemQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateItemQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };
  
  const itemTotal = product.price * quantity;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-600">${product.price.toFixed(2)}/unit</p>
      </div>
      
      <div className="flex items-center ml-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecreaseQuantity}
          className="rounded-r-none px-2"
          disabled={quantity <= 1}
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
      
      <div className="ml-4 text-right">
        <p className="text-base font-medium text-gray-900">${itemTotal.toFixed(2)}</p>
      </div>
      
      <button
        onClick={handleRemove}
        className="ml-4 text-gray-400 hover:text-red-500 transition"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default CartItem;