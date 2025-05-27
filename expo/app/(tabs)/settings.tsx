import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Video, Bell, Moon, Wifi, Lock } from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';

export default function SettingsScreen() {
  const [autoMute, setAutoMute] = useState(true);
  const [autoVideo, setAutoVideo] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [e2eEncryption, setE2eEncryption] = useState(true);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Settings',
          headerTitleStyle: styles.headerTitle,
        }}
      />

      <LinearGradient
        colors={['#F2F2F7', '#E5E5EA']}
        style={styles.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Meeting Preferences</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Mic size={22} color={colors.primary} />}
            title="Join Meetings Muted"
            description="Automatically mute your microphone when joining meetings"
            value={autoMute}
            onValueChange={setAutoMute}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Video size={22} color={colors.primary} />}
            title="Join with Video Off"
            description="Turn off your camera when joining meetings"
            value={autoVideo}
            onValueChange={setAutoVideo}
          />
        </GlassCard>

        <Text style={styles.sectionTitle}>App Settings</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Bell size={22} color={colors.primary} />}
            title="Notifications"
            description="Receive notifications for meetings and messages"
            value={notifications}
            onValueChange={setNotifications}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Moon size={22} color={colors.primary} />}
            title="Dark Mode"
            description="Use dark theme throughout the app"
            value={darkMode}
            onValueChange={setDarkMode}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Wifi size={22} color={colors.primary} />}
            title="Low Data Mode"
            description="Reduce data usage during video calls"
            value={lowDataMode}
            onValueChange={setLowDataMode}
          />
        </GlassCard>

        <Text style={styles.sectionTitle}>Privacy & Security</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Lock size={22} color={colors.primary} />}
            title="End-to-End Encryption"
            description="Enable encryption for all meetings"
            value={e2eEncryption}
            onValueChange={setE2eEncryption}
          />
        </GlassCard>

        <View style={styles.footer}>
          <Text style={styles.versionText}>GlassMeet v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingItem({ icon, title, description, value, onValueChange }: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D1D6', true: 'rgba(0, 122, 255, 0.4)' }}
        thumbColor={value ? colors.primary : '#FFFFFF'}
        ios_backgroundColor="#D1D1D6"
      />
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
  headerTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginTop: 20,
  },
  card: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.lightText,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: colors.lightText,
  },
});