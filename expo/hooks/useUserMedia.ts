import React, { useState, useEffect, useCallback } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AndroidAudioEncoder, AndroidOutputFormat, IOSAudioQuality, IOSOutputFormat } from 'expo-av/build/Audio/RecordingConstants';

export const errorMessageMap = {
  NotAllowedError: 'Permission was denied. Grant permission and reload to enable.',
  NotFoundError: 'No device was found.',
  NotReadableError: 'Device is already in use.',
  OverconstrainedError: 'No device was found that meets constraints.',
  DevicesExhaustedError: 'All devices failed to initialize.',
  UnknownError: 'An unknown error occurred.',
};

type UserMediaError = keyof typeof errorMessageMap;

interface AudioDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput';
}

interface VideoDevice {
  deviceId: string;
  label: string;
  kind: 'videoinput';
}

function useNoiseSuppression() {
  const [suppressNoise, setSuppressNoise] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('suppress-noise').then((value) => {
      if (value !== null) {
        setSuppressNoise(JSON.parse(value));
      }
    });
  }, []);

  const updateSuppressNoise = useCallback((value: boolean) => {
    setSuppressNoise(value);
    AsyncStorage.setItem('suppress-noise', JSON.stringify(value));
  }, []);

  return [suppressNoise, updateSuppressNoise] as const;
}

function useBlurVideo() {
  const [blurVideo, setBlurVideo] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('blur-video').then((value) => {
      if (value !== null) {
        setBlurVideo(JSON.parse(value));
      }
    });
  }, []);

  const updateBlurVideo = useCallback((value: boolean) => {
    setBlurVideo(value);
    AsyncStorage.setItem('blur-video', JSON.stringify(value));
  }, []);

  return [blurVideo, updateBlurVideo] as const;
}

export default function useUserMedia() {
  const [suppressNoise, setSuppressNoise] = useNoiseSuppression();
  const [blurVideo, setBlurVideo] = useBlurVideo();

  // Camera permissions hook
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Audio states
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioUnavailableReason, setAudioUnavailableReason] = useState<UserMediaError>();
  const [audioRecording, setAudioRecording] = useState<Audio.Recording>();
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>();

  // Video states
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoUnavailableReason, setVideoUnavailableReason] = useState<UserMediaError>();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [videoDevices, setVideoDevices] = useState<VideoDevice[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>();
  const [cameraType, setCameraType] = useState<CameraType>('front');

  // Screen share states (limited in React Native)
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);

  // Audio permissions and setup
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          setAudioUnavailableReason('NotAllowedError');
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // Mock audio devices for React Native
        setAudioDevices([
          { deviceId: 'default', label: 'Default Microphone', kind: 'audioinput' },
          { deviceId: 'builtin', label: 'Built-in Microphone', kind: 'audioinput' },
        ]);
        setSelectedAudioDevice('default');
      } catch (error) {
        console.error('Audio setup error:', error);
        setAudioUnavailableReason('UnknownError');
      }
    })();
  }, []);

  // Video permissions and setup
  useEffect(() => {
    (async () => {
      try {
        if (!cameraPermission) {
          return; // Still loading
        }

        if (!cameraPermission.granted) {
          setVideoUnavailableReason('NotAllowedError');
          return;
        }

        // Mock video devices for React Native
        setVideoDevices([
          { deviceId: 'front', label: 'Front Camera', kind: 'videoinput' },
          { deviceId: 'back', label: 'Back Camera', kind: 'videoinput' },
        ]);
        setSelectedVideoDevice('front');
      } catch (error) {
        console.error('Camera setup error:', error);
        setVideoUnavailableReason('UnknownError');
      }
    })();
  }, [cameraPermission]);

  // Audio controls
  const turnMicOn = useCallback(async () => {
    try {
      if (audioRecording) {
        await audioRecording.stopAndUnloadAsync();
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        android: {
          extension: '.m4a',
          outputFormat: AndroidOutputFormat.MPEG_4,
          audioEncoder: AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          outputFormat: IOSOutputFormat.MPEG4AAC,
          audioQuality: IOSAudioQuality.HIGH,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/mp4',
          bitsPerSecond: 128000,
        },
      });

      await recording.startAsync();
      setAudioRecording(recording);
      setAudioEnabled(true);
      setAudioUnavailableReason(undefined);
    } catch (error) {
      console.error('Failed to start audio recording:', error);
      setAudioUnavailableReason('UnknownError');
    }
  }, [audioRecording]);

  const turnMicOff = useCallback(async () => {
    try {
      if (audioRecording) {
        await audioRecording.stopAndUnloadAsync();
        setAudioRecording(undefined);
      }
      setAudioEnabled(false);
    } catch (error) {
      console.error('Failed to stop audio recording:', error);
    }
  }, [audioRecording]);

  // Video controls
  const turnCameraOn = useCallback(() => {
    setVideoEnabled(true);
    setVideoUnavailableReason(undefined);
  }, []);

  const turnCameraOff = useCallback(() => {
    setVideoEnabled(false);
  }, []);

  // Device selection
  const setAudioDeviceId = useCallback((deviceId: string) => {
    setSelectedAudioDevice(deviceId);
    // In React Native, device switching is more limited
    // This would typically require restarting the audio recording
  }, []);

  const setVideoDeviceId = useCallback((deviceId: string) => {
    setSelectedVideoDevice(deviceId);
    setCameraType(deviceId === 'front' ? 'front' : 'back');
  }, []);

  // Screen share (limited functionality in React Native)
  const startScreenShare = useCallback(() => {
    // Screen sharing is very limited in React Native
    // This would require platform-specific native modules
    console.warn('Screen sharing is not fully supported in React Native');
    setScreenShareEnabled(true);
  }, []);

  const endScreenShare = useCallback(() => {
    setScreenShareEnabled(false);
  }, []);

  return {
    // Audio
    turnMicOn,
    turnMicOff,
    audioEnabled,
    audioUnavailableReason,
    audioDeviceId: selectedAudioDevice,
    setAudioDeviceId,
    audioRecording,

    // Video
    turnCameraOn,
    turnCameraOff,
    videoEnabled,
    videoUnavailableReason,
    videoDeviceId: selectedVideoDevice,
    setVideoDeviceId,
    cameraRef,
    setCameraRef,
    cameraType,

    // Camera permissions
    cameraPermission,
    requestCameraPermission,

    // Settings
    blurVideo,
    setBlurVideo,
    suppressNoise,
    setSuppressNoise,

    // Screen share (limited)
    startScreenShare,
    endScreenShare,
    screenShareEnabled,

    // Device lists
    audioDevices,
    videoDevices,
  };
}

export type UserMedia = ReturnType<typeof useUserMedia>;