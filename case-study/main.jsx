import React from 'react';
import { createRoot } from 'react-dom/client';

import './styles.css';
import './hero.css';
import './sections.css';

import { Rail } from './Rail.jsx';
import { Hero } from './Hero.jsx';
import { SummarySection } from './Summary.jsx';
import { ProblemSection, PersonaSection, ProcessSection } from './Sections1.jsx';
import { SolutionSection, OutcomesSection, HonestySection } from './Sections2.jsx';

function WaterBand() {
  return (
    <div className="water-band" aria-hidden="true">
      <img src="assets/photography/fig-water-texture.avif" alt="" loading="lazy" decoding="async" />
      <div className="water-band-veil"></div>
      <div className="water-band-mark">
        <span className="mono">Liquid Precision</span>
        <span className="dotsep">·</span>
        <span className="mono">Atlan</span>
      </div>
    </div>
  );
}

const DEFAULTS = {
  heroVariant: 'editorial',
  heroScene: 'pool',
  outcomesVariant: 'tiles',
  typeStyle: 'outfit-lato',
  coralIntensity: 1,
  showHero: true,
  showProblem: true,
  showPersona: true,
  showProcess: true,
  showSolution: true,
  showOutcomes: true,
  showHonesty: true,
};

function getInitialTheme() {
  const stored = window.localStorage.getItem('atlan-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [t] = React.useState(DEFAULTS);
  const [theme, setTheme] = React.useState(getInitialTheme);

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem('atlan-theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const root = document.documentElement;
    if (t.typeStyle === 'fraunces-manrope') {
      root.style.setProperty('--display', "'Fraunces', 'Georgia', serif");
      root.style.setProperty('--body', "'Manrope', 'Helvetica Neue', sans-serif");
    } else if (t.typeStyle === 'outfit-inter') {
      root.style.setProperty('--display', "'Outfit', 'Inter', sans-serif");
      root.style.setProperty('--body', "'Inter', system-ui, sans-serif");
    } else {
      root.style.setProperty('--display', "'Outfit', 'Inter', sans-serif");
      root.style.setProperty('--body', "'Lato', 'Helvetica Neue', sans-serif");
    }
    root.style.setProperty('--coral-mix', String(t.coralIntensity));
  }, [t.typeStyle, t.coralIntensity]);

  const toggleTheme = React.useCallback(() => {
    setTheme((current) => current === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <div className="app">
      <Rail theme={theme} onThemeToggle={toggleTheme} />
      <main className="main">
        {t.showHero && <Hero variant={t.heroVariant} scene={t.heroScene} />}
        <SummarySection />
        {t.showProblem && <ProblemSection />}
        {t.showPersona && <PersonaSection />}
        {t.showProcess && <ProcessSection />}
        {t.showSolution && <SolutionSection />}
        <WaterBand />
        {t.showOutcomes && <OutcomesSection variant={t.outcomesVariant} />}
        {t.showHonesty && <HonestySection />}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
