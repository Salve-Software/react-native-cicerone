import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export const HomepageDemo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Set on the client only: autoPlay has to match the server render or hydration warns.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    videoRef.current?.pause();
    setIsPaused(true);
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>
          <Translate id="demo.heading">See it run</Translate>
        </h2>
        <p className={styles.sub}>
          <Translate id="demo.sub">
            Five steps in the example app: the dim, the hole around each target, the
            scroll to one below the fold, the card flipping above, and the highlight at
            the end.
          </Translate>
        </p>

        <video
          ref={videoRef}
          className={styles.video}
          poster={useBaseUrl('/img/onboarding-poster.jpg')}
          controls={isPaused}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src={useBaseUrl('/img/onboarding.webm')} type="video/webm" />
          <source src={useBaseUrl('/img/onboarding.mp4')} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};
