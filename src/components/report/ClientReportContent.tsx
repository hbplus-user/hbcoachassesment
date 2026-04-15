import { forwardRef } from 'react';
import { useAssessment } from '@/context/AssessmentContext';
import { allSections, getAllParameters, getParameterOption, getStrengthLevelInfo, calculateAge, getBreathHoldOutput, getCountingBreathOutput, getStsOutput } from '@/data/assessmentData';
import { Card } from '@/components/ui/card';

export const ClientReportContent = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const { clientInfo, dropdownResults, numericResults, coachNotes } = useAssessment();
  const gender = clientInfo?.gender?.toLowerCase() || '';
  const age = calculateAge(clientInfo?.dob);

  // Collect red flags / issues
  const issues: { section: string; testName: string; paramName: string; severity: 'painful' | 'restricted' }[] = [];

  for (const section of allSections) {
    const params = getAllParameters(section, gender, age);
    for (const { param, testName } of params) {
      if (param.type === 'dropdown') {
        const val = dropdownResults[param.id];
        if (val) {
          const option = getParameterOption(param, val);
          if (option?.severity === 'red') {
            issues.push({ section: section.name, testName, paramName: param.name, severity: 'painful' });
          } else if (option?.severity === 'yellow') {
            issues.push({ section: section.name, testName, paramName: param.name, severity: 'restricted' });
          }
        }
      } else if (param.type === 'number') {
        let enduranceBadge: { label: string; color: string } | null = null;
        const numVal = numericResults[param.id];
        
        if (numVal !== undefined) {
          if (param.id === 'breath_hold_time') enduranceBadge = getBreathHoldOutput(numVal, gender);
          else if (param.id === 'counting_breath_rate') enduranceBadge = getCountingBreathOutput(numVal);
          else if (param.id === 'sit_to_stand_reps') enduranceBadge = getStsOutput(numVal, gender, age);
        }

        if (enduranceBadge) {
          if (enduranceBadge.color === 'red') {
            issues.push({ section: section.name, testName, paramName: `${param.name} — ${enduranceBadge.label}`, severity: 'painful' });
          } else if (enduranceBadge.color === 'yellow') {
            issues.push({ section: section.name, testName, paramName: `${param.name} — ${enduranceBadge.label}`, severity: 'restricted' });
          }
        } else if (param.benchmarks && numVal !== undefined) {
          const info = getStrengthLevelInfo(numVal, param, param.id === 'counting_breath_rate');
          if (info.cssClass.includes('issue')) {
            issues.push({ section: section.name, testName, paramName: `${param.name} — ${info.level}`, severity: 'restricted' });
          }
        }
      }
    }
  }

  return (
    <div ref={ref} className="max-w-3xl mx-auto px-4 py-8 space-y-8 bg-background">
      {/* Client Details */}
      <Card className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center">
            <img src="/Favicon.svg" alt="HB Logo" className="h-12 w-auto mr-3" />
            Health Assessment
          </h2>
          <p className="text-muted-foreground">Personal Fitness Report</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="font-semibold text-muted-foreground">Client:</span> {clientInfo.clientName || '—'}</div>
          <div><span className="font-semibold text-muted-foreground">Date:</span> {clientInfo.date || '—'}</div>
          <div><span className="font-semibold text-muted-foreground">Coach:</span> {clientInfo.coachName || '—'}</div>
          <div><span className="font-semibold text-muted-foreground">DOB:</span> {clientInfo.dob || '—'}</div>
          <div><span className="font-semibold text-muted-foreground">UHID:</span> {clientInfo.uhid || '—'}</div>
        </div>
      </Card>

      {/* Areas Requiring Attention */}
      {issues.length > 0 && (
        <Card className="p-6 print-break">
          <h2 className="text-lg font-bold text-foreground mb-4">Areas Requiring Attention</h2>
          <div className="space-y-2">
            {issues.filter(i => i.severity === 'painful').map((issue, idx) => (
              <div key={`p-${idx}`} className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-[hsl(var(--status-issue))]/10 text-sm break-words whitespace-normal">
                <span>🔴</span>
                <span className="text-foreground font-medium">{issue.testName}</span>
                <span className="text-muted-foreground break-words whitespace-normal">— {issue.paramName}</span>
                <span className="text-muted-foreground text-xs ml-auto whitespace-nowrap">{issue.section}</span>
              </div>
            ))}
            {issues.filter(i => i.severity === 'restricted').map((issue, idx) => (
              <div key={`r-${idx}`} className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-[hsl(var(--status-restricted))]/10 text-sm break-words whitespace-normal">
                <span>⚠️</span>
                <span className="text-foreground font-medium">{issue.testName}</span>
                <span className="text-muted-foreground break-words whitespace-normal">— {issue.paramName}</span>
                <span className="text-muted-foreground text-xs ml-auto whitespace-nowrap">{issue.section}</span>
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
        HB+ Health Assessment Protocol • Generated {new Date().toLocaleDateString()}
      </div>
    </div>
  );
});

ClientReportContent.displayName = 'ClientReportContent';
