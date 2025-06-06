import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Plus } from 'lucide-react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Meet!',
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
  }
});