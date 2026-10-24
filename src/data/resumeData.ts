export interface ProjectLayerSpec {
  id: string;
  label: string;
  detail: string;
}

export interface ProjectItem {
  id: 'eduversesocial' | 'jansetu-ai' | 'easypark';
  title: string;
  category: string;
  summary: string;
  accentColor: 'cobalt' | 'saffron' | 'sky';
  coordinates: string;
  capabilities: string[];
  layers: ProjectLayerSpec[];
  architectureNotes: string[];
  githubUrl: string;
  liveDemoUrl: string;
  liveDomainLabel: string;
  repoSlug: string;
}

export interface SkillGroup {
  category: string;
  code: string;
  items: string[];
}

export interface EducationItem {
  institution: string;
  qualification: string;
  period: string;
  metrics: { label: string; value: string }[];
  isPrimary?: boolean;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  domain: string;
  badgeUrl: string;
}

export const RESUME_DATA = {
  person: {
    name: 'Nand Patel',
    monogram: 'NP',
    headline:
      'Second-year B.Tech Computer Science and Engineering student building web platforms and practical software systems.',
    availability: 'Open to software development internships.',
    university: 'GSFC University',
    degree: 'B.Tech. in Computer Science and Engineering',
    graduationWindow: '2025 – 2029 (Expected)',
    location: 'Vadodara, Gujarat, India',
    languages: ['English', 'Hindi', 'Gujarati'],
    summary:
      'Second-year B.Tech CSE student who has worked on building web development projects. Excited about software engineering, solving problems, and creating technology solutions. Looking for software development internship positions.',
    aboutParagraphs: [
      'I am a second-year Computer Science and Engineering undergraduate at GSFC University in Vadodara, Gujarat. My work centers on designing and building web applications that turn structured data, maps, and workflows into clear, usable interfaces.',
      'Across projects ranging from social media analytics and scheduling to civic feedback prioritization and interactive parking discovery, I focus on solving real software engineering problems with clean architecture and dependable web fundamentals.',
      'I am actively seeking software development internship opportunities where I can contribute to product engineering, learn from experienced teams, and build reliable technology solutions.',
    ],
    links: {
      email: 'nandp3157@gmail.com',
      linkedin: 'https://www.linkedin.com/in/nand-patel-969652376',
      linkedinHandle: 'in/nand-patel-969652376',
      github: 'https://github.com/Nand3157',
      githubHandle: 'github.com/Nand3157',
      resumePdf: undefined as string | undefined,
    },
  },

  projects: [
    {
      id: 'eduversesocial',
      title: 'EduVerseSocial',
      category: 'Social Media Management Platform',
      summary:
        'Social media management platform featuring analytics, content recommendations, and post scheduling.',
      accentColor: 'cobalt',
      coordinates: 'ANALYTICS · RECOMMENDATIONS · SCHEDULING',
      capabilities: [
        'Analytics overview & performance tracking',
        'Content recommendations engine view',
        'Post scheduling workflow & queue calendar',
      ],
      layers: [
        {
          id: 'analytics',
          label: 'Analytics Surface',
          detail: 'Visualizes post engagement trends and channel activity in a structured workspace.',
        },
        {
          id: 'recommendations',
          label: 'Content Recommendations',
          detail: 'Surfaces topic and format suggestions aligned with audience engagement patterns.',
        },
        {
          id: 'scheduling',
          label: 'Post Scheduling Queue',
          detail: 'Organizes upcoming publications across time slots for consistent publishing.',
        },
      ],
      architectureNotes: [
        'Combines three core workflows—analytics inspection, content ideation, and publishing cadence—into one unified web interface.',
        'Designed around clear visual hierarchy so creators and teams can move from insight to scheduled post without context switching.',
      ],
      githubUrl: 'https://github.com/Nand3157/eduversesocial',
      liveDemoUrl: 'https://eduversesocial.vercel.app/',
      liveDomainLabel: 'eduversesocial.vercel.app',
      repoSlug: 'Nand3157/eduversesocial',
    },
    {
      id: 'jansetu-ai',
      title: 'JANSETU AI',
      category: 'AI-Powered Civic Platform',
      summary:
        'AI-powered civic platform for analyzing citizen feedback and prioritizing infrastructure needs.',
      accentColor: 'saffron',
      coordinates: 'CITIZEN FEEDBACK · INFRASTRUCTURE TRIAGE',
      capabilities: [
        'Citizen feedback intake & synthesis',
        'AI-assisted issue analysis & grouping',
        'Infrastructure need prioritization view',
      ],
      layers: [
        {
          id: 'intake',
          label: 'Citizen Feedback Nodes',
          detail: 'Captures and organizes reports submitted by residents across civic sectors.',
        },
        {
          id: 'analysis',
          label: 'AI Feedback Analysis',
          detail: 'Synthesizes recurring civic reports to surface patterns and urgency signals.',
        },
        {
          id: 'priority',
          label: 'Infrastructure Prioritization',
          detail: 'Helps decision-makers evaluate and order infrastructure needs clearly.',
        },
      ],
      architectureNotes: [
        'Bridges unstructured citizen feedback and structured civic planning by organizing reports into actionable priority queues.',
        'Focused on clarity and transparent triage for local infrastructure decision workflows.',
      ],
      githubUrl: 'https://github.com/Nand3157/JANSETU-AI',
      liveDemoUrl: 'https://jansetu-ai-web.vercel.app/',
      liveDomainLabel: 'jansetu-ai-web.vercel.app',
      repoSlug: 'Nand3157/JANSETU-AI',
    },
    {
      id: 'easypark',
      title: 'EasyPark',
      category: 'Parking Discovery Application',
      summary:
        'Parking discovery app with interactive maps, location search, and parking filters.',
      accentColor: 'sky',
      coordinates: 'INTERACTIVE MAPS · LOCATION SEARCH · FILTERS',
      capabilities: [
        'Interactive map canvas with zone markers',
        'Location search for destination lookup',
        'Multi-criteria parking filters',
      ],
      layers: [
        {
          id: 'map',
          label: 'Interactive Map Surface',
          detail: 'Displays nearby parking zones and spatial relationships across city blocks.',
        },
        {
          id: 'search',
          label: 'Location Search',
          detail: 'Lets drivers look up destinations and inspect surrounding parking options quickly.',
        },
        {
          id: 'filters',
          label: 'Parking Filter Controls',
          detail: 'Refines visible parking spots using practical filter criteria.',
        },
      ],
      architectureNotes: [
        'Pairs spatial map browsing with fast search and filter controls to reduce friction when finding parking.',
        'Structured for responsive use across desktop and mobile viewports.',
      ],
      githubUrl: 'https://github.com/Nand3157/EasyPark',
      liveDemoUrl: 'https://easy-park0.netlify.app/',
      liveDomainLabel: 'easy-park0.netlify.app',
      repoSlug: 'Nand3157/EasyPark',
    },
  ] satisfies ProjectItem[],

  skills: [
    {
      category: 'Programming',
      code: 'Python · C++ · Java',
      items: ['Python', 'C++', 'Java'],
    },
    {
      category: 'Web Technologies',
      code: 'Frontend Core',
      items: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      category: 'Database',
      code: 'Relational SQL',
      items: ['MySQL'],
    },
    {
      category: 'Developer Tools',
      code: 'Workflow & IDE',
      items: ['GitHub', 'Visual Studio Code', 'AI-assisted development tools'],
    },
    {
      category: 'Computer Science',
      code: 'Foundations',
      items: ['Data Structures and Algorithms (DSA)'],
    },
  ] satisfies SkillGroup[],

  education: [
    {
      institution: 'GSFC University',
      qualification: 'B.Tech. in Computer Science and Engineering',
      period: '2025 – 2029 (Expected)',
      isPrimary: true,
      metrics: [
        { label: 'Current CGPA', value: '7.88 / 10' },
        { label: 'Sem 1 SGPA', value: '8.12 / 10' },
        { label: 'Sem 2 SGPA', value: '7.64 / 10' },
      ],
    },
    {
      institution: 'Delhi Public School, Harni',
      qualification: 'HSC (Higher Secondary Certificate)',
      period: '2025',
      metrics: [{ label: 'Score', value: '85%' }],
    },
    {
      institution: 'Delhi Public School, Harni',
      qualification: 'SSC (Secondary School Certificate)',
      period: '2023',
      metrics: [{ label: 'Score', value: '86.66%' }],
    },
  ] satisfies EducationItem[],

  certifications: [
    {
      title: 'AWS Cloud Foundations',
      issuer: 'AWS Academy',
      domain: 'Cloud Infrastructure',
      badgeUrl: 'https://www.credly.com/badges/28ba0dc6-b797-4a9d-bb4b-0fd0e2fad66e/public_url',
    },
    {
      title: 'Getting Started with Artificial Intelligence',
      issuer: 'IBM SkillsBuild',
      domain: 'Artificial Intelligence',
      badgeUrl: 'https://www.credly.com/badges/eb69a899-c85f-4a11-9f27-77d3a8aff765/public_url',
    },
    {
      title: 'Python Essentials 1 & 2',
      issuer: 'Cisco Networking Academy',
      domain: 'Programming',
      badgeUrl: 'https://www.credly.com/badges/872aa87d-781c-484c-85d0-501e0644df9a/public_url',
    },
    {
      title: 'Computer Hardware Basics',
      issuer: 'Cisco Networking Academy',
      domain: 'Systems & Hardware',
      badgeUrl: 'https://www.credly.com/badges/bf2a4ed1-e25c-409a-9bd9-8ce6ef8263a2/public_url',
    },
  ] satisfies CertificationItem[],
} as const;
