import React from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  title: string;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  userRole?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  sidebarOpen = false,
  onToggleSidebar,
  userRole = 'Student',
  onLogout,
}) => {
  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button onClick={onToggleSidebar} className="lg:hidden text-gray-300 hover:text-accent-cyan">
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <h1 className="text-2xl font-bold gradient-text">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <span className="px-3 py-1.5 bg-dark-700 rounded-full text-sm text-gray-300">
              {userRole}
            </span>
          </div>
          <button className="p-2 hover:bg-dark-700 rounded-lg text-gray-300 hover:text-accent-cyan transition-colors">
            <Settings size={20} />
          </button>
          {onLogout && (
            <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-400 hover:text-red-300">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
