import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/*
  ====================================
  COMPONENTE: ChatInput
  ====================================
  
  Campo di input per inviare messaggi all'AI.
  
  FEATURES:
  - Textarea auto-espandibile
  - Invio con Enter (Shift+Enter per nuova riga)
  - Bottone con animazione glow
  - Disabilitato durante l'elaborazione
*/

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize della textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage('');
      // Reset altezza textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter senza Shift invia il messaggio
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-card/50 p-4">
      {/* Container con bordo gradiente */}
      <div className="gradient-border mx-auto max-w-3xl">
        <div className="flex items-end gap-3 rounded-lg bg-card p-3">
          {/* Icona decorativa */}
          <Sparkles className="mb-2 h-5 w-5 shrink-0 text-primary/50" />
          
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            disabled={disabled}
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent text-sm outline-none',
              'placeholder:text-muted-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
          
          {/* Bottone invio */}
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            size="icon"
            className={cn(
              'shrink-0 transition-all duration-300',
              message.trim() && !disabled && 'animate-pulse-glow'
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Hint per scorciatoie */}
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Premi <kbd className="rounded bg-muted px-1 py-0.5">Enter</kbd> per inviare,{' '}
        <kbd className="rounded bg-muted px-1 py-0.5">Shift + Enter</kbd> per nuova riga
      </p>
    </div>
  );
};
