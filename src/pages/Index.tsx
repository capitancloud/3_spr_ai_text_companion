import { useConversations } from '@/hooks/useConversations';
import { useAISimulator } from '@/hooks/useAISimulator';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ChatInput } from '@/components/chat/ChatInput';
import { ParticleBackground } from '@/components/effects/ParticleBackground';

/*
  ====================================
  PAGINA PRINCIPALE: AI Text Companion
  ====================================
  
  Questa è la pagina principale dell'applicazione.
  
  ARCHITETTURA:
  - useConversations: Gestisce la persistenza (localStorage)
  - useAISimulator: Simula le risposte AI
  - Layout: Sidebar + Area Chat
  
  FLUSSO DI UNA RICHIESTA:
  1. L'utente scrive un messaggio
  2. Il messaggio viene salvato nella conversazione
  3. useAISimulator simula l'elaborazione AI
  4. La risposta viene mostrata con effetto typing
  5. La risposta viene salvata nella conversazione
  
  IN UN'APP REALE:
  Il passo 3 sarebbe una chiamata HTTP all'API AI:
  
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages: conversation.messages })
  });
*/

const Index = () => {
  // Hook per gestire le conversazioni
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    addMessage,
    deleteConversation,
  } = useConversations();

  // Hook per simulare le risposte AI
  const {
    status: aiStatus,
    displayedText,
    simulateRequest,
    reset: resetAI,
  } = useAISimulator();

  /**
   * Gestisce l'invio di un nuovo messaggio.
   * 
   * FLUSSO:
   * 1. Se non c'è una conversazione attiva, ne crea una
   * 2. Aggiunge il messaggio utente
   * 3. Simula la risposta AI
   * 4. Aggiunge la risposta alla conversazione
   */
  const handleSendMessage = async (content: string) => {
    // Crea conversazione se necessario
    let convId = activeConversationId;
    if (!convId) {
      convId = createConversation();
    }

    // Aggiungi messaggio utente
    addMessage(convId, 'user', content);

    // Prepara lo storico per l'API (formato OpenAI)
    const currentConv = conversations.find(c => c.id === convId);
    const history = currentConv?.messages.map(m => ({
      role: m.role,
      content: m.content,
    })) || [];

    try {
      // Simula la richiesta API
      const response = await simulateRequest(content, history);
      
      // Aggiungi risposta AI
      addMessage(convId, 'assistant', response);
    } catch (error) {
      console.error('Errore nella simulazione AI:', error);
      addMessage(convId, 'assistant', 'Mi dispiace, si è verificato un errore.');
    }

    // Reset stato AI
    resetAI();
  };

  /**
   * Crea una nuova conversazione.
   */
  const handleNewConversation = () => {
    resetAI();
    createConversation();
  };

  /**
   * Seleziona una conversazione esistente.
   */
  const handleSelectConversation = (id: string) => {
    resetAI();
    setActiveConversationId(id);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sfondo animato con particelle */}
      <ParticleBackground />

      {/* Sidebar con storico conversazioni */}
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={deleteConversation}
      />

      {/* Area principale chat */}
      <main className="relative z-10 flex flex-1 flex-col scanlines">
        {/* Container messaggi */}
        <ChatContainer
          messages={activeConversation?.messages || []}
          aiStatus={aiStatus}
          typingText={displayedText}
        />

        {/* Input messaggi */}
        <ChatInput
          onSend={handleSendMessage}
          disabled={aiStatus !== 'idle' && aiStatus !== 'complete'}
        />
      </main>
    </div>
  );
};

export default Index;
