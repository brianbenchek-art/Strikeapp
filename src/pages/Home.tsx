import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ActionCard } from '../components/ActionCard';
import { sampleActions } from '../data/sampleActions';
import { storage } from '../services/storage';

export function Home() {
  const allActions = useMemo(() => {
    return storage.getAllActions(sampleActions);
  }, []);

  const upcomingActions = useMemo(() => {
    const now = new Date();
    return allActions
      .filter(action => new Date(action.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6);
  }, [allActions]);

  return (
    <div className="page home-page">
      <section className="hero">
        <h1 className="hero-title">Collective action starts here</h1>
        <p className="hero-subtitle">
          Discover and join strikes, boycotts, and protests. Organize for change.
        </p>
        <div className="hero-actions">
          <Link to="/search" className="btn btn-primary">
            Find Actions
          </Link>
          <Link to="/create" className="btn btn-secondary">
            Create Action
          </Link>
        </div>
      </section>

      <section className="actions-section">
        <div className="section-header">
          <h2 className="section-title">Upcoming Actions</h2>
          <Link to="/search" className="section-link">
            View all →
          </Link>
        </div>
        <div className="actions-grid">
          {upcomingActions.map(action => (
            <ActionCard key={action.id} action={action} />
          ))}
        </div>
        {upcomingActions.length === 0 && (
          <div className="empty-state">
            <p>No upcoming actions yet.</p>
            <Link to="/create" className="btn btn-primary">
              Be the first to create one
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
