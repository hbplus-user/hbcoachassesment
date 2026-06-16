import { useAssessment } from '@/context/AssessmentContext';
import { Section, Parameter, TestDefinition, getParameterOption, getStrengthLevelInfo, BenchmarkOption, calculateAge, isVisible } from '@/data/assessmentData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

function OutputFlag({ option }: { option?: BenchmarkOption }) {
  if (!option) return null;
  const { severity, outputFlag } = option;

  if (severity === 'green') return <Badge className="bg-[hsl(var(--status-pass))] text-white text-xs gap-1">✓ {outputFlag}</Badge>;
  if (severity === 'yellow') return <Badge className="bg-[hsl(var(--status-restricted))] text-white text-xs gap-1">⚠️ {outputFlag}</Badge>;
  if (severity === 'red') return <Badge className="bg-[hsl(var(--status-issue))] text-white text-xs gap-1">⚠️ {outputFlag}</Badge>;
  return null;
}

function LevelBadge({ info }: { info: { level: string, cssClass: string } }) {
  return <Badge className={`${info.cssClass} text-xs`}>{info.level}</Badge>;
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
          <div className="space-y-1">
            <Select value={dropdownVal || ''} onValueChange={v => setDropdownResult(param.id, v)}>
              <SelectTrigger className="w-full h-9 text-sm">
                <SelectValue placeholder="Select benchmark..." />
              </SelectTrigger>
              <SelectContent>
                {param.options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.description && (
                        <span className="text-xs text-muted-foreground">{opt.description}</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
          <OutputFlag option={getParameterOption(param, dropdownVal)} />
        )}
        {param.type === 'number' && param.benchmarks && numericVal !== undefined && (
          <LevelBadge info={getStrengthLevelInfo(
            numericVal,
            param,
            param.id === 'counting_breath_rate'
          )} />
        )}
      </div>
    </div>
  );
}

function BilateralParameterRow({ leftParam, rightParam }: { leftParam: Parameter; rightParam: Parameter }) {
  const { dropdownResults, setDropdownResult } = useAssessment();
  const leftVal = dropdownResults[leftParam.id];
  const rightVal = dropdownResults[rightParam.id];

  return (
    <div className="flex items-start gap-2 py-2 px-3 rounded-md bg-muted/40 border border-border/50">
      <div className="w-28 shrink-0 pt-2">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {leftParam.name}
        </Label>
      </div>
      <div className="flex-1 flex items-center gap-1 min-w-0">
        <Select value={leftVal || ''} onValueChange={v => setDropdownResult(leftParam.id, v)}>
          <SelectTrigger className="flex-1 h-9 text-sm min-w-0">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {leftParam.options?.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                <span>{opt.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="shrink-0">
          <OutputFlag option={leftVal ? getParameterOption(leftParam, leftVal) : undefined} />
        </div>
      </div>
      <div className="flex-1 flex items-center gap-1 min-w-0">
        <Select value={rightVal || ''} onValueChange={v => setDropdownResult(rightParam.id, v)}>
          <SelectTrigger className="flex-1 h-9 text-sm min-w-0">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {rightParam.options?.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                <span>{opt.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="shrink-0">
          <OutputFlag option={rightVal ? getParameterOption(rightParam, rightVal) : undefined} />
        </div>
      </div>
    </div>
  );
}

type TestGroup =
  | { type: 'single'; test: TestDefinition }
  | { type: 'paired'; left: TestDefinition; right: TestDefinition; name: string };

function groupTests(tests: TestDefinition[]): TestGroup[] {
  const groups: TestGroup[] = [];
  let i = 0;
  while (i < tests.length) {
    const test = tests[i];
    if (test.side === 'left' && i + 1 < tests.length && tests[i + 1].side === 'right') {
      groups.push({ type: 'paired', left: test, right: tests[i + 1], name: test.name });
      i += 2;
    } else {
      groups.push({ type: 'single', test });
      i++;
    }
  }
  return groups;
}

interface Props {
  section: Section;
}

export function SectionStep({ section }: Props) {
  const { testNotes, setTestNote, clientInfo } = useAssessment();
  const gender = clientInfo?.gender?.toLowerCase() || '';
  const age = calculateAge(clientInfo?.dob);

  const isVisibleLocally = (target: { id: string; minAge?: number; maxAge?: number }) => {
    return isVisible(target, gender, age);
  };

  const renderTestGroup = (group: TestGroup) => {
    if (group.type === 'single') {
      const { test } = group;
      return (
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
      );
    }

    const { left, right, name } = group;
    return (
      <div key={`${left.id}-${right.id}`} className="space-y-2">
        <h4 className="text-sm font-bold text-foreground ml-1">{name}</h4>
        <div className="flex items-center gap-2 px-3">
          <div className="w-28 shrink-0" />
          <div className="flex-1 text-center text-xs font-bold text-primary uppercase tracking-wider">Left</div>
          <div className="flex-1 text-center text-xs font-bold text-primary uppercase tracking-wider">Right</div>
        </div>
        <div className="space-y-1">
          {left.parameters.map((leftParam, i) => (
            <BilateralParameterRow
              key={leftParam.id}
              leftParam={leftParam}
              rightParam={right.parameters[i]}
            />
          ))}
        </div>
        <Textarea
          value={testNotes[left.id] || ''}
          onChange={e => setTestNote(left.id, e.target.value)}
          placeholder="Coach notes (optional)..."
          rows={2}
          className="text-sm mt-1"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{section.icon} {section.name}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Select the appropriate benchmark for each parameter. Output flags update automatically.
        </p>
      </div>

      {section.subsections?.filter(isVisibleLocally).map(sub => (
        <div key={sub.id} className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">{sub.name}</h3>
          {groupTests(sub.tests.filter(isVisibleLocally)).map(renderTestGroup)}
        </div>
      ))}

      {section.tests && (
        <div className="space-y-4">
          {groupTests(section.tests.filter(isVisibleLocally)).map(renderTestGroup)}
        </div>
      )}
    </div>
  );
}
