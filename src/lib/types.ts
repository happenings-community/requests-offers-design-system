export type Medium = { code: string; name: string; type: 'base' | 'currency'; status: 'pending' | 'approved' };
export type ServiceType = { id: string; name: string; technical: boolean };
export type User = { id: string; name: string; nickname: string; type: string; location: string; bio: string; status: string; email?: string; timeZone?: string };
export type Org  = { id: string; name: string; email: string; location: string; description: string; members: number; status: 'active' | 'pending' | 'suspended' };
export type Item = { id: string; title: string; description: string; serviceTypes: string[]; mediums: string[]; interaction: string; timePreference: string; timeZone: string; status: string; creator: User; links: string[]; org: Org | null; timeEstimate?: number };
export type ContactTarget = { user: User; org: Org | null; listingType: string; listingTitle: string };
export type ConfirmTarget  = { message: string; onConfirm: () => void };
