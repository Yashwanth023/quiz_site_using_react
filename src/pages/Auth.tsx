
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (isLogin) {
      login(email, password);
    } else {
      signup(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 backdrop-blur-sm bg-white/90 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">QuizWhirl</h1>
          <p className="text-gray-600 mt-2">Test your knowledge</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-purple-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
