import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Mic, MicOff } from 'lucide-react-native';
import colors from '@/constants/colors';

interface ParticipantVideoProps {
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isActive?: boolean;
  videoUrl?: string;
}

export default function ParticipantVideo({
  name,
  isMuted,
  isVideoOn,
  isActive = false,
  videoUrl
}: ParticipantVideoProps) {
  return (
    <View style={[
      styles.container,
      isActive && styles.activeContainer
    ]}>
      {isVideoOn ? (
        <Image
          source={{ uri: videoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }}
          style={styles.video}
          contentFit="cover"
        />
      ) : (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        {isMuted && (
          <View style={styles.micIcon}>
            <MicOff size={14} color="white" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2C2C2E',
    aspectRatio: 4 / 3,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeContainer: {
    borderColor: colors.primary,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  nameText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  micIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});