import { Bot } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ThinkingIndicator
  ====================================
  
  Mostra un'animazione mentre l'AI "sta pensando".
  Questo feedback visivo è cruciale per l'UX:
  l'utente sa che la sua richiesta è in elaborazione.
  
  In un'app reale, questo apparirebbe mentre
  aspetti la risposta dall'API.
*/

export const ThinkingIndicator = () => {
  return (
    <div className="message-enter flex gap-3 p-4">
      {/* Avatar AI con glow animato */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-secondary glow-pulse">
        <Bot className="h-5 w-5" />
      </div>

      {/* Bolla con animazione "thinking" */}
      <div className="glass rounded-2xl rounded-bl-sm px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Testo "sta pensando" */}
          <span className="text-sm text-muted-foreground">
            L'AI sta elaborando
          </span>
          
          {/* Tre puntini animati */}
          <div className="thinking-dots flex gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
        </div>

        {/* Barra di "elaborazione" simulata */}
        <div className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-muted">
          <div className="shimmer h-full w-full" />
        </div>
      </div>
    </div>
  );
};
