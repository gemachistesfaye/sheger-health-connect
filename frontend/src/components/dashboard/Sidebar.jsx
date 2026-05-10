import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Users, 
  MessageSquare, 
  Bell, 
  CreditCard, 
  Settings, 
  LogOut,
  Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, to, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
        ${isActive 
          ? 'bg-primary text-white shadow-lg shadow-primary/30' 
          : 'text-gray-500 hover:bg-primary/10 hover:text-primary'}
      `}
    >
      {({ isActive }) => (
        <>
          <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'} />
          <span className="font-medium">{label}</span>
          {isActive && (
            <motion.div
              layoutId="active-indicator"
              className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard.menu.overview'), to: '/patient/dashboard' },
    { icon: Calendar, label: t('dashboard.menu.appointments'), to: '/patient/appointments' },
    { icon: FileText, label: t('dashboard.menu.records'), to: '/patient/records' },
    { icon: Users, label: t('dashboard.menu.doctors'), to: '/patient/doctors' },
    { icon: MessageSquare, label: t('dashboard.menu.aiAssistant'), to: '/patient/ai' },
    { icon: Bell, label: t('dashboard.menu.notifications'), to: '/patient/notifications' },
    { icon: CreditCard, label: t('dashboard.menu.billing'), to: '/patient/billing' },
    { icon: Settings, label: t('dashboard.menu.settings'), to: '/patient/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-100 
        transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 text-white">
              <Activity size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">Sheger Health</span>
          </div>

          {/* User Profile Info */}
          <div className="mb-8 px-2 py-4 bg-gray-50 rounded-2xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border-2 border-white">
              {user?.full_name?.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm">{user?.full_name}</span>
              <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to}
                {...item}
                onClick={() => window.innerWidth < 1024 && onClose()}
              />
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">{t('auth.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
