import { useAssessment, CoachNotes } from '@/context/AssessmentContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

        <div className="space-y-3 rounded-lg border border-border p-4 bg-muted/20">
          <Label className="text-base font-semibold">Current Plan</Label>
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">Plan Type</Label>
              <Select value={coachNotes.currentPlanType} onValueChange={v => update('currentPlanType', v)}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-36 space-y-1">
              <Label className="text-xs text-muted-foreground uppercase tracking-wider">How Many Days</Label>
              <Input
                type="number"
                min={1}
                value={coachNotes.currentPlanDays}
                onChange={e => update('currentPlanDays', e.target.value)}
                placeholder="Days"
                className="h-9 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Suggest Plan</Label>
            <Textarea
              value={coachNotes.currentPlanSuggest}
              onChange={e => update('currentPlanSuggest', e.target.value)}
              placeholder="Suggest plan..."
              rows={4}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trainingFocus">Training Focus</Label>
          <Textarea
            id="trainingFocus"
            value={coachNotes.trainingFocus}
            onChange={e => update('trainingFocus', e.target.value)}
            placeholder="Recommended training priorities and focus areas..."
            rows={4}
          />
        </div>

        {/* HB+ Services Prescribed */}
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="px-4 py-3 bg-[#6b2c2c]">
            <p className="text-xs font-bold tracking-widest text-[#f5e6d3] uppercase">
              HB+ Services Prescribed (Tick all that apply and note frequency)
            </p>
          </div>
          <div className="divide-y divide-border bg-[#faf6f1]">

            {/* Strength & Conditioning */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
              <Checkbox
                checked={coachNotes.hbStrengthEnabled === 'true'}
                onCheckedChange={v => update('hbStrengthEnabled', v ? 'true' : '')}
              />
              <span className="font-semibold text-sm w-48 shrink-0">Strength & Conditioning</span>
              <span className="text-sm text-muted-foreground shrink-0">Sessions/week:</span>
              <Input
                type="number" min={1}
                value={coachNotes.hbStrengthSessions}
                onChange={e => update('hbStrengthSessions', e.target.value)}
                className="w-20 h-8 text-sm bg-white"
              />
            </div>

            {/* Yoga & Mobility */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
              <Checkbox
                checked={coachNotes.hbYogaEnabled === 'true'}
                onCheckedChange={v => update('hbYogaEnabled', v ? 'true' : '')}
              />
              <span className="font-semibold text-sm w-48 shrink-0">Yoga & Mobility</span>
              <span className="text-sm text-muted-foreground shrink-0">Sessions/week:</span>
              <Input
                type="number" min={1}
                value={coachNotes.hbYogaSessions}
                onChange={e => update('hbYogaSessions', e.target.value)}
                className="w-20 h-8 text-sm bg-white"
              />
            </div>

            {/* Physiotherapy / Movement Rehab */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3">
              <Checkbox
                checked={coachNotes.hbPhysioEnabled === 'true'}
                onCheckedChange={v => update('hbPhysioEnabled', v ? 'true' : '')}
              />
              <span className="font-semibold text-sm w-48 shrink-0">Physiotherapy / Movement Rehab</span>
              <span className="text-sm text-muted-foreground shrink-0">Sessions/week:</span>
              <Input
                type="number" min={1}
                value={coachNotes.hbPhysioSessions}
                onChange={e => update('hbPhysioSessions', e.target.value)}
                className="w-20 h-8 text-sm bg-white"
              />
            </div>


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
