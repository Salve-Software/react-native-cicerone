import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import React from 'react';
import styles from './styles.module.css';

const BADGES = [
  {
    alt: 'Version',
    src: 'https://img.shields.io/npm/v/@salve-software/react-native-cicerone.svg?style=flat-square',
  },
  {
    alt: 'React Native',
    src: 'https://img.shields.io/badge/React%20Native-0.76+-61dafb?style=flat-square&logo=react',
  },
  {
    alt: 'No native code',
    src: 'https://img.shields.io/badge/native%20code-none-brightgreen?style=flat-square',
  },
  {
    alt: 'License',
    src: 'https://img.shields.io/badge/license-MIT-green?style=flat-square',
  },
];

export const HomepageHero = () => (
  <header className={styles.hero}>
    <div className="container">
      <img className={styles.mark} src={useBaseUrl('/img/icon.svg')} alt="" />

      <h1 className={styles.title}>
        cicerone<span className={styles.dot}>.</span>
      </h1>

      <p className={styles.tagline}>
        <Translate id="hero.tagline">
          Guided onboarding tours for React Native. It handles the spotlight, you style
          the card.
        </Translate>
      </p>

      <div className={styles.actions}>
        <Link className="button button--primary button--lg" to="/docs/getting-started">
          <Translate id="hero.cta.start">Get started</Translate>
        </Link>
        <Link
          className="button button--secondary button--lg"
          to="https://github.com/Salve-Software/react-native-cicerone"
        >
          <Translate id="hero.cta.github">GitHub</Translate>
        </Link>
      </div>

      <div
        className={styles.install}
        title={translate({ id: 'hero.install.hint', message: 'Install with yarn' })}
      >
        <span className={styles.prompt}>$</span>
        <span>yarn add @salve-software/react-native-cicerone</span>
      </div>

      <div className={styles.badges}>
        {BADGES.map((badge) => (
          <img key={badge.alt} src={badge.src} alt={badge.alt} />
        ))}
      </div>
    </div>
  </header>
);
