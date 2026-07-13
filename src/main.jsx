import './main.js';

import { createRoot } from 'react-dom/client';
import Galaxy from './components/Galaxy';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const galaxyRoot = document.getElementById('galaxy-root');
if (galaxyRoot) {
  createRoot(galaxyRoot).render(
    <Galaxy
      mouseRepulsion={false}
      mouseInteraction={false}
      density={1.4}
      glowIntensity={0.5}
      saturation={0.7}
      hueShift={220}
      starSpeed={0.2}
      twinkleIntensity={0.5}
      rotationSpeed={0.05}
      disableAnimation={prefersReducedMotion}
    />
  );
}
