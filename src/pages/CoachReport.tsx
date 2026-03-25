import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { allSections, getParameterOption, getStrengthLevelInfo, getSectionStatus, amrapProtocols, isVisible, calculateAge } from '@/data/assessmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

function StatusBadge({ severity, label }: { severity: string, label: string }) {
  if (severity === 'green') return <Badge className="bg-[hsl(var(--status-pass))] text-white text-xs">✅ {label}</Badge>;
  if (severity === 'yellow') return <Badge className="bg-[hsl(var(--status-restricted))] text-white text-xs">⚠️ {label}</Badge>;
  if (severity === 'red') return <Badge className="bg-[hsl(var(--status-issue))] text-white text-xs">🔴 {label}</Badge>;
  return <Badge variant="outline" className="text-xs">—</Badge>;
}

function SectionResultBadge({ result }: { result: 'pass' | 'limitation' | 'red_flag' }) {
  if (result === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white">✅ PASS</Badge>;
  if (result === 'limitation') return <Badge className="bg-[hsl(var(--status-restricted))] text-white">⚠️ LIMITED</Badge>;
  return <Badge className="bg-[hsl(var(--status-issue))] text-white">🔴 RED FLAG</Badge>;
}

export default function CoachReport() {
  const navigate = useNavigate();
  const { clientInfo, dropdownResults, numericResults, testNotes, coachNotes, amrapProtocol, amrapExerciseReps, amrapExerciseNotes } = useAssessment();
  const selectedProtocol = amrapProtocols.find(p => p.id === amrapProtocol) || amrapProtocols[0];
  const gender = clientInfo?.gender?.toLowerCase() || '';
  const age = calculateAge(clientInfo?.dob);

  const isVisibleLocally = (target: { id: string; minAge?: number; maxAge?: number }) => {
    return isVisible(target, gender, age);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card no-print">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Coach Detailed Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/report/client')}>View Client Report</Button>
            <Button variant="outline" onClick={() => navigate('/')}>← Back to Form</Button>
            <Button onClick={() => window.print()}>🖨️ Print / PDF</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
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

        {/* Assessment Sections as Tables */}
        {allSections.map(section => {
          const sectionResult = getSectionStatus(section, dropdownResults, numericResults, gender, age);

          return (
            <Card key={section.id} className="p-6 print-break">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground">{section.icon} {section.name}</h2>
                <SectionResultBadge result={sectionResult} />
              </div>

              {/* Table header */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Component</th>
                      <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Test</th>
                      <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Parameter</th>
                      <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Benchmark / Finding</th>
                      <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.subsections?.filter(isVisibleLocally).map(sub =>
                      sub.tests.filter(isVisibleLocally).map(test =>
                        test.parameters.map((param, pIdx) => {
                          const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
                          const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
                          const selectedLabel = param.options?.find(o => o.value === val)?.label;
                          const option = val ? getParameterOption(param, val) : undefined;
                          const isInvert = param.id === 'counting_breath_rate';
                          const levelInfo = param.type === 'number' && param.benchmarks && numVal !== undefined
                            ? getStrengthLevelInfo(numVal, param, isInvert) : undefined;

                          return (
                            <tr key={param.id} className="border-b border-border/50 hover:bg-muted/30">
                              <td className="py-2 px-2 text-muted-foreground">{pIdx === 0 ? sub.name : ''}</td>
                              <td className="py-2 px-2 font-medium text-foreground">{pIdx === 0 ? test.name : ''}</td>
                              <td className="py-2 px-2 text-foreground">{param.name}</td>
                              <td className="py-2 px-2 text-foreground">
                                {selectedLabel || (numVal !== undefined ? `${numVal} ${param.unit || ''}` : '—')}
                              </td>
                              <td className="py-2 px-2">
                                {option && <StatusBadge severity={option.severity} label={option.outputFlag} />}
                                {levelInfo && (
                                  <Badge className={`text-xs ${levelInfo.cssClass}`}>{levelInfo.level}</Badge>
                                )}
                                {!option && !levelInfo && <span className="text-muted-foreground">—</span>}
                              </td>
                            </tr>
                          );
                        })
                      )
                    )}
                    {section.tests?.filter(isVisibleLocally).map(test =>
                      test.parameters.map((param, pIdx) => {
                        const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
                        const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
                        const selectedLabel = param.options?.find(o => o.value === val)?.label;
                        const option = val ? getParameterOption(param, val) : undefined;
                        const isInvert = param.id === 'counting_breath_rate';
                        const levelInfo = param.type === 'number' && param.benchmarks && numVal !== undefined
                          ? getStrengthLevelInfo(numVal, param, isInvert) : undefined;

                        return (
                          <tr key={param.id} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-2 px-2 text-muted-foreground">{section.component}</td>
                            <td className="py-2 px-2 font-medium text-foreground">{pIdx === 0 ? test.name : ''}</td>
                            <td className="py-2 px-2 text-foreground">{param.name}</td>
                            <td className="py-2 px-2 text-foreground">
                              {selectedLabel || (numVal !== undefined ? `${numVal} ${param.unit || ''}` : '—')}
                            </td>
                            <td className="py-2 px-2">
                              {option && <StatusBadge severity={option.severity} label={option.outputFlag} />}
                              {levelInfo && (
                                <Badge className={`text-xs ${levelInfo.cssClass}`}>{levelInfo.level}</Badge>
                              )}
                              {!option && !levelInfo && <span className="text-muted-foreground">—</span>}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Test notes */}
              {(() => {
                const allTests = [...(section.subsections?.flatMap(s => s.tests.filter(isVisibleLocally)) || []), ...(section.tests?.filter(isVisibleLocally) || [])];
                const notedTests = allTests.filter(t => testNotes[t.id]);
                if (notedTests.length === 0) return null;
                return (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Coach Notes</h4>
                    {notedTests.map(t => (
                      <div key={t.id} className="text-sm p-2 bg-muted/30 rounded">
                        <span className="font-medium text-foreground">{t.name}:</span>{' '}
                        <span className="text-muted-foreground italic">{testNotes[t.id]}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>
          );
        })}

        {/* AMRAP Exercise Protocol */}
        <Card className="p-6 print-break">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">⏱️ AMRAP Protocol: {selectedProtocol.name}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Category</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Primary Movement</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Regression</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Reps / Time</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase">Coach Notes</th>
                </tr>
              </thead>
              <tbody>
                {selectedProtocol.exercises.map((ex, idx) => {
                  const key = `${amrapProtocol}_${idx}`;
                  return (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium text-foreground">{ex.category}</td>
                      <td className="py-2 px-2 text-foreground">{ex.primaryMovement}</td>
                      <td className="py-2 px-2 text-muted-foreground">{ex.regressionOption}</td>
                      <td className="py-2 px-2 text-foreground">{amrapExerciseReps[key] || ex.defaultRepsTime}</td>
                      <td className="py-2 px-2 text-muted-foreground italic">{amrapExerciseNotes[key] || ex.defaultCoachNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </Card>

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
