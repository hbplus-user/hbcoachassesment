import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { allSections } from '@/data/assessmentData';
import { ClientInfoStep } from '@/components/assessment/ClientInfoStep';
import { SectionStep } from '@/components/assessment/SectionStep';
import { CoachNotesStep } from '@/components/assessment/CoachNotesStep';
import { AmrapStep } from '@/components/assessment/AmrapStep';
import { EnduranceStep } from '@/components/assessment/EnduranceStep';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const STEP_LABELS = [
  'Client Info',
  'Mobility',
  'Movement',
  'Strength',
  'Endurance',
  'Balance',
  'AMRAP',
  'Coach Notes',
];

const Index = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { clientInfo } = useAssessment();
  const totalSteps = STEP_LABELS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const renderStep = () => {
    if (step === 0) return <ClientInfoStep />;
    if (step >= 1 && step <= 3) return <SectionStep section={allSections[step - 1]} />;
    if (step === 4) return <EnduranceStep />;
    if (step === 5) return <SectionStep section={allSections[4]} />;
    if (step === 6) return <AmrapStep />;
    if (step === 7) return <CoachNotesStep />;
    return null;
  };

  const canProceed = () => {
    if (step === 0) return clientInfo.clientName.trim() !== '' && clientInfo.coachName.trim() !== '';
    return true;
  };

  const handleSubmit = () => {
    navigate('/report/coach');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">HB Health Assessment</h1>
              <p className="text-sm text-muted-foreground">Step {step + 1} of {totalSteps} — {STEP_LABELS[step]}</p>
            </div>
            <div className="flex gap-1">
              {STEP_LABELS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setStep(i)}
                  className={`hidden md:block px-2 py-1 text-xs rounded-md transition-colors ${
                    i === step
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : i < step
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-6 md:p-8">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
          >
            ← Previous
          </Button>

          {step < totalSteps - 1 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed()}
            >
              Next →
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-accent-foreground">
              Generate Reports →
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
