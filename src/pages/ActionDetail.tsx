import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { sampleActions } from '../data/sampleActions';
import { storage } from '../services/storage';
import { ShareButtons } from '../components/ShareButtons';
import { CATEGORIES } from '../types';

export function ActionDetail() {
  const { id } = useParams<{ id: string }>();
  const allActions = useMemo(() => storage.getAllActions(sampleActions), []);
  const action = useMemo(() => allActions.find(a => a.id === id), [allActions, id]);

  const [isFavorite, setIsFavorite] = useState(() =>
    action ? storage.isFavorite(action.id) : false
  );

  if (!action) {
    return (
      <div className="page not-found-page">
        <h1>Action not found</h1>
        <p>This action may have been removed or doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite) {
      storage.removeFavorite(action.id);
    } else {
      storage.addFavorite(action.id);
    }
    setIsFavorite(!isFavorite);
  };

  const categoryLabel = CATEGORIES.find(c => c.value === action.category)?.label || action.category;
  const formattedDate = new Date(action.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="page action-detail-page">
      <Link to="/" className="back-link">← Back</Link>

      <article className="action-detail">
        <header className="action-detail-header">
          <span className="action-category-badge">{categoryLabel}</span>
          <h1 className="action-detail-title">{action.title}</h1>
          <p className="action-detail-organizer">Organized by {action.organizer}</p>
        </header>

        <div className="action-detail-meta">
          <div className="meta-item">
            <span className="meta-label">When</span>
            <span className="meta-value">
              {formattedDate}
              {action.time !== '00:00' && ` at ${action.time}`}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Where</span>
            <span className="meta-value">
              {action.location.venue && <>{action.location.venue}<br /></>}
              {action.location.city}, {action.location.state}
              <span className="region-tag">{action.location.region}</span>
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Goal</span>
            <span className="meta-value">{action.goal}</span>
          </div>
        </div>

        <div className="action-detail-description">
          <h2>About this action</h2>
          <p>{action.description}</p>
        </div>

        {action.instructions && (
          <div className="action-detail-instructions">
            <h2>How to participate</h2>
            <p>{action.instructions}</p>
          </div>
        )}

        <div className="action-detail-actions">
          <button
            className={`btn ${isFavorite ? 'btn-secondary' : 'btn-primary'}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? '★ Saved' : '☆ Save to Favorites'}
          </button>
        </div>

        <ShareButtons action={action} />
      </article>
    </div>
  );
}
