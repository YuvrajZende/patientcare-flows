
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, UserRound, GraduationCap, Shield, Calendar, ClipboardList } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import FeatureCard from '@/components/ui/FeatureCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Role-Based Access Control',
      description: 'Secure access tailored to hospitals, doctors, patients, and interns',
      icon: <Shield className="w-8 h-8" />,
      className: 'stagger-1'
    },
    {
      title: 'Hospital Dashboard',
      description: 'Manage departments, staff, and appointments from a central hub',
      icon: <Building2 className="w-8 h-8" />,
      className: 'stagger-2'
    },
    {
      title: 'Doctor Dashboard',
      description: 'View assigned patients and manage treatment records',
      icon: <Users className="w-8 h-8" />,
      className: 'stagger-3'
    },
    {
      title: 'Patient Dashboard',
      description: 'Access medical records and schedule appointments',
      icon: <UserRound className="w-8 h-8" />,
      className: 'stagger-4'
    },
    {
      title: 'Intern Dashboard',
      description: 'Assist doctors and track training progress',
      icon: <GraduationCap className="w-8 h-8" />,
      className: 'stagger-5'
    },
    {
      title: 'Appointment Management',
      description: 'Book, approve, and manage patient appointments',
      icon: <Calendar className="w-8 h-8" />,
      className: 'stagger-1'
    },
    {
      title: 'Medical Records',
      description: 'Secure storage of patient data and medical history',
      icon: <ClipboardList className="w-8 h-8" />,
      className: 'stagger-2'
    }
  ];

  return (
    <MainLayout>
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-5 z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-hms-primary/10 rounded-full filter blur-3xl z-0 animate-pulse-subtle"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-hms-accent/10 rounded-full filter blur-3xl z-0 animate-pulse-subtle"></div>
        
        <div className="container px-4 mx-auto relative z-10">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16 fade-up">
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-hms-primary bg-hms-primary/10 rounded-full">
              Welcome to HMS
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Hospital Management System for the Modern Era
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Streamline hospital operations, improve patient care, and provide seamless access to medical records for all stakeholders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="bg-hms-primary hover:bg-hms-primary/90 text-white"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-hms-primary text-hms-primary"
              >
                View Dashboard
              </Button>
            </div>
          </div>

          {/* Hospital Illustration */}
          <div className="rounded-xl overflow-hidden shadow-medium max-w-5xl mx-auto mb-24 fade-up stagger-1">
            <div className="aspect-video bg-gradient-to-r from-hms-primary/5 to-hms-accent/5 flex items-center justify-center">
              <div className="glass-panel p-8 flex items-center justify-center">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-20 h-20 bg-hms-primary/10 rounded-full flex items-center justify-center text-hms-primary">
                    <Building2 size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Efficient Hospital Management</h3>
                    <p className="text-gray-600">Streamline operations with our intuitive platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-24">
            <div className="text-center mb-12 fade-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Features designed for healthcare</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides comprehensive tools for all roles in the healthcare ecosystem
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-up">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  className={cn("fade-up", feature.className)}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-panel p-8 md:p-12 text-center max-w-4xl mx-auto fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to optimize your hospital workflow?</h2>
            <p className="text-gray-600 mb-8">Join thousands of healthcare providers who trust our platform</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-hms-primary hover:bg-hms-primary/90 text-white"
            >
              Start Your Free Trial
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
