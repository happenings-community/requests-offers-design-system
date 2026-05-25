// ── Shared mock data for the Requests & Offers UI Kit app ────────────────────
// Single source of truth for every route page under /ui-kit/app.

// ── Types ────────────────────────────────────────────────────────────────────
export type User = {
  id: string;
  name: string;
  nickname: string;
  type: string;
  location: string;
  bio: string;
  status: string;
  email?: string;
  timeZone?: string;
};

export type Org = {
  id: string;
  name: string;
  email: string;
  location: string;
  description: string;
  members: number;
  status: 'active' | 'pending' | 'suspended';
};

export type Item = {
  id: string;
  title: string;
  description: string;
  serviceTypes: string[];
  mediums: string[];
  interaction: string;
  timePreference: string;
  timeZone: string;
  status: string;
  creator: User;
  links: string[];
  org: Org | null;
  timeEstimate?: number;
};

export type Medium = {
  code: string;
  name: string;
  type: 'base' | 'currency';
  status: 'pending' | 'approved';
};

// ── Constants ────────────────────────────────────────────────────────────────
export const SERVICE_TYPES = [
  { id: 'st1', name: 'Mentoring', technical: false, description: 'Guidance, coaching, and knowledge-sharing to help others develop skills and navigate challenges.' },
  { id: 'st2', name: 'Software Dev', technical: true, description: 'Programming, software architecture, code review, debugging, and technical consulting.' },
  { id: 'st3', name: 'Design', technical: false, description: 'UI/UX, graphic design, brand identity, wireframing, and visual communication.' },
  { id: 'st4', name: 'Translation', technical: false, description: 'Translation and interpretation between languages, including technical and literary content.' },
  { id: 'st5', name: 'Legal Advice', technical: false, description: 'General legal guidance on contracts, intellectual property, and community governance.' },
  { id: 'st6', name: 'Permaculture', technical: false, description: 'Sustainable agriculture, garden design, ecological systems planning and implementation.' },
  { id: 'st7', name: 'Music / Audio', technical: false, description: 'Music lessons, audio production, sound engineering, and music therapy.' },
  { id: 'st8', name: 'Data Analysis', technical: true, description: 'Data processing, statistical analysis, visualization, and insights generation.' }
];

export const MEDIUMS: Medium[] = [
  { code: 'TIME', name: 'Time Credits', type: 'base', status: 'approved' },
  { code: 'SKILL', name: 'Skill Exchange', type: 'base', status: 'approved' },
  { code: 'EUR', name: 'Euro', type: 'currency', status: 'approved' },
  { code: 'LOCAL', name: 'Local Currency', type: 'base', status: 'approved' },
  { code: 'USD', name: 'US Dollar', type: 'currency', status: 'pending' }
];

export const MEDIUM_NAMES = MEDIUMS.map((m) => m.name);

export const TZS = [
  'UTC',
  'Europe/Paris',
  'Europe/Madrid',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Asia/Singapore',
  'Australia/Sydney',
  'Pacific/Auckland'
];

export const USERS: User[] = [
  { id: 'u1', name: 'Anya Kovaleva', nickname: 'anya_k', type: 'creator', location: 'Lyon, FR', bio: 'Holochain developer and permaculture designer.', status: 'accepted', email: 'anya@happenings.example', timeZone: 'Europe/Paris' },
  { id: 'u2', name: 'Marco Delgado', nickname: 'marco_d', type: 'advocate', location: 'Barcelona, ES', bio: 'UI/UX designer specialising in accessibility.', status: 'accepted', email: 'marco@design.example', timeZone: 'Europe/Madrid' },
  { id: 'u3', name: 'Keiko Tanaka', nickname: 'ktan', type: 'creator', location: 'Tokyo, JP', bio: 'Full-stack developer and open-source contributor.', status: 'accepted', email: 'keiko@opentech.example', timeZone: 'Asia/Tokyo' },
  { id: 'u4', name: 'Pierre Dubois', nickname: 'pierre_d', type: 'advocate', location: 'Paris, FR', bio: 'Language teacher and community organiser.', status: 'pending', email: 'pierre@langue.example', timeZone: 'Europe/Paris' },
  { id: 'u5', name: 'Soushi Pignot', nickname: 'soushi', type: 'creator', location: 'Lyon, FR', bio: 'Building the Requests & Offers hApp.', status: 'accepted', email: 'soushi@happenings.example', timeZone: 'Europe/Paris' }
];

export const ME = USERS[4];

export const ORGS: Org[] = [
  { id: 'o1', name: 'hAppenings CIC', email: 'hello@happenings.org', location: 'Lyon, FR', description: 'Community Interest Company running mutual aid programs across Europe.', members: 12, status: 'active' },
  { id: 'o2', name: 'Open Tech Coop', email: 'info@opentech.coop', location: 'Barcelona, ES', description: 'Worker cooperative developing open-source tools for cooperatives.', members: 7, status: 'active' }
];

export const ADMINS = USERS.slice(0, 3);

export const REQUESTS: Item[] = [
  { id: 'r1', title: 'Looking for a Holochain mentor', description: 'I am building my first hApp and need guidance on zome architecture, entry validation, and testing. Happy to exchange language tutoring.', serviceTypes: ['Mentoring', 'Software Dev'], mediums: ['Skill Exchange'], interaction: 'Virtual', timePreference: 'Afternoon', timeZone: 'Europe/Paris', status: 'active', creator: USERS[1], links: [], org: null, timeEstimate: 3 },
  { id: 'r2', title: 'Need UI design for community app', description: 'Looking for a UI/UX designer to help wireframe a community exchange platform. Figma experience preferred.', serviceTypes: ['Design'], mediums: ['Time Credits'], interaction: 'Virtual', timePreference: 'Morning', timeZone: 'Europe/Paris', status: 'active', creator: USERS[0], links: ['https://figma.com'], org: ORGS[0], timeEstimate: 8 },
  { id: 'r3', title: 'Spanish conversation practice partner', description: 'I am a B2 Spanish learner looking for weekly 1-hour conversation sessions. Can offer French lessons in return.', serviceTypes: ['Translation', 'Mentoring'], mediums: ['Skill Exchange', 'Time Credits'], interaction: 'Virtual', timePreference: 'Evening', timeZone: 'Europe/Paris', status: 'active', creator: USERS[3], links: [], org: null, timeEstimate: 1 },
  { id: 'r4', title: 'Permaculture site assessment in Lyon', description: 'I have a 500m² garden in Lyon and would love a permaculture consultation to redesign the layout for food production.', serviceTypes: ['Permaculture'], mediums: ['Skill Exchange'], interaction: 'In Person', timePreference: 'No Preference', timeZone: 'Europe/Paris', status: 'archived', creator: USERS[4], links: [], org: null, timeEstimate: 4 }
];

export const OFFERS: Item[] = [
  { id: 'of1', title: 'UI/UX design consultation — 2 sessions', description: 'I can help with wireframes, user flows, and visual design reviews. I specialise in accessibility-first design. Two 90-minute sessions included.', serviceTypes: ['Design'], mediums: ['Skill Exchange', 'Time Credits'], interaction: 'Virtual', timePreference: 'Afternoon', timeZone: 'Europe/Madrid', status: 'active', creator: USERS[1], links: ['https://marcodelgado.design'], org: null },
  { id: 'of2', title: 'Holochain zome development guidance', description: 'I can pair-program with you on Rust-based Holochain zomes, review your architecture, help set up Sweettest tests, and explain HDK/HDI patterns.', serviceTypes: ['Software Dev', 'Mentoring'], mediums: ['Time Credits'], interaction: 'Virtual', timePreference: 'Morning', timeZone: 'Asia/Tokyo', status: 'active', creator: USERS[2], links: [], org: null },
  { id: 'of3', title: 'French lessons for beginners/intermediate', description: 'Native French speaker offering structured lessons or conversational practice. Tailored to your level and goals. Skype or Jitsi.', serviceTypes: ['Translation', 'Mentoring'], mediums: ['Skill Exchange'], interaction: 'Virtual', timePreference: 'Evening', timeZone: 'Europe/Paris', status: 'active', creator: USERS[3], links: [], org: ORGS[0] },
  { id: 'of4', title: 'Open-source TypeScript code review', description: 'I will review your TypeScript project (up to 2000 lines), provide written feedback on architecture, type safety, and best practices.', serviceTypes: ['Software Dev'], mediums: ['Time Credits', 'EUR'], interaction: 'Virtual', timePreference: 'No Preference', timeZone: 'Asia/Tokyo', status: 'archived', creator: USERS[2], links: [], org: null },
  { id: 'of5', title: 'Holochain hApp architecture review', description: 'I can review your Holochain application architecture, entry types, link types, and zome structure. Will provide written feedback and suggest improvements for scalability and maintainability.', serviceTypes: ['Software Dev', 'Mentoring'], mediums: ['Skill Exchange', 'Time Credits'], interaction: 'Virtual', timePreference: 'Evening', timeZone: 'Europe/Paris', status: 'active', creator: USERS[4], links: ['https://github.com/happenings-community'], org: ORGS[0] }
];

// ── Helpers ──────────────────────────────────────────────────────────────────
export function md(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}

export function toggleArr(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export function addLink(links: string[], inp: string): [string[], string] {
  return inp.trim() ? [[...links, inp.trim()], ''] : [links, inp];
}
