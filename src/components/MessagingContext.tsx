"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth, User } from './AuthContext';

// Types - using User from AuthContext
export interface Conversation {
  id: string;
  name?: string;
  type: 'private' | 'group';
  createdAt: string;
  updatedAt: string;
  participants: Array<{
    conversationId: string;
    userId: string;
    joinedAt: string;
    user: User;
  }>;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'image' | 'file';
  metadata?: string;
  createdAt: string;
  updatedAt: string;
  sender: User;
  reads: Array<{
    messageId: string;
    userId: string;
    readAt: string;
    user: User;
  }>;
}

interface MessagingState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  users: User[];
  loading: boolean;
  error: string | null;
}

type MessagingAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

const initialState: MessagingState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  users: [],
  loading: false,
  error: null,
};

function messagingReducer(state: MessagingState, action: MessagingAction): MessagingState {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'ADD_CONVERSATION':
      return { 
        ...state, 
        conversations: [action.payload, ...state.conversations.filter(c => c.id !== action.payload.id)]
      };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { 
        ...state, 
        messages: [...state.messages, action.payload],
        conversations: state.conversations.map(conv => 
          conv.id === action.payload.conversationId 
            ? { ...conv, updatedAt: action.payload.createdAt }
            : conv
        )
      };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface MessagingContextType {
  state: MessagingState;
  dispatch: React.Dispatch<MessagingAction>;
  sendMessage: (content: string, conversationId: string) => Promise<void>;
  createConversation: (participantIds: string[], name?: string, type?: 'private' | 'group') => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  fetchConversations: () => Promise<void>;
  fetchUsers: () => Promise<void>;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export function MessagingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(messagingReducer, initialState);
  const { state: authState } = useAuth();

  const sendMessage = async (content: string, conversationId: string) => {
    if (!authState.user) {
      dispatch({ type: 'SET_ERROR', payload: 'You must be logged in to send messages' });
      return;
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          senderId: authState.user.id,
          content,
          messageType: 'text',
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send message');
      }

      const message = await response.json();
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to send message' 
      });
    }
  };

  const createConversation = async (participantIds: string[], name?: string, type: 'private' | 'group' = 'private') => {
    if (!authState.user) {
      dispatch({ type: 'SET_ERROR', payload: 'You must be logged in to create conversations' });
      return;
    }

    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantIds,
          name,
          type,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create conversation');
      }

      const conversation = await response.json();
      dispatch({ type: 'ADD_CONVERSATION', payload: conversation });
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to create conversation' 
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    if (!authState.user) return;

    try {
      const response = await fetch(`/api/messages?conversationId=${conversationId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch messages');
      }

      const messages = await response.json();
      dispatch({ type: 'SET_MESSAGES', payload: messages });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch messages' 
      });
    }
  };

  const fetchConversations = async () => {
    if (!authState.user) return;

    try {
      const response = await fetch('/api/conversations', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch conversations');
      }

      const conversations = await response.json();
      dispatch({ type: 'SET_CONVERSATIONS', payload: conversations });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch conversations' 
      });
    }
  };

  const fetchUsers = async () => {
    // Only admins can fetch all users
    if (!authState.user || authState.user.role !== 'admin') return;

    try {
      const response = await fetch('/api/users', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch users');
      }

      const users = await response.json();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch users' 
      });
    }
  };

  // Auto-fetch conversations when user changes
  useEffect(() => {
    console.log('Auth state changed:', authState.user);
    if (authState.user) {
      console.log('User role:', authState.user.role);
      fetchConversations();
      fetchUsers();
      
      // For client users, automatically create a conversation with admin if none exists
      if (authState.user.role === 'client') {
        console.log('Client user detected, will auto-create conversation in 1.5s');
        setTimeout(async () => {
          try {
            console.log('Starting auto-conversation creation for:', authState.user?.email);
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await fetch('/api/start-consultation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
            });

            console.log('Response status:', response.status);
            if (response.ok) {
              const conversation = await response.json();
              console.log('Conversation created:', conversation);
              dispatch({ type: 'ADD_CONVERSATION', payload: conversation });
              dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
            } else {
              const errorData = await response.json().catch(() => ({}));
              console.error('Failed to create conversation:', errorData);
            }
          } catch (error) {
            console.error('Error auto-creating conversation:', error);
          } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        }, 1500); // Delay to ensure conversations are fetched first
      }
    } else {
      // Clear state when user logs out
      dispatch({ type: 'SET_CONVERSATIONS', payload: [] });
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: null });
      dispatch({ type: 'SET_MESSAGES', payload: [] });
      dispatch({ type: 'SET_USERS', payload: [] });
    }
  }, [authState.user]);

  // Auto-fetch messages when conversation changes
  useEffect(() => {
    if (state.currentConversation && authState.user) {
      fetchMessages(state.currentConversation.id);
    }
  }, [state.currentConversation, authState.user]);

  const value: MessagingContextType = {
    state,
    dispatch,
    sendMessage,
    createConversation,
    fetchMessages,
    fetchConversations,
    fetchUsers,
  };

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

export function useMessaging() {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
} 