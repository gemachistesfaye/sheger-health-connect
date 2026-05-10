import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  User, 
  Bell, 
  Settings,
  FileText
} from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import AIAssistant from '../components/AIAssistant';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const mobileLinks = [
    { icon: LayoutDashboard, to: `/${user?.role?.toLowerCase()}/dashboard` },
    { icon: Calendar, to: `/${user?.role?.toLowerCase()}/appointments` },
    { icon: MessageSquare, to: `/${user?.role?.toLowerCase()}/messages` },
    { icon: FileText, to: `/${user?.role?.toLowerCase()}/records` },
    { icon: User, to: `/${user?.role?.toLowerCase()}/settings` },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:ml-72 flex flex-col flex-1 pb-20 lg:pb-0">
        <TopNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <AIAssistant />
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-4 lg:hidden flex justify-around items-center rounded-t-[32px] shadow-2xl">
         {mobileLinks.map((link, idx) => (
           <NavLink 
             key={idx} 
             to={link.to}
             className={({ isActive }) => `
               p-3 rounded-2xl transition-all duration-300
               ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-110' : 'text-gray-400'}
             `}
           >
             <link.icon size={22} />
           </NavLink>
         ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
