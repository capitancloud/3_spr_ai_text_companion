import { useState, useEffect } from 'react';
import { Info, ChevronRight, ChevronLeft } from 'lucide-react';

/*
  ====================================
  COMPONENTE: CodeViewer (Migliorato)
  ====================================
  
  Versione migliorata con spiegazioni inline
  per ogni riga di codice importante.
*/

interface CodeViewerProps {
  step: number;
  isAnimating: boolean;
}

interface CodeLine {
  code: string;
  explanation?: string;
  isHighlight?: boolean;
}

interface CodeBlock {
  title: string;
  context: string; // Spiegazione del contesto
  language: string;
  lines: CodeLine[];
  keyTakeaway: string;
}

const codeBlocks: CodeBlock[] = [
  {
    title: '1️⃣ Frontend - Invio della Richiesta',
    context: 'Questo codice gira nel BROWSER dell\'utente. È il punto di partenza: l\'utente ha scritto un messaggio e vuole inviarlo all\'AI.',
    language: 'typescript',
    lines: [
      { code: '// Questo codice è nel TUO browser', explanation: 'Il frontend gira sul computer dell\'utente, non su un server.' },
      { code: '' },
      { code: 'const response = await fetch(', explanation: 'fetch() è una funzione che invia richieste HTTP a un server.' },
      { code: '  `${SUPABASE_URL}/functions/v1/chat`,', isHighlight: true, explanation: '📍 Questo è l\'indirizzo del nostro backend (Edge Function).' },
      { code: '  {' },
      { code: '    method: \'POST\',', explanation: 'POST significa "sto inviando dati" (diverso da GET che "chiede dati").' },
      { code: '    headers: {' },
      { code: '      \'Content-Type\': \'application/json\',', explanation: 'Dice al server che stiamo inviando dati in formato JSON.' },
      { code: '      \'Authorization\': `Bearer ${ANON_KEY}`', isHighlight: true, explanation: '🔑 Questo è un token PUBBLICO, non la API key segreta!' },
      { code: '    },' },
      { code: '    body: JSON.stringify({' },
      { code: '      messages: conversationHistory', isHighlight: true, explanation: '💬 Qui ci sono i messaggi della chat da inviare all\'AI.' },
      { code: '    })' },
      { code: '  }' },
      { code: ');' },
    ],
    keyTakeaway: '🎯 Il frontend usa solo chiavi PUBBLICHE. La API key segreta non è MAI qui!',
  },
  {
    title: '2️⃣ Edge Function - Il Cuore Sicuro',
    context: 'Questo codice gira su un SERVER remoto. L\'utente non può vederlo. È qui che possiamo usare dati segreti in sicurezza.',
    language: 'typescript',
    lines: [
      { code: '// Questo codice gira su un SERVER, non nel browser' },
      { code: '' },
      { code: 'serve(async (req) => {' },
      { code: '  // 1. Leggo i dati dalla richiesta del frontend' },
      { code: '  const { messages } = await req.json();' },
      { code: '' },
      { code: '  // 2. ⭐ MOMENTO CHIAVE: recupero la API key', explanation: 'Questo è il passaggio più importante!' },
      { code: '  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");', isHighlight: true, explanation: '🔐 La chiave viene letta dai SECRETS, non dal codice!' },
      { code: '' },
      { code: '  // 3. Verifico che la chiave esista' },
      { code: '  if (!LOVABLE_API_KEY) {' },
      { code: '    throw new Error("API Key non configurata!");', explanation: 'Se qualcuno dimentica di configurare il secret, l\'app si ferma.' },
      { code: '  }' },
      { code: '' },
      { code: '  // 4. Ora posso chiamare l\'AI in sicurezza...' },
      { code: '});' },
    ],
    keyTakeaway: '🎯 Deno.env.get() legge variabili d\'ambiente salvate in modo sicuro. La chiave non è mai nel codice!',
  },
  {
    title: '3️⃣ Secrets - La Cassaforte Digitale',
    context: 'I secrets sono configurati tramite dashboard o CLI, MAI scritti nel codice sorgente. Sono criptati e accessibili solo dal backend.',
    language: 'bash',
    lines: [
      { code: '# ❌ SBAGLIATO - Mai fare così:', explanation: 'Questo errore espone la chiave a tutto il mondo!' },
      { code: '' },
      { code: 'const API_KEY = "sk-abc123xyz789..."', isHighlight: true, explanation: '⚠️ Chiunque legga il codice può rubare questa chiave!' },
      { code: '' },
      { code: '# ✅ CORRETTO - La chiave è in un secret:', explanation: 'Il secret è salvato in modo sicuro nel server.' },
      { code: '' },
      { code: 'const API_KEY = Deno.env.get("LOVABLE_API_KEY")', isHighlight: true, explanation: '✅ Il codice non contiene il valore, solo il nome della variabile.' },
      { code: '' },
      { code: '# Come si configura un secret?' },
      { code: '# 1. Vai nella dashboard di Supabase o Lovable' },
      { code: '# 2. Aggiungi una nuova variabile d\'ambiente' },
      { code: '# 3. Dai un nome (es. LOVABLE_API_KEY)' },
      { code: '# 4. Inserisci il valore segreto' },
      { code: '# 5. Salva - ora è disponibile nel backend!' },
    ],
    keyTakeaway: '🎯 I secrets vengono configurati UNA volta nella dashboard, poi usati nel codice tramite nome.',
  },
  {
    title: '4️⃣ AI Gateway - La Chiamata Finale',
    context: 'Ora che abbiamo la API key (in modo sicuro), possiamo finalmente chiamare il servizio AI. Questa chiamata parte dal SERVER, non dal browser.',
    language: 'typescript',
    lines: [
      { code: '// Chiamata all\'AI Gateway (dal server, con chiave sicura)' },
      { code: '' },
      { code: 'const aiResponse = await fetch(' },
      { code: '  "https://ai.gateway.lovable.dev/v1/chat/completions",', explanation: 'Questo è l\'endpoint del servizio AI.' },
      { code: '  {' },
      { code: '    method: "POST",' },
      { code: '    headers: {' },
      { code: '      // ⭐ Ecco la API key segreta!', isHighlight: true },
      { code: '      "Authorization": `Bearer ${LOVABLE_API_KEY}`,', isHighlight: true, explanation: '🔐 La chiave viaggia in modo sicuro dal server all\'AI.' },
      { code: '      "Content-Type": "application/json",' },
      { code: '    },' },
      { code: '    body: JSON.stringify({' },
      { code: '      model: "google/gemini-2.5-flash",', explanation: 'Specifichiamo quale modello AI usare.' },
      { code: '      messages: messages,', explanation: 'I messaggi della conversazione.' },
      { code: '      stream: true,', explanation: 'Stream=true fa apparire il testo parola per parola.' },
      { code: '    }),' },
      { code: '  }' },
      { code: ');' },
    ],
    keyTakeaway: '🎯 Solo il backend può fare questa chiamata perché solo lui ha accesso alla API key!',
  },
];

export const CodeViewer = ({ step, isAnimating }: CodeViewerProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const currentBlock = codeBlocks[step] || codeBlocks[0];

  useEffect(() => {
    setShowExplanation(null);
    
    if (!isAnimating) {
      setVisibleLines(currentBlock.lines.length);
      return;
    }

    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= currentBlock.lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [step, isAnimating, currentBlock.lines.length]);

  const highlightSyntax = (line: string) => {
    return line
      .replace(/(\/\/.*)/g, '<span class="text-muted-foreground italic">$1</span>')
      .replace(/(#.*)/g, '<span class="text-muted-foreground italic">$1</span>')
      .replace(/(".*?")/g, '<span class="text-accent">$1</span>')
      .replace(/(`[^`]*`)/g, '<span class="text-accent">$1</span>')
      .replace(/('.*?')/g, '<span class="text-accent">$1</span>')
      .replace(/\b(const|let|var|async|await|function|return|if|throw|new|true|false)\b/g, '<span class="text-secondary">$1</span>')
      .replace(/\b(fetch|Error|JSON|Deno|env|get|serve|stringify)\b/g, '<span class="text-warning">$1</span>')
      .replace(/(❌|⚠️)/g, '<span class="text-destructive">$1</span>')
      .replace(/(✅|⭐)/g, '<span class="text-accent">$1</span>');
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header con contesto */}
      <div className="border-b border-border bg-muted/30">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{currentBlock.title}</span>
            <span className="text-xs text-muted-foreground font-mono px-2 py-1 rounded bg-muted">
              {currentBlock.language}
            </span>
          </div>
        </div>
        {/* Contesto per principianti */}
        <div className="px-4 pb-3">
          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">{currentBlock.context}</p>
          </div>
        </div>
      </div>

      {/* Codice con spiegazioni */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="leading-relaxed">
          {currentBlock.lines.slice(0, visibleLines).map((line, index) => (
            <div key={index} className="group">
              <div
                className={`
                  flex transition-all duration-300 rounded
                  ${line.isHighlight ? 'bg-primary/10 -mx-2 px-2 border-l-2 border-primary' : ''}
                  ${line.explanation ? 'cursor-pointer hover:bg-muted/50' : ''}
                `}
                onClick={() => line.explanation && setShowExplanation(showExplanation === index ? null : index)}
              >
                <span className="w-8 text-muted-foreground/50 select-none shrink-0">
                  {index + 1}
                </span>
                <span 
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line.code) || '&nbsp;' }}
                />
                {line.explanation && (
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-4 h-4 text-primary" />
                  </span>
                )}
              </div>
              
              {/* Spiegazione inline */}
              {showExplanation === index && line.explanation && (
                <div className="ml-8 my-2 p-3 rounded-lg bg-warning/10 border border-warning/30 text-sm fade-in">
                  <p className="text-muted-foreground">
                    💡 {line.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
          
          {visibleLines < currentBlock.lines.length && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-8" />
              <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
            </div>
          )}
        </pre>
      </div>

      {/* Key Takeaway */}
      <div className="px-4 py-3 border-t border-border bg-accent/5">
        <p className="text-sm font-medium text-accent">
          {currentBlock.keyTakeaway}
        </p>
      </div>

      {/* Suggerimento */}
      <div className="px-4 py-2 border-t border-border bg-muted/20">
        <p className="text-xs text-muted-foreground text-center">
          👆 Clicca sulle righe evidenziate per vedere la spiegazione
        </p>
      </div>
    </div>
  );
};
