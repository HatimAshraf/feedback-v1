import { useEffect, useState } from 'react';
import { PollProvider } from '@/context/PollContext';
import { RankingProvider } from '@/context/RankingContext';
import {
  DemographicProvider,
  useDemographic,
} from '@/context/DemographicContext';
import PollContainer from '@/components/PollContainer';
import RankingContainer from '@/components/RankingContainer';
import DemographicQuestionnaire from '@/components/DemographicQuestionnaire';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const FeedbackSystems = () => {
  const [feedbackType, setFeedbackType] = useState<'selection' | 'ranking'>(
    'selection'
  );
  const { isCompleted } = useDemographic();

  if (!isCompleted) {
    return <DemographicQuestionnaire />;
  }

  return (
    <>
      <Card className='max-w-lg mx-auto p-4 mb-8'>
        <Tabs
          defaultValue='selection'
          className='w-full'
          onValueChange={(v) => setFeedbackType(v as 'selection' | 'ranking')}
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='selection'>Selection System</TabsTrigger>
            <TabsTrigger value='ranking'>Ranking System</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {feedbackType === 'selection' ? (
        <PollProvider>
          <PollContainer />
        </PollProvider>
      ) : (
        <RankingProvider>
          <RankingContainer />
        </RankingProvider>
      )}
    </>
  );
};

const Index = () => {
  useEffect(() => {
    document.title = 'Human Computation Feedback System';
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-4xl mx-auto text-center mb-8'
      >
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
          Human Computation Feedback System
        </h1>
        <p className='text-gray-600 max-w-2xl mx-auto mb-8'>
          Your insights will help advance our understanding of
          <span className='font-semibold text-black'>
            {' '}
            Human feedback & cognitive processes towards Acceptance of
            Commonsense in AI.
          </span>
        </p>
      </motion.div>

      <DemographicProvider>
        <FeedbackSystems />
      </DemographicProvider>

      <footer className='mt-12 text-center text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} Human Computation Feedback System</p>
        <p className='mt-1'>
          All responses are collected anonymously for research purposes.
        </p>
        <p className='mt-1'>Created By Hatim A.</p>
      </footer>
    </div>
  );
};

export default Index;
