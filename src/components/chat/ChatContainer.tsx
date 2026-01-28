import { useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import { AIStatus } from '@/types/chat';
import { ChatMessage } from './ChatMessage';
import { ThinkingIndicator } from './ThinkingIndicator';
import { Bot, BookOpen, Code, Sparkles } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ChatContainer
  ====================================
  
  Container con stato vuoto educativo e friendly.
*/

interface ChatContainerProps {
  messages: Message[];
  aiStatus: AIStatus;
  typingText: string;
  onSuggestionClick?: (text: string) => void;
}

export const ChatContainer = ({ 
  messages, 
  aiStatus, 
  typingText,
  onSuggestionClick 
}: ChatContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typingText, aiStatus]);

  // Stato vuoto: benvenuto educativo
  if (messages.length === 0 && aiStatus === 'idle') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        {/* Icona friendly */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10">
          <Bot className="h-10 w-10 text-accent" />
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Benvenuto in AI Companion! 👋
        </h2>
        <p className="mb-8 max-w-md text-center text-muted-foreground">
          Questo progetto educativo ti mostra come funziona l'integrazione con le API AI.
          Inizia una conversazione per vedere la simulazione in azione.
        </p>

        {/* Suggerimenti cliccabili */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: BookOpen, text: 'Cos\'è un modello AI?', color: 'text-primary' },
            { icon: Code, text: 'Come si chiama un\'API?', color: 'text-accent' },
            { icon: Sparkles, text: 'Ciao, presentati!', color: 'text-secondary-foreground' },
          ].map(({ icon: Icon, text, color }) => (
            <button
              key={text}
              onClick={() => onSuggestionClick?.(text)}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-soft hover-lift"
            >
              <Icon className={cn('h-5 w-5 shrink-0', color)} />
              <span className="text-sm font-medium">{text}</span>
            </button>
          ))}
        </div>

        {/* Badge educativo */}
        <div className="mt-8 rounded-full bg-secondary px-4 py-2">
          <p className="text-xs text-secondary-foreground">
            📚 Progetto di apprendimento - Le risposte sono simulate
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
    >
      <div className="mx-auto max-w-3xl px-4 py-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {aiStatus === 'thinking' && <ThinkingIndicator />}

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

// Helper per cn import
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
