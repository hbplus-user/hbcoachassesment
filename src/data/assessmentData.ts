// Status flags and severity levels
export type StatusFlag = 'pass' | 'restricted' | 'painful';
export type SeverityLevel = 'green' | 'yellow' | 'red';

export interface BenchmarkOption {
  label: string;
  value: string;
  status: StatusFlag;
  severity: SeverityLevel;
}

export interface Parameter {
  id: string;
  name: string;
  type: 'dropdown' | 'number';
  options?: BenchmarkOption[];
  unit?: string;
  benchmarks?: { beginner: number; intermediate: number; advanced: number };
}

export interface TestDefinition {
  id: string;
  name: string;
  parameters: Parameter[];
}

export interface SubSection {
  id: string;
  name: string;
  tests: TestDefinition[];
}

export interface Section {
  id: string;
  name: string;
  component: string;
  icon: string;
  subsections?: SubSection[];
  tests?: TestDefinition[];
}

// Helpers
const opt = (label: string, value: string, status: StatusFlag): BenchmarkOption => ({
  label,
  value,
  status,
  severity: status === 'pass' ? 'green' : status === 'restricted' ? 'yellow' : 'red',
});

// ============ MOBILITY ASSESSMENT ============
export const mobilitySection: Section = {
  id: 'mobility',
  name: 'Mobility Assessment',
  component: 'Mobility',
  icon: '🦴',
  subsections: [
    {
      id: 'cervical',
      name: 'Cervical Mobility',
      tests: [
        {
          id: 'cervical_flexion',
          name: 'Cervical Flexion',
          parameters: [
            {
              id: 'cervical_flexion_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Chin touches sternum (Pass)', 'pass', 'pass'),
                opt('Less than 45° movement (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain at neck or top of shoulders (Painful)', 'pain', 'painful'),
              ],
            },
            {
              id: 'cervical_flexion_compensation',
              name: 'Compensatory Factor',
              type: 'dropdown',
              options: [
                opt('No thoracic compensation (Pass)', 'pass', 'pass'),
                opt('Excess thoracic flexion (Compensated)', 'compensated', 'restricted'),
              ],
            },
          ],
        },
        {
          id: 'cervical_extension',
          name: 'Cervical Extension',
          parameters: [
            {
              id: 'cervical_extension_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Face parallel to ceiling (Pass)', 'pass', 'pass'),
                opt('Less than 45° extension (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_extension_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present during extension (Painful)', 'pain', 'painful'),
              ],
            },
            {
              id: 'cervical_extension_compensation',
              name: 'Compensatory Factor',
              type: 'dropdown',
              options: [
                opt('No lumbar compensation (Pass)', 'pass', 'pass'),
                opt('Excess lumbar extension (Compensated)', 'compensated', 'restricted'),
              ],
            },
          ],
        },
        {
          id: 'cervical_rotation_left',
          name: 'Cervical Rotation (Left)',
          parameters: [
            {
              id: 'cervical_rotation_left_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Chin over shoulder (Pass)', 'pass', 'pass'),
                opt('Limited rotation (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_rotation_left_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'cervical_rotation_right',
          name: 'Cervical Rotation (Right)',
          parameters: [
            {
              id: 'cervical_rotation_right_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Chin over shoulder (Pass)', 'pass', 'pass'),
                opt('Limited rotation (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_rotation_right_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'cervical_lateral_left',
          name: 'Lateral Flexion (Left)',
          parameters: [
            {
              id: 'cervical_lateral_left_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Ear towards shoulder (Pass)', 'pass', 'pass'),
                opt('Limited movement (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_lateral_left_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'cervical_lateral_right',
          name: 'Lateral Flexion (Right)',
          parameters: [
            {
              id: 'cervical_lateral_right_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Ear towards shoulder (Pass)', 'pass', 'pass'),
                opt('Limited movement (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'cervical_lateral_right_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hip',
      name: 'Hip Mobility',
      tests: [
        {
          id: 'hip_flexion',
          name: 'Hip Flexion',
          parameters: [
            {
              id: 'hip_flexion_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('120°+ flexion (Pass)', 'pass', 'pass'),
                opt('90-120° flexion (Restricted)', 'restricted', 'restricted'),
                opt('Less than 90° (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'hip_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain in hip or groin (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'hip_extension',
          name: 'Hip Extension',
          parameters: [
            {
              id: 'hip_extension_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('20°+ extension (Pass)', 'pass', 'pass'),
                opt('10-20° extension (Restricted)', 'restricted', 'restricted'),
                opt('Less than 10° (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'hip_extension_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'hip_internal_rotation',
          name: 'Internal Rotation',
          parameters: [
            {
              id: 'hip_ir_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('35°+ rotation (Pass)', 'pass', 'pass'),
                opt('20-35° rotation (Restricted)', 'restricted', 'restricted'),
                opt('Less than 20° (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'hip_ir_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'hip_external_rotation',
          name: 'External Rotation',
          parameters: [
            {
              id: 'hip_er_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('45°+ rotation (Pass)', 'pass', 'pass'),
                opt('30-45° rotation (Restricted)', 'restricted', 'restricted'),
                opt('Less than 30° (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'hip_er_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ankle',
      name: 'Ankle Mobility',
      tests: [
        {
          id: 'ankle_dorsiflexion',
          name: 'Dorsiflexion',
          parameters: [
            {
              id: 'ankle_df_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Knee past toes (Pass)', 'pass', 'pass'),
                opt('Knee reaches toes (Restricted)', 'restricted', 'restricted'),
                opt('Knee behind toes (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'ankle_df_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain at ankle (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ankle_plantarflexion',
          name: 'Plantarflexion',
          parameters: [
            {
              id: 'ankle_pf_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Full point achievable (Pass)', 'pass', 'pass'),
                opt('Limited range (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'ankle_pf_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'shoulder',
      name: 'Shoulder Mobility',
      tests: [
        {
          id: 'shoulder_flexion',
          name: 'Shoulder Flexion',
          parameters: [
            {
              id: 'shoulder_flexion_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Full overhead reach (Pass)', 'pass', 'pass'),
                opt('Limited overhead (Restricted)', 'restricted', 'restricted'),
                opt('Significant limitation (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'shoulder_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain during movement (Painful)', 'pain', 'painful'),
              ],
            },
            {
              id: 'shoulder_flexion_compensation',
              name: 'Compensatory Factor',
              type: 'dropdown',
              options: [
                opt('No compensation (Pass)', 'pass', 'pass'),
                opt('Rib flare or back arch (Compensated)', 'compensated', 'restricted'),
              ],
            },
          ],
        },
        {
          id: 'shoulder_internal_rotation',
          name: 'Internal Rotation',
          parameters: [
            {
              id: 'shoulder_ir_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Hand reaches opposite scapula (Pass)', 'pass', 'pass'),
                opt('Hand reaches midback (Restricted)', 'restricted', 'restricted'),
                opt('Hand below waist (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'shoulder_ir_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'shoulder_external_rotation',
          name: 'External Rotation',
          parameters: [
            {
              id: 'shoulder_er_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('90°+ rotation (Pass)', 'pass', 'pass'),
                opt('70-90° rotation (Restricted)', 'restricted', 'restricted'),
                opt('Less than 70° (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'shoulder_er_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain present (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'spine',
      name: 'Spine Mobility',
      tests: [
        {
          id: 'spine_flexion',
          name: 'Spinal Flexion',
          parameters: [
            {
              id: 'spine_flexion_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Fingertips touch floor (Pass)', 'pass', 'pass'),
                opt('Fingertips reach shins (Restricted)', 'restricted', 'restricted'),
                opt('Limited flexion (Severely Limited)', 'severe', 'painful'),
              ],
            },
            {
              id: 'spine_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain during flexion (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'spine_extension',
          name: 'Spinal Extension',
          parameters: [
            {
              id: 'spine_extension_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Comfortable extension (Pass)', 'pass', 'pass'),
                opt('Limited extension (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'spine_extension_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain during extension (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'spine_rotation',
          name: 'Spinal Rotation',
          parameters: [
            {
              id: 'spine_rotation_rom',
              name: 'Range of Motion',
              type: 'dropdown',
              options: [
                opt('Full rotation both sides (Pass)', 'pass', 'pass'),
                opt('Asymmetric or limited (Restricted)', 'restricted', 'restricted'),
              ],
            },
            {
              id: 'spine_rotation_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain (Pass)', 'pass', 'pass'),
                opt('Pain during rotation (Painful)', 'pain', 'painful'),
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ============ MOVEMENT ASSESSMENT ============
export const movementSection: Section = {
  id: 'movement',
  name: 'Movement Assessment',
  component: 'Movement',
  icon: '🏃',
  subsections: [
    {
      id: 'ohs_front',
      name: 'Overhead Squat – Front View',
      tests: [
        {
          id: 'ohs_feet',
          name: 'Feet Position',
          parameters: [
            {
              id: 'ohs_feet_alignment',
              name: 'Alignment',
              type: 'dropdown',
              options: [
                opt('Feet straight (Pass)', 'pass', 'pass'),
                opt('Slight turn out (Restricted)', 'restricted', 'restricted'),
                opt('Significant turn out (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ohs_knees_front',
          name: 'Knee Tracking',
          parameters: [
            {
              id: 'ohs_knees_valgus',
              name: 'Valgus',
              type: 'dropdown',
              options: [
                opt('Knees track over toes (Pass)', 'pass', 'pass'),
                opt('Slight valgus (Restricted)', 'restricted', 'restricted'),
                opt('Significant valgus collapse (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ohs_weight',
          name: 'Weight Distribution',
          parameters: [
            {
              id: 'ohs_weight_shift',
              name: 'Shift',
              type: 'dropdown',
              options: [
                opt('Even weight distribution (Pass)', 'pass', 'pass'),
                opt('Slight shift to one side (Restricted)', 'restricted', 'restricted'),
                opt('Significant shift (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ohs_side',
      name: 'Overhead Squat – Side View',
      tests: [
        {
          id: 'ohs_torso',
          name: 'Torso Position',
          parameters: [
            {
              id: 'ohs_forward_lean',
              name: 'Forward Lean',
              type: 'dropdown',
              options: [
                opt('Torso upright (Pass)', 'pass', 'pass'),
                opt('Moderate forward lean (Restricted)', 'restricted', 'restricted'),
                opt('Excessive forward lean (Issue)', 'excessive', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ohs_arms',
          name: 'Arm Position',
          parameters: [
            {
              id: 'ohs_arms_fall',
              name: 'Arm Drift',
              type: 'dropdown',
              options: [
                opt('Arms stay overhead (Pass)', 'pass', 'pass'),
                opt('Arms drift forward (Restricted)', 'restricted', 'restricted'),
                opt('Arms fall significantly (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ohs_heels',
          name: 'Heel Position',
          parameters: [
            {
              id: 'ohs_heels_rise',
              name: 'Heel Rise',
              type: 'dropdown',
              options: [
                opt('Heels stay down (Pass)', 'pass', 'pass'),
                opt('Slight heel rise (Restricted)', 'restricted', 'restricted'),
                opt('Heels come off floor (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ohs_back',
      name: 'Overhead Squat – Back View',
      tests: [
        {
          id: 'ohs_symmetry',
          name: 'Symmetry',
          parameters: [
            {
              id: 'ohs_asymmetric_shift',
              name: 'Weight Shift',
              type: 'dropdown',
              options: [
                opt('Symmetric descent (Pass)', 'pass', 'pass'),
                opt('Slight asymmetry (Restricted)', 'restricted', 'restricted'),
                opt('Significant asymmetry (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
        {
          id: 'ohs_heels_back',
          name: 'Heel Rise (Back View)',
          parameters: [
            {
              id: 'ohs_heel_rise_back',
              name: 'Heel Rise',
              type: 'dropdown',
              options: [
                opt('Both heels grounded (Pass)', 'pass', 'pass'),
                opt('One heel rises (Restricted)', 'restricted', 'restricted'),
                opt('Both heels rise (Issue)', 'significant', 'painful'),
              ],
            },
          ],
        },
      ],
    },
  ],
};

// ============ STRENGTH TESTS ============
export const strengthSection: Section = {
  id: 'strength',
  name: 'Strength Tests',
  component: 'Strength',
  icon: '💪',
  tests: [
    {
      id: 'pushups',
      name: 'Push-ups',
      parameters: [
        {
          id: 'pushups_reps',
          name: 'Repetitions',
          type: 'number',
          unit: 'reps',
          benchmarks: { beginner: 10, intermediate: 25, advanced: 40 },
        },
      ],
    },
    {
      id: 'plank',
      name: 'Plank Hold',
      parameters: [
        {
          id: 'plank_time',
          name: 'Duration',
          type: 'number',
          unit: 'seconds',
          benchmarks: { beginner: 30, intermediate: 60, advanced: 120 },
        },
      ],
    },
    {
      id: 'squats',
      name: 'Bodyweight Squats',
      parameters: [
        {
          id: 'squats_reps',
          name: 'Repetitions',
          type: 'number',
          unit: 'reps',
          benchmarks: { beginner: 15, intermediate: 30, advanced: 50 },
        },
      ],
    },
    {
      id: 'wall_sit',
      name: 'Wall Sit',
      parameters: [
        {
          id: 'wall_sit_time',
          name: 'Duration',
          type: 'number',
          unit: 'seconds',
          benchmarks: { beginner: 30, intermediate: 60, advanced: 90 },
        },
      ],
    },
  ],
};

// ============ ENDURANCE TESTS ============
export const enduranceSection: Section = {
  id: 'endurance',
  name: 'Endurance Tests',
  component: 'Endurance',
  icon: '❤️',
  tests: [
    {
      id: 'breath_hold',
      name: 'Breath Hold Test',
      parameters: [
        {
          id: 'breath_hold_time',
          name: 'Duration',
          type: 'number',
          unit: 'seconds',
          benchmarks: { beginner: 20, intermediate: 40, advanced: 60 },
        },
      ],
    },
    {
      id: 'counting_breath',
      name: 'Counting Breath Test',
      parameters: [
        {
          id: 'counting_breath_rate',
          name: 'Breathing Rate',
          type: 'number',
          unit: 'breaths/min',
          benchmarks: { beginner: 20, intermediate: 14, advanced: 8 },
        },
      ],
    },
    {
      id: 'sit_to_stand',
      name: 'Sit-to-Stand (30 sec)',
      parameters: [
        {
          id: 'sit_to_stand_reps',
          name: 'Repetitions',
          type: 'number',
          unit: 'reps',
          benchmarks: { beginner: 10, intermediate: 18, advanced: 25 },
        },
      ],
    },
  ],
};

// ============ BALANCE TEST ============
export const balanceSection: Section = {
  id: 'balance',
  name: 'Balance – Single Leg Stance Test',
  component: 'Balance',
  icon: '⚖️',
  tests: [
    {
      id: 'single_leg_left',
      name: 'Single Leg Stance (Left)',
      parameters: [
        {
          id: 'single_leg_left_quality',
          name: 'Quality',
          type: 'dropdown',
          options: [
            { label: 'Good Control – Eyes Open', value: 'good_control', status: 'pass', severity: 'green', description: 'Stable, minimal sway' },
            { label: 'Minor Wobbles', value: 'minor_wobbles', status: 'restricted', severity: 'yellow', description: 'Some sway visible' },
            { label: 'Multiple Compensations', value: 'multiple_comp', status: 'restricted', severity: 'yellow', description: 'Clear movement errors' },
            { label: 'Loss of Balance', value: 'loss_balance', status: 'painful', severity: 'red', description: 'Cannot maintain' },
          ],
        },
        {
          id: 'single_leg_left_time',
          name: 'Time of Balance',
          type: 'number',
          unit: 'seconds',
        },
      ],
    },
    {
      id: 'single_leg_right',
      name: 'Single Leg Stance (Right)',
      parameters: [
        {
          id: 'single_leg_right_quality',
          name: 'Quality',
          type: 'dropdown',
          options: [
            { label: 'Good Control – Eyes Open', value: 'good_control', status: 'pass', severity: 'green', description: 'Stable, minimal sway' },
            { label: 'Minor Wobbles', value: 'minor_wobbles', status: 'restricted', severity: 'yellow', description: 'Some sway visible' },
            { label: 'Multiple Compensations', value: 'multiple_comp', status: 'restricted', severity: 'yellow', description: 'Clear movement errors' },
            { label: 'Loss of Balance', value: 'loss_balance', status: 'painful', severity: 'red', description: 'Cannot maintain' },
          ],
        },
        {
          id: 'single_leg_right_time',
          name: 'Time of Balance',
          type: 'number',
          unit: 'seconds',
        },
      ],
    },
  ],
};

// ============ AMRAP CONDITIONING ============

export interface AmrapExercise {
  category: string;
  primaryMovement: string;
  regressionOption: string;
  defaultRepsTime: string;
  defaultCoachNotes: string;
}

export interface AmrapProtocol {
  id: string;
  name: string;
  color: string;
  exercises: AmrapExercise[];
}

export const amrapProtocols: AmrapProtocol[] = [
  {
    id: 'standard',
    name: 'AMRAP – STANDARD (10 min)',
    color: 'teal',
    exercises: [
      { category: 'Upper Body Push', primaryMovement: 'Push-ups', regressionOption: 'Knee Push-ups', defaultRepsTime: '7 reps', defaultCoachNotes: 'Neutral spine, full ROM' },
      { category: 'Upper Body + Core', primaryMovement: 'Plank to High Plank', regressionOption: 'High Plank Shoulder Taps', defaultRepsTime: '7 reps', defaultCoachNotes: 'Avoid lumbar sag' },
      { category: 'Lower Body', primaryMovement: 'Split Jumps', regressionOption: 'Backward / Assisted Lunges', defaultRepsTime: '7 ea leg', defaultCoachNotes: 'Knee tracking' },
      { category: 'Core Rotation', primaryMovement: 'Russian Twists', regressionOption: 'Feet on Floor Twists', defaultRepsTime: '7 each side', defaultCoachNotes: 'Avoid lumbar flexion pain' },
      { category: 'Endurance', primaryMovement: 'Burpees', regressionOption: 'Step-back Burpees', defaultRepsTime: '7 reps', defaultCoachNotes: 'Monitor HR' },
      { category: 'Isometric Hold', primaryMovement: 'Beast Hold', regressionOption: 'High Plank Hold', defaultRepsTime: '30 sec', defaultCoachNotes: 'Neutral spine' },
    ],
  },
  {
    id: 'knee_safe',
    name: 'AMRAP – KNEE PAIN SAFE (10 min)',
    color: 'orange',
    exercises: [
      { category: 'Upper Body Push', primaryMovement: 'Push-ups', regressionOption: 'Knee Push-ups', defaultRepsTime: '7 reps', defaultCoachNotes: 'Neutral spine, full ROM' },
      { category: 'Upper Body + Core', primaryMovement: 'Plank to High Plank', regressionOption: 'High Plank Shoulder Taps', defaultRepsTime: '7 reps', defaultCoachNotes: 'Avoid lumbar sag' },
      { category: 'Core Rotation', primaryMovement: 'Russian Twists', regressionOption: 'Feet on Floor Twists', defaultRepsTime: '7 each side', defaultCoachNotes: 'Avoid lumbar flexion pain' },
      { category: 'Upper Body', primaryMovement: 'Tricep Dips', regressionOption: 'Tricep Dips', defaultRepsTime: '7 each side', defaultCoachNotes: 'Neutral spine' },
      { category: 'Endurance', primaryMovement: 'Elbow Plank / Mtn Climbers', regressionOption: 'Mountain Climbers', defaultRepsTime: '30 sec', defaultCoachNotes: 'Monitor HR' },
      { category: 'Isometric Hold', primaryMovement: 'Beast Hold / Plank Hold', regressionOption: 'High Plank Hold', defaultRepsTime: '30 sec', defaultCoachNotes: 'Neutral spine' },
    ],
  },
  {
    id: 'back_safe',
    name: 'AMRAP – BACK PAIN SAFE (10 min)',
    color: 'coral',
    exercises: [
      { category: 'Upper Body Push', primaryMovement: 'Push-ups', regressionOption: 'Knee Push-ups', defaultRepsTime: '7 reps', defaultCoachNotes: 'Neutral spine, full ROM' },
      { category: 'Upper Body + Core', primaryMovement: 'Plank to High Plank', regressionOption: 'High Plank Shoulder Taps', defaultRepsTime: '7 reps', defaultCoachNotes: 'Avoid lumbar sag' },
      { category: 'Upper Body', primaryMovement: 'Tricep Dips', regressionOption: 'Tricep Dips', defaultRepsTime: '7 each side', defaultCoachNotes: 'Neutral spine' },
      { category: 'Isometric Hold', primaryMovement: 'Wall Sit Hold', regressionOption: 'Wall Sit Hold', defaultRepsTime: '30 sec', defaultCoachNotes: 'Perpendicular alignment' },
      { category: 'Endurance', primaryMovement: 'Mountain Climbers', regressionOption: 'Mountain Climbers', defaultRepsTime: '30 sec', defaultCoachNotes: 'Monitor HR' },
      { category: 'Endurance', primaryMovement: 'Foot Fires', regressionOption: 'Marching in Place', defaultRepsTime: '30 sec', defaultCoachNotes: 'No spinal flexion' },
    ],
  },
];

export interface AmrapScoringParam {
  id: string;
  name: string;
  description: string;
  options: { label: string; value: string; score: number; status: StatusFlag }[];
}

export const amrapScoringGuide: AmrapScoringParam[] = [
  {
    id: 'amrap_rounds',
    name: 'Rounds Completed',
    description: 'Total full rounds in 10 min',
    options: [
      { label: '1 round', value: '1', score: 1, status: 'painful' },
      { label: '2-3 rounds', value: '2-3', score: 2, status: 'restricted' },
      { label: '3+ rounds', value: '3+', score: 3, status: 'pass' },
    ],
  },
  {
    id: 'amrap_hr',
    name: 'HR Response',
    description: 'Normal / Elevated / Excessive',
    options: [
      { label: 'Normal', value: 'normal', score: 3, status: 'pass' },
      { label: 'Elevated', value: 'elevated', score: 2, status: 'restricted' },
      { label: 'Excessive', value: 'excessive', score: 1, status: 'painful' },
    ],
  },
  {
    id: 'amrap_quality',
    name: 'Movement Quality',
    description: 'Good / Compensated / Poor',
    options: [
      { label: 'Good', value: 'good', score: 3, status: 'pass' },
      { label: 'Compensated', value: 'compensated', score: 2, status: 'restricted' },
      { label: 'Poor', value: 'poor', score: 1, status: 'painful' },
    ],
  },
  {
    id: 'amrap_pain',
    name: 'Pain Report',
    description: 'Severe / Tolerable / No',
    options: [
      { label: 'No Pain', value: 'no', score: 3, status: 'pass' },
      { label: 'Tolerable', value: 'tolerable', score: 2, status: 'restricted' },
      { label: 'Severe', value: 'severe', score: 1, status: 'painful' },
    ],
  },
];

export const amrapSection: Section = {
  id: 'amrap',
  name: 'AMRAP Conditioning Test',
  component: 'Conditioning',
  icon: '⏱️',
  tests: [
    {
      id: 'amrap_scoring',
      name: 'AMRAP Scoring',
      parameters: [
        {
          id: 'amrap_rounds_score',
          name: 'Rounds Completed',
          type: 'dropdown',
          options: [
            opt('1 round (Score: 1)', '1', 'painful'),
            opt('2-3 rounds (Score: 2)', '2-3', 'restricted'),
            opt('3+ rounds (Score: 3)', '3+', 'pass'),
          ],
        },
        {
          id: 'amrap_hr_score',
          name: 'HR Response',
          type: 'dropdown',
          options: [
            opt('Normal (Score: 3)', 'normal', 'pass'),
            opt('Elevated (Score: 2)', 'elevated', 'restricted'),
            opt('Excessive (Score: 1)', 'excessive', 'painful'),
          ],
        },
        {
          id: 'amrap_quality_score',
          name: 'Movement Quality',
          type: 'dropdown',
          options: [
            opt('Good (Score: 3)', 'good', 'pass'),
            opt('Compensated (Score: 2)', 'compensated', 'restricted'),
            opt('Poor (Score: 1)', 'poor', 'painful'),
          ],
        },
        {
          id: 'amrap_pain_score',
          name: 'Pain Report',
          type: 'dropdown',
          options: [
            opt('No Pain (Score: 3)', 'no', 'pass'),
            opt('Tolerable (Score: 2)', 'tolerable', 'restricted'),
            opt('Severe (Score: 1)', 'severe', 'painful'),
          ],
        },
      ],
    },
  ],
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

// ===== Helper functions =====

export function getParameterStatus(param: Parameter, value: string): StatusFlag {
  if (!param.options) return 'pass';
  const option = param.options.find(o => o.value === value);
  return option?.status ?? 'pass';
}

export function getParameterSeverity(param: Parameter, value: string): SeverityLevel {
  if (!param.options) return 'green';
  const option = param.options.find(o => o.value === value);
  return option?.severity ?? 'green';
}

export function getStrengthLevel(value: number, benchmarks: { beginner: number; intermediate: number; advanced: number }, invertScale = false): string {
  if (invertScale) {
    if (value <= benchmarks.advanced) return 'Advanced';
    if (value <= benchmarks.intermediate) return 'Intermediate';
    return 'Beginner';
  }
  if (value >= benchmarks.advanced) return 'Advanced';
  if (value >= benchmarks.intermediate) return 'Intermediate';
  return 'Beginner';
}

export function getStrengthStatus(level: string): StatusFlag {
  if (level === 'Advanced' || level === 'Intermediate') return 'pass';
  return 'restricted';
}

// Get all parameters from a section flattened
export function getAllParameters(section: Section): { param: Parameter; testName: string; subName?: string }[] {
  const result: { param: Parameter; testName: string; subName?: string }[] = [];

  if (section.subsections) {
    for (const sub of section.subsections) {
      for (const test of sub.tests) {
        for (const param of test.parameters) {
          result.push({ param, testName: test.name, subName: sub.name });
        }
      }
    }
  }

  if (section.tests) {
    for (const test of section.tests) {
      for (const param of test.parameters) {
        result.push({ param, testName: test.name });
      }
    }
  }

  return result;
}

// Section result: pass / limitation / red_flag
export function getSectionStatus(section: Section, dropdownResults: Record<string, string>, numericResults: Record<string, number>): 'pass' | 'limitation' | 'red_flag' {
  const params = getAllParameters(section);
  let hasRestricted = false;
  let hasPainful = false;

  for (const { param } of params) {
    if (param.type === 'dropdown') {
      const val = dropdownResults[param.id];
      if (val) {
        const status = getParameterStatus(param, val);
        if (status === 'painful') hasPainful = true;
        else if (status === 'restricted') hasRestricted = true;
      }
    } else if (param.type === 'number' && param.benchmarks) {
      const val = numericResults[param.id];
      if (val !== undefined) {
        const invertScale = param.id === 'counting_breath_rate';
        const level = getStrengthLevel(val, param.benchmarks, invertScale);
        if (level === 'Beginner') hasRestricted = true;
      }
    }
  }

  if (hasPainful) return 'red_flag';
  if (hasRestricted) return 'limitation';
  return 'pass';
}

// Section score for client report
export function getSectionScore(sectionId: string, results: Record<string, string>, numericResults: Record<string, number>): string {
  const section = allSections.find(s => s.id === sectionId);
  if (!section) return 'N/A';

  const params = getAllParameters(section);
  let total = 0;
  let score = 0;

  for (const { param } of params) {
    if (param.type === 'dropdown') {
      total++;
      const val = results[param.id];
      if (val) {
        const status = getParameterStatus(param, val);
        if (status === 'pass') score += 1;
        else if (status === 'restricted') score += 0.5;
      }
    } else if (param.type === 'number' && param.benchmarks) {
      total++;
      const val = numericResults[param.id];
      if (val !== undefined) {
        const invertScale = param.id === 'counting_breath_rate';
        const level = getStrengthLevel(val, param.benchmarks, invertScale);
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

// Overall score 0-100
export function calculateOverallScore(results: Record<string, string>, numericResults: Record<string, number>): number {
  let totalParams = 0;
  let passedScore = 0;

  for (const section of allSections) {
    const params = getAllParameters(section);
    for (const { param } of params) {
      if (param.type === 'dropdown') {
        totalParams++;
        const val = results[param.id];
        if (val) {
          const status = getParameterStatus(param, val);
          if (status === 'pass') passedScore += 1;
          else if (status === 'restricted') passedScore += 0.5;
        }
      } else if (param.type === 'number' && param.benchmarks) {
        totalParams++;
        const val = numericResults[param.id];
        if (val !== undefined) {
          const invertScale = param.id === 'counting_breath_rate';
          const level = getStrengthLevel(val, param.benchmarks, invertScale);
          if (level === 'Advanced') passedScore += 1;
          else if (level === 'Intermediate') passedScore += 0.7;
          else passedScore += 0.3;
        }
      }
    }
  }

  if (totalParams === 0) return 0;
  return Math.round((passedScore / totalParams) * 100);
}
