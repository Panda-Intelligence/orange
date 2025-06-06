import React from 'react';
import { ColorValue, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import colors from '@/constants/colors';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: 'default' | 'primary' | 'accent';
}

export default function GlassCard({
  children,
  style,
  intensity = 70,
  variant = 'default'
}: GlassCardProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return colors.gradients.card;
      case 'accent':
        return ['rgba(6, 182, 212, 0.1)', 'rgba(0, 0, 0, 0.2)'];
      default:
        return colors.gradients.glass;
    }
  };

  // On web, use gradient background instead of BlurView
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.card, style]}>
        <LinearGradient
          colors={getGradientColors() as any}
          style={styles.webCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.card, style]}>
      <BlurView intensity={intensity} tint={colors.blurTint} style={styles.blur}>
        <LinearGradient
          colors={getGradientColors() as any}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20, // 增加圆角
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    // 添加阴影效果
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  blur: {
    width: '100%'
  },
  gradientOverlay: {
    padding: 20, // 增加内边距
    width: '100%',
  },
  webCard: {
    padding: 20,
    width: '100%',
  }
});