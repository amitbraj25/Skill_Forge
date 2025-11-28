import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components';
import { validateCredentials, validateEmail } from '../data/credentials';

interface LoginPageProps {
  onLoginSuccess: (role: 'student' | 'instructor' | 'admin') => void;
  onNavigateRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setIsLoading(false);
        return;
      }

      const user = validateCredentials(email, password);

      if (user) {
        onLoginSuccess(user.role);
      } else {
        setError('Invalid email or password. Please try again.');
        setPassword('');
      }

      setIsLoading(false);
    }, 600);
  };

  const fillDemoCredentials = (role: 'student' | 'instructor' | 'admin') => {
    const credentials = {
      student: { email: 'student@skill4edge.com', password: 'Student123' },
      instructor: { email: 'instructor@skill4edge.com', password: 'Instructor123' },
      admin: { email: 'admin@skill4edge.com', password: 'Admin123' },
    };

    const creds = credentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setError('');
  };

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
            <p className="text-sm text-gray-500">Sign in to your account</p>
          </div>

          <div className="card-dark space-y-6 mb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-glow-cyan transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-glow-cyan transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent-cyan transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-fade-in">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-full justify-center disabled:opacity-50"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="border-t border-dark-700 pt-6 space-y-3">
              <p className="text-sm text-gray-400 text-center">Demo Credentials</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => fillDemoCredentials('student')}
                  className="p-3 bg-dark-700 border border-dark-600 rounded-lg hover:border-accent-cyan hover:bg-dark-600 transition-all text-center"
                >
                  <p className="text-xs font-semibold text-gray-300 mb-1">Student</p>
                  <p className="text-xs text-gray-500">Demo</p>
                </button>
                <button
                  onClick={() => fillDemoCredentials('instructor')}
                  className="p-3 bg-dark-700 border border-dark-600 rounded-lg hover:border-accent-cyan hover:bg-dark-600 transition-all text-center"
                >
                  <p className="text-xs font-semibold text-gray-300 mb-1">Instructor</p>
                  <p className="text-xs text-gray-500">Demo</p>
                </button>
                <button
                  onClick={() => fillDemoCredentials('admin')}
                  className="p-3 bg-dark-700 border border-dark-600 rounded-lg hover:border-accent-cyan hover:bg-dark-600 transition-all text-center"
                >
                  <p className="text-xs font-semibold text-gray-300 mb-1">Admin</p>
                  <p className="text-xs text-gray-500">Demo</p>
                </button>
              </div>
            </div>

            {/* <div className="bg-dark-700/50 p-4 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-gray-400 flex items-center gap-2">
                <CheckCircle size={16} className="text-accent-emerald" />
                Quick Access
              </p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>Student: student@skill4edge.com / Student123</p>
                <p>Instructor: instructor@skill4edge.com / Instructor123</p>
                <p>Admin: admin@skill4edge.com / Admin123</p>
              </div>
            </div> */}
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">
              Don't have an account?{' '}
              <button
                onClick={onNavigateRegister}
                className="text-accent-cyan hover:text-accent-blue transition-colors font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
