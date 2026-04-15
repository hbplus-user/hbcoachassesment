import {
  allSections, getParameterOption, getStrengthLevelInfo, getSectionStatus,
  amrapProtocols, isVisible, calculateAge,
  getBreathHoldOutput, getCountingBreathOutput, getStsOutput
} from '@/data/assessmentData';

const SVG_PATH_1 = "M 589.97 662.62 C583.57,664.00 570.88,664.30 501.27,664.71 L 420.05 665.19 L 419.50 594.00 L 465.94 594.00 L 466.50 620.50 L 579.50 620.50 L 586.83 618.10 C601.64,613.25 613.44,602.79 619.97,588.73 C626.12,575.47 627.45,564.52 624.56,550.88 C621.27,535.36 609.44,519.74 596.00,513.16 C583.32,506.96 580.55,506.74 520.00,507.14 L 465.50 507.50 L 465.23 486.25 L 464.96 465.00 L 513.73 464.98 C552.19,464.97 563.93,464.66 569.26,463.53 C593.01,458.50 611.00,435.97 611.00,411.24 C611.00,386.55 593.41,363.74 570.76,359.06 C567.27,358.34 548.65,358.06 515.50,358.24 L 465.50 358.50 L 465.30 391.50 L 419.50 391.50 L 419.00 353.35 L 418.50 315.21 L 440.50 314.52 C452.60,314.14 487.92,314.00 519.00,314.20 L 575.50 314.57 L 585.12 317.19 C620.25,326.78 645.80,352.08 654.20,385.62 C657.41,398.43 657.39,420.90 654.15,432.89 C649.82,448.93 641.24,462.91 628.31,474.99 C621.19,481.64 620.67,482.38 622.41,483.39 C643.55,495.65 656.60,509.41 664.68,528.00 L 667.95 535.50 L 738.08 535.50 L 738.02 492.75 L 737.96 450.00 L 780.00 450.00 L 780.00 536.00 L 867.04 536.00 L 866.77 556.75 L 866.50 577.50 L 823.21 577.76 L 779.93 578.02 L 780.00 620.26 C780.04,643.49 780.06,663.06 780.04,663.75 C780.01,664.71 775.21,665.00 759.50,665.00 L 739.00 665.00 L 739.00 578.00 L 671.00 578.00 L 671.00 580.31 C671.00,584.46 666.93,598.28 663.57,605.56 C649.78,635.41 624.17,655.26 589.97,662.62 ZM 250.01 507.00 L 249.50 664.50 L 226.73 664.77 C209.01,664.98 203.86,664.76 203.56,663.77 C203.34,663.07 202.92,584.31 202.61,488.75 L 202.06 315.00 L 248.99 315.00 L 249.24 388.75 L 249.50 462.50 L 419.00 463.01 L 419.00 507.00 Z";
const SVG_PATH_2 = "M 0.00 512.00 L 0.00 0.00 L 512.00 0.00 L 1024.00 0.00 L 1024.00 512.00 L 1024.00 1024.00 L 512.00 1024.00 L 0.00 1024.00 L 0.00 512.00 ZM 249.76 585.75 L 250.01 507.00 L 334.51 507.00 L 419.00 507.00 L 419.00 485.01 L 419.00 463.01 L 334.25 462.76 L 249.50 462.50 L 249.24 388.75 L 248.99 315.00 L 225.52 315.00 L 202.06 315.00 L 202.61 488.75 C202.92,584.31 203.34,663.07 203.56,663.77 C203.86,664.76 209.01,664.98 226.73,664.77 L 249.50 664.50 L 249.76 585.75 ZM 589.97 662.62 C624.17,655.26 649.78,635.41 663.57,605.56 C666.93,598.28 671.00,584.46 671.00,580.31 L 671.00 578.00 L 705.00 578.00 L 739.00 578.00 L 739.00 621.50 L 739.00 665.00 L 759.50 665.00 C775.21,665.00 780.01,664.71 780.04,663.75 C780.06,663.06 780.04,643.49 780.00,620.26 L 779.93 578.02 L 823.21 577.76 L 866.50 577.50 L 866.77 556.75 L 867.04 536.00 L 823.52 536.00 L 780.00 536.00 L 780.00 493.00 L 780.00 450.00 L 758.98 450.00 L 737.96 450.00 L 738.02 492.75 L 738.08 535.50 L 703.02 535.50 L 667.95 535.50 L 664.68 528.00 C656.60,509.41 643.55,495.65 622.41,483.39 C620.67,482.38 621.19,481.64 628.31,474.99 C641.24,462.91 649.82,448.93 654.15,432.89 C657.39,420.90 657.41,398.43 654.20,385.62 C645.80,352.08 620.25,326.78 585.12,317.19 L 575.50 314.57 L 519.00 314.20 C487.92,314.00 452.60,314.14 440.50,314.52 L 418.50 315.21 L 419.00 353.35 L 419.50 391.50 L 442.40 391.50 L 465.30 391.50 L 465.40 375.00 L 465.50 358.50 L 515.50 358.24 C548.65,358.06 567.27,358.34 570.76,359.06 C593.41,363.74 611.00,386.55 611.00,411.24 C611.00,435.97 593.01,458.50 569.26,463.53 C563.93,464.66 552.19,464.97 513.73,464.98 L 464.96 465.00 L 465.23 486.25 L 465.50 507.50 L 520.00 507.14 C580.55,506.74 583.32,506.96 596.00,513.16 C609.44,519.74 621.27,535.36 624.56,550.88 C627.45,564.52 626.12,575.47 619.97,588.73 C613.44,602.79 601.64,613.25 586.83,618.10 L 579.50 620.50 L 523.00 620.50 L 466.50 620.50 L 466.22 607.25 L 465.94 594.00 L 442.72 594.00 L 419.50 594.00 L 419.77 629.59 L 420.05 665.19 L 501.27 664.71 C570.88,664.30 583.57,664.00 589.97,662.62 Z";

const encodeSVG = (svgStr: string) => typeof window !== 'undefined' ? `data:image/svg+xml;base64,${window.btoa(svgStr)}` : '';

const LOGO_SVG = encodeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="${SVG_PATH_1}" fill="rgb(1,1,1)"/><path d="${SVG_PATH_2}" fill="rgb(254,254,254)"/></svg>`);
const WATERMARK_SVG = encodeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="-888 -888 2800 2800"><g opacity="0.12"><path d="${SVG_PATH_1}" fill="rgb(1,1,1)"/><path d="${SVG_PATH_2}" fill="rgb(254,254,254)"/></g></svg>`);

type ReportCtx = {
  clientInfo: {
    clientName: string;
    date: string;
    dob: string;
    coachName: string;
    gender: string;
    uhid: string;
    injuryNotes: string;
  };
  dropdownResults: Record<string, string>;
  numericResults: Record<string, number>;
  testNotes: Record<string, string>;
  coachNotes: {
    movementCorrections: string;
    injuryPrecautions: string;
    trainingFocus: string;
  };
  amrapProtocol: string;
  amrapExerciseReps: Record<string, string>;
  amrapExerciseNotes: Record<string, string>;
};

const COLORS = {
  pass: '#16a34a',
  restricted: '#d97706',
  issue: '#dc2626',
  emerald: '#15803d',
  text: '#1e293b',
  muted: '#64748b',
  border: '#e2e8f0',
  bg: '#f8fafc',
  white: '#ffffff',
};

// ─── Pixel widths (body=754px, padding=20px each side → content=714px) ────────
// Coach report: 5 cols → 12%=86, 18%=128, 18%=128, 30%=214, 22%=157  (total=713 ≈ ok)
// Client report: 2 cols → 35%=250, 65%=464
// AMRAP: 5 cols → 15%=107, 25%=179, 25%=179, 15%=107, 20%=143  (total=715 ≈ ok)
const CW_COACH = ['85px', '128px', '128px', '213px', '156px'];
const CW_CLIENT = ['249px', '463px'];
const CW_AMRAP = ['107px', '178px', '178px', '107px', '142px'];

function badge(label: string, color: string) {
  // SVG entirely bypasses html2canvas iOS Text baseline bugs
  const width = Math.max(50, label.length * 8.5 + 20); // Generous width padding so text never touches edges
  return `<div style="display:inline-block; vertical-align:middle; margin:1px 0;">
    <svg width="${width}" height="18" viewBox="0 0 ${width} 18" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="18" rx="4" fill="${color}" />
      <text x="50%" y="12.5" font-family="Helvetica, Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">${label}</text>
    </svg>
  </div>`;
}

// ─── Div-based cell helpers (html2pdf.js ignores CSS tables) ──────────────────
const CELL_BASE = `display:inline-block;vertical-align:top;box-sizing:border-box;padding:6px;font-family:Arial,sans-serif;font-size:10px;line-height:1.4;word-break:break-word;overflow:hidden;`;

const DivTH = (label: string, width: string) =>
  `<div style="${CELL_BASE}width:${width};font-size:9px;font-weight:700;text-transform:uppercase;color:${COLORS.muted};letter-spacing:0.05em;">${label}</div>`;

const DivTD = (content: string, width: string, bold = false, color = COLORS.text) =>
  `<div style="${CELL_BASE}width:${width};color:${color};font-weight:${bold ? '600' : '400'};">${content}</div>`;

// A header row
function headerRow(contentHtml: string) {
  return `<div class="pdf-row" style="display:block;width:100%;border-bottom:2px solid ${COLORS.border};margin-bottom:8px;">${contentHtml}</div>`;
}

// A data row
function dataRow(contentHtml: string) {
  return `<div class="pdf-row" style="display:block;width:100%;">
    <div style="border-bottom:1px solid ${COLORS.border};font-size:0;">${contentHtml}</div>
  </div>`;
}

// ─── Output / finding helpers ─────────────────────────────────────────────────
function outputCell(
  param: any,
  dropdownResults: Record<string, string>,
  numericResults: Record<string, number>,
  gender: string,
  age: number | null
): string {
  const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
  const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
  const option = val ? getParameterOption(param, val) : undefined;
  const isInvert = param.id === 'counting_breath_rate';
  const levelInfo = param.type === 'number' && param.benchmarks && numVal !== undefined
    ? getStrengthLevelInfo(numVal, param, isInvert) : undefined;

  if (param.id === 'breath_hold_time' && numVal !== undefined) {
    const b = getBreathHoldOutput(numVal, gender);
    const c = b.color === 'red' ? COLORS.issue : b.color === 'yellow' ? COLORS.restricted : b.color === 'emerald' ? COLORS.emerald : COLORS.pass;
    return badge(b.label, c);
  }
  if (param.id === 'counting_breath_rate' && numVal !== undefined) {
    const b = getCountingBreathOutput(numVal);
    const c = b.color === 'red' ? COLORS.issue : b.color === 'yellow' ? COLORS.restricted : b.color === 'emerald' ? COLORS.emerald : COLORS.pass;
    return badge(b.label, c);
  }
  if (param.id === 'sit_to_stand_reps' && numVal !== undefined) {
    const b = getStsOutput(numVal, gender, age);
    const c = b.color === 'red' ? COLORS.issue : b.color === 'yellow' ? COLORS.restricted : COLORS.pass;
    return badge(b.label, c);
  }
  if (option) {
    const c = option.severity === 'green' ? COLORS.pass : option.severity === 'yellow' ? COLORS.restricted : COLORS.issue;
    return badge(option.outputFlag, c);
  }
  if (levelInfo) {
    const c = levelInfo.cssClass.includes('green') ? COLORS.pass : levelInfo.cssClass.includes('yellow') ? COLORS.restricted : COLORS.issue;
    return badge(levelInfo.level, c);
  }
  return '<span style="color:#94a3b8">—</span>';
}

function findingCell(
  param: any,
  dropdownResults: Record<string, string>,
  numericResults: Record<string, number>
): string {
  const val = param.type === 'dropdown' ? dropdownResults[param.id] : undefined;
  const numVal = param.type === 'number' ? numericResults[param.id] : undefined;
  const selectedLabel = param.options?.find((o: any) => o.value === val)?.label;
  if (selectedLabel) return selectedLabel;
  if (numVal !== undefined) return `${numVal} ${param.unit || ''}`;
  return '—';
}

function isIssue(
  param: any,
  dropdownResults: Record<string, string>,
  numericResults: Record<string, number>,
  gender: string,
  age: number | null
): boolean {
  if (param.type === 'dropdown') {
    const val = dropdownResults[param.id];
    if (val) {
      const option = getParameterOption(param, val);
      return option?.severity === 'red' || option?.severity === 'yellow';
    }
  } else if (param.type === 'number') {
    const numVal = numericResults[param.id];
    if (numVal !== undefined) {
      if (param.id === 'breath_hold_time') return getBreathHoldOutput(numVal, gender).color !== 'green';
      if (param.id === 'counting_breath_rate') return getCountingBreathOutput(numVal).color !== 'green';
      if (param.id === 'sit_to_stand_reps') return getStsOutput(numVal, gender, age).color !== 'green';
      if (param.benchmarks) {
        const info = getStrengthLevelInfo(numVal, param, false);
        return info.cssClass.includes('issue') || info.cssClass.includes('restricted');
      }
    }
  }
  return false;
}

export function buildCoachReportHtml(ctx: ReportCtx, opts: { isClientReport?: boolean } = {}): string {
  const { isClientReport } = opts;
  const { clientInfo, dropdownResults, numericResults, testNotes, coachNotes, amrapProtocol, amrapExerciseReps, amrapExerciseNotes } = ctx;
  const gender = clientInfo?.gender?.toLowerCase() || '';
  const age = calculateAge(clientInfo?.dob);
  const selectedProtocol = amrapProtocols.find(p => p.id === amrapProtocol) || amrapProtocols[0];
  const isVisibleFn = (t: any) => isVisible(t, gender, age);

  let sections = '';

  for (const section of allSections) {
    const status = getSectionStatus(section, dropdownResults, numericResults, gender, age);
    const statusLabel = status === 'pass' ? 'PASS' : status === 'limitation' ? 'LIMITED' : 'RED FLAG';
    const statusColor = status === 'pass' ? COLORS.pass : status === 'limitation' ? COLORS.restricted : COLORS.issue;

    let rows = '';

    // ── Subsections ───────────────────────────────────────────────────────────
    if (section.subsections) {
      for (const sub of section.subsections.filter(isVisibleFn)) {
        let printedSubName = false;
        let clientOutputHtml = '';

        for (const test of sub.tests.filter(isVisibleFn)) {
          const visibleParams = test.parameters.filter(p =>
            !isClientReport ? true : isIssue(p, dropdownResults, numericResults, gender, age)
          );
          if (visibleParams.length === 0) continue;

          for (let i = 0; i < visibleParams.length; i++) {
            const param = visibleParams[i];
            if (isClientReport) {
              clientOutputHtml += `<span style="display:inline-block;margin-right:6px;margin-bottom:4px;">${outputCell(param, dropdownResults, numericResults, gender, age)}</span>`;
            } else {
              rows += dataRow(
                DivTD(!printedSubName ? sub.name : '', CW_COACH[0], false, COLORS.muted) +
                DivTD(i === 0 ? test.name : '', CW_COACH[1], true) +
                DivTD(param.name, CW_COACH[2]) +
                DivTD(findingCell(param, dropdownResults, numericResults), CW_COACH[3]) +
                DivTD(outputCell(param, dropdownResults, numericResults, gender, age), CW_COACH[4])
              );
              printedSubName = true;
            }
          }
        }

        if (isClientReport && clientOutputHtml) {
          rows += dataRow(
            DivTD(`<div style="font-weight:700;font-size:12px;">${sub.name}</div>`, CW_CLIENT[0], true) +
            DivTD(`<div style="display:flex;flex-wrap:wrap;gap:4px;padding:2px 0;">${clientOutputHtml}</div>`, CW_CLIENT[1])
          );
        }
      }
    }

    // ── Top-level tests ───────────────────────────────────────────────────────
    if (section.tests) {
      let printedSecName = false;
      let clientOutputHtml = '';

      for (const test of section.tests.filter(isVisibleFn)) {
        const visibleParams = test.parameters.filter(p =>
          !isClientReport ? true : isIssue(p, dropdownResults, numericResults, gender, age)
        );
        if (visibleParams.length === 0) continue;

        for (let i = 0; i < visibleParams.length; i++) {
          const param = visibleParams[i];
          if (isClientReport) {
            clientOutputHtml += `<span style="display:inline-block;margin-right:6px;margin-bottom:4px;">${outputCell(param, dropdownResults, numericResults, gender, age)}</span>`;
          } else {
            rows += dataRow(
              DivTD(!printedSecName ? (section.component || section.name) : '', CW_COACH[0], false, COLORS.muted) +
              DivTD(i === 0 ? test.name : '', CW_COACH[1], true) +
              DivTD(param.name, CW_COACH[2]) +
              DivTD(findingCell(param, dropdownResults, numericResults), CW_COACH[3]) +
              DivTD(outputCell(param, dropdownResults, numericResults, gender, age), CW_COACH[4])
            );
            printedSecName = true;
          }
        }
      }

      if (isClientReport && clientOutputHtml) {
        const labelName = section.component || section.name;
        rows += dataRow(
          DivTD(`<div style="font-weight:700;font-size:12px;">${labelName}</div>`, CW_CLIENT[0], true) +
          DivTD(`<div style="display:flex;flex-wrap:wrap;gap:4px;padding:2px 0;">${clientOutputHtml}</div>`, CW_CLIENT[1])
        );
      }
    }

    // ── Coach notes per test ──────────────────────────────────────────────────
    const allTests = [
      ...(section.subsections?.flatMap(s => s.tests.filter(isVisibleFn)) || []),
      ...(section.tests?.filter(isVisibleFn) || []),
    ];
    const notedTests = allTests.filter(t => testNotes[t.id]);
    let notesHtml = '';
    if (notedTests.length > 0 && !isClientReport) {
      notesHtml = `
        <div class="pdf-row" style="margin-top:8px;padding:8px;background:${COLORS.bg};border-radius:6px;">
          <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:${COLORS.muted};margin-bottom:4px;">Coach Notes</div>
          ${notedTests.map(t => `
            <div style="font-size:10px;color:${COLORS.text};margin-bottom:3px;">
              <strong>${t.name}:</strong> <em style="color:${COLORS.muted}">${testNotes[t.id]}</em>
            </div>`).join('')}
        </div>`;
    }

    if (!rows) continue;

    // ── Build header for this section ─────────────────────────────────────────
    const sectionHeader = isClientReport
      ? headerRow(DivTH('Component', CW_CLIENT[0]) + DivTH('Output', CW_CLIENT[1]))
      : headerRow(
        DivTH('Component', CW_COACH[0]) +
        DivTH('Test', CW_COACH[1]) +
        DivTH('Parameter', CW_COACH[2]) +
        DivTH('Benchmark / Finding', CW_COACH[3]) +
        DivTH('Output', CW_COACH[4])
      );

    sections += `
    <div class="pdf-section" style="background:rgba(255,255,255,0.55);border:1px solid ${COLORS.border};border-radius:10px;padding:16px;margin-bottom:16px;page-break-inside:avoid;">
      <div class="pdf-row" style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid ${COLORS.border};padding-bottom:10px;margin-bottom:10px;">
        <div style="font-size:14px;font-weight:700;color:${COLORS.text};">${section.icon || ''} ${section.name}</div>
        ${(() => {
        const headerBadgeWidth = Math.max(60, statusLabel.length * 8.5 + 24);
        return `<div style="display:inline-block; vertical-align:middle;">
            <svg width="${headerBadgeWidth}" height="20" viewBox="0 0 ${headerBadgeWidth} 20" xmlns="http://www.w3.org/2000/svg">
              <rect width="${headerBadgeWidth}" height="20" rx="4" fill="${statusColor}" />
              <text x="50%" y="14" font-family="Helvetica, Arial, sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">${statusLabel}</text>
            </svg>
          </div>`;
      })()}
      </div>
      <div style="width:100%;">
        ${sectionHeader}
        ${rows}
      </div>
      ${notesHtml}
    </div>`;
  }

  // ── AMRAP section ─────────────────────────────────────────────────────────
  let amrapRows = '';
  if (!isClientReport) {
    amrapRows = selectedProtocol.exercises.map((ex, idx) => {
      const key = `${amrapProtocol}_${idx}`;
      return dataRow(
        DivTD(ex.category, CW_AMRAP[0], true) +
        DivTD(ex.primaryMovement, CW_AMRAP[1]) +
        DivTD(ex.regressionOption, CW_AMRAP[2], false, COLORS.muted) +
        DivTD(amrapExerciseReps[key] || ex.defaultRepsTime, CW_AMRAP[3]) +
        DivTD(`<em>${amrapExerciseNotes[key] || ex.defaultCoachNotes}</em>`, CW_AMRAP[4], false, COLORS.muted)
      );
    }).join('');
  }

  // ── Coach summary notes ───────────────────────────────────────────────────
  const cnHtml = [
    coachNotes.movementCorrections && `
      <div style="margin-bottom:10px;">
        <div style="font-weight:700;font-size:11px;color:${COLORS.text};margin-bottom:2px;">Movement Corrections</div>
        <p style="font-size:10px;color:${COLORS.muted};margin:0;">${coachNotes.movementCorrections}</p>
      </div>`,
    coachNotes.injuryPrecautions && `
      <div style="margin-bottom:10px;">
        <div style="font-weight:700;font-size:11px;color:${COLORS.text};margin-bottom:2px;">Injury Precautions</div>
        <p style="font-size:10px;color:${COLORS.muted};margin:0;">${coachNotes.injuryPrecautions}</p>
      </div>`,
    coachNotes.trainingFocus && `
      <div>
        <div style="font-weight:700;font-size:11px;color:${COLORS.text};margin-bottom:2px;">Training Focus</div>
        <p style="font-size:10px;color:${COLORS.muted};margin:0;">${coachNotes.trainingFocus}</p>
      </div>`,
  ].filter(Boolean).join('');

  const reportTitle = isClientReport ? 'Client Fitness Report' : 'Coach Detailed Report';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { box-sizing: border-box; }
    body { margin:0; padding:20px; font-family:Arial,Helvetica,sans-serif; background-color:#ffffff; color:${COLORS.text}; width:754px; }
  </style>
</head>
<body style="background-image:url('${WATERMARK_SVG}');background-size:1122px 1122px;background-position:center top;background-repeat:repeat-y;">

  <!-- Header -->
  <div class="pdf-section" style="display:flex;align-items:center;margin-bottom:24px;border-bottom:2px solid ${COLORS.border};padding-bottom:16px;">
    <img src="${LOGO_SVG}" style="height:48px;width:48px;margin-right:16px;" alt="HB Logo" />
    <div>
      <div style="font-size:24px;font-weight:800;color:${COLORS.text};letter-spacing:-0.02em;">HB+ Health Assessment</div>
      <div style="font-size:13px;color:${COLORS.muted};text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-top:2px;">${reportTitle}</div>
    </div>
  </div>

  <!-- Client Info -->
  <div class="pdf-section" style="background:rgba(255,255,255,0.55);border:1px solid ${COLORS.border};border-radius:10px;padding:16px;margin-bottom:16px;">
    <div style="font-size:15px;font-weight:700;color:${COLORS.text};border-bottom:1px solid ${COLORS.border};padding-bottom:8px;margin-bottom:12px;">Client Information</div>
    <div style="font-size:0;">
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">Client:</span> ${clientInfo.clientName || '—'}</div>
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">Coach:</span> ${clientInfo.coachName || '—'}</div>
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">Date:</span> ${clientInfo.date || '—'}</div>
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">DOB:</span> ${clientInfo.dob || '—'}</div>
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">Gender:</span> ${clientInfo.gender || '—'}</div>
      <div style="display:inline-block;width:50%;font-size:11px;padding:2px 0;"><span style="font-weight:700;color:${COLORS.muted};">UHID:</span> ${clientInfo.uhid || '—'}</div>
    </div>
    ${clientInfo.injuryNotes ? `<div style="margin-top:12px;padding:10px;background:#fee2e2;border-radius:6px;font-size:10px;"><span style="font-weight:700;color:#dc2626;">Injury Notes:</span> ${clientInfo.injuryNotes}</div>` : ''}
  </div>

  <!-- Assessment Sections -->
  ${sections}

  <!-- AMRAP Protocol -->
  ${!isClientReport ? `
  <div class="pdf-section" style="background:rgba(255,255,255,0.55);border:1px solid ${COLORS.border};border-radius:10px;padding:16px;margin-bottom:16px;page-break-inside:avoid;">
    <div class="pdf-row" style="font-size:14px;font-weight:700;color:${COLORS.text};border-bottom:1px solid ${COLORS.border};padding-bottom:8px;margin-bottom:10px;">⏱️ AMRAP Protocol: ${selectedProtocol.name}</div>
    <div style="width:100%;">
      ${headerRow(
    DivTH('Category', CW_AMRAP[0]) +
    DivTH('Primary Movement', CW_AMRAP[1]) +
    DivTH('Regression', CW_AMRAP[2]) +
    DivTH('Reps / Time', CW_AMRAP[3]) +
    DivTH('Coach Notes', CW_AMRAP[4])
  )}
      ${amrapRows}
    </div>
  </div>
  ` : ''}

  <!-- Coach Summary Notes -->
  ${cnHtml ? `
  <div class="pdf-section" style="background:rgba(255,255,255,0.55);border:1px solid ${COLORS.border};border-radius:10px;padding:16px;margin-bottom:16px;page-break-inside:avoid;">
    ${cnHtml}
  </div>` : ''}

  <!-- Footer -->
  <div style="text-align:center;font-size:9px;color:${COLORS.muted};margin-top:20px;">
    HB+ Health Assessment • Generated ${new Date().toLocaleDateString()}
  </div>

</body>
</html>`;
}