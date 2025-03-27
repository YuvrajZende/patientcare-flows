
import React, { useState } from 'react';
import { Calendar, ClipboardList, ActivityIcon, Pill, User, MessageSquare, HeartPulse, Bell, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MaternityTracking from './MaternityTracking';
import AIAssistant from './AIAssistant';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const PatientDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const { user } = useAuth();

  // Sample upcoming appointments
  const upcomingAppointments = [
    { date: '28 Mar', time: '09:30 AM', doctor: 'Dr. Sarah Williams', department: 'Obstetrics' },
    { date: '2 Apr', time: '02:15 PM', doctor: 'Dr. James Miller', department: 'Maternal-Fetal Medicine' }
  ];

  // Sample medications
  const medications = [
    { name: 'Prenatal Vitamin', dosage: '1 tablet', frequency: 'Once daily', remaining: '15 days' },
    { name: 'Folic Acid', dosage: '400mcg', frequency: 'Once daily', remaining: '8 days' },
    { name: 'Iron Supplement', dosage: '27mg', frequency: 'Once daily with food', remaining: '20 days' }
  ];

  // Sample lab results
  const labResults = [
    { test: 'Complete Blood Count', date: '15 Mar 2023', status: 'Completed' },
    { test: 'Glucose Screening', date: '15 Mar 2023', status: 'Completed' },
    { test: 'Ultrasound', date: '10 Feb 2023', status: 'Completed' }
  ];

  const sendSosAlert = () => {
    toast({
      title: "Emergency SOS Activated",
      description: "Medical staff have been alerted and will contact you immediately.",
      variant: "destructive"
    });
  };

  return (
    <>
      <div className="mb-6">
        <Button 
          variant="destructive" 
          className="w-full py-6 text-lg flex items-center justify-center gap-2"
          onClick={sendSosAlert}
        >
          <AlertCircle className="h-6 w-6" />
          Emergency SOS Alert
        </Button>
      </div>

      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Health Tracking</TabsTrigger>
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled maternity care appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-12 h-12 flex flex-col items-center justify-center bg-blue-100 text-blue-700 rounded-lg">
                          <span className="text-xs font-medium">{appointment.date.split(' ')[0]}</span>
                          <span className="text-xs">{appointment.date.split(' ')[1]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-sm text-gray-600">{appointment.department}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">Schedule New Appointment</Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-gray-600 mb-4">You have no upcoming appointments</p>
                    <Button>Schedule an Appointment</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
                <CardDescription>
                  Your prescribed prenatal medications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{medication.name}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {medication.remaining} left
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Request Refill</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mb-6">
            <CardHeader>
              <CardTitle>Recent Lab Results</CardTitle>
              <CardDescription>
                Your most recent maternity tests and screenings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-2 font-medium">Test Name</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labResults.map((result, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3">{result.test}</td>
                        <td className="py-3 text-sm text-gray-600">{result.date}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {result.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Schedule Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Book Now</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Message Your Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Message</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Health Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={() => setSelectedTab('tracking')}
                >
                  <HeartPulse className="h-4 w-4" />
                  <span>Track Health</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="animate-fade-in">
          <MaternityTracking />
        </TabsContent>

        <TabsContent value="assistant" className="animate-fade-in">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="appointments" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                Schedule and manage your maternity care appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Appointment management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>
                View your complete maternal health history
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

export default PatientDashboard;
