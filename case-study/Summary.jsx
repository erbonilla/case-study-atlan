import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Figure } from './Figure.jsx';

// Atlan Case Study — Skim layer ("The 60-second version")
// Sits directly after the Hero. Gives a recruiter the whole spine —
// problem → reframe → outcome — plus the three product moves, each
// deep-linking to its real screens further down. Designed to be read
// in under a minute before committing to the full essay below.

const MOVES = [
  {
    n: '01',
    title: 'Wet Mode',
    line: 'Gross-motor swipe zones for wet hands at the pool deck. 16:1 contrast, offline-first.',
    sage: 90,
    src: 'figures/screens/wet-mode.html',
  },
  {
    n: '02',
    title: 'The “Why” button',
    line: 'Depth on demand — the science lives one tap below the surface, with real citations.',
    sage: 95,
    src: 'figures/screens/why-modal.html',
  },
  {
    n: '03',
    title: 'Bilingual onboarding',
    line: 'ES/EN at true parity, chosen before sign-up. Same emotional payload, not a literal translation.',
    sage: 55,
    src: 'figures/screens/onboarding-language.html',
  },
];

export function SummarySection() {
  return (
    <section id="summary" className="section section--abyss" data-screen-label="00 The 60-second version">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">
            <span className="num">TL;DR</span> The 60-second version
          </div>
          <h2 className="section-title">
            A coaching PWA that <em>absorbs the disruption</em> instead of marking it red.
          </h2>
          <p className="section-deck">
            For executive endurance athletes (30–50) who train between everything else.
            The full argument is below — this is the spine.
          </p>
        </div>

        <div className="skim-spine">
          <div className="skim-step">
            <div className="skim-step-k">The problem</div>
            <p className="skim-step-body">
              The market is split. Deep-science tools (TrainingPeaks) overload; social trackers
              (Strava) gamify. The Optimizer needs the rigor <em>and</em> the adherence support —
              and nobody builds both.
            </p>
          </div>
          <div className="skim-step skim-step--reframe">
            <div className="skim-step-k">The reframe that did the work</div>
            <p className="skim-step-body">
              Life-interruption is the <em>default state</em>, not the exception. The product's job is
              to absorb disruption silently — not to mark it red.
            </p>
          </div>
          <div className="skim-step">
            <div className="skim-step-k">Where it landed</div>
            <p className="skim-step-body">
              Built end-to-end solo in ~10 weeks: offline-first, bilingual, WCAG 2.2 AA — AAA on the
              high-stakes screen. Concept stage; every claim is tagged <strong>MEASURED</strong> or
              {' '}<strong>HYPOTHESIS</strong>.
            </p>
          </div>
        </div>

        <div className="skim-moves-head">
          <div className="eyebrow"><ArrowRight className="eyebrow-icon" aria-hidden="true" /> The product, in three moves</div>
          <p className="skim-moves-note">Real screens from the working PWA. Tap any card for the full breakdown.</p>
        </div>
        <div className="skim-moves">
          {MOVES.map((m) => (
            <a key={m.n} href="#solution" className="skim-move">
              <div className="skim-move-phone">
                <Figure
                  src={m.src}
                  title={m.title}
                  designWidth={340}
                  height={740}
                  minHeight={520}
                  showCaption={false}
                />
              </div>
              <div className="skim-move-num">Pillar {m.n}</div>
              <div className="skim-move-title">{m.title}</div>
              <p className="skim-move-line">{m.line}</p>
              <div className="skim-move-ratio">
                <span className="skim-move-bar"><span style={{ width: `${m.sage}%` }}></span></span>
                <span className="skim-move-pct">{m.sage}% Sage</span>
              </div>
              <div className="skim-move-cta">See the breakdown <ArrowRight aria-hidden="true" /></div>
            </a>
          ))}
        </div>

        <div className="skim-howto">
          <div className="skim-howto-label">How to read what follows</div>
          <ul className="skim-howto-list">
            <li><strong>Self-initiated concept</strong> — built, functional, not yet launched to users.</li>
            <li><strong>Synthesis persona</strong> — secondary research + informal conversations, not a recruited panel.</li>
            <li><strong>Every number is tagged</strong> <span className="mono">MEASURED</span> or <span className="mono">HYPOTHESIS</span>, with a measurement plan.</li>
            <li><strong>AI accelerated the build</strong> — the strategy, IA, and voice rules are mine.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
