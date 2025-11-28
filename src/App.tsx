import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CourseCatalog } from './pages/CourseCatalog';
import { CoursePlayer } from './pages/CoursePlayer';
import { CourseDetail } from './pages/CourseDetail';
import { StudentPerformance } from './pages/StudentPerformance';
import { InstructorDashboard } from './pages/InstructorDashboard';
import { InstructorCourseManagement } from './pages/InstructorCourseManagement';
import { AdminDashboard } from './pages/AdminDashboard';

type UserRole = 'student' | 'instructor' | 'admin' | null;
type Page = string;
type AuthPage = 'landing' | 'login' | 'register';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [authPage, setAuthPage] = useState<AuthPage>('landing');

  const handleSelectRole = (role: 'student' | 'instructor' | 'admin') => {
    setUserRole(role);
    setCurrentPage(`${role}-dashboard`);
    setAuthPage('landing');
  };

  const handleLoginSuccess = (role: 'student' | 'instructor' | 'admin') => {
    setUserRole(role);
    setCurrentPage(`${role}-dashboard`);
    setAuthPage('landing');
  };

  const handleRegisterSuccess = (role: 'student' | 'instructor' | 'admin') => {
    setUserRole(role);
    setCurrentPage(`${role}-dashboard`);
    setAuthPage('landing');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
    setAuthPage('landing');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleNavigateToLogin = () => {
    setAuthPage('login');
  };

  const handleNavigateToRegister = () => {
    setAuthPage('register');
  };

  const handleNavigateToLanding = () => {
    setAuthPage('landing');
  };

  const renderAuthPage = () => {
    if (authPage === 'login') {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateRegister={handleNavigateToRegister}
        />
      );
    }

    if (authPage === 'register') {
      return (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onNavigateLogin={handleNavigateToLogin}
        />
      );
    }

    return (
      <LandingPage
        onSelectRole={handleSelectRole}
        onNavigateLogin={handleNavigateToLogin}
      />
    );
  };

  const renderPage = () => {
    if (!userRole) {
      return renderAuthPage();
    }

    if (userRole === 'student') {
      switch (currentPage) {
        case 'dashboard':
          return <StudentDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'courses':
          return <CourseCatalog onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'explore':
          return <CourseCatalog onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'course-player':
          return <CoursePlayer onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'course-detail':
          return <CourseDetail onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'performance':
          return <StudentPerformance onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'student-dashboard':
          return <StudentDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        default:
          return <StudentDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      }
    }

    if (userRole === 'instructor') {
      switch (currentPage) {
        case 'instructor-dashboard':
          return <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'instructor-courses':
          return <InstructorCourseManagement onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'instructor-students':
          return <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'instructor-analytics':
          return <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'course-management':
          return <InstructorCourseManagement onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'create-course':
          return <InstructorCourseManagement onNavigate={handleNavigate} onLogout={handleLogout} />;
        default:
          return <InstructorDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      }
    }

    if (userRole === 'admin') {
      switch (currentPage) {
        case 'admin-dashboard':
          return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'admin-users':
          return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'admin-courses':
          return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        case 'admin-analytics':
          return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
        default:
          return <AdminDashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
      }
    }

    return <LandingPage onSelectRole={handleSelectRole} />;
  };

  return <>{renderPage()}</>;
}

export default App;
