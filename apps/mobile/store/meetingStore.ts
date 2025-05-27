import { create } from 'zustand';
import { mockParticipants, mockMessages, mockVideoUrls } from '@/mocks/participants';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost?: boolean;
}

interface MeetingState {
  // Meeting info
  meetingId: string | null;
  meetingTitle: string | null;
  isHost: boolean;

  // User state
  userName: string;
  isMuted: boolean;
  isVideoOn: boolean;

  // UI state
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
  activeParticipantId: string | null;

  // Data
  participants: Participant[];
  messages: Message[];
  videoUrls: Record<string, string>;

  // Actions
  setMeetingInfo: (meetingId: string, title: string, isHost: boolean) => void;
  setUserName: (name: string) => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  toggleChat: () => void;
  toggleParticipants: () => void;
  setActiveParticipant: (id: string | null) => void;
  sendMessage: (text: string) => void;
  leaveMeeting: () => void;
}

export const useMeetingStore = create<MeetingState>((set) => ({
  // Meeting info
  meetingId: null,
  meetingTitle: null,
  isHost: false,

  // User state
  userName: 'You',
  isMuted: false,
  isVideoOn: true,

  // UI state
  isChatOpen: false,
  isParticipantsOpen: false,
  activeParticipantId: '1', // Default to self

  // Data - using mock data for demo
  participants: mockParticipants,
  messages: mockMessages,
  videoUrls: mockVideoUrls,

  // Actions
  setMeetingInfo: (meetingId, title, isHost) => set({
    meetingId,
    meetingTitle: title,
    isHost
  }),

  setUserName: (userName) => set({ userName }),

  toggleMute: () => set((state) => {
    // Update local state
    const isMuted = !state.isMuted;

    // Update in participants list
    const participants = state.participants.map(p =>
      p.id === '1' ? { ...p, isMuted } : p
    );

    return { isMuted, participants };
  }),

  toggleVideo: () => set((state) => {
    // Update local state
    const isVideoOn = !state.isVideoOn;

    // Update in participants list
    const participants = state.participants.map(p =>
      p.id === '1' ? { ...p, isVideoOn } : p
    );

    return { isVideoOn, participants };
  }),

  toggleChat: () => set((state) => ({
    isChatOpen: !state.isChatOpen,
    isParticipantsOpen: false // Close participants panel if open
  })),

  toggleParticipants: () => set((state) => ({
    isParticipantsOpen: !state.isParticipantsOpen,
    isChatOpen: false // Close chat panel if open
  })),

  setActiveParticipant: (activeParticipantId) => set({ activeParticipantId }),

  sendMessage: (text) => set((state) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: state.userName,
      text,
      timestamp: new Date(),
    };

    return {
      messages: [...state.messages, newMessage]
    };
  }),

  leaveMeeting: () => set({
    meetingId: null,
    meetingTitle: null,
    isChatOpen: false,
    isParticipantsOpen: false,
  }),
}));