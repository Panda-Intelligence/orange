import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Mic, MicOff, Video, VideoOff, MessageCircle, Users, PhoneOff, Share2 } from 'lucide-react-native';
import colors from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

interface MeetingControlsProps {
  isMuted: boolean;
  isVideoOn: boolean;
  onToggleMute: () => void;
  onToggleVideo: () => void;
  onOpenChat: () => void;
  onOpenParticipants: () => void;
  onLeave: () => void;
  onShare: () => void;
}

export default function MeetingControls({
  isMuted,
  isVideoOn,
  onToggleMute,
  onToggleVideo,
  onOpenChat,
  onOpenParticipants,
  onLeave,
  onShare
}: MeetingControlsProps) {
  const ControlsContainer = Platform.OS === 'web' ? View : BlurView;
  const containerProps = Platform.OS === 'web'
    ? { style: [styles.container, styles.webContainer] }
    : { intensity: 60, tint: colors.blurTint, style: styles.container };

  return (
    // @ts-ignore - BlurView props are different from View props
    <ControlsContainer {...containerProps}>
      <View style={styles.controlsRow}>
        <ControlButton
          icon={isMuted ? <MicOff size={24} color={colors.danger} /> : <Mic size={24} color="white" />}
          onPress={onToggleMute}
          active={!isMuted}
        />
        <ControlButton
          icon={isVideoOn ? <Video size={24} color="white" /> : <VideoOff size={24} color={colors.danger} />}
          onPress={onToggleVideo}
          active={isVideoOn}
        />
        <ControlButton
          icon={<MessageCircle size={24} color="white" />}
          onPress={onOpenChat}
        />
        <ControlButton
          icon={<Users size={24} color="white" />}
          onPress={onOpenParticipants}
        />
        <ControlButton
          icon={<Share2 size={24} color="white" />}
          onPress={onShare}
        />
        <ControlButton
          icon={<PhoneOff size={24} color="white" />}
          onPress={onLeave}
          style={styles.leaveButton}
        />
      </View>
    </ControlsContainer>
  );
}

interface ControlButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  active?: boolean;
  style?: any;
}

function ControlButton({ icon, onPress, active = true, style }: ControlButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.controlButton,
        active ? styles.activeButton : styles.inactiveButton,
        style
      ]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 0,
  },
  webContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inactiveButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  leaveButton: {
    backgroundColor: colors.danger,
  },
});