import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryMeta } from '../types';

interface AuthLayoutProps {
  category: CategoryMeta;
  title: string;
  subtitle?: string;
  isRegister?: boolean;
  onToggleAuthMode?: () => void;
  onQuickFillDemo?: () => void;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  category,
  title,
  subtitle,
  isRegister = false,
  onQuickFillDemo,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#0B1117] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top navigation row */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#A7B4C3] hover:text-[#F4F7FA] px-3 py-1.5 rounded-lg hover:bg-[#192534] border border-transparent hover:border-[#263445] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change category</span>
        </Link>

        {onQuickFillDemo && !isRegister && (
          <button
            type="button"
            onClick={onQuickFillDemo}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#A7B4C3] hover:text-[#F4F7FA] bg-[#151F2B] border border-[#263445] hover:border-[#3B82F6] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            title="Auto-fill verified demo credentials for testing"
          >
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            <span>Fill Demo Credentials</span>
          </button>
        )}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="max-w-md w-full mx-auto my-6"
      >
        {/* Card Header & Brand */}
        <div className="text-center mb-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#172A44] border border-[#263445] text-xs text-[#60A5FA] font-medium mb-1">
            <Shield className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Rule6 Shield · {category.title}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#F4F7FA]">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-[#A7B4C3]">{subtitle}</p>
          ) : (
            <p className="text-xs text-[#A7B4C3]">{category.description}</p>
          )}
        </div>

        {/* Card Container */}
        <div className="bg-[#151F2B] border border-[#263445] rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          {children}
        </div>

        {/* Bottom micro-copy */}
        <div className="mt-6 text-center text-[11px] text-[#718096] leading-relaxed">
          Rule6 Shield · Legal Metrology (Packaged Commodities) Rules, 2011
        </div>
      </motion.div>

      {/* Empty bottom spacer for balance */}
      <div className="max-w-md w-full mx-auto" />
    </div>
  );
};
