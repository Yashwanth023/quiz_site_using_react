
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    const user = { email };
    setUser(user);
    localStorage.setItem('quizUser', JSON.stringify(user));
    navigate('/quiz');
  };

  const signup = (email: string, password: string) => {
    const user = { email };
    setUser(user);
    localStorage.setItem('quizUser', JSON.stringify(user));
    navigate('/quiz');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
