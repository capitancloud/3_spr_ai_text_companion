import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { Button } from '@/components/ui/button';
import { Plus, Bot, History } from 'lucide-react';

/*
  ====================================
  COMPONENTE: Sidebar
  ====================================
  
  Pannello laterale con:
  - Bottone per nuova conversazione
  - Lista delle conversazioni salvate
  - Header con branding
  
  NOTA ARCHITETTURALE:
  In un'app reale, le conversazioni verrebbero
  caricate dal database con paginazione.
*/

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export const Sidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: SidebarProps) => {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-sidebar">
      {/* Header con logo */}
      <div className="flex items-center gap-3 border-b border-border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 glow-pulse">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-bold text-glow">AI Companion</h1>
          <p className="text-xs text-muted-foreground">Progetto Educativo</p>
        </div>
      </div>

      {/* Bottone nuova conversazione */}
      <div className="p-4">
        <Button 
          onClick={onNewConversation}
          className="w-full gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Nuova Chat
        </Button>
      </div>

      {/* Lista conversazioni */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <History className="mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Nessuna conversazione
            </p>
            <p className="text-xs text-muted-foreground/70">
              Inizia una nuova chat!
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onSelect={() => onSelectConversation(conversation.id)}
                onDelete={() => onDeleteConversation(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer educativo */}
      <div className="border-t border-border p-4">
        <div className="rounded-lg bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Nota:</strong> Questa app simula le risposte AI. 
            In produzione, userebbe API come OpenAI o Anthropic.
          </p>
        </div>
      </div>
    </aside>
  );
};
