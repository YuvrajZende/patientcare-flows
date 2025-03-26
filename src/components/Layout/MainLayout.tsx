
import React from 'react';
import Navbar from '../Navigation/Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideNav = false }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-hms-light">
      {!hideNav && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Hospital Management System
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-600 hover:text-hms-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-hms-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-hms-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
