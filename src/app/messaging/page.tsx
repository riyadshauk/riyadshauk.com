import { AuthProvider } from '@/components/AuthContext';
import { MessagingProvider } from '@/components/MessagingContext';
import { MessagingApp } from '@/components/MessagingApp';

export default function MessagingPage() {
  return (
    <AuthProvider>
      <MessagingProvider>
        <MessagingApp />
      </MessagingProvider>
    </AuthProvider>
  );
} 