
import React from 'react';

interface ProgressBarProps {
  progress: number;  // 0 to 100
  total: number;     // total number of questions
  current: number;   // current question (0-based index)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, current }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-500">
          Question {current + 1} of {total}
        </span>
        <span className="text-xs font-medium text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
