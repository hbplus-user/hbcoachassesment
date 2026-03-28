// Status flags and severity levels
export type SeverityLevel = 'green' | 'yellow' | 'red';

export interface BenchmarkOption {
  label: string;
  value: string;
  severity: SeverityLevel;
  outputFlag: string;
  description?: string;
}

export interface Parameter {
  id: string;
  name: string;
  type: 'dropdown' | 'number';
  options?: BenchmarkOption[];
  unit?: string;
  benchmarks?: { beginner: number; intermediate: number; advanced: number; labels?: [string, string, string] };
}

export interface TestDefinition {
  id: string;
  name: string;
  minAge?: number;
  maxAge?: number;
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
const opt = (label: string, value: string, severity: SeverityLevel, outputFlag: string): BenchmarkOption => ({
  label,
  value,
  severity,
  outputFlag,
});

// ============ MOBILITY ASSESSMENT ============
export const mobilitySection: Section = {
  id: 'mobility',
  name: 'Mobility',
  component: 'Mobility',
  icon: '🦴',
  subsections: [
    {
      id: 'cervical',
      name: 'Cervical',
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
                opt('Chin touches / very close to sternum', 'pass', 'green', 'Pass'),
                opt('< 45° of movement', 'restricted', 'red', 'Restricted'),
              ],
            },
            {
              id: 'cervical_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain', 'pass', 'green', 'Pass'),
                opt('Pain at neck or top of shoulders', 'pain', 'red', 'Painful'),
              ],
            },
            {
              id: 'cervical_flexion_compensation',
              name: 'Compensatory Factor',
              type: 'dropdown',
              options: [
                opt('No thoracic compensation', 'pass', 'green', 'Pass'),
                opt('Excess thoracic flexion', 'compensated', 'red', 'Compensated'),
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
                opt('80°+ extension', 'pass', 'green', 'Pass'),
                opt('Eyes cannot reach horizontal', 'restricted', 'red', 'Restriction'),
              ],
            },
            {
              id: 'cervical_extension_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain', 'pass', 'green', 'Pass'),
                opt('Pain present', 'pain', 'red', 'Painful'),
              ],
            },
            {
              id: 'cervical_extension_compensation',
              name: 'Compensatory Factor',
              type: 'dropdown',
              options: [
                opt('No low-back compensation', 'pass', 'green', 'Pass'),
                opt('Lumbar hinge pattern', 'compensated', 'red', 'Compensated'),
              ],
            },
          ],
        },
        {
          id: 'cervical_rotation',
          name: 'Cervical Rotation (L + R)',
          parameters: [
            {
              id: 'cervical_rotation_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('80° rotation', 'pass', 'green', 'Pass'),
                opt('Asymmetry > 10°', 'restricted', 'red', 'Restriction'),
              ],
            },
            {
              id: 'cervical_rotation_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain', 'pass', 'green', 'Pass'),
                opt('Pain present', 'pain', 'red', 'Painful'),
              ],
            },
            {
              id: 'cervical_rotation_symmetry',
              name: 'Symmetry',
              type: 'dropdown',
              options: [
                opt('Symmetrical', 'pass', 'green', 'Pass'),
                opt('Tightness on one side', 'imbalance', 'red', 'Muscle Imbalance'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'hip',
      name: 'Hip',
      tests: [
        {
          id: 'hip_flexion',
          name: 'Flexion',
          parameters: [
            {
              id: 'hip_flexion_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Thigh reaches ≥ 120° hip flexion', 'pass', 'green', 'Pass'),
                opt('Thigh < 120°', 'restricted', 'red', 'Restricted'),
              ],
            },
            {
              id: 'hip_flexion_pelvic',
              name: 'Pelvic Control',
              type: 'dropdown',
              options: [
                opt('Sacrum stays neutral', 'pass', 'green', 'Pass'),
                opt('Posterior pelvic tilt', 'poor_control', 'red', 'Poor Pelvic Control'),
              ],
            },
            {
              id: 'hip_flexion_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain', 'pass', 'green', 'Pass'),
                opt('Pain / pinching in hip or groin', 'painful', 'red', 'Painful'),
              ],
            },
          ],
        },
        {
          id: 'hip_extension',
          name: 'Extension',
          parameters: [
            {
              id: 'hip_extension_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Thigh drops to table or below', 'pass', 'green', 'Pass'),
                opt('Thigh remains elevated', 'tight_flexor', 'red', 'Hip Flexor Tightness'),
              ],
            },
            {
              id: 'hip_extension_compensation',
              name: 'Compensation',
              type: 'dropdown',
              options: [
                opt('Knee flexes ~80–90°', 'pass', 'green', 'Pass'),
                opt('Excess lumbar arch', 'lumbar_comp', 'red', 'Lumbar Compensation'),
              ],
            },
            {
              id: 'hip_extension_tightness',
              name: 'Tightness',
              type: 'dropdown',
              options: [
                opt('Pelvis neutral', 'pass', 'green', 'Pass'),
                opt('Knee extends (rectus femoris)', 'rectus_tight', 'red', 'Rectus Femoris Tight'),
              ],
            },
          ],
        },
        {
          id: 'hip_internal_rotation',
          name: 'Internal Rotation',
          parameters: [
            {
              id: 'hip_ir_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('30–40° IR', 'pass', 'green', 'Pass'),
                opt('< 30°', 'restricted', 'red', 'Restriction'),
              ],
            },
            {
              id: 'hip_ir_pelvis',
              name: 'Pelvis Position',
              type: 'dropdown',
              options: [
                opt('Pelvis stable', 'pass', 'green', 'Pass'),
                opt('Pelvic shift', 'dissociation', 'red', 'Hip-Pelvis Dissociation'),
              ],
            },
          ],
        },
        {
          id: 'hip_external_rotation',
          name: 'External Rotation',
          parameters: [
            {
              id: 'hip_er_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('40–50° ER', 'pass', 'green', 'Pass'),
                opt('< 40°', 'restricted', 'red', 'Restriction'),
              ],
            },
            {
              id: 'hip_er_pelvis',
              name: 'Pelvis Position',
              type: 'dropdown',
              options: [
                opt('Pelvis stable', 'pass', 'green', 'Pass'),
                opt('Trunk lean or pelvic rotation', 'rotational_control', 'red', 'Rotational Hip Control'),
              ],
            },
          ],
        },
        {
          id: 'hip_abduction',
          name: 'Abduction',
          parameters: [
            {
              id: 'hip_abd_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('35–45° abduction', 'pass', 'green', 'Pass'),
                opt('Limited lift', 'restricted', 'red', 'Restricted'),
              ],
            },
            {
              id: 'hip_abd_pelvic',
              name: 'Pelvic Stability',
              type: 'dropdown',
              options: [
                opt('Pelvis stacked', 'pass', 'green', 'Pass'),
                opt('Pelvic hike or roll', 'instability', 'red', 'Pelvic Instability'),
              ],
            },
          ],
        },
        {
          id: 'hip_adduction',
          name: 'Adduction',
          parameters: [
            {
              id: 'hip_add_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('20–30° adduction', 'pass', 'green', 'Pass'),
                opt('Limited ROM', 'restriction', 'red', 'Restriction'),
              ],
            },
            {
              id: 'hip_add_pelvic',
              name: 'Pelvic Stability',
              type: 'dropdown',
              options: [
                opt('Pelvis stable', 'pass', 'green', 'Pass'),
                opt('Trunk shift', 'instability', 'red', 'Medial Hip Instability'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ankle',
      name: 'Ankle',
      tests: [
        {
          id: 'ankle_dorsiflexion',
          name: 'Dorsiflexion',
          parameters: [
            {
              id: 'ankle_df_movement',
              name: 'Movement',
              type: 'dropdown',
              options: [
                opt('Knee touches wall, heel stays down', 'pass', 'green', 'Pass'),
                opt('Knee cannot reach wall / heel lifts', 'restricted', 'red', 'Restricted'),
              ],
            },
            {
              id: 'ankle_df_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('No pain', 'pass', 'green', 'Pass'),
                opt('Pain or pinching in ankle', 'painful', 'red', 'Painful'),
              ],
            },
            {
              id: 'ankle_df_stability',
              name: 'Stability',
              type: 'dropdown',
              options: [
                opt('Controlled movement', 'pass', 'green', 'Pass'),
                opt('Foot collapses (excess pronation)', 'instability', 'red', 'Foot Instability'),
              ],
            },
            {
              id: 'ankle_df_alignment',
              name: 'Alignment',
              type: 'dropdown',
              options: [
                opt('Pelvis remains neutral', 'pass', 'green', 'Pass'),
                opt('Knee deviates medially / laterally', 'tracking', 'red', 'Poor Knee Tracking'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'shoulder',
      name: 'Shoulder',
      tests: [
        {
          id: 'shoulder_scapulo',
          name: 'Scapulo-Humeral Mobility',
          parameters: [
            {
              id: 'shoulder_mobility',
              name: 'Mobility',
              type: 'dropdown',
              options: [
                opt('Fists > one hand-length apart', 'pass', 'green', 'Pass'),
                opt('Fists close but < one hand-length', 'moderate', 'red', 'Moderate Limitation'),
              ],
            },
            {
              id: 'shoulder_compensation',
              name: 'Compensation',
              type: 'dropdown',
              options: [
                opt('No rounding / twisting', 'pass', 'green', 'Pass'),
                opt('Mild stiffness or compensation', 'limited', 'red', 'Limited Shoulder Mobility'),
              ],
            },
            {
              id: 'shoulder_pain',
              name: 'Pain',
              type: 'dropdown',
              options: [
                opt('Pain-free', 'pass', 'green', 'Pass'),
                opt('Movement looks restricted / uncomfortable', 'painful', 'red', 'Painful'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'spine',
      name: 'Spine',
      tests: [
        {
          id: 'spine_cat_cow',
          name: 'Cat-Cow',
          parameters: [
            {
              id: 'cat_cow_tightness',
              name: 'Tightness',
              type: 'dropdown',
              options: [
                opt('Long spine, compression', 'pass', 'green', 'Pass'),
                opt('Neck driving most of movement', 'stiffness', 'red', 'Thoracic Stiffness'),
              ],
            },
            {
              id: 'cat_cow_thoracic',
              name: 'Thoracic Extension',
              type: 'dropdown',
              options: [
                opt('Smooth and visible extension coming from mid-upper back', 'pass', 'green', 'Pass'),
                opt('Excess lumbar arching in cow', 'poor_ext', 'red', 'Poor Thoracic Extension'),
              ],
            },
            {
              id: 'cat_cow_dissociation',
              name: 'Hip-Pelvis Dissociation',
              type: 'dropdown',
              options: [
                opt('Pelvis tilts anterior/posterior smoothly independent of rib cage', 'pass', 'green', 'Pass'),
                opt('Minimal pelvic movement', 'dissociation', 'red', 'Hip-Pelvis Dissociation'),
              ],
            },
            {
              id: 'cat_cow_motor_control',
              name: 'Motor Control',
              type: 'dropdown',
              options: [
                opt('No shaking, jerks, or sudden transitions', 'pass', 'green', 'Pass'),
                opt('Jerky motion', 'poor_control', 'red', 'Poor Motor Control'),
              ],
            },
            {
              id: 'cat_cow_spinal_control',
              name: 'Spinal Control',
              type: 'dropdown',
              options: [
                opt('Even distribution of movement across cervical, thoracic, and lumbar spine', 'pass', 'green', 'Pass'),
                opt('Breath holding observed', 'high_tone', 'red', 'High Tone / Poor Control'),
              ],
            },
          ],
        },
        {
          id: 'spine_aslr',
          name: 'Active Straight Leg Raise',
          parameters: [
            {
              id: 'aslr_tightness_1',
              name: 'Tightness (Moving Leg)',
              type: 'dropdown',
              options: [
                opt('Raised leg reaches 70–90° without compensation', 'pass', 'green', 'Pass'),
                opt('Raised leg < 70° without compensation', 'restriction', 'red', 'ROM restriction'),
                opt('Moving leg remains straight', 'straight', 'green', 'Pass'),
                opt('Moving knee bends', 'hamstrings', 'red', 'Tight Hamstrings'),
              ],
            },
            {
              id: 'aslr_tightness_2',
              name: 'Tightness (Grounded Leg)',
              type: 'dropdown',
              options: [
                opt('Bottom leg stays grounded', 'pass', 'green', 'Pass'),
                opt('Bottom heel lifts', 'flexors', 'red', 'Tight Hip Flexors (Grounded)'),
              ],
            },
            {
              id: 'aslr_pelvic_pos',
              name: 'Pelvic Position',
              type: 'dropdown',
              options: [
                opt('Pelvis remains neutral and stable', 'pass', 'green', 'Pass'),
                opt('Posterior pelvic tilt', 'dominant', 'red', 'Hamstrings Dominant'),
              ],
            },
            {
              id: 'aslr_arching',
              name: 'Arching of Spine',
              type: 'dropdown',
              options: [
                opt('Lumbar spine remains neutral', 'pass', 'green', 'Pass'),
                opt('Lumbar extension (arching)', 'weak_core', 'red', 'Weak Deep Core'),
              ],
            },
            {
              id: 'aslr_hip_imbalance',
              name: 'Hip Imbalance',
              type: 'dropdown',
              options: [
                opt('Both sides show similar control and range', 'pass', 'green', 'Pass'),
                opt('Lower leg rotates outward', 'imbalance', 'red', 'Hip Imbalance'),
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const movementSection: Section = {
  id: 'movement',
  name: 'Movement',
  component: 'Movement',
  icon: '🏃',
  subsections: [
    {
      id: 'ohs',
      name: 'Overhead Squat',
      tests: [
        {
          id: 'ohs_front',
          name: 'OHS – Front View',
          parameters: [
            {
              id: 'ohs_alignment',
              name: 'Alignment',
              type: 'dropdown',
              options: [
                opt('Good Alignment', 'pass', 'green', 'Pass'),
                opt('Feet turn out', 'feet_out', 'red', 'Tight Calves / Hip Rotators'),
                opt('Knees move inward (valgus)', 'valgus', 'red', 'Hip Instability / Weak Glutes'),
                opt('Knees move outward (varus)', 'varus', 'red', 'Tight Hip External Rotators'),
              ],
            },
          ],
        },
        {
          id: 'ohs_side',
          name: 'OHS – Side View',
          parameters: [
            {
              id: 'ohs_mobility_comp',
              name: 'Mobility / Compensation',
              type: 'dropdown',
              options: [
                opt('Good Mobility', 'pass', 'green', 'Pass'),
                opt('Excessive forward lean', 'lean', 'red', 'Tight Hip Flexors / Weak Core'),
                opt('Arms fall forward', 'arms', 'red', 'Shoulder Mobility Restriction'),
                opt('Heels lift off', 'heels', 'red', 'Poor Ankle Dorsiflexion'),
              ],
            },
          ],
        },
        {
          id: 'ohs_back',
          name: 'OHS – Back View',
          parameters: [
            {
              id: 'ohs_stability',
              name: 'Stability',
              type: 'dropdown',
              options: [
                opt('Good Stability', 'pass', 'green', 'Pass'),
                opt('Going deep but tilted', 'tilted', 'red', 'Asymmetry / Mobility Restriction'),
                opt('Not deep enough', 'shallow', 'red', 'Mobility Restricted'),
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const strengthSection: Section = {
  id: 'strength',
  name: 'Strength',
  component: 'Strength',
  icon: '💪',
  subsections: [
    {
      id: 'upper_body_male',
      name: 'Upper Body (Male)',
      tests: [
        {
          id: 'pushups_male',
          name: 'Push-ups (At a go)',
          parameters: [
            {
              id: 'pushups_male_reps',
              name: 'Repetitions',
              type: 'dropdown',
              options: [
                opt('10–20 reps', '10-20', 'red', 'Baseline Endurance'),
                opt('25–35 reps', '25-35', 'yellow', 'Functional Endurance'),
                opt('40–60+ reps', '40-60+', 'green', 'High Muscular Endurance'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'upper_body_female',
      name: 'Upper Body (Female)',
      tests: [
        {
          id: 'pushups_female',
          name: 'Push-ups (At a go)',
          parameters: [
            {
              id: 'pushups_female_reps',
              name: 'Repetitions',
              type: 'dropdown',
              options: [
                opt('5–15 reps', '5-15', 'red', 'Baseline Endurance'),
                opt('20–30 reps', '20-30', 'yellow', 'Functional Endurance'),
                opt('35–50+ reps', '35-50+', 'green', 'High Muscular Endurance'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'core_male',
      name: 'Core (Male)',
      tests: [
        {
          id: 'plank_male',
          name: 'Plank Hold',
          parameters: [
            {
              id: 'plank_male_time',
              name: 'Duration',
              type: 'dropdown',
              options: [
                opt('0–30 secs', '0-30', 'red', 'Inactive core endurance'),
                opt('30–60 sec', '30-60', 'yellow', 'Basic Endurance'),
                opt('60–120 sec', '60-120', 'green', 'Functional Stability'),
                opt('120–180+ sec', '120-180+', 'green', 'High Endurance'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'core_female',
      name: 'Core (Female)',
      tests: [
        {
          id: 'plank_female',
          name: 'Plank Hold',
          parameters: [
            {
              id: 'plank_female_time',
              name: 'Duration',
              type: 'dropdown',
              options: [
                opt('0–30 sec', '0-30', 'red', 'Inactive core endurance'),
                opt('30–45 sec', '30-45', 'yellow', 'Basic Endurance'),
                opt('45–90 sec', '45-90', 'green', 'Functional Stability'),
                opt('90–150+ sec', '90-150+', 'green', 'High Endurance'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lower_body_male_squats',
      name: 'Lower Body (Male)',
      tests: [
        {
          id: 'squats_male',
          name: 'Bodyweight Squats - 1 min',
          parameters: [
            {
              id: 'squats_male_reps',
              name: 'Repetitions',
              type: 'dropdown',
              options: [
                opt('25–30 reps', '25-30', 'red', 'Beginner'),
                opt('30–40 reps', '30-40', 'yellow', 'Intermediate'),
                opt('40–50+ reps', '40-50+', 'green', 'Advanced'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lower_body_female_squats',
      name: 'Lower Body (Female)',
      tests: [
        {
          id: 'squats_female',
          name: 'Bodyweight Squats - 1 min',
          parameters: [
            {
              id: 'squats_female_reps',
              name: 'Repetitions',
              type: 'dropdown',
              options: [
                opt('0–25 reps', '0-25', 'red', 'Beginner'),
                opt('25–35 reps', '25-35', 'yellow', 'Intermediate'),
                opt('35–45+ reps', '35-45+', 'green', 'Advanced'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lower_body_male_wallsit',
      name: 'Lower Body (Male)',
      tests: [
        {
          id: 'wallsit_male',
          name: 'Wall Sit Hold',
          parameters: [
            {
              id: 'wallsit_male_time',
              name: 'Duration',
              type: 'dropdown',
              options: [
                opt('0–45 sec', '0-45', 'red', 'Beginner'),
                opt('45–90 sec', '45-90', 'yellow', 'Intermediate'),
                opt('90–150+ sec', '90-150+', 'green', 'Advanced'),
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lower_body_female_wallsit',
      name: 'Lower Body (Female)',
      tests: [
        {
          id: 'wallsit_female',
          name: 'Wall Sit Hold',
          parameters: [
            {
              id: 'wallsit_female_time',
              name: 'Duration',
              type: 'dropdown',
              options: [
                opt('0–30 sec', '0-30', 'red', 'Beginner'),
                opt('30–60 sec', '30-60', 'yellow', 'Intermediate'),
                opt('60–120+ sec', '60-120+', 'green', 'Advanced'),
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const enduranceSection: Section = {
  id: 'endurance',
  name: 'Endurance',
  component: 'Endurance',
  icon: '❤️',
  subsections: [
    {
      id: 'lung_capacity_male',
      name: 'Lung Capacity (Male)',
      tests: [
        {
          id: 'bht_male',
          name: 'Breath-Hold (BHT)',
          parameters: [
            { id: 'breath_hold_time', name: 'Duration', type: 'number', unit: 'sec' }
          ],
        },
      ],
    },
    {
      id: 'lung_capacity_female',
      name: 'Lung Capacity (Female)',
      tests: [
        {
          id: 'bht_female',
          name: 'Breath-Hold (BHT)',
          parameters: [
            { id: 'breath_hold_time', name: 'Duration', type: 'number', unit: 'sec' }
          ],
        },
      ],
    },
    {
      id: 'breath_control',
      name: 'Breath Control',
      tests: [
        {
          id: 'counting_test',
          name: 'Counting Test',
          parameters: [
            { id: 'counting_breath_rate', name: 'Score', type: 'number', unit: 'count' }
          ],
        },
      ],
    },
    {
      id: 'sit_to_stand_male',
      name: 'Sit-to-Stand (Male)',
      tests: [
        { id: 'sts_m_all', name: '30-sec STS', parameters: [{ id: 'sit_to_stand_reps', name: 'Repetitions', type: 'number', unit: 'reps' }] }
      ],
    },
    {
      id: 'sit_to_stand_female',
      name: 'Sit-to-Stand (Female)',
      tests: [
        { id: 'sts_f_all', name: '30-sec STS', parameters: [{ id: 'sit_to_stand_reps', name: 'Repetitions', type: 'number', unit: 'reps' }] }
      ],
    },
  ],
};

export const balanceSection: Section = {
  id: 'balance',
  name: 'Balance',
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
            opt('Good Control – Eyes Open', 'good_control', 'green', 'Pass'),
            opt('Minor Wobbles', 'minor_wobbles', 'yellow', 'Restricted'),
            opt('Multiple Compensations', 'multiple_comp', 'yellow', 'Restricted'),
            opt('Loss of Balance', 'loss_balance', 'red', 'Painful'),
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
            opt('Good Control – Eyes Open', 'good_control', 'green', 'Pass'),
            opt('Minor Wobbles', 'minor_wobbles', 'yellow', 'Restricted'),
            opt('Multiple Compensations', 'multiple_comp', 'yellow', 'Restricted'),
            opt('Loss of Balance', 'loss_balance', 'red', 'Painful'),
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
      { category: 'Lower Body', primaryMovement: 'Split Jumps', regressionOption: 'Backward / Assisted Lunges', defaultRepsTime: '7 each leg', defaultCoachNotes: 'Knee tracking' },
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
  options: { label: string; value: string; score: number; severity: SeverityLevel; outputFlag: string }[];
}

export const amrapScoringGuide: AmrapScoringParam[] = [
  {
    id: 'amrap_rounds',
    name: 'Rounds Completed',
    description: 'Total full rounds in 10 min',
    options: [
      { label: '1 round', value: '1', score: 1, severity: 'red', outputFlag: 'Painful' },
      { label: '2-3 rounds', value: '2-3', score: 2, severity: 'yellow', outputFlag: 'Restricted' },
      { label: '3+ rounds', value: '3+', score: 3, severity: 'green', outputFlag: 'Pass' },
    ],
  },
  {
    id: 'amrap_hr',
    name: 'HR Response',
    description: 'Normal / Elevated / Excessive',
    options: [
      { label: 'Normal', value: 'normal', score: 3, severity: 'green', outputFlag: 'Pass' },
      { label: 'Elevated', value: 'elevated', score: 2, severity: 'yellow', outputFlag: 'Restricted' },
      { label: 'Excessive', value: 'excessive', score: 1, severity: 'red', outputFlag: 'Painful' },
    ],
  },
  {
    id: 'amrap_quality',
    name: 'Movement Quality',
    description: 'Good / Compensated / Poor',
    options: [
      { label: 'Good', value: 'good', score: 3, severity: 'green', outputFlag: 'Pass' },
      { label: 'Compensated', value: 'compensated', score: 2, severity: 'yellow', outputFlag: 'Restricted' },
      { label: 'Poor', value: 'poor', score: 1, severity: 'red', outputFlag: 'Painful' },
    ],
  },
  {
    id: 'amrap_pain',
    name: 'Pain Report',
    description: 'Severe / Tolerable / No',
    options: [
      { label: 'No Pain', value: 'no', score: 3, severity: 'green', outputFlag: 'Pass' },
      { label: 'Tolerable', value: 'tolerable', score: 2, severity: 'yellow', outputFlag: 'Restricted' },
      { label: 'Severe', value: 'severe', score: 1, severity: 'red', outputFlag: 'Painful' },
    ],
  },
];

export const amrapSection: Section = {
  id: 'amrap',
  name: 'AMRAP Conditioning',
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
            opt('1 round (Score: 1)', '1', 'red', 'Poor'),
            opt('2-3 rounds (Score: 2)', '2-3', 'yellow', 'Average'),
            opt('3+ rounds (Score: 3)', '3+', 'green', 'Good'),
          ],
        },
        {
          id: 'amrap_hr_score',
          name: 'HR Response',
          type: 'dropdown',
          options: [
            opt('Normal (Score: 3)', 'normal', 'green', 'Good'),
            opt('Elevated (Score: 2)', 'elevated', 'yellow', 'Average'),
            opt('Excessive (Score: 1)', 'excessive', 'red', 'Poor'),
          ],
        },
        {
          id: 'amrap_quality_score',
          name: 'Movement Quality',
          type: 'dropdown',
          options: [
            opt('Good (Score: 3)', 'good', 'green', 'Good'),
            opt('Compensated (Score: 2)', 'compensated', 'yellow', 'Average'),
            opt('Poor (Score: 1)', 'poor', 'red', 'Poor'),
          ],
        },
        {
          id: 'amrap_pain_score',
          name: 'Pain Report',
          type: 'dropdown',
          options: [
            opt('No Pain (Score: 3)', 'no', 'green', 'Good'),
            opt('Tolerable (Score: 2)', 'tolerable', 'yellow', 'Average'),
            opt('Severe (Score: 1)', 'severe', 'red', 'Poor'),
          ],
        },
      ],
    },
  ],
};

// ===== Helper functions =====

export function getParameterOption(param: Parameter, value: string): BenchmarkOption | undefined {
  if (!param.options) return undefined;
  return param.options.find(o => o.value === value);
}

export function getParameterSeverity(param: Parameter, value: string): SeverityLevel {
  const option = getParameterOption(param, value);
  return option?.severity ?? 'green';
}

export function getStrengthLevelInfo(value: number, param: Parameter, invertScale = false): { level: string, cssClass: string } {
  const b = param.benchmarks;
  if (!b) return { level: 'Beginner', cssClass: 'bg-[hsl(var(--status-issue))]' };

  const labels = b.labels || ['Beginner', 'Intermediate', 'Advanced'];

  if (invertScale) {
    if (value <= b.advanced) return { level: labels[2], cssClass: 'bg-[hsl(var(--status-pass))] text-white' };
    if (value <= b.intermediate) return { level: labels[1], cssClass: 'bg-[hsl(var(--status-restricted))] text-white' };
    return { level: labels[0], cssClass: 'bg-[hsl(var(--status-issue))] text-white' };
  }

  if (value >= b.advanced) return { level: labels[2], cssClass: 'bg-[hsl(var(--status-pass))] text-white' };
  else if (value >= b.intermediate) return { level: labels[1], cssClass: 'bg-[hsl(var(--status-restricted))] text-white' };
  else if (value >= b.beginner) return { level: labels[0], cssClass: 'bg-[hsl(var(--status-issue))] text-white' };
  return { level: 'Below Baseline', cssClass: 'bg-[hsl(var(--status-issue))] text-white' };
}

export function calculateAge(dobStr?: string): number | undefined {
  if (!dobStr) return undefined;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return undefined;
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// All sections in order
export const allSections: Section[] = [
  mobilitySection,
  movementSection,
  strengthSection,
  enduranceSection,
  balanceSection,
  amrapSection,
];

// Section result: pass / limitation / red_flag
export function getSectionStatus(section: Section, dropdownResults: Record<string, string>, numericResults: Record<string, number>, gender?: string, age?: number): 'pass' | 'limitation' | 'red_flag' {
  const params = getAllParameters(section, gender, age);
  let hasRestricted = false;
  let hasPainful = false;

  for (const { param } of params) {
    if (param.type === 'dropdown') {
      const val = dropdownResults[param.id];
      if (val) {
        const option = getParameterOption(param, val);
        if (option) {
          if (option.severity === 'red') hasPainful = true;
          else if (option.severity === 'yellow') hasRestricted = true;
        }
      }
    } else if (param.type === 'number' && param.benchmarks) {
      const val = numericResults[param.id];
      if (val !== undefined) {
        const invertScale = param.id === 'counting_breath_rate';
        if (invertScale) {
          if (val > param.benchmarks.intermediate) hasRestricted = true;
        } else {
          if (val < param.benchmarks.intermediate) hasRestricted = true;
        }
      }
    }
  }

  if (hasPainful) return 'red_flag';
  if (hasRestricted) return 'limitation';
  return 'pass';
}

export function isVisible(target: { id: string; minAge?: number; maxAge?: number }, gender?: string, age?: number): boolean {
  if (target.minAge !== undefined && age !== undefined && age < target.minAge) return false;
  if (target.maxAge !== undefined && age !== undefined && age > target.maxAge) return false;

  if (!gender) return true;
  const g = gender.toLowerCase();
  if (target.id.includes('_male') && g === 'female') return false;
  if (target.id.includes('_female') && g === 'male') return false;
  return true;
}

export function getAllParameters(section: Section, gender?: string, age?: number): { param: Parameter; testName: string; subName?: string }[] {
  const result: { param: Parameter; testName: string; subName?: string }[] = [];
  if (section.subsections) {
    for (const sub of section.subsections) {
      if (!isVisible({ id: sub.id }, gender, age)) continue;
      for (const test of sub.tests) {
        if (!isVisible({ id: test.id, minAge: test.minAge, maxAge: test.maxAge }, gender, age)) continue;
        for (const param of test.parameters) {
          result.push({ param, testName: test.name, subName: sub.name });
        }
      }
    }
  }
  if (section.tests) {
    for (const test of section.tests) {
      if (!isVisible({ id: test.id, minAge: test.minAge, maxAge: test.maxAge }, gender, age)) continue;
      for (const param of test.parameters) {
        result.push({ param, testName: test.name });
      }
    }
  }
  return result;
}

export function getSectionScore(sectionId: string, results: Record<string, string>, numericResults: Record<string, number>, gender?: string, age?: number): string {
  const section = allSections.find(s => s.id === sectionId);
  if (!section) return 'N/A';
  const params = getAllParameters(section, gender, age);
  let total = 0;
  let score = 0;

  for (const { param } of params) {
    if (param.type === 'dropdown') {
      total++;
      const val = results[param.id];
      if (val) {
        const option = getParameterOption(param, val);
        if (option) {
          if (option.severity === 'green') score += 1;
          else if (option.severity === 'yellow') score += 0.5;
        }
      }
    } else if (param.type === 'number' && param.benchmarks) {
      total++;
      const val = numericResults[param.id];
      if (val !== undefined) {
        const invertScale = param.id === 'counting_breath_rate';
        if (invertScale) {
          if (val <= param.benchmarks.advanced) score += 1;
          else if (val <= param.benchmarks.intermediate) score += 0.7;
          else score += 0.3;
        } else {
          if (val >= param.benchmarks.advanced) score += 1;
          else if (val >= param.benchmarks.intermediate) score += 0.7;
          else score += 0.3;
        }
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

export function calculateOverallScore(results: Record<string, string>, numericResults: Record<string, number>, gender?: string, age?: number): number {
  let totalParams = 0;
  let passedScore = 0;

  for (const section of allSections) {
    const params = getAllParameters(section, gender, age);
    for (const { param } of params) {
      if (param.type === 'dropdown') {
        totalParams++;
        const val = results[param.id];
        if (val) {
          const option = getParameterOption(param, val);
          if (option) {
            if (option.severity === 'green') passedScore += 1;
            else if (option.severity === 'yellow') passedScore += 0.5;
          }
        }
      } else if (param.type === 'number' && param.benchmarks) {
        totalParams++;
        const val = numericResults[param.id];
        if (val !== undefined) {
          const invertScale = param.id === 'counting_breath_rate';
          if (invertScale) {
            if (val <= param.benchmarks.advanced) passedScore += 1;
            else if (val <= param.benchmarks.intermediate) passedScore += 0.7;
            else passedScore += 0.3;
          } else {
            if (val >= param.benchmarks.advanced) passedScore += 1;
            else if (val >= param.benchmarks.intermediate) passedScore += 0.7;
            else passedScore += 0.3;
          }
        }
      }
    }
  }
  if (totalParams === 0) return 0;
  return Math.round((passedScore / totalParams) * 100);
}

// --- ENDURANCE CALCULATION LOGIC ---
export type OutputLevel = 'Low' | 'Average' | 'Good' | 'Very Good' | 'Poor Control' | 'Excellent' | 'Inadequate' | 'Adequate';

export interface BenchmarkRange {
  max?: number;
  min?: number;
  label: OutputLevel;
  color: 'red' | 'yellow' | 'green' | 'emerald';
}

export interface AgeRow {
  ageRange: string;
  ageMin: number;
  ageMax: number;
  threshold: number;
}

export const breathHoldMale: BenchmarkRange[] = [
  { max: 25, label: 'Low', color: 'red' },
  { min: 25, max: 40, label: 'Average', color: 'yellow' },
  { min: 40, max: 60, label: 'Good', color: 'green' },
  { min: 60, label: 'Very Good', color: 'emerald' },
];

export const breathHoldFemale: BenchmarkRange[] = [
  { max: 20, label: 'Low', color: 'red' },
  { min: 20, max: 35, label: 'Average', color: 'yellow' },
  { min: 35, max: 50, label: 'Good', color: 'green' },
  { min: 50, label: 'Very Good', color: 'emerald' },
];

export const countingBreath: BenchmarkRange[] = [
  { max: 20, label: 'Poor Control', color: 'red' },
  { min: 20, max: 40, label: 'Average', color: 'yellow' },
  { min: 40, max: 60, label: 'Good', color: 'green' },
  { min: 60, label: 'Excellent', color: 'emerald' },
];

export const stsAgeMale: AgeRow[] = [
  { ageRange: '8–14', ageMin: 8, ageMax: 14, threshold: 14 },
  { ageRange: '10–15', ageMin: 10, ageMax: 15, threshold: 15 },
  { ageRange: '16–19', ageMin: 16, ageMax: 19, threshold: 17 },
  { ageRange: '20–29', ageMin: 20, ageMax: 29, threshold: 14 },
  { ageRange: '30–39', ageMin: 30, ageMax: 39, threshold: 14 },
  { ageRange: '40–49', ageMin: 40, ageMax: 49, threshold: 13 },
  { ageRange: '50–59', ageMin: 50, ageMax: 59, threshold: 12 },
  { ageRange: '60–69', ageMin: 60, ageMax: 69, threshold: 11 },
  { ageRange: '70–79', ageMin: 70, ageMax: 79, threshold: 10 },
  { ageRange: '80+', ageMin: 80, ageMax: 120, threshold: 8 },
];

export const stsAgeFemale: AgeRow[] = [
  { ageRange: '7–12', ageMin: 7, ageMax: 12, threshold: 12 },
  { ageRange: '8–13', ageMin: 8, ageMax: 13, threshold: 13 },
  { ageRange: '9–16', ageMin: 9, ageMax: 16, threshold: 15 },
  { ageRange: '20–29', ageMin: 20, ageMax: 29, threshold: 12 },
  { ageRange: '30–39', ageMin: 30, ageMax: 39, threshold: 12 },
  { ageRange: '40–49', ageMin: 40, ageMax: 49, threshold: 11 },
  { ageRange: '50–59', ageMin: 50, ageMax: 59, threshold: 10 },
  { ageRange: '60–69', ageMin: 60, ageMax: 69, threshold: 9 },
  { ageRange: '70–79', ageMin: 70, ageMax: 79, threshold: 8 },
  { ageRange: '80+', ageMin: 80, ageMax: 120, threshold: 7 },
];

export function getBreathHoldOutput(value: number, gender: string): { label: OutputLevel; color: string } {
  const ranges = gender === 'female' ? breathHoldFemale : breathHoldMale;
  for (const r of ranges) {
    if (r.max !== undefined && r.min === undefined && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max !== undefined && value >= r.min && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max === undefined && value >= r.min) return { label: r.label, color: r.color };
  }
  return { label: 'Low', color: 'red' };
}

export function getCountingBreathOutput(value: number): { label: OutputLevel; color: string } {
  for (const r of countingBreath) {
    if (r.max !== undefined && r.min === undefined && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max !== undefined && value >= r.min && value < r.max) return { label: r.label, color: r.color };
    if (r.min !== undefined && r.max === undefined && value >= r.min) return { label: r.label, color: r.color };
  }
  return { label: 'Poor Control', color: 'red' };
}

export function getStsOutput(value: number, gender: string, age: number | null): { label: OutputLevel; color: string; matchedAge?: string } {
  if (age === null) return { label: 'Inadequate', color: 'red' };
  const rows = gender === 'female' ? stsAgeFemale : stsAgeMale;
  const row = rows.find(r => age >= r.ageMin && age <= r.ageMax);
  if (!row) {
    const lastRow = rows[rows.length - 1];
    return {
      label: value >= lastRow.threshold ? 'Adequate' : 'Inadequate',
      color: value >= lastRow.threshold ? 'green' : 'red',
      matchedAge: lastRow.ageRange,
    };
  }
  return {
    label: value >= row.threshold ? 'Adequate' : 'Inadequate',
    color: value >= row.threshold ? 'green' : 'red',
    matchedAge: row.ageRange,
  };
}
