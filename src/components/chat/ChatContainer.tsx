import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { AIStatus } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ThinkingIndicator } from './ThinkingIndicator';
import { Bot, Sparkles } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ChatContainer
  ====================================
  
  Container principale per visualizzare i messaggi.
  
  FUNZIONALITÀ:
  - Scroll automatico ai nuovi messaggi
  - Stato vuoto con messaggio di benvenuto
  - Indicatore di "pensiero" AI
  - Messaggio temporaneo durante typing
*/

interface ChatContainerProps {
  messages: Message[];
  aiStatus: AIStatus;
  typingText: string;
}

export const ChatContainer = ({ 
  messages, 
  aiStatus, 
  typingText 
}: ChatContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll quando arrivano nuovi messaggi
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingText, aiStatus]);

  // Stato vuoto: mostra messaggio di benvenuto
  if (messages.length === 0 && aiStatus === 'idle') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        {/* Logo animato */}
        <div className="relative mb-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 glow-pulse">
            <Bot className="h-12 w-12 text-primary" />
          </div>
          {/* Particelle decorative */}
          <Sparkles className="floating-particle absolute -right-2 -top-2 h-6 w-6 text-secondary" />
          <Sparkles className="floating-particle absolute -bottom-1 -left-3 h-4 w-4 text-accent" style={{ animationDelay: '1s' }} />
        </div>

        <h2 className="mb-2 text-2xl font-bold text-glow">
          AI Text Companion
        </h2>
        <p className="mb-8 max-w-md text-center text-muted-foreground">
          Benvenuto! Questo è un progetto educativo che simula l'interazione con un'AI.
          Scrivi qualcosa per iniziare una conversazione.
        </p>

        {/* Suggerimenti */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            '👋 Ciao!',
            '💻 Cos\'è la programmazione?',
            '🤖 Come funziona l\'AI?',
          ].map((suggestion) => (
            <button
              key={suggestion}
              className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm transition-all hover:border-primary hover:bg-primary/10"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto scrollbar-thin"
    >
      <div className="mx-auto max-w-3xl py-4">
        {/* Messaggi esistenti */}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {/* Indicatore "thinking" */}
        {aiStatus === 'thinking' && <ThinkingIndicator />}

        {/* Messaggio in fase di typing */}
        {aiStatus === 'typing' && typingText && (
          <ChatMessage
            message={{
              id: 'typing',
              role: 'assistant',
              content: typingText,
              timestamp: new Date(),
            }}
            isTyping
          />
        )}
      </div>
    </div>
  );
};
