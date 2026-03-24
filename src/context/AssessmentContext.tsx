import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ClientInfo {
  clientName: string;
  date: string;
  dob: string;
  coachName: string;
  gender: string;
  injuryNotes: string;
}

export interface CoachNotes {
  movementCorrections: string;
  injuryPrecautions: string;
  trainingFocus: string;
}

interface AssessmentState {
  clientInfo: ClientInfo;
  dropdownResults: Record<string, string>;
  numericResults: Record<string, number>;
  testNotes: Record<string, string>;
  coachNotes: CoachNotes;
  currentStep: number;
}

interface AssessmentContextType extends AssessmentState {
  setClientInfo: (info: ClientInfo) => void;
  setDropdownResult: (testId: string, value: string) => void;
  setNumericResult: (testId: string, value: number) => void;
  setTestNote: (testId: string, note: string) => void;
  setCoachNotes: (notes: CoachNotes) => void;
  setCurrentStep: (step: number) => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientName: '', date: new Date().toISOString().split('T')[0], dob: '', coachName: '', gender: '', injuryNotes: '',
  });
  const [dropdownResults, setDropdownResults] = useState<Record<string, string>>({});
  const [numericResults, setNumericResults] = useState<Record<string, number>>({});
  const [testNotes, setTestNotes] = useState<Record<string, string>>({});
  const [coachNotes, setCoachNotes] = useState<CoachNotes>({ movementCorrections: '', injuryPrecautions: '', trainingFocus: '' });
  const [currentStep, setCurrentStep] = useState(0);

  const setDropdownResult = (testId: string, value: string) => {
    setDropdownResults(prev => ({ ...prev, [testId]: value }));
  };

  const setNumericResult = (testId: string, value: number) => {
    setNumericResults(prev => ({ ...prev, [testId]: value }));
  };

  const setTestNote = (testId: string, note: string) => {
    setTestNotes(prev => ({ ...prev, [testId]: note }));
  };

  return (
    <AssessmentContext.Provider value={{
      clientInfo, dropdownResults, numericResults, testNotes, coachNotes, currentStep,
      setClientInfo, setDropdownResult, setNumericResult, setTestNote, setCoachNotes, setCurrentStep,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) throw new Error('useAssessment must be used within AssessmentProvider');
  return context;
}
