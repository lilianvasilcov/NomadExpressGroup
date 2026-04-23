export const JOB_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
};

/** @type {Array<import('./jobs.types').Job>} */
export const jobs = [
  {
    id: 'hazmat-tanker-driver',
    title: 'Heavy and Tractor-Trailer Truck Driver – Hazmat/Tanker',
    company: 'Office Nomad Express',
    location: 'Bolingbrook, IL',
    salary: '$74,152 per year',
    type: 'Full-time, permanent',
    status: JOB_STATUS.OPEN,
    postedDate: '2026-04-23',
    about:
      'We are hiring a full-time CDL-A driver to transport hazardous materials on interstate routes out of our Bolingbrook, IL facility. The role includes vehicle maintenance and compliance with federal DOT and EPA regulations. Most routes are long-distance and multi-day.',
    duties: [
      {
        text: 'Drive trucks with capacities greater than 13 tons, including tractor-trailer combinations, vacuum trucks, roll-offs, and tankers, to transport and deliver hazardous materials while following appropriate safety procedures for dangerous goods.',
      },
      {
        text: 'Inspect loads to ensure cargo is secure; check vehicles for mechanical, safety, and emergency equipment functionality; and perform thorough pre- and post-trip inspections per federal regulations.',
      },
      {
        text: 'Perform basic vehicle maintenance and minor mechanical repairs such as:',
        subItems: [
          'Adding/topping off engine oil, coolant, DEF, hydraulic and brake fluid',
          'Replacing bulbs, fuses, wipers, airlines, glad hands, lenses, and light pigtails',
          'Minor brake adjustments, tightening suspension components, greasing fittings',
          'Emergency roadside fixes (tire chains, minor air leaks, belt replacement, etc.)',
        ],
      },
      {
        text: 'Check all load-related documentation (hazardous materials manifests, Bills of Lading, shipping papers) for completeness and accuracy; properly placard vehicles; maintain electronic logs (ELD) of working hours, vehicle service, and repair status.',
      },
      {
        text: 'Maneuver trucks into loading/unloading positions; secure cargo using straps, blocks, chains, or tarps; load/unload drums, totes, lab packs, and bulk materials using forklift, drum dolly, or pallet jack.',
      },
      {
        text: 'Report vehicle defects, accidents, traffic violations, or damage immediately; respond to minor spills or leaks using spill kits and follow EPA/DOT reporting protocols.',
      },
      {
        text: 'Plan or adjust routes using GPS/tablet to avoid congestion, reduce fuel use, and comply with weigh-station requirements.',
      },
      {
        text: 'Follow special cargo procedures (placarding, segregation of incompatibles, temperature monitoring when required).',
      },
      {
        text: 'Communicate clearly with dispatch, supervisors, residents, and disposal facility staff; provide excellent customer service at public drop-off events.',
      },
      {
        text: 'Keep vehicle interiors and exteriors clean; steam-clean tanks and containers to prevent cross-contamination.',
      },
    ],
    requirements: [
      'Valid Class A Commercial Driver\'s License (CDL-A) with Hazardous Materials (H) and Tanker (N) endorsements (or ability to obtain within 90 days of hire).',
      'Current DOT Medical Examiner\'s Certificate (or ability to obtain within 90 days of hire).',
      'Clean driving record (no more than 2 moving violations or at-fault accidents in the last 3 years; no DUI/DWI in the last 10 years).',
      'Minimum 2 years of verifiable Class A driving experience operating vehicles over 26,001 lbs GVW.',
      'Minimum 2 years of documented hands-on mechanical experience with heavy trucks or heavy equipment performing inspections, minor repairs, fluid maintenance, troubleshooting air/electrical systems, or emergency roadside fixes (vocational school, military, fleet shop, farm, or construction equipment experience accepted).',
      '40-hour HAZWOPER certification preferred.',
      'High school diploma or GED.',
      'Ability to read, write, speak, and understand English fluently in order to: read and complete hazardous materials manifests and shipping papers; understand Safety Data Sheets (SDS), labels, placards, and repair manuals; communicate via two-way radio and with the public.',
      'Physically able to lift 75 lbs repeatedly, climb in/out of cab and onto trailers, wear respirator and Level B/C PPE, and work outdoors in all weather conditions.',
      'Must pass pre-employment drug screen, criminal background check, and DOT Clearinghouse query.',
    ],
    locationDetail:
      'Based in Bolingbrook, IL. Routes are primarily interstate within the United States as assigned by dispatch. Regular long-distance travel, typically multiple days per week.',
    applyInstructions:
      'Send your resume and a copy of your CDL (if applicable) via the application form below, or contact our recruiting team directly. Office Nomad Express is an equal opportunity employer.',
  },
];

export const openJobs = jobs.filter((job) => job.status === JOB_STATUS.OPEN);
