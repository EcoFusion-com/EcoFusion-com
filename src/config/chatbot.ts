/**
 * Chatbot Configuration
 * Centralized configuration for the Eco Fusion chatbot
 */

export const CHATBOT_CONFIG = {
  // Rasa server configuration
  rasa: {
    serverUrl: import.meta.env.VITE_RASA_SERVER_URL || 'http://localhost:5005',
    webhookUrl: `${import.meta.env.VITE_RASA_SERVER_URL || 'http://localhost:5005'}/webhooks/rest/webhook`,
    statusUrl: `${import.meta.env.VITE_RASA_SERVER_URL || 'http://localhost:5005'}/status`,
  },
  
  // UI configuration
  ui: {
    autoOpen: import.meta.env.VITE_CHATBOT_AUTO_OPEN === 'true' || false,
    showWelcomeMessage: import.meta.env.VITE_CHATBOT_SHOW_WELCOME !== 'false',
    position: {
      bottom: '1rem',
      right: '1rem',
    },
    size: {
      width: '24rem', // 384px
      height: '31.25rem', // 500px
      minimizedHeight: '4rem', // 64px
    },
  },
  
  // Storage keys
  storage: {
    messages: 'ecofusion_chat_messages',
    sessionId: 'ecofusion_chat_session_id',
    isOpen: 'ecofusion_chat_is_open',
    isMinimized: 'ecofusion_chat_is_minimized',
  },
  
  // Welcome message
  welcomeMessage: {
    text: "Hi! I'm Eco Fusion's AI assistant. I can help you with:\n\n• AI & Automation solutions\n• IoT development\n• Full-stack development\n• Project consultation\n• Pricing information\n\nHow can I assist you today?",
  },
  
  // Error messages
  errors: {
    connectionFailed: 'Chat server is currently unavailable',
    sendFailed: 'Failed to send message. Please try again.',
    serverError: 'I\'m experiencing technical difficulties. Please try again in a moment or contact us directly for immediate assistance.',
    noResponse: 'I\'m sorry, I\'m having trouble processing your request right now. Please try again or contact our team directly for immediate assistance.',
  },
  
  // Connection settings
  connection: {
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
    retryDelay: 2000, // 2 seconds
  },
};

export default CHATBOT_CONFIG;
