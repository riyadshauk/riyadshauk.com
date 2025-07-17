import { AuthProvider } from '@/components/AuthContext';
import { MessagingProvider } from '@/components/MessagingContext';
import { MessagingApp } from '@/components/MessagingApp';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function MessagingPage() {
  return (
    <AuthProvider>
      <MessagingProvider>
        <NavBar />
        <MessagingApp />
        <Footer />
      </MessagingProvider>
    </AuthProvider>
  );
} 