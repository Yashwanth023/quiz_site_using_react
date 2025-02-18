
import { useState, useEffect } from 'react';
import { Question } from '@/data/quiz-questions';
import { useQuizTimer } from '@/hooks/useQuizTimer';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, timeSpent: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizCard = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const timePerQuestion = 30;

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [question.id]); // Reset when question ID changes

  const { timeLeft, stopTimer } = useQuizTimer(timePerQuestion, () => {
    if (!hasAnswered) {
      handleAnswer(-1);
    }
  });

  const handleAnswer = (optionIndex: number) => {
    if (hasAnswered) return;
    
    const timeSpent = timePerQuestion - timeLeft;
    const isCorrect = optionIndex === question.correctAnswer;
    
    setSelectedAnswer(optionIndex);
    setHasAnswered(true);
    stopTimer();
    onAnswer(isCorrect, timeSpent);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect 
        ? "Great job! Moving to next question..." 
        : "Don't worry, keep going!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const getOptionStyles = (index: number) => {
    if (!hasAnswered) return "hover:bg-quiz-muted";
    if (index === question.correctAnswer) return "bg-quiz-correct text-white";
    if (index === selectedAnswer && index !== question.correctAnswer)
      return "bg-quiz-wrong text-white";
    return "opacity-50";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 backdrop-blur-sm bg-white/90 shadow-xl animate-fade-up">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-quiz-timer" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
        </div>
        <Progress value={(timeLeft / timePerQuestion) * 100} className="h-1" />
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full p-4 text-left justify-start h-auto transition-all duration-200 ${getOptionStyles(
              index
            )}`}
            onClick={() => handleAnswer(index)}
            disabled={hasAnswered}
          >
            {hasAnswered && index === question.correctAnswer && (
              <CheckCircle2 className="w-5 h-5 mr-2 text-white" />
            )}
            {hasAnswered && index === selectedAnswer && index !== question.correctAnswer && (
              <XCircle className="w-5 h-5 mr-2 text-white" />
            )}
            {option}
          </Button>
        ))}
      </div>
    </Card>
  );
};
