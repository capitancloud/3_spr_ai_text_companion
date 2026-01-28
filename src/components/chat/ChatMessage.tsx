import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

/*
  ====================================
  COMPONENTE: ChatMessage
  ====================================
  
  Renderizza un singolo messaggio nella chat.
  
  DIFFERENZE TRA MESSAGGI USER E ASSISTANT:
  - User: Allineato a destra, colore primario
  - Assistant: Allineato a sinistra, con icona AI
*/

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;  // True se l'AI sta ancora "digitando"
}

export const ChatMessage = ({ message, isTyping = false }: ChatMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        // Animazione di ingresso per i nuovi messaggi
        'message-enter flex gap-3 p-4',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar con icona */}
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary/20 text-secondary glow-pulse'
        )}
      >
        {isUser ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>

      {/* Bolla del messaggio */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'glass rounded-bl-sm'
        )}
      >
        {/* Contenuto del messaggio */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
          {/* Cursore lampeggiante durante la digitazione */}
          {isTyping && (
            <span className="typing-cursor ml-0.5 inline-block h-4 w-0.5 bg-current" />
          )}
        </p>

        {/* Timestamp */}
        <p
          className={cn(
            'mt-1 text-xs',
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          )}
        >
          {message.timestamp.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};
