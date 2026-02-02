import { useState, useMemo } from 'react';
import { ActionCard } from '../components/ActionCard';
import { SearchFilters } from '../components/SearchFilters';
import { sampleActions } from '../data/sampleActions';
import { storage } from '../services/storage';
import type { SearchFilters as Filters } from '../types';

export function Search() {
  const [filters, setFilters] = useState<Filters>({});

  const allActions = useMemo(() => {
    return storage.getAllActions(sampleActions);
  }, []);

  const organizers = useMemo(() => {
    const orgs = new Set(allActions.map(a => a.organizer));
    return Array.from(orgs).sort();
  }, [allActions]);

  const filteredActions = useMemo(() => {
    return allActions.filter(action => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const matchesQuery =
          action.title.toLowerCase().includes(q) ||
          action.description.toLowerCase().includes(q) ||
          action.goal.toLowerCase().includes(q) ||
          action.organizer.toLowerCase().includes(q) ||
          action.location.city.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      if (filters.date && action.date !== filters.date) {
        return false;
      }

      if (filters.region && action.location.region !== filters.region) {
        return false;
      }

      if (filters.organizer && action.organizer !== filters.organizer) {
        return false;
      }

      if (filters.category && action.category !== filters.category) {
        return false;
      }

      return true;
    });
  }, [allActions, filters]);

  const sortedActions = useMemo(() => {
    return [...filteredActions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [filteredActions]);

  return (
    <div className="page search-page">
      <h1 className="page-title">Find Actions</h1>
      <p className="page-subtitle">
        Search by date, region, organization, or goal
      </p>

      <SearchFilters
        filters={filters}
        onChange={setFilters}
        organizers={organizers}
      />

      <div className="search-results">
        <p className="results-count">
          {sortedActions.length} action{sortedActions.length !== 1 ? 's' : ''} found
        </p>

        <div className="actions-grid">
          {sortedActions.map(action => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>

        {sortedActions.length === 0 && (
          <div className="empty-state">
            <p>No actions match your filters.</p>
            <button
              className="btn btn-secondary"
              onClick={() => setFilters({})}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
