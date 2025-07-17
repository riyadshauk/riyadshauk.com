"use client";

import React, { useState } from 'react';
import { Conversation, useMessaging } from './MessagingContext';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Users, User, LogOut } from 'lucide-react';

export function ConversationList() {
  const { state, dispatch, fetchConversations } = useMessaging();
  const { state: authState, logout } = useAuth();
  const [isStartingConversation, setIsStartingConversation] = useState(false);

  const handleConversationClick = (conversation: Conversation) => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation as Conversation });
  };

  const startConversationWithAdmin = async () => {
    if (!authState.user || isStartingConversation) return;
    
    setIsStartingConversation(true);
    try {
      const response = await fetch('/api/start-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to start conversation');
      }

      const conversation = await response.json();
      dispatch({ type: 'ADD_CONVERSATION', payload: conversation });
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    } catch (error) {
      console.error('Error starting conversation:', error);
    } finally {
      setIsStartingConversation(false);
    }
  };

  const getConversationName = (conversation: unknown) => {
    const conv = conversation as { name?: string; type: string; participants: { user: { id: string; name: string } }[] };
    if (conv.name) return conv.name;
    
    if (conv.type === 'private') {
      const otherParticipant = conv.participants.find(
        (p: { user: { id: string } }) => p.user.id !== authState.user?.id
      );
      return otherParticipant?.user.name || 'Unknown User';
    }
    
    return 'Group Chat';
  };

  const getConversationPreview = (conversation: unknown) => {
    const conv = conversation as { type: string };
    // This would typically show the last message
    // For now, just show the conversation type
    return conv.type === 'private' ? 'Private conversation' : 'Group conversation';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (!authState.user) return null;

  return (
    <div className="w-80 border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {authState.user?.role === 'admin' ? 'Student Conversations' : 'Conversations'}
          </h2>
          <div className="flex space-x-2">
            {authState.user?.role === 'client' && (
              <Button
                variant="outline"
                size="sm"
                onClick={startConversationWithAdmin}
                disabled={isStartingConversation}
              >
                {isStartingConversation ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            )}
            {authState.user?.role === 'admin' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchConversations()}
                disabled={state.loading}
              >
                <Users className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{authState.user.name}</span>
            <Badge variant="outline" className="text-xs">
              {authState.user.role}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-500 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {state.conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {authState.user?.role === 'client' ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p>Setting up your tutoring session...</p>
                <p className="text-sm">Creating your conversation with the tutor</p>
              </>
            ) : (
              <>
                <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No conversations yet</p>
                <p className="text-sm">Student conversations will appear here when they start messaging</p>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {state.conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  state.currentConversation?.id === conversation.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {getConversationName(conversation)}
                      </h3>
                      {conversation.type === 'group' && (
                        <Badge variant="secondary" className="text-xs">
                          Group
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {getConversationPreview(conversation)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">
                        {conversation.participants.length} participant{conversation.participants.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDate(conversation.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 