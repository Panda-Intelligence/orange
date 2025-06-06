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
export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [userName, setUserName] = useState('');
  const setMeetingInfo = useMeetingStore((state) => state.setMeetingInfo);
  const setUserNameInStore = useMeetingStore((state) => state.setUserName);

  const handleJoinMeeting = () => {
    if (!meetingCode.trim()) {
      Alert.alert('Error', t('errors.enterMeetingCode'));
      return;
    }

    if (!userName.trim()) {
      Alert.alert('Error', t('errors.enterName'));
      return;
    }

    // Set meeting info in store
    setMeetingInfo(meetingCode, 'Team Meeting', false);
    setUserNameInStore(userName);

    // Navigate to meeting room
    router.push('/meeting');
  };

  const handleCreateMeeting = () => {
    if (!userName.trim()) {
      Alert.alert('Error', t('errors.enterName'));
      return;
    }

    // Generate a random meeting code
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Set meeting info in store
    setMeetingInfo(randomCode, 'My Meeting', true);
    setUserNameInStore(userName);

    // Navigate to meeting room
    router.push('/meeting');
  };

  const recentMeetings = [
    { id: '1', title: 'Weekly Team Sync', participants: 8, time: '2 days ago' },
    { id: '2', title: 'Product Review', participants: 5, time: '1 week ago' },
    { id: '3', title: 'Design Workshop', participants: 12, time: '2 weeks ago' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'GlassMeet',
          headerTitleStyle: styles.headerTitle,
        }}
      />

      <LinearGradient
        colors={colors.gradients.background as any}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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

        <GlassCard style={styles.joinCard}>
          <Text style={styles.cardTitle}>{t('home.joinCard.title')}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('home.joinCard.yourName')}
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor={colors.lightText}
          />

          <TextInput
            style={styles.input}
            placeholder={t('home.joinCard.meetingCode')}
            value={meetingCode}
            onChangeText={setMeetingCode}
            placeholderTextColor={colors.lightText}
            autoCapitalize="characters"
          />

          <View style={styles.buttonRow}>
            <Button
              title={t('home.joinCard.joinMeeting')}
              onPress={handleJoinMeeting}
              variant="primary"
              style={styles.button}
              icon={<Video size={18} color="white" />}
            />
            <Button
              title={t('home.joinCard.newMeeting')}
              onPress={handleCreateMeeting}
              variant="glass"
              style={styles.button}
              icon={<Plus size={18} color={colors.primary} />}
            />
          </View>
        </GlassCard>

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
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    // 添加文字发光效果
    textShadowColor: colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  joinCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
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