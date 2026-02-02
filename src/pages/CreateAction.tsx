import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Action, ActionCategory } from '../types';
import { REGIONS, CATEGORIES } from '../types';
import { storage } from '../services/storage';

export function CreateAction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    state: '',
    region: '',
    goal: '',
    organizer: '',
    category: 'protest' as ActionCategory,
    instructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const action: Action = {
      id: `user-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time || '00:00',
      location: {
        venue: formData.venue || undefined,
        city: formData.city,
        state: formData.state,
        region: formData.region,
      },
      goal: formData.goal,
      organizer: formData.organizer,
      category: formData.category,
      instructions: formData.instructions || undefined,
      createdAt: new Date().toISOString(),
    };

    storage.saveAction(action);
    navigate(`/action/${action.id}`);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="page create-page">
      <h1 className="page-title">Create an Action</h1>
      <p className="page-subtitle">
        Organize a collective action for your community. No sign-up required.
      </p>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Action Title *
            </label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder="e.g., National Day of Action"
              value={formData.title}
              onChange={e => updateField('title', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Type of Action *
            </label>
            <select
              id="category"
              className="form-select"
              value={formData.category}
              onChange={e => updateField('category', e.target.value)}
              required
            >
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description *
            </label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Describe the action and its purpose..."
              rows={4}
              value={formData.description}
              onChange={e => updateField('description', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="goal">
              Goal *
            </label>
            <input
              type="text"
              id="goal"
              className="form-input"
              placeholder="What do you hope to achieve?"
              value={formData.goal}
              onChange={e => updateField('goal', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>When & Where</h2>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Date *
              </label>
              <input
                type="date"
                id="date"
                className="form-input"
                value={formData.date}
                onChange={e => updateField('date', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="time">
                Time (optional)
              </label>
              <input
                type="time"
                id="time"
                className="form-input"
                value={formData.time}
                onChange={e => updateField('time', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="venue">
              Venue (optional)
            </label>
            <input
              type="text"
              id="venue"
              className="form-input"
              placeholder="e.g., City Hall, Main Square"
              value={formData.venue}
              onChange={e => updateField('venue', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="city">
                City *
              </label>
              <input
                type="text"
                id="city"
                className="form-input"
                placeholder="City"
                value={formData.city}
                onChange={e => updateField('city', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="state">
                State *
              </label>
              <input
                type="text"
                id="state"
                className="form-input"
                placeholder="State"
                value={formData.state}
                onChange={e => updateField('state', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="region">
              Region *
            </label>
            <select
              id="region"
              className="form-select"
              value={formData.region}
              onChange={e => updateField('region', e.target.value)}
              required
            >
              <option value="">Select a region</option>
              {REGIONS.map(region => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Organizer Information</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="organizer">
              Organizing Group or Individual *
            </label>
            <input
              type="text"
              id="organizer"
              className="form-input"
              placeholder="e.g., Workers Coalition, Community Alliance"
              value={formData.organizer}
              onChange={e => updateField('organizer', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Participation Details</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="instructions">
              How to Participate (optional)
            </label>
            <textarea
              id="instructions"
              className="form-textarea"
              placeholder="Provide specific instructions for participants..."
              rows={4}
              value={formData.instructions}
              onChange={e => updateField('instructions', e.target.value)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-large">
            Create Action
          </button>
        </div>
      </form>
    </div>
  );
}
