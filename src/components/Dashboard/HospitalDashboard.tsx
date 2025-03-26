
import React, { useState } from 'react';
import { Calendar, Users, Building2, ClipboardList, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const HospitalDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  // Hospital-specific stats
  const stats = [
    {
      title: 'Total Patients',
      value: '2,845',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Total Doctors',
      value: '156',
      change: '+4.2%',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Departments',
      value: '12',
      change: '0%',
      trend: 'neutral',
      icon: <Building2 className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Occupancy Rate',
      value: '78%',
      change: '+3.1%',
      trend: 'up',
      icon: <ClipboardList className="h-5 w-5 text-muted-foreground" />
    }
  ];

  // Hospital-specific activities
  const recentActivities = [
    {
      title: 'New department created',
      description: 'Neurology department was added',
      time: '10 minutes ago',
      icon: <Building2 className="h-8 w-8 p-1.5 bg-blue-50 text-blue-500 rounded-full" />
    },
    {
      title: 'New doctor onboarded',
      description: 'Dr. Michael Stevens joined Cardiology',
      time: '1 hour ago',
      icon: <Users className="h-8 w-8 p-1.5 bg-green-50 text-green-500 rounded-full" />
    },
    {
      title: 'Equipment ordered',
      description: 'New MRI machine ordered for Radiology',
      time: '3 hours ago',
      icon: <ClipboardList className="h-8 w-8 p-1.5 bg-purple-50 text-purple-500 rounded-full" />
    }
  ];

  return (
    <>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
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
                  Common tasks for hospital management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                    <Users size={20} />
                    <span className="font-medium">Manage Staff</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                    <Building2 size={20} />
                    <span className="font-medium">Department Settings</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <Calendar size={20} />
                    <span className="font-medium">View Schedule</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors">
                    <Settings size={20} />
                    <span className="font-medium">Hospital Settings</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>
                View and manage hospital departments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Building2 size={48} className="mx-auto mb-4 opacity-50" />
                <p>Department management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Staff Management</CardTitle>
              <CardDescription>
                View and manage hospital staff
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>Staff management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Financial Management</CardTitle>
              <CardDescription>
                View and manage hospital finances
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
                <p>Financial management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default HospitalDashboard;
