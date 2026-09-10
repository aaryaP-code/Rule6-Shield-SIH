import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Factory, Store, UserCheck, ArrowRight, Check } from 'lucide-react';
import { CategoryMeta, UserCategory } from '../types';

interface CategoryCardProps {
  category: CategoryMeta;
  isSelected: boolean;
  onSelect: (cat: UserCategory) => void;
  onProceed: (cat: UserCategory) => void;
}

const getCategoryIcon = (id: UserCategory, isSelected: boolean) => {
  const iconProps = {
    className: `w-5 h-5 transition-colors duration-200 ${
      isSelected ? 'text-white' : 'text-[#A7B4C3] group-hover:text-[#60A5FA]'
    }`,
    strokeWidth: 2,
  };

  switch (id) {
    case 'official':
      return <ShieldCheck {...iconProps} />;
    case 'manufacturer':
      return <Factory {...iconProps} />;
    case 'retailer':
      return <Store {...iconProps} />;
    case 'consumer':
      return <UserCheck {...iconProps} />;
  }
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
  onProceed,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(category.id)}
      className={`group relative text-left p-6 sm:p-7 rounded-xl transition-all duration-200 cursor-pointer border ${
        isSelected
          ? 'bg-[#192534] border-[#3B82F6] ring-1 ring-[#3B82F6] shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
          : 'bg-[#151F2B] border-[#263445] hover:border-[#3B82F6]/60 hover:bg-[#192534] shadow-[0_4px_16px_rgba(0,0,0,0.25)]'
      }`}
    >
      {/* Top row: Icon + subtle indicator */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-200 ${
            isSelected
              ? 'bg-[#3B82F6] text-white border-[#3B82F6] shadow-xs'
              : 'bg-[#111A24] text-[#A7B4C3] border-[#263445] group-hover:border-[#3B82F6]/40'
          }`}
        >
          {getCategoryIcon(category.id, isSelected)}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full border transition-colors ${
              isSelected
                ? 'bg-[#172A44] text-[#60A5FA] border-[#263445]'
                : 'bg-[#111A24] text-[#A7B4C3] border-[#263445] group-hover:border-[#3B82F6]/40'
            }`}
          >
            {category.badge}
          </span>
          <div
            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
              isSelected
                ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                : 'border-[#263445] bg-[#111A24] group-hover:border-[#3B82F6]'
            }`}
          >
            {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold text-[#F4F7FA] tracking-tight flex items-center justify-between">
          <span>{category.title}</span>
        </h3>
        <p className="text-sm text-[#A7B4C3] leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Role context & Action link */}
      <div className="mt-5 pt-4 border-t border-[#263445] flex items-center justify-between text-xs">
        <span className="text-[#718096] truncate max-w-[210px] font-normal">
          {category.roleDescription}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onProceed(category.id);
          }}
          className={`inline-flex items-center gap-1 font-medium transition-all cursor-pointer ${
            isSelected
              ? 'text-[#60A5FA] font-semibold'
              : 'text-[#A7B4C3] group-hover:text-[#60A5FA]'
          }`}
        >
          <span>Select</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};
