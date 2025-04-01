import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import RankingOption from './RankingOption';
import ConfidenceRating from './ConfidenceRating';
import CommentBox from './CommentBox';
import ProgressBar from './ProgressBar';
import { RankingQuestion as RankingQuestionType } from '@/types/poll';
import { useRanking } from '@/context/RankingContext';
import { ArrowRight } from 'lucide-react';

interface RankingQuestionProps {
  question: RankingQuestionType;
}

const RankingQuestion: React.FC<RankingQuestionProps> = ({ question }) => {
  const {
    submitResponse,
    currentQuestionIndex,
    questions,
    progress,
    responses,
  } = useRanking();
  const [ranking, setRanking] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<number>(3);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Initialize ranking when component mounts or question changes
  useEffect(() => {
    // Check if we already have a response for this question
    const existingResponse = responses.find(
      (r) => r.questionId === question.id
    );

    if (existingResponse) {
      setRanking(existingResponse.ranking);
      setConfidence(existingResponse.confidenceLevel);
      setComment(existingResponse.comment || '');
    } else {
      // Initialize with default order (0, 1, 2, ...)
      setRanking([...Array(question.options.length).keys()]);
      setConfidence(3);
      setComment('');
    }
  }, [question.id, question.options.length, responses]);

  const handleMoveOption = (currentIndex: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === ranking.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newRanking = [...ranking];

    // Swap positions
    [newRanking[currentIndex], newRanking[newIndex]] = [
      newRanking[newIndex],
      newRanking[currentIndex],
    ];

    setRanking(newRanking);
  };

  const handleSubmit = () => {
    if (ranking.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      submitResponse({
        ranking,
        confidenceLevel: confidence,
        comment: comment.trim() || undefined,
      });

      setIsSubmitting(false);
    }, 300);
  };

  const isRankingComplete = ranking.length === question.options.length;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-2xl mx-auto'
    >
      <Card className='border-gray-200 shadow-sm'>
        <CardHeader className='pb-2'>
          <ProgressBar
            progress={progress}
            total={questions.length}
            current={currentQuestionIndex}
          />
          <motion.div
            className='flex items-center justify-center mb-3 bg-primary-50 text-primary-800 py-2 px-4 rounded-md'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className='text-sm font-medium'>
              Rank the options in order of correctness
            </h3>
          </motion.div>
          <motion.h2
            className='text-xl font-semibold text-gray-800 mb-4'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {question.statement}
          </motion.h2>
        </CardHeader>

        <CardContent>
          <div className='space-y-2'>
            {ranking.map((optionIndex, position) => (
              <RankingOption
                key={optionIndex}
                option={question.options[optionIndex]}
                index={optionIndex}
                position={position}
                isDragging={draggedIndex === optionIndex}
                onGrab={() => setDraggedIndex(optionIndex)}
                onMove={(direction) => handleMoveOption(position, direction)}
              />
            ))}
          </div>

          {isRankingComplete && (
            <>
              <ConfidenceRating value={confidence} onChange={setConfidence} />
              <CommentBox value={comment} onChange={setComment} />
            </>
          )}
        </CardContent>

        <CardFooter className='flex justify-end'>
          <Button
            onClick={handleSubmit}
            disabled={!isRankingComplete || isSubmitting}
            size='lg'
            className='mt-4'
          >
            {isSubmitting ? 'Submitting...' : 'Next Question'}
            {!isSubmitting && <ArrowRight size={16} className='ml-2' />}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RankingQuestion;
