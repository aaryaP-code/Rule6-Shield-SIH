import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface HeaderProps {
  categoryTitle?: string;
  onLogout?: () => void;
  showLogout?: boolean;
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
  navItems?: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({
  categoryTitle,
  onLogout,
  showLogout,
  activeTab,
  onSelectTab,
  navItems,
}) => {
  return (
    <header className="w-full border-b border-[#263445] bg-[#0F1720] sticky top-0 z-40 shadow-enterprise">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <Link to="/" className="flex items-center gap-2.5 group text-left shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white shadow-xs group-hover:bg-[#2563EB] transition-colors">
            <Shield className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
          </div>
          <div>
            <span className="font-semibold text-base tracking-tight text-[#F4F7FA] block">
              Rule6 Shield
            </span>
            <p className="text-[11px] text-[#A7B4C3] leading-none hidden sm:block tracking-normal">
              Legal Metrology Compliance
            </p>
          </div>
        </Link>

        {/* Navigation Tabs (if provided) */}
        {navItems && navItems.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto py-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab?.(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#172A44] text-[#60A5FA] font-semibold border border-[#263445]'
                      : 'text-[#A7B4C3] hover:text-[#F4F7FA] hover:bg-[#192534]'
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right side metadata */}
        <div className="flex items-center gap-3 shrink-0">
          {categoryTitle && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#172A44] text-[#60A5FA] border border-[#263445]">
              {categoryTitle}
            </span>
          )}

          {showLogout && onLogout && (
            <button
              onClick={onLogout}
              className="text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] px-3 py-1.5 rounded-md hover:bg-[#192534] transition-colors border border-transparent hover:border-[#263445] cursor-pointer"
            >
              Sign out
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav row if navigation items exist */}
      {navItems && navItems.length > 0 && (
        <div className="md:hidden border-t border-[#263445] bg-[#0F1720] px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab?.(item.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#172A44] text-[#60A5FA] font-semibold border border-[#263445]'
                    : 'text-[#A7B4C3] hover:text-[#F4F7FA] hover:bg-[#192534]'
                }`}
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
