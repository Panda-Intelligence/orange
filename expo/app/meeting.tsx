import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  Platform,
  Alert,
  TouchableOpacity,
  Share
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useCameraPermissions } from 'expo-camera';
import { useMeetingStore } from '@/store/meetingStore';
import MeetingControls from '@/components/MeetingControls';
import ParticipantVideo from '@/components/ParticipantVideo';
import ChatPanel from '@/components/ChatPanel';
import ParticipantsPanel from '@/components/ParticipantsPanel';
import colors from '@/constants/colors';
import { Copy } from 'lucide-react-native';
import SelfVideoView from '@/components/SelfVideoView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MeetingScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  // Meeting state from store
  const {
    meetingId,
    meetingTitle,
    isHost,
    isMuted,
    isVideoOn,
    isChatOpen,
    isParticipantsOpen,
    participants,
    messages,
    videoUrls,
    toggleMute,
    toggleVideo,
    toggleChat,
    toggleParticipants,
    sendMessage,
    leaveMeeting
  } = useMeetingStore();

  // Handle screen dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => subscription.remove();
  }, []);

  // Request camera permission if needed
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Calculate grid layout
  const getGridDimensions = () => {
    const participantCount = participants.length;
    let columns = 2;

    // Adjust columns based on participant count and screen width
    if (dimensions.width > 768) {
      columns = participantCount <= 4 ? 2 : 3;
    }

    return { columns };
  };

  const { columns } = getGridDimensions();

  // Handle leaving the meeting
  const handleLeave = () => {
    Alert.alert(
      'Leave Meeting',
      'Are you sure you want to leave this meeting?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            leaveMeeting();
            router.replace('/');
          }
        },
      ]
    );
  };

  // Share meeting code
  const handleShare = async () => {
    if (!meetingId) return;

    try {
      await Share.share({
        message: `Join my GlassMeet video call with code: ${meetingId}`,
      });
    } catch (error) {
      console.error('Error sharing meeting code:', error);
    }
  };

  // If no meeting ID, redirect to home
  if (!meetingId) {
    router.replace('/');
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: meetingTitle || 'Meeting',
          headerTitleStyle: styles.headerTitle,
          headerShown: false, // 隐藏 header
          headerRight: () => (
            <View style={styles.headerRight}>
              <Text style={styles.meetingIdText}>ID: {meetingId}</Text>
              <TouchableOpacity onPress={() => {
                Alert.alert('Meeting ID Copied', `Meeting ID: ${meetingId} copied to clipboard`);
              }}>
                <Copy size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <LinearGradient
        colors={colors.gradients.background}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <StatusBar style="dark" />

      <View style={[
        styles.participantsGrid,
        isChatOpen || isParticipantsOpen ? styles.participantsGridWithPanel : null
      ]}>
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            // For the current user, render camera view
            if (item.id === '1') {
              return (
                <View style={[styles.participantContainer, { flex: 1 / columns }]}>
                  <SelfVideoView />
                  <View style={styles.nameTag}>
                    <Text style={styles.nameText}>{item.name}</Text>
                    {item.isMuted && (
                      <View style={styles.mutedIndicator} />
                    )}
                  </View>
                </View>
              );
            }

            // For other participants
            return (
              <View style={[styles.participantContainer, { flex: 1 / columns }]}>
                <ParticipantVideo
                  name={item.name}
                  isMuted={item.isMuted}
                  isVideoOn={item.isVideoOn}
                  videoUrl={item.isVideoOn ? videoUrls[item.id] : undefined}
                />
              </View>
            );
          }}
        />
      </View>

      {isChatOpen && (
        <ChatPanel
          messages={messages}
          onSendMessage={sendMessage}
          onClose={toggleChat}
        />
      )}

      {isParticipantsOpen && (
        <ParticipantsPanel
          participants={participants}
          onClose={toggleParticipants}
        />
      )}

      <MeetingControls
        isMuted={isMuted}
        isVideoOn={isVideoOn}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
        onOpenChat={toggleChat}
        onOpenParticipants={toggleParticipants}
        onLeave={handleLeave}
        onShare={handleShare}
      />
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
    fontWeight: '600',
    fontSize: 18,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingIdText: {
    marginRight: 8,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  participantsGrid: {
    flex: 1,
    padding: 8,
    paddingBottom: 80, // Space for controls
  },
  participantsGridWithPanel: {
    width: Platform.OS === 'web' ? '70%' : '100%',
  },
  participantContainer: {
    padding: 4,
    aspectRatio: 4 / 3,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2C2C2E',
  },
  camera: {
    flex: 1,
  },
  cameraPlaceholder: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2C2C2E',
  },
  placeholderImage: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  nameTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  mutedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
});