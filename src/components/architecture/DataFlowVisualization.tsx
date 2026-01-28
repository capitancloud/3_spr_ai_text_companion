import { Monitor, Server, Key, Cloud, ArrowDown, ArrowUp } from 'lucide-react';

/*
  ====================================
  COMPONENTE: DataFlowVisualization
  ====================================
  
  Mostra il flusso completo di una richiesta
  e della risposta con animazioni verticali.
*/

interface DataFlowVisualizationProps {
  activeStep: number;
  direction: 'request' | 'response';
}

export const DataFlowVisualization = ({ 
  activeStep, 
  direction 
}: DataFlowVisualizationProps) => {
  const isRequest = direction === 'request';
  
  const layers = [
    {
      icon: Monitor,
      label: 'Browser',
      requestData: '{ messages: [...] }',
      responseData: '{ response: "Ciao! Come posso..." }',
      color: 'primary',
    },
    {
      icon: Server,
      label: 'Edge Function',
      requestData: 'Valida richiesta, prepara payload',
      responseData: 'Formatta risposta per il client',
      color: 'secondary',
    },
    {
      icon: Key,
      label: 'Secrets',
      requestData: 'Recupera LOVABLE_API_KEY',
      responseData: '—',
      color: 'destructive',
    },
    {
      icon: Cloud,
      label: 'AI Gateway',
      requestData: 'Authorization: Bearer sk-...',
      responseData: 'Stream di token generati',
      color: 'warning',
    },
  ];

  const orderedLayers = isRequest ? layers : [...layers].reverse();

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {isRequest ? (
          <>
            <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
            <span className="font-semibold">Richiesta (Request)</span>
          </>
        ) : (
          <>
            <ArrowUp className="w-5 h-5 text-accent animate-bounce" />
            <span className="font-semibold">Risposta (Response)</span>
          </>
        )}
      </div>

      {/* Layers */}
      <div className="space-y-3">
        {orderedLayers.map((layer, index) => {
          const Icon = layer.icon;
          const originalIndex = isRequest ? index : layers.length - 1 - index;
          const isActive = activeStep >= originalIndex;
          const isCurrent = activeStep === originalIndex;
          const data = isRequest ? layer.requestData : layer.responseData;

          return (
            <div key={layer.label} className="relative">
              {/* Connector line */}
              {index > 0 && (
                <div className="absolute left-7 -top-3 w-0.5 h-3 bg-border">
                  {isCurrent && (
                    <div 
                      className={`
                        absolute w-2 h-2 rounded-full -left-[3px]
                        ${isRequest ? 'bg-primary animate-ping' : 'bg-accent animate-ping'}
                      `}
                      style={{
                        top: isRequest ? '0' : 'auto',
                        bottom: isRequest ? 'auto' : '0',
                      }}
                    />
                  )}
                </div>
              )}

              {/* Layer card */}
              <div
                className={`
                  flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                  ${isActive 
                    ? `border-${layer.color} bg-${layer.color}/5` 
                    : 'border-border bg-card/50 opacity-40'
                  }
                  ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                `}
                style={{
                  borderColor: isActive ? `hsl(var(--${layer.color}))` : undefined,
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: isActive ? `hsl(var(--${layer.color}) / 0.2)` : undefined
                  }}
                >
                  <Icon 
                    className="w-5 h-5"
                    style={{
                      color: isActive ? `hsl(var(--${layer.color}))` : undefined
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{layer.label}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {data}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
