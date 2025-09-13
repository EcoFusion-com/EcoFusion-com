import { useState, useCallback, useRef, useEffect } from 'react';
import { logError, logWarn, logInfo } from '@/services/logger';

// Types
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatbotState {
  messages: ChatMessage[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  sessionId: string;
}

export interface UseChatbotReturn extends ChatbotState {
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  testConnection: () => Promise<void>;
  addMessage: (message: ChatMessage) => void;
}

import { config } from '@/config/environment';

// Configuration
const RASA_CONFIG = config.rasa;

// Storage keys
const STORAGE_KEYS = config.storage;

// Utility functions
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    logWarn(`Failed to load ${key} from storage`, { error: error instanceof Error ? error.message : String(error) });
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logWarn(`Failed to save ${key} to storage`, { error: error instanceof Error ? error.message : String(error) });
  }
};

/**
 * Custom hook for managing chatbot functionality
 * Handles message sending, state management, and Rasa API integration
 */
export const useChatbot = (): UseChatbotReturn => {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>(() => 
    loadFromStorage(STORAGE_KEYS.messages, [])
  );
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const sessionIdRef = useRef<string>(loadFromStorage(STORAGE_KEYS.sessionId, generateSessionId()));

  // Persist messages to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.messages, messages);
  }, [messages]);

  // Persist session ID to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.sessionId, sessionIdRef.current);
  }, []);

  /**
   * Test connection to Rasa server
   */
  const testConnection = useCallback(async () => {
    try {
      const response = await fetch(RASA_CONFIG.statusUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setIsConnected(true);
        setError(null);
        logInfo('Chatbot connection established');
      } else {
        setIsConnected(false);
        setError('Unable to connect to chat server');
        logWarn('Chatbot connection failed', { status: response.status });
      }
    } catch (err) {
      setIsConnected(false);
      setError('Chat server is currently unavailable');
      logError('Chatbot connection error', err instanceof Error ? err : new Error(String(err)));
    }
  }, []);

  /**
   * Send message to Rasa server
   */
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessage = {
      id: `loading_${Date.now()}`,
      text: '',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(RASA_CONFIG.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          sender: sessionIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => !msg.isLoading));

      // Add bot responses
      if (data && Array.isArray(data)) {
        data.forEach((item: any, index: number) => {
          if (item.text) {
            const botMessage: ChatMessage = {
              id: `bot_${Date.now()}_${index}`,
              text: item.text,
              sender: 'bot',
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
          }
        });
      }

      // If no response from Rasa, add fallback message
      if (!data || data.length === 0) {
        const fallbackMessage: ChatMessage = {
          id: `bot_${Date.now()}_fallback`,
          text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact our team directly for immediate assistance.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }

    } catch (err) {
      logError('Error sending message to Rasa', err instanceof Error ? err : new Error(String(err)), {
        message: text,
        sessionId: sessionIdRef.current
      });
      setError('Failed to send message. Please try again.');
      
      // Remove loading message and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        const errorMessage: ChatMessage = {
          id: `error_${Date.now()}`,
          text: "I'm experiencing technical difficulties. Please try again in a moment or contact us directly for immediate assistance.",
          sender: 'bot',
          timestamp: new Date(),
        };
        return [...filtered, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  /**
   * Clear chat history and generate new session
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    sessionIdRef.current = generateSessionId();
    saveToStorage(STORAGE_KEYS.sessionId, sessionIdRef.current);
  }, []);

  /**
   * Add a message to the chat (useful for welcome messages)
   */
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  // Test connection on mount
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    messages,
    isConnected,
    isLoading,
    error,
    sessionId: sessionIdRef.current,
    sendMessage,
    clearChat,
    testConnection,
    addMessage,
  };
};
