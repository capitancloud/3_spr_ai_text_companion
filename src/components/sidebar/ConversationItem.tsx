import { Conversation } from '@/types/chat';
import { MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/*
  ====================================
  COMPONENTE: ConversationItem
  ====================================
  
  Singola voce nella lista delle conversazioni.
  Mostra titolo, data e permette selezione/eliminazione.
*/

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const ConversationItem = ({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) => {
  // Formatta la data in modo leggibile
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Oggi';
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString('it-IT');
  };

  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all',
        isActive
          ? 'bg-primary/20 border border-primary/50'
          : 'hover:bg-muted/50 border border-transparent'
      )}
      onClick={onSelect}
    >
      {/* Icona */}
      <MessageSquare
        className={cn(
          'h-5 w-5 shrink-0',
          isActive ? 'text-primary' : 'text-muted-foreground'
        )}
      />

      {/* Info conversazione */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {conversation.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(conversation.updatedAt)} • {conversation.messages.length} messaggi
        </p>
      </div>

      {/* Bottone elimina (visibile solo al hover) */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
};
