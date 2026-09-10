import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, CheckCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface SuccessCardProps {
  title?: string;
  subtitle?: string;
  username?: string;
  categoryTitle: string;
  isConsumer?: boolean;
  onContinueToLogin: () => void;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({
  username,
  categoryTitle,
  isConsumer = false,
  onContinueToLogin,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (username) {
      navigator.clipboard.writeText(username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="bg-[#151F2B] rounded-xl border border-[#263445] p-7 sm:p-9 shadow-[0_4px_20px_rgba(0,0,0,0.35)] text-center space-y-6"
    >
      {/* Badge Icon */}
      <div className="mx-auto w-14 h-14 rounded-full bg-[#123326] border border-[#34A873]/30 flex items-center justify-center text-[#34A873]">
        {isConsumer ? (
          <Check className="w-7 h-7 text-[#34A873]" strokeWidth={2.5} />
        ) : (
          <ShieldCheck className="w-7 h-7 text-[#34A873]" strokeWidth={2.2} />
        )}
      </div>

      <div className="space-y-1.5">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#718096]">
          {categoryTitle} Registration
        </span>
        <h2 className="text-2xl font-bold text-[#F4F7FA] tracking-tight">
          {isConsumer ? 'Account Created Successfully' : 'Registration Approved'}
        </h2>
        <p className="text-sm text-[#A7B4C3] max-w-sm mx-auto">
          {isConsumer
            ? 'Your consumer account has been set up. You can now log in to verify packaged products.'
            : 'Your entity credentials have been provisioned on the Legal Metrology network.'}
        </p>
      </div>

      {/* Generated Username display for professional roles */}
      {!isConsumer && username && (
        <div className="bg-[#111A24] border border-[#263445] rounded-lg p-5 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A7B4C3]">
              Your Rule6 Shield Username
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#172A44] text-[#60A5FA] font-medium border border-[#263445]">
              Permanent Identifier
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#0B1117] border border-[#263445] px-4 py-3 rounded-md">
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#F4F7FA] tracking-wider select-all">
              {username}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md bg-[#172A44] border border-[#263445] text-[#60A5FA] hover:bg-[#1E3A5F] transition-colors cursor-pointer"
              title="Copy username"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-[#34A873]" />
                  <span className="text-[#34A873] font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#A7B4C3]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-[#718096] leading-relaxed">
            Keep this username safe. You will use it for future login.
          </p>
        </div>
      )}

      {/* For consumer, show their identifier confirmation */}
      {isConsumer && username && (
        <div className="bg-[#111A24] border border-[#263445] rounded-lg p-4 text-left">
          <span className="text-xs font-medium text-[#718096] block">Registered Identifier:</span>
          <span className="text-sm font-semibold text-[#F4F7FA]">{username}</span>
        </div>
      )}

      <div className="pt-2">
        <Button
          fullWidth
          size="lg"
          onClick={onContinueToLogin}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Login
        </Button>
      </div>
    </motion.div>
  );
};
