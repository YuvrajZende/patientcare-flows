
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, AlertCircle, User, Calendar, ClipboardList, MessageSquare, HeartPulse, Activity } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const InternDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  
  // Sample patients data
  const maternityPatients = [
    {
      id: 'p1',
      name: 'Emily Johnson',
      age: 28,
      weekOfPregnancy: '24 weeks',
      assignedDoctor: 'Dr. Sarah Williams',
      lastCheckup: '2 days ago',
      nextAppointment: 'Tomorrow, 10:30 AM',
      status: 'stable',
      recentVitals: {
        bloodPressure: '120/80',
        weight: '65 kg',
        bloodSugar: '95 mg/dL'
      },
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Emily'
    },
    {
      id: 'p2',
      name: 'Michelle Davis',
      age: 30,
      weekOfPregnancy: '18 weeks',
      assignedDoctor: 'Dr. James Miller',
      lastCheckup: '1 week ago',
      nextAppointment: 'In 3 days, 2:15 PM',
      status: 'monitor',
      recentVitals: {
        bloodPressure: '130/85',
        weight: '70 kg',
        bloodSugar: '105 mg/dL'
      },
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Michelle'
    },
    {
      id: 'p3',
      name: 'Jessica Brown',
      age: 25,
      weekOfPregnancy: '32 weeks',
      assignedDoctor: 'Dr. Sarah Williams',
      lastCheckup: '3 days ago',
      nextAppointment: 'In 1 week, 9:00 AM',
      status: 'stable',
      recentVitals: {
        bloodPressure: '118/78',
        weight: '72 kg',
        bloodSugar: '90 mg/dL'
      },
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Jessica'
    }
  ];
  
  // Sample tasks data
  const tasks = [
    {
      id: 't1',
      patient: 'Emily Johnson',
      task: 'Check blood pressure and record',
      assignedBy: 'Dr. Sarah Williams',
      dueTime: '11:30 AM',
      status: 'pending'
    },
    {
      id: 't2',
      patient: 'Michelle Davis',
      task: 'Assist with ultrasound procedure',
      assignedBy: 'Dr. James Miller',
      dueTime: '2:00 PM',
      status: 'pending'
    },
    {
      id: 't3',
      patient: 'Jessica Brown',
      task: 'Review nutritional guidelines',
      assignedBy: 'Dr. Sarah Williams',
      dueTime: '4:30 PM',
      status: 'pending'
    }
  ];
  
  // Sample active alerts
  const activeAlerts = [
    {
      id: 'a1',
      patient: 'Michelle Davis',
      alert: 'Blood pressure elevated (130/85)',
      timeAgo: '2 hours ago',
      severity: 'moderate'
    }
  ];

  const handleTaskComplete = (taskId: string) => {
    toast({
      title: "Task marked as completed",
      description: "The task has been marked as completed and the doctor has been notified."
    });
  };

  const handleAlertRespond = (alertId: string) => {
    toast({
      title: "Alert response recorded",
      description: "You've acknowledged this alert. Please follow up with the patient."
    });
  };

  const handleViewPatientDetails = (patientId: string) => {
    // In a real app, this would navigate to a detailed patient view
    toast({
      title: "Patient details",
      description: "Viewing detailed information for this maternity patient."
    });
  };

  return (
    <div className="space-y-6">
      {/* Alerts Section */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-600">
            <Bell className="h-5 w-5" />
            Active Patient Alerts
          </h2>
          
          {activeAlerts.map(alert => (
            <Alert 
              key={alert.id} 
              className={`${
                alert.severity === 'high' 
                  ? 'bg-red-50 border-red-200 text-red-800' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Alert for {alert.patient}</AlertTitle>
              <AlertDescription className="mt-1">
                <p>{alert.alert}</p>
                <p className="text-sm">{alert.timeAgo}</p>
                <Button 
                  className="mt-2" 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAlertRespond(alert.id)}
                >
                  Acknowledge & Respond
                </Button>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
      
      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="patients" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="patients">Maternity Patients</TabsTrigger>
          <TabsTrigger value="tasks">Assigned Tasks</TabsTrigger>
          <TabsTrigger value="learning">Learning Resources</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Maternity Patients</CardTitle>
              <CardDescription>
                Monitor and assist with the care of maternity patients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {maternityPatients.map(patient => (
                  <div key={patient.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            {patient.age} years • {patient.weekOfPregnancy}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Doctor:</span> {patient.assignedDoctor}
                          </p>
                        </div>
                      </div>
                      
                      <Badge 
                        className={
                          patient.status === 'stable' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }
                      >
                        {patient.status === 'stable' ? 'Stable' : 'Monitor Closely'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-xs text-blue-600 font-medium">Blood Pressure</p>
                        <p className="text-lg font-semibold">{patient.recentVitals.bloodPressure}</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-xs text-green-600 font-medium">Weight</p>
                        <p className="text-lg font-semibold">{patient.recentVitals.weight}</p>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-xs text-purple-600 font-medium">Blood Sugar</p>
                        <p className="text-lg font-semibold">{patient.recentVitals.bloodSugar}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-500">Last checkup:</span> {patient.lastCheckup}
                      </div>
                      <div>
                        <span className="text-gray-500">Next appointment:</span> {patient.nextAppointment}
                      </div>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleViewPatientDetails(patient.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tasks</CardTitle>
              <CardDescription>
                Tasks assigned to you by doctors for maternity patient care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div key={task.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{task.task}</h3>
                      <Badge className={task.status === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                        {task.status === 'pending' ? 'Pending' : 'Completed'}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">
                      <p><span className="text-gray-500">Patient:</span> {task.patient}</p>
                      <p><span className="text-gray-500">Assigned by:</span> {task.assignedBy}</p>
                      <p><span className="text-gray-500">Due:</span> {task.dueTime} today</p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('patients')}
                      >
                        View Patient
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleTaskComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Maternity Care Training</CardTitle>
              <CardDescription>
                Educational resources for maternity patient care
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-100 h-40 flex items-center justify-center">
                    <HeartPulse className="h-16 w-16 text-blue-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Maternal Vital Signs Monitoring</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Learn how to properly monitor and record vital signs for pregnant patients.
                    </p>
                    <Button variant="outline" className="w-full">Start Module</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-purple-100 h-40 flex items-center justify-center">
                    <Activity className="h-16 w-16 text-purple-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">Prenatal Risk Assessment</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Learn to identify risk factors and warning signs in prenatal care.
                    </p>
                    <Button variant="outline" className="w-full">Start Module</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Intern Schedule</CardTitle>
              <CardDescription>
                Your rotation schedule and assigned shifts
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                <p>Schedule and calendar interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternDashboard;
