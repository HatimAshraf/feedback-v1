
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PollOptionProps {
  optionNumber: 1 | 2;
  optionText: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const PollOption: React.FC<PollOptionProps> = ({
  optionNumber,
  optionText,
  isSelected,
  onClick,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        'w-full p-4 mb-4 rounded-lg border-2 cursor-pointer transition-all',
        isSelected 
          ? 'border-primary bg-primary-50 shadow-md' 
          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50',
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border-2",
            isSelected ? "border-primary bg-primary text-white" : "border-gray-300"
          )}
        >
          {isSelected ? <Check size={16} /> : optionNumber}
        </div>
        <span className={cn("flex-1", isSelected ? "font-medium" : "font-normal")}>
          {optionText}
        </span>
      </div>
    </motion.div>
  );
};

export default PollOption;
