import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../services/authService';
import { UserCategory } from '../types';
import { CategoryCard } from '../components/CategoryCard';
import { Button } from '../components/Button';

export const CategorySelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>('official');

  const handleProceed = (cat: UserCategory) => {
    navigate(`/auth/${cat}`);
  };

  const handleContinueWithSelected = () => {
    if (selectedCategory) {
      navigate(`/auth/${selectedCategory}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1117] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full border-b border-[#263445] bg-[#0F1720]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white shadow-xs">
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
          </div>

          <div className="text-right">
            <span className="text-[11px] font-medium text-[#718096] tracking-wide">
              Rule 6 (PCR, 2011)
            </span>
          </div>
        </div>
      </header>

      {/* Main selection area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex-1 flex flex-col justify-center">
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2.5 mb-10 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F4F7FA]">
            Welcome to Rule6 Shield
          </h1>
          <p className="text-base sm:text-lg text-[#A7B4C3] font-normal">
            Choose how you use the platform.
          </p>
        </motion.div>

        {/* 2 x 2 Category Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {Object.values(CATEGORIES).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onSelect={(id) => setSelectedCategory(id)}
              onProceed={(id) => handleProceed(id)}
            />
          ))}
        </motion.div>

        {/* Action bar below grid */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 pt-6 border-t border-[#263445] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-xs text-[#A7B4C3] text-center sm:text-left flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>Selected category: </span>
            <strong className="text-[#F4F7FA] font-semibold">
              {selectedCategory ? CATEGORIES[selectedCategory].title : 'None'}
            </strong>
          </div>

          <Button
            size="md"
            onClick={handleContinueWithSelected}
            disabled={!selectedCategory}
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto px-6"
          >
            Continue to {selectedCategory ? CATEGORIES[selectedCategory].title : 'Portal'}
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#263445] bg-[#0F1720] py-5 px-4 text-center text-xs text-[#718096]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Rule6 Shield · Legal Metrology Verification System</span>
          <span className="text-[11px] text-[#718096]">
            Packaged Commodities Compliance
          </span>
        </div>
      </footer>
    </div>
  );
};
