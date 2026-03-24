// Status flags
export type StatusFlag = 'pass' | 'restricted' | 'issue';

export interface DropdownOption {
  label: string;
  value: string;
  status: StatusFlag;
}

export interface TestDefinition {
  id: string;
  name: string;
  type: 'dropdown' | 'number' | 'text';
  options?: DropdownOption[];
  unit?: string;
  benchmarks?: { beginner: number; intermediate: number; advanced: number };
}

export interface SubSection {
  id: string;
  name: string;
  tests: TestDefinition[];
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  subsections?: SubSection[];
  tests?: TestDefinition[];
}

// Helper to create dropdown options
const opt = (label: string, value: string, status: StatusFlag): DropdownOption => ({ label, value, status });

// ============ MOBILITY ASSESSMENT ============
export const mobilitySection: Section = {
  id: 'mobility',
  name: 'Mobility Assessment',
  icon: '🦴',
  subsections: [
    {
      id: 'cervical',
      name: 'Cervical Mobility',
      tests: [
        {
          id: 'cervical_flexion', name: 'Cervical Flexion', type: 'dropdown',
          options: [
            opt('Chin touches sternum (Pass)', 'pass', 'pass'),
            opt('Less than 45° movement (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
        {
          id: 'cervical_extension', name: 'Cervical Extension', type: 'dropdown',
          options: [
            opt('Face parallel to ceiling (Pass)', 'pass', 'pass'),
            opt('Less than 45° extension (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
        {
          id: 'cervical_rotation_left', name: 'Cervical Rotation (Left)', type: 'dropdown',
          options: [
            opt('Chin over shoulder (Pass)', 'pass', 'pass'),
            opt('Limited rotation (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
        {
          id: 'cervical_rotation_right', name: 'Cervical Rotation (Right)', type: 'dropdown',
          options: [
            opt('Chin over shoulder (Pass)', 'pass', 'pass'),
            opt('Limited rotation (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
        {
          id: 'cervical_lateral_left', name: 'Lateral Flexion (Left)', type: 'dropdown',
          options: [
            opt('Ear towards shoulder (Pass)', 'pass', 'pass'),
            opt('Limited movement (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
        {
          id: 'cervical_lateral_right', name: 'Lateral Flexion (Right)', type: 'dropdown',
          options: [
            opt('Ear towards shoulder (Pass)', 'pass', 'pass'),
            opt('Limited movement (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Painful)', 'pain', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'hip',
      name: 'Hip Mobility',
      tests: [
        {
          id: 'hip_flexion', name: 'Hip Flexion', type: 'dropdown',
          options: [
            opt('120°+ flexion (Pass)', 'pass', 'pass'),
            opt('90-120° flexion (Restricted)', 'restricted', 'restricted'),
            opt('Less than 90° or pain (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'hip_extension', name: 'Hip Extension', type: 'dropdown',
          options: [
            opt('20°+ extension (Pass)', 'pass', 'pass'),
            opt('10-20° extension (Restricted)', 'restricted', 'restricted'),
            opt('Less than 10° or pain (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'hip_internal_rotation', name: 'Internal Rotation', type: 'dropdown',
          options: [
            opt('35°+ rotation (Pass)', 'pass', 'pass'),
            opt('20-35° rotation (Restricted)', 'restricted', 'restricted'),
            opt('Less than 20° or pain (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'hip_external_rotation', name: 'External Rotation', type: 'dropdown',
          options: [
            opt('45°+ rotation (Pass)', 'pass', 'pass'),
            opt('30-45° rotation (Restricted)', 'restricted', 'restricted'),
            opt('Less than 30° or pain (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'ankle',
      name: 'Ankle Mobility',
      tests: [
        {
          id: 'ankle_dorsiflexion', name: 'Dorsiflexion', type: 'dropdown',
          options: [
            opt('Knee past toes (Pass)', 'pass', 'pass'),
            opt('Knee reaches toes (Restricted)', 'restricted', 'restricted'),
            opt('Knee behind toes or pain (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ankle_plantarflexion', name: 'Plantarflexion', type: 'dropdown',
          options: [
            opt('Full point achievable (Pass)', 'pass', 'pass'),
            opt('Limited range (Restricted)', 'restricted', 'restricted'),
            opt('Pain present (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'shoulder',
      name: 'Shoulder Mobility',
      tests: [
        {
          id: 'shoulder_flexion', name: 'Shoulder Flexion', type: 'dropdown',
          options: [
            opt('Full overhead reach (Pass)', 'pass', 'pass'),
            opt('Limited overhead (Restricted)', 'restricted', 'restricted'),
            opt('Pain or significant limitation (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'shoulder_internal_rotation', name: 'Internal Rotation', type: 'dropdown',
          options: [
            opt('Hand reaches opposite scapula (Pass)', 'pass', 'pass'),
            opt('Hand reaches midback (Restricted)', 'restricted', 'restricted'),
            opt('Hand below waist or pain (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'shoulder_external_rotation', name: 'External Rotation', type: 'dropdown',
          options: [
            opt('90°+ rotation (Pass)', 'pass', 'pass'),
            opt('70-90° rotation (Restricted)', 'restricted', 'restricted'),
            opt('Less than 70° or pain (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'spine',
      name: 'Spine Mobility',
      tests: [
        {
          id: 'spine_flexion', name: 'Spinal Flexion', type: 'dropdown',
          options: [
            opt('Fingertips touch floor (Pass)', 'pass', 'pass'),
            opt('Fingertips reach shins (Restricted)', 'restricted', 'restricted'),
            opt('Limited or painful (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'spine_extension', name: 'Spinal Extension', type: 'dropdown',
          options: [
            opt('Comfortable extension (Pass)', 'pass', 'pass'),
            opt('Limited extension (Restricted)', 'restricted', 'restricted'),
            opt('Pain during extension (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'spine_rotation', name: 'Spinal Rotation', type: 'dropdown',
          options: [
            opt('Full rotation both sides (Pass)', 'pass', 'pass'),
            opt('Asymmetric or limited (Restricted)', 'restricted', 'restricted'),
            opt('Pain during rotation (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
  ]
};

// ============ MOVEMENT ASSESSMENT ============
export const movementSection: Section = {
  id: 'movement',
  name: 'Movement Assessment',
  icon: '🏃',
  subsections: [
    {
      id: 'ohs_front',
      name: 'Overhead Squat – Front View',
      tests: [
        {
          id: 'ohs_feet_turn_out', name: 'Feet Turn Out', type: 'dropdown',
          options: [
            opt('Feet straight (Pass)', 'pass', 'pass'),
            opt('Slight turn out (Restricted)', 'restricted', 'restricted'),
            opt('Significant turn out (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ohs_knees_valgus', name: 'Knees Valgus', type: 'dropdown',
          options: [
            opt('Knees track over toes (Pass)', 'pass', 'pass'),
            opt('Slight valgus (Restricted)', 'restricted', 'restricted'),
            opt('Significant valgus collapse (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ohs_weight_shift', name: 'Weight Shift', type: 'dropdown',
          options: [
            opt('Even weight distribution (Pass)', 'pass', 'pass'),
            opt('Slight shift to one side (Restricted)', 'restricted', 'restricted'),
            opt('Significant shift (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'ohs_side',
      name: 'Overhead Squat – Side View',
      tests: [
        {
          id: 'ohs_forward_lean', name: 'Forward Lean', type: 'dropdown',
          options: [
            opt('Torso upright (Pass)', 'pass', 'pass'),
            opt('Moderate forward lean (Restricted)', 'restricted', 'restricted'),
            opt('Excessive forward lean (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ohs_arms_fall', name: 'Arms Fall Forward', type: 'dropdown',
          options: [
            opt('Arms stay overhead (Pass)', 'pass', 'pass'),
            opt('Arms drift forward (Restricted)', 'restricted', 'restricted'),
            opt('Arms fall significantly (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ohs_heels_rise', name: 'Heels Rise', type: 'dropdown',
          options: [
            opt('Heels stay down (Pass)', 'pass', 'pass'),
            opt('Slight heel rise (Restricted)', 'restricted', 'restricted'),
            opt('Heels come off floor (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
    {
      id: 'ohs_back',
      name: 'Overhead Squat – Back View',
      tests: [
        {
          id: 'ohs_asymmetric_shift', name: 'Asymmetric Weight Shift', type: 'dropdown',
          options: [
            opt('Symmetric descent (Pass)', 'pass', 'pass'),
            opt('Slight asymmetry (Restricted)', 'restricted', 'restricted'),
            opt('Significant asymmetry (Issue)', 'issue', 'issue'),
          ]
        },
        {
          id: 'ohs_heel_rise_back', name: 'Heel Rise (Back View)', type: 'dropdown',
          options: [
            opt('Both heels grounded (Pass)', 'pass', 'pass'),
            opt('One heel rises (Restricted)', 'restricted', 'restricted'),
            opt('Both heels rise (Issue)', 'issue', 'issue'),
          ]
        },
      ]
    },
  ]
};

// ============ STRENGTH TESTS ============
export const strengthSection: Section = {
  id: 'strength',
  name: 'Strength Tests',
  icon: '💪',
  tests: [
    {
      id: 'pushups', name: 'Push-ups', type: 'number', unit: 'reps',
      benchmarks: { beginner: 10, intermediate: 25, advanced: 40 },
    },
    {
      id: 'plank', name: 'Plank Hold', type: 'number', unit: 'seconds',
      benchmarks: { beginner: 30, intermediate: 60, advanced: 120 },
    },
    {
      id: 'squats', name: 'Bodyweight Squats', type: 'number', unit: 'reps',
      benchmarks: { beginner: 15, intermediate: 30, advanced: 50 },
    },
    {
      id: 'wall_sit', name: 'Wall Sit', type: 'number', unit: 'seconds',
      benchmarks: { beginner: 30, intermediate: 60, advanced: 90 },
    },
  ]
};

// ============ ENDURANCE TESTS ============
export const enduranceSection: Section = {
  id: 'endurance',
  name: 'Endurance Tests',
  icon: '❤️',
  tests: [
    {
      id: 'breath_hold', name: 'Breath Hold Test', type: 'number', unit: 'seconds',
      benchmarks: { beginner: 20, intermediate: 40, advanced: 60 },
    },
    {
      id: 'counting_breath', name: 'Counting Breath Test', type: 'number', unit: 'breaths/min',
      benchmarks: { beginner: 20, intermediate: 14, advanced: 8 },
    },
    {
      id: 'sit_to_stand', name: 'Sit-to-Stand (30 sec)', type: 'number', unit: 'reps',
      benchmarks: { beginner: 10, intermediate: 18, advanced: 25 },
    },
  ]
};

// ============ BALANCE TEST ============
export const balanceSection: Section = {
  id: 'balance',
  name: 'Balance Test',
  icon: '⚖️',
  tests: [
    {
      id: 'single_leg_left', name: 'Single Leg Stance (Left)', type: 'dropdown',
      options: [
        opt('Optimal Stability (30s+ no wobble)', 'optimal', 'pass'),
        opt('Functional Stability (15-30s with minor wobble)', 'functional', 'pass'),
        opt('Poor Stability (5-15s significant wobble)', 'poor', 'restricted'),
        opt('Severely Impaired (<5s unable to balance)', 'severe', 'issue'),
      ]
    },
    {
      id: 'single_leg_right', name: 'Single Leg Stance (Right)', type: 'dropdown',
      options: [
        opt('Optimal Stability (30s+ no wobble)', 'optimal', 'pass'),
        opt('Functional Stability (15-30s with minor wobble)', 'functional', 'pass'),
        opt('Poor Stability (5-15s significant wobble)', 'poor', 'restricted'),
        opt('Severely Impaired (<5s unable to balance)', 'severe', 'issue'),
      ]
    },
  ]
};

// ============ AMRAP CONDITIONING ============
export const amrapSection: Section = {
  id: 'amrap',
  name: 'AMRAP Conditioning Test',
  icon: '⏱️',
  tests: [
    { id: 'amrap_rounds', name: 'Rounds Completed', type: 'number', unit: 'rounds' },
    { id: 'amrap_heart_rate', name: 'Heart Rate (post-test)', type: 'number', unit: 'bpm' },
    {
      id: 'amrap_movement_quality', name: 'Movement Quality', type: 'dropdown',
      options: [
        opt('Excellent form maintained', 'excellent', 'pass'),
        opt('Moderate form breakdown', 'moderate', 'restricted'),
        opt('Significant form breakdown', 'poor', 'issue'),
      ]
    },
    {
      id: 'amrap_pain', name: 'Pain Report', type: 'dropdown',
      options: [
        opt('No pain reported', 'none', 'pass'),
        opt('Mild discomfort', 'mild', 'restricted'),
        opt('Pain reported', 'pain', 'issue'),
      ]
    },
  ]
};

// All sections in order
export const allSections: Section[] = [
  mobilitySection,
  movementSection,
  strengthSection,
  enduranceSection,
  balanceSection,
  amrapSection,
];

// Scoring helpers
export function getSectionStatus(results: Record<string, string>): 'pass' | 'limitation' | 'red_flag' {
  const values = Object.values(results);
  if (values.length === 0) return 'pass';
  
  // Check all tests in the section
  let hasRestricted = false;
  let hasIssue = false;
  
  for (const val of values) {
    if (!val) continue;
    // For dropdown tests, the value maps to a status
    // We need to look up the status from the test definitions
    if (val === 'issue' || val === 'pain' || val === 'severe' || val === 'poor') {
      hasIssue = true;
    } else if (val === 'restricted' || val === 'moderate' || val === 'mild') {
      hasRestricted = true;
    }
  }
  
  if (hasIssue) return 'red_flag';
  if (hasRestricted) return 'limitation';
  return 'pass';
}

export function getStatusFromDropdownValue(testDef: TestDefinition, value: string): StatusFlag {
  if (!testDef.options) return 'pass';
  const option = testDef.options.find(o => o.value === value);
  return option?.status ?? 'pass';
}

export function getStrengthLevel(value: number, benchmarks: { beginner: number; intermediate: number; advanced: number }, invertScale = false): string {
  if (invertScale) {
    // Lower is better (e.g., breathing rate)
    if (value <= benchmarks.advanced) return 'Advanced';
    if (value <= benchmarks.intermediate) return 'Intermediate';
    return 'Beginner';
  }
  if (value >= benchmarks.advanced) return 'Advanced';
  if (value >= benchmarks.intermediate) return 'Intermediate';
  return 'Beginner';
}

export function getStrengthStatus(level: string): StatusFlag {
  if (level === 'Advanced') return 'pass';
  if (level === 'Intermediate') return 'pass';
  return 'restricted';
}

export function calculateOverallScore(results: Record<string, string>, numericResults: Record<string, number>): number {
  let totalTests = 0;
  let passedTests = 0;

  // Score dropdown tests
  for (const section of allSections) {
    const tests = section.tests || [];
    const subsectionTests = (section.subsections || []).flatMap(s => s.tests);
    const allTests = [...tests, ...subsectionTests];

    for (const test of allTests) {
      if (test.type === 'dropdown') {
        totalTests++;
        const val = results[test.id];
        if (val) {
          const status = getStatusFromDropdownValue(test, val);
          if (status === 'pass') passedTests += 1;
          else if (status === 'restricted') passedTests += 0.5;
        }
      } else if (test.type === 'number' && test.benchmarks) {
        totalTests++;
        const val = numericResults[test.id];
        if (val !== undefined) {
          const invertScale = test.id === 'counting_breath';
          const level = getStrengthLevel(val, test.benchmarks, invertScale);
          if (level === 'Advanced') passedTests += 1;
          else if (level === 'Intermediate') passedTests += 0.7;
          else passedTests += 0.3;
        }
      }
    }
  }

  if (totalTests === 0) return 0;
  return Math.round((passedTests / totalTests) * 100);
}

export function getSectionScore(sectionId: string, results: Record<string, string>, numericResults: Record<string, number>): string {
  const section = allSections.find(s => s.id === sectionId);
  if (!section) return 'N/A';

  const tests = section.tests || [];
  const subsectionTests = (section.subsections || []).flatMap(s => s.tests);
  const allTests = [...tests, ...subsectionTests];

  let total = 0;
  let score = 0;

  for (const test of allTests) {
    if (test.type === 'dropdown') {
      total++;
      const val = results[test.id];
      if (val) {
        const status = getStatusFromDropdownValue(test, val);
        if (status === 'pass') score += 1;
        else if (status === 'restricted') score += 0.5;
      }
    } else if (test.type === 'number' && test.benchmarks) {
      total++;
      const val = numericResults[test.id];
      if (val !== undefined) {
        const invertScale = test.id === 'counting_breath';
        const level = getStrengthLevel(val, test.benchmarks, invertScale);
        if (level === 'Advanced') score += 1;
        else if (level === 'Intermediate') score += 0.7;
        else score += 0.3;
      }
    }
  }

  if (total === 0) return 'N/A';
  const pct = (score / total) * 100;
  if (pct >= 80) return 'Good';
  if (pct >= 60) return 'Average';
  if (pct >= 40) return 'Needs Improvement';
  return 'Poor';
}
