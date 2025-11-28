export interface UserCredentials {
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  name: string;
}

export const validCredentials: UserCredentials[] = [
  {
    email: 'student@skill4edge.com',
    password: 'Student123',
    role: 'student',
    name: 'Alex Thompson',
  },
  {
    email: 'instructor@skill4edge.com',
    password: 'Instructor123',
    role: 'instructor',
    name: 'Sarah Chen',
  },
  {
    email: 'admin@skill4edge.com',
    password: 'Admin123',
    role: 'admin',
    name: 'Administrator',
  },
];

export const validateCredentials = (email: string, password: string) => {
  return validCredentials.find(
    (cred) => cred.email === email && cred.password === password
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};
