import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';

const el = document.getElementById('root');

// If the page was prerendered (SSG), hydrate the existing markup; otherwise
// (dev server, or an empty shell) mount fresh.
if (el.hasChildNodes()) {
  hydrateRoot(el, <App />);
} else {
  createRoot(el).render(<App />);
}
