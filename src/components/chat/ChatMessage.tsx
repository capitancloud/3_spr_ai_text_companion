import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
  ====================================
  COMPONENTE: ChatMessage
  ====================================
  
  Design pulito e leggibile per i messaggi.
  - User: Bolla colorata allineata a destra
  - AI: Bolla chiara con bordo, allineata a sinistra
*/

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isTyping = false }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'message-enter flex gap-3 py-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Contenuto messaggio */}
      <div className={cn('max-w-[75%]', isUser ? 'text-right' : 'text-left')}>
        {/* Label ruolo */}
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          {isUser ? 'Tu' : 'AI Companion'}
        </p>
        
        {/* Bolla messaggio */}
        <div
          className={cn(
            'inline-block rounded-2xl px-4 py-2.5',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-ai-bubble border border-ai-border rounded-bl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
            {isTyping && (
              <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-current" />
            )}
          </p>
        </div>

        {/* Timestamp */}
        <p className="mt-1 text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
