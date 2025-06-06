import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Users, Plus } from 'lucide-react-native';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';
import { useMeetingStore } from '@/store/meetingStore';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScheduleScreen() {
  const { t } = useTranslation();

  const recentMeetings = [
    { id: '1', title: 'Weekly Team Sync', participants: 8, time: '2 days ago' },
    { id: '2', title: 'Product Review', participants: 5, time: '1 week ago' },
    { id: '3', title: 'Design Workshop', participants: 12, time: '2 weeks ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Schedule',
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
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{t('home.title')}</Text>
          <Text style={styles.heroSubtitle}>
            {t('home.subtitle')}
          </Text>
        </View>

        {recentMeetings.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>{t('home.recentMeetings')}</Text>

            {recentMeetings.map((meeting) => (
              <GlassCard key={meeting.id} style={styles.recentCard}>
                <View style={styles.recentCardContent}>
                  <View>
                    <Text style={styles.recentTitle}>{meeting.title}</Text>
                    <Text style={styles.recentTime}>{meeting.time}</Text>
                  </View>
                  <View style={styles.participantsIndicator}>
                    <Users size={14} color={colors.primary} />
                    <Text style={styles.participantsText}>{meeting.participants}</Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
  heroSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.lightText,
    textAlign: 'center',
    maxWidth: '80%',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  recentCard: {
    marginBottom: 12,
  },
  recentCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  recentTime: {
    fontSize: 14,
    color: colors.lightText,
  },
  participantsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantsText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
});