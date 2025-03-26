
import React, { useState } from 'react';
import { Building2, Users, UserRound, GraduationCap, Calendar, ClipboardList, Activity, Settings } from 'lucide-react';
import MainLayout from '@/components/Layout/MainLayout';
import DashboardCard from '@/components/ui/DashboardCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type UserType = 'hospital' | 'doctor' | 'patient' | 'intern';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  const dashboardCards = [
    {
      title: 'Hospital Dashboard',
      description: 'Manage hospital operations, staff, and departments',
      icon: <Building2 size={32} className="text-hms-hospital" />,
      userType: 'hospital' as UserType,
    },
    {
      title: 'Doctor Dashboard',
      description: 'View patients, appointments, and medical records',
      icon: <Users size={32} className="text-hms-doctor" />,
      userType: 'doctor' as UserType,
    },
    {
      title: 'Patient Dashboard',
      description: 'Access medical history and schedule appointments',
      icon: <UserRound size={32} className="text-hms-patient" />,
      userType: 'patient' as UserType,
    },
    {
      title: 'Intern Dashboard',
      description: 'Assist doctors and track training progress',
      icon: <GraduationCap size={32} className="text-hms-intern" />,
      userType: 'intern' as UserType,
    }
  ];

  const stats = [
    {
      title: 'Total Patients',
      value: '2,845',
      change: '+12.5%',
      trend: 'up',
      icon: <UserRound className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Today's Appointments',
      value: '48',
      change: '+4.3%',
      trend: 'up',
      icon: <Calendar className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Active Doctors',
      value: '24',
      change: '0%',
      trend: 'neutral',
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Patient Satisfaction',
      value: '95%',
      change: '+2.1%',
      trend: 'up',
      icon: <Activity className="h-5 w-5 text-muted-foreground" />
    }
  ];

  const recentActivities = [
    {
      title: 'New patient admission',
      description: 'John Doe was admitted to Cardiology',
      time: '10 minutes ago',
      icon: <UserRound className="h-8 w-8 p-1.5 bg-purple-50 text-purple-500 rounded-full" />
    },
    {
      title: 'Appointment rescheduled',
      description: 'Dr. Sarah appointment with Emily moved to 3:30 PM',
      time: '1 hour ago',
      icon: <Calendar className="h-8 w-8 p-1.5 bg-blue-50 text-blue-500 rounded-full" />
    },
    {
      title: 'Medical record updated',
      description: 'Dr. Michael updated treatment for Robert',
      time: '2 hours ago',
      icon: <ClipboardList className="h-8 w-8 p-1.5 bg-green-50 text-green-500 rounded-full" />
    },
    {
      title: 'New intern assigned',
      description: 'Alex was assigned to Neurology department',
      time: '3 hours ago',
      icon: <GraduationCap className="h-8 w-8 p-1.5 bg-amber-50 text-amber-500 rounded-full" />
    }
  ];

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Dashboard Overview Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 animate-fade-in">Dashboard Overview</h1>
            <p className="text-gray-600 animate-fade-in stagger-1">
              Access all systems and manage hospital operations from a central location
            </p>
          </div>

          {/* User Role Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {dashboardCards.map((card, index) => (
              <DashboardCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                userType={card.userType}
                onClick={() => {}}
              />
            ))}
          </div>

          {/* Dashboard Content Tabs */}
          <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      {stat.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={cn(
                        "text-xs",
                        stat.trend === 'up' ? 'text-green-600' : 
                        stat.trend === 'down' ? 'text-red-600' : 
                        'text-gray-600'
                      )}>
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="glass-card lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Latest updates from across the hospital
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                          {activity.icon}
                          <div>
                            <h4 className="text-sm font-semibold">{activity.title}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <Calendar size={20} />
                        <span className="font-medium">Schedule Appointment</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                        <UserRound size={20} />
                        <span className="font-medium">Add New Patient</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                        <ClipboardList size={20} />
                        <span className="font-medium">Update Medical Record</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors">
                        <Settings size={20} />
                        <span className="font-medium">System Settings</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    View hospital performance metrics and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Activity size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Analytics data will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Appointment Management</CardTitle>
                  <CardDescription>
                    Schedule and manage patient appointments
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Appointment calendar will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure system preferences and user access
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Settings size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Settings options will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
