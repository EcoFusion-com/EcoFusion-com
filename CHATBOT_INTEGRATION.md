
# Eco Fusion Chatbot Integration

This document explains the chatbot integration that connects the Eco Fusion React frontend with the Rasa backend.

## Overview

The chatbot integration provides a floating chat widget that allows users to interact with the Eco Fusion AI assistant. The chatbot is accessible from all pages and provides real-time communication with the Rasa backend.

## Features

- ✅ **Floating Chat Widget**: Always accessible from any page
- ✅ **Real-time Communication**: Connects to Rasa backend via REST API
- ✅ **Session Persistence**: Maintains conversation state across page reloads
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Error Handling**: Graceful fallbacks when Rasa server is unavailable
- ✅ **Design System Integration**: Matches existing Eco Fusion design
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Performance Optimized**: Lazy loading and efficient state management

## Architecture

### Components

1. **ChatbotWidget** (`src/components/ChatbotWidget.tsx`)
   - Main UI component for the chat interface
   - Handles user input and message display
   - Manages chat window state (open/closed/minimized)

2. **ChatbotContext** (`src/contexts/ChatbotContext.tsx`)
   - React Context provider for global chatbot state
   - Manages chat state across the entire application
   - Provides actions for opening/closing chat

3. **useChatbot Hook** (`src/hooks/useChatbot.ts`)
   - Custom hook for chatbot functionality
   - Handles API calls to Rasa server
   - Manages message state and session persistence

4. **Configuration** (`src/config/chatbot.ts`)
   - Centralized configuration for all chatbot settings
   - Environment variable management
   - Error messages and UI settings

### State Management

The chatbot uses a combination of:
- **React Context**: For global state management
- **localStorage**: For session persistence
- **React Query**: For API state management (if needed)

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the Eco Fusion project root:

```env
# Rasa Server Configuration
VITE_RASA_SERVER_URL=http://localhost:5005

# Optional: Chatbot UI Settings
VITE_CHATBOT_AUTO_OPEN=false
VITE_CHATBOT_SHOW_WELCOME=true
```

### 2. Rasa Server Setup

Ensure your Rasa server is running with the following endpoints:

```bash
# Start Rasa server with API enabled
rasa run --enable-api --cors "*"

# Start Rasa actions server (in separate terminal)
rasa run actions
```

Required Rasa endpoints:
- `GET /status` - Server health check
- `POST /webhooks/rest/webhook` - Message processing

### 3. CORS Configuration

Update your Rasa `credentials.yml` to allow CORS:

```yaml
rest:
  cors_origins:
    - "http://localhost:5173"  # Vite dev server
    - "http://localhost:3000"  # Alternative dev port
    - "https://yourdomain.com" # Production domain
```

### 4. Integration Points

The chatbot is integrated into the main application:

```tsx
// App.tsx - Wraps the entire app with ChatbotProvider
<ChatbotProvider autoOpen={false} showWelcomeMessage={true}>
  {/* Your app components */}
</ChatbotProvider>

// Index.tsx - Includes the ChatbotWidget
<ChatbotWidget />
```

## Usage

### Basic Usage

The chatbot widget automatically appears as a floating button in the bottom-right corner. Users can:

1. **Open Chat**: Click the floating message icon
2. **Send Messages**: Type and press Enter or click Send
3. **Minimize**: Click the minimize button to collapse the chat
4. **Close**: Click the X button to close the chat

### Programmatic Control

Components can interact with the chatbot using the context:

```tsx
import { useChatbotContext } from '@/contexts/ChatbotContext';

const MyComponent = () => {
  const { openChat, sendMessage } = useChatbotContext();

  const handleButtonClick = () => {
    openChat(); // Opens the chat widget
  };

  const handleDirectMessage = () => {
    openChat();
    // Send a message programmatically
    setTimeout(() => sendMessage("Hello, I need help with AI automation"), 100);
  };

  return (
    <button onClick={handleButtonClick}>
      Get Help
    </button>
  );
};
```

### Button Integration

The following buttons now integrate with the chatbot:

1. **Hero Section**: "Start Your Project" button opens the chat
2. **Footer**: Newsletter subscription opens chat for confirmation
3. **Services Section**: "Get Free Consultation" button (to be implemented)
4. **Contact Section**: Form submission can trigger chat follow-up

## Configuration Options

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_RASA_SERVER_URL` | `http://localhost:5005` | Rasa server URL |
| `VITE_CHATBOT_AUTO_OPEN` | `false` | Auto-open chat on page load |
| `VITE_CHATBOT_SHOW_WELCOME` | `true` | Show welcome message |

### ChatbotProvider Props

```tsx
<ChatbotProvider
  autoOpen={false}        // Auto-open chat on first visit
  showWelcomeMessage={true} // Show welcome message when chat opens
>
  {/* Your app */}
</ChatbotProvider>
```

## Error Handling

The chatbot handles various error scenarios:

1. **Server Unavailable**: Shows offline status and retry button
2. **Network Errors**: Displays friendly error messages
3. **Invalid Responses**: Falls back to generic response
4. **Connection Timeout**: Automatic retry with exponential backoff

## Performance Considerations

- **Lazy Loading**: Chatbot components are loaded only when needed
- **Message Persistence**: Uses localStorage for efficient state management
- **Connection Pooling**: Reuses HTTP connections when possible
- **Debounced Input**: Prevents excessive API calls during typing

## Security

- **CORS Protection**: Configured to only allow specific origins
- **Input Sanitization**: Messages are sanitized before sending
- **Session Isolation**: Each user gets a unique session ID
- **No Sensitive Data**: Chat messages are not stored permanently

## Troubleshooting

### Common Issues

1. **Chatbot not appearing**
   - Check if ChatbotProvider is wrapping your app
   - Verify ChatbotWidget is included in Index.tsx

2. **Cannot connect to Rasa**
   - Ensure Rasa server is running on correct port
   - Check CORS configuration in credentials.yml
   - Verify VITE_RASA_SERVER_URL environment variable

3. **Messages not sending**
   - Check browser console for errors
   - Verify Rasa webhook endpoint is accessible
   - Check network tab for failed requests

4. **State not persisting**
   - Check localStorage permissions
   - Verify storage keys are not conflicting

### Debug Mode

Enable debug logging by adding to your `.env`:

```env
VITE_DEBUG_CHATBOT=true
```

This will log all chatbot interactions to the console.

## Future Enhancements

Potential improvements for the chatbot:

1. **WebSocket Support**: Real-time bidirectional communication
2. **File Upload**: Support for image/document sharing
3. **Voice Input**: Speech-to-text integration
4. **Analytics**: Track conversation metrics
5. **Multi-language**: Internationalization support
6. **Custom Themes**: User-configurable appearance
7. **Integration APIs**: Connect with CRM/email systems

## API Reference

### ChatbotContext Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `openChat()` | None | Opens the chat widget |
| `closeChat()` | None | Closes the chat widget |
| `toggleChat()` | None | Toggles chat open/closed |
| `sendMessage(text)` | `string` | Sends a message to Rasa |
| `clearChat()` | None | Clears chat history |
| `testConnection()` | None | Tests Rasa server connection |

### ChatbotWidget Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |

## Contributing

When modifying the chatbot:

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Update this documentation for any changes
4. Test with both connected and disconnected Rasa server
5. Ensure accessibility standards are maintained

## Support

For issues with the chatbot integration:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Verify Rasa server configuration
4. Test with a simple message to isolate issues

The chatbot integration is designed to be robust and user-friendly, providing a seamless experience for Eco Fusion customers while maintaining high performance and reliability.
