
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Bell, Calendar, Pill, CheckCircle, RotateCw } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

interface Reminder {
  id: string;
  type: 'medication' | 'appointment' | 'task';
  title: string;
  time: string;
  date: string;
  completed: boolean;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I\'m your pregnancy assistant. I can help you track medications, appointments, and provide advice for your maternal health journey.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      type: 'medication',
      title: 'Prenatal Vitamin',
      time: '08:00',
      date: new Date().toISOString().split('T')[0],
      completed: false
    },
    {
      id: '2',
      type: 'appointment',
      title: 'OB/GYN Checkup',
      time: '14:30',
      date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      completed: false
    },
    {
      id: '3',
      type: 'task',
      title: 'Drink 2L of water',
      time: 'All day',
      date: new Date().toISOString().split('T')[0],
      completed: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user messages and generate AI responses
  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(input.toLowerCase());
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  // Function to handle marking reminders as complete
  const toggleReminderComplete = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, completed: !reminder.completed } 
          : reminder
      )
    );

    const reminder = reminders.find(r => r.id === id);
    if (reminder) {
      toast({
        title: reminder.completed ? "Reminder unmarked" : "Reminder completed",
        description: reminder.completed ? `"${reminder.title}" marked as not done` : `"${reminder.title}" marked as done`,
      });
    }
  };

  // Simple AI response generator based on keywords
  const generateAIResponse = (query: string): string => {
    if (query.includes('medicine') || query.includes('medication') || query.includes('pill')) {
      return "According to your pregnancy stage, it's important to take your prenatal vitamins daily. Would you like me to set a reminder for your medications?";
    } else if (query.includes('tired') || query.includes('fatigue') || query.includes('exhausted')) {
      return "Fatigue is common during pregnancy. Try to rest when you can, stay hydrated, and maintain a balanced diet rich in iron. Would you like me to suggest some pregnancy-safe energy-boosting foods?";
    } else if (query.includes('pain') || query.includes('cramp')) {
      return "If you're experiencing severe pain, please contact your healthcare provider immediately or use the SOS feature. For mild cramping, rest and hydration may help, but always consult your doctor about any concerns.";
    } else if (query.includes('food') || query.includes('eat') || query.includes('diet')) {
      return "For a healthy pregnancy, focus on whole foods rich in folate, iron, calcium, and protein. Foods like leafy greens, lean proteins, whole grains, and dairy products are excellent choices. Would you like specific meal suggestions?";
    } else if (query.includes('appointment') || query.includes('doctor') || query.includes('visit')) {
      return "Your next scheduled appointment is on the calendar. Regular prenatal visits are important to monitor both your health and your baby's development. Is there something specific you'd like to discuss with your doctor?";
    } else if (query.includes('remind') || query.includes('reminder')) {
      // Simulate adding a reminder
      const newReminder: Reminder = {
        id: (Date.now()).toString(),
        type: 'task',
        title: 'New reminder from chat',
        time: '12:00',
        date: new Date().toISOString().split('T')[0],
        completed: false
      };
      setReminders(prev => [...prev, newReminder]);
      
      return "I've added a new reminder for you. You can customize it in the reminders section.";
    } else if (query.includes('thank')) {
      return "You're welcome! I'm here to help with your pregnancy journey. Is there anything else you'd like to know?";
    } else {
      return "I'm here to help with your pregnancy journey. You can ask me about your medications, appointments, health concerns, or nutrition advice. I can also set reminders for you.";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-500" />
          Maternal Health Assistant
        </CardTitle>
        <CardDescription>
          Your AI companion for medication reminders and health advice
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="border rounded-lg h-[400px] flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                      {message.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center text-gray-500 mb-4">
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    <span>Assistant is thinking...</span>
                  </div>
                )}
              </ScrollArea>
              <div className="p-3 border-t flex gap-2">
                <Input 
                  placeholder="Ask about medications, appointments, or health advice..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={isLoading || input.trim() === ''}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg h-[400px] flex flex-col">
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span>Reminders</span>
              </h3>
              <Badge variant="outline" className="text-xs">
                {reminders.filter(r => !r.completed).length} active
              </Badge>
            </div>
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className={`p-3 border rounded-md transition-colors ${
                      reminder.completed ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        {reminder.type === 'medication' && <Pill className="h-4 w-4 text-rose-500" />}
                        {reminder.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-500" />}
                        {reminder.type === 'task' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        <span className={reminder.completed ? 'line-through' : 'font-medium'}>
                          {reminder.title}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2"
                        onClick={() => toggleReminderComplete(reminder.id)}
                      >
                        {reminder.completed ? 'Undo' : 'Done'}
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {reminder.date} at {reminder.time}
                    </div>
                  </div>
                ))}

                {reminders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p>No reminders yet</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <Bot className="h-4 w-4 text-blue-500" />
          <AlertTitle>AI Assistance</AlertTitle>
          <AlertDescription>
            This AI assistant can suggest appropriate care based on your stage of pregnancy. For medical emergencies, please use the SOS feature or contact your healthcare provider directly.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
