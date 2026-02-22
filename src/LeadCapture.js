import React, { useState, useEffect } from 'react';
import { track, identify } from './analytics';

const STORAGE_KEY = 'vela_lead_captured';

export default function LeadCapture({ partnerName, dateCount, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) onClose();
  }, [onClose]);

  if (localStorage.getItem(STORAGE_KEY)) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, partner_name: partnerName }),
      });
      if (res.ok) {
        identify(email, { partner_name: partnerName });
        track('email_captured', { partner_name: partnerName, date_count: dateCount });
        localStorage.setItem(STORAGE_KEY, '1');
        setStatus('success');
        setTimeout(onClose, 1500);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const T = {
    bg: '#0E0F13', surface: '#1C1C1E', border: '#2E2A26',
    amber: '#D68853', text: '#F5F0EB', dim: '#7D786F',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 24,
    }}>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20,
        padding: '40px 32px', maxWidth: 420, width: '100%', textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎯</div>
        <h2 style={{
          fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700,
          color: T.text, margin: '0 0 10px',
        }}>
          Unlock all {dateCount}+ dates<br />
          {partnerName ? `for ${partnerName}` : 'personalized for her'}
        </h2>
        <p style={{ color: T.dim, fontSize: 15, margin: '0 0 28px', lineHeight: 1.5 }}>
          Free. No credit card. Just your email.
        </p>

        {status === 'success' ? (
          <p style={{ color: T.amber, fontSize: 17, fontWeight: 600 }}>✓ You're in. Let's go.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                padding: '14px 16px', borderRadius: 12, border: `1px solid ${T.border}`,
                background: T.bg, color: T.text, fontSize: 16,
                outline: 'none', fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                padding: '15px 24px', borderRadius: 12, border: 'none',
                background: status === 'loading'
                  ? T.dim
                  : `linear-gradient(135deg, #D68853, #E8C49A)`,
                color: '#0E0F13', fontSize: 16, fontWeight: 700,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {status === 'loading' ? 'Saving...' : 'Unlock Dates →'}
            </button>
            {status === 'error' && (
              <p style={{ color: '#e57373', fontSize: 13, margin: 0 }}>
                Something went wrong. Try again.
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none', border: 'none', color: T.dim,
                fontSize: 13, cursor: 'pointer', marginTop: 4,
              }}
            >
              Skip for now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
