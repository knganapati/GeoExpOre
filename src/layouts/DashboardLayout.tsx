import { Outlet } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { employee } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SiteHeader />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 bg-white border border-gray-100 rounded-lg shadow-sm p-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Welcome, {employee?.name || 'User'}</h2>
              <p className="text-sm text-gray-500 mt-1">
                ID: {employee?.userId || 'N/A'} • {employee?.email || 'No email provided'}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <ArrowRight className="h-4 w-4" />
              <span className="font-medium text-primary">Project Phases</span>
            </div>
          </div>
          
          <Outlet />
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GeoExpOre Geological Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;