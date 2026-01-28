import { useState, useEffect } from 'react';
import { Monitor, Server, Database, Key, Cloud, ArrowRight } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ArchitectureDiagram
  ====================================
  
  Visualizza l'architettura full-stack con animazioni
  che mostrano il flusso dei dati tra i componenti.
  
  ARCHITETTURA MOSTRATA:
  1. Frontend (React) - L'interfaccia utente
  2. Edge Function (Supabase) - Il backend serverless
  3. Secrets (API Key) - Dove viene salvata la chiave
  4. AI Gateway - Il servizio AI esterno
*/

interface ArchitectureDiagramProps {
  activeStep: number;
  isAnimating: boolean;
}

export const ArchitectureDiagram = ({ activeStep, isAnimating }: ArchitectureDiagramProps) => {
  const [dataPacketPosition, setDataPacketPosition] = useState(0);

  // Animazione del pacchetto dati
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

  const components = [
    {
      id: 'frontend',
      icon: Monitor,
      label: 'Frontend',
      sublabel: 'React App',
      color: 'arch-frontend',
      description: 'L\'utente invia un messaggio',
    },
    {
      id: 'edge',
      icon: Server,
      label: 'Edge Function',
      sublabel: 'Supabase',
      color: 'arch-edge',
      description: 'Elabora la richiesta',
    },
    {
      id: 'secrets',
      icon: Key,
      label: 'Secrets',
      sublabel: 'API Key',
      color: 'arch-secrets',
      description: 'Recupera la chiave sicura',
    },
    {
      id: 'gateway',
      icon: Cloud,
      label: 'AI Gateway',
      sublabel: 'Lovable AI',
      color: 'arch-gateway',
      description: 'Genera la risposta',
    },
  ];

  return (
    <div className="relative p-8">
      {/* Titolo */}
      <h2 className="text-center text-2xl font-bold mb-2">
        Architettura Full-Stack
      </h2>
      <p className="text-center text-muted-foreground mb-8">
        Come fluiscono i dati dal frontend all'AI
      </p>

      {/* Diagramma principale */}
      <div className="flex items-center justify-center gap-4">
        {components.map((comp, index) => {
          const Icon = comp.icon;
          const isActive = activeStep >= index;
          const isCurrentStep = activeStep === index;
          
          return (
            <div key={comp.id} className="flex items-center">
              {/* Componente */}
              <div className="relative">
                <div
                  className={`
                    flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-500
                    ${isActive 
                      ? `border-${comp.color} bg-${comp.color}/10` 
                      : 'border-border bg-card opacity-40'
                    }
                    ${isCurrentStep ? 'pulse-glow scale-110' : ''}
                  `}
                  style={{
                    borderColor: isActive ? `hsl(var(--${comp.id === 'frontend' ? 'frontend' : comp.id === 'edge' ? 'edge-function' : comp.id === 'secrets' ? 'secrets' : 'api-gateway'}))` : undefined,
                    boxShadow: isCurrentStep ? `0 0 20px hsl(var(--${comp.id === 'frontend' ? 'frontend' : comp.id === 'edge' ? 'edge-function' : comp.id === 'secrets' ? 'secrets' : 'api-gateway'}) / 0.5)` : undefined
                  }}
                >
                  <div 
                    className={`
                      w-14 h-14 rounded-xl flex items-center justify-center mb-3
                      transition-all duration-300
                    `}
                    style={{
                      backgroundColor: isActive ? `hsl(var(--${comp.id === 'frontend' ? 'frontend' : comp.id === 'edge' ? 'edge-function' : comp.id === 'secrets' ? 'secrets' : 'api-gateway'}) / 0.2)` : undefined
                    }}
                  >
                    <Icon 
                      className="w-7 h-7" 
                      style={{
                        color: isActive ? `hsl(var(--${comp.id === 'frontend' ? 'frontend' : comp.id === 'edge' ? 'edge-function' : comp.id === 'secrets' ? 'secrets' : 'api-gateway'}))` : undefined
                      }}
                    />
                  </div>
                  <span className="font-semibold text-sm">{comp.label}</span>
                  <span className="text-xs text-muted-foreground">{comp.sublabel}</span>
                </div>

                {/* Descrizione sotto il componente attivo */}
                {isCurrentStep && (
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-muted">
                      {comp.description}
                    </span>
                  </div>
                )}
              </div>

              {/* Freccia di connessione */}
              {index < components.length - 1 && (
                <div className="relative mx-2 w-16">
                  {/* Linea base */}
                  <div className="h-0.5 w-full bg-border rounded" />
                  
                  {/* Freccia */}
                  <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  
                  {/* Pacchetto dati animato */}
                  {isAnimating && dataPacketPosition === index && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary animate-pulse"
                      style={{
                        left: '0%',
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

      {/* Legenda */}
      <div className="flex justify-center gap-6 mt-16 pt-6 border-t border-border">
        {components.map((comp) => (
          <div key={comp.id} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: `hsl(var(--${comp.id === 'frontend' ? 'frontend' : comp.id === 'edge' ? 'edge-function' : comp.id === 'secrets' ? 'secrets' : 'api-gateway'}))`
              }}
            />
            <span className="text-xs text-muted-foreground">{comp.label}</span>
          </div>
        ))}
      </div>

      {/* CSS per animazione pacchetto */}
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
