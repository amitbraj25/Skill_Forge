import React, { useState } from 'react';
import { BookOpen, TrendingUp, Award, Clock, Search, Filter } from 'lucide-react';
import { Header, Sidebar, Card, Button, Rating } from '../components';
import { courses } from '../data/mockData';

interface CourseCatalogProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile Development', 'Artificial Intelligence', 'DevOps'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

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

  return (
    <div className="flex h-screen bg-dark-900">
      <Sidebar isOpen={sidebarOpen} navItems={navItems} activeId={activeNav} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Explore Courses"
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userRole="Student"
          onLogout={onLogout}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8 page-transition">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:shadow-glow-cyan transition-all"
                />
              </div>
              <button className="px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-gray-300 hover:border-accent-cyan hover:text-accent-cyan transition-all flex items-center gap-2">
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === cat
                          ? 'bg-accent-cyan text-dark-900 font-semibold'
                          : 'bg-dark-800 text-gray-300 border border-dark-700 hover:border-accent-cyan'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedLevel === level
                          ? 'bg-accent-cyan text-dark-900 font-semibold'
                          : 'bg-dark-800 text-gray-300 border border-dark-700 hover:border-accent-cyan'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-400 mb-6">Found {filteredCourses.length} courses</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    interactive
                    className="overflow-hidden"
                    onClick={() => onNavigate('course-detail')}
                  >
                    <div
                      className="h-40 rounded-lg mb-4"
                      style={{ background: course.image }}
                    />
                    <h3 className="text-lg font-bold text-white mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.description}</p>

                    <div className="space-y-4 pt-4 border-t border-dark-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{course.category}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          course.level === 'Beginner' ? 'bg-accent-emerald/20 text-accent-emerald' :
                          course.level === 'Intermediate' ? 'bg-accent-blue/20 text-accent-blue' :
                          'bg-orange-500/20 text-orange-400'
                        }`}>
                          {course.level}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <Rating rating={course.rating} />
                        <span className="text-sm text-gray-500">{course.students} students</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={16} />
                          <span className="text-sm">{course.duration}h</span>
                        </div>
                        <Button variant="primary" size="sm">Enroll Now</Button>
                      </div>

                      <p className="text-lg font-bold text-accent-cyan text-center">${course.price}</p>
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
