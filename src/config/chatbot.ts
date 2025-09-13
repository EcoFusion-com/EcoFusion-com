/**
 * Chatbot Configuration
 * Centralized configuration for the Eco Fusion chatbot
 * @deprecated Use environment.ts config instead
 */

import { config } from './environment';

export const CHATBOT_CONFIG = {
  // Rasa server configuration
  rasa: config.rasa,
  
  // UI configuration
  ui: config.chatbot,
  
  // Storage keys
  storage: config.storage,
  
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
  connection: config.connection,
};

export default CHATBOT_CONFIG;
