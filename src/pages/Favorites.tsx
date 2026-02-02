import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ActionCard } from '../components/ActionCard';
import { sampleActions } from '../data/sampleActions';
import { storage } from '../services/storage';

export function Favorites() {
  const [refreshKey, setRefreshKey] = useState(0);

  const allActions = useMemo(() => {
    return storage.getAllActions(sampleActions);
  }, []);

  const favoriteActions = useMemo(() => {
    const favoriteIds = storage.getFavorites();
    return allActions.filter(action => favoriteIds.includes(action.id));
  }, [allActions, refreshKey]);

  const handleFavoriteChange = useCallback(() => {
    setRefreshKey(k => k + 1);
  }, []);

  return (
    <div className="page favorites-page">
      <h1 className="page-title">Saved Actions</h1>
      <p className="page-subtitle">
        Your collection of actions to join. Stored locally on your device.
      </p>

      {favoriteActions.length > 0 ? (
        <div className="actions-grid">
          {favoriteActions.map(action => (
            <ActionCard
              key={action.id}
              action={action}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">☆</div>
          <h2>No saved actions yet</h2>
          <p>
            Save actions to keep track of ones you want to join.
            <br />
            Click the star on any action to add it here.
          </p>
          <Link to="/search" className="btn btn-primary">
            Browse Actions
          </Link>
        </div>
      )}
    </div>
  );
}
