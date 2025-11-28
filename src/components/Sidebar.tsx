import React from 'react';
import { LucideIcon } from 'lucide-react';
import { BookOpen, BarChart3, Users, Settings, LogOut } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface SidebarProps {
  isOpen: boolean;
  navItems: NavItem[];
  activeId: string;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  navItems,
  activeId,
  onLogout,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => {}}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-dark-800 border-r border-dark-700 p-6 transform transition-transform duration-300 z-40 lg:relative lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-8 h-8 text-accent-cyan" />
            <h2 className="text-2xl font-bold gradient-text">Skill4Edge</h2>
          </div>
          <p className="text-xs text-gray-400">Learning beyond the edge</p>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeId === item.id
                  ? 'bg-dark-700 text-accent-cyan shadow-glow-cyan'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-dark-700'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        )}
      </aside>
    </>
  );
};
