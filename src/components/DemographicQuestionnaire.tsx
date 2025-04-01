import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { ArrowRight } from 'lucide-react';
import { useDemographic } from '@/context/DemographicContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  aiExperience: z.string().min(1, { message: 'Please select an option' }),
  aiFrequency: z.string().min(1, { message: 'Please select an option' }),
  aiTrust: z.string().min(1, { message: 'Please select an option' }),
});

type FormValues = z.infer<typeof formSchema>;

const DemographicQuestionnaire: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setDemographicResponse, completeQuestionnaire } = useDemographic();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aiExperience: '',
      aiFrequency: '',
      aiTrust: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);

    // Submit with a small delay to show the loading state
    setTimeout(() => {
      setDemographicResponse(data);
      completeQuestionnaire();
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-2xl mx-auto'
    >
      <Card className='border-gray-200 shadow-sm'>
        <CardHeader>
          <motion.h2
            className='text-2xl font-semibold text-gray-800 mb-1 text-center'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Demographic Information
          </motion.h2>
          <p className=' text-gray-600 text-sm text-center'>
            Please answer these brief questions before starting the research
            activity.
          </p>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='space-y-10'>
              <FormField
                control={form.control}
                name='aiExperience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold'>
                      How would you rate your familiarity with AI technology?
                    </FormLabel>
                    <div className='flex flex-col text-center mt-4'>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='space-y-1 '
                      >
                        <div className='flex items-center'>
                          <RadioGroupItem value='novice' id='ai-exp-1' />
                          <Label htmlFor='ai-exp-1' className='ml-2'>
                            Novice - Little to no knowledge
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='basic' id='ai-exp-2' />
                          <Label htmlFor='ai-exp-2' className='ml-2'>
                            Basic understanding
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='intermediate' id='ai-exp-3' />
                          <Label htmlFor='ai-exp-3' className='ml-2'>
                            Intermediate - Good working knowledge
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='advanced' id='ai-exp-4' />
                          <Label htmlFor='ai-exp-4' className='ml-2'>
                            Advanced - Expert knowledge
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='aiFrequency'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold'>
                      How frequently do you use AI tools (like ChatGPT,
                      Midjourney, etc.)?
                    </FormLabel>
                    <div className='mt-4'>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='space-y-2'
                      >
                        <div className='flex items-center'>
                          <RadioGroupItem value='never' id='ai-freq-1' />
                          <Label htmlFor='ai-freq-1' className='ml-2'>
                            Never used
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='rarely' id='ai-freq-2' />
                          <Label htmlFor='ai-freq-2' className='ml-2'>
                            Rarely (few times a year)
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='occasionally' id='ai-freq-3' />
                          <Label htmlFor='ai-freq-3' className='ml-2'>
                            Occasionally (few times a month)
                          </Label>
                        </div>

                        <div className='flex items-center'>
                          <RadioGroupItem value='daily' id='ai-freq-5' />
                          <Label htmlFor='ai-freq-5' className='ml-2'>
                            Daily (every day)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='aiTrust'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base font-semibold'>
                      How much would you trust AI to make important decisions?
                    </FormLabel>
                    <div className='mt-2'>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='space-y-2'
                      >
                        <div className='flex items-center'>
                          <RadioGroupItem value='notrust' id='ai-trust-1' />
                          <Label htmlFor='ai-trust-1' className='ml-2'>
                            No trust at all
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='littletrust' id='ai-trust-2' />
                          <Label htmlFor='ai-trust-2' className='ml-2'>
                            Little trust
                          </Label>
                        </div>
                        <div className='flex items-center'>
                          <RadioGroupItem value='neutral' id='ai-trust-3' />
                          <Label htmlFor='ai-trust-3' className='ml-2'>
                            Neutral
                          </Label>
                        </div>

                        <div className='flex items-center'>
                          <RadioGroupItem value='fulltrust' id='ai-trust-5' />
                          <Label htmlFor='ai-trust-5' className='ml-2'>
                            Full trust
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className='flex justify-end'>
              <Button
                type='submit'
                disabled={isSubmitting}
                size='lg'
                className='mt-4'
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Continue to Research Activity'}
                {!isSubmitting && <ArrowRight size={16} className='ml-2' />}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
};

export default DemographicQuestionnaire;
