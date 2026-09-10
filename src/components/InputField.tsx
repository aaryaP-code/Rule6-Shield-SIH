import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  requiredIndicator?: boolean;
  leftIcon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  requiredIndicator = true,
  leftIcon,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <label htmlFor={inputId} className="font-medium text-[#F4F7FA] flex items-center gap-1">
          {label}
          {requiredIndicator && <span className="text-[#718096]">*</span>}
        </label>
      </div>

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#718096]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-[#111A24] text-[#F4F7FA] placeholder-[#718096] text-sm rounded-lg border ${
            error
              ? 'border-[#E05A5A] focus:border-[#E05A5A] focus:ring-1 focus:ring-[#E05A5A]'
              : 'border-[#263445] hover:border-[#3B82F6]/50 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]'
          } ${leftIcon ? 'pl-9' : 'pl-3.5'} pr-3.5 py-2.5 transition-colors focus:outline-hidden ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-[#E05A5A] font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#A7B4C3]">{helperText}</p>
      ) : null}
    </div>
  );
};
