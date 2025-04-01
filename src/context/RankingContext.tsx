import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  RankingQuestion,
  RankingResponse,
  RankingResults,
} from '../types/poll';
import { useToast } from '@/components/ui/use-toast';

// Sample ranking questions
const sampleRankingQuestions: RankingQuestion[] = [
  {
    id: 'r1',
    statement:
      'Rank these programming languages in order of their performance for server-side applications:(General)',
    options: ['JavaScript (Node.js)', 'Python', 'Java', 'Go'],
    correctRanking: [3, 2, 0, 1], // Go, Java, Node.js, Python
  },
  {
    id: 'r2',
    statement:
      'You accidentally drop a glass cup on a hard tile floor. What is the most likely outcome?(Physical)',
    options: [
      'The glass shatters into pieces.',
      'The glass bounces a few times and stays intact.',
      'The glass slowly rolls away without breaking.',
      'The glass remains completely undamaged and stays in place.',
    ],
    correctRanking: [0, 1, 3, 2],
  },
  {
    id: 'r3',
    statement:
      'You are at a friend`s birthday party, and they receive a gift they don`t like. What is the most appropriate response?(Social)',
    options: [
      'Smile and politely say, "Thank you!"',
      'Change the topic to avoid making it awkward.',
      'Quietly express disappointment to close friends later.',
      'Complain about the gift in front of everyone.',
    ],
    correctRanking: [0, 1, 2, 3],
  },
];

interface RankingContextType {
  questions: RankingQuestion[];
  currentQuestionIndex: number;
  responses: RankingResponse[];
  isCompleted: boolean;
  results: RankingResults | null;
  submitResponse: (
    response: Omit<RankingResponse, 'questionId' | 'timeSpent'>
  ) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetRanking: () => void;
  currentQuestion: RankingQuestion | null;
  progress: number;
}

const RankingContext = createContext<RankingContextType | undefined>(undefined);

export const useRanking = () => {
  const context = useContext(RankingContext);
  if (!context) {
    throw new Error('useRanking must be used within a RankingProvider');
  }
  return context;
};

export const RankingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questions] = useState<RankingQuestion[]>(sampleRankingQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<RankingResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<RankingResults | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress =
    questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;

  useEffect(() => {
    // Reset the timer when the question changes
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const submitResponse = (
    response: Omit<RankingResponse, 'questionId' | 'timeSpent'>
  ) => {
    if (!currentQuestion) return;

    const timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds

    const fullResponse: RankingResponse = {
      ...response,
      questionId: currentQuestion.id,
      timeSpent,
    };

    setResponses((prev) => {
      // Check if we already have a response for this question
      const existingIndex = prev.findIndex(
        (r) => r.questionId === currentQuestion.id
      );

      if (existingIndex >= 0) {
        // Replace the existing response
        const updated = [...prev];
        updated[existingIndex] = fullResponse;
        return updated;
      } else {
        // Add new response
        return [...prev, fullResponse];
      }
    });

    // If this is the last question, complete the poll
    if (currentQuestionIndex === questions.length - 1) {
      completeRanking();
    } else {
      goToNextQuestion();
    }
  };

  const completeRanking = () => {
    setIsCompleted(true);
    const totalTimeSpent = responses.reduce(
      (total, r) => total + (r.timeSpent || 0),
      0
    );

    const rankingResults: RankingResults = {
      responses,
      totalTimeSpent,
      completedAt: new Date(),
    };

    setResults(rankingResults);
    toast({
      title: 'Ranking Completed',
      description: 'Thank you for your participation!',
      duration: 5000,
    });

    // In a real application, you might send this data to your server
    console.log('Ranking Results:', rankingResults);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetRanking = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
    setResults(null);
    setStartTime(Date.now());
  };

  return (
    <RankingContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        responses,
        isCompleted,
        results,
        submitResponse,
        goToNextQuestion,
        goToPreviousQuestion,
        resetRanking,
        currentQuestion,
        progress,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
};
