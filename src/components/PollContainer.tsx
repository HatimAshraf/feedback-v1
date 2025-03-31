
import React from 'react';
import { usePoll } from '@/context/PollContext';
import PollQuestion from './PollQuestion';
import PollResults from './PollResults';
import { AnimatePresence } from 'framer-motion';

const PollContainer: React.FC = () => {
  const { currentQuestion, isCompleted } = usePoll();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <AnimatePresence mode="wait">
        {!isCompleted && currentQuestion ? (
          <PollQuestion key={currentQuestion.id} question={currentQuestion} />
        ) : (
          <PollResults key="results" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PollContainer;
