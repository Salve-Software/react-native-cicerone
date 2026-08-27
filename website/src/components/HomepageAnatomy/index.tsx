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
    desc: 'Holds the tour, measures each step, and paints the overlay above its children.',
  },
  {
    term: 'Cicerone.Target',
    desc: 'Marks an element. A step with the same id measures it when its turn comes.',
  },
  {
    term: 'steps',
    desc: 'Copy, padding and radius per step. Everything else has a default.',
  },
  {
    term: 'tourKey',
    desc: 'What the "already seen" flag is stored under, so the tour runs once.',
  },
];

export const HomepageAnatomy = () => (
  <section className={styles.section}>
    <div className="container">
      <h2 className={styles.heading}>Three pieces</h2>
      <p className={styles.sub}>
        A provider that holds the tour, targets that mark the elements, and steps that tie
        them together by id.
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
