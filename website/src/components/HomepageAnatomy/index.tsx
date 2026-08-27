import Translate from '@docusaurus/Translate';
import CodeBlock from '@theme/CodeBlock';
import React from 'react';
import styles from './styles.module.css';

const SNIPPET = `import { Cicerone } from '@salve-software/react-native-cicerone';

<Cicerone.Provider steps={STEPS} tourKey="scanner">
  <Cicerone.Target id="viewfinder">
    <Viewfinder />
  </Cicerone.Target>
</Cicerone.Provider>;`;

const PARTS = [
  {
    term: 'Cicerone.Provider',
    desc: (
      <Translate id="anatomy.provider">
        Holds the tour, measures each step, and draws the overlay above its children.
      </Translate>
    ),
  },
  {
    term: 'Cicerone.Target',
    desc: (
      <Translate id="anatomy.target">
        Marks an element. The step with the same id measures it when its turn comes.
      </Translate>
    ),
  },
  {
    term: 'steps',
    desc: (
      <Translate id="anatomy.steps">
        Copy, padding and radius for each step. Everything else has a default.
      </Translate>
    ),
  },
  {
    term: 'tourKey',
    desc: (
      <Translate id="anatomy.tourKey">
        The key the seen flag is stored under, so the tour only runs once.
      </Translate>
    ),
  },
];

export const HomepageAnatomy = () => (
  <section className={styles.section}>
    <div className="container">
      <h2 className={styles.heading}>
        <Translate id="anatomy.heading">Three pieces</Translate>
      </h2>
      <p className={styles.sub}>
        <Translate id="anatomy.sub">
          A provider that holds the tour, targets that mark the elements, and steps that
          reference those targets by id.
        </Translate>
      </p>

      <div className={styles.split}>
        <CodeBlock language="tsx">{SNIPPET}</CodeBlock>

        <ul className={styles.list}>
          {PARTS.map((part) => (
            <li key={part.term} className={styles.item}>
              <span className={styles.term}>{part.term}</span>
              <p className={styles.desc}>{part.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
