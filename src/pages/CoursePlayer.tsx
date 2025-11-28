import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Clock, ChevronDown, ChevronUp, Play, CheckCircle } from 'lucide-react';
import { Header, Sidebar, Card, Button, ProgressBar } from '../components';
import { courses } from '../data/mockData';

interface CoursePlayerProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('courses');
  const [expandedModule, setExpandedModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const course = courses[0];
  const currentModule = course.modules[expandedModule];
  const currentLessonData = currentModule?.lessons[currentLesson];

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
      onClick: () => setActiveNav('courses'),
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
          title={course.title}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Student"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6 page-transition">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <Card className="overflow-hidden">
                  <div className="relative bg-gradient-to-br from-dark-800 to-dark-900 aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 bg-dark-900/50 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-accent-cyan/20 flex items-center justify-center hover:bg-accent-cyan/40 transition-all cursor-pointer group">
                        <Play size={40} className="text-accent-cyan group-hover:scale-110 transition-transform" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 left-0 h-1 bg-dark-700">
                      <div className="h-full w-1/3 bg-gradient-to-r from-accent-cyan to-accent-blue" />
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{currentLessonData?.title}</h2>
                      <p className="text-gray-400">Module: {currentModule?.title}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock size={18} />
                        {currentLessonData?.duration} minutes
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Lesson Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentLessonData?.resources.map((resource, idx) => (
                      <button
                        key={idx}
                        className="p-4 bg-dark-700 border border-dark-600 rounded-lg hover:border-accent-cyan hover:bg-dark-600 transition-all text-left"
                      >
                        <p className="text-sm text-gray-300">{resource}</p>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Your Notes</h3>
                    <Button variant="secondary" size="sm">Add Note</Button>
                  </div>
                  <div className="p-4 bg-dark-700/50 rounded-lg text-center text-gray-400">
                    <p>No notes yet. Click "Add Note" to start taking notes on this lesson.</p>
                  </div>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Curriculum</h3>
                  <div className="space-y-2">
                    {course.modules.map((module, modIdx) => (
                      <div key={modIdx} className="border border-dark-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedModule(expandedModule === modIdx ? -1 : modIdx)}
                          className="w-full p-4 bg-dark-700 hover:bg-dark-600 transition-colors flex items-center justify-between text-left"
                        >
                          <span className="font-semibold text-white">{module.title}</span>
                          {expandedModule === modIdx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        {expandedModule === modIdx && (
                          <div className="bg-dark-800 border-t border-dark-700">
                            {module.lessons.map((lesson, lesIdx) => (
                              <button
                                key={lesIdx}
                                onClick={() => setCurrentLesson(lesIdx)}
                                className={`w-full p-3 text-left flex items-center gap-3 transition-colors ${
                                  currentLesson === lesIdx
                                    ? 'bg-accent-cyan/20 text-accent-cyan'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-dark-700'
                                }`}
                              >
                                {currentLesson === lesIdx ? (
                                  <Play size={16} fill="currentColor" />
                                ) : (
                                  <CheckCircle size={16} className="opacity-50" />
                                )}
                                <div className="flex-1 text-sm min-w-0">
                                  <p className="truncate">{lesson.title}</p>
                                  <p className="text-xs opacity-75">{lesson.duration}m</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="space-y-4 mt-4">
                  <h3 className="text-sm font-bold text-gray-400">Course Progress</h3>
                  <ProgressBar progress={65} showLabel={true} />
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
