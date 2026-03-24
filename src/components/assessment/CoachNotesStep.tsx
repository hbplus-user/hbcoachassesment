import { useAssessment, CoachNotes } from '@/context/AssessmentContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
          <Label htmlFor="movementCorrections">Movement Corrections</Label>
          <Textarea
            id="movementCorrections"
            value={coachNotes.movementCorrections}
            onChange={e => update('movementCorrections', e.target.value)}
            placeholder="Describe any movement patterns that need correction..."
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="injuryPrecautions">Injury Precautions</Label>
          <Textarea
            id="injuryPrecautions"
            value={coachNotes.injuryPrecautions}
            onChange={e => update('injuryPrecautions', e.target.value)}
            placeholder="Note any exercises or movements to avoid..."
            rows={4}
          />
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
      </div>
    </div>
  );
}
