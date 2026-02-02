import type { Action } from '../types';

const FAVORITES_KEY = 'topple_favorites';
const ACTIONS_KEY = 'topple_actions';

export const storage = {
  getFavorites(): string[] {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  addFavorite(actionId: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(actionId)) {
      favorites.push(actionId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  removeFavorite(actionId: string): void {
    const favorites = this.getFavorites();
    const updated = favorites.filter(id => id !== actionId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  },

  isFavorite(actionId: string): boolean {
    return this.getFavorites().includes(actionId);
  },

  getActions(): Action[] {
    const data = localStorage.getItem(ACTIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveAction(action: Action): void {
    const actions = this.getActions();
    actions.push(action);
    localStorage.setItem(ACTIONS_KEY, JSON.stringify(actions));
  },

  getAllActions(sampleActions: Action[]): Action[] {
    const userActions = this.getActions();
    return [...sampleActions, ...userActions];
  },
};
