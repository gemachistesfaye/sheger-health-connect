import { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Save,
  Bell,
  Lock,
  Palette,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  Globe,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Clinic Settings
  const [clinicSettings, setClinicSettings] = useState({
    name: 'Sheger Care Clinic',
    email: 'info@shegercare.com',
    phone: '+251 911 234 567',
    address: 'Addis Ababa, Ethiopia',
    website: 'www.shegercare.com',
    openingTime: '08:00',
    closingTime: '18:00',
    timezone: 'Africa/Addis_Ababa',
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    appointmentReminder: true,
    appointmentConfirmation: true,
    patientFollowUp: true,
    staffUpdates: true,
    dailyReport: true,
    reportTime: '08:00',
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordRequirement: '12-characters',
    twoFactorAuth: false,
    sessionTimeout: '30',
    enableApiAccess: false,
  });

  // User Management
  const [adminUsers, setAdminUsers] = useState([
    { id: '1', name: 'Dr. Solomon Abebe', email: 'solomon@sheger.com', role: 'Admin', status: 'active', lastLogin: '2024-01-28' },
    { id: '2', name: 'Admin Hiwot', email: 'hiwot@sheger.com', role: 'Manager', status: 'active', lastLogin: '2024-01-27' },
  ]);

  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'Staff',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSaveClinicSettings = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: 'Clinic settings saved successfully' });
    }, 1000);
  };

  const handleSaveNotificationSettings = () => {
    toast({ title: 'Notification settings updated' });
  };

  const handleSaveSecuritySettings = () => {
    toast({ title: 'Security settings updated' });
  };

  const handleAddUser = () => {
    if (!newUserForm.name || !newUserForm.email) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    const newUser = {
      id: String(Date.now()),
      name: newUserForm.name,
      email: newUserForm.email,
      role: newUserForm.role,
      status: 'active',
      lastLogin: 'Never',
    };

    setAdminUsers([...adminUsers, newUser]);
    setNewUserForm({ name: '', email: '', role: 'Staff' });
    toast({ title: 'User added successfully' });
  };

  const handleRemoveUser = (id: string) => {
    setAdminUsers(adminUsers.filter(u => u.id !== id));
    toast({ title: 'User removed' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Admin Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage clinic configuration and system preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
            <TabsTrigger value="system" className="text-xs sm:text-sm">System</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <SettingsIcon className="w-5 h-5 text-primary" />
                  Clinic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Clinic Name</label>
                    <Input
                      value={clinicSettings.name}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={clinicSettings.website}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="www.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={clinicSettings.email}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={clinicSettings.phone}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      value={clinicSettings.address}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <Select
                      value={clinicSettings.timezone}
                      onValueChange={(v) => setClinicSettings(prev => ({ ...prev, timezone: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Addis_Ababa">Africa/Addis Ababa</SelectItem>
                        <SelectItem value="Africa/Cairo">Africa/Cairo</SelectItem>
                        <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Opening Time</label>
                    <Input
                      type="time"
                      value={clinicSettings.openingTime}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, openingTime: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Closing Time</label>
                    <Input
                      type="time"
                      value={clinicSettings.closingTime}
                      onChange={(e) => setClinicSettings(prev => ({ ...prev, closingTime: e.target.value }))}
                    />
                  </div>
                </div>
                <Button variant="hero" onClick={handleSaveClinicSettings} disabled={isSaving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'appointmentReminder', label: 'Appointment Reminders', desc: 'Notify staff of upcoming appointments' },
                  { key: 'appointmentConfirmation', label: 'Appointment Confirmation', desc: 'Confirm appointment details with patients' },
                  { key: 'patientFollowUp', label: 'Patient Follow-ups', desc: 'Send follow-up messages to patients' },
                  { key: 'staffUpdates', label: 'Staff Updates', desc: 'Notify staff of system updates' },
                  { key: 'dailyReport', label: 'Daily Reports', desc: 'Send daily clinic performance reports' },
                ].map(setting => (
                  <div key={setting.key} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-sm">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={notificationSettings[setting.key as keyof typeof notificationSettings] as boolean}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, [setting.key]: e.target.checked }))}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                ))}

                {notificationSettings.dailyReport && (
                  <div className="pt-2">
                    <label className="block text-sm font-medium mb-2">Report Time</label>
                    <Input
                      type="time"
                      value={notificationSettings.reportTime}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, reportTime: e.target.value }))}
                    />
                  </div>
                )}

                <Button variant="hero" onClick={handleSaveNotificationSettings} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Password Requirements</label>
                    <Select
                      value={securitySettings.passwordRequirement}
                      onValueChange={(v) => setSecuritySettings(prev => ({ ...prev, passwordRequirement: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8-characters">8 Characters Minimum</SelectItem>
                        <SelectItem value="12-characters">12 Characters Minimum</SelectItem>
                        <SelectItem value="strong">Strong (16+ chars, mixed case, numbers, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                      className="w-5 h-5 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div>
                      <p className="font-medium text-sm">API Access</p>
                      <p className="text-xs text-muted-foreground">Enable API for third-party integrations</p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={securitySettings.enableApiAccess}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, enableApiAccess: e.target.checked }))}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                </div>

                <Button variant="hero" onClick={handleSaveSecuritySettings} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Add Admin User
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={newUserForm.name}
                      onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="user@clinic.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <Select
                    value={newUserForm.role}
                    onValueChange={(v) => setNewUserForm(prev => ({ ...prev, role: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="hero" onClick={handleAddUser} className="w-full gap-2">
                  <Users className="w-4 h-4" />
                  Add User
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Admin Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {adminUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{user.role}</Badge>
                          <Badge className={user.status === 'active' ? 'bg-medical-green/20 text-medical-green' : 'bg-destructive/20 text-destructive'}>
                            {user.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Last login: {user.lastLogin}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6 mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">API Status</span>
                  <Badge className="bg-medical-green/20 text-medical-green">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">Database</span>
                  <Badge className="bg-medical-green/20 text-medical-green">Connected</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">Email Service</span>
                  <Badge className="bg-medical-green/20 text-medical-green">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">System Version</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Backup & Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Last backup: January 28, 2024 at 02:00 AM</p>
                <Button variant="outline" className="w-full">Backup Now</Button>
                <Button variant="outline" className="w-full">View Logs</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
