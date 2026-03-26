import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAssessment } from '@/context/AssessmentContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { allSections, getParameterOption, getStrengthLevelInfo, getSectionStatus, amrapProtocols, isVisible, calculateAge } from '@/data/assessmentData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getBreathHoldOutput, getCountingBreathOutput, getStsOutput } from '@/data/assessmentData';
import { buildCoachReportHtml } from '@/lib/buildReportHtml';

function StatusBadge({ severity, label }: { severity: string, label: string }) {
  const base = 'inline-block text-[10px] font-semibold px-2 py-0.5 rounded text-white leading-tight break-words whitespace-normal max-w-full';
  if (severity === 'green') return <span className={`${base} bg-[hsl(var(--status-pass))]`}>{label}</span>;
  if (severity === 'yellow') return <span className={`${base} bg-[hsl(var(--status-restricted))]`}>{label}</span>;
  if (severity === 'red') return <span className={`${base} bg-[hsl(var(--status-issue))]`}>{label}</span>;
  return <span className={`${base} bg-muted text-muted-foreground`}>—</span>;
}

function SectionResultBadge({ result }: { result: 'pass' | 'limitation' | 'red_flag' }) {
  if (result === 'pass') return <Badge className="bg-[hsl(var(--status-pass))] text-white">✅ PASS</Badge>;
  if (result === 'limitation') return <Badge className="bg-[hsl(var(--status-restricted))] text-white">⚠️ LIMITED</Badge>;
  return <Badge className="bg-[hsl(var(--status-issue))] text-white">🔴 RED FLAG</Badge>;
}

/** Renders an HTML string into a hidden div, captures it with html2canvas and saves as PDF */
async function htmlStringToPdfBlob(htmlString: string, filename: string): Promise<Blob> {
  // @ts-ignore
  const html2canvas = (await import('html2canvas')).default;
  // @ts-ignore
  const { jsPDF } = await import('jspdf');

  const PDF_WIDTH_PX = 794;

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: ${PDF_WIDTH_PX}px;
    background: white;
    z-index: -99999;
    pointer-events: none;
    overflow: visible;
  `;
  container.innerHTML = htmlString;
  document.body.appendChild(container);

  // Wait for images and fonts to load
  await new Promise(resolve => setTimeout(resolve, 500)); 

  try {
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableW = pageW - margin * 2;

    const sections = Array.from(container.querySelectorAll('.pdf-section'));
    let currentY = margin;
    let isFirstPage = true;

    for (let i = 0; i < sections.length; i++) {
      const el = sections[i] as HTMLElement;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgPixelW = canvas.width / 2;
      const mmPerPx = usableW / imgPixelW;
      const sectionHeightMm = (canvas.height / 2) * mmPerPx;

      // If the section exceeds the remaining page height, start a new page
      // unless it's the very first item on a fresh page (to avoid endless blank pages if an item is bigger than 1 page)
      if (currentY + sectionHeightMm > pageH - margin) {
        if (!isFirstPage && currentY > margin) {
          pdf.addPage();
          currentY = margin;
        }
      }

      pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', margin, currentY, usableW, sectionHeightMm);
      currentY += sectionHeightMm + 4; // Add a small 4mm gap between cards
      isFirstPage = false;
    }

    pdf.save(filename);
    return pdf.output('blob');
  } finally {
    document.body.removeChild(container);
  }
}


export default function CoachReport() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramId = searchParams.get('id');
  const assessmentId = location.state?.assessmentId || paramId;
  const reportRef = useRef<HTMLElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const assessmentCtx = useAssessment();
  const { clientInfo, dropdownResults, numericResults, testNotes, coachNotes, amrapProtocol, amrapExerciseReps, amrapExerciseNotes, loadFullState } = assessmentCtx;

  useEffect(() => {
    if (paramId && !clientInfo.clientName) {
      const loadData = async () => {
        setIsLoadingData(true);
        try {
          const { data, error } = await supabase.from('assessments').select('data').eq('id', paramId).single();
          if (error) throw error;
          if (data && data.data) {
            loadFullState(data.data as any);
          }
        } catch (err) {
          console.error('Error loading assessment data:', err);
          toast.error('Failed to load assessment data');
        } finally {
          setIsLoadingData(false);
        }
      };
      loadData();
    }
  }, [paramId, clientInfo.clientName, loadFullState]);

  if (isLoadingData) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-xl font-semibold text-muted-foreground animate-pulse">Loading assessment data...</div></div>;
  }
  const selectedProtocol = amrapProtocols.find(p => p.id === amrapProtocol) || amrapProtocols[0];
  const gender = clientInfo?.gender?.toLowerCase() || '';
  const age = calculateAge(clientInfo?.dob);

  const isVisibleLocally = (target: { id: string; minAge?: number; maxAge?: number }) => {
    return isVisible(target, gender, age);
  };

  const handleGenerateAndSavePdf = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Generating PDFs...');

    try {
      toast.loading('Generating Coach PDF...', { id: toastId });
      const coachHtml = buildCoachReportHtml(assessmentCtx);
      const coachFilename = `${clientInfo.clientName.replace(/\s+/g, '_')}_Coach_Report.pdf`;
      const coachPdfBlob = await htmlStringToPdfBlob(coachHtml, coachFilename);

      toast.loading('Generating Client PDF...', { id: toastId });
      const clientHtml = buildCoachReportHtml(assessmentCtx, { isClientReport: true });
      const clientFilename = `${clientInfo.clientName.replace(/\s+/g, '_')}_Client_Report.pdf`;
      const clientPdfBlob = await htmlStringToPdfBlob(clientHtml, clientFilename);

      if (assessmentId && clientPdfBlob) {
        toast.loading('Uploading to database...', { id: toastId });
        const clientFileName = `${assessmentId}_client_${Date.now()}.pdf`;
        const { error: clientUploadError } = await supabase.storage
          .from('assessment_pdfs')
          .upload(clientFileName, clientPdfBlob, { contentType: 'application/pdf', upsert: false });
        if (clientUploadError) throw clientUploadError;

        const coachFileName = `${assessmentId}_coach_${Date.now()}.pdf`;
        const { error: coachUploadError } = await supabase.storage
          .from('assessment_pdfs')
          .upload(coachFileName, coachPdfBlob, { contentType: 'application/pdf', upsert: false });
        if (coachUploadError) throw coachUploadError;

        const { data: publicUrlData } = supabase.storage.from('assessment_pdfs').getPublicUrl(coachFileName);
        const { error: updateError } = await supabase
          .from('assessments')
          .update({ pdf_url: publicUrlData.publicUrl })
          .eq('id', assessmentId);
        if (updateError) throw updateError;

        toast.success('Both PDFs downloaded and saved!', { id: toastId });
      } else {
        toast.success('PDF downloaded!', { id: toastId });
      }
    } catch (error: any) {
      console.error('Error with PDF:', error);
      toast.error(error.message || 'Failed to generate PDF.', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <header className="border-b border-border bg-card no-print">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Coach Detailed Report</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/report/client')}>View Client Report</Button>
            <Button variant="outline" onClick={() => navigate('/')}>← Back to Form</Button>
            <Button onClick={handleGenerateAndSavePdf} disabled={isGenerating}>
              {isGenerating ? 'Processing...' : '🖨️ Download & Save PDF'}
            </Button>
          </div>
        </div>
      </header>

      <main ref={reportRef} className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Client Info */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">Client Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold text-muted-foreground">Client:</span> <span className="text-foreground">{clientInfo.clientName || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Coach:</span> <span className="text-foreground">{clientInfo.coachName || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Date:</span> <span className="text-foreground">{clientInfo.date || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">DOB:</span> <span className="text-foreground">{clientInfo.dob || '—'}</span></div>
            <div><span className="font-semibold text-muted-foreground">Gender:</span> <span className="text-foreground capitalize">{clientInfo.gender || '—'}</span></div>
          </div>
          {clientInfo.injuryNotes && (
            <div className="mt-4 p-3 bg-destructive/10 rounded-lg text-sm">
              <span className="font-semibold text-destructive">Injury Notes:</span> {clientInfo.injuryNotes}
            </div>
          )}
        </Card>

        {/* Assessment Sections as Tables */}
        {allSections.map(section => {
          const sectionResult = getSectionStatus(section, dropdownResults, numericResults, gender, age);

          return (
            <Card key={section.id} className="p-6 print-break">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
                <h2 className="text-lg font-bold text-foreground">{section.icon} {section.name}</h2>
                <SectionResultBadge result={sectionResult} />
              </div>

              {/* Table header */}
              <div className="w-full">
                <table className="w-full text-sm table-fixed break-words whitespace-normal">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-2 px-1 text-muted-foreground font-semibold text-xs uppercase w-[12%]">Component</th>
                      <th className="py-2 px-1 text-muted-foreground font-semibold text-xs uppercase w-[18%]">Test</th>
                      <th className="py-2 px-1 text-muted-foreground font-semibold text-xs uppercase w-[18%]">Parameter</th>
                      <th className="py-2 px-1 text-muted-foreground font-semibold text-xs uppercase w-[30%]">Benchmark / Finding</th>
                      <th className="py-2 px-1 text-muted-foreground font-semibold text-xs uppercase w-[22%]">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.subsections?.filter(isVisibleLocally).map(sub =>
                      sub.tests.filter(isVisibleLocally).map(test =>
                        test.parameters.map((param, pIdx) => {
                          const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
                          const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
                          const selectedLabel = param.options?.find(o => o.value === val)?.label;
                          const option = val ? getParameterOption(param, val) : undefined;
                          const isInvert = param.id === 'counting_breath_rate';
                          const levelInfo = param.type === 'number' && param.benchmarks && numVal !== undefined
                            ? getStrengthLevelInfo(numVal, param, isInvert) : undefined;

                          let enduranceBadge: { label: string; color: string } | null = null;
                          if (numVal !== undefined) {
                            if (param.id === 'breath_hold_time') enduranceBadge = getBreathHoldOutput(numVal, gender);
                            else if (param.id === 'counting_breath_rate') enduranceBadge = getCountingBreathOutput(numVal);
                            else if (param.id === 'sit_to_stand_reps') enduranceBadge = getStsOutput(numVal, gender, age);
                          }

                          return (
                            <tr key={param.id} className="border-b border-border/50">
                              <td className="py-1.5 px-1 text-muted-foreground text-xs break-words whitespace-normal align-top">{pIdx === 0 ? sub.name : ''}</td>
                              <td className="py-1.5 px-1 font-medium text-foreground text-xs break-words whitespace-normal align-top">{pIdx === 0 ? test.name : ''}</td>
                              <td className="py-1.5 px-1 text-foreground text-xs break-words whitespace-normal align-top">{param.name}</td>
                              <td className="py-1.5 px-1 text-foreground text-xs break-words whitespace-normal align-top">
                                {selectedLabel || (numVal !== undefined ? `${numVal} ${param.unit || ''}` : '—')}
                              </td>
                              <td className="py-1.5 px-1 align-top">
                                {enduranceBadge && (
                                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded text-white leading-tight break-words whitespace-normal max-w-full" style={{
                                    background: enduranceBadge.color === 'red' ? 'hsl(var(--status-issue))' :
                                    enduranceBadge.color === 'yellow' ? 'hsl(var(--status-restricted))' :
                                    enduranceBadge.color === 'emerald' ? 'hsl(145,60%,35%)' :
                                    'hsl(var(--status-pass))'
                                  }}>
                                    {enduranceBadge.label}
                                  </span>
                                )}
                                {!enduranceBadge && option && <StatusBadge severity={option.severity} label={option.outputFlag} />}
                                {!enduranceBadge && levelInfo && (
                                  <Badge className={`text-xs ${levelInfo.cssClass}`}>{levelInfo.level}</Badge>
                                )}
                                {!enduranceBadge && !option && !levelInfo && <span className="text-muted-foreground">—</span>}
                              </td>
                            </tr>
                          );
                        })
                      )
                    )}
                    {section.tests?.filter(isVisibleLocally).map(test =>
                      test.parameters.map((param, pIdx) => {
                        const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
                        const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
                        const selectedLabel = param.options?.find(o => o.value === val)?.label;
                        const option = val ? getParameterOption(param, val) : undefined;
                        const isInvert = param.id === 'counting_breath_rate';
                        const levelInfo = param.type === 'number' && param.benchmarks && numVal !== undefined
                          ? getStrengthLevelInfo(numVal, param, isInvert) : undefined;

                        let enduranceBadge: { label: string; color: string } | null = null;
                        if (numVal !== undefined) {
                          if (param.id === 'breath_hold_time') enduranceBadge = getBreathHoldOutput(numVal, gender);
                          else if (param.id === 'counting_breath_rate') enduranceBadge = getCountingBreathOutput(numVal);
                          else if (param.id === 'sit_to_stand_reps') enduranceBadge = getStsOutput(numVal, gender, age);
                        }

                        return (
                          <tr key={param.id} className="border-b border-border/50">
                            <td className="py-1.5 px-1 text-muted-foreground text-xs break-words whitespace-normal align-top">{section.component}</td>
                            <td className="py-1.5 px-1 font-medium text-foreground text-xs break-words whitespace-normal align-top">{pIdx === 0 ? test.name : ''}</td>
                            <td className="py-1.5 px-1 text-foreground text-xs break-words whitespace-normal align-top">{param.name}</td>
                            <td className="py-1.5 px-1 text-foreground text-xs break-words whitespace-normal align-top">
                              {selectedLabel || (numVal !== undefined ? `${numVal} ${param.unit || ''}` : '—')}
                            </td>
                            <td className="py-1.5 px-1 align-top">
                              {enduranceBadge && (
                                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded text-white leading-tight break-words whitespace-normal max-w-full" style={{
                                  background: enduranceBadge.color === 'red' ? 'hsl(var(--status-issue))' :
                                  enduranceBadge.color === 'yellow' ? 'hsl(var(--status-restricted))' :
                                  enduranceBadge.color === 'emerald' ? 'hsl(145,60%,35%)' :
                                  'hsl(var(--status-pass))'
                                }}>
                                  {enduranceBadge.label}
                                </span>
                              )}
                              {!enduranceBadge && option && <StatusBadge severity={option.severity} label={option.outputFlag} />}
                              {!enduranceBadge && levelInfo && (
                                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded text-white leading-tight break-words whitespace-normal max-w-full" style={{ background: levelInfo.cssClass.includes('green') ? 'hsl(var(--status-pass))' : levelInfo.cssClass.includes('yellow') ? 'hsl(var(--status-restricted))' : 'hsl(var(--status-issue))' }}>
                                  {levelInfo.level}
                                </span>
                              )}
                              {!enduranceBadge && !option && !levelInfo && <span className="text-muted-foreground text-xs">—</span>}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Test notes */}
              {(() => {
                const allTests = [...(section.subsections?.flatMap(s => s.tests.filter(isVisibleLocally)) || []), ...(section.tests?.filter(isVisibleLocally) || [])];
                const notedTests = allTests.filter(t => testNotes[t.id]);
                if (notedTests.length === 0) return null;
                return (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Coach Notes</h4>
                    {notedTests.map(t => (
                      <div key={t.id} className="text-sm p-2 bg-muted/30 rounded">
                        <span className="font-medium text-foreground">{t.name}:</span>{' '}
                        <span className="text-muted-foreground italic">{testNotes[t.id]}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>
          );
        })}

        {/* AMRAP Exercise Protocol */}
        <Card className="p-6 print-break">
          <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">⏱️ AMRAP Protocol: {selectedProtocol.name}</h2>
          <div className="w-full">
            <table className="w-full text-sm table-fixed break-words whitespace-normal">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase w-[15%]">Category</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase w-[25%]">Primary Movement</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase w-[25%]">Regression</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase w-[15%]">Reps / Time</th>
                  <th className="py-2 px-2 text-muted-foreground font-semibold text-xs uppercase w-[20%]">Coach Notes</th>
                </tr>
              </thead>
              <tbody>
                {selectedProtocol.exercises.map((ex, idx) => {
                  const key = `${amrapProtocol}_${idx}`;
                  return (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-2 px-2 font-medium text-foreground break-words whitespace-normal align-top">{ex.category}</td>
                      <td className="py-2 px-2 text-foreground break-words whitespace-normal align-top">{ex.primaryMovement}</td>
                      <td className="py-2 px-2 text-muted-foreground break-words whitespace-normal align-top">{ex.regressionOption}</td>
                      <td className="py-2 px-2 text-foreground break-words whitespace-normal align-top">{amrapExerciseReps[key] || ex.defaultRepsTime}</td>
                      <td className="py-2 px-2 text-muted-foreground italic break-words whitespace-normal align-top">{amrapExerciseNotes[key] || ex.defaultCoachNotes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </Card>

        {/* Coach Notes */}
        {(coachNotes.movementCorrections || coachNotes.injuryPrecautions || coachNotes.trainingFocus) && (
          <Card className="p-6 print-break">
            <h2 className="text-lg font-bold text-foreground mb-4 border-b border-border pb-2">📝 Coach Notes</h2>
            <div className="space-y-4 text-sm">
              {coachNotes.movementCorrections && (
                <div>
                  <div className="font-semibold text-foreground">Movement Corrections</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.movementCorrections}</p>
                </div>
              )}
              {coachNotes.injuryPrecautions && (
                <div>
                  <div className="font-semibold text-foreground">Injury Precautions</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.injuryPrecautions}</p>
                </div>
              )}
              {coachNotes.trainingFocus && (
                <div>
                  <div className="font-semibold text-foreground">Training Focus</div>
                  <p className="text-muted-foreground mt-1">{coachNotes.trainingFocus}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
