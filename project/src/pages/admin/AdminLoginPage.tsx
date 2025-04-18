import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';

const AdminLoginPage: React.FC = () => {
  const { isAdmin, login } = useAuthStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // If already logged in, redirect to admin dashboard
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const success = login(password);
    
    if (!success) {
      setError('Invalid password');
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-xl font-bold">Admin Login</h1>
              <p className="text-sm text-gray-600 mt-1">
                Enter your password to access the admin dashboard
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
                placeholder="Enter admin password"
                required
              />
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
              
              {/* For demo purposes - show password hint */}
              <p className="text-xs text-center text-gray-500 mt-2">
                Hint: For demo, use "admin123"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;