
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { quizDB } from '@/services/db';
import { History } from 'lucide-react';

interface Attempt {
  id?: number;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number[];
}

export const AttemptHistory = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const history = await quizDB.getAttempts();
        setAttempts(history.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error('Failed to load attempts:', error);
      }
    };

    loadAttempts();
  }, []);

  if (attempts.length === 0) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 p-6 backdrop-blur-sm bg-white/90 shadow-xl animate-fade-up">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-quiz-accent" />
        <h3 className="text-lg font-semibold">Previous Attempts</h3>
      </div>

      <ScrollArea className="h-[200px] rounded-md border p-4">
        <div className="space-y-4">
          {attempts.map((attempt, index) => (
            <div
              key={attempt.id || index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(attempt.timestamp, { addSuffix: true })}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">
                  {((attempt.score / attempt.totalQuestions) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-500">
                  Avg: {(
                    attempt.timePerQuestion.reduce((a, b) => a + b, 0) /
                    attempt.timePerQuestion.length
                  ).toFixed(1)}s
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
