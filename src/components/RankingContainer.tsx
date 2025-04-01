import React from 'react';
import { useRanking } from '@/context/RankingContext';
import RankingQuestion from './RankingQuestion';
import RankingResults from './RankingResults';
import { AnimatePresence } from 'framer-motion';

const RankingContainer: React.FC = () => {
  const { currentQuestion, isCompleted } = useRanking();

  return (
    <div className='w-full max-w-4xl mx-auto p-4'>
      <AnimatePresence mode='wait'>
        {!isCompleted && currentQuestion ? (
          <RankingQuestion
            key={currentQuestion.id}
            question={currentQuestion}
          />
        ) : (
          <RankingResults key='results' />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RankingContainer;
