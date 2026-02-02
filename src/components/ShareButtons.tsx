import type { Action } from '../types';
import { shareService } from '../services/share';
import { useState } from 'react';

interface ShareButtonsProps {
  action: Action;
}

export function ShareButtons({ action }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    await shareService.share(action);
  };

  const handleCopy = async () => {
    const success = await shareService.copyToClipboard(action);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const supportsNativeShare = typeof navigator.share === 'function';

  return (
    <div className="share-buttons">
      <h4 className="share-title">Share this action</h4>
      <div className="share-grid">
        {supportsNativeShare && (
          <button className="share-btn share-native" onClick={handleNativeShare}>
            <span className="share-icon">↗</span>
            Share
          </button>
        )}
        <a
          href={shareService.getTwitterUrl(action)}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn share-twitter"
        >
          <span className="share-icon">𝕏</span>
          Twitter
        </a>
        <a
          href={shareService.getFacebookUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn share-facebook"
        >
          <span className="share-icon">f</span>
          Facebook
        </a>
        <a
          href={shareService.getEmailUrl(action)}
          className="share-btn share-email"
        >
          <span className="share-icon">✉</span>
          Email
        </a>
        <button className="share-btn share-copy" onClick={handleCopy}>
          <span className="share-icon">{copied ? '✓' : '⎘'}</span>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
