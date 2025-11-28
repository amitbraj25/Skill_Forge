import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Clock } from 'lucide-react';
import { Header, Sidebar, Card, StatCard, ProgressBar, Rating, Button } from '../components';
import { enrollments, courses, students } from '../data/mockData';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  const studentEnrollments = enrollments.filter(e => e.studentId === 'student-1');
  const enrolledCourses = courses.filter(c => studentEnrollments.some(e => e.courseId === c.id));

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BookOpen,
      onClick: () => setActiveNav('dashboard'),
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
      onClick: () => { setActiveNav('performance'); onNavigate('performance'); setSidebarOpen(false); },
    },
  ];

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Student"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={BookOpen}
                label="Enrolled Courses"
                value={enrolledCourses.length}
                subtitle="Currently learning"
              />
              <StatCard
                icon={Award}
                label="Completed"
                value={studentEnrollments.filter(e => e.status === 'completed').length}
                subtitle="Courses finished"
                trend="up"
              />
              <StatCard
                icon={TrendingUp}
                label="Average Score"
                value="87%"
                subtitle="Performance metric"
                trend="up"
              />
              <StatCard
                icon={Clock}
                label="Learning Hours"
                value="142"
                subtitle="Total invested time"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Continuing Learning</h2>
              <div className="space-y-4">
                {studentEnrollments.filter(e => e.status === 'active').map((enrollment) => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  if (!course) return null;

                  return (
                    <Card key={enrollment.id} className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div
                          className="w-24 h-24 rounded-lg flex-shrink-0"
                          style={{ background: course.image }}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-bold text-white">{course.title}</h3>
                              <p className="text-sm text-gray-400">by {course.instructor}</p>
                            </div>
                            <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-xs font-semibold rounded-full">
                              {enrollment.progress}% Done
                            </span>
                          </div>
                          <ProgressBar progress={enrollment.progress} showLabel={false} />
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-700">
                            <Rating rating={course.rating} />
                            <Button variant="secondary" size="sm" onClick={() => onNavigate('course-player')}>
                              Continue Learning
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Recommended for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(4, 7).map((course) => (
                  <Card key={course.id} interactive className="overflow-hidden cursor-pointer" onClick={() => onNavigate('course-detail')}>
                    <div
                      className="h-32 rounded-lg mb-4"
                      style={{ background: course.image }}
                    />
                    <h3 className="font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                      <Rating rating={course.rating} />
                      <span className="text-accent-cyan font-semibold">${course.price}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
