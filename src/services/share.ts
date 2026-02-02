import type { Action } from '../types';

export const shareService = {
  async share(action: Action): Promise<boolean> {
    const shareData = {
      title: action.title,
      text: `${action.title} - ${action.goal}\n\nDate: ${action.date} at ${action.time}\nLocation: ${action.location.city}, ${action.location.state}\nOrganized by: ${action.organizer}\n\nJoin the action!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  },

  getTwitterUrl(action: Action): string {
    const text = encodeURIComponent(
      `${action.title} - ${action.goal}\n\n${action.date} in ${action.location.city}, ${action.location.state}\n\nOrganized by ${action.organizer}`
    );
    const url = encodeURIComponent(window.location.href);
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  },

  getFacebookUrl(): string {
    const url = encodeURIComponent(window.location.href);
    return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  },

  getEmailUrl(action: Action): string {
    const subject = encodeURIComponent(action.title);
    const body = encodeURIComponent(
      `${action.title}\n\n${action.description}\n\nGoal: ${action.goal}\nDate: ${action.date} at ${action.time}\nLocation: ${action.location.venue ? action.location.venue + ', ' : ''}${action.location.city}, ${action.location.state}\nOrganized by: ${action.organizer}\n\nLearn more: ${window.location.href}`
    );
    return `mailto:?subject=${subject}&body=${body}`;
  },

  copyToClipboard(action: Action): Promise<boolean> {
    const text = `${action.title}\n\n${action.description}\n\nGoal: ${action.goal}\nDate: ${action.date} at ${action.time}\nLocation: ${action.location.city}, ${action.location.state}\nOrganized by: ${action.organizer}\n\nLearn more: ${window.location.href}`;

    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  },
};
