import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Search, Bell, Settings, SearchIcon } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import NotificationBell from '../NotificationBell';

const TopNavbar = ({ onOpenSidebar }) => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 lg:px-10">
      <div className="h-full flex items-center justify-between">
        {/* Mobile Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={onOpenSidebar}
            className="p-2 text-gray-500 lg:hidden hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden sm:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-2xl w-full max-w-md group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={18} className="text-gray-400 group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder={t('dashboard.searchPlaceholder') || "Search health records, doctors..."}
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          
          <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
          
          <NotificationBell />
          
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all relative group">
            <Settings size={20} className="group-hover:rotate-45 transition-transform" />
          </button>

          <div className="hidden lg:flex items-center gap-3 ml-2 border-l pl-6 border-gray-100">
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">System Status</p>
              <div className="flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-gray-900 uppercase">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
