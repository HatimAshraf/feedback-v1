import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

interface RankingOptionProps {
  option: string;
  index: number;
  position: number;
  isDragging?: boolean;
  onGrab?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
}

const RankingOption: React.FC<RankingOptionProps> = ({
  option,
  index,
  position,
  isDragging = false,
  onGrab,
  onMove,
}) => {
  return (
    <motion.div
      className={cn(
        'w-full p-4 mb-3 rounded-lg border-2 flex items-center gap-3',
        isDragging
          ? 'border-primary bg-primary-50 shadow-md z-10'
          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      layout
    >
      <div className='w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-300 bg-white'>
        {position + 1}
      </div>

      <span className='flex-1 font-medium'>{option}</span>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => onMove && onMove('up')}
          disabled={position === 0}
          className='p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed'
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path d='M10 5L15 10H5L10 5Z' fill='currentColor' />
          </svg>
        </button>

        <button
          type='button'
          onClick={() => onMove && onMove('down')}
          disabled={position === index}
          className='p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed'
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
            <path d='M10 15L15 10H5L10 15Z' fill='currentColor' />
          </svg>
        </button>

        <div
          className='p-1 cursor-grab text-gray-500 hover:text-gray-700 active:cursor-grabbing'
          onMouseDown={onGrab}
        >
          <GripVertical size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default RankingOption;
