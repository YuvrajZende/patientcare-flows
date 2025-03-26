
import React from 'react';
import Navbar from '../Navigation/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideNav = false }) => {
  return (
    <div className="min-h-screen flex flex-col bg-hms-light">
      {!hideNav && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
