import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Shield, MapPin, Bell, Lock, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    location: '',
  });

  const [notifications, setNotifications] = useState({
    hazardAlerts: true,
    weeklyReports: false,
    socialMentions: true,
    aiInsights: true,
  });

  const handleSave = () => {
    // TODO: Implement API call to update profile
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully",
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Notification Updated",
      description: `${key} notifications ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDashboardPath = () => {
    return user?.role === 'admin' ? '/admin/dashboard' : '/citizen/dashboard';
  };

  const userStats = {
    totalReports: user?.role === 'admin' ? 156 : 12,
    resolvedIncidents: user?.role === 'admin' ? 89 : 8,
    communityImpact: user?.role === 'admin' ? '15.2k' : '247',
    responseTime: user?.role === 'admin' ? '8m' : '15m',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(getDashboardPath())}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="gradient-ocean text-white text-xl">
                      {getInitials(user?.name || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {user?.role === 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="e.g., Coast Guard, Emergency Services"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Default Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Your primary monitoring area"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {isEditing ? (
                    <>
                      <Button variant="ocean" onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Hazard Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time notifications for new hazards in your area
                    </p>
                  </div>
                  <Switch
                    checked={notifications.hazardAlerts}
                    onCheckedChange={(checked) => handleNotificationChange('hazardAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Summary of hazard activity in your region
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange('weeklyReports', checked)}
                  />
                </div>

                {user?.role === 'admin' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Social Media Mentions</h4>
                        <p className="text-sm text-muted-foreground">
                          Alerts when hazards are trending on social media
                        </p>
                      </div>
                      <Switch
                        checked={notifications.socialMentions}
                        onCheckedChange={(checked) => handleNotificationChange('socialMentions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AI Insights</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications when AI detects important patterns
                        </p>
                      </div>
                      <Switch
                        checked={notifications.aiInsights}
                        onCheckedChange={(checked) => handleNotificationChange('aiInsights', checked)}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Security
                </CardTitle>
                <CardDescription>
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download My Data
                </Button>
                <Button variant="destructive" className="w-full" onClick={logout}>
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Badge */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="p-4 gradient-ocean rounded-xl inline-flex mb-4">
                    {user?.role === 'admin' ? (
                      <Shield className="w-8 h-8 text-white" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {user?.role === 'admin' ? 'Administrator' : 'Citizen Reporter'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === 'admin' ? 
                      'Full access to analytics and management tools' : 
                      'Contributing to community safety through reporting'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {user?.role === 'admin' ? 'Total Reports Managed' : 'Reports Submitted'}
                  </span>
                  <span className="font-semibold">{userStats.totalReports}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {user?.role === 'admin' ? 'Incidents Resolved' : 'Verified Reports'}
                  </span>
                  <span className="font-semibold">{userStats.resolvedIncidents}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">People Helped</span>
                  <span className="font-semibold">{userStats.communityImpact}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Response Time</span>
                  <span className="font-semibold">{userStats.responseTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;