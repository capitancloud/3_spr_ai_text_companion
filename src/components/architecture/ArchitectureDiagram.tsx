import { useState, useEffect } from 'react';
import { Monitor, Server, Key, Cloud, ArrowRight, Info, X } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ArchitectureDiagram (Migliorato)
  ====================================
  
  Versione migliorata con spiegazioni dettagliate
  per ogni componente, tooltip e contesto.
*/

interface ArchitectureDiagramProps {
  activeStep: number;
  isAnimating: boolean;
}

const componentDetails = [
  {
    id: 'frontend',
    icon: Monitor,
    label: 'Frontend',
    sublabel: 'React App',
    colorVar: 'primary',
    shortDesc: 'L\'utente invia un messaggio',
    fullExplanation: {
      whatIs: 'Il Frontend è la parte dell\'applicazione che vedi nel tuo browser. È scritto in JavaScript/React e gira sul TUO computer.',
      whatDoes: 'Quando scrivi un messaggio e premi "Invia", il frontend raccoglie i dati e li manda al backend.',
      analogy: '🏪 È come la vetrina di un negozio: è quello che il cliente vede e con cui interagisce.',
      security: '⚠️ Tutto il codice qui è PUBBLICO. Chiunque può vederlo aprendo gli strumenti sviluppatore del browser.',
    },
  },
  {
    id: 'edge',
    icon: Server,
    label: 'Edge Function',
    sublabel: 'Backend Serverless',
    colorVar: 'secondary',
    shortDesc: 'Elabora la richiesta in sicurezza',
    fullExplanation: {
      whatIs: 'Una Edge Function è codice che gira su un server remoto, non sul tuo computer. È chiamata "serverless" perché non devi gestire il server.',
      whatDoes: 'Riceve la richiesta dal frontend, recupera la API key dai secrets, e chiama il servizio AI.',
      analogy: '👨‍🍳 È come un cameriere: prende l\'ordine dal cliente (frontend) e lo porta alla cucina (AI).',
      security: '✅ Questo codice è PRIVATO. Solo il proprietario può vederlo e modificarlo.',
    },
  },
  {
    id: 'secrets',
    icon: Key,
    label: 'Secrets',
    sublabel: 'Variabili Sicure',
    colorVar: 'destructive',
    shortDesc: 'Dove vive la API Key',
    fullExplanation: {
      whatIs: 'I Secrets sono variabili d\'ambiente salvate in modo sicuro nel server. Sono criptate e accessibili solo dal backend.',
      whatDoes: 'Quando l\'Edge Function chiama Deno.env.get("API_KEY"), il sistema restituisce il valore segreto.',
      analogy: '🔐 È come una cassaforte: solo chi ha la combinazione (il backend) può aprirla.',
      security: '✅ I secrets non vengono MAI inviati al browser. Rimangono sempre sul server.',
    },
  },
  {
    id: 'gateway',
    icon: Cloud,
    label: 'AI Gateway',
    sublabel: 'Servizio AI',
    colorVar: 'warning',
    shortDesc: 'Genera la risposta intelligente',
    fullExplanation: {
      whatIs: 'Il Gateway AI è un servizio esterno (come OpenAI o Lovable AI) che elabora il testo e genera risposte.',
      whatDoes: 'Riceve il messaggio con la API key valida, lo elabora con modelli di machine learning, e restituisce la risposta.',
      analogy: '🧠 È come un esperto: riceve una domanda e fornisce una risposta intelligente.',
      security: '✅ Accetta solo richieste con API key valide. Senza chiave, rifiuta la richiesta.',
    },
  },
];

export const ArchitectureDiagram = ({ activeStep, isAnimating }: ArchitectureDiagramProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [dataPacketPosition, setDataPacketPosition] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setDataPacketPosition(0);
      return;
    }

    const interval = setInterval(() => {
      setDataPacketPosition(prev => (prev + 1) % 5);
    }, 800);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const selectedDetails = componentDetails.find(c => c.id === selectedComponent);

  return (
    <div className="relative">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          🏗️ Architettura Full-Stack
        </h2>
        <p className="text-muted-foreground">
          Clicca su ogni componente per scoprire cosa fa e perché è importante
        </p>
      </div>

      {/* Diagramma */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {componentDetails.map((comp, index) => {
          const Icon = comp.icon;
          const isActive = activeStep >= index;
          const isCurrent = activeStep === index;
          const isSelected = selectedComponent === comp.id;
          
          return (
            <div key={comp.id} className="flex items-center">
              {/* Componente cliccabile */}
              <button
                onClick={() => setSelectedComponent(isSelected ? null : comp.id)}
                className="relative group"
              >
                <div
                  className={`
                    flex flex-col items-center p-4 sm:p-6 rounded-xl border-2 transition-all duration-500
                    hover:scale-105 cursor-pointer
                    ${isActive ? 'opacity-100' : 'opacity-40'}
                    ${isCurrent ? 'scale-110' : ''}
                    ${isSelected ? 'ring-2 ring-offset-2 ring-offset-background' : ''}
                  `}
                  style={{
                    borderColor: isActive ? `hsl(var(--${comp.colorVar}))` : 'hsl(var(--border))',
                    backgroundColor: isActive ? `hsl(var(--${comp.colorVar}) / 0.1)` : undefined,
                    boxShadow: isCurrent ? `0 0 30px hsl(var(--${comp.colorVar}) / 0.4)` : undefined,
                  }}
                >
                  {/* Indicatore "clicca per info" */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info className="w-3 h-3 text-primary-foreground" />
                  </div>

                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 sm:mb-3"
                    style={{
                      backgroundColor: isActive ? `hsl(var(--${comp.colorVar}) / 0.2)` : 'hsl(var(--muted))',
                    }}
                  >
                    <Icon 
                      className="w-6 h-6 sm:w-7 sm:h-7" 
                      style={{
                        color: isActive ? `hsl(var(--${comp.colorVar}))` : 'hsl(var(--muted-foreground))',
                      }}
                    />
                  </div>
                  <span className="font-semibold text-xs sm:text-sm">{comp.label}</span>
                  <span className="text-xs text-muted-foreground hidden sm:block">{comp.sublabel}</span>
                </div>

                {/* Descrizione breve sotto */}
                {isCurrent && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-muted">
                      {comp.shortDesc}
                    </span>
                  </div>
                )}
              </button>

              {/* Freccia */}
              {index < componentDetails.length - 1 && (
                <div className="relative mx-1 sm:mx-2 w-8 sm:w-16">
                  <div className="h-0.5 w-full bg-border rounded" />
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  
                  {isAnimating && dataPacketPosition === index && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"
                      style={{
                        animation: 'packet-travel 0.8s ease-in-out forwards'
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Panel dettagli espandibile */}
      {selectedDetails && (
        <div 
          className="mt-16 rounded-xl border-2 bg-card p-6 fade-in"
          style={{ borderColor: `hsl(var(--${selectedDetails.colorVar}))` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <selectedDetails.icon 
                className="w-6 h-6"
                style={{ color: `hsl(var(--${selectedDetails.colorVar}))` }}
              />
              <h3 className="text-xl font-bold">{selectedDetails.label}</h3>
            </div>
            <button
              onClick={() => setSelectedComponent(null)}
              className="p-1 rounded hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground mb-1">📚 Cos'è?</p>
                <p className="text-sm">{selectedDetails.fullExplanation.whatIs}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground mb-1">⚙️ Cosa fa?</p>
                <p className="text-sm">{selectedDetails.fullExplanation.whatDoes}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
                <p className="text-xs font-medium text-warning mb-1">💡 Analogia</p>
                <p className="text-sm">{selectedDetails.fullExplanation.analogy}</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-xs font-medium text-accent mb-1">🔒 Sicurezza</p>
                <p className="text-sm">{selectedDetails.fullExplanation.security}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="flex justify-center gap-4 sm:gap-6 mt-12 pt-4 border-t border-border flex-wrap">
        {componentDetails.map((comp) => (
          <div key={comp.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: `hsl(var(--${comp.colorVar}))` }}
            />
            <span className="text-xs text-muted-foreground">{comp.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes packet-travel {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
