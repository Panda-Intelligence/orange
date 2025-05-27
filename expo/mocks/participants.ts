export const mockParticipants = [
  {
    id: '1',
    name: 'You',
    isMuted: false,
    isVideoOn: true,
    isHost: true,
  },
  {
    id: '2',
    name: 'Alex Johnson',
    isMuted: true,
    isVideoOn: true,
  },
  {
    id: '3',
    name: 'Sarah Williams',
    isMuted: false,
    isVideoOn: false,
  },
  {
    id: '4',
    name: 'Michael Chen',
    isMuted: false,
    isVideoOn: true,
  },
  {
    id: '5',
    name: 'Emma Davis',
    isMuted: true,
    isVideoOn: true,
  },
  {
    id: '6',
    name: 'James Wilson',
    isMuted: false,
    isVideoOn: true,
  },
];

export const mockMessages = [
  {
    id: '1',
    sender: 'Alex Johnson',
    text: 'Hi everyone! Can you hear me?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: '2',
    sender: 'Sarah Williams',
    text: 'Yes, we can hear you clearly.',
    timestamp: new Date(Date.now() - 1000 * 60 * 14), // 14 minutes ago
  },
  {
    id: '3',
    sender: 'Michael Chen',
    text: 'I have a question about the project timeline. Can we discuss that today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
  },
  {
    id: '4',
    sender: 'You',
    text: 'Sure, Michael. Let\'s cover that after the main presentation.',
    timestamp: new Date(Date.now() - 1000 * 60 * 9), // 9 minutes ago
  },
  {
    id: '5',
    sender: 'Emma Davis',
    text: 'I shared some documents in the team chat earlier. Please take a look when you have time.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: '6',
    sender: 'James Wilson',
    text: 'Thanks Emma, I\'ll review them after the meeting.',
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 minutes ago
  },
];

// Mock video URLs (using Unsplash for placeholder images of people)
export const mockVideoUrls = {
  '1': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
  '2': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
  '3': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop',
  '4': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
  '5': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
  '6': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
};