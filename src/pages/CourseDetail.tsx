import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Clock, Users, BarChart3, CheckCircle, PlayCircle } from 'lucide-react';
import { Header, Sidebar, Card, Button, Rating } from '../components';
import { courses } from '../data/mockData';

interface CourseDetailProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('explore');

  const course = courses[0];

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
      onClick: () => setActiveNav('explore'),
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: Clock,
      onClick: () => { setActiveNav('performance'); onNavigate('performance'); setSidebarOpen(false); },
    },
  ];

  const benefits = [
    'Industry-recognized certification upon completion',
    'Hands-on projects and real-world assignments',
    'Lifetime access to course materials',
    'One-on-one mentor support',
    'Career guidance and job placement assistance',
  ];

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Course Details"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Student"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8 page-transition">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden">
                  <div
                    className="h-96 rounded-lg flex items-center justify-center"
                    style={{ background: course.image }}
                  />
                </Card>

                <Card className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                    <p className="text-gray-300 text-lg mb-6">{course.description}</p>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-3">
                        <Users className="text-accent-cyan" size={24} />
                        <div>
                          <p className="text-gray-400 text-sm">Students Enrolled</p>
                          <p className="text-white font-bold text-lg">{course.students}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="text-accent-cyan" size={24} />
                        <div>
                          <p className="text-gray-400 text-sm">Course Duration</p>
                          <p className="text-white font-bold text-lg">{course.duration} hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BarChart3 className="text-accent-cyan" size={24} />
                        <div>
                          <p className="text-gray-400 text-sm">Level</p>
                          <p className="text-white font-bold text-lg">{course.level}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-8">
                      <Rating rating={course.rating} count={course.students} />
                    </div>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">About This Course</h2>
                    <p className="text-gray-300 leading-relaxed">
                      This comprehensive course is designed to teach you everything you need to know about {course.title}.
                      Whether you're a complete beginner or looking to advance your skills, this course has something for everyone.
                      Learn from industry experts and build real projects that showcase your skills to potential employers.
                    </p>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Core concepts and fundamentals',
                        'Advanced techniques and best practices',
                        'Real-world project development',
                        'Industry tools and frameworks',
                        'Performance optimization',
                        'Career advancement strategies',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-accent-emerald flex-shrink-0 mt-1" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Course Curriculum</h2>
                    <div className="space-y-4">
                      {course.modules.map((module, idx) => (
                        <div key={idx} className="border border-dark-700 rounded-lg p-4 hover:border-accent-cyan transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold">
                              {idx + 1}
                            </div>
                            <h3 className="font-bold text-white">{module.title}</h3>
                          </div>
                          <p className="text-sm text-gray-400">{module.lessons.length} lessons • {module.lessons.reduce((sum, l) => sum + l.duration, 0)} minutes</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Why Take This Course?</h2>
                    <ul className="space-y-3">
                      {benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Instructor</h2>
                    <Card className="bg-dark-700 p-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen size={32} className="text-accent-cyan" />
                      </div>
                      <div>
                        <p className="font-bold text-white">{course.instructor}</p>
                        <p className="text-sm text-gray-400">Expert Instructor • {course.students} students</p>
                      </div>
                    </Card>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-6 space-y-6">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">Course Price</p>
                    <p className="text-5xl font-bold gradient-text">${course.price}</p>
                  </div>

                  <Button variant="primary" className="w-full justify-center text-lg" onClick={() => onNavigate('course-player')}>
                    <PlayCircle size={24} />
                    <span>Enroll Now</span>
                  </Button>

                  <Button variant="secondary" className="w-full justify-center">
                    Add to Wishlist
                  </Button>

                  <div className="border-t border-dark-700 pt-6 space-y-4">
                    <h3 className="font-bold text-white">Course Includes:</h3>
                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-3">
                        <PlayCircle size={18} className="text-accent-cyan" />
                        <span>{course.modules.reduce((sum, m) => sum + m.lessons.length, 0)} Video Lessons</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen size={18} className="text-accent-cyan" />
                        <span>Downloadable Resources</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award size={18} className="text-accent-cyan" />
                        <span>Certificate of Completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-accent-cyan" />
                        <span>Lifetime Access</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-dark-700 pt-6">
                    <p className="text-xs text-gray-500 text-center">
                      30-day money-back guarantee. No questions asked!
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
