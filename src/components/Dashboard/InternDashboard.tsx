
import React, { useState } from 'react';
import { Calendar, Users, GraduationCap, ClipboardList, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const InternDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  // Intern-specific stats
  const stats = [
    {
      title: 'Days Completed',
      value: '45',
      total: '180',
      progress: 25
    },
    {
      title: 'Assigned Patients',
      value: '8',
      total: '12',
      progress: 66
    },
    {
      title: 'Procedures Observed',
      value: '24',
      total: '50',
      progress: 48
    },
    {
      title: 'Skill Assessment',
      value: '3.8',
      total: '5.0',
      progress: 76
    }
  ];

  // Sample upcoming shifts
  const upcomingShifts = [
    { date: 'Today', time: '08:00 AM - 04:00 PM', supervisor: 'Dr. Thompson', department: 'Cardiology' },
    { date: 'Tomorrow', time: '08:00 AM - 04:00 PM', supervisor: 'Dr. Martinez', department: 'Emergency' },
    { date: 'Mar 30', time: '12:00 PM - 08:00 PM', supervisor: 'Dr. Wilson', department: 'Pediatrics' }
  ];

  // Sample learning modules
  const learningModules = [
    { title: 'Basic Clinical Procedures', completion: 100, totalHours: 20 },
    { title: 'Patient Assessment', completion: 65, totalHours: 15 },
    { title: 'Medical Ethics', completion: 40, totalHours: 10 },
    { title: 'Emergency Response', completion: 0, totalHours: 25 }
  ];

  return (
    <>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-1">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500">of {stat.total}</div>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Shifts</CardTitle>
                <CardDescription>
                  Your scheduled shifts and rotations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingShifts.map((shift, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-16 h-16 flex flex-col items-center justify-center bg-blue-100 text-blue-700 rounded-lg">
                        <span className="text-sm font-medium">{shift.date}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{shift.department}</p>
                        <p className="text-sm text-gray-600">Supervisor: {shift.supervisor}</p>
                        <p className="text-sm text-gray-600">{shift.time}</p>
                      </div>
                      <Button size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Your Supervisor</CardTitle>
                <CardDescription>
                  Your primary supervisor info
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/personas/svg?seed=supervisor" alt="Supervisor" />
                  </div>
                  <h3 className="font-semibold text-lg">Dr. Sarah Thompson</h3>
                  <p className="text-gray-600 mb-4">Chief of Cardiology</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">Message</Button>
                    <Button size="sm">Schedule Meeting</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Track your progress through required learning modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningModules.map((module, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{module.title}</p>
                        <p className="text-sm text-gray-600">{module.totalHours} hours total</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{module.completion}%</p>
                        <p className="text-sm text-gray-600">completed</p>
                      </div>
                    </div>
                    <Progress value={module.completion} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Rotation Schedule</CardTitle>
              <CardDescription>
                View and manage your rotation schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Rotation schedule calendar will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>
                Access training modules and educational resources
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                <p>Learning resources will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Performance Assessments</CardTitle>
              <CardDescription>
                View your performance evaluations and feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <ClipboardList size={48} className="mx-auto mb-4 opacity-50" />
                <p>Assessment details will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default InternDashboard;
