
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import PollOption from './PollOption';
import ConfidenceRating from './ConfidenceRating';
import CommentBox from './CommentBox';
import ProgressBar from './ProgressBar';
import { PollQuestion as PollQuestionType, UserResponse } from '@/types/poll';
import { usePoll } from '@/context/PollContext';
import { ArrowRight } from 'lucide-react';

interface PollQuestionProps {
  question: PollQuestionType;
}

const PollQuestion: React.FC<PollQuestionProps> = ({ question }) => {
  const { submitResponse, currentQuestionIndex, questions, progress, responses } = usePoll();
  const [selectedOption, setSelectedOption] = useState<1 | 2 | null>(null);
  const [confidence, setConfidence] = useState<number>(3); // Default to middle value
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Check if we already have a response for this question
  useEffect(() => {
    const existingResponse = responses.find(r => r.questionId === question.id);
    if (existingResponse) {
      setSelectedOption(existingResponse.selectedOption);
      setConfidence(existingResponse.confidenceLevel);
      setComment(existingResponse.comment || '');
    } else {
      // Reset form when showing a new question
      setSelectedOption(null);
      setConfidence(3);
      setComment('');
    }
  }, [question.id, responses]);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitting(true);
    
    // Prepare the response object
    const response: Omit<UserResponse, 'questionId'> = {
      selectedOption,
      confidenceLevel: confidence,
      comment: comment.trim() || undefined,
    };
    
    // Submit with a small delay to show the loading state
    setTimeout(() => {
      submitResponse(response);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <ProgressBar 
            progress={progress} 
            total={questions.length} 
            current={currentQuestionIndex} 
          />
          <motion.h2 
            className="text-xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {question.statement}
          </motion.h2>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            <PollOption
              optionNumber={1}
              optionText={question.option1}
              isSelected={selectedOption === 1}
              onClick={() => setSelectedOption(1)}
            />
            <PollOption
              optionNumber={2}
              optionText={question.option2}
              isSelected={selectedOption === 2}
              onClick={() => setSelectedOption(2)}
            />
          </div>
          
          {selectedOption && (
            <>
              <ConfidenceRating value={confidence} onChange={setConfidence} />
              <CommentBox value={comment} onChange={setComment} />
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedOption || isSubmitting} 
            size="lg"
            className="mt-4"
          >
            {isSubmitting ? "Submitting..." : "Next Question"}
            {!isSubmitting && <ArrowRight size={16} className="ml-2" />}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PollQuestion;
