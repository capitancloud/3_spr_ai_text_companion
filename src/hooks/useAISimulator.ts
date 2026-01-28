import { useState, useCallback } from 'react';
import { AIStatus, SimulatedAPIRequest } from '@/types/chat';

/*
  ====================================
  HOOK: useAISimulator
  ====================================
  
  Questo hook simula il comportamento di un'API AI.
  
  COME FUNZIONA UN'API AI REALE?
  ------------------------------
  1. Invii una richiesta HTTP POST con:
     - Il modello da usare (es. "gpt-4", "claude-3")
     - L'array di messaggi (storico conversazione)
     - Parametri come temperature, max_tokens
  
  2. L'API processa la richiesta (può richiedere secondi)
  
  3. Ricevi una risposta JSON con:
     - Il testo generato
     - Metadati (tokens usati, tempo, ecc.)
  
  SIMULAZIONE
  -----------
  Qui simuliamo tutto questo con:
  - Delay artificiali per "pensiero"
  - Risposte predefinite basate su keyword
  - Effetto typing carattere per carattere
*/

// Risposte simulate basate sul contesto
const SIMULATED_RESPONSES: Record<string, string[]> = {
  saluto: [
    "Ciao! 👋 Sono il tuo AI Text Companion. Come posso aiutarti oggi?",
    "Benvenuto! Sono qui per rispondere alle tue domande. Cosa ti piacerebbe sapere?",
    "Salve! È un piacere conoscerti. Sono pronto ad assisterti.",
  ],
  programmazione: [
    "La programmazione è l'arte di dare istruzioni a un computer. Inizia con concetti base come variabili, cicli e funzioni. Ti consiglio di scegliere un linguaggio come Python o JavaScript per iniziare! 💻",
    "Ottima domanda sulla programmazione! I concetti fondamentali sono: variabili (contenitori di dati), funzioni (blocchi di codice riutilizzabili), e strutture di controllo (if/else, loop). Vuoi approfondire qualcuno di questi?",
  ],
  ai: [
    "L'Intelligenza Artificiale è un campo affascinante! In sintesi, è la capacità delle macchine di simulare l'intelligenza umana. I modelli come me usano reti neurali addestrate su enormi quantità di testo. 🤖",
    "L'AI moderna si basa su machine learning e deep learning. I modelli linguistici come GPT usano l'architettura Transformer per comprendere e generare testo. È come avere miliardi di pattern appresi!",
  ],
  default: [
    "Questa è una domanda interessante! In un'applicazione reale, qui riceveresti una risposta dall'API di un modello come GPT-4 o Claude. La risposta sarebbe generata in base al contesto della conversazione. 🌟",
    "Bella domanda! Sto simulando una risposta AI. In produzione, il tuo messaggio verrebbe inviato a un'API come OpenAI, che analizzerebbe il contesto e genererebbe una risposta pertinente.",
    "Hmm, fammi pensare... In un sistema reale, il modello AI processerebbe tutti i messaggi precedenti per darti una risposta contestuale. È così che manteniamo la coerenza nella conversazione! 💡",
  ],
};

/**
 * Seleziona una risposta simulata basata sul contenuto del messaggio.
 * 
 * NOTA EDUCATIVA: In un'API reale, il modello analizza tutto il contesto.
 * Qui usiamo semplici keyword matching per demo.
 */
const selectResponse = (userMessage: string): string => {
  const lower = userMessage.toLowerCase();
  
  // Controlla keyword per categoria
  if (lower.includes('ciao') || lower.includes('salve') || lower.includes('buongiorno')) {
    const responses = SIMULATED_RESPONSES.saluto;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  if (lower.includes('programm') || lower.includes('codice') || lower.includes('coding')) {
    const responses = SIMULATED_RESPONSES.programmazione;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  if (lower.includes('ai') || lower.includes('intelligenza artificiale') || lower.includes('machine learning')) {
    const responses = SIMULATED_RESPONSES.ai;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Risposta default
  const responses = SIMULATED_RESPONSES.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

export const useAISimulator = () => {
  // Stato dell'AI: idle, thinking, typing, complete
  const [status, setStatus] = useState<AIStatus>('idle');
  
  // Testo che viene "digitato" carattere per carattere
  const [displayedText, setDisplayedText] = useState('');
  
  // Testo completo della risposta (per l'animazione)
  const [fullResponse, setFullResponse] = useState('');

  /**
   * Simula l'invio di una richiesta all'API AI.
   * 
   * STRUTTURA DI UNA RICHIESTA OPENAI REALE:
   * ----------------------------------------
   * const response = await fetch('https://api.openai.com/v1/chat/completions', {
   *   method: 'POST',
   *   headers: {
   *     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
   *     'Content-Type': 'application/json'
   *   },
   *   body: JSON.stringify({
   *     model: 'gpt-4',
   *     messages: [
   *       { role: 'system', content: 'Sei un assistente utile.' },
   *       { role: 'user', content: 'Ciao!' },
   *       { role: 'assistant', content: 'Ciao! Come posso aiutarti?' },
   *       { role: 'user', content: 'Nuovo messaggio...' }
   *     ],
   *     temperature: 0.7,
   *     max_tokens: 1000
   *   })
   * });
   */
  const simulateRequest = useCallback(async (
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }>
  ): Promise<string> => {
    // Log della "richiesta" per scopi educativi
    const simulatedRequest: SimulatedAPIRequest = {
      model: 'gpt-4-simulated',
      messages: [
        { role: 'system', content: 'Sei AI Text Companion, un assistente amichevole.' },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    };
    
    console.log('📤 Richiesta API Simulata:', JSON.stringify(simulatedRequest, null, 2));
    
    // FASE 1: "Thinking" - L'AI sta elaborando
    setStatus('thinking');
    setDisplayedText('');
    
    // Simula il tempo di elaborazione (1-2 secondi)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Seleziona la risposta
    const response = selectResponse(userMessage);
    setFullResponse(response);
    
    // FASE 2: "Typing" - Effetto digitazione
    setStatus('typing');
    
    // Digita carattere per carattere
    for (let i = 0; i <= response.length; i++) {
      setDisplayedText(response.substring(0, i));
      // Velocità variabile per sembrare più naturale
      await new Promise(resolve => 
        setTimeout(resolve, 20 + Math.random() * 30)
      );
    }
    
    // FASE 3: Complete
    setStatus('complete');
    
    // Log della "risposta"
    console.log('📥 Risposta AI Simulata:', response);
    
    return response;
  }, []);

  /**
   * Reset dello stato per una nuova richiesta.
   */
  const reset = useCallback(() => {
    setStatus('idle');
    setDisplayedText('');
    setFullResponse('');
  }, []);

  return {
    status,
    displayedText,
    fullResponse,
    simulateRequest,
    reset,
  };
};
