import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopNavbar from '../components/dashboard/TopNavbar';
import AIAssistant from '../components/AIAssistant';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:ml-72 flex flex-col min-h-screen">
        <TopNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <AIAssistant />
      </div>
    </div>
  );
};

export default DashboardLayout;
