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

  // Parse markdown-like formatting
  const parseMessageText = (text: string) => {
    if (!text) return '';
    
    // Convert **text** to bold
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert *text* to italic
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert `text` to code
    parsed = parsed.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert line breaks to <br>
    parsed = parsed.replace(/\n/g, '<br />');
    
    // Convert URLs to links
    parsed = parsed.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
    
    return parsed;
  };

  // Render message component
  const renderMessage = (message: any) => (
    <div
      key={message.id}
      className={cn(
        'flex gap-3 mb-4',
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {message.sender === 'bot' && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      
             <div
         className={cn(
           'max-w-[80%] rounded-2xl px-4 py-3 break-words overflow-hidden',
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
              className="text-sm leading-relaxed chatbot-message"
              dangerouslySetInnerHTML={{ __html: parseMessageText(message.text) }}
            />
            <div className={cn(
              'text-xs mt-2 opacity-70',
              message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
            )}>
              {formatTime(message.timestamp)}
            </div>
          </>
        )}
      </div>
      
      {message.sender === 'user' && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          'shadow-glow border border-border/50 transition-all duration-300',
          'w-[350px] sm:w-96 max-w-[calc(100vw-2rem)]',
          'h-[500px] max-h-[calc(100vh-2rem)]',
          isMinimized ? 'h-16' : 'h-[500px]'
        )}>
          <CardContent className="p-0 h-full flex flex-col">
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
                  className="text-white hover:bg-white/20"
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
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 pr-1">
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

                {/* Input Area */}
                <div className="p-4 border-t border-border/50">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled={isLoading || !isConnected}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!inputValue.trim() || isLoading || !isConnected}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                  
                  {/* Connection Status */}
                  {!isConnected && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <AlertCircle className="w-3 h-3" />
                      <span>Chat server unavailable</span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={testConnection}
                        className="text-xs p-0 h-auto"
                      >
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

             {/* Floating Chat Button */}
       {!isOpen && (
         <Button
           onClick={toggleChat}
           className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-primary hover:bg-gradient-primary shadow-glow hover:shadow-glow/80 transition-all duration-300"
           aria-label="Open chat"
         >
           <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
         </Button>
       )}
    </div>
  );
};

export default ChatbotWidget;
