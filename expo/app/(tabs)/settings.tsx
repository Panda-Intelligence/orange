import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mic, Video, Bell, Moon, Wifi, Lock, Globe } from 'lucide-react-native';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [autoMute, setAutoMute] = useState(true);
  const [autoVideo, setAutoVideo] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [e2eEncryption, setE2eEncryption] = useState(true);
  
  // 切换语言
  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    await setLanguage(newLanguage);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: t('settings.title'),
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
        <Text style={styles.sectionTitle}>{t('settings.meetingPreferences')}</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Mic size={22} color={colors.primary} />}
            title={t('settings.joinMuted.title')}
            description={t('settings.joinMuted.description')}
            value={autoMute}
            onValueChange={setAutoMute}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Video size={22} color={colors.primary} />}
            title={t('settings.joinVideoOff.title')}
            description={t('settings.joinVideoOff.description')}
            value={autoVideo}
            onValueChange={setAutoVideo}
          />
        </GlassCard>

        <Text style={styles.sectionTitle}>{t('settings.appSettings')}</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Bell size={22} color={colors.primary} />}
            title={t('settings.notifications.title')}
            description={t('settings.notifications.description')}
            value={notifications}
            onValueChange={setNotifications}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Moon size={22} color={colors.primary} />}
            title={t('settings.darkMode.title')}
            description={t('settings.darkMode.description')}
            value={darkMode}
            onValueChange={setDarkMode}
          />

          <View style={styles.divider} />

          <SettingItem
            icon={<Wifi size={22} color={colors.primary} />}
            title={t('settings.lowDataMode.title')}
            description={t('settings.lowDataMode.description')}
            value={lowDataMode}
            onValueChange={setLowDataMode}
          />
          
          <View style={styles.divider} />
          
          {/* 添加语言选择项 */}
          <TouchableOpacity onPress={toggleLanguage} style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Globe size={22} color={colors.primary} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('settings.language.title')}</Text>
              <Text style={styles.settingDescription}>{t('settings.language.description')}</Text>
            </View>
            <Text style={styles.languageValue}>{i18n.language === 'en' ? 'English' : '中文'}</Text>
          </TouchableOpacity>
        </GlassCard>

        <Text style={styles.sectionTitle}>{t('settings.privacySecurity')}</Text>

        <GlassCard style={styles.card}>
          <SettingItem
            icon={<Lock size={22} color={colors.primary} />}
            title={t('settings.e2eEncryption.title')}
            description={t('settings.e2eEncryption.description')}
            value={e2eEncryption}
            onValueChange={setE2eEncryption}
          />
        </GlassCard>

        <View style={styles.footer}>
          <Text style={styles.versionText}>{t('settings.version')}</Text>
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
  
  // 添加语言值的样式
  languageValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
});