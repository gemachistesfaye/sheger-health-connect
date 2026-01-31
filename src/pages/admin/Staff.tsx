import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit2, 
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { staffMembers as initialStaff, StaffMember } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Staff = () => {
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Doctor' as StaffMember['role'],
    specialty: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    license: '',
  });

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenDialog = (member?: StaffMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        specialty: member.specialty || '',
        email: member.email,
        phone: member.phone,
        joinDate: member.joinDate,
        license: member.license || '',
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: 'Doctor',
        specialty: '',
        email: '',
        phone: '',
        joinDate: new Date().toISOString().split('T')[0],
        license: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingMember) {
      setStaff(prev => prev.map(m => 
        m.id === editingMember.id 
          ? { 
              ...m, 
              name: formData.name,
              role: formData.role,
              specialty: formData.specialty,
              email: formData.email,
              phone: formData.phone,
              joinDate: formData.joinDate,
              license: formData.license,
            }
          : m
      ));
      toast({ title: "Staff member updated successfully" });
    } else {
      const newMember: StaffMember = {
        id: String(Date.now()),
        name: formData.name,
        role: formData.role,
        specialty: formData.specialty || undefined,
        email: formData.email,
        phone: formData.phone,
        joinDate: formData.joinDate,
        status: 'active',
        license: formData.license || undefined,
      };
      setStaff(prev => [newMember, ...prev]);
      toast({ title: "Staff member added successfully" });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setStaff(prev => prev.filter(m => m.id !== id));
    toast({ title: "Staff member removed" });
  };

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Doctor': 'bg-primary/10 text-primary',
      'Nurse': 'bg-medical-green/10 text-medical-green',
      'Lab Technician': 'bg-medical-blue/10 text-medical-blue',
      'Administrator': 'bg-medical-coral/10 text-medical-coral',
      'Receptionist': 'bg-medical-yellow/10 text-medical-yellow',
    };
    return colors[role] || 'bg-secondary text-foreground';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-medical-green/20 text-medical-green' 
      : 'bg-destructive/20 text-destructive';
  };

  const stats = [
    { label: 'Total Staff', value: staff.length, color: 'bg-primary/10 text-primary' },
    { label: 'Doctors', value: staff.filter(s => s.role === 'Doctor').length, color: 'bg-medical-green/10 text-medical-green' },
    { label: 'Nurses', value: staff.filter(s => s.role === 'Nurse').length, color: 'bg-medical-blue/10 text-medical-blue' },
    { label: 'Active', value: staff.filter(s => s.status === 'active').length, color: 'bg-medical-coral/10 text-medical-coral' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
              Staff Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage healthcare providers and clinic staff
            </p>
          </div>
          <Button variant="hero" className="gap-2" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4" />
            Add Staff Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & Filter */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search staff by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Doctor">Doctor</SelectItem>
                  <SelectItem value="Nurse">Nurse</SelectItem>
                  <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Receptionist">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Staff Members ({filteredStaff.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden sm:table-cell">Specialty</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {member.specialty || 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">
                        {member.email}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {member.joinDate}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedMember(member)}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(member)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No staff members found matching your criteria.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Staff Member Details Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display">Staff Details</DialogTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMember(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-6 py-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{selectedMember.name}</h3>
                    <Badge className={getRoleColor(selectedMember.role)}>{selectedMember.role}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{selectedMember.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium">{selectedMember.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Specialty</p>
                      <p className="text-sm font-medium">{selectedMember.specialty || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Join Date</p>
                      <p className="text-sm font-medium">{selectedMember.joinDate}</p>
                    </div>
                  </div>
                  {selectedMember.license && (
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">License</p>
                        <p className="text-sm font-medium">{selectedMember.license}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{
                      backgroundColor: selectedMember.status === 'active' ? 'hsl(var(--medical-green))' : 'hsl(var(--destructive))'
                    }} />
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-sm font-medium capitalize">{selectedMember.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">
                {editingMember ? 'Edit Staff Member' : 'Add Staff Member'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <Select
                  value={formData.role}
                  onValueChange={(v) => setFormData(prev => ({ ...prev, role: v as StaffMember['role'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Nurse">Nurse</SelectItem>
                    <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Receptionist">Receptionist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {(formData.role === 'Doctor' || formData.role === 'Nurse') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Specialty</label>
                  <Input
                    value={formData.specialty}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                    placeholder="e.g., Cardiology"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="staff@sheger.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+251 9XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Join Date</label>
                <Input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value }))}
                />
              </div>
              {(formData.role === 'Doctor' || formData.role === 'Lab Technician') && (
                <div>
                  <label className="block text-sm font-medium mb-2">License Number</label>
                  <Input
                    value={formData.license}
                    onChange={(e) => setFormData(prev => ({ ...prev, license: e.target.value }))}
                    placeholder="e.g., LIC-2020-001"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button variant="hero" onClick={handleSave}>
                {editingMember ? 'Update' : 'Add'} Staff Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Staff;
