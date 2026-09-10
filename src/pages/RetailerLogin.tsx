import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { CATEGORIES, authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';

export const RetailerLogin: React.FC = () => {
  const navigate = useNavigate();
  const category = CATEGORIES.retailer;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});

  useEffect(() => {
    const lastReg = authService.getLastRegistered('retailer');
    if (lastReg) {
      setUsername(lastReg);
    }
  }, []);

  const handleQuickFill = () => {
    const creds = authService.getDemoCredentials('retailer');
    if (creds) {
      setUsername(creds.identifier);
      setPassword(creds.password);
      setError(null);
      setFieldErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = 'E-Commerce retailer username is required.';
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
      const res = await authService.login('retailer', username.trim(), password);
      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || 'Authentication failed. Check your retailer username and password.');
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
      title="E-Commerce Retailer Login"
      subtitle="Access catalogue verification & merchant listing pre-screening"
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
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (fieldErrors.username) setFieldErrors({ ...fieldErrors, username: undefined });
          }}
          placeholder="e.g. RTL-29481"
          error={fieldErrors.username}
          autoComplete="username"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
          }}
          placeholder="Enter retailer password"
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
            Don't have a retail platform ID?
          </p>
          <Link
            to="/register/retailer"
            className="inline-block text-xs font-semibold text-[#172B4D] hover:text-[#2563A8] hover:underline underline-offset-4 transition-colors"
          >
            Register as E-Commerce Retailer →
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
