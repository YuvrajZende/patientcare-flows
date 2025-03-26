
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Building2, Users, UserRound, GraduationCap, Calendar, ClipboardList, Activity, Settings } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import HospitalDashboard from '@/components/Dashboard/HospitalDashboard';
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard';
import PatientDashboard from '@/components/Dashboard/PatientDashboard';
import InternDashboard from '@/components/Dashboard/InternDashboard';
import SuperDashboard from '@/components/Dashboard/SuperDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user.role) {
      case 'hospital':
        return <HospitalDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientDashboard />;
      case 'intern':
        return <InternDashboard />;
      case 'super':
        return <SuperDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">
              {user.role === 'hospital' && 'Hospital Dashboard'}
              {user.role === 'doctor' && 'Doctor Dashboard'}
              {user.role === 'patient' && 'Patient Dashboard'}
              {user.role === 'intern' && 'Intern Dashboard'}
              {user.role === 'super' && 'Super Admin Dashboard'}
            </h1>
            <p className="text-gray-600 animate-fade-in stagger-1">
              {user.role === 'hospital' && 'Manage hospital operations, staff, and departments'}
              {user.role === 'doctor' && 'View patients, appointments, and medical records'}
              {user.role === 'patient' && 'Access medical history and schedule appointments'}
              {user.role === 'intern' && 'Assist doctors and track training progress'}
              {user.role === 'super' && 'Full system administration and management controls'}
            </p>
          </div>

          {/* Role-specific dashboard content */}
          {renderDashboard()}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
