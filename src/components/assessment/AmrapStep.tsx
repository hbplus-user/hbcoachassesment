import { useAssessment } from '@/context/AssessmentContext';
import { amrapProtocols } from '@/data/assessmentData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function AmrapStep() {
  const {
    amrapProtocol, setAmrapProtocol,
    amrapExerciseNotes, setAmrapExerciseNote,
    amrapExerciseReps, setAmrapExerciseRep,
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

    </div>
  );
}
