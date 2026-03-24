

## HB Health Assessment System — Implementation Plan

### Overview
A single-session digital assessment tool where coaches fill a structured movement and fitness assessment form, then generate two reports (Coach Detailed + Client Simplified) viewable on-screen and downloadable as PDF.

### Pages & Flow

1. **Assessment Form** (`/`) — Multi-step wizard with sections as tabs/steps
2. **Coach Report** (`/report/coach`) — Full detailed report
3. **Client Report** (`/report/client`) — Simplified, professional-looking report

---

### Step 1: Assessment Form (Multi-Step Wizard)

**Step 1 – Client Information**
- Text fields: Client Name, DOB, Date, Coach Name, Gender (dropdown), Injury Notes (textarea)

**Step 2 – Mobility Assessment**
- Subsections: Cervical, Hip, Ankle, Shoulder, Spine
- Each test: dropdown with options mapped to PASS / RESTRICTED / ISSUE
- Coach notes textarea per test
- Auto-calculated section status (Pass / Limitation / Red Flag)

**Step 3 – Movement Assessment**
- Overhead Squat: Front, Side, Back views
- Dropdown for each movement fault (feet turn out, knees valgus, forward lean, etc.)
- Each option mapped to status flag

**Step 4 – Strength Tests**
- Pushups, Plank, Squats, Wall Sit
- Numeric input (reps/time)
- Auto-categorize: Beginner / Intermediate / Advanced based on benchmarks

**Step 5 – Endurance Tests**
- Breath Hold, Counting Breath, Sit-to-Stand
- Numeric input, auto-calculated performance level

**Step 6 – Balance Test**
- Single Leg Stance: dropdown (Optimal / Functional / Poor / Severely Impaired)

**Step 7 – AMRAP Conditioning**
- Rounds, Heart Rate, Movement Quality dropdown, Pain Report dropdown
- Auto-generated performance score

**Step 8 – Coach Notes**
- Movement corrections, injury precautions, training focus textareas

### Step 2: Report Generation

**Coach Detailed Report**
- All test results with benchmarks, flags, scores, and notes
- Color-coded status indicators
- Organized by section

**Client Simplified Report**
- Professional health report look with clean icons
- Smart Summary at top: Mobility, Strength, Endurance, Balance ratings + Overall Fitness Score (out of 100)
- Section pass/issue status only (no technical details)
- Red flag areas listed with 🔴 ⚠️ ✅ icons
- Coach recommendations section

### Step 3: PDF Download
- Both reports downloadable as PDF using browser print-to-PDF styling with `@media print`

### Tech Approach
- React state to hold all assessment data
- Multi-step form with progress indicator
- Report pages render from state, styled for screen and print
- No backend — all client-side

