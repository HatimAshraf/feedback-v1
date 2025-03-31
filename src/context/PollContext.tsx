
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PollQuestion, UserResponse, PollResults } from "../types/poll";
import { sampleQuestions } from "../data/sampleQuestions";
import { useToast } from "@/components/ui/use-toast";

interface PollContextType {
  questions: PollQuestion[];
  currentQuestionIndex: number;
  responses: UserResponse[];
  isCompleted: boolean;
  results: PollResults | null;
  submitResponse: (response: Omit<UserResponse, "questionId">) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  resetPoll: () => void;
  currentQuestion: PollQuestion | null;
  progress: number;
}

const PollContext = createContext<PollContextType | undefined>(undefined);

export const usePoll = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error("usePoll must be used within a PollProvider");
  }
  return context;
};

export const PollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions] = useState<PollQuestion[]>(sampleQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<PollResults | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress = questions.length > 0 ? ((currentQuestionIndex) / questions.length) * 100 : 0;

  useEffect(() => {
    // Reset the timer when the question changes
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const submitResponse = (response: Omit<UserResponse, "questionId">) => {
    if (!currentQuestion) return;
    
    const timeSpent = (Date.now() - startTime) / 1000; // Convert to seconds
    
    const fullResponse: UserResponse = {
      ...response,
      questionId: currentQuestion.id,
      timeSpent
    };
    
    setResponses((prev) => {
      // Check if we already have a response for this question
      const existingIndex = prev.findIndex(r => r.questionId === currentQuestion.id);
      
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
      completePoll();
    } else {
      goToNextQuestion();
    }
  };

  const completePoll = () => {
    setIsCompleted(true);
    const totalTimeSpent = responses.reduce((total, r) => total + (r.timeSpent || 0), 0);
    
    const pollResults: PollResults = {
      responses,
      totalTimeSpent,
      completedAt: new Date()
    };
    
    setResults(pollResults);
    toast({
      title: "Poll Completed",
      description: "Thank you for your participation!",
      duration: 5000,
    });
    
    // In a real application, you might send this data to your server
    console.log("Poll Results:", pollResults);
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

  const resetPoll = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setIsCompleted(false);
    setResults(null);
    setStartTime(Date.now());
  };

  return (
    <PollContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        responses,
        isCompleted,
        results,
        submitResponse,
        goToNextQuestion,
        goToPreviousQuestion,
        resetPoll,
        currentQuestion,
        progress
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
