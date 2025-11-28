import React from 'react';
import { Users, Briefcase, Shield, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '../components';

interface LandingPageProps {
  onSelectRole: (role: 'student' | 'instructor' | 'admin') => void;
  onNavigateLogin?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole, onNavigateLogin }) => {
  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Explore courses, track your learning progress, and master new skills',
      icon: Users,
      color: 'from-accent-blue',
    },
    {
      id: 'instructor',
      title: 'Instructor',
      description: 'Create and manage courses, monitor student progress, and grow your impact',
      icon: Briefcase,
      color: 'from-accent-cyan',
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage the platform, monitor analytics, and ensure quality content',
      icon: Shield,
      color: 'from-accent-emerald',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-12 h-12 text-accent-cyan" />
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Skill4Edge</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2">Learning Beyond the Edge</p>
          <p className="text-gray-400">Revolutionizing digital education with cutting-edge learning experiences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => onSelectRole(role.id as 'student' | 'instructor' | 'admin')}
                  className="w-full h-full card-interactive group p-8 text-left flex flex-col"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${role.color} to-accent-cyan opacity-10 flex items-center justify-center mb-6 group-hover:opacity-20 transition-opacity`}>
                    <Icon className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{role.title}</h3>
                  <p className="text-gray-400 mb-6 flex-1">{role.description}</p>
                  <div className="flex items-center text-accent-cyan group-hover:gap-3 transition-all">
                    <span>Get Started</span>
                    <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-500 text-sm">Select your role to access the platform • All features are pre-configured with sample data</p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent to-dark-700 flex-1" />
            <p className="text-gray-600 text-xs">or</p>
            <div className="h-px bg-gradient-to-l from-transparent to-dark-700 flex-1" />
          </div>
          <p className="text-gray-400 text-sm">
            Already have credentials?{' '}
            <button
              onClick={onNavigateLogin}
              className="text-accent-cyan hover:text-accent-blue transition-colors font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
