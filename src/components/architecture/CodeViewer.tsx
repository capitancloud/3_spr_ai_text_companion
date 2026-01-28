import { useState, useEffect } from 'react';

/*
  ====================================
  COMPONENTE: CodeViewer
  ====================================
  
  Mostra il codice con syntax highlighting
  e animazioni che evidenziano le parti rilevanti.
*/

interface CodeViewerProps {
  step: number;
  isAnimating: boolean;
}

interface CodeBlock {
  title: string;
  language: string;
  code: string;
  highlights: number[]; // Linee da evidenziare
  explanation: string;
}

const codeBlocks: CodeBlock[] = [
  {
    title: '1. Frontend - Invio Richiesta',
    language: 'typescript',
    code: `// Il frontend chiama l'Edge Function
const response = await fetch(
  \`\${SUPABASE_URL}/functions/v1/chat\`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Token pubblico per autenticazione
      'Authorization': \`Bearer \${ANON_KEY}\`
    },
    body: JSON.stringify({ 
      messages: conversationHistory 
    })
  }
);`,
    highlights: [2, 3, 7, 8, 11],
    explanation: 'Il frontend NON contiene mai la API key privata. Usa solo il token pubblico (anon key) per autenticarsi con Supabase.',
  },
  {
    title: '2. Edge Function - Elaborazione',
    language: 'typescript',
    code: `// supabase/functions/chat/index.ts
serve(async (req) => {
  const { messages } = await req.json();
  
  // ⚠️ La API key è nei SECRETS, non nel codice!
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  if (!LOVABLE_API_KEY) {
    throw new Error("API Key non configurata");
  }
  
  // Ora possiamo chiamare l'AI Gateway
  // con la chiave sicura
});`,
    highlights: [5, 6],
    explanation: 'L\'Edge Function gira sul SERVER. Qui è sicuro accedere ai secrets perché il codice non è visibile al client.',
  },
  {
    title: '3. Secrets - Configurazione Sicura',
    language: 'bash',
    code: `# I secrets sono variabili d'ambiente
# salvate in modo sicuro su Supabase

# NON fare mai questo:
❌ const API_KEY = "sk-abc123..."  // Nel codice

# Fai sempre questo:
✅ Deno.env.get("LOVABLE_API_KEY")  // Dal secret

# Il secret viene configurato via dashboard
# o CLI di Supabase, MAI nel codice sorgente`,
    highlights: [4, 5, 7, 8],
    explanation: 'I secrets sono criptati e accessibili solo dal backend. Non vengono mai esposti nel bundle del frontend.',
  },
  {
    title: '4. AI Gateway - Chiamata Sicura',
    language: 'typescript',
    code: `// Chiamata all'AI Gateway con la API key
const aiResponse = await fetch(
  "https://ai.gateway.lovable.dev/v1/chat/completions",
  {
    method: "POST",
    headers: {
      // La API key è passata qui, in modo sicuro
      "Authorization": \`Bearer \${LOVABLE_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: messages,
      stream: true,
    }),
  }
);`,
    highlights: [7, 8],
    explanation: 'Solo l\'Edge Function può fare questa chiamata perché solo lei ha accesso alla API key nei secrets.',
  },
];

export const CodeViewer = ({ step, isAnimating }: CodeViewerProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const currentBlock = codeBlocks[step] || codeBlocks[0];
  const lines = currentBlock.code.split('\n');

  // Animazione typing del codice
  useEffect(() => {
    if (!isAnimating) {
      setVisibleLines(lines.length);
      return;
    }

    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [step, isAnimating, lines.length]);

  // Syntax highlighting semplice
  const highlightSyntax = (line: string) => {
    return line
      .replace(/(\/\/.*)/g, '<span class="text-muted-foreground">$1</span>')
      .replace(/(#.*)/g, '<span class="text-muted-foreground">$1</span>')
      .replace(/(".*?")/g, '<span class="text-accent">$1</span>')
      .replace(/(`.*?`)/g, '<span class="text-accent">$1</span>')
      .replace(/(const|let|var|async|await|function|return|if|throw|new)/g, '<span class="text-secondary">$1</span>')
      .replace(/(fetch|Error|JSON|Deno|env|get)/g, '<span class="text-warning">$1</span>')
      .replace(/(❌|⚠️)/g, '<span class="text-destructive">$1</span>')
      .replace(/(✅)/g, '<span class="text-accent">$1</span>');
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <span className="font-semibold text-sm">{currentBlock.title}</span>
        <span className="text-xs text-muted-foreground font-mono">
          {currentBlock.language}
        </span>
      </div>

      {/* Codice */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <pre className="leading-relaxed">
          {lines.slice(0, visibleLines).map((line, index) => {
            const isHighlighted = currentBlock.highlights.includes(index + 1);
            return (
              <div
                key={index}
                className={`
                  flex transition-all duration-300
                  ${isHighlighted ? 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary' : ''}
                `}
              >
                <span className="w-8 text-muted-foreground/50 select-none">
                  {index + 1}
                </span>
                <span 
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || '&nbsp;' }}
                />
              </div>
            );
          })}
          {visibleLines < lines.length && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="w-8" />
              <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
            </div>
          )}
        </pre>
      </div>

      {/* Spiegazione */}
      <div className="px-4 py-3 border-t border-border bg-muted/20">
        <p className="text-sm text-muted-foreground leading-relaxed">
          💡 {currentBlock.explanation}
        </p>
      </div>
    </div>
  );
};
