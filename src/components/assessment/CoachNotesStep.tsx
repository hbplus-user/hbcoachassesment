import { useAssessment, CoachNotes } from '@/context/AssessmentContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SERVICE_OPTIONS = [
  { value: 'compulsory', label: 'Compulsory' },
  { value: 'recommended', label: 'Recommended' },
];

function ServiceRow({
  label,
  field,
  coachNotes,
  update,
}: {
  label: string;
  field: keyof CoachNotes;
  coachNotes: CoachNotes;
  update: (field: keyof CoachNotes, value: string) => void;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <span className="font-semibold text-sm flex-1">{label}</span>
      <Select value={coachNotes[field] as string} onValueChange={v => update(field, v)}>
        <SelectTrigger className="w-36 h-8 text-sm bg-white">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {SERVICE_OPTIONS.map(o => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function CoachNotesStep() {
  const { coachNotes, setCoachNotes } = useAssessment();

  const update = (field: keyof CoachNotes, value: string) => {
    setCoachNotes({ ...coachNotes, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">📝 Coach Notes</h2>
        <p className="text-muted-foreground mt-1">Add any additional observations and recommendations.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="roadMap">Road Map</Label>
          <Textarea
            id="roadMap"
            value={coachNotes.roadMap}
            onChange={e => update('roadMap', e.target.value)}
            placeholder="Describe any movement patterns that need correction..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Coach Notes</Label>
          <Textarea
            id="notes"
            value={coachNotes.notes}
            onChange={e => update('notes', e.target.value)}
            placeholder="General observations and coaching notes..."
            rows={4}
          />
        </div>

        {/* HB+ Prescribed Services */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 bg-[#6b2c2c]">
            <p className="text-xs font-bold tracking-widest text-[#f5e6d3] uppercase">
              HB+ Prescribed Services
            </p>
          </div>
          <div className="divide-y divide-border bg-[#faf6f1]">

            <ServiceRow label="Strength & Conditioning" field="hbStrength"    coachNotes={coachNotes} update={update} />
            <ServiceRow label="Yoga"                    field="hbYoga"       coachNotes={coachNotes} update={update} />
            <ServiceRow label="Physiotherapy"           field="hbPhysio"     coachNotes={coachNotes} update={update} />
            <ServiceRow label="Mental Wellness"         field="hbMental"     coachNotes={coachNotes} update={update} />
            <ServiceRow label="Meditation"              field="hbMeditation" coachNotes={coachNotes} update={update} />

            {/* Free text row */}
            <div className="px-4 py-3">
              <Input
                value={coachNotes.hbNutritionApproach}
                onChange={e => update('hbNutritionApproach', e.target.value)}
                placeholder="Additional notes..."
                className="w-full h-9 text-sm bg-white"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
