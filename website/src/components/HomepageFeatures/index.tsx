import React from 'react';
import styles from './styles.module.css';

const FEATURES = [
  {
    icon: '📦',
    title: 'No native code',
    body: 'Pure TypeScript. Nothing of ours to link or rebuild.',
  },
  {
    icon: '🎯',
    title: 'New Architecture ready',
    body: 'Measures with measureInWindow, not the deprecated findNodeHandle.',
  },
  {
    icon: '📜',
    title: 'Scroll aware',
    body: 'A target below the fold gets scrolled into view, then measured once the scroll settles.',
  },
  {
    icon: '🎨',
    title: 'Your card, or ours',
    body: 'The built in card works out of the box, and renderCard swaps it without losing the spotlight.',
  },
  {
    icon: '🧭',
    title: 'Placement follows the target',
    body: 'The card takes the side with room, and the arrow slides when clamping pulls them apart.',
  },
  {
    icon: '🪆',
    title: 'Works when nested',
    body: 'The overlay uses its own box, so a provider inside a sheet still lands on target.',
  },
];

export const HomepageFeatures = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.grid}>
        {FEATURES.map((feature) => (
          <div key={feature.title} className={styles.card}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.body}>{feature.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
