import { useConversations } from '@/hooks/useConversations';
import { useAISimulator } from '@/hooks/useAISimulator';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';

/*
  ====================================
  PAGINA PRINCIPALE: AI Text Companion
  ====================================
  
  Layout pulito: Sidebar + Area Chat
  Design orientato all'apprendimento.
*/

const Index = () => {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    addMessage,
    deleteConversation,
  } = useConversations();

  const {
    status: aiStatus,
    displayedText,
    simulateRequest,
    reset: resetAI,
  } = useAISimulator();

  /**
   * Gestisce l'invio di un messaggio (anche da suggerimenti)
   */
  const handleSendMessage = async (content: string) => {
    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }

    addMessage(convId, 'user', content);

    const currentConv = conversations.find(c => c.id === convId);
    const history = currentConv?.messages.map(m => ({
      role: m.role,
      content: m.content,
    })) || [];

    try {
      const response = await simulateRequest(content, history);
      addMessage(convId, 'assistant', response);
    } catch (error) {
      console.error('Errore nella simulazione AI:', error);
      addMessage(convId, 'assistant', 'Mi dispiace, si è verificato un errore nella simulazione.');
    }

    resetAI();
  };

  const handleNewConversation = () => {
    resetAI();
    createConversation();
  };

  const handleSelectConversation = (id: string) => {
    resetAI();
    setActiveConversationId(id);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Area principale */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
          <div>
            <h2 className="font-medium text-foreground">
              {activeConversation?.title || 'Nuova conversazione'}
            </h2>
            <p className="text-xs text-muted-foreground">
              {activeConversation 
                ? `${activeConversation.messages.length} messaggi` 
                : 'Inizia a chattare per imparare'}
            </p>
          </div>
          
          {/* Badge simulazione */}
          <div className="rounded-full bg-accent/10 px-3 py-1">
            <span className="text-xs font-medium text-accent">
              🔬 Modalità Simulazione
            </span>
          </div>
        </header>

        {/* Chat container */}
        <ChatContainer
          messages={activeConversation?.messages || []}
          aiStatus={aiStatus}
          typingText={displayedText}
          onSuggestionClick={handleSendMessage}
        />

        {/* Input */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={aiStatus !== 'idle' && aiStatus !== 'complete'}
        />
      </main>
    </div>
  );
};

export default Index;
