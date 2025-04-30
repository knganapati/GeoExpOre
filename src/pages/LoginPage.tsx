import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, User, Mail, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import TextareaField from '../components/ui/TextareaField';

const loginSchema = z.object({
  name: z.string().min(2, { message: 'Name is required (min 2 characters)' }),
  userId: z.string().min(2, { message: 'Employee ID is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(5, { message: 'Address is required (min 5 characters)' }),
  role: z.string().min(2, { message: 'Role is required' }).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: '',
      userId: '',
      email: '',
      address: '',
      role: 'Geologist',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/dashboard/phase1');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-earth-50 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GeoExpOre</h1>
            <p className="text-gray-600">Geological Exploration Dashboard</p>
          </div>
          
          <div className="w-full max-w-md">
            {showSuccessMessage ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-slideIn">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-green-800 mb-2">Login Successful!</h2>
                <p className="text-green-600 mb-4">You will be redirected to the dashboard...</p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            ) : (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Employee Login</CardTitle>
                  <CardDescription>
                    Please enter your details to continue to the dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InputField
                          label="Full Name"
                          placeholder="Enter your full name"
                          {...register('name')}
                          error={errors.name?.message}
                          className="w-full"
                          required
                        />
                        <InputField
                          label="Employee ID"
                          placeholder="Enter your employee ID"
                          {...register('userId')}
                          error={errors.userId?.message}
                          className="w-full"
                          required
                        />
                      </div>
                      
                      <InputField
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                      />
                      
                      <TextareaField
                        label="Address"
                        placeholder="Enter your address"
                        {...register('address')}
                        error={errors.address?.message}
                        required
                      />
                      
                      <InputField
                        label="Job Role"
                        placeholder="e.g. Geologist, Engineer, etc."
                        {...register('role')}
                        error={errors.role?.message}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={isLoading}
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;