import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, Users, Plus } from 'lucide-react-native';
import Button from '@/components/Button';
import GlassCard from '@/components/GlassCard';
import colors from '@/constants/colors';
import { useMeetingStore } from '@/store/meetingStore';

export default function HomeScreen() {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState('');
  const [userName, setUserName] = useState('');
  const setMeetingInfo = useMeetingStore((state) => state.setMeetingInfo);
  const setUserNameInStore = useMeetingStore((state) => state.setUserName);

  const handleJoinMeeting = () => {
    if (!meetingCode.trim()) {
      Alert.alert('Error', 'Please enter a meeting code');
      return;
    }

    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
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
      Alert.alert('Error', 'Please enter your name');
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
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Panda Meet',
          headerTitleStyle: styles.headerTitle,
        }}
      />

      <LinearGradient
        colors={['#87CEFA', '#000000']} // 从浅蓝色(LightSkyBlue)到黑色
        start={{ x: 0, y: 0 }} // 左上角开始
        end={{ x: 1, y: 1 }} // 右下角结束
        style={styles.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Crystal Clear Video Meetings</Text>
          <Text style={styles.heroSubtitle}>
            Connect with your team through beautiful, distraction-free video calls
          </Text>
        </View>

        <GlassCard style={styles.joinCard}>
          <Text style={styles.cardTitle}>Join or Create a Meeting</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor={colors.lightText}
          />

          <TextInput
            style={styles.input}
            placeholder="Meeting Code"
            value={meetingCode}
            onChangeText={setMeetingCode}
            placeholderTextColor={colors.lightText}
            autoCapitalize="characters"
          />

          <View style={styles.buttonRow}>
            <Button
              title="Join Meeting"
              onPress={handleJoinMeeting}
              variant="primary"
              style={styles.button}
              icon={<Video size={18} color="white" />}
            />
            <Button
              title="New Meeting"
              onPress={handleCreateMeeting}
              variant="glass"
              style={styles.button}
              icon={<Plus size={18} color={colors.primary} />}
            />
          </View>
        </GlassCard>
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
    height: 280,
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
    flexDirection: 'row',  // 移除多余的display: 'flex'
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',  // 添加垂直居中对齐
    height: Platform.OS === 'ios' ? 50 : 'auto', // 为iOS设置固定高度
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