import { useAssessment } from '@/context/AssessmentContext';
import { amrapProtocols, amrapScoringGuide } from '@/data/assessmentData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

function ScoringFlag({ status }: { status: string }) {
  if (status === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white text-xs">✅ Good</Badge>;
  if (status === 'restricted') return <Badge className="bg-[hsl(var(--status-restricted))] text-white text-xs">⚠️ Moderate</Badge>;
  if (status === 'painful') return <Badge className="bg-[hsl(var(--status-issue))] text-white text-xs">🔴 Poor</Badge>;
  return null;
}

export function AmrapStep() {
  const {
    amrapProtocol, setAmrapProtocol,
    amrapExerciseNotes, setAmrapExerciseNote,
    amrapExerciseReps, setAmrapExerciseRep,
    dropdownResults, setDropdownResult,
  } = useAssessment();

  const selectedProtocol = amrapProtocols.find(p => p.id === amrapProtocol) || amrapProtocols[0];

  const protocolColors: Record<string, string> = {
    standard: 'border-[hsl(170,50%,40%)] bg-[hsl(170,50%,95%)]',
    knee_safe: 'border-[hsl(30,90%,50%)] bg-[hsl(30,90%,96%)]',
    back_safe: 'border-[hsl(10,80%,55%)] bg-[hsl(10,80%,96%)]',
  };

  const headerColors: Record<string, string> = {
    standard: 'bg-[hsl(170,50%,35%)] text-white',
    knee_safe: 'bg-[hsl(30,90%,50%)] text-white',
    back_safe: 'bg-[hsl(10,80%,50%)] text-white',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">⏱️ AMRAP Conditioning Test</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select the protocol and record exercise performance.
        </p>
      </div>

      {/* Protocol Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">Select Protocol</Label>
        <div className="flex flex-wrap gap-2">
          {amrapProtocols.map(protocol => (
            <button
              key={protocol.id}
              onClick={() => setAmrapProtocol(protocol.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                amrapProtocol === protocol.id
                  ? `${protocolColors[protocol.id]} border-opacity-100 shadow-md`
                  : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/60'
              }`}
            >
              {protocol.name}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Table */}
      <Card className={`overflow-hidden border-2 ${protocolColors[amrapProtocol]}`}>
        <div className={`px-4 py-3 ${headerColors[amrapProtocol]}`}>
          <h3 className="text-lg font-bold text-center">{selectedProtocol.name}</h3>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Primary Movement</div>
          <div className="col-span-3">Regression Option</div>
          <div className="col-span-2">Reps / Time</div>
          <div className="col-span-3">Coach Notes</div>
        </div>

        {/* Exercise Rows */}
        {selectedProtocol.exercises.map((exercise, idx) => {
          const key = `${amrapProtocol}_${idx}`;
          return (
            <div
              key={key}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 px-4 py-3 items-center ${
                idx % 2 === 0 ? 'bg-background/60' : 'bg-muted/20'
              } border-b border-border/30`}
            >
              <div className="md:col-span-2">
                <span className="md:hidden text-xs font-bold text-muted-foreground uppercase">Category: </span>
                <span className="text-sm font-semibold text-foreground">{exercise.category}</span>
              </div>
              <div className="md:col-span-2">
                <span className="md:hidden text-xs font-bold text-muted-foreground uppercase">Primary: </span>
                <span className="text-sm text-foreground">{exercise.primaryMovement}</span>
              </div>
              <div className="md:col-span-3">
                <span className="md:hidden text-xs font-bold text-muted-foreground uppercase">Regression: </span>
                <span className="text-sm text-muted-foreground">{exercise.regressionOption}</span>
              </div>
              <div className="md:col-span-2">
                <Input
                  value={amrapExerciseReps[key] ?? exercise.defaultRepsTime}
                  onChange={e => setAmrapExerciseRep(key, e.target.value)}
                  className="h-8 text-sm"
                  placeholder={exercise.defaultRepsTime}
                />
              </div>
              <div className="md:col-span-3">
                <Input
                  value={amrapExerciseNotes[key] ?? exercise.defaultCoachNotes}
                  onChange={e => setAmrapExerciseNote(key, e.target.value)}
                  className="h-8 text-sm"
                  placeholder={exercise.defaultCoachNotes}
                />
              </div>
            </div>
          );
        })}
      </Card>

      {/* AMRAP Scoring Guide */}
      <Card className="overflow-hidden border-2 border-[hsl(220,30%,30%)]">
        <div className="bg-[hsl(220,30%,25%)] px-4 py-3 text-white">
          <h3 className="text-lg font-bold text-center">AMRAP SCORING GUIDE</h3>
        </div>

        {/* Scoring Header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2 border-b border-border/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-2">Parameter</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-5">Output / Rating</div>
          <div className="col-span-2">Status</div>
        </div>

        {amrapScoringGuide.map((param, idx) => {
          const selectedValue = dropdownResults[param.id];
          const selectedOption = param.options.find(o => o.value === selectedValue);

          return (
            <div
              key={param.id}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 px-4 py-3 items-center ${
                idx % 2 === 0 ? 'bg-background/60' : 'bg-muted/20'
              } border-b border-border/30`}
            >
              <div className="md:col-span-2">
                <span className="text-sm font-semibold text-foreground">{param.name}</span>
              </div>
              <div className="md:col-span-3">
                <span className="text-xs text-muted-foreground">{param.description}</span>
              </div>
              <div className="md:col-span-5">
                <Select value={selectedValue || ''} onValueChange={v => setDropdownResult(param.id, v)}>
                  <SelectTrigger className="w-full h-9 text-sm">
                    <SelectValue placeholder="Select rating..." />
                  </SelectTrigger>
                  <SelectContent>
                    {param.options.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label} (Score: {opt.score})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex justify-end">
                {selectedOption && <ScoringFlag status={selectedOption.status} />}
              </div>
            </div>
          );
        })}

        {/* Total Score */}
        {(() => {
          const total = amrapScoringGuide.reduce((sum, param) => {
            const val = dropdownResults[param.id];
            const opt = param.options.find(o => o.value === val);
            return sum + (opt?.score ?? 0);
          }, 0);
          const answered = amrapScoringGuide.filter(p => dropdownResults[p.id]).length;

          if (answered === 0) return null;

          return (
            <div className="px-4 py-3 bg-muted/30 border-t border-border flex justify-between items-center">
              <span className="text-sm font-bold text-foreground">Total AMRAP Score</span>
              <span className="text-xl font-bold text-foreground">{total} / 12</span>
            </div>
          );
        })()}
      </Card>
    </div>
  );
}
