/* eslint-disable */
// Shared mock data for all screens

const MOCK_USERS = [
  { id:'u1', name:'Maya Rousseau',   nickname:'mayar',   initial:'M', status:'accepted', location:'Bristol, UK',     bio:'Holochain developer and community gardener. Building distributed tools for local mutual aid networks.' },
  { id:'u2', name:'Diego Fuentes',   nickname:'diegof',  initial:'D', status:'accepted', location:'Madrid, Spain',   bio:'Translator, writer, mutual aid enthusiast. 10 years in community organising.' },
  { id:'u3', name:'Asha Kumar',      nickname:'ashak',   initial:'A', status:'accepted', location:'Brighton, UK',    bio:'Local food systems and community events. Runs the Saturday food swap.' },
  { id:'u4', name:'Linh Tran',       nickname:'linht',   initial:'L', status:'pending',  location:'Hanoi, Vietnam',  bio:'Svelte developer transitioning to Holochain. Curious about distributed apps.' },
  { id:'u5', name:'Sam Whitfield',   nickname:'samw',    initial:'S', status:'accepted', location:'London, UK',      bio:'hAppenings co-founder. Building the future of community coordination.' },
];

const MOCK_ORGS = [
  { id:'o1', name:'Brighton Mutual Aid', initial:'B', location:'Brighton, UK',       email:'hello@brightonmutualaid.org', status:'accepted',
    desc:'Local mutual aid network supporting residents with food, transport, and practical help. Accepting new members.',
    urls:['https://brightonmutualaid.org'], members:['u1','u2','u3'], coordinators:['u1'] },
  { id:'o2', name:'Holochain Builders Guild', initial:'H', location:'Global (Remote)', email:'guild@holochain.org', status:'accepted',
    desc:'Developers building hApps on Holochain. Monthly calls, shared resources, and pairing sessions.',
    urls:['https://holochain.org'], members:['u4','u5'], coordinators:['u5'] },
  { id:'o3', name:'Open Learning Collective', initial:'O', location:'Edinburgh, UK',   email:'hello@openlearning.coop', status:'pending',
    desc:'Cooperative offering free workshops and skill shares across Scotland.',
    urls:['https://openlearning.coop'], members:['u2'], coordinators:['u2'] },
];

const MOCK_SERVICE_TYPES = [
  { id:'st1', name:'Mentoring',     desc:'One-to-one guidance and knowledge sharing.',         count:4 },
  { id:'st2', name:'Design',        desc:'UI/UX, graphic, and brand design.',                  count:3 },
  { id:'st3', name:'Development',   desc:'Software development: web, mobile, Holochain.',      count:7 },
  { id:'st4', name:'Translation',   desc:'Written and verbal translation services.',           count:2 },
  { id:'st5', name:'Mutual Aid',    desc:'Community support, errands, volunteering.',          count:5 },
  { id:'st6', name:'Writing',       desc:'Documentation, content creation, editing.',          count:2 },
  { id:'st7', name:'Legal Advice',  desc:'Community legal guidance and support.',              count:1 },
  { id:'st8', name:'Teaching',      desc:'Education, workshops, courses.',                     count:3 },
];

const MOCK_REQUESTS = [
  { id:'r1', title:'Looking for a Holochain mentor',          owner:'Maya Rousseau',  ownerId:'u1', initial:'M', time:'2h', tags:['Mentoring','hApp'],
    desc:"Looking to chat with someone who's deployed an hApp to production. Happy to swap design feedback in return.", mediums:['Time credits','Skill swap'], links:[] },
  { id:'r2', title:'Help translating docs to Spanish',        owner:'Diego Fuentes',  ownerId:'u2', initial:'D', time:'1d', tags:['Translation','Docs'],
    desc:'Our community guide needs ES localisation — about 4,000 words. Can offer recipe-testing help in return.', mediums:['Skill swap'], links:[] },
  { id:'r3', title:'Volunteer steward for Saturday food swap', owner:'Asha Kumar',    ownerId:'u3', initial:'A', time:'3d', tags:['Mutual Aid','Local'],
    desc:'Saturday morning food swap in Brighton — looking for one steward to help set up and greet folks.', mediums:['Gratitude'], links:[] },
  { id:'r4', title:'Pair-program a Svelte 5 store rewrite',   owner:'Linh Tran',     ownerId:'u4', initial:'L', time:'5d', tags:['Development','Svelte'],
    desc:'Migrating a small store from Svelte 4 → 5 runes. Two hours, anyone keen?', mediums:['Skill swap'], links:['https://github.com/example'] },
];

const MOCK_OFFERS = [
  { id:'of1', title:'Svelte 5 pairing sessions',      owner:'Linh Tran',    ownerId:'u4', initial:'L', time:'1d', tags:['Development','Svelte'],
    desc:'Happy to pair on Svelte 5 migration. 2h sessions, flexible timing. Remote only.', mediums:['Skill swap'], links:[] },
  { id:'of2', title:'Spanish ↔ English translation', owner:'Diego Fuentes',  ownerId:'u2', initial:'D', time:'3d', tags:['Translation'],
    desc:'Fluent Spanish — can translate up to 5,000 words per week. Tech and community docs preferred.', mediums:['Time credits','Skill swap'], links:[] },
  { id:'of3', title:'Event stewarding in Brighton',   owner:'Asha Kumar',   ownerId:'u3', initial:'A', time:'5d', tags:['Mutual Aid','Local'],
    desc:'Available Saturdays in Brighton for events and food swaps. Happy to help set up, greet attendees.', mediums:['Gratitude'], links:[] },
  { id:'of4', title:'UX / design critique sessions',  owner:'Maya Rousseau', ownerId:'u1', initial:'M', time:'1w', tags:['Design','Mentoring'],
    desc:'30-minute design critiques for community projects. Figma or Excalidraw wireframes welcome.', mediums:['Skill swap'], links:[] },
];

const MOCK_MEDIUMS = [
  { id:'med1', name:'Skill Swap',   code:'SKILL', status:'approved', desc:'Exchange skills directly.' },
  { id:'med2', name:'Time Credits', code:'TIME',  status:'approved', desc:'One hour = one credit.' },
  { id:'med3', name:'Gratitude',    code:'GRAT',  status:'approved', desc:'A heartfelt thank you.' },
  { id:'med4', name:'Cash (GBP)',   code:'GBP',   status:'approved', desc:'British pounds sterling.' },
  { id:'med5', name:'Crypto (ETH)', code:'ETH',   status:'pending',  desc:'Ethereum cryptocurrency.' },
  { id:'med6', name:'Mutual Credit',code:'MUTU',  status:'rejected', desc:'Mutual credit system.' },
];

const MOCK_ADMIN_USERS = [
  { id:'u5', name:'Sam Whitfield', nickname:'samw', initial:'S', status:'accepted', location:'London, UK', isAdmin: true },
];

Object.assign(window, { MOCK_USERS, MOCK_ORGS, MOCK_SERVICE_TYPES, MOCK_REQUESTS, MOCK_OFFERS, MOCK_MEDIUMS, MOCK_ADMIN_USERS });
