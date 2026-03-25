import { useAssessment } from '@/context/AssessmentContext';
import { Section, Parameter, getParameterStatus, getStrengthLevel } from '@/data/assessmentData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

function OutputFlag({ status }: { status: string }) {
  if (status === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white text-xs gap-1">✅ Pass</Badge>;
  if (status === 'restricted') return <Badge className="bg-[hsl(var(--status-restricted))] text-white text-xs gap-1">⚠️ Restricted</Badge>;
  if (status === 'painful') return <Badge className="bg-[hsl(var(--status-issue))] text-white text-xs gap-1">🔴 Painful</Badge>;
  return null;
}

function OutputLabel({ option }: { option: { status: string; label: string; description?: string } }) {
  const colorMap: Record<string, string> = {
    pass: 'text-[hsl(var(--status-pass))]',
    restricted: 'text-[hsl(var(--status-restricted))]',
    painful: 'text-[hsl(var(--status-issue))]',
  };
  const iconMap: Record<string, string> = {
    pass: '✓',
    restricted: '△',
    painful: '●',
  };
  return (
    <span className={`text-xs font-semibold ${colorMap[option.status] || ''}`}>
      {iconMap[option.status]} {option.label}
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Advanced: 'bg-[hsl(var(--status-pass))] text-white',
    Intermediate: 'bg-[hsl(var(--status-restricted))] text-white',
    Beginner: 'bg-[hsl(var(--status-issue))] text-white',
  };
  return <Badge className={`${colors[level] || ''} text-xs`}>{level}</Badge>;
}

function ParameterRow({ param }: { param: Parameter }) {
  const { dropdownResults, numericResults, setDropdownResult, setNumericResult } = useAssessment();

  const dropdownVal = dropdownResults[param.id];
  const numericVal = numericResults[param.id];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-2 px-3 rounded-md bg-muted/40 border border-border/50">
      <div className="sm:w-40 shrink-0">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {param.name}
        </Label>
      </div>

      <div className="flex-1">
        {param.type === 'dropdown' && param.options && (
          <Select value={dropdownVal || ''} onValueChange={v => setDropdownResult(param.id, v)}>
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Select benchmark..." />
            </SelectTrigger>
            <SelectContent>
              {param.options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {param.type === 'number' && (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={numericVal ?? ''}
              onChange={e => {
                const val = e.target.value;
                if (val === '') return;
                setNumericResult(param.id, Number(val));
              }}
              placeholder={`Enter ${param.unit || 'value'}`}
              className="w-32 h-9 text-sm"
            />
            {param.unit && <span className="text-xs text-muted-foreground">{param.unit}</span>}
          </div>
        )}
      </div>

      <div className="sm:w-28 shrink-0 flex justify-end">
        {param.type === 'dropdown' && dropdownVal && (
          <OutputFlag status={getParameterStatus(param, dropdownVal)} />
        )}
        {param.type === 'number' && param.benchmarks && numericVal !== undefined && (
          <LevelBadge level={getStrengthLevel(
            numericVal,
            param.benchmarks,
            param.id === 'counting_breath_rate'
          )} />
        )}
      </div>
    </div>
  );
}

interface Props {
  section: Section;
}

export function SectionStep({ section }: Props) {
  const { testNotes, setTestNote } = useAssessment();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{section.icon} {section.name}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select the appropriate benchmark for each parameter. Output flags update automatically.
        </p>
      </div>

      {section.subsections?.map(sub => (
        <div key={sub.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">{sub.name}</h3>

          {sub.tests.map(test => (
            <div key={test.id} className="space-y-2">
              <h4 className="text-sm font-bold text-foreground ml-1">{test.name}</h4>
              <div className="space-y-1">
                {test.parameters.map(param => (
                  <ParameterRow key={param.id} param={param} />
                ))}
              </div>
              <Textarea
                value={testNotes[test.id] || ''}
                onChange={e => setTestNote(test.id, e.target.value)}
                placeholder="Coach notes (optional)..."
                rows={2}
                className="text-sm mt-1"
              />
            </div>
          ))}
        </div>
      ))}

      {section.tests && (
        <div className="space-y-4">
          {section.tests.map(test => (
            <div key={test.id} className="space-y-2">
              <h4 className="text-sm font-bold text-foreground ml-1">{test.name}</h4>
              <div className="space-y-1">
                {test.parameters.map(param => (
                  <ParameterRow key={param.id} param={param} />
                ))}
              </div>
              <Textarea
                value={testNotes[test.id] || ''}
                onChange={e => setTestNote(test.id, e.target.value)}
                placeholder="Coach notes (optional)..."
                rows={2}
                className="text-sm mt-1"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
