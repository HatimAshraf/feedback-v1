
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { usePoll } from '@/context/PollContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PollResults: React.FC = () => {
  const { results, questions, resetPoll } = usePoll();

  if (!results) return null;

  // Calculate result statistics
  const correctAnswers = results.responses.filter(response => {
    const question = questions.find(q => q.id === response.questionId);
    return question && question.correctOption === response.selectedOption;
  }).length;

  const accuracy = (correctAnswers / questions.length) * 100;
  
  // Prepare data for confidence by correctness chart
  const correctResponses = results.responses.filter(r => {
    const q = questions.find(q => q.id === r.questionId);
    return q?.correctOption === r.selectedOption;
  });
  
  const incorrectResponses = results.responses.filter(r => {
    const q = questions.find(q => q.id === r.questionId);
    return q?.correctOption !== undefined && q.correctOption !== r.selectedOption;
  });
  
  const avgCorrectConfidence = correctResponses.length 
    ? correctResponses.reduce((sum, r) => sum + r.confidenceLevel, 0) / correctResponses.length 
    : 0;
    
  const avgIncorrectConfidence = incorrectResponses.length 
    ? incorrectResponses.reduce((sum, r) => sum + r.confidenceLevel, 0) / incorrectResponses.length 
    : 0;
  
  const confidenceData = [
    { name: 'Correct Answers', confidence: avgCorrectConfidence, fill: '#2A9D8F' },
    { name: 'Incorrect Answers', confidence: avgIncorrectConfidence, fill: '#E76F51' }
  ];

  // Time data
  const avgTimePerQuestion = results.totalTimeSpent / questions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <Card className="border-gray-200 shadow-md">
        <CardHeader className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-800"
          >
            Your Poll Results
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600"
          >
            Thank you for participating in this research!
          </motion.p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-primary-50 p-4 rounded-lg text-center">
              <h3 className="text-gray-600 text-sm">Accuracy</h3>
              <p className="text-2xl font-bold text-primary-600">{accuracy.toFixed(0)}%</p>
              <p className="text-sm text-gray-500">{correctAnswers} of {questions.length} correct</p>
            </div>
            
            <div className="bg-secondary-50 p-4 rounded-lg text-center">
              <h3 className="text-gray-600 text-sm">Avg. Confidence</h3>
              <p className="text-2xl font-bold text-secondary-600">
                {(results.responses.reduce((sum, r) => sum + r.confidenceLevel, 0) / results.responses.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">out of 5</p>
            </div>
            
            <div className="bg-accent-50 p-4 rounded-lg text-center">
              <h3 className="text-gray-600 text-sm">Avg. Time per Question</h3>
              <p className="text-2xl font-bold text-amber-600">{avgTimePerQuestion.toFixed(1)}s</p>
              <p className="text-sm text-gray-500">Total: {results.totalTimeSpent.toFixed(0)}s</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Confidence by Answer Correctness</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={confidenceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} label={{ value: 'Confidence Level', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="confidence" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button onClick={resetPoll} variant="outline" size="lg" className="mt-4">
            Start Over
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PollResults;
