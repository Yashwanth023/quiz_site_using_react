
import { useState } from 'react';
import { quizQuestions } from '@/data/quiz-questions';
import { QuizCard } from '@/components/QuizCard';
import { QuizResult } from '@/components/QuizResult';
import { AttemptHistory } from '@/components/AttemptHistory';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Interactive Quiz</h1>
          <p className="text-gray-600">Test your React knowledge</p>
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

export default Index;
