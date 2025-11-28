import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Clock, BarChart3, LineChart } from 'lucide-react';
import { Header, Sidebar, Card, StatCard } from '../components';
import { testResults, students } from '../data/mockData';

interface StudentPerformanceProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const StudentPerformance: React.FC<StudentPerformanceProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('performance');

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BookOpen,
      onClick: () => { setActiveNav('dashboard'); onNavigate('dashboard'); setSidebarOpen(false); },
    },
    {
      id: 'courses',
      label: 'My Courses',
      icon: TrendingUp,
      onClick: () => { setActiveNav('courses'); onNavigate('courses'); setSidebarOpen(false); },
    },
    {
      id: 'explore',
      label: 'Explore Courses',
      icon: Award,
      onClick: () => { setActiveNav('explore'); onNavigate('explore'); setSidebarOpen(false); },
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: Clock,
      onClick: () => setActiveNav('performance'),
    },
  ];

  const studentTests = testResults.filter(r => r.studentId === 'student-1');
  const avgScore = Math.round(studentTests.reduce((sum, t) => sum + t.score, 0) / studentTests.length);
  const passedTests = studentTests.filter(t => t.passedStatus).length;

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Performance Analytics"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Student"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={BarChart3}
                label="Average Score"
                value={`${avgScore}%`}
                subtitle="Across all tests"
                trend="up"
              />
              <StatCard
                icon={Award}
                label="Tests Passed"
                value={passedTests}
                subtitle={`of ${studentTests.length} total`}
                trend="up"
              />
              <StatCard
                icon={TrendingUp}
                label="Learning Streak"
                value="12 days"
                subtitle="Keep it up!"
                trend="up"
              />
              <StatCard
                icon={Clock}
                label="Study Time"
                value="42h"
                subtitle="This month"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="space-y-6">
                <h2 className="text-xl font-bold text-white">Score Distribution</h2>
                <div className="space-y-4">
                  {[90, 85, 78, 88, 92].map((score, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Test {idx + 1}</span>
                        <span className="font-semibold text-white">{score}%</span>
                      </div>
                      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue transition-all"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="space-y-6">
                <h2 className="text-xl font-bold text-white">Course Completion</h2>
                <div className="space-y-4">
                  {['Modern React', 'JavaScript ES6+', 'React Native', 'Flutter', 'ML Fundamentals'].map((course, idx) => {
                    const completion = [65, 40, 100, 0, 30][idx];
                    return (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{course}</span>
                          <span className="font-semibold text-white">{completion}%</span>
                        </div>
                        <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent-emerald to-green-400 transition-all"
                            style={{ width: `${completion}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            <Card className="space-y-6">
              <h2 className="text-xl font-bold text-white">Recent Test Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Test Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentTests.map((result, idx) => (
                      <tr key={idx} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                        <td className="py-3 px-4 text-gray-300">Quiz {idx + 1}</td>
                        <td className="py-3 px-4 font-semibold text-white">{result.score}%</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            result.passedStatus
                              ? 'bg-accent-emerald/20 text-accent-emerald'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {result.passedStatus ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-400">{result.completedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="space-y-6">
              <h2 className="text-xl font-bold text-white">Learning Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Most Studied Category</p>
                  <p className="text-xl font-bold text-accent-cyan">Web Development</p>
                </div>
                <div className="p-4 bg-dark-700/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-2">Best Performance</p>
                  <p className="text-xl font-bold text-accent-emerald">92%</p>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
