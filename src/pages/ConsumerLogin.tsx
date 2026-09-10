import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { CATEGORIES, authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';

export const ConsumerLogin: React.FC = () => {
  const navigate = useNavigate();
  const category = CATEGORIES.consumer;

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; password?: string }>({});

  useEffect(() => {
    const lastReg = authService.getLastRegistered('consumer');
    if (lastReg) {
      setEmailOrPhone(lastReg);
    }
  }, []);

  const handleQuickFill = () => {
    const creds = authService.getDemoCredentials('consumer');
    if (creds) {
      setEmailOrPhone(creds.identifier);
      setPassword(creds.password);
      setError(null);
      setFieldErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errors: { identifier?: string; password?: string } = {};

    if (!emailOrPhone.trim()) {
      errors.identifier = 'Email or phone number is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);

    try {
      const res = await authService.login('consumer', emailOrPhone.trim(), password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || 'Authentication failed. Please check your login details.');
      }
    } catch {
      setError('An unexpected system error occurred. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      category={category}
      title="Consumer Login"
      subtitle="Verify packaged products and understand consumer rights under Rule 6"
      onQuickFillDemo={handleQuickFill}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-[#FDECEC] border border-[#F8D7D7] flex items-start gap-2.5 text-xs text-[#C94B4B]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C94B4B]" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <InputField
          label="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) => {
            setEmailOrPhone(e.target.value);
            if (fieldErrors.identifier) setFieldErrors({ ...fieldErrors, identifier: undefined });
          }}
          placeholder="e.g. consumer@example.com or 9840123456"
          error={fieldErrors.identifier}
          autoComplete="username"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
          }}
          placeholder="Enter your password"
          error={fieldErrors.password}
          autoComplete="current-password"
        />

        <div className="pt-2">
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            icon={<LogIn className="w-4 h-4" />}
          >
            Login
          </Button>
        </div>

        <div className="pt-4 border-t border-[#DCE3EB] text-center space-y-2">
          <p className="text-xs text-[#5B6B82]">
            New to Rule6 Shield?
          </p>
          <Link
            to="/register/consumer"
            className="inline-block text-xs font-semibold text-[#172B4D] hover:text-[#2563A8] hover:underline underline-offset-4 transition-colors"
          >
            Create Consumer Account →
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
