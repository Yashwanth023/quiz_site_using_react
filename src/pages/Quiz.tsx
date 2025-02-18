
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { QuizCard } from '@/components/QuizCard';
import { QuizResult } from '@/components/QuizResult';
import { AttemptHistory } from '@/components/AttemptHistory';
import { quizQuestions } from '@/data/quiz-questions';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';

const Quiz = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAnswer = (isCorrect: boolean, timeSpent: number) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setTimePerQuestion((prev) => [...prev, timeSpent]);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimePerQuestion([]);
    setQuizComplete(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white">QuizWhirl</h1>
            <p className="text-white/80">Welcome, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout} className="bg-white">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {!quizComplete ? (
          <QuizCard
            question={quizQuestions[currentQuestion]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizQuestions.length}
          />
        ) : (
          <QuizResult
            score={score}
            totalQuestions={quizQuestions.length}
            timePerQuestion={timePerQuestion}
            onRetry={handleRetry}
          />
        )}

        <AttemptHistory />
      </div>
      <Toaster />
    </div>
  );
};

export default Quiz;
