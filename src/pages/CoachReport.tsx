import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { allSections, getStatusFromDropdownValue, getStrengthLevel } from '@/data/assessmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

function StatusBadge({ status }: { status: string }) {
  if (status === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white text-xs">✅ Pass</Badge>;
  if (status === 'restricted') return <Badge className="bg-[hsl(var(--status-restricted))] text-white text-xs">⚠️ Restricted</Badge>;
  if (status === 'issue') return <Badge className="bg-[hsl(var(--status-issue))] text-white text-xs">🔴 Issue</Badge>;
  return <Badge variant="outline" className="text-xs">Not tested</Badge>;
}

export default function CoachReport() {
  const navigate = useNavigate();
  const { clientInfo, dropdownResults, numericResults, testNotes, coachNotes } = useAssessment();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Coach Detailed Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/report/client')}>View Client Report</Button>
            <Button variant="outline" onClick={() => navigate('/')}>← Back to Form</Button>
            <Button onClick={() => window.print()}>🖨️ Print / PDF</Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Client Info */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">Client Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div><span className="font-semibold text-muted-foreground">Client:</span> <span className="text-foreground">{clientInfo.clientName || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Coach:</span> <span className="text-foreground">{clientInfo.coachName || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Date:</span> <span className="text-foreground">{clientInfo.date || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">DOB:</span> <span className="text-foreground">{clientInfo.dob || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Gender:</span> <span className="text-foreground capitalize">{clientInfo.gender || '—'}</span></div>
          </div>
          {clientInfo.injuryNotes && (
            <div className="mt-4 p-3 bg-destructive/10 rounded-lg text-sm">
              <span className="font-semibold text-destructive">Injury Notes:</span> {clientInfo.injuryNotes}
            </div>
          )}
        </Card>

        {/* All Sections */}
        {allSections.map(section => {
          const tests = section.tests || [];
          const subsectionTests = (section.subsections || []).flatMap(s => s.tests);
          const allTests = [...tests, ...subsectionTests];

          return (
            <Card key={section.id} className="p-6 print-break">
              <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">{section.icon} {section.name}</h2>

              {section.subsections?.map(sub => (
                <div key={sub.id} className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{sub.name}</h3>
                  <div className="space-y-2">
                    {sub.tests.map(test => {
                      const val = dropdownResults[test.id];
                      const numVal = numericResults[test.id];
                      const note = testNotes[test.id];
                      const status = test.type === 'dropdown' && val ? getStatusFromDropdownValue(test, val) : undefined;
                      const selectedLabel = test.options?.find(o => o.value === val)?.label;

                      return (
                        <div key={test.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 text-sm">
                          <div className="flex-1">
                            <div className="font-medium text-foreground">{test.name}</div>
                            {selectedLabel && <div className="text-muted-foreground mt-0.5">{selectedLabel}</div>}
                            {test.type === 'number' && numVal !== undefined && (
                              <div className="text-muted-foreground mt-0.5">{numVal} {test.unit}</div>
                            )}
                            {note && <div className="mt-1 text-xs text-muted-foreground italic">Note: {note}</div>}
                          </div>
                          {status && <StatusBadge status={status} />}
                          {test.type === 'number' && test.benchmarks && numVal !== undefined && (
                            <Badge className={
                              getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath') === 'Advanced'
                                ? 'bg-[hsl(var(--status-pass))] text-white text-xs'
                                : getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath') === 'Intermediate'
                                ? 'bg-[hsl(var(--status-restricted))] text-white text-xs'
                                : 'bg-[hsl(var(--status-issue))] text-white text-xs'
                            }>
                              {getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath')}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {section.tests && (
                <div className="space-y-2">
                  {section.tests.map(test => {
                    const val = dropdownResults[test.id];
                    const numVal = numericResults[test.id];
                    const note = testNotes[test.id];
                    const status = test.type === 'dropdown' && val ? getStatusFromDropdownValue(test, val) : undefined;
                    const selectedLabel = test.options?.find(o => o.value === val)?.label;

                    return (
                      <div key={test.id} className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{test.name}</div>
                          {selectedLabel && <div className="text-muted-foreground mt-0.5">{selectedLabel}</div>}
                          {test.type === 'number' && numVal !== undefined && (
                            <div className="text-muted-foreground mt-0.5">{numVal} {test.unit}</div>
                          )}
                          {note && <div className="mt-1 text-xs text-muted-foreground italic">Note: {note}</div>}
                        </div>
                        {status && <StatusBadge status={status} />}
                        {test.type === 'number' && test.benchmarks && numVal !== undefined && (
                          <Badge className={
                            getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath') === 'Advanced'
                              ? 'bg-[hsl(var(--status-pass))] text-white text-xs'
                              : getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath') === 'Intermediate'
                              ? 'bg-[hsl(var(--status-restricted))] text-white text-xs'
                              : 'bg-[hsl(var(--status-issue))] text-white text-xs'
                          }>
                            {getStrengthLevel(numVal, test.benchmarks, test.id === 'counting_breath')}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}

        {/* Coach Notes */}
        {(coachNotes.movementCorrections || coachNotes.injuryPrecautions || coachNotes.trainingFocus) && (
          <Card className="p-6 print-break">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">📝 Coach Notes</h2>
            <div className="space-y-4 text-sm">
              {coachNotes.movementCorrections && (
                <div>
                  <div className="font-semibold text-foreground">Movement Corrections</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.movementCorrections}</p>
                </div>
              )}
              {coachNotes.injuryPrecautions && (
                <div>
                  <div className="font-semibold text-foreground">Injury Precautions</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.injuryPrecautions}</p>
                </div>
              )}
              {coachNotes.trainingFocus && (
                <div>
                  <div className="font-semibold text-foreground">Training Focus</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.trainingFocus}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
