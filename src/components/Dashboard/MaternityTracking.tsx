
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse, Thermometer, Scale, Utensils, Activity, Droplets } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

interface HealthMetric {
  date: string;
  value: string;
  notes?: string;
}

const MaternityTracking = () => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [bloodPressure, setBloodPressure] = useState<HealthMetric[]>([
    { date: new Date().toISOString().split('T')[0], value: '120/80', notes: 'Normal reading' },
    { date: new Date(Date.now() - 86400000).toISOString().split('T')[0], value: '118/78', notes: 'After walking' },
  ]);
  const [weight, setWeight] = useState<HealthMetric[]>([
    { date: new Date().toISOString().split('T')[0], value: '65 kg', notes: 'Morning weight' },
    { date: new Date(Date.now() - 86400000 * 7).toISOString().split('T')[0], value: '64.5 kg', notes: 'Weekly check' },
  ]);
  const [foodLog, setFoodLog] = useState<HealthMetric[]>([
    { date: new Date().toISOString().split('T')[0], value: 'Breakfast: Oatmeal, fruit, prenatal vitamin', notes: 'Felt good' },
    { date: new Date().toISOString().split('T')[0], value: 'Lunch: Salad with chicken, whole grain bread', notes: 'Some nausea after' },
  ]);

  // New entry form states
  const [newBpValue, setNewBpValue] = useState('');
  const [newBpNotes, setNewBpNotes] = useState('');
  const [newWeightValue, setNewWeightValue] = useState('');
  const [newWeightNotes, setNewWeightNotes] = useState('');
  const [newFoodValue, setNewFoodValue] = useState('');
  const [newFoodNotes, setNewFoodNotes] = useState('');
  
  // SOS state
  const [sosReason, setSosReason] = useState('');
  const [showSosForm, setShowSosForm] = useState(false);

  const addBloodPressure = () => {
    if (!newBpValue) return;
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      value: newBpValue,
      notes: newBpNotes
    };
    setBloodPressure([newEntry, ...bloodPressure]);
    setNewBpValue('');
    setNewBpNotes('');
    toast({
      title: "Blood pressure recorded",
      description: "Your healthcare provider has been notified of your new entry."
    });
  };

  const addWeight = () => {
    if (!newWeightValue) return;
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      value: newWeightValue + ' kg',
      notes: newWeightNotes
    };
    setWeight([newEntry, ...weight]);
    setNewWeightValue('');
    setNewWeightNotes('');
    toast({
      title: "Weight recorded",
      description: "Your weight has been added to your health record."
    });
  };

  const addFoodLog = () => {
    if (!newFoodValue) return;
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      value: newFoodValue,
      notes: newFoodNotes
    };
    setFoodLog([newEntry, ...foodLog]);
    setNewFoodValue('');
    setNewFoodNotes('');
    toast({
      title: "Food log added",
      description: "Your food intake has been recorded."
    });
  };

  const sendSosAlert = () => {
    if (!sosReason) {
      toast({
        title: "Please provide a reason",
        description: "We need to know why you're sending an SOS to help you better.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send an alert to medical staff
    toast({
      title: "SOS Alert Sent!",
      description: "Emergency medical staff have been notified and will contact you immediately.",
      variant: "destructive"
    });
    
    setSosReason('');
    setShowSosForm(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-pink-500" />
          Maternity Health Tracking
        </CardTitle>
        <CardDescription>
          Monitor your health metrics throughout your pregnancy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Button 
            variant="destructive" 
            className="w-full py-6 text-lg flex items-center gap-2"
            onClick={() => setShowSosForm(!showSosForm)}
          >
            <AlertCircle className="h-6 w-6" />
            {showSosForm ? "Cancel SOS" : "Emergency SOS Alert"}
          </Button>
          
          {showSosForm && (
            <div className="mt-4 p-4 border border-red-300 rounded-md bg-red-50">
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Emergency SOS</AlertTitle>
                <AlertDescription>
                  This will immediately alert your healthcare provider and hospital.
                </AlertDescription>
              </Alert>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sos-reason">What's happening? (Required)</Label>
                  <Input 
                    id="sos-reason"
                    placeholder="Describe your emergency (e.g., severe pain, bleeding)"
                    value={sosReason}
                    onChange={(e) => setSosReason(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={sendSosAlert} variant="destructive" className="w-full">
                  Send Emergency Alert
                </Button>
              </div>
            </div>
          )}
        </div>

        <Tabs defaultValue="vitals" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="food">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Blood Pressure Log</h3>
              </div>
              
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="bp-value">Blood Pressure (e.g., 120/80)</Label>
                  <Input
                    id="bp-value"
                    placeholder="Enter your blood pressure"
                    value={newBpValue}
                    onChange={(e) => setNewBpValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bp-notes">Notes</Label>
                  <Input
                    id="bp-notes"
                    placeholder="Any additional information"
                    value={newBpNotes}
                    onChange={(e) => setNewBpNotes(e.target.value)}
                  />
                </div>
                <Button onClick={addBloodPressure}>Record Blood Pressure</Button>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium">Recent Readings</h4>
                {bloodPressure.map((bp, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{bp.value}</span>
                      <span className="text-sm text-gray-500">{bp.date}</span>
                    </div>
                    {bp.notes && <p className="text-sm text-gray-600 mt-1">{bp.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weight" className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Scale className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Weight Tracking</h3>
              </div>
              
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="weight-value">Weight (kg)</Label>
                  <Input
                    id="weight-value"
                    type="number"
                    placeholder="Enter your weight in kg"
                    value={newWeightValue}
                    onChange={(e) => setNewWeightValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight-notes">Notes</Label>
                  <Input
                    id="weight-notes"
                    placeholder="Any additional information"
                    value={newWeightNotes}
                    onChange={(e) => setNewWeightNotes(e.target.value)}
                  />
                </div>
                <Button onClick={addWeight}>Record Weight</Button>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium">Weight History</h4>
                {weight.map((w, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{w.value}</span>
                      <span className="text-sm text-gray-500">{w.date}</span>
                    </div>
                    {w.notes && <p className="text-sm text-gray-600 mt-1">{w.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Nutrition Tracking</h3>
              </div>
              
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="food-value">Food Entry</Label>
                  <Input
                    id="food-value"
                    placeholder="What did you eat?"
                    value={newFoodValue}
                    onChange={(e) => setNewFoodValue(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="food-notes">How did you feel?</Label>
                  <Input
                    id="food-notes"
                    placeholder="Any symptoms or notes"
                    value={newFoodNotes}
                    onChange={(e) => setNewFoodNotes(e.target.value)}
                  />
                </div>
                <Button onClick={addFoodLog}>Add Food Entry</Button>
              </div>
              
              <div className="space-y-2 mt-4">
                <h4 className="text-sm font-medium">Recent Food Entries</h4>
                {foodLog.map((food, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{food.value}</span>
                      <span className="text-sm text-gray-500">{food.date}</span>
                    </div>
                    {food.notes && <p className="text-sm text-gray-600 mt-1">{food.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MaternityTracking;
