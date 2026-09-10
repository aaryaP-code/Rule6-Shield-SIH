import React from 'react';
import { Camera, Upload, Shield } from 'lucide-react';
import { UserCategory } from '../../types';

interface ProductInspectionCardProps {
  category: UserCategory;
  onOpenAction?: (mode: 'camera' | 'upload') => void;
}

interface RoleInspectionCopy {
  heading: string;
  description: string;
}

const ROLE_COPY: Record<UserCategory, RoleInspectionCopy> = {
  official: {
    heading: 'Start an Inspection',
    description: 'Capture or upload a packaged commodity for compliance verification.',
  },
  manufacturer: {
    heading: 'Check Your Product',
    description: 'Provide a product image to begin a pre-market compliance check.',
  },
  retailer: {
    heading: 'Verify a Product',
    description: 'Provide a product image to verify mandatory declarations.',
  },
  consumer: {
    heading: 'Check a Product',
    description: 'Provide a product image to understand mandatory legal declarations.',
  },
};

export const ProductInspectionCard: React.FC<ProductInspectionCardProps> = ({
  category,
  onOpenAction,
}) => {
  const roleCopy = ROLE_COPY[category] || {
    heading: 'Inspect a Product',
    description: 'Choose how you want to provide the product',
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-[#151F2B] border border-[#263445] rounded-xl p-7 sm:p-9 shadow-enterprise">
      {/* Header section */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#172A44] text-[#60A5FA] text-xs font-semibold border border-[#263445] mx-auto">
          <Shield className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span>Rule 6 (PCR, 2011) Inspection</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F4F7FA]">
          {roleCopy.heading}
        </h2>
        <p className="text-sm sm:text-base text-[#A7B4C3] leading-relaxed max-w-md mx-auto">
          {roleCopy.description}
        </p>
      </div>

      {/* Sub-label */}
      <div className="text-center mb-5">
        <span className="text-xs font-medium text-[#718096] uppercase tracking-wider">
          Choose how you want to provide the product
        </span>
      </div>

      {/* Two Options inside the single medium card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option 1: Use Camera */}
        <button
          type="button"
          aria-label="Use Camera"
          onClick={() => onOpenAction?.('camera')}
          className="group bg-[#111A24] hover:bg-[#192534] border border-[#263445] hover:border-[#3B82F6] rounded-lg p-6 text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-lg bg-[#172A44] border border-[#263445] group-hover:border-[#3B82F6] flex items-center justify-center text-[#60A5FA] mb-3 transition-colors">
            <Camera className="w-6 h-6 text-[#3B82F6] group-hover:text-[#60A5FA]" strokeWidth={2} />
          </div>
          <span className="font-semibold text-base text-[#F4F7FA] block tracking-tight group-hover:text-[#60A5FA] transition-colors">
            Use Camera
          </span>
          <span className="text-xs text-[#718096] mt-1 block">
            Product & barcode capture
          </span>
        </button>

        {/* Option 2: Upload Images */}
        <button
          type="button"
          aria-label="Upload Images"
          onClick={() => onOpenAction?.('upload')}
          className="group bg-[#111A24] hover:bg-[#192534] border border-[#263445] hover:border-[#3B82F6] rounded-lg p-6 text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
        >
          <div className="w-12 h-12 rounded-lg bg-[#172A44] border border-[#263445] group-hover:border-[#3B82F6] flex items-center justify-center text-[#60A5FA] mb-3 transition-colors">
            <Upload className="w-6 h-6 text-[#3B82F6] group-hover:text-[#60A5FA]" strokeWidth={2} />
          </div>
          <span className="font-semibold text-base text-[#F4F7FA] block tracking-tight group-hover:text-[#60A5FA] transition-colors">
            Upload Images
          </span>
          <span className="text-xs text-[#718096] mt-1 block">
            Package labels & files
          </span>
        </button>
      </div>

      {/* Subtle footer micro-copy */}
      <div className="mt-6 pt-5 border-t border-[#263445] text-center">
        <p className="text-[11px] text-[#718096]">
          Packaged commodity verification under Legal Metrology (Packaged Commodities) Rules, 2011
        </p>
      </div>
    </div>
  );
};
