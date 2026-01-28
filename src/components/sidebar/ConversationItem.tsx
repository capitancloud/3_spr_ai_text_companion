import { Conversation } from '@/types/chat';
import { MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/*
  ====================================
  COMPONENTE: ConversationItem
  ====================================
  
  Design pulito per le voci della sidebar.
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
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Oggi';
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays}g fa`;
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  return (
    <div
      className={cn(
        'group relative flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted text-foreground'
      )}
      onClick={onSelect}
    >
      <MessageSquare className="h-4 w-4 shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {conversation.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(conversation.updatedAt)} • {conversation.messages.length} msg
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
      </Button>
    </div>
  );
};
