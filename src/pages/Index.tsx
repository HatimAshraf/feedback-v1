
import { useEffect } from 'react';
import { PollProvider } from '@/context/PollContext';
import PollContainer from '@/components/PollContainer';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    document.title = "Human Computation Research Poll";
  }, []);

  return (
    <PollProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Human Computation Research
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for participating in this research project. Your insights will help advance our understanding of human computation systems and cognitive processes.
          </p>
        </motion.div>
        
        <PollContainer />
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Human Computation Research Project</p>
          <p className="mt-1">All responses are collected anonymously for research purposes.</p>
        </footer>
      </div>
    </PollProvider>
  );
};

export default Index;
