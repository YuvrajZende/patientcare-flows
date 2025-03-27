
import React, { useState } from 'react';
import { Calendar, UserRound, ClipboardList, Activity, Stethoscope, MessageSquare, PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

  // Patient list
  const patientList = [
    { id: 'P1001', name: 'Robert Wilson', age: 45, condition: 'Hypertension', lastVisit: '2 days ago', assignedTo: ['Dr. Johnson', 'Intern Smith'] },
    { id: 'P1002', name: 'Emma Davis', age: 32, condition: 'Diabetes Type 2', lastVisit: '1 week ago', assignedTo: ['Dr. Johnson'] },
    { id: 'P1003', name: 'James Miller', age: 58, condition: 'Coronary Artery Disease', lastVisit: '3 days ago', assignedTo: ['Dr. Johnson', 'Intern Jones'] },
    { id: 'P1004', name: 'Olivia Taylor', age: 28, condition: 'Asthma', lastVisit: 'Today', assignedTo: ['Dr. Johnson'] },
    { id: 'P1005', name: 'William Thompson', age: 67, condition: 'Arthritis', lastVisit: '5 days ago', assignedTo: ['Dr. Johnson', 'Intern Smith'] }
  ];

  return (
    <>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">My Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="chat">Messages</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  View and manage your patients
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>Add Patient</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-3 font-medium">Patient ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Age</th>
                      <th className="pb-3 font-medium">Condition</th>
                      <th className="pb-3 font-medium">Last Visit</th>
                      <th className="pb-3 font-medium">Assigned To</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientList.map((patient, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 text-sm">{patient.id}</td>
                        <td className="py-3">{patient.name}</td>
                        <td className="py-3 text-sm">{patient.age}</td>
                        <td className="py-3 text-sm">{patient.condition}</td>
                        <td className="py-3 text-sm">{patient.lastVisit}</td>
                        <td className="py-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {patient.assignedTo.map((person, i) => (
                              <span key={i} className="px-2 py-1 text-xs bg-slate-100 rounded-full">
                                {person}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button size="sm">Update</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  Schedule and manage patient appointments
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>Schedule Appointment</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-medium text-gray-500 mb-1">{day}</div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto ${i === 1 ? 'bg-blue-100 text-blue-800' : ''}`}>
                      {i + 25}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Today, March 26</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">5 Appointments</span>
                  </div>
                  <div className="space-y-2">
                    {todaySchedule.map((appointment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-16 text-sm font-medium">{appointment.time}</div>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-xs text-gray-500">{appointment.reason}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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

        <TabsContent value="chat" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Communicate with patients and colleagues
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
                    {['Patient: Robert Wilson', 'Intern: Medical Intern', 'Dr. Martinez'].map((name, index) => (
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
                      <img src="https://api.dicebear.com/7.x/personas/svg?seed=Patient: Robert Wilson" alt="Patient" />
                    </div>
                    <div>
                      <p className="font-medium">Robert Wilson</p>
                      <p className="text-xs text-gray-500">Patient • Last active: 5 min ago</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Hello Mr. Wilson, I've reviewed your lab results. Your cholesterol levels are looking much better.</p>
                          <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src="https://api.dicebear.com/7.x/personas/svg?seed=doctor" alt="You" />
                        </div>
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src="https://api.dicebear.com/7.x/personas/svg?seed=Patient: Robert Wilson" alt="Patient" />
                        </div>
                        <div className="bg-slate-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">That's great to hear, doctor! I've been following your advice about diet and exercise.</p>
                          <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                        </div>
                      </div>
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm">Excellent! I'll update your prescription. Keep up the good work.</p>
                          <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
                        </div>
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <img src="https://api.dicebear.com/7.x/personas/svg?seed=doctor" alt="You" />
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

        <TabsContent value="orders" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Supply Orders</CardTitle>
                <CardDescription>
                  Order medical supplies and equipment
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <PlusCircle size={16} />
                <span>New Order</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { id: 'ORD-2345', items: 'Surgical Gloves, Masks', date: 'March 24, 2023', status: 'Delivered' },
                          { id: 'ORD-2344', items: 'Syringes, Bandages', date: 'March 22, 2023', status: 'Processing' },
                        ].map((order, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">{order.id}</span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>{order.status}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{order.items}</p>
                            <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full text-sm">View All Orders</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Quick Order</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: 'Surgical Gloves', quantity: 'Box of 100' },
                          { name: 'Face Masks', quantity: 'Box of 50' },
                          { name: 'Bandages', quantity: 'Pack of 25' },
                        ].map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.quantity}</p>
                            </div>
                            <Button size="sm">Order</Button>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full text-sm">View Catalog</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Order Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                          <p className="font-medium text-sm">ORD-2346</p>
                          <p className="text-xs text-gray-600 mt-1">Submitted: March 25, 2023</p>
                          <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Processing</span>
                              <span>In transit</span>
                              <span>Delivered</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full text-sm">Track Order</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DoctorDashboard;
