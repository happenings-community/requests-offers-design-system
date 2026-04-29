import type { Medium, ServiceType, User, Org, Item } from './types';

export const INITIAL_SERVICE_TYPES: ServiceType[] = [
  { id: 'st1', name: 'Mentoring',     technical: false },
  { id: 'st2', name: 'Software Dev',  technical: true  },
  { id: 'st3', name: 'Design',        technical: false },
  { id: 'st4', name: 'Translation',   technical: false },
  { id: 'st5', name: 'Legal Advice',  technical: false },
  { id: 'st6', name: 'Permaculture',  technical: false },
  { id: 'st7', name: 'Music / Audio', technical: false },
  { id: 'st8', name: 'Data Analysis', technical: true  },
];

export const INITIAL_MEDIUMS: Medium[] = [
  { code:'TIME',  name:'Time Credits',   type:'base',     status:'approved' },
  { code:'SKILL', name:'Skill Exchange', type:'base',     status:'approved' },
  { code:'EUR',   name:'Euro',           type:'currency', status:'approved' },
  { code:'LOCAL', name:'Local Currency', type:'base',     status:'approved' },
  { code:'USD',   name:'US Dollar',      type:'currency', status:'pending'  },
];

export const TZS = [
  'UTC', 'Europe/Paris', 'Europe/Madrid', 'America/New_York',
  'America/Chicago', 'America/Los_Angeles', 'Asia/Tokyo',
  'Asia/Singapore', 'Australia/Sydney', 'Pacific/Auckland',
];

export const INITIAL_USERS: User[] = [
  { id:'u1', name:'Anya Kovaleva',  nickname:'anya_k',   type:'creator',  location:'Lyon, FR',      bio:'Holochain developer and permaculture designer.',   status:'accepted', email:'anya@happenings.example',    timeZone:'Europe/Paris'  },
  { id:'u2', name:'Marco Delgado',  nickname:'marco_d',  type:'advocate', location:'Barcelona, ES', bio:'UI/UX designer specialising in accessibility.',    status:'accepted', email:'marco@design.example',       timeZone:'Europe/Madrid' },
  { id:'u3', name:'Keiko Tanaka',   nickname:'ktan',     type:'creator',  location:'Tokyo, JP',     bio:'Full-stack developer and open-source contributor.', status:'accepted', email:'keiko@opentech.example',    timeZone:'Asia/Tokyo'    },
  { id:'u4', name:'Pierre Dubois',  nickname:'pierre_d', type:'advocate', location:'Paris, FR',     bio:'Language teacher and community organiser.',         status:'pending',  email:'pierre@langue.example',     timeZone:'Europe/Paris'  },
  { id:'u5', name:'Soushi Pignot',  nickname:'soushi',   type:'creator',  location:'Lyon, FR',      bio:'Building the Requests & Offers hApp.',              status:'accepted', email:'soushi@happenings.example',  timeZone:'Europe/Paris'  },
];

export const INITIAL_ORGS: Org[] = [
  { id:'o1', name:'hAppenings CIC', email:'hello@happenings.org', location:'Lyon, FR',      description:'Community Interest Company running mutual aid programs across Europe.', members:12, status:'active' },
  { id:'o2', name:'Open Tech Coop', email:'info@opentech.coop',   location:'Barcelona, ES', description:'Worker cooperative developing open-source tools for cooperatives.',       members:7,  status:'active' },
];

const U = INITIAL_USERS;
const O = INITIAL_ORGS;

export const INITIAL_REQUESTS: Item[] = [
  { id:'r1', title:'Looking for a Holochain mentor',        description:'I am building my first hApp and need guidance on zome architecture, entry validation, and testing. Happy to exchange language tutoring.',     serviceTypes:['Mentoring','Software Dev'],    mediums:['Skill Exchange'],              interaction:'Virtual',   timePreference:'Afternoon',     timeZone:'Europe/Paris', status:'active',   creator:U[1], links:[],                    org:null, timeEstimate:3 },
  { id:'r2', title:'Need UI design for community app',      description:'Looking for a UI/UX designer to help wireframe a community exchange platform. Figma experience preferred.',                                    serviceTypes:['Design'],                      mediums:['Time Credits'],                interaction:'Virtual',   timePreference:'Morning',       timeZone:'Europe/Paris', status:'active',   creator:U[0], links:['https://figma.com'], org:O[0], timeEstimate:8 },
  { id:'r3', title:'Spanish conversation practice partner', description:'I am a B2 Spanish learner looking for weekly 1-hour conversation sessions. Can offer French lessons in return.',                                serviceTypes:['Translation','Mentoring'],     mediums:['Skill Exchange','Time Credits'], interaction:'Virtual',   timePreference:'Evening',       timeZone:'Europe/Paris', status:'active',   creator:U[3], links:[],                    org:null, timeEstimate:1 },
  { id:'r4', title:'Permaculture site assessment in Lyon',  description:'I have a 500m² garden in Lyon and would love a permaculture consultation to redesign the layout for food production.',                           serviceTypes:['Permaculture'],                mediums:['Skill Exchange'],              interaction:'In Person', timePreference:'No Preference', timeZone:'Europe/Paris', status:'archived', creator:U[4], links:[],                    org:null, timeEstimate:4 },
];

export const INITIAL_OFFERS: Item[] = [
  { id:'of1', title:'UI/UX design consultation — 2 sessions',   description:'I can help with wireframes, user flows, and visual design reviews. I specialise in accessibility-first design. Two 90-minute sessions included.', serviceTypes:['Design'],               mediums:['Skill Exchange','Time Credits'], interaction:'Virtual',   timePreference:'Afternoon',     timeZone:'Europe/Madrid', status:'active',   creator:U[1], links:['https://marcodelgado.design'], org:null },
  { id:'of2', title:'Holochain zome development guidance',      description:'I can pair-program with you on Rust-based Holochain zomes, review your architecture, help set up Sweettest tests, and explain HDK/HDI patterns.', serviceTypes:['Software Dev','Mentoring'], mediums:['Time Credits'],            interaction:'Virtual',   timePreference:'Morning',       timeZone:'Asia/Tokyo',    status:'active',   creator:U[2], links:[],                             org:null },
  { id:'of3', title:'French lessons for beginners/intermediate', description:'Native French speaker offering structured lessons or conversational practice. Tailored to your level and goals. Skype or Jitsi.',                  serviceTypes:['Translation','Mentoring'], mediums:['Skill Exchange'],           interaction:'Virtual',   timePreference:'Evening',       timeZone:'Europe/Paris',  status:'active',   creator:U[3], links:[],                             org:O[0] },
  { id:'of4', title:'Open-source TypeScript code review',       description:'I will review your TypeScript project (up to 2000 lines), provide written feedback on architecture, type safety, and best practices.',             serviceTypes:['Software Dev'],            mediums:['Time Credits','EUR'],       interaction:'Virtual',   timePreference:'No Preference', timeZone:'Asia/Tokyo',    status:'archived', creator:U[2], links:[],                             org:null },
];
