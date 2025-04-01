import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DemographicData {
  aiExperience: string;
  aiFrequency: string;
  aiTrust: string;
  isCompleted: boolean;
}

interface DemographicContextType {
  demographicData: DemographicData;
  setDemographicResponse: (data: Partial<DemographicData>) => void;
  isCompleted: boolean;
  completeQuestionnaire: () => void;
}

const initialDemographicData: DemographicData = {
  aiExperience: '',
  aiFrequency: '',
  aiTrust: '',
  isCompleted: false,
};

const DemographicContext = createContext<DemographicContextType | undefined>(
  undefined
);

export const useDemographic = () => {
  const context = useContext(DemographicContext);
  if (!context) {
    throw new Error('useDemographic must be used within a DemographicProvider');
  }
  return context;
};

export const DemographicProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [demographicData, setDemographicData] = useState<DemographicData>(
    initialDemographicData
  );

  const setDemographicResponse = (data: Partial<DemographicData>) => {
    setDemographicData((prev) => ({ ...prev, ...data }));
  };

  const completeQuestionnaire = () => {
    setDemographicData((prev) => ({ ...prev, isCompleted: true }));
    console.log('Demographic data collected:', demographicData);
  };

  return (
    <DemographicContext.Provider
      value={{
        demographicData,
        setDemographicResponse,
        isCompleted: demographicData.isCompleted,
        completeQuestionnaire,
      }}
    >
      {children}
    </DemographicContext.Provider>
  );
};
