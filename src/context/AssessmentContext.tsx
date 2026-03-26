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
  amrapProtocol: string;
  amrapExerciseNotes: Record<string, string>;
  amrapExerciseReps: Record<string, string>;
}

interface AssessmentContextType extends AssessmentState {
  setClientInfo: (info: ClientInfo) => void;
  setDropdownResult: (testId: string, value: string) => void;
  setNumericResult: (testId: string, value: number) => void;
  setTestNote: (testId: string, note: string) => void;
  setCoachNotes: (notes: CoachNotes) => void;
  setCurrentStep: (step: number) => void;
  setAmrapProtocol: (protocol: string) => void;
  setAmrapExerciseNote: (key: string, note: string) => void;
  setAmrapExerciseRep: (key: string, rep: string) => void;
  loadFullState: (data: Partial<AssessmentState>) => void;
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
  const [amrapProtocol, setAmrapProtocol] = useState('standard');
  const [amrapExerciseNotes, setAmrapExerciseNotes] = useState<Record<string, string>>({});
  const [amrapExerciseReps, setAmrapExerciseReps] = useState<Record<string, string>>({});

  const setDropdownResult = (testId: string, value: string) => {
    setDropdownResults(prev => ({ ...prev, [testId]: value }));
  };

  const setNumericResult = (testId: string, value: number) => {
    setNumericResults(prev => ({ ...prev, [testId]: value }));
  };

  const setTestNote = (testId: string, note: string) => {
    setTestNotes(prev => ({ ...prev, [testId]: note }));
  };

  const setAmrapExerciseNote = (key: string, note: string) => {
    setAmrapExerciseNotes(prev => ({ ...prev, [key]: note }));
  };

  const setAmrapExerciseRep = (key: string, rep: string) => {
    setAmrapExerciseReps(prev => ({ ...prev, [key]: rep }));
  };

  const loadFullState = (data: Partial<AssessmentState>) => {
    if (data.clientInfo) setClientInfo(data.clientInfo);
    if (data.dropdownResults) setDropdownResults(data.dropdownResults);
    if (data.numericResults) setNumericResults(data.numericResults);
    if (data.testNotes) setTestNotes(data.testNotes);
    if (data.coachNotes) setCoachNotes(data.coachNotes);
    if (data.amrapProtocol) setAmrapProtocol(data.amrapProtocol);
    if (data.amrapExerciseNotes) setAmrapExerciseNotes(data.amrapExerciseNotes);
    if (data.amrapExerciseReps) setAmrapExerciseReps(data.amrapExerciseReps);
  };

  return (
    <AssessmentContext.Provider value={{
      clientInfo, dropdownResults, numericResults, testNotes, coachNotes, currentStep,
      amrapProtocol, amrapExerciseNotes, amrapExerciseReps,
      setClientInfo, setDropdownResult, setNumericResult, setTestNote, setCoachNotes, setCurrentStep,
      setAmrapProtocol, setAmrapExerciseNote, setAmrapExerciseRep, loadFullState
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
