import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Send } from 'lucide-react-native';
import colors from '@/constants/colors';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
}

export default function ChatPanel({ messages, onSendMessage, onClose }: ChatPanelProps) {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const ChatContainer = Platform.OS === 'web' ? View : BlurView;
  const containerProps = Platform.OS === 'web'
    ? { style: [styles.container, styles.webContainer] }
    : { intensity: 80, tint: colors.blurTint, style: styles.container };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.keyboardAvoid}
    >
      {/* @ts-ignore - BlurView props are different from View props */}
      <ChatContainer {...containerProps}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageSender}>{item.sender}</Text>
                <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
              </View>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor={colors.lightText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() && styles.disabledSendButton
            ]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ChatContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '30%',
    maxWidth: 350,
    minWidth: 280,
  },
  container: {
    flex: 1,
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
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  messageSender: {
    fontWeight: '600',
    color: colors.text,
    fontSize: 14,
  },
  messageTime: {
    color: colors.lightText,
    fontSize: 12,
  },
  messageText: {
    color: colors.text,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 40,
    maxHeight: 100,
    color: colors.text,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    bottom: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: colors.lightText,
  },
});