import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { Product } from '../../types/supabase';
import { createProduct, updateProduct } from '../../services/productService';

interface AdminProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image_url: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image_url: product.image_url,
        description: product.description,
      });
    }
  }, [product]);
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required';
    } else if (!formData.image_url.match(/^https?:\/\/.+/i)) {
      newErrors.image_url = 'Please enter a valid URL';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      
      if (product) {
        // Update existing product
        await updateProduct(product.id, {
          name: formData.name,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          description: formData.description,
        });
      } else {
        // Create new product
        await createProduct({
          name: formData.name,
          price: parseFloat(formData.price),
          image_url: formData.image_url,
          description: formData.description,
        });
      }
      
      onSave();
    } catch (error) {
      console.error('Failed to save product:', error);
      setErrors({ submit: 'Failed to save product. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Organic Apples"
            error={errors.name}
            required
          />
          
          <Input
            label="Price (per unit)"
            type="number"
            step="0.01"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="2.99"
            error={errors.price}
            required
          />
          
          <Input
            label="Image URL"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            error={errors.image_url}
            required
          />
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Fresh, organic apples perfect for snacking or baking."
              className={`
                block w-full px-4 py-2 rounded-md border text-gray-900 placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                ${errors.description ? 'border-red-300' : 'border-gray-300'}
              `}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          {errors.submit && (
            <p className="text-red-600 text-sm">{errors.submit}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          {isSubmitting
            ? (product ? 'Updating...' : 'Creating...')
            : (product ? 'Update Product' : 'Create Product')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductForm;