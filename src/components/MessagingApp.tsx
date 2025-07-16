"use client";

import React from 'react';
import { useAuth } from './AuthContext';
import { AuthForm } from './AuthForm';
import { ConversationList } from './ConversationList';
import { Chat } from './Chat';

export function MessagingApp() {
  const { state } = useAuth();

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!state.user) {
    return <AuthForm />;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <ConversationList />
      <Chat />
    </div>
  );
} 