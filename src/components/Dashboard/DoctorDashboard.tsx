
import React, { useState, useEffect } from 'react';
import { User, Calendar, Activity, MessageSquare, AlertCircle, Bell, Pill, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const DoctorDashboard = () => {
  const [activeSosAlerts, setActiveSosAlerts] = useState([
    { 
      id: '1', 
      patient: 'Emily Johnson', 
      time: '10 min ago', 
      reason: 'Severe abdominal pain', 
      status: 'urgent',
      contact: '+1 (555) 123-4567'
    }
  ]);
  
  const [patientVitals, setPatientVitals] = useState([
    {
      id: 'p1',
      name: 'Emily Johnson',
      age: 28,
      weekOfPregnancy: '24 weeks',
      bloodPressure: '128/82',
      lastUpdate: '2 hours ago',
      status: 'caution',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Emily'
    },
    {
      id: 'p2',
      name: 'Sarah Williams',
      age: 32,
      weekOfPregnancy: '36 weeks',
      bloodPressure: '118/75',
      lastUpdate: '1 hour ago',
      status: 'normal',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sarah'
    },
    {
      id: 'p3',
      name: 'Michelle Davis',
      age: 30,
      weekOfPregnancy: '18 weeks',
      bloodPressure: '130/85',
      lastUpdate: '4 hours ago',
      status: 'caution',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Michelle'
    }
  ]);

  const appointments = [
    { 
      time: '09:00 AM', 
      patient: 'Sarah Williams', 
      purpose: 'Regular Checkup',
      weekOfPregnancy: '36 weeks',
      status: 'Confirmed'
    },
    { 
      time: '10:30 AM', 
      patient: 'Michelle Davis', 
      purpose: 'Ultrasound',
      weekOfPregnancy: '18 weeks',
      status: 'Confirmed'
    },
    { 
      time: '01:00 PM', 
      patient: 'Emily Johnson', 
      purpose: 'Follow-up',
      weekOfPregnancy: '24 weeks',
      status: 'Cancelled'
    },
    { 
      time: '03:30 PM', 
      patient: 'Jessica Brown', 
      purpose: 'Initial Consultation',
      weekOfPregnancy: '8 weeks',
      status: 'Confirmed'
    }
  ];

  // Sample data for medications to prescribe
  const commonPrescriptions = [
    { name: 'Prenatal Vitamin', dosage: '1 tablet daily' },
    { name: 'Folic Acid', dosage: '400mcg daily' },
    { name: 'Iron Supplement', dosage: '27mg daily with food' },
    { name: 'Vitamin D', dosage: '1000 IU daily' },
    { name: 'Calcium', dosage: '1000mg daily' }
  ];

  const handleSosResponse = (alertId: string) => {
    toast({
      title: "SOS Response Initiated",
      description: "You're now responding to this maternity emergency",
    });
    
    // In a real app, this would initiate a call or direct messaging
    setActiveSosAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const dismissSosAlert = (alertId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSosAlerts(prev => prev.filter(alert => alert.id !== alertId));
    
    toast({
      title: "SOS Alert Dismissed",
      description: "The alert has been removed from your dashboard",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'caution':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'normal':
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      {activeSosAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Active SOS Alerts
          </h2>
          
          {activeSosAlerts.map(alert => (
            <Alert 
              key={alert.id} 
              variant="destructive" 
              className="cursor-pointer hover:bg-red-50 transition-colors"
              onClick={() => handleSosResponse(alert.id)}
            >
              <div className="flex justify-between items-start w-full">
                <div>
                  <AlertTitle className="flex items-center gap-2">
                    <Bell className="h-4 w-4 animate-pulse" />
                    Emergency Alert from {alert.patient}
                  </AlertTitle>
                  <AlertDescription className="mt-1">
                    <p><strong>Reason:</strong> {alert.reason}</p>
                    <p><strong>Contact:</strong> {alert.contact}</p>
                    <p><strong>Time:</strong> {alert.time}</p>
                    <Button className="mt-2" size="sm" variant="outline">
                      Respond Now
                    </Button>
                  </AlertDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={(e) => dismissSosAlert(alert.id, e)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="patients">
        <TabsList className="mb-6">
          <TabsTrigger value="patients">Maternity Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maternity Patient Monitoring</CardTitle>
                <CardDescription>
                  Track vital signs and health metrics of your maternity patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patientVitals.map(patient => (
                    <div 
                      key={patient.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-500">
                            {patient.age} years • {patient.weekOfPregnancy}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-medium">Blood Pressure</p>
                          <p className="text-sm text-gray-500">{patient.bloodPressure}</p>
                          <p className="text-xs text-gray-400">Updated {patient.lastUpdate}</p>
                        </div>
                        
                        <Badge className={`${getStatusColor(patient.status)} border`}>
                          {patient.status === 'normal' ? 'Normal' : 
                           patient.status === 'caution' ? 'Monitor' : 'Urgent'}
                        </Badge>
                        
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Add New Patient</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Register Patient
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Patient Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Inbox
                    <Badge className="ml-2 bg-red-500">3</Badge>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Create Health Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    New Health Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                Manage your scheduled patient appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg flex justify-between items-center ${
                      appointment.status === 'Cancelled' ? 'bg-gray-50 text-gray-500' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-medium">
                        {appointment.time.split(' ')[0]}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.purpose} • {appointment.weekOfPregnancy}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-800'}>
                        {appointment.status}
                      </Badge>
                      
                      <Button variant="outline" size="sm" disabled={appointment.status === 'Cancelled'}>
                        Details
                      </Button>
                      
                      <Button size="sm" disabled={appointment.status === 'Cancelled'}>
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Medication Management</CardTitle>
              <CardDescription>
                Prescribe and manage medications for your maternity patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Common Maternity Prescriptions</h3>
                  <div className="space-y-2">
                    {commonPrescriptions.map((prescription, index) => (
                      <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-purple-500" />
                          <div>
                            <p className="font-medium">{prescription.name}</p>
                            <p className="text-xs text-gray-500">{prescription.dosage}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Prescribe</Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Recent Prescriptions</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Sarah Williams</p>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm">Iron Supplement - 27mg daily</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">Prescribed 1 week ago</p>
                        <Button size="sm" variant="ghost">Renew</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Emily Johnson</p>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm">Prenatal Vitamin - 1 tablet daily</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">Prescribed 2 weeks ago</p>
                        <Button size="sm" variant="ghost">Renew</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      New Custom Prescription
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Patient Communications</CardTitle>
              <CardDescription>
                Manage messages and communications with your maternity patients
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                <p>Messaging interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorDashboard;
