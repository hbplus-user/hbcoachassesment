import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { allSections, getStatusFromDropdownValue, getStrengthLevel, calculateOverallScore, getSectionScore } from '@/data/assessmentData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ClientReport() {
  const navigate = useNavigate();
  const { clientInfo, dropdownResults, numericResults, coachNotes } = useAssessment();

  const overallScore = calculateOverallScore(dropdownResults, numericResults);

  // Collect red flags / issues
  const issues: { section: string; description: string; severity: 'issue' | 'restricted' }[] = [];

  for (const section of allSections) {
    const tests = section.tests || [];
    const subsectionTests = (section.subsections || []).flatMap(s => s.tests);
    const allTests = [...tests, ...subsectionTests];

    for (const test of allTests) {
      if (test.type === 'dropdown') {
        const val = dropdownResults[test.id];
        if (val) {
          const status = getStatusFromDropdownValue(test, val);
          if (status === 'issue') {
            issues.push({ section: section.name, description: test.name, severity: 'issue' });
          } else if (status === 'restricted') {
            issues.push({ section: section.name, description: test.name, severity: 'restricted' });
          }
        }
      } else if (test.type === 'number' && test.benchmarks) {
        const val = numericResults[test.id];
        if (val !== undefined) {
          const level = getStrengthLevel(val, test.benchmarks, test.id === 'counting_breath');
          if (level === 'Beginner') {
            issues.push({ section: section.name, description: `${test.name} — needs improvement`, severity: 'restricted' });
          }
        }
      }
    }
  }

  const sectionScores = allSections.map(s => ({
    name: s.name,
    icon: s.icon,
    score: getSectionScore(s.id, dropdownResults, numericResults),
  }));

  const scoreColor = overallScore >= 80
    ? 'text-[hsl(var(--status-pass))]'
    : overallScore >= 60
    ? 'text-[hsl(var(--status-restricted))]'
    : 'text-[hsl(var(--status-issue))]';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card no-print">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Health Assessment Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/report/coach')}>Coach Report</Button>
            <Button variant="outline" onClick={() => navigate('/')}>← Back</Button>
            <Button onClick={() => window.print()}>🖨️ Print / PDF</Button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Client Details */}
        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">HB Health Assessment</h2>
            <p className="text-muted-foreground">Personal Fitness Report</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="font-semibold text-muted-foreground">Client:</span> {clientInfo.clientName || '—'}</div>
            <div><span className="font-semibold text-muted-foreground">Date:</span> {clientInfo.date || '—'}</div>
            <div><span className="font-semibold text-muted-foreground">Coach:</span> {clientInfo.coachName || '—'}</div>
            <div><span className="font-semibold text-muted-foreground">DOB:</span> {clientInfo.dob || '—'}</div>
          </div>
        </Card>

        {/* Overall Score */}
        <Card className="p-6 text-center">
          <h2 className="text-lg font-bold text-foreground mb-4">Overall Fitness Score</h2>
          <div className={`text-6xl font-black ${scoreColor}`}>{overallScore}</div>
          <div className="text-muted-foreground text-sm mt-1">out of 100</div>
          <Progress value={overallScore} className="mt-4 h-3 max-w-xs mx-auto" />
        </Card>

        {/* Section Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Assessment Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sectionScores.map(s => {
              const color = s.score === 'Good'
                ? 'border-[hsl(var(--status-pass))]/30 bg-[hsl(var(--status-pass))]/5'
                : s.score === 'Average'
                ? 'border-[hsl(var(--status-restricted))]/30 bg-[hsl(var(--status-restricted))]/5'
                : 'border-[hsl(var(--status-issue))]/30 bg-[hsl(var(--status-issue))]/5';
              const icon = s.score === 'Good' ? '✅' : s.score === 'Average' ? '⚠️' : s.score === 'N/A' ? '—' : '🔴';

              return (
                <div key={s.name} className={`p-3 rounded-lg border ${color} flex items-center justify-between`}>
                  <span className="text-sm font-medium text-foreground">{s.icon} {s.name}</span>
                  <span className="text-sm font-semibold">{icon} {s.score}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Areas Requiring Attention */}
        {issues.length > 0 && (
          <Card className="p-6 print-break">
            <h2 className="text-lg font-bold text-foreground mb-4">Areas Requiring Attention</h2>
            <div className="space-y-2">
              {issues.filter(i => i.severity === 'issue').map((issue, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[hsl(var(--status-issue))]/10 text-sm">
                  <span>🔴</span>
                  <span className="text-foreground">{issue.description}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{issue.section}</span>
                </div>
              ))}
              {issues.filter(i => i.severity === 'restricted').map((issue, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-[hsl(var(--status-restricted))]/10 text-sm">
                  <span>⚠️</span>
                  <span className="text-foreground">{issue.description}</span>
                  <span className="text-muted-foreground text-xs ml-auto">{issue.section}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {issues.length === 0 && (
          <Card className="p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <h2 className="text-lg font-bold text-foreground">All Clear!</h2>
            <p className="text-muted-foreground text-sm">No significant areas of concern found in this assessment.</p>
          </Card>
        )}

        {/* Coach Recommendations */}
        {(coachNotes.movementCorrections || coachNotes.injuryPrecautions || coachNotes.trainingFocus) && (
          <Card className="p-6 print-break">
            <h2 className="text-lg font-bold text-foreground mb-4">Coach Recommendations</h2>
            <div className="space-y-4 text-sm">
              {coachNotes.movementCorrections && (
                <div>
                  <div className="font-semibold text-foreground">Movement Focus</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.movementCorrections}</p>
                </div>
              )}
              {coachNotes.injuryPrecautions && (
                <div>
                  <div className="font-semibold text-foreground">Precautions</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.injuryPrecautions}</p>
                </div>
              )}
              {coachNotes.trainingFocus && (
                <div>
                  <div className="font-semibold text-foreground">Training Priorities</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.trainingFocus}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        <div className="text-center text-xs text-muted-foreground py-4">
          HB Health Assessment Protocol • Generated {new Date().toLocaleDateString()}
        </div>
      </main>
    </div>
  );
}
