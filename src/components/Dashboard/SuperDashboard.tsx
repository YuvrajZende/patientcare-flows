
import React, { useState } from 'react';
import { Users, Building2, Shield, Settings, Terminal, Database, AlertTriangle, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SuperDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  // Super user stats
  const stats = [
    {
      title: 'Total Users',
      value: '3,247',
      change: '+156',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: '0%',
      trend: 'neutral',
      icon: <Terminal className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'Database Size',
      value: '42 GB',
      change: '+2.3 GB',
      trend: 'up',
      icon: <Database className="h-5 w-5 text-muted-foreground" />
    },
    {
      title: 'System Alerts',
      value: '2',
      change: '-3',
      trend: 'down',
      icon: <AlertTriangle className="h-5 w-5 text-muted-foreground" />
    }
  ];

  // Sample system alerts
  const systemAlerts = [
    {
      title: 'Database Backup Required',
      description: 'Scheduled backup missed at 2:00 AM',
      severity: 'high',
      time: '4 hours ago'
    },
    {
      title: 'System Update Available',
      description: 'New version 2.4.1 ready to install',
      severity: 'medium',
      time: '1 day ago'
    }
  ];

  // Sample recent activities
  const recentActivities = [
    {
      title: 'User Account Created',
      description: 'New doctor account created for Dr. Emily Johnson',
      time: '30 minutes ago',
      icon: <Users className="h-8 w-8 p-1.5 bg-green-50 text-green-500 rounded-full" />
    },
    {
      title: 'Permission Changed',
      description: 'Modified access rights for Radiology department',
      time: '2 hours ago',
      icon: <Shield className="h-8 w-8 p-1.5 bg-blue-50 text-blue-500 rounded-full" />
    },
    {
      title: 'System Maintenance',
      description: 'Scheduled maintenance completed successfully',
      time: '5 hours ago',
      icon: <Settings className="h-8 w-8 p-1.5 bg-purple-50 text-purple-500 rounded-full" />
    }
  ];

  return (
    <>
      <Tabs defaultValue="overview" className="animate-fade-in stagger-2" onValueChange={setSelectedTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
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
                    stat.trend === 'up' && stat.title !== 'System Alerts' ? 'text-green-600' : 
                    stat.trend === 'down' && stat.title === 'System Alerts' ? 'text-green-600' :
                    stat.trend === 'up' && stat.title === 'System Alerts' ? 'text-red-600' :
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  )}>
                    {stat.change} from last week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>
                  Administrative actions and system events
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
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>
                  Issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="p-4 rounded-lg border border-l-4 bg-slate-50 border-l-red-500">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{alert.title}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' : 
                          alert.severity === 'medium' ? 'bg-amber-100 text-amber-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{alert.time}</span>
                        <Button size="sm" variant="outline">Resolve</Button>
                      </div>
                    </div>
                  ))}
                  {systemAlerts.length === 0 && (
                    <div className="text-center py-8">
                      <Shield className="mx-auto h-10 w-10 text-green-500 mb-3" />
                      <p className="text-gray-600">No system alerts at this time</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Users size={48} className="mx-auto mb-4 opacity-50" />
                <p>User management interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure system parameters and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Settings size={48} className="mx-auto mb-4 opacity-50" />
                <p>System settings interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="animate-fade-in">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                View system audit trail and security logs
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Audit logs will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SuperDashboard;
