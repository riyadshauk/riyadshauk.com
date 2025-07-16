"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useMessaging } from './MessagingContext';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Send, ArrowLeft, Users } from 'lucide-react';

export function Chat() {
  const { state, sendMessage, dispatch } = useMessaging();
  const { state: authState } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !state.currentConversation) return;

    setIsLoading(true);
    try {
      await sendMessage(newMessage.trim(), state.currentConversation.id);
      setNewMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const getConversationName = () => {
    if (!state.currentConversation) return '';
    
    if (state.currentConversation.name) {
      return state.currentConversation.name;
    }
    
    if (state.currentConversation.type === 'private') {
      const otherParticipant = state.currentConversation.participants.find(
        (p) => p.user.id !== authState.user?.id
      );
      return otherParticipant?.user.name || 'Unknown User';
    }
    
    return 'Group Chat';
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isOwnMessage = (message: any) => {
    return message.senderId === authState.user?.id;
  };

  if (!state.currentConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: null })}
              className="md:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">{getConversationName()}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>
                  {state.currentConversation.participants.length} participant
                  {state.currentConversation.participants.length !== 1 ? 's' : ''}
                </span>
                {state.currentConversation.type === 'group' && (
                  <Badge variant="secondary" className="text-xs">
                    Group
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {state.messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation by sending a message</p>
          </div>
        ) : (
          state.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${isOwnMessage(message) ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwnMessage(message)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {!isOwnMessage(message) && (
                  <div className="text-xs font-medium mb-1 text-gray-600">
                    {message.sender.name}
                  </div>
                )}
                <div className="text-sm">{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    isOwnMessage(message) ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={isLoading || !newMessage.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
} 