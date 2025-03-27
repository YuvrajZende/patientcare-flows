
import React, { useState } from 'react';
import { Calendar, Users, GraduationCap, ClipboardList, BookOpen, MessageSquare } from 'lucide-react';
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
    <div>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="chat">Messages</TabsTrigger>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedule tab content */}
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

        {/* Learning tab content */}
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

        {/* Assessments tab content */}
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

        {/* Patients tab content - NEW */}
        <TabsContent value="patients" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Patient Assignments</CardTitle>
              <CardDescription>
                Patients assigned to you for monitoring and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/personas/svg?seed=patient${index}`} alt="Patient" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Patient #{212 + index}</p>
                      <p className="text-sm text-gray-600">Admitted: March {10 + index}, 2023</p>
                      <p className="text-sm text-gray-600">Department: {index === 0 ? 'Cardiology' : index === 1 ? 'Orthopedics' : 'General Medicine'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Update Status</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat tab content - NEW */}
        <TabsContent value="chat" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Communicate with doctors and patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[500px] border rounded-lg overflow-hidden">
                <div className="w-1/3 border-r">
                  <div className="p-3 border-b">
                    <input 
                      type="text" 
                      placeholder="Search conversations..." 
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <div className="overflow-y-auto h-[calc(500px-48px)]">
                    {['Dr. Thompson', 'Dr. Martinez', 'Supervisor'].map((name, index) => (
                      <div 
                        key={index} 
                        className={`p-3 border-b flex items-center gap-3 hover:bg-slate-50 cursor-pointer ${index === 0 ? 'bg-slate-50' : ''}`}
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/personas/svg?seed=${name}`} alt={name} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{name}</p>
                          <p className="text-xs text-gray-500">Latest message preview...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="p-3 border-b flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/personas/svg?seed=Dr. Thompson" alt="Dr. Thompson" />
                    </div>
                    <div>
                      <p className="font-medium">Dr. Thompson</p>
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-end gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src="https://api.dicebear.com/7.x/personas/svg?seed=Dr. Thompson" alt="Dr. Thompson" />
                        </div>
                        <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Hi there! How is the patient in room 302 doing today?</p>
                          <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Patient is stable. Vital signs are within normal range, and they've been taking medications as prescribed.</p>
                          <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src="https://api.dicebear.com/7.x/personas/svg?seed=intern" alt="You" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <Button>Send</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternDashboard;
