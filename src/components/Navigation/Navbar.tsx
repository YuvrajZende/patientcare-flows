
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const navClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-6 lg:px-12',
    isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-subtle' : 'py-6'
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-hms-dark text-xl font-bold">
            HMS
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isCurrentPath('/')}>
            Home
          </NavLink>
          <NavLink to="/login" isActive={isCurrentPath('/login')}>
            Login
          </NavLink>
          <NavLink to="/dashboard" isActive={isCurrentPath('/dashboard')}>
            Dashboard
          </NavLink>
          <button className="px-5 py-2 bg-hms-primary text-white rounded-lg transition-all hover:bg-hms-primary/90 hover:shadow-subtle">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-hms-dark"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-in">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <MobileNavLink to="/" isActive={isCurrentPath('/')} onClick={toggleMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/login" isActive={isCurrentPath('/login')} onClick={toggleMobileMenu}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/dashboard" isActive={isCurrentPath('/dashboard')} onClick={toggleMobileMenu}>
              Dashboard
            </MobileNavLink>
            <button className="w-full px-5 py-2 bg-hms-primary text-white rounded-lg text-center">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={cn(
        'relative inline-block transition-colors',
        isActive ? 'text-hms-primary' : 'text-hms-dark hover:text-hms-primary',
        isActive ? 'after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 after:bg-hms-primary' : 'link-underline'
      )}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, children, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        'block py-2 text-lg transition-colors',
        isActive ? 'text-hms-primary font-medium' : 'text-hms-dark'
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
