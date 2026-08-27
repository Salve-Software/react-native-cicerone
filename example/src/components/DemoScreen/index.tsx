import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Cicerone } from 'react-native-cicerone';
import { DemoSection } from '~/components/DemoSection';
import { useDemoScreenViewModel } from './hooks/useDemoScreenViewModel';
import { useStyles } from './styles';

/** Exercises the three phases: static targets, a scrolled target, and the upsell. */
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
          <Text style={styles.wordmark}>
            cicerone<Text style={styles.wordmarkDot}>.</Text>
          </Text>
          <Text style={styles.tagline}>
            It handles the spotlight, you style the card.
          </Text>
        </View>

        <DemoSection title="Static target" subtitle="Measured where it stands.">
          <Cicerone.Target id="reticle">
            <View style={styles.reticle}>
              <Text style={styles.reticleLabel}>VIEWFINDER</Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Circular target" subtitle="radius: 'circle'.">
          <View style={styles.row}>
            <Cicerone.Target id="scanbtn">
              <View style={styles.scanButton}>
                <Text style={styles.scanGlyph}>+</Text>
              </View>
            </Cicerone.Target>
            <Text style={styles.rowHint}>The hole rounds by half the shortest side.</Text>
          </View>
        </DemoSection>

        <View style={styles.spacer}>
          <Text style={styles.spacerText}>SCROLL DOWN</Text>
        </View>

        <DemoSection title="Target below the fold" subtitle="The tour scrolls to it.">
          <Cicerone.Target id="history">
            <View style={styles.card}>
              <Text style={styles.cardTitle}>History</Text>
              <Text style={styles.cardText}>
                Stored on the device — no account, no login.
              </Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Card flips above" subtitle="Target in the bottom half.">
          <Cicerone.Target id="score">
            <View style={styles.score}>
              <Text style={styles.scoreValue}>82</Text>
              <Text style={styles.scoreLabel}>SCORE</Text>
            </View>
          </Cicerone.Target>
        </DemoSection>

        <DemoSection title="Highlight step" subtitle="Own palette, sheen and sparkles.">
          <Cicerone.Target id="premium">
            <View style={styles.premium}>
              <View>
                <Text style={styles.premiumTitle}>Rotuz Premium</Text>
                <Text style={styles.premiumText}>Offline, search and alternatives</Text>
              </View>
              <Text style={styles.premiumTitle}>→</Text>
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
