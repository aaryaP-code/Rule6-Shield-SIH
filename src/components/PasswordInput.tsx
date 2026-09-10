import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  requiredIndicator?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  helperText,
  requiredIndicator = true,
  id,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `password-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <label htmlFor={inputId} className="font-medium text-[#F4F7FA] flex items-center gap-1">
          {label}
          {requiredIndicator && <span className="text-[#718096]">*</span>}
        </label>
      </div>

      <div className="relative">
        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          className={`w-full bg-[#111A24] text-[#F4F7FA] placeholder-[#718096] text-sm rounded-lg border ${
            error
              ? 'border-[#E05A5A] focus:border-[#E05A5A] focus:ring-1 focus:ring-[#E05A5A]'
              : 'border-[#263445] hover:border-[#3B82F6]/50 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]'
          } pl-3.5 pr-10 py-2.5 transition-colors focus:outline-hidden ${className}`}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#718096] hover:text-[#F4F7FA] transition-colors focus:outline-hidden cursor-pointer"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {error ? (
        <p className="text-xs text-[#E05A5A] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#A7B4C3]">{helperText}</p>
      ) : null}
    </div>
  );
};
