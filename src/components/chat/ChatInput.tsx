import { useState, useRef, useEffect } from 'react';
import { Send, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/*
  ====================================
  COMPONENTE: ChatInput
  ====================================
  
  Input pulito con suggerimento educativo.
*/

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-card px-4 py-4">
      <div className="mx-auto max-w-3xl">
        {/* Input container */}
        <div className="flex items-end gap-3 rounded-xl border border-border bg-background p-3 shadow-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi il tuo messaggio..."
            disabled={disabled}
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent text-sm outline-none',
              'placeholder:text-muted-foreground',
              'disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
          
          <Button
            onClick={handleSubmit}
            disabled={disabled || !message.trim()}
            size="sm"
            className="shrink-0 gap-2"
          >
            <Send className="h-4 w-4" />
            Invia
          </Button>
        </div>
        
        {/* Hint educativo */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Lightbulb className="h-3.5 w-3.5" />
          <span>Prova a chiedere: "Come funziona l'integrazione AI?"</span>
        </div>
      </div>
    </div>
  );
};
