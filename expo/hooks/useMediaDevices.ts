import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';

interface MediaDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput' | 'videoinput';
}

export function useMediaDevices() {
  const [audioDevices, setAudioDevices] = useState<MediaDevice[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDevice[]>([]);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const [audioStatus, cameraStatus] = await Promise.all([
          Audio.requestPermissionsAsync(),
          Camera.requestCameraPermissionsAsync(),
        ]);

        if (audioStatus.status === 'granted' && cameraStatus.status === 'granted') {
          setPermissionsGranted(true);
          
          // Mock device enumeration for React Native
          setAudioDevices([
            { deviceId: 'default', label: 'Default Microphone', kind: 'audioinput' },
            { deviceId: 'builtin', label: 'Built-in Microphone', kind: 'audioinput' },
          ]);
          
          setVideoDevices([
            { deviceId: 'front', label: 'Front Camera', kind: 'videoinput' },
            { deviceId: 'back', label: 'Back Camera', kind: 'videoinput' },
          ]);
        }
      } catch (error) {
        console.error('Error checking media permissions:', error);
      }
    };

    checkPermissions();
  }, []);

  return {
    audioDevices,
    videoDevices,
    permissionsGranted,
  };
}