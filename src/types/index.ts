export interface Action {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    venue?: string;
    city: string;
    state: string;
    region: string;
  };
  goal: string;
  organizer: string;
  category: ActionCategory;
  createdAt: string;
  instructions?: string;
}

export type ActionCategory =
  | 'strike'
  | 'boycott'
  | 'protest'
  | 'walkout'
  | 'sit-in'
  | 'call-in'
  | 'other';

export interface SearchFilters {
  query?: string;
  date?: string;
  region?: string;
  organizer?: string;
  goal?: string;
  category?: ActionCategory;
}

export const REGIONS = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Southwest',
  'West',
  'Pacific Northwest',
  'National',
  'International',
] as const;

export const CATEGORIES: { value: ActionCategory; label: string }[] = [
  { value: 'strike', label: 'Strike' },
  { value: 'boycott', label: 'Boycott' },
  { value: 'protest', label: 'Protest' },
  { value: 'walkout', label: 'Walkout' },
  { value: 'sit-in', label: 'Sit-in' },
  { value: 'call-in', label: 'Call-in Campaign' },
  { value: 'other', label: 'Other' },
];
