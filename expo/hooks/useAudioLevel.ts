import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

interface UseAudioLevelProps {
  audioRecording?: Audio.Recording;
  enabled?: boolean;
}

export function useAudioLevel({ audioRecording, enabled = true }: UseAudioLevelProps) {
  const [audioLevel, setAudioLevel] = useState(0);
  const intervalRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !audioRecording) {
      setAudioLevel(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Simulate audio level monitoring
    // In a real implementation, you would need native modules to get actual audio levels
    intervalRef.current = setInterval(() => {
      // Mock audio level based on recording status
      const mockLevel = Math.random() * 0.5 + 0.1; // Random level between 0.1 and 0.6
      setAudioLevel(mockLevel);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audioRecording, enabled]);

  return audioLevel;
}