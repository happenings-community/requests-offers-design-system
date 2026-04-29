import type { Item, User, Org, Medium, ServiceType, ContactTarget, ConfirmTarget } from './types';
import {
  INITIAL_REQUESTS, INITIAL_OFFERS, INITIAL_USERS, INITIAL_ORGS,
  INITIAL_MEDIUMS, INITIAL_SERVICE_TYPES,
} from './mock';

export const ME_ID = 'u5';

export const state = $state({
  requests:     [...INITIAL_REQUESTS]     as Item[],
  offers:       [...INITIAL_OFFERS]       as Item[],
  users:        [...INITIAL_USERS]        as User[],
  orgs:         [...INITIAL_ORGS]         as Org[],
  mediums:      [...INITIAL_MEDIUMS]      as Medium[],
  serviceTypes: [...INITIAL_SERVICE_TYPES] as ServiceType[],
  hasProfile:   true,
  contactModal: null as ContactTarget | null,
  confirmModal: null as ConfirmTarget | null,
});
