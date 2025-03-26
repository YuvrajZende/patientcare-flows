
import React, { useState } from 'react';
import { Calendar, UserRound, ClipboardList, Activity, Stethoscope } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const DoctorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  // Doctor-specific stats
  const stats = [
    {
      title: 'My Patients',
      value: '42',
      change: '+3.2%',
      trend: 'up',
      icon: <UserRound className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: "Today's Appointments",
      value: '8',
      change: '+1',
      trend: 'up',
      icon: <Calendar className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Pending Reports',
      value: '5',
      change: '-2',
      trend: 'down',
      icon: <ClipboardList className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Surgery Schedule',
      value: '2',
      change: '0',
      trend: 'neutral',
      icon: <Stethoscope className="h-5 w-5 text-muted-foreground" />
    }
  ];

  // Doctor-specific activities
  const recentActivities = [
    {
      title: 'New patient assigned',
      description: 'Sarah Johnson has been assigned to you',
      time: '30 minutes ago',
      icon: <UserRound className="h-8 w-8 p-1.5 bg-blue-50 text-blue-500 rounded-full" />
    },
    {
      title: 'Lab results available',
      description: 'John Doe\'s blood work results are ready',
      time: '1 hour ago',
      icon: <ClipboardList className="h-8 w-8 p-1.5 bg-green-50 text-green-500 rounded-full" />
    },
    {
      title: 'Appointment rescheduled',
      description: 'Michael Brown rescheduled to tomorrow at 2PM',
      time: '2 hours ago',
      icon: <Calendar className="h-8 w-8 p-1.5 bg-purple-50 text-purple-500 rounded-full" />
    }
  ];

  // Schedule for today
  const todaySchedule = [
    { time: '09:00 AM', patient: 'Robert Wilson', reason: 'Follow-up' },
    { time: '10:30 AM', patient: 'Emma Davis', reason: 'Consultation' },
    { time: '01:00 PM', patient: 'James Miller', reason: 'Test Results' },
    { time: '03:30 PM', patient: 'Olivia Taylor', reason: 'New Patient' },
    { time: '04:45 PM', patient: 'William Thompson', reason: 'Prescription Renewal' }
  ];

  return (
    <>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
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
                    {stat.change} from yesterday
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
                  Latest updates related to your patients
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
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>
                  Your appointments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((appointment, index) => (
                    <div key={index} className="flex flex-col p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-sm">{appointment.time}</span>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{appointment.reason}</span>
                      </div>
                      <span className="text-sm">{appointment.patient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>
                View and manage your patients
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <UserRound size={48} className="mx-auto mb-4 opacity-50" />
                <p>Patient management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                View and manage your appointments
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

        <TabsContent value="records" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>
                View and manage patient medical records
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
                <p>Medical records interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DoctorDashboard;
