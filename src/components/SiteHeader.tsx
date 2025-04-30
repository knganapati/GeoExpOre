import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, LogOut, Menu, X, User, Map } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const SiteHeader = () => {
  const { employee, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-gray-900">GeoExpOre</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-8 items-center">
              <Link
                to="/dashboard/phase1"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Phase 1
              </Link>
              <Link
                to="/dashboard/phase2"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Phase 2
              </Link>
              <Link
                to="/dashboard/phase3"
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary"
              >
                Phase 3
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {employee && (
              <div className="flex items-center mr-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-700" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.role || 'Employee'}</p>
                </div>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard/phase1"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Phase 1
            </Link>
            <Link
              to="/dashboard/phase2"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Phase 2
            </Link>
            <Link
              to="/dashboard/phase3"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Phase 3
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {employee && (
              <div className="flex items-center px-4 py-2">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-700" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-800">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </div>
              </div>
            )}
            <div className="mt-3 space-y-1">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;