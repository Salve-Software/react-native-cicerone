import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import React from 'react';
import { HomepageAnatomy } from '@site/src/components/HomepageAnatomy';
import { HomepageFeatures } from '@site/src/components/HomepageFeatures';
import { HomepageHero } from '@site/src/components/HomepageHero';

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'home.title',
        message: 'Guided onboarding tours for React Native',
      })}
      description={translate({
        id: 'home.description',
        message:
          'It handles the spotlight, you style the card. No native code, New Architecture ready.',
      })}
    >
      <HomepageHero />
      <main>
        <HomepageAnatomy />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
