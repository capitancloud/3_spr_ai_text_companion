import { Bot } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ThinkingIndicator
  ====================================
  
  Indica che l'AI sta elaborando la risposta.
  Design pulito con animazione di puntini.
*/

export const ThinkingIndicator = () => {
  return (
    <div className="message-enter flex gap-3 py-3">
      {/* Avatar AI */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Bot className="h-4 w-4" />
      </div>

      {/* Contenuto */}
      <div>
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          AI Companion
        </p>
        
        <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-ai-bubble border border-ai-border px-4 py-3">
          <span className="text-sm text-muted-foreground">Sto pensando</span>
          
          {/* Puntini animati */}
          <div className="thinking-dots flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
};
