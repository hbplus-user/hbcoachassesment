import { useAssessment } from '@/context/AssessmentContext';
import { Section, getStatusFromDropdownValue, getStrengthLevel } from '@/data/assessmentData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

function StatusBadge({ status }: { status: string }) {
  if (status === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white">✅ Pass</Badge>;
  if (status === 'restricted') return <Badge className="bg-[hsl(var(--status-restricted))] text-white">⚠️ Restricted</Badge>;
  if (status === 'issue') return <Badge className="bg-[hsl(var(--status-issue))] text-white">🔴 Issue</Badge>;
  return null;
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Advanced: 'bg-[hsl(var(--status-pass))] text-white',
    Intermediate: 'bg-[hsl(var(--status-restricted))] text-white',
    Beginner: 'bg-[hsl(var(--status-issue))] text-white',
  };
  return <Badge className={colors[level] || ''}>{level}</Badge>;
}

interface Props {
  section: Section;
}

export function SectionStep({ section }: Props) {
  const { dropdownResults, numericResults, testNotes, setDropdownResult, setNumericResult, setTestNote } = useAssessment();

  const renderTest = (test: (typeof section.tests extends (infer T)[] | undefined ? T : never)) => {
    if (!test) return null;

    return (
      <div key={test.id} className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Label className="text-sm font-semibold text-foreground">{test.name}</Label>
          {test.type === 'dropdown' && dropdownResults[test.id] && (
            <StatusBadge status={getStatusFromDropdownValue(test, dropdownResults[test.id])} />
          )}
          {test.type === 'number' && test.benchmarks && numericResults[test.id] !== undefined && (
            <LevelBadge level={getStrengthLevel(
              numericResults[test.id],
              test.benchmarks,
              test.id === 'counting_breath'
            )} />
          )}
        </div>

        {test.type === 'dropdown' && test.options && (
          <Select value={dropdownResults[test.id] || ''} onValueChange={v => setDropdownResult(test.id, v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select result..." />
            </SelectTrigger>
            <SelectContent>
              {test.options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {test.type === 'number' && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={numericResults[test.id] ?? ''}
              onChange={e => {
                const val = e.target.value;
                if (val === '') return;
                setNumericResult(test.id, Number(val));
              }}
              placeholder={`Enter ${test.unit || 'value'}`}
              className="w-40"
            />
            {test.unit && <span className="text-sm text-muted-foreground">{test.unit}</span>}
          </div>
        )}

        <Textarea
          value={testNotes[test.id] || ''}
          onChange={e => setTestNote(test.id, e.target.value)}
          placeholder="Coach notes (optional)..."
          rows={2}
          className="text-sm"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{section.icon} {section.name}</h2>
        <p className="text-muted-foreground mt-1">Complete each test below and select the appropriate result.</p>
      </div>

      {section.subsections?.map(sub => (
        <div key={sub.id} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">{sub.name}</h3>
          <div className="grid grid-cols-1 gap-3">
            {sub.tests.map(renderTest)}
          </div>
        </div>
      ))}

      {section.tests && (
        <div className="grid grid-cols-1 gap-3">
          {section.tests.map(renderTest)}
        </div>
      )}
    </div>
  );
}
