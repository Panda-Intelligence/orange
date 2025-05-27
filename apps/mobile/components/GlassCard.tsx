import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import colors from '@/constants/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export default function GlassCard({
  children,
  style,
  intensity = 70
}: GlassCardProps) {
  // On web, use a regular card with background color instead of BlurView
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.card, styles.webCard, style]}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.card, style]}>
      <BlurView intensity={intensity} tint={colors.blurTint} style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  blur: {
    padding: 16,
    width: '100%',
    height: '100%',
  },
  webCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
  }
});