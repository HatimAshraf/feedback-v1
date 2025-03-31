
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

interface ConfidenceRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const ConfidenceRating: React.FC<ConfidenceRatingProps> = ({ value, onChange }) => {
  const labels = [
    'Very Uncertain',
    'Somewhat Uncertain',
    'Neutral',
    'Somewhat Confident',
    'Very Confident'
  ];

  const handleChange = (newValue: number[]) => {
    onChange(newValue[0]);
  };

  return (
    <motion.div 
      className="my-6 p-4 rounded-lg border border-gray-200 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="font-medium text-gray-800 mb-3">How confident are you in your answer?</h3>
      
      <Slider
        defaultValue={[value]}
        min={1}
        max={5}
        step={1}
        onValueChange={handleChange}
        className="my-4"
      />
      
      <div className="flex justify-between text-xs text-gray-500 px-2 mt-1">
        {labels.map((label, index) => (
          <div 
            key={index} 
            className={`w-1/5 text-center ${index + 1 === value ? 'text-primary font-medium' : ''}`}
          >
            {index + 1 === value && (
              <div className="text-sm mb-1 text-primary font-medium">{label}</div>
            )}
            <div className="h-1 w-1 rounded-full mx-auto mb-1 bg-gray-300"></div>
            {index + 1}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConfidenceRating;
