
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Clock, RotateCcw } from 'lucide-react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
  onRetry: () => void;
}

export const QuizResult = ({
  score,
  totalQuestions,
  timePerQuestion,
  onRetry,
}: QuizResultProps) => {
  const percentage = (score / totalQuestions) * 100;
  const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / timePerQuestion.length;

  useEffect(() => {
    const saveResult = async () => {
      const attempt = {
        timestamp: Date.now(),
        score,
        totalQuestions,
        timePerQuestion,
      };

      try {
        await quizDB.saveAttempt(attempt);
      } catch (error) {
        console.error('Failed to save attempt:', error);
      }
    };

    saveResult();
  }, [score, totalQuestions, timePerQuestion]);

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 backdrop-blur-sm bg-white/90 shadow-xl animate-fade-up">
      <div className="text-center mb-8">
        <Award className="w-16 h-16 mx-auto mb-4 text-quiz-accent" />
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-gray-600">Here's how you did</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Score</span>
            <span className="font-medium">{percentage.toFixed(0)}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-1">Correct Answers</div>
            <div className="text-2xl font-bold text-quiz-accent">
              {score} / {totalQuestions}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium mb-1">Average Time</div>
            <div className="text-2xl font-bold text-quiz-timer">
              {averageTime.toFixed(1)}s
            </div>
          </div>
        </div>

        <Button
          onClick={onRetry}
          className="w-full py-6 text-lg font-medium"
          variant="outline"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </Button>
      </div>
    </Card>
  );
};
