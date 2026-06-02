import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App.jsx';

// Rendered at build time by scripts/prerender.mjs. Effects never run here, so
// the output is the clean pre-effect tree that the client hydrates against.
export function render() {
  return renderToString(<App />);
}
