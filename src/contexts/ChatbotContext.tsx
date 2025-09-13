import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useChatbot, ChatMessage } from '@/hooks/useChatbot';
import { config } from '@/config/environment';

// Context interface
interface ChatbotContextType {
  // Chat state
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  toggleMinimize: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  testConnection: () => Promise<void>;
  addMessage: (message: ChatMessage) => void;
}

// Create context
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Storage keys for UI state
const UI_STORAGE_KEYS = {
  IS_OPEN: config.storage.isOpen,
  IS_MINIMIZED: config.storage.isMinimized,
  MESSAGES: config.storage.messages,
};

function rehydrateMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(UI_STORAGE_KEYS.MESSAGES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [];
  }
}

// Provider props
interface ChatbotProviderProps {
  children: ReactNode;
  autoOpen?: boolean; // Auto-open chat on first visit
  showWelcomeMessage?: boolean; // Show welcome message when chat opens
}

/**
 * Chatbot Context Provider
 * Manages global chatbot state and provides access to all chatbot functionality
 */
export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({
  children,
  autoOpen = false,
  showWelcomeMessage = true,
}) => {
  // UI state
  const [isOpen, setIsOpen] = useState(() => 
    JSON.parse(localStorage.getItem(UI_STORAGE_KEYS.IS_OPEN) || JSON.stringify(autoOpen))
  );
  const [isMinimized, setIsMinimized] = useState(() => 
    JSON.parse(localStorage.getItem(UI_STORAGE_KEYS.IS_MINIMIZED) || 'false')
  );

  // Chat functionality from custom hook
  const {
    messages,
    isConnected,
    isLoading,
    error,
    sendMessage,
    clearChat,
    testConnection,
    addMessage,
  } = useChatbot();

  // Persist UI state to localStorage
  React.useEffect(() => {
    localStorage.setItem(UI_STORAGE_KEYS.IS_OPEN, JSON.stringify(isOpen));
  }, [isOpen]);

  React.useEffect(() => {
    localStorage.setItem(UI_STORAGE_KEYS.IS_MINIMIZED, JSON.stringify(isMinimized));
  }, [isMinimized]);

  // Rehydrate messages once on mount if needed (defensive)
  React.useEffect(() => {
    if (!messages || messages.length === 0) {
      const rehydrated = rehydrateMessages();
      if (rehydrated.length > 0) {
        rehydrated.forEach(addMessage);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show welcome message when chat opens for the first time
  React.useEffect(() => {
    if (isOpen && showWelcomeMessage && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: "Hi! I'm Eco Fusion's AI assistant. I can help you with:\n\n• AI & Automation solutions\n• IoT development\n• Full-stack development\n• Project consultation\n• Pricing information\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
      };
      addMessage(welcomeMessage);
    }
  }, [isOpen, showWelcomeMessage, messages.length, addMessage]);

  // Chat actions - FIXED STATE MANAGEMENT
  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false); // Ensure it's not minimized when opening
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    // Don't reset isMinimized here to preserve user preference
  }, []);

  const toggleChat = useCallback(() => {
    if (isOpen) {
      // If currently open, close it
      setIsOpen(false);
    } else {
      // If currently closed, open it and ensure it's not minimized
      setIsOpen(true);
      setIsMinimized(false); // FIX: Always reset minimized state when opening
    }
  }, [isOpen]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(prev => !prev);
  }, []);

  // Context value
  const contextValue: ChatbotContextType = {
    // State
    isOpen,
    isMinimized,
    messages,
    isConnected,
    isLoading,
    error,
    
    // Actions
    openChat,
    closeChat,
    toggleChat,
    toggleMinimize,
    sendMessage,
    clearChat,
    testConnection,
    addMessage,
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

/**
 * Hook to use the chatbot context
 * @returns The chatbot context value
 * @throws Error if used outside of ChatbotProvider
 */
export const useChatbotContext = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
};