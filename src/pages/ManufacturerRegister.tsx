import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Factory, AlertCircle } from 'lucide-react';
import { CATEGORIES, authService } from '../services/authService';
import { AuthLayout } from '../components/AuthLayout';
import { InputField } from '../components/InputField';
import { PasswordInput } from '../components/PasswordInput';
import { Button } from '../components/Button';
import { SuccessCard } from '../components/SuccessCard';

export const ManufacturerRegister: React.FC = () => {
  const navigate = useNavigate();
  const category = CATEGORIES.manufacturer;

  const [formData, setFormData] = useState({
    companyName: '',
    authorizedPerson: '',
    businessEmail: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [registeredUsername, setRegisteredUsername] = useState<string | null>(null);

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

    if (!formData.companyName.trim()) {
      errors.companyName = 'Company / Manufacturer Name is required.';
    }
    if (!formData.authorizedPerson.trim()) {
      errors.authorizedPerson = 'Authorized Person is required.';
    }
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Business Email is required.';
    } else if (!formData.businessEmail.includes('@') || !formData.businessEmail.includes('.')) {
      errors.businessEmail = 'Please enter a valid business email address.';
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number.';
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
      const res = await authService.registerManufacturer(formData);
      if (res.success && res.username) {
        setRegisteredUsername(res.username);
      } else {
        setGeneralError(res.message || 'Registration failed.');
      }
    } catch {
      setGeneralError('Registration failed due to a network or server issue.');
    } finally {
      setIsLoading(false);
    }
  };

  if (registeredUsername) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex flex-col justify-center py-12 px-4 sm:px-6">
        <div className="max-w-md w-full mx-auto">
          <SuccessCard
            username={registeredUsername}
            categoryTitle={category.title}
            onContinueToLogin={() => navigate('/auth/manufacturer')}
          />
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      category={category}
      title="Register as Manufacturer"
      subtitle="Register packaging facilities & brand ownership profiles"
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
          label="Company / Manufacturer Name"
          value={formData.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          placeholder="e.g. Apex Consumer Products Ltd."
          error={fieldErrors.companyName}
        />

        <InputField
          label="Authorized Person"
          value={formData.authorizedPerson}
          onChange={(e) => handleChange('authorizedPerson', e.target.value)}
          placeholder="e.g. Priya Sundaram (Quality Head)"
          error={fieldErrors.authorizedPerson}
        />

        <InputField
          label="Business Email"
          type="email"
          value={formData.businessEmail}
          onChange={(e) => handleChange('businessEmail', e.target.value)}
          placeholder="e.g. compliance@apexfmcg.com"
          error={fieldErrors.businessEmail}
        />

        <InputField
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          placeholder="e.g. 9820123456"
          error={fieldErrors.phoneNumber}
        />

        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Create account password"
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
            icon={<Factory className="w-4 h-4" />}
          >
            Register Manufacturing Unit
          </Button>
        </div>

        <div className="pt-4 border-t border-[#DCE3EB] text-center space-y-2">
          <p className="text-xs text-[#5B6B82]">
            Already have a manufacturer username?
          </p>
          <Link
            to="/auth/manufacturer"
            className="inline-block text-xs font-semibold text-[#172B4D] hover:text-[#2563A8] hover:underline underline-offset-4 transition-colors"
          >
            ← Back to Manufacturer Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
