/**
 * Environment Configuration Service
 * Centralized configuration management for the Eco Fusion application
 */

interface EnvironmentConfig {
  // Rasa Chatbot Configuration
  rasa: {
    serverUrl: string;
    webhookUrl: string;
    statusUrl: string;
  };
  
  // API Configuration
  api: {
    baseUrl: string;
    timeout: number;
  };
  
  // Chatbot UI Configuration
  chatbot: {
    autoOpen: boolean;
    showWelcomeMessage: boolean;
    debugMode: boolean;
    position: {
      bottom: string;
      right: string;
    };
    size: {
      width: string;
      height: string;
      minimizedHeight: string;
    };
  };
  
  // Storage Configuration
  storage: {
    messages: string;
    sessionId: string;
    isOpen: string;
    isMinimized: string;
  };
  
  // Connection Configuration
  connection: {
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };
  
  // Environment
  environment: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Validates that required environment variables are set
 */
function validateEnvironment(): void {
  const requiredVars = [
    'VITE_RASA_SERVER_URL',
  ];
  
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
}

/**
 * Gets environment configuration with validation
 */
function getEnvironmentConfig(): EnvironmentConfig {
  // Validate required environment variables
  validateEnvironment();
  
  const rasaServerUrl = import.meta.env.VITE_RASA_SERVER_URL || 'http://localhost:5005';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';
  const environment = import.meta.env.NODE_ENV || 'development';
  
  return {
    rasa: {
      serverUrl: rasaServerUrl,
      webhookUrl: `${rasaServerUrl}/webhooks/rest/webhook`,
      statusUrl: `${rasaServerUrl}/status`,
    },
    
    api: {
      baseUrl: apiBaseUrl,
      timeout: 10000, // 10 seconds
    },
    
    chatbot: {
      autoOpen: import.meta.env.VITE_CHATBOT_AUTO_OPEN === 'true',
      showWelcomeMessage: import.meta.env.VITE_CHATBOT_SHOW_WELCOME !== 'false',
      debugMode: import.meta.env.VITE_DEBUG_CHATBOT === 'true',
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
    
    storage: {
      messages: 'ecofusion_chat_messages',
      sessionId: 'ecofusion_chat_session_id',
      isOpen: 'ecofusion_chat_is_open',
      isMinimized: 'ecofusion_chat_is_minimized',
    },
    
    connection: {
      timeout: 10000, // 10 seconds
      retryAttempts: 3,
      retryDelay: 2000, // 2 seconds
    },
    
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
  };
}

// Export the configuration
export const config = getEnvironmentConfig();

// Export individual config sections for convenience
export const rasaConfig = config.rasa;
export const apiConfig = config.api;
export const chatbotConfig = config.chatbot;
export const storageConfig = config.storage;
export const connectionConfig = config.connection;

export default config;
