import React, { useState } from 'react';
import { Briefcase, Users, TrendingUp, DollarSign, BookOpen, Edit2, MoreVertical } from 'lucide-react';
import { Header, Sidebar, Card, Button } from '../components';
import { instructors, courses } from '../data/mockData';

interface InstructorCourseManagementProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const InstructorCourseManagement: React.FC<InstructorCourseManagementProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('courses');

  const instructor = instructors[0];
  const instructorCourses = courses.filter(c => c.instructorId === instructor.id);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Briefcase,
      onClick: () => { setActiveNav('dashboard'); onNavigate('instructor-dashboard'); setSidebarOpen(false); },
    },
    {
      id: 'courses',
      label: 'My Courses',
      icon: BookOpen,
      onClick: () => setActiveNav('courses'),
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
          title="Course Management"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Instructor"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">My Courses</h2>
              <Button variant="primary" onClick={() => onNavigate('instructor-dashboard')}>
                Create New Course
              </Button>
            </div>

            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <Card key={course.id} className="p-6 hover:border-accent-cyan transition-all">
                  <div className="flex items-center gap-6">
                    <div
                      className="w-32 h-32 rounded-lg flex-shrink-0"
                      style={{ background: course.image }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users size={16} />
                              {course.students} Students
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen size={16} />
                              {course.modules.length} Modules
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp size={16} />
                              Rating: {course.rating}★
                            </span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-dark-700 rounded-lg text-gray-400 hover:text-accent-cyan transition-colors">
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-4 pt-4 border-t border-dark-700">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Enrollment Rate</p>
                          <p className="font-bold text-accent-cyan">78%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Completion Rate</p>
                          <p className="font-bold text-accent-emerald">65%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Revenue</p>
                          <p className="font-bold text-accent-blue">${(course.students * course.price * 0.7).toFixed(0)}</p>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="secondary" size="sm">
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
