import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SECTIONS } from './Rail.jsx';

// Static public path (copied verbatim by scripts/copy-static.mjs). Used as a
// plain string rather than a bundler import so client and prerender resolve
// to the identical URL — no hydration mismatch on the hero <img src>.
const heroPoolUrl = 'assets/photography/fig-hero-pool-sunrise.avif';

// Atlan Case Study — Hero (Section 1)
// 3 variants exposed via tweaks panel: Editorial, Magazine, Centered

function MorningLightSVG({ variant = 'pool' }) {
  // variant=horizon uses the open-water swim; pool uses the over-shoulder pool hero photo.
  const src = variant === 'horizon'
    ? heroPoolUrl
    : heroPoolUrl;
  const alt = variant === 'horizon'
    ? 'Endurance athlete mid-stroke at sunrise — half-waterline shot'
    : 'Endurance athlete pushing off at sunrise — pool lane lines and coral floats';
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      loading="eager"
      decoding="async"
      fetchpriority="high"
      width="900"
      height="1200"
    />
  );
}

function _MorningLightSVG_unused({ variant = 'pool' }) {
  if (variant === 'horizon') {
    return (
      <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }} role="img" aria-label="Open water at sunrise — abstract composition">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC9A8" />
            <stop offset="35%" stopColor="#F1B69D" />
            <stop offset="60%" stopColor="#9FC5C9" />
            <stop offset="100%" stopColor="#1E5B6A" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E5B6A" />
            <stop offset="50%" stopColor="#0E8A9A" />
            <stop offset="100%" stopColor="#0B2A3C" />
          </linearGradient>
          <radialGradient id="sun" cx="0.7" cy="0.5" r="0.45">
            <stop offset="0%" stopColor="#FF6A3D" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF7E50" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF6A3D" stopOpacity="0" />
          </radialGradient>
          <filter id="blur1"><feGaussianBlur stdDeviation="2" /></filter>
        </defs>
        <rect width="600" height="400" fill="url(#sky)" />
        <rect x="0" y="400" width="600" height="400" fill="url(#water)" />
        {/* sun */}
        <ellipse cx="420" cy="380" rx="280" ry="180" fill="url(#sun)" />
        <circle cx="420" cy="380" r="32" fill="#FF6A3D" opacity="0.85" />
        {/* water ripples */}
        {[420, 460, 500, 540, 580, 620, 660, 700].map((y, i) => (
          <line key={i} x1={50 + i * 8} y1={y} x2={550 - i * 8} y2={y}
            stroke="#ECF7F8" strokeWidth="0.6" opacity={0.25 - i * 0.025} />
        ))}
        {/* coral horizon glow */}
        <rect x="0" y="395" width="600" height="2" fill="#FF6A3D" opacity="0.4" />
        {/* atmospheric noise */}
        <rect width="600" height="800" fill="url(#sky)" opacity="0" />
      </svg>
    );
  }
  // pool variant — lane lines underwater, sun rays
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }} role="img" aria-label="Pool at sunrise — lane lines and sun rays — abstract composition">
      <defs>
        <linearGradient id="poolWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B5C6C" />
          <stop offset="40%" stopColor="#0E8A9A" />
          <stop offset="100%" stopColor="#061a26" />
        </linearGradient>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC9A8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFC9A8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sunSpot" cx="0.6" cy="0.05" r="0.7">
          <stop offset="0%" stopColor="#FF6A3D" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#FF7E50" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF6A3D" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="800" fill="url(#poolWater)" />
      {/* sun glow from surface */}
      <rect width="600" height="800" fill="url(#sunSpot)" />
      {/* light rays */}
      {[120, 200, 290, 380, 460].map((x, i) => (
        <polygon key={i}
          points={`${x},0 ${x + 30},0 ${x + 60 + i * 20},800 ${x - 20 - i * 10},800`}
          fill="url(#ray)" opacity={0.5 - i * 0.05} />
      ))}
      {/* lane line ropes — coral floats */}
      {[280, 420, 560, 700].map((y, i) => (
        <g key={i}>
          {Array.from({ length: 12 }).map((_, j) => (
            <circle key={j} cx={40 + j * 50} cy={y + Math.sin(j * 0.6 + i) * 4}
              r="3.5" fill={j % 4 === i ? '#FF6A3D' : '#ECF7F8'}
              opacity={0.7 - i * 0.12} />
          ))}
          <line x1="20" y1={y} x2="580" y2={y} stroke="#ECF7F8"
            strokeWidth="0.4" opacity={0.2 - i * 0.04} />
        </g>
      ))}
      {/* ripple highlights */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = (i * 137) % 600;
        const y = 80 + (i * 89) % 700;
        return <circle key={i} cx={x} cy={y} r="1.5" fill="#ECF7F8" opacity={0.18} />;
      })}
    </svg>
  );
}

function RoleCard({ inverse = false }) {
  const rows = [
    {
      k: 'Owned',
      v: 'Strategy · Brand system · Design system tokens · IA · All wireframes & hi-fi UI · Wet Mode interaction model · Session Swapper flow · Bilingual onboarding · PWA implementation in code.',
    },
    {
      k: 'Worked across',
      v: 'Adherence-science synthesis (SDT, sport-psychology) · Competitive teardown · Technical scoping for offline-first PWA.',
    },
    {
      k: 'Gave up',
      v: 'A real user research panel. This is a concept project — research is secondary literature plus light primary conversations.',
    },
  ];
  return (
    <div className={`role-card ${inverse ? 'role-card--inverse' : ''}`}>
      <div className="label" style={{ marginBottom: 18 }}>My role</div>
      <div className="role-rows">
        {rows.map(r => (
          <div className="role-row" key={r.k}>
            <div className="role-key">{r.k}</div>
            <div className="role-val">{r.v}</div>
          </div>
        ))}
      </div>
      <div className="role-pull">
        <em>"Every decision in this case study is one I made and can defend."</em>
      </div>
    </div>
  );
}

function MetaTable() {
  const rows = [
    ['Project', 'Atlan Performance — Liquid Precision & The Quiet Sage'],
    ['Type', 'Self-initiated UX concept project'],
    ['Status', 'Built (PWA functional); not launched to users'],
    ['Duration', '~10 weeks, end-to-end, solo'],
    ['Platform', 'Offline-first PWA · Bilingual ES/EN'],
    ['Voice mix', 'Sage 70 / Hero 30 · No Ruler'],
    ['Designer', 'Edgar Bonilla'],
    ['Date', 'May 2026'],
  ];
  return (
    <div className="meta-table">
      {rows.map(([k, v]) => (
        <div className="meta-row" key={k}>
          <div className="meta-key">{k}</div>
          <div className="meta-val">{v}</div>
        </div>
      ))}
    </div>
  );
}

function HeroEditorial({ scene }) {
  return (
    <section id="hero" className="section section--abyss-deep hero hero--editorial" data-screen-label="01 Hero">
      <div className="container container--wide">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-badge-row">
              <div className="hero-brand-lockup">
                <img className="hero-brand-mark" src="assets/atlan_logo_bk.svg" alt="Atlan" width="72" height="72" />
                <div className="badge"><span className="dot"></span>Self-Initiated Concept</div>
              </div>
              <div className="hero-meta-inline">
                <span className="mono">2026</span>
                <span className="dotsep">·</span>
                <span>Edgar Bonilla</span>
              </div>
            </div>

            <div className="hero-tick"></div>

            <h1 className="hero-title">
              An emotionally<br />
              intelligent coach<br />
              <em>for athletes with lives.</em>
            </h1>

            <p className="hero-deck">
              A self-initiated UX concept project: an offline-first, bilingual coaching PWA
              for executive endurance athletes (30–50), built end-to-end solo over ~10 weeks.
            </p>

            <div className="hero-stats">
              <Stat n="16:1" l="AAA contrast" />
              <Stat n="2" l="Languages, at parity" />
              <Stat n="~10wk" l="Solo, end-to-end" />
              <Stat n="90/10" l="Sage · Hero voice" />
            </div>
          </div>

          <div className="hero-art">
            <MorningLightSVG variant={scene} />
          </div>
        </div>

        <div className="hero-divider"></div>

        <div className="hero-foot">
          <RoleCard inverse />
          <div className="hero-meta">
            <div className="label" style={{ marginBottom: 18 }}>At a glance</div>
            <MetaTable />
          </div>
        </div>

        <div className="hero-preview">
          <div className="eyebrow"><ArrowDown className="eyebrow-icon" aria-hidden="true" /> What follows</div>
          <div className="hero-preview-grid">
            {SECTIONS.slice(1).map(s => (
              <a key={s.id} href={`#${s.id}`} className="hero-preview-item">
                <span className="mono">{s.num}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMagazine({ scene }) {
  return (
    <section id="hero" className="section section--abyss-deep hero hero--magazine" data-screen-label="01 Hero">
      <div className="container container--wide">
        <div className="hero-mag-top">
          <div className="hero-brand-lockup">
            <img className="hero-brand-mark" src="assets/atlan_logo_bk.svg" alt="Atlan" width="72" height="72" />
            <div className="badge"><span className="dot"></span>Self-Initiated Concept</div>
          </div>
          <div className="hero-mag-meta">
            <span><span className="label">Project</span> Atlan Performance</span>
            <span><span className="label">By</span> Edgar Bonilla</span>
            <span><span className="label">Date</span> May 2026</span>
          </div>
        </div>

        <div className="hero-tick" style={{ margin: '48px 0 32px' }}></div>

        <h1 className="hero-mag-title">
          An emotionally intelligent coach<br />
          <em>for athletes with lives.</em>
        </h1>

        <div className="hero-mag-deck-row">
          <p className="hero-deck" style={{ maxWidth: 540 }}>
            A self-initiated UX concept project — an offline-first, bilingual coaching PWA
            for executive endurance athletes (30–50). Built end-to-end solo over ~10 weeks.
            The case study reads as confidently honest, or it doesn't read at all.
          </p>
          <div className="hero-mag-art">
            <MorningLightSVG variant={scene} />
          </div>
        </div>

        <div className="hero-mag-bottom">
          <div className="hero-stats hero-stats--wide">
            <Stat n="16:1" l="AAA contrast (Wet Mode)" />
            <Stat n="320×360" l="Wet Mode touch zone" />
            <Stat n="2" l="Languages, at parity" />
            <Stat n="~10wk" l="End-to-end solo" />
            <Stat n="100%" l="Offline-first" />
          </div>
        </div>

        <div className="hero-divider"></div>
        <div className="hero-foot">
          <RoleCard inverse />
          <div className="hero-meta">
            <div className="label" style={{ marginBottom: 18 }}>At a glance</div>
            <MetaTable />
          </div>
        </div>

        <div className="hero-preview">
          <div className="eyebrow"><ArrowDown className="eyebrow-icon" aria-hidden="true" /> What follows</div>
          <div className="hero-preview-grid">
            {SECTIONS.slice(1).map(s => (
              <a key={s.id} href={`#${s.id}`} className="hero-preview-item">
                <span className="mono">{s.num}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCentered({ scene }) {
  return (
    <section id="hero" className="section section--abyss-deep hero hero--centered" data-screen-label="01 Hero">
      <div className="hero-centered-art-bg">
        <MorningLightSVG variant={scene} />
        <div className="hero-centered-veil"></div>
      </div>
      <div className="container container--wide hero-centered-content">
        <div className="hero-centered-stack">
          <img className="hero-brand-mark hero-brand-mark--centered" src="assets/atlan_logo_bk.svg" alt="Atlan" width="96" height="96" />
          <div className="badge"><span className="dot"></span>Self-Initiated Concept</div>
          <div className="hero-tick"></div>
          <h1 className="hero-title hero-title--centered">
            An emotionally intelligent coach<br />
            <em>for athletes with lives.</em>
          </h1>
          <p className="hero-deck hero-deck--centered">
            A self-initiated UX concept project — an offline-first, bilingual coaching PWA
            for executive endurance athletes (30–50). Built end-to-end solo over ~10 weeks.
          </p>
          <div className="hero-byline">
            <span className="mono">EDGAR BONILLA</span>
            <span className="dotsep">·</span>
            <span className="mono">MAY 2026</span>
            <span className="dotsep">·</span>
            <span className="mono">BUILT, NOT LAUNCHED</span>
          </div>
        </div>

        <div className="hero-stats hero-stats--centered">
          <Stat n="16:1" l="AAA contrast" />
          <Stat n="2" l="Languages, at parity" />
          <Stat n="~10wk" l="Solo, end-to-end" />
          <Stat n="90/10" l="Sage · Hero voice" />
        </div>

        <div className="hero-divider"></div>
        <div className="hero-foot">
          <RoleCard inverse />
          <div className="hero-meta">
            <div className="label" style={{ marginBottom: 18 }}>At a glance</div>
            <MetaTable />
          </div>
        </div>

        <div className="hero-preview">
          <div className="eyebrow"><ArrowDown className="eyebrow-icon" aria-hidden="true" /> What follows</div>
          <div className="hero-preview-grid">
            {SECTIONS.slice(1).map(s => (
              <a key={s.id} href={`#${s.id}`} className="hero-preview-item">
                <span className="mono">{s.num}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div className="stat">
      <div className="stat-n">{n}</div>
      <div className="stat-l">{l}</div>
    </div>
  );
}

export function Hero({ variant = 'editorial', scene = 'pool' }) {
  if (variant === 'magazine') return <HeroMagazine scene={scene} />;
  if (variant === 'centered') return <HeroCentered scene={scene} />;
  return <HeroEditorial scene={scene} />;
}
