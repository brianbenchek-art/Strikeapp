import type { SearchFilters as Filters } from '../types';
import { REGIONS, CATEGORIES } from '../types';

interface SearchFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  organizers: string[];
}

export function SearchFilters({ filters, onChange, organizers }: SearchFiltersProps) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  return (
    <div className="search-filters">
      <div className="filter-group">
        <input
          type="text"
          className="filter-input"
          placeholder="Search actions..."
          value={filters.query || ''}
          onChange={e => updateFilter('query', e.target.value)}
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">Date</label>
          <input
            type="date"
            className="filter-input"
            value={filters.date || ''}
            onChange={e => updateFilter('date', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Region</label>
          <select
            className="filter-select"
            value={filters.region || ''}
            onChange={e => updateFilter('region', e.target.value)}
          >
            <option value="">All Regions</option>
            {REGIONS.map(region => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={filters.category || ''}
            onChange={e => updateFilter('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Organizer</label>
          <select
            className="filter-select"
            value={filters.organizer || ''}
            onChange={e => updateFilter('organizer', e.target.value)}
          >
            <option value="">All Organizers</option>
            {organizers.map(org => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(filters.query || filters.date || filters.region || filters.category || filters.organizer) && (
        <button
          className="clear-filters-btn"
          onClick={() => onChange({})}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
