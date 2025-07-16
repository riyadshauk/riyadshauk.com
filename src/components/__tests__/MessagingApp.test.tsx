import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessagingProvider } from '../MessagingContext';
import { MessagingApp } from '../MessagingApp';

// Mock the messaging context
jest.mock('../MessagingContext', () => ({
  useMessaging: () => ({
    state: {
      currentUser: null,
      conversations: [],
      currentConversation: null,
      messages: [],
      users: [],
      loading: false,
      error: null,
    },
    dispatch: jest.fn(),
    sendMessage: jest.fn(),
    createConversation: jest.fn(),
    fetchMessages: jest.fn(),
    fetchConversations: jest.fn(),
    fetchUsers: jest.fn(),
    loginUser: jest.fn(),
  }),
  MessagingProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('MessagingApp', () => {
  it('renders login form when no user is logged in', () => {
    render(
      <MessagingProvider>
        <MessagingApp />
      </MessagingProvider>
    );

    expect(screen.getByText('Welcome to Messaging')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders messaging interface when user is logged in', () => {
    // Mock with logged in user
    jest.doMock('../MessagingContext', () => ({
      useMessaging: () => ({
        state: {
          currentUser: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          conversations: [],
          currentConversation: null,
          messages: [],
          users: [],
          loading: false,
          error: null,
        },
        dispatch: jest.fn(),
        sendMessage: jest.fn(),
        createConversation: jest.fn(),
        fetchMessages: jest.fn(),
        fetchConversations: jest.fn(),
        fetchUsers: jest.fn(),
        loginUser: jest.fn(),
      }),
      MessagingProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    }));

    render(
      <MessagingProvider>
        <MessagingApp />
      </MessagingProvider>
    );

    expect(screen.getByText('Conversations')).toBeInTheDocument();
    expect(screen.getByText('Select a conversation')).toBeInTheDocument();
  });
}); 