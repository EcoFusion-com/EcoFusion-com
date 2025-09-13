import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  AlertCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatbotContext } from '@/contexts/ChatbotContext';
import { parseMessageText } from '@/utils/sanitize';

interface ChatbotWidgetProps {
  className?: string;
}

export const ChatbotWidget = ({ className }: ChatbotWidgetProps) => {
  // Get chatbot state and actions from context
  const {
    isOpen,
    isMinimized,
    messages,
    isConnected,
    isLoading,
    error,
    toggleChat,
    toggleMinimize,
    sendMessage,
    testConnection,
  } = useChatbotContext();

  // Local state for input
  const [inputValue, setInputValue] = useState('');
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputValue.trim() && !isLoading) {
        sendMessage(inputValue);
        setInputValue('');
      }
    }
  };

  // Format timestamp
  const formatTime = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render message component - REFACTORED for better overflow handling
  const renderMessage = (message: any) => (
    <div
      key={message.id}
      className={cn(
        'flex gap-2 mb-4 items-end', // Reduced gap and added items-end for avatar alignment
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {/* Bot Avatar - Left side */}
      {message.sender === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
      {/* Message Bubble */}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-3 break-words overflow-hidden', // Reduced max-width to 70%
          message.sender === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border border-border'
        )}
      >
        {message.isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Typing...</span>
          </div>
        ) : (
          <>
            <div 
              className="text-sm leading-relaxed chatbot-message break-words"
              dangerouslySetInnerHTML={{ __html: parseMessageText(message.text) }}
            />
            <div className={cn(
              'text-xs mt-1 opacity-70', // Reduced margin and improved styling
              message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
            )}>
              {formatTime(message.timestamp)}
            </div>
          </>
        )}
      </div>
      
      {/* User Avatar - Right side */}
      {message.sender === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );

  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 chatbot-widget", // Added class name for debugging
      className
    )}>
      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          'shadow-glow border border-border/50 transition-all duration-300 chat-card',
          // Step 3: Fixed width and height constraints
          'w-[350px] sm:w-96 max-w-[calc(100vw-2rem)]',
          'h-[500px] max-h-[calc(100vh-2rem)]',
          // Step 5: Minimize/Maximize functionality with smooth transitions
          isMinimized ? 'h-16' : 'h-[500px]',
          // Step 7: Mobile responsiveness
          'sm:max-w-[calc(100vw-2rem)] max-w-[calc(100vw-1rem)]',
          'sm:max-h-[calc(100vh-2rem)] max-h-[calc(100vh-1rem)]',
          // FIX: Ensure proper positioning and prevent overlap
          'transform-gpu', // Use GPU acceleration for smoother transitions
          'will-change-transform' // Optimize for animations
        )}>
          {/* FIX 1: CardContent with overflow-hidden and box-border */}
          <CardContent className="p-0 h-full flex flex-col overflow-hidden box-border">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-primary text-white rounded-t-lg">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">Eco Fusion Assistant</h3>
                  <p className="text-xs opacity-90">
                    {isConnected ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="text-white hover:bg-white/20 minimize-btn"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                {/* Step 4: ScrollArea with proper constraints */}
                <ScrollArea className="flex-1 min-w-0 scroll-area max-h-[calc(100vh-150px)]">
                  {/* FIX 3: Inner content div with box-border */}
                  <div className="space-y-4 p-4 pr-1 box-border">
                    {messages.map(renderMessage)}
                    {error && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive break-words">{error}</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Step 6: Input Area with proper alignment */}
                <div className="p-4 border-t border-border/50 box-border form-container">
                  <form onSubmit={handleSubmit} className="flex gap-2 justify-between items-center">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 min-w-0"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!inputValue.trim() || isLoading}
                      className="shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </form>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          size="lg"
          className="w-14 h-14 rounded-full shadow-glow bg-gradient-primary hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};