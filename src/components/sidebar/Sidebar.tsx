import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { Button } from '@/components/ui/button';
import { Plus, GraduationCap, History, BookOpen } from 'lucide-react';

/*
  ====================================
  COMPONENTE: Sidebar
  ====================================
  
  Design educativo con branding chiaro.
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
      {/* Header con branding educativo */}
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">AI Companion</h1>
            <p className="text-xs text-muted-foreground">Impara l'integrazione AI</p>
          </div>
        </div>
      </div>

      {/* Bottone nuova chat */}
      <div className="p-3">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Nuova conversazione
        </Button>
      </div>

      {/* Sezione storico */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <History className="h-3.5 w-3.5" />
          STORICO CHAT
        </div>
      </div>

      {/* Lista conversazioni */}
      <div className="flex-1 overflow-y-auto px-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BookOpen className="mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              Nessuna chat salvata
            </p>
            <p className="text-xs text-muted-foreground/70">
              Inizia una conversazione!
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

      {/* Footer informativo */}
      <div className="border-t border-border p-3">
        <div className="rounded-lg bg-accent/10 p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 <strong>Suggerimento:</strong> Guarda il codice per capire come 
            vengono costruite le richieste API.
          </p>
        </div>
      </div>
    </aside>
  );
};
