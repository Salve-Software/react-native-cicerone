import React from 'react';
import styles from './styles.module.css';

const FEATURES = [
  {
    icon: '📦',
    title: 'No native code',
    body: 'Pure TypeScript. Nothing of ours to link, nothing of ours to rebuild.',
  },
  {
    icon: '🎯',
    title: 'New Architecture ready',
    body: 'Measures with measureInWindow, never the deprecated findNodeHandle.',
  },
  {
    icon: '📜',
    title: 'Scroll aware',
    body: 'A target below the fold is scrolled into view, allowed to settle, and only then measured.',
  },
  {
    icon: '🎨',
    title: 'Your card, or ours',
    body: 'A styled card works out of the box, and renderCard replaces it while the spotlight stays.',
  },
  {
    icon: '🧭',
    title: 'Placement that follows',
    body: 'The card takes the side with room, and the arrow moves when clamping pulls the two apart.',
  },
  {
    icon: '🪆',
    title: 'Nested-safe',
    body: 'The overlay works in its own box, so a provider inside a sheet still lands on target.',
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
