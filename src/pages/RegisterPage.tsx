import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components';
import { validateEmail, validatePassword, validCredentials } from '../data/credentials';

interface RegisterPageProps {
  onRegisterSuccess: (role: 'student' | 'instructor' | 'admin') => void;
  onNavigateLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'instructor' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (validCredentials.some((c) => c.email === formData.email)) {
      newErrors.email = 'This email is already registered';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        onRegisterSuccess(formData.role);
      }, 1500);
    }, 600);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-dark overflow-hidden flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-emerald/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="card-dark text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-accent-emerald/20 flex items-center justify-center mx-auto">
              <CheckCircle size={48} className="text-accent-emerald" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Account Created!</h2>
              <p className="text-gray-400">
                Your {formData.role} account has been successfully registered. Redirecting to dashboard...
              </p>
            </div>
            <div className="pt-4 border-t border-dark-700">
              <p className="text-sm text-gray-500">Welcome to Skill4Edge!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-accent-cyan" />
              <h1 className="text-4xl font-bold gradient-text">Skill4Edge</h1>
            </div>
            <p className="text-gray-400 mb-1">Learning Beyond the Edge</p>
            <p className="text-sm text-gray-500">Create your account</p>
          </div>

          <div className="card-dark space-y-6 mb-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500 focus:shadow-glow-cyan'
                      : 'border-dark-600 focus:border-accent-cyan focus:shadow-glow-cyan'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500 focus:shadow-glow-cyan'
                      : 'border-dark-600 focus:border-accent-cyan focus:shadow-glow-cyan'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 focus:outline-none focus:border-accent-cyan focus:shadow-glow-cyan transition-all"
                >
                  <option value="student">Student - Learn new skills</option>
                  <option value="instructor">Instructor - Create courses</option>
                  <option value="admin">Administrator - Manage platform</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all ${
                      errors.password
                        ? 'border-red-500/50 focus:border-red-500 focus:shadow-glow-cyan'
                        : 'border-dark-600 focus:border-accent-cyan focus:shadow-glow-cyan'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none transition-all ${
                      errors.confirmPassword
                        ? 'border-red-500/50 focus:border-red-500 focus:shadow-glow-cyan'
                        : 'border-dark-600 focus:border-accent-cyan focus:shadow-glow-cyan'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-cyan transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full justify-center disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="border-t border-dark-700 pt-6">
              <p className="text-gray-400 text-sm text-center">
                Already have an account?{' '}
                <button
                  onClick={onNavigateLogin}
                  className="text-accent-cyan hover:text-accent-blue transition-colors font-semibold"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
