import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, AlertCircle } from 'lucide-react';
import { CATEGORIES, authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { SuccessCard } from '../components/SuccessCard';

export const ConsumerRegister: React.FC = () => {
  const navigate = useNavigate();
  const category = CATEGORIES.consumer;

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [registeredIdentifier, setRegisteredIdentifier] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!formData.emailOrPhone.trim()) {
      errors.emailOrPhone = 'Email or phone number is required.';
    } else {
      const isEmail = formData.emailOrPhone.includes('@');
      const isPhone = /^\d{10}$/.test(formData.emailOrPhone.replace(/\D/g, ''));
      if (!isEmail && !isPhone) {
        errors.emailOrPhone = 'Please enter a valid email address or 10-digit phone number.';
      }
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await authService.registerConsumer(formData);
      if (res.success && res.username) {
        // Consumer does NOT receive a generated username; they register with their email/phone
        setRegisteredIdentifier(res.username);
      } else {
        setGeneralError(res.message || 'Registration failed.');
      }
    } catch {
      setGeneralError('Registration failed due to a network or server issue.');
    } finally {
      setIsLoading(false);
    }
  };

  if (registeredIdentifier) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full mx-auto">
          <SuccessCard
            username={registeredIdentifier}
            categoryTitle={category.title}
            isConsumer={true}
            onContinueToLogin={() => navigate('/auth/consumer')}
          />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      category={category}
      title="Create Consumer Account"
      subtitle="Sign up to verify package labels, MRP accuracy & mandatory declarations"
      isRegister
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {generalError && (
          <div className="p-3 rounded-lg bg-[#FDECEC] border border-[#F8D7D7] flex items-start gap-2.5 text-xs text-[#C94B4B]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#C94B4B]" />
            <span className="leading-relaxed">{generalError}</span>
          </div>
        )}

        <InputField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. Deepak Sharma"
          error={fieldErrors.name}
        />

        <InputField
          label="Email or Phone Number"
          value={formData.emailOrPhone}
          onChange={(e) => handleChange('emailOrPhone', e.target.value)}
          placeholder="e.g. deepak@example.com or 9840123456"
          error={fieldErrors.emailOrPhone}
        />

        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Create password (min. 6 characters)"
          error={fieldErrors.password}
        />

        <PasswordInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="Confirm password"
          error={fieldErrors.confirmPassword}
        />

        <div className="pt-2">
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            icon={<UserCheck className="w-4 h-4" />}
          >
            Create Account
          </Button>
        </div>

        <div className="pt-4 border-t border-[#DCE3EB] text-center space-y-2">
          <p className="text-xs text-[#5B6B82]">
            Already have a consumer account?
          </p>
          <Link
            to="/auth/consumer"
            className="inline-block text-xs font-semibold text-[#172B4D] hover:text-[#2563A8] hover:underline underline-offset-4 transition-colors"
          >
            ← Back to Consumer Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
