import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

type Employee = {
  id: string;
  name: string;
  userId: string;
  address: string;
  email: string;
  role: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  employee: Employee | null;
  login: (employeeData: Omit<Employee, 'id'>) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (employeeData: Omit<Employee, 'id'>): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials with your backend
      const newEmployee: Employee = {
        ...employeeData,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      setEmployee(newEmployee);
      setIsAuthenticated(true);
      localStorage.setItem('employee', JSON.stringify(newEmployee));
      
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setEmployee(null);
    setIsAuthenticated(false);
    localStorage.removeItem('employee');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, employee, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}