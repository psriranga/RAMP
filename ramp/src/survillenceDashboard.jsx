import React, { useState } from 'react';
import { Layout, LayoutDashboard, Map, Bell, Search, Settings, Users, Filter, Calendar, Activity, Camera, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockAnalyticsData = [
  { time: '00:00', events: 12, alerts: 2, accuracy: 97 },
  { time: '04:00', events: 8, alerts: 1, accuracy: 98 },
  { time: '08:00', events: 25, alerts: 4, accuracy: 96 },
  { time: '12:00', events: 30, alerts: 5, accuracy: 95 },
  { time: '16:00', events: 28, alerts: 3, accuracy: 97 },
  { time: '20:00', events: 20, alerts: 2, accuracy: 98 },
];

const SurveillanceDashboard = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('24h');

  // Simulated active alerts
  const activeAlerts = [
    { id: 1, type: 'Unattended Bag', location: 'Camera 3', time: '2 mins ago', severity: 'high' },
    { id: 2, type: 'Suspicious Activity', location: 'Camera 1', time: '5 mins ago', severity: 'medium' },
    { id: 3, type: 'Unauthorized Access', location: 'Camera 4', time: '15 mins ago', severity: 'high' }
  ];

  const SearchInterface = () => (
    <div className="space-y-6">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search events, alerts, or camera feeds..."
          className="flex-1 p-2 border rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Search
        </button>
      </div>
      <div className="flex gap-4">
        <select className="p-2 border rounded-lg">
          <option>All Event Types</option>
          <option>Suspicious Activity</option>
          <option>Unattended Objects</option>
          <option>Unauthorized Access</option>
        </select>
        <select className="p-2 border rounded-lg">
          <option>All Cameras</option>
          <option>Camera 1</option>
          <option>Camera 2</option>
          <option>Camera 3</option>
        </select>
        <select 
          className="p-2 border rounded-lg"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>
    </div>
  );

  const MapView = () => (
    <div className="bg-gray-100 rounded-lg p-4 h-96">
      <div className="bg-white h-full rounded-lg shadow-inner flex items-center justify-center">
        <span className="text-gray-500">Interactive Map View</span>
      </div>
    </div>
  );

  const CameraControls = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Pan Left</button>
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Pan Right</button>
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Zoom In</button>
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Zoom Out</button>
      </div>
      <select 
        className="w-full p-2 border rounded-lg"
        value={selectedCamera}
        onChange={(e) => setSelectedCamera(Number(e.target.value))}
      >
        {[1, 2, 3, 4].map((cam) => (
          <option key={cam} value={cam}>Camera {cam}</option>
        ))}
      </select>
    </div>
  );

  const AnalyticsDashboard = () => (
    <div className="space-y-6">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockAnalyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="events" stroke="#8884d8" />
            <Line type="monotone" dataKey="alerts" stroke="#82ca9d" />
            <Line type="monotone" dataKey="accuracy" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: 'Active Cameras', value: '12/12', icon: Camera },
          { title: 'Detection Rate', value: '98.5%', icon: Activity },
          { title: 'Active Alerts', value: '3', icon: AlertTriangle },
          { title: 'Active Users', value: '8', icon: Users }
        ].map((stat) => (
          <div key={stat.title} className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4">
            <stat.icon className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-500">{stat.title}</div>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-gray-900 p-4 flex flex-col items-center space-y-8">
        {[
          { icon: LayoutDashboard, view: 'dashboard', label: 'Dashboard' },
          { icon: Map, view: 'map', label: 'Map' },
          { icon: Bell, view: 'alerts', label: 'Alerts' },
          { icon: Search, view: 'search', label: 'Search' },
          { icon: Users, view: 'users', label: 'Users' },
          { icon: Settings, view: 'settings', label: 'Settings' }
        ].map(({ icon: Icon, view, label }) => (
          <button 
            key={view}
            onClick={() => setSelectedView(view)}
            className={`p-2 rounded-lg ${selectedView === view ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            title={label}
          >
            <Icon className="w-6 h-6 text-white" />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Header */}
          <div className="col-span-12 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Security Surveillance Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Operator: John Doe</span>
              <span className="text-sm text-green-500">System Status: Online</span>
            </div>
          </div>

          {/* Search Interface */}
          {selectedView === 'search' && (
            <div className="col-span-12">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <SearchInterface />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Map View */}
          {selectedView === 'map' && (
            <div className="col-span-12">
              <Card>
                <CardHeader>
                  <CardTitle>Surveillance Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <MapView />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Live Camera Feeds */}
          {selectedView === 'dashboard' && (
            <>
              <div className="col-span-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Camera Feeds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((camera) => (
                        <div 
                          key={camera}
                          className={`bg-gray-800 aspect-video rounded-lg flex items-center justify-center cursor-pointer ${
                            selectedCamera === camera ? 'ring-2 ring-blue-600' : ''
                          }`}
                          onClick={() => setSelectedCamera(camera)}
                        >
                          <span className="text-white">Camera {camera}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <CameraControls />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activeAlerts.map((alert) => (
                        <Alert 
                          key={alert.id} 
                          className={`border-l-4 ${
                            alert.severity === 'high' ? 'border-l-red-600' : 'border-l-yellow-600'
                          }`}
                        >
                          <AlertTitle className="font-semibold">{alert.type}</AlertTitle>
                          <AlertDescription>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-500">{alert.location}</div>
                              <div className="text-sm text-gray-500">{alert.time}</div>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12">
                <Card>
                  <CardHeader>
                    <CardTitle>System Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsDashboard />
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Alerts View */}
          {selectedView === 'alerts' && (
            <div className="col-span-12">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeAlerts.map((alert) => (
                      <Alert 
                        key={alert.id} 
                        className={`border-l-4 ${
                          alert.severity === 'high' ? 'border-l-red-600' : 'border-l-yellow-600'
                        }`}
                      >
                        <AlertTitle className="font-semibold">{alert.type}</AlertTitle>
                        <AlertDescription>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-gray-500">{alert.location}</div>
                              <div className="text-sm text-gray-500">{alert.time}</div>
                            </div>
                            <div className="space-x-2">
                              <button className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Acknowledge
                              </button>
                              <button className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                Escalate
                              </button>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveillanceDashboard;