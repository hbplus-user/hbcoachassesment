import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClientReportContent } from '@/components/report/ClientReportContent';

export default function ClientReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card no-print">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Health Assessment Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/report/coach')}>Coach Report</Button>
            <Button variant="outline" onClick={() => navigate('/')}>← Back</Button>
            <Button onClick={() => window.print()}>🖨️ Print / PDF</Button>
          </div>
        </div>
      </header>
      <ClientReportContent />
    </div>
  );
}
