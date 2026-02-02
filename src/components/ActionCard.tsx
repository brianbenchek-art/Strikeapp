import { Link } from 'react-router-dom';
import type { Action } from '../types';
import { CATEGORIES } from '../types';
import { storage } from '../services/storage';
import { useState } from 'react';

interface ActionCardProps {
  action: Action;
  onFavoriteChange?: () => void;
}

export function ActionCard({ action, onFavoriteChange }: ActionCardProps) {
  const [isFavorite, setIsFavorite] = useState(storage.isFavorite(action.id));

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      storage.removeFavorite(action.id);
    } else {
      storage.addFavorite(action.id);
    }
    setIsFavorite(!isFavorite);
    onFavoriteChange?.();
  };

  const categoryLabel = CATEGORIES.find(c => c.value === action.category)?.label || action.category;
  const formattedDate = new Date(action.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link to={`/action/${action.id}`} className="action-card">
      <div className="action-card-header">
        <span className="action-category">{categoryLabel}</span>
        <button
          className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <h3 className="action-title">{action.title}</h3>
      <p className="action-meta">
        <span className="action-date">{formattedDate}</span>
        <span className="action-location">
          {action.location.city}, {action.location.state}
        </span>
      </p>
      <p className="action-goal">{action.goal}</p>
      <p className="action-organizer">By {action.organizer}</p>
    </Link>
  );
}
