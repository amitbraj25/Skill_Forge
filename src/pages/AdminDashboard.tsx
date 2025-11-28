import React, { useState } from 'react';
import { Shield, Users, BookOpen, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { Header, Sidebar, Card, StatCard, Button } from '../components';
import { courses, enrollments, students, instructors } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Shield,
      onClick: () => setActiveNav('dashboard'),
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      onClick: () => { setActiveNav('users'); onNavigate('admin-users'); setSidebarOpen(false); },
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: BookOpen,
      onClick: () => { setActiveNav('courses'); onNavigate('admin-courses'); setSidebarOpen(false); },
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      onClick: () => { setActiveNav('analytics'); onNavigate('admin-analytics'); setSidebarOpen(false); },
    },
  ];

  const totalEnrollments = enrollments.length;
  const activeUsers = [...new Set(enrollments.map(e => e.studentId))].length;
  const avgRating = (courses.reduce((sum, c) => sum + c.rating, 0) / courses.length).toFixed(1);

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Admin Control Panel"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Administrator"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Users}
                label="Total Users"
                value={students.length + instructors.length}
                subtitle="Active members"
              />
              <StatCard
                icon={BookOpen}
                label="Total Courses"
                value={courses.length}
                subtitle="Published content"
              />
              <StatCard
                icon={TrendingUp}
                label="Enrollments"
                value={totalEnrollments}
                subtitle="Active enrollments"
                trend="up"
              />
              <StatCard
                icon={BarChart3}
                label="Avg Rating"
                value={avgRating}
                subtitle="Platform average"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-white">Platform Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Students</p>
                    <p className="text-3xl font-bold text-accent-cyan">{students.length}</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Instructors</p>
                    <p className="text-3xl font-bold text-accent-blue">{instructors.length}</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Completion Rate</p>
                    <p className="text-3xl font-bold text-accent-emerald">68%</p>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Avg Satisfaction</p>
                    <p className="text-3xl font-bold text-orange-400">4.7/5</p>
                  </div>
                </div>
              </Card>

              <Card className="space-y-4">
                <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start">
                    <AlertCircle size={18} />
                    <span>Review Pending</span>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Users size={18} />
                    <span>Manage Users</span>
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <BarChart3 size={18} />
                    <span>View Reports</span>
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="space-y-6">
              <h2 className="text-xl font-bold text-white">Recent Courses</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Instructor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Students</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, idx) => (
                      <tr key={idx} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                        <td className="py-3 px-4 text-gray-300 max-w-xs truncate">{course.title}</td>
                        <td className="py-3 px-4 text-gray-300">{course.instructor}</td>
                        <td className="py-3 px-4 text-gray-300">{course.students}</td>
                        <td className="py-3 px-4 font-semibold text-accent-cyan">{course.rating}★</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-emerald/20 text-accent-emerald">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="space-y-6">
              <h2 className="text-xl font-bold text-white">System Health</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                  <span className="text-gray-300">Server Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-emerald/20 text-accent-emerald">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                  <span className="text-gray-300">Database</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-emerald/20 text-accent-emerald">
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                  <span className="text-gray-300">API Response Time</span>
                  <span className="text-sm text-accent-cyan">42ms</span>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
