import React, { useState } from 'react';
import { Briefcase, Users, TrendingUp, DollarSign, BookOpen, PlusCircle } from 'lucide-react';
import { Header, Sidebar, Card, StatCard, Button, Rating } from '../components';
import { instructors, courses, enrollments } from '../data/mockData';

interface InstructorDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const instructor = instructors[0];
  const instructorCourses = courses.filter(c => c.instructorId === instructor.id);
  const totalEnrollments = enrollments.filter(e =>
    instructorCourses.some(c => c.id === e.courseId)
  ).length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Briefcase,
      onClick: () => setActiveNav('dashboard'),
    },
    {
      id: 'courses',
      label: 'My Courses',
      icon: BookOpen,
      onClick: () => { setActiveNav('courses'); onNavigate('instructor-courses'); setSidebarOpen(false); },
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      onClick: () => { setActiveNav('students'); onNavigate('instructor-students'); setSidebarOpen(false); },
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      onClick: () => { setActiveNav('analytics'); onNavigate('instructor-analytics'); setSidebarOpen(false); },
    },
  ];

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Instructor Dashboard"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Instructor"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={BookOpen}
                label="Active Courses"
                value={instructorCourses.length}
                subtitle="Teaching now"
              />
              <StatCard
                icon={Users}
                label="Total Students"
                value={totalEnrollments}
                subtitle="Across all courses"
                trend="up"
              />
              <StatCard
                icon={DollarSign}
                label="Revenue"
                value="$4,280"
                subtitle="This month"
                trend="up"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg Rating"
                value={instructor.rating}
                subtitle="Student feedback"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Courses</h2>
                <Button variant="primary" size="md" onClick={() => onNavigate('create-course')}>
                  <PlusCircle size={20} />
                  <span>New Course</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {instructorCourses.map((course) => {
                  const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
                  const avgCompletion = Math.round(
                    courseEnrollments.reduce((sum, e) => sum + e.progress, 0) /
                    (courseEnrollments.length || 1)
                  );

                  return (
                    <Card key={course.id} className="cursor-pointer hover:border-accent-cyan transition-all" onClick={() => onNavigate('course-management')}>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div
                          className="w-24 h-24 rounded-lg flex-shrink-0"
                          style={{ background: course.image }}
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                          <p className="text-sm text-gray-400 mb-3">{course.students} Students Enrolled</p>
                          <div className="flex items-center justify-between">
                            <Rating rating={course.rating} />
                            <div className="text-right">
                              <p className="text-xs text-gray-400">Avg Completion</p>
                              <p className="text-lg font-bold text-accent-cyan">{avgCompletion}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="space-y-6">
              <h2 className="text-xl font-bold text-white">Recent Student Activity</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Progress</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.filter(e => instructorCourses.some(c => c.id === e.courseId)).slice(0, 5).map((enrollment, idx) => {
                      const course = courses.find(c => c.id === enrollment.courseId);
                      return (
                        <tr key={idx} className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors">
                          <td className="py-3 px-4 text-gray-300">Student {enrollment.studentId.split('-')[1]}</td>
                          <td className="py-3 px-4 text-gray-300">{course?.title.slice(0, 20)}...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-20 bg-dark-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-accent-cyan to-accent-blue"
                                  style={{ width: `${enrollment.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-400">{enrollment.progress}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              enrollment.status === 'completed'
                                ? 'bg-accent-emerald/20 text-accent-emerald'
                                : enrollment.status === 'active'
                                ? 'bg-accent-cyan/20 text-accent-cyan'
                                : 'bg-gray-600/20 text-gray-300'
                            }`}>
                              {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};
