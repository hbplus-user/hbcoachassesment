import { useEffect, useState } from 'react';
import { useAssessment, ClientInfo } from '@/context/AssessmentContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

export function ClientInfoStep() {
  const { clientInfo, setClientInfo } = useAssessment();
  const [coaches, setCoaches] = useState<{ id: string; name: string }[]>([]);
  const [loadingCoaches, setLoadingCoaches] = useState(true);

  useEffect(() => {
    async function fetchCoaches() {
      try {
        const { data, error } = await supabase
          .from('coaches')
          .select('id, name')
          .order('name');
        
        if (error) throw error;
        setCoaches(data || []);
      } catch (error) {
        console.error('Error fetching coaches:', error);
      } finally {
        setLoadingCoaches(false);
      }
    }
    
    fetchCoaches();
  }, []);

  const update = (field: keyof ClientInfo, value: string) => {
    setClientInfo({ ...clientInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Client Information</h2>
        <p className="text-muted-foreground mt-1">Enter the client's basic details before starting the assessment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name *</Label>
          <Input id="clientName" value={clientInfo.clientName} onChange={e => update('clientName', e.target.value)} placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coachName">Coach Name *</Label>
          <Select 
            value={clientInfo.coachName} 
            onValueChange={v => update('coachName', v)}
            disabled={loadingCoaches}
          >
            <SelectTrigger id="coachName">
              <SelectValue placeholder={loadingCoaches ? "Loading coaches..." : "Select a coach"} />
            </SelectTrigger>
            <SelectContent>
              {coaches.map(coach => (
                <SelectItem key={coach.id} value={coach.name}>
                  {coach.name}
                </SelectItem>
              ))}
              {coaches.length === 0 && !loadingCoaches && (
                <SelectItem value="No coaches found" disabled>
                  No coaches found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Assessment Date</Label>
          <Input id="date" type="date" value={clientInfo.date} onChange={e => update('date', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" value={clientInfo.dob} onChange={e => update('dob', e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={clientInfo.gender} onValueChange={v => update('gender', v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="uhid">UHID</Label>
          <Input id="uhid" value={clientInfo.uhid} onChange={e => update('uhid', e.target.value)} placeholder="Enter UHID" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="injuryNotes">Injury Notes / Medical History</Label>
        <Textarea id="injuryNotes" value={clientInfo.injuryNotes} onChange={e => update('injuryNotes', e.target.value)} placeholder="Note any existing injuries, medical conditions, or precautions..." rows={4} />
      </div>
    </div>
  );
}
