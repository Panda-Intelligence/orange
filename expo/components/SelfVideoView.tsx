import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import colors from '@/constants/colors';
import { useMeetingStore } from '@/store/meetingStore';

export default function SelfVideoView() {
  const [permission] = useCameraPermissions();
  const {
    userName,
    isVideoOn,
    videoUrls,
  } = useMeetingStore();
  if (Platform.OS === 'web' || !permission?.granted) {
    // Placeholder for web or when no permission
    return (
      <View style={styles.cameraPlaceholder}>
        {!isVideoOn ? (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: videoUrls['1'] }}
            style={styles.placeholderImage}
            contentFit="cover"
          />
        )}
      </View>
    );
  }

  // Native camera view
  return (
    <View style={styles.cameraContainer}>
      {isVideoOn ? (
        <CameraView
          style={styles.camera}
          facing={'front' as CameraType}
        />
      ) : (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
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
  }
});