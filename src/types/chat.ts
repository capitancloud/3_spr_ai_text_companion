/*
  ====================================
  TIPI PER IL SISTEMA DI CHAT
  ====================================
  
  Questi tipi definiscono la struttura dei dati dell'app.
  In un'applicazione reale con AI, questi sarebbero i tipi
  che useresti per comunicare con l'API (es. OpenAI, Anthropic).
*/

/**
 * Rappresenta un singolo messaggio nella conversazione.
 * 
 * In un'integrazione reale con OpenAI, questo corrisponde
 * al formato del messaggio nell'array "messages" della richiesta:
 * 
 * {
 *   role: "user" | "assistant" | "system",
 *   content: "testo del messaggio"
 * }
 */
export interface Message {
  id: string;                    // ID univoco per React keys
  role: 'user' | 'assistant';    // Chi ha scritto il messaggio
  content: string;               // Contenuto testuale
  timestamp: Date;               // Quando è stato inviato
}

/**
 * Rappresenta una conversazione completa.
 * 
 * In un'app reale, salveresti queste nel database.
 * Ogni conversazione ha un titolo generato automaticamente
 * dal primo messaggio dell'utente.
 */
export interface Conversation {
  id: string;                    // ID univoco della conversazione
  title: string;                 // Titolo (estratto dal primo messaggio)
  messages: Message[];           // Array di tutti i messaggi
  createdAt: Date;               // Data creazione
  updatedAt: Date;               // Ultimo aggiornamento
}

/**
 * Stato dell'AI durante l'elaborazione.
 * Usato per mostrare le animazioni appropriate.
 */
export type AIStatus = 'idle' | 'thinking' | 'typing' | 'complete';

/**
 * Simula la struttura di una richiesta API verso un modello AI.
 * 
 * NOTA EDUCATIVA: In un'integrazione reale con OpenAI, la richiesta
 * avrebbe questa struttura:
 * 
 * const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *   method: 'POST',
 *   headers: {
 *     'Authorization': `Bearer ${API_KEY}`,
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     model: 'gpt-4',
 *     messages: [...],  // Storico conversazione
 *     temperature: 0.7, // Creatività della risposta
 *     max_tokens: 1000  // Lunghezza massima risposta
 *   })
 * });
 */
export interface SimulatedAPIRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  temperature: number;
  max_tokens: number;
}
