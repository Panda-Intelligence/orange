import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react-native';
import colors from '@/constants/colors';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost?: boolean;
}

interface ParticipantsPanelProps {
  participants: Participant[];
  onClose: () => void;
}

export default function ParticipantsPanel({ participants, onClose }: ParticipantsPanelProps) {
  const PanelContainer = Platform.OS === 'web' ? View : BlurView;
  const containerProps = Platform.OS === 'web'
    ? { style: [styles.container, styles.webContainer] }
    : { intensity: 80, tint: colors.blurTint, style: styles.container };

  return (
    // @ts-ignore - BlurView props are different from View props
    <PanelContainer {...containerProps}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Participants ({participants.length})</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.participantRow}>
            <View style={styles.participantInfo}>
              <Text style={styles.participantName}>{item.name}</Text>
              {item.isHost && (
                <View style={styles.hostBadge}>
                  <Text style={styles.hostText}>Host</Text>
                </View>
              )}
            </View>

            <View style={styles.participantControls}>
              {item.isMuted ? (
                <MicOff size={18} color={colors.danger} style={styles.icon} />
              ) : (
                <Mic size={18} color={colors.success} style={styles.icon} />
              )}

              {item.isVideoOn ? (
                <Video size={18} color={colors.success} />
              ) : (
                <VideoOff size={18} color={colors.danger} />
              )}
            </View>
          </View>
        )}
      />
    </PanelContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '30%',
    maxWidth: 350,
    minWidth: 280,
    borderLeftWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  webContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
  },
  hostBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  hostText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  participantControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
});