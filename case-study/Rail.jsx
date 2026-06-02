import React from 'react';
import { Moon, Sun } from 'lucide-react';

// Atlan Case Study — Side rail with section progress

export const SECTIONS = [
  { id: 'hero', num: '00', label: 'Hero' },
  { id: 'problem', num: '01', label: 'Problem & Context' },
  { id: 'persona', num: '02', label: 'Persona & Research' },
  { id: 'process', num: '03', label: 'Process & Ideation' },
  { id: 'solution', num: '04', label: 'Solution Mockups' },
  { id: 'outcomes', num: '05', label: 'Outcomes' },
  { id: 'honesty', num: '06', label: 'Honesty & Disclosure' },
];

export function Rail({ theme = 'light', onThemeToggle }) {
  const [active, setActive] = React.useState('hero');

  React.useEffect(() => {
    const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
    if (!sections.length) return;

    // Track each section's visibility ratio and activate the most-visible one.
    // IntersectionObserver does not depend on which element is the scroll
    // container, so it is robust to `overflow` quirks on html/body.
    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let current = SECTIONS[0].id;
        let best = -1;
        for (const el of sections) {
          const r = ratios.get(el.id) || 0;
          if (r > best) { best = r; current = el.id; }
        }
        if (best > 0) setActive(current);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1], rootMargin: '-15% 0px -55% 0px' }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="rail">
      <div className="rail-mark">
        <a href="#hero" className="rail-mark-link" aria-label="Atlan — top of case study">
          <img className="rail-mark-img" src="assets/atlan_logo_bk.svg" alt="Atlan" width="56" height="56" />
          <div className="rail-mark-text">
            <div className="rail-logo">atlan<span className="dot">.</span></div>
            <div className="rail-sub">UX Case Study · 2026</div>
          </div>
        </a>
      </div>

      <button
        className="theme-toggle"
        type="button"
        onClick={onThemeToggle}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
      >
        {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>

      <nav className="rail-list" aria-label="Case study sections">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`rail-item ${active === s.id ? 'active' : ''}`}
          >
            <span className="num">{s.num}</span>
            <span className="tick"></span>
            <span>{s.label}</span>
          </a>
        ))}
      </nav>

      <div className="rail-foot">
        <div className="rail-foot-label">Designer</div>
        <div className="rail-foot-value">Edgar Bonilla</div>
        <div className="rail-foot-label" style={{ marginTop: 12 }}>Status</div>
        <div className="rail-foot-value">Self-initiated concept</div>
      </div>
    </aside>
  );
}
