import Translate from '@docusaurus/Translate';
import React from 'react';
import styles from './styles.module.css';

const FEATURES = [
  {
    id: 'native',
    icon: '📦',
    title: <Translate id="features.native.title">No native code</Translate>,
    body: (
      <Translate id="features.native.body">
        Pure TypeScript. Nothing of ours to link or rebuild.
      </Translate>
    ),
  },
  {
    id: 'architecture',
    icon: '🎯',
    title: <Translate id="features.architecture.title">New Architecture ready</Translate>,
    body: (
      <Translate id="features.architecture.body">
        Measures with measureInWindow, not the deprecated findNodeHandle.
      </Translate>
    ),
  },
  {
    id: 'scroll',
    icon: '📜',
    title: <Translate id="features.scroll.title">Handles scrolling</Translate>,
    body: (
      <Translate id="features.scroll.body">
        A target below the fold gets scrolled into view, then measured once the scroll
        settles.
      </Translate>
    ),
  },
  {
    id: 'card',
    icon: '🎨',
    title: <Translate id="features.card.title">Use our card or yours</Translate>,
    body: (
      <Translate id="features.card.body">
        The built in card works out of the box, and renderCard swaps it without losing the
        spotlight.
      </Translate>
    ),
  },
  {
    id: 'placement',
    icon: '🧭',
    title: (
      <Translate id="features.placement.title">Placement follows the target</Translate>
    ),
    body: (
      <Translate id="features.placement.body">
        The card takes the side with room, and the arrow slides when clamping pulls them
        apart.
      </Translate>
    ),
  },
  {
    id: 'nested',
    icon: '🪆',
    title: <Translate id="features.nested.title">Works when nested</Translate>,
    body: (
      <Translate id="features.nested.body">
        The overlay uses its own box, so a provider inside a sheet still lands on target.
      </Translate>
    ),
  },
];

export const HomepageFeatures = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.grid}>
        {FEATURES.map((feature) => (
          <div key={feature.id} className={styles.card}>
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.body}>{feature.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
