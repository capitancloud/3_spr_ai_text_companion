import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message } from '@/types/chat';

/*
  ====================================
  HOOK: useConversations
  ====================================
  
  Questo hook gestisce la persistenza delle conversazioni.
  
  PERCHÉ USARE UN HOOK PERSONALIZZATO?
  ------------------------------------
  1. Separa la logica di business dalla UI
  2. Rende il codice riutilizzabile
  3. Facilita il testing
  4. In futuro, puoi sostituire localStorage con un database
     senza modificare i componenti
  
  NOTA: In produzione, sostituiresti localStorage con chiamate
  al database (es. Supabase, Firebase, MongoDB).
*/

// Chiave per il localStorage - usa un prefisso unico per l'app
const STORAGE_KEY = 'ai-text-companion-conversations';

/**
 * Genera un ID univoco per messaggi e conversazioni.
 * In produzione, useresti UUID o ID generati dal database.
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Estrae un titolo dal primo messaggio dell'utente.
 * Limita a 50 caratteri per mantenere la UI pulita.
 */
const extractTitle = (message: string): string => {
  const cleaned = message.trim();
  if (cleaned.length <= 50) return cleaned;
  return cleaned.substring(0, 47) + '...';
};

export const useConversations = () => {
  // Stato: lista di tutte le conversazioni
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // Stato: ID della conversazione attualmente visualizzata
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  /*
    CARICAMENTO INIZIALE DAL LOCALSTORAGE
    -------------------------------------
    useEffect con array vuoto [] esegue solo al mount.
    
    IMPORTANTE: Convertiamo le stringhe date in oggetti Date
    perché JSON.parse non riconosce automaticamente le date.
  */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Riconverti le stringhe in Date
        const withDates = parsed.map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));
        setConversations(withDates);
      }
    } catch (error) {
      console.error('Errore nel caricamento delle conversazioni:', error);
    }
  }, []);

  /*
    SALVATAGGIO AUTOMATICO
    ----------------------
    Ogni volta che le conversazioni cambiano, salviamo nel localStorage.
    
    NOTA: In produzione, useresti debouncing per evitare
    troppe scritture consecutive.
  */
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
    }
  }, [conversations]);

  /**
   * Crea una nuova conversazione vuota.
   * Ritorna l'ID della nuova conversazione.
   */
  const createConversation = useCallback((): string => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'Nuova conversazione',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    
    return newConversation.id;
  }, []);

  /**
   * Aggiunge un messaggio a una conversazione.
   * Aggiorna anche il titolo se è il primo messaggio utente.
   */
  const addMessage = useCallback((
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ): Message => {
    const newMessage: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id !== conversationId) return conv;
      
      // Se è il primo messaggio utente, usa come titolo
      const shouldUpdateTitle = 
        role === 'user' && 
        conv.messages.filter(m => m.role === 'user').length === 0;
      
      return {
        ...conv,
        title: shouldUpdateTitle ? extractTitle(content) : conv.title,
        messages: [...conv.messages, newMessage],
        updatedAt: new Date(),
      };
    }));

    return newMessage;
  }, []);

  /**
   * Elimina una conversazione.
   */
  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    
    // Se era la conversazione attiva, deseleziona
    if (activeConversationId === conversationId) {
      setActiveConversationId(null);
    }
  }, [activeConversationId]);

  /**
   * Ottiene la conversazione attiva corrente.
   */
  const activeConversation = conversations.find(
    c => c.id === activeConversationId
  ) || null;

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    addMessage,
    deleteConversation,
  };
};
