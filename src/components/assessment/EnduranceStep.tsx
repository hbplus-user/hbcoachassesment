import { useAssessment } from '@/context/AssessmentContext';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function getAge(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

type OutputLevel = 'Low' | 'Average' | 'Good' | 'Very Good' | 'Poor Control' | 'Excellent' | 'Inadequate' | 'Adequate';

interface BenchmarkRange {
  max?: number;
  min?: number;
  label: OutputLevel;
  color: 'red' | 'yellow' | 'green' | 'emerald';
}

interface AgeRow {
  ageRange: string;
  ageMin: number;
  ageMax: number;
  threshold: number; // >= this = adequate
}

// Breath Hold benchmarks
const breathHoldMale: BenchmarkRange[] = [
  { max: 25, label: 'Low', color: 'red' },
  { min: 25, max: 40, label: 'Average', color: 'yellow' },
  { min: 40, max: 60, label: 'Good', color: 'green' },
  { min: 60, label: 'Very Good', color: 'emerald' },
];

const breathHoldFemale: BenchmarkRange[] = [
  { max: 20, label: 'Low', color: 'red' },
  { min: 20, max: 35, label: 'Average', color: 'yellow' },
  { min: 35, max: 50, label: 'Good', color: 'green' },
  { min: 50, label: 'Very Good', color: 'emerald' },
];

// Counting Breath benchmarks (all ages/genders)
const countingBreath: BenchmarkRange[] = [
  { max: 20, label: 'Poor Control', color: 'red' },
  { min: 20, max: 40, label: 'Average', color: 'yellow' },
  { min: 40, max: 60, label: 'Good', color: 'green' },
  { min: 60, label: 'Excellent', color: 'emerald' },
];

// Sit-to-Stand benchmarks by age and gender
const stsAgeMale: AgeRow[] = [
  { ageRange: '8–14', ageMin: 8, ageMax: 14, threshold: 14 },
  { ageRange: '10–15', ageMin: 10, ageMax: 15, threshold: 15 },
  { ageRange: '16–19', ageMin: 16, ageMax: 19, threshold: 17 },
  { ageRange: '20–29', ageMin: 20, ageMax: 29, threshold: 14 },
  { ageRange: '30–39', ageMin: 30, ageMax: 39, threshold: 14 },
  { ageRange: '40–49', ageMin: 40, ageMax: 49, threshold: 13 },
  { ageRange: '50–59', ageMin: 50, ageMax: 59, threshold: 12 },
  { ageRange: '60–69', ageMin: 60, ageMax: 69, threshold: 11 },
  { ageRange: '70–79', ageMin: 70, ageMax: 79, threshold: 10 },
  { ageRange: '80+', ageMin: 80, ageMax: 120, threshold: 8 },
];

const stsAgeFemale: AgeRow[] = [
  { ageRange: '7–12', ageMin: 7, ageMax: 12, threshold: 12 },
  { ageRange: '8–13', ageMin: 8, ageMax: 13, threshold: 13 },
  { ageRange: '9–16', ageMin: 9, ageMax: 16, threshold: 15 },
  { ageRange: '20–29', ageMin: 20, ageMax: 29, threshold: 12 },
  { ageRange: '30–39', ageMin: 30, ageMax: 39, threshold: 12 },
  { ageRange: '40–49', ageMin: 40, ageMax: 49, threshold: 11 },
  { ageRange: '50–59', ageMin: 50, ageMax: 59, threshold: 10 },
  { ageRange: '60–69', ageMin: 60, ageMax: 69, threshold: 9 },
  { ageRange: '70–79', ageMin: 70, ageMax: 79, threshold: 8 },
  { ageRange: '80+', ageMin: 80, ageMax: 120, threshold: 7 },
];

function getBreathHoldOutput(value: number, gender: string): { label: OutputLevel; color: string } {
  const ranges = gender === 'female' ? breathHoldFemale : breathHoldMale;
  for (const r of ranges) {
    if (r.max !== undefined && r.min === undefined && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max !== undefined && value >= r.min && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max === undefined && value >= r.min) return { label: r.label, color: r.color };
  }
  return { label: 'Low', color: 'red' };
}

function getCountingBreathOutput(value: number): { label: OutputLevel; color: string } {
  for (const r of countingBreath) {
    if (r.max !== undefined && r.min === undefined && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max !== undefined && value >= r.min && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max === undefined && value >= r.min) return { label: r.label, color: r.color };
  }
  return { label: 'Poor Control', color: 'red' };
}

function getStsOutput(value: number, gender: string, age: number | null): { label: OutputLevel; color: string; matchedAge?: string } {
  if (age === null) return { label: 'Inadequate', color: 'red' };
  const rows = gender === 'female' ? stsAgeFemale : stsAgeMale;
  const row = rows.find(r => age >= r.ageMin && age <= r.ageMax);
  if (!row) {
    // Default to last row if age is beyond range
    const lastRow = rows[rows.length - 1];
    return {
      label: value >= lastRow.threshold ? 'Adequate' : 'Inadequate',
      color: value >= lastRow.threshold ? 'green' : 'red',
      matchedAge: lastRow.ageRange,
    };
  }
  return {
    label: value >= row.threshold ? 'Adequate' : 'Inadequate',
    color: value >= row.threshold ? 'green' : 'red',
    matchedAge: row.ageRange,
  };
}

const outputColors: Record<string, string> = {
  red: 'bg-[hsl(var(--status-issue))] text-white',
  yellow: 'bg-[hsl(var(--status-restricted))] text-white',
  green: 'bg-[hsl(var(--status-pass))] text-white',
  emerald: 'bg-[hsl(145,60%,35%)] text-white',
};

export function EnduranceStep() {
  const { clientInfo, numericResults, setNumericResult } = useAssessment();
  const gender = clientInfo.gender || 'male';
  const age = getAge(clientInfo.dob);
  const genderLabel = gender === 'female' ? 'Female' : 'Male';

  const bhValue = numericResults['breath_hold_time'];
  const cbValue = numericResults['counting_breath_rate'];
  const stsValue = numericResults['sit_to_stand_reps'];

  const bhOutput = bhValue !== undefined ? getBreathHoldOutput(bhValue, gender) : null;
  const cbOutput = cbValue !== undefined ? getCountingBreathOutput(cbValue) : null;
  const stsOutput = stsValue !== undefined ? getStsOutput(stsValue, gender, age) : null;

  const bhRanges = gender === 'female' ? breathHoldFemale : breathHoldMale;
  const stsRows = gender === 'female' ? stsAgeFemale : stsAgeMale;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">❤️ Endurance Tests</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Enter findings for each test. Output is calculated based on {genderLabel} benchmarks
          {age !== null && <span> (Age: {age})</span>}.
        </p>
        {!clientInfo.dob && (
          <p className="text-[hsl(var(--status-restricted))] text-xs mt-1">
            ⚠️ Set Date of Birth in Client Info for age-based Sit-to-Stand benchmarks
          </p>
        )}
        {!clientInfo.gender && (
          <p className="text-[hsl(var(--status-restricted))] text-xs mt-1">
            ⚠️ Set Gender in Client Info for gender-specific benchmarks
          </p>
        )}
      </div>

      {/* BREATH HOLD TEST */}
      <Card className="overflow-hidden border-2 border-[hsl(220,30%,30%)]">
        <div className="bg-[hsl(220,30%,25%)] px-4 py-3">
          <h3 className="text-white font-bold text-center">
            LUNG CAPACITY — Breath-Hold (BHT) — {genderLabel}
          </h3>
        </div>

        {/* Benchmark Reference Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Benchmark</th>
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Output</th>
              </tr>
            </thead>
            <tbody>
              {bhRanges.map((r, i) => {
                const rangeText = r.min !== undefined && r.max !== undefined
                  ? `${r.min}–${r.max} sec`
                  : r.max !== undefined
                  ? `< ${r.max} sec`
                  : `${r.min}+ sec`;
                const isHighlighted = bhOutput?.label === r.label;
                return (
                  <tr key={i} className={`border-b border-border/30 ${isHighlighted ? 'bg-primary/10 font-semibold' : ''}`}>
                    <td className="py-2 px-3 text-foreground">{rangeText}</td>
                    <td className="py-2 px-3">
                      <Badge className={`${outputColors[r.color]} text-xs`}>{r.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Finding Input */}
        <div className="px-4 py-3 bg-muted/20 border-t border-border flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">Finding:</span>
          <Input
            type="number"
            value={bhValue ?? ''}
            onChange={e => e.target.value !== '' && setNumericResult('breath_hold_time', Number(e.target.value))}
            placeholder="Enter seconds"
            className="w-32 h-9 text-sm"
          />
          <span className="text-xs text-muted-foreground">sec</span>
          {bhOutput && (
            <Badge className={`${outputColors[bhOutput.color]} text-xs ml-auto`}>
              {bhOutput.label}
            </Badge>
          )}
        </div>
      </Card>

      {/* COUNTING BREATH TEST */}
      <Card className="overflow-hidden border-2 border-[hsl(220,30%,30%)]">
        <div className="bg-[hsl(220,30%,25%)] px-4 py-3">
          <h3 className="text-white font-bold text-center">
            BREATH CONTROL — Counting Test — All Ages
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Benchmark</th>
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Output</th>
              </tr>
            </thead>
            <tbody>
              {countingBreath.map((r, i) => {
                const rangeText = r.min !== undefined && r.max !== undefined
                  ? `${r.min}–${r.max}`
                  : r.max !== undefined
                  ? `< ${r.max}`
                  : `> ${r.min}`;
                const isHighlighted = cbOutput?.label === r.label;
                return (
                  <tr key={i} className={`border-b border-border/30 ${isHighlighted ? 'bg-primary/10 font-semibold' : ''}`}>
                    <td className="py-2 px-3 text-foreground">{rangeText}</td>
                    <td className="py-2 px-3">
                      <Badge className={`${outputColors[r.color]} text-xs`}>{r.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-muted/20 border-t border-border flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">Finding:</span>
          <Input
            type="number"
            value={cbValue ?? ''}
            onChange={e => e.target.value !== '' && setNumericResult('counting_breath_rate', Number(e.target.value))}
            placeholder="Enter count"
            className="w-32 h-9 text-sm"
          />
          {cbOutput && (
            <Badge className={`${outputColors[cbOutput.color]} text-xs ml-auto`}>
              {cbOutput.label}
            </Badge>
          )}
        </div>
      </Card>

      {/* SIT-TO-STAND TEST */}
      <Card className="overflow-hidden border-2 border-[hsl(220,30%,30%)]">
        <div className="bg-[hsl(220,30%,25%)] px-4 py-3">
          <h3 className="text-white font-bold text-center">
            SIT-TO-STAND — 30-sec STS — {genderLabel}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Age Range</th>
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Benchmark (≥ reps)</th>
                <th className="py-2 px-3 text-left text-xs font-bold text-muted-foreground uppercase">Output</th>
              </tr>
            </thead>
            <tbody>
              {stsRows.map((row, i) => {
                const isActiveAge = age !== null && age >= row.ageMin && age <= row.ageMax;
                return (
                  <tr key={i} className={`border-b border-border/30 ${isActiveAge ? 'bg-primary/10 font-semibold' : ''}`}>
                    <td className="py-2 px-3 text-foreground">
                      {row.ageRange}
                      {isActiveAge && <span className="ml-2 text-xs text-primary">← Your age</span>}
                    </td>
                    <td className="py-2 px-3 text-foreground">≥ {row.threshold}</td>
                    <td className="py-2 px-3">
                      {isActiveAge && stsOutput ? (
                        <Badge className={`${outputColors[stsOutput.color]} text-xs`}>{stsOutput.label}</Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-muted/20 border-t border-border flex items-center gap-4">
          <span className="text-sm font-semibold text-foreground whitespace-nowrap">Finding:</span>
          <Input
            type="number"
            value={stsValue ?? ''}
            onChange={e => e.target.value !== '' && setNumericResult('sit_to_stand_reps', Number(e.target.value))}
            placeholder="Enter reps"
            className="w-32 h-9 text-sm"
          />
          <span className="text-xs text-muted-foreground">reps in 30 sec</span>
          {stsOutput && (
            <Badge className={`${outputColors[stsOutput.color]} text-xs ml-auto`}>
              {stsOutput.label}
            </Badge>
          )}
        </div>
      </Card>
    </div>
  );
}
