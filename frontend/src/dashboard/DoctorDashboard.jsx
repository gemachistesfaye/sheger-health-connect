import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';

const DoctorDashboard = () => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [recordData, setRecordData] = useState({
    diagnosis: '',
    prescriptions: '',
    allergies: '',
    lab_results: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) setAppointments(data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [token]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map(app => app.id === id ? { ...app, status: newStatus } : app));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...recordData,
          patient_id: selectedAppointment.patient_id,
          appointment_id: selectedAppointment.id
        })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map(app => app.id === selectedAppointment.id ? { ...app, status: 'Completed' } : app));
        setSelectedAppointment(null);
        setRecordData({ diagnosis: '', prescriptions: '', allergies: '', lab_results: '', notes: '' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Doctor Workspace</h1>
        <p className="text-gray-500 mt-1">Manage your patients and schedule for today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Consultations" value={appointments.length} icon={Users} color="bg-primary" trend={15} />
        <StatCard title="Pending Review" value={appointments.filter(a => a.status === 'Pending').length} icon={Clock} color="bg-orange-500" />
        <StatCard title="Completed Today" value={appointments.filter(a => a.status === 'Completed').length} icon={CheckCircle2} color="bg-emerald-500" />
      </div>

      {/* Schedule Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl">
            <Calendar size={16} />
            {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Patient</th>
                <th className="px-8 py-4">Time</th>
                <th className="px-8 py-4">Department</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-8 py-16 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <Calendar size={40} className="opacity-20" />
                      <p>No appointments found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                appointments.map((app) => (
                  <tr key={app.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                          {app.patient_id}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Patient #{app.patient_id}</p>
                          <p className="text-xs text-gray-400">Regular Checkup</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-bold text-gray-700">{app.appointment_time}</td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium text-gray-500">{app.department}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        app.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                        app.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                        app.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                        'bg-red-50 text-red-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {app.status === 'Pending' && (
                          <button 
                            onClick={() => updateStatus(app.id, 'Confirmed')}
                            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        {app.status === 'Confirmed' && (
                          <button 
                            onClick={() => setSelectedAppointment(app)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                          >
                            <FileText size={14} /> Write Record
                          </button>
                        )}
                        {app.status === 'Completed' && (
                          <span className="text-gray-400 text-xs font-medium">Done</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Record Modal Overlay */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setSelectedAppointment(null)}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
          >
            <div className="bg-primary p-8 text-white">
              <h2 className="text-2xl font-bold">New Medical Record</h2>
              <p className="text-white/70 text-sm mt-1">Patient #{selectedAppointment.patient_id} | {selectedAppointment.department}</p>
            </div>
            
            <form onSubmit={handleCreateRecord} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Diagnosis</label>
                  <textarea 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                    rows="3" 
                    value={recordData.diagnosis} 
                    onChange={e => setRecordData({...recordData, diagnosis: e.target.value})}
                    placeholder="Enter clinical diagnosis..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Prescriptions</label>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                    rows="2" 
                    value={recordData.prescriptions} 
                    onChange={e => setRecordData({...recordData, prescriptions: e.target.value})} 
                    placeholder="Medication name, dosage, frequency..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Lab Orders</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                      rows="2" 
                      value={recordData.lab_results} 
                      onChange={e => setRecordData({...recordData, lab_results: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Allergies</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 focus:outline-none" 
                      rows="2" 
                      value={recordData.allergies} 
                      onChange={e => setRecordData({...recordData, allergies: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setSelectedAppointment(null)} 
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Save & Finalize
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
