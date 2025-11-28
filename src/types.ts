export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  students: number;
  rating: number;
  price: number;
  image: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl: string;
  resources: string[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  progress: number;
  completedLessons: string[];
  enrolledDate: string;
  status: 'active' | 'completed' | 'paused';
}

export interface Test {
  id: string;
  courseId: string;
  title: string;
  questions: Question[];
  passingScore: number;
  duration: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalCourses: number;
  completedCourses: number;
  averageScore: number;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  courses: string[];
  totalStudents: number;
  rating: number;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface TestResult {
  id: string;
  studentId: string;
  testId: string;
  score: number;
  passedStatus: boolean;
  completedDate: string;
  answers: number[];
}

export type UserRole = 'student' | 'instructor' | 'admin';
