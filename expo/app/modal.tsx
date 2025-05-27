import React from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Shield, Globe, Zap } from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F2F2F7', '#E5E5EA']}
        style={styles.background}
      />

      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Panda Meet</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <Text style={styles.description}>
          A beautiful, secure video conferencing app with an iOS-inspired design.
          Connect with your team through crystal clear video calls.
        </Text>

        <Text style={styles.featuresTitle}>Key Features</Text>

        <GlassCard style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Video size={24} color={colors.primary} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>HD Video Conferencing</Text>
            <Text style={styles.featureDescription}>
              High-quality video and audio for seamless communication with your team
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Shield size={24} color={colors.primary} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>End-to-End Encryption</Text>
            <Text style={styles.featureDescription}>
              Your meetings are secure with advanced encryption technology
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Globe size={24} color={colors.primary} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Cross-Platform</Text>
            <Text style={styles.featureDescription}>
              Available on iOS, Android, and web browsers for maximum flexibility
            </Text>
          </View>
        </GlassCard>

        <GlassCard style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <Zap size={24} color={colors.primary} />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Low Latency</Text>
            <Text style={styles.featureDescription}>
              Optimized for minimal delay, even on slower connections
            </Text>
          </View>
        </GlassCard>

        <Text style={styles.footer}>
          © 2025 Panda Meet. All rights reserved.
        </Text>

        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://example.com/privacy')}
        >
          Privacy Policy
        </Text>

        <Text
          style={styles.link}
          onPress={() => Linking.openURL('https://example.com/terms')}
        >
          Terms of Service
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: colors.lightText,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.lightText,
    lineHeight: 20,
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: colors.lightText,
    textAlign: 'center',
  },
  link: {
    marginTop: 12,
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});