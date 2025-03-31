
import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

interface CommentBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const CommentBox: React.FC<CommentBoxProps> = ({ value, onChange }) => {
  return (
    <motion.div 
      className="mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
        Additional Comments (Optional)
      </label>
      <Textarea
        id="comment"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Share your thoughts or reasoning..."
        className="w-full resize-none"
        rows={3}
      />
    </motion.div>
  );
};

export default CommentBox;
