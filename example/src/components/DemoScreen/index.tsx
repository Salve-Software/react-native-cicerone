import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Cicerone } from '@salve-software/react-native-cicerone';
import { DemoSection } from '~/components/DemoSection';
import { useDemoScreenViewModel } from './hooks/useDemoScreenViewModel';
import { useStyles } from './styles';

/** One target per case the tour has to handle, in the order the steps visit them. */
export const DemoScreen: React.FC = () => {
  const styles = useStyles();
  const { restart, progress } = useDemoScreenViewModel();

  return (
    <View style={styles.root}>
      <Cicerone.ScrollView
        style={styles.root}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.wordmark}>cicerone</Text>
          <Text style={styles.tagline}>
            It handles the spotlight, you style the card.
          </Text>
        </View>

        <DemoSection title="Static target" subtitle="Measured where it stands.">
          <Cicerone.Target id="panel">
            <View style={styles.panel}>
              <Text style={styles.panelLabel}>ANY VIEW</Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Circular target" subtitle="radius: 'circle'.">
          <View style={styles.row}>
            <Cicerone.Target id="fab">
              <View style={styles.fab}>
                <Text style={styles.fabGlyph}>+</Text>
              </View>
            </Cicerone.Target>
            <Text style={styles.rowHint}>The hole rounds by half the shortest side.</Text>
          </View>
        </DemoSection>

        <View style={styles.spacer}>
          <Text style={styles.spacerText}>KEEP SCROLLING</Text>
        </View>

        <DemoSection title="Target below the fold" subtitle="The tour scrolls to it.">
          <Cicerone.Target id="list">
            <View style={styles.listCard}>
              <Text style={styles.listTitle}>List item</Text>
              <Text style={styles.listText}>
                Anything you can render can be a target.
              </Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Card flips above" subtitle="No room underneath.">
          <Cicerone.Target id="stat">
            <View style={styles.stat}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>STAT</Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Highlight step" subtitle="Own palette, sheen and sparkles.">
          <Cicerone.Target id="upgrade">
            <View style={styles.upgrade}>
              <View>
                <Text style={styles.upgradeTitle}>Upgrade to Pro</Text>
                <Text style={styles.upgradeText}>The step every app saves for last</Text>
              </View>
              <Text style={styles.upgradeTitle}>→</Text>
            </View>
          </Cicerone.Target>
        </DemoSection>
      </Cicerone.ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>{progress}</Text>
        <Pressable style={styles.restart} onPress={restart} accessibilityRole="button">
          <Text style={styles.restartLabel}>Restart tour</Text>
        </Pressable>
      </View>
    </View>
  );
};
