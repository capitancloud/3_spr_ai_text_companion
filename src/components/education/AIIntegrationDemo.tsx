import { useState, useEffect } from 'react';
import { 
  Brain, 
  Lock, 
  Server, 
  Monitor, 
  ArrowRight, 
  Key, 
  MessageSquare, 
  Sparkles,
  CheckCircle,
  Code,
  Shield,
  Zap
} from 'lucide-react';

/*
  ====================================
  COMPONENTE: AIIntegrationDemo
  ====================================
  
  Dimostra il flusso completo di integrazione AI
  con un esempio pratico usando OpenAI/Lovable AI Gateway.
*/

interface AIIntegrationDemoProps {
  isAnimating?: boolean;
}

export const AIIntegrationDemo = ({ isAnimating = false }: AIIntegrationDemoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showCode, setShowCode] = useState<'frontend' | 'backend' | null>(null);

  const demoMessage = "Ciao! Come funziona l'AI?";
  const demoResponse = "L'AI analizza il tuo messaggio e genera una risposta basata sul contesto...";

  // Animazione automatica del flusso
  useEffect(() => {
    if (!isAnimating) {
      setCurrentStep(0);
      setUserMessage('');
      setAiResponse('');
      return;
    }

    const steps = [
      // Step 1: Utente scrive
      () => {
        setCurrentStep(1);
        setUserMessage('');
        setAiResponse('');
      },
      // Step 1b: Messaggio digitato
      () => {
        let i = 0;
        const typing = setInterval(() => {
          setUserMessage(demoMessage.slice(0, i + 1));
          i++;
          if (i >= demoMessage.length) clearInterval(typing);
        }, 50);
      },
      // Step 2: Invio al backend
      () => setCurrentStep(2),
      // Step 3: Backend legge secrets
      () => setCurrentStep(3),
      // Step 4: Chiamata AI Gateway
      () => setCurrentStep(4),
      // Step 5: Risposta AI
      () => {
        setCurrentStep(5);
        let i = 0;
        const typing = setInterval(() => {
          setAiResponse(demoResponse.slice(0, i + 1));
          i++;
          if (i >= demoResponse.length) clearInterval(typing);
        }, 30);
      },
      // Reset
      () => {
        setCurrentStep(0);
        setUserMessage('');
        setAiResponse('');
      },
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      steps[stepIndex]();
      stepIndex = (stepIndex + 1) % steps.length;
    }, 2000);

    // Avvia subito il primo step
    steps[0]();

    return () => clearInterval(interval);
  }, [isAnimating]);

  const flowSteps = [
    {
      id: 1,
      title: 'Frontend',
      subtitle: 'React App',
      icon: Monitor,
      color: 'frontend',
      description: 'L\'utente scrive un messaggio nella chat',
    },
    {
      id: 2,
      title: 'Edge Function',
      subtitle: 'Backend Sicuro',
      icon: Server,
      color: 'edge-function',
      description: 'La richiesta arriva al backend',
    },
    {
      id: 3,
      title: 'Secrets',
      subtitle: 'Chiavi Criptate',
      icon: Key,
      color: 'secrets',
      description: 'Il backend legge la API Key dai secrets',
    },
    {
      id: 4,
      title: 'AI Gateway',
      subtitle: 'OpenAI / Gemini',
      icon: Brain,
      color: 'api-gateway',
      description: 'Chiamata sicura al servizio AI',
    },
    {
      id: 5,
      title: 'Risposta',
      subtitle: 'Streaming',
      icon: Sparkles,
      color: 'accent',
      description: 'L\'AI risponde e il testo appare',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">Esempio Pratico</span>
        </div>
        
        <h2 className="text-2xl font-bold">
          🤖 Come Funziona una Chat AI Sicura
        </h2>
        
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Vediamo passo passo cosa succede quando invii un messaggio a un assistente AI 
          come <strong>ChatGPT</strong> o <strong>Gemini</strong>. 
          Il concetto è identico a quello che abbiamo visto prima!
        </p>
      </div>

      {/* Simulazione Chat */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">💬 Simulazione Chat AI</h3>
            <p className="text-sm text-muted-foreground">Guarda il flusso in azione</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Chat Preview */}
          <div className="rounded-lg bg-muted/30 p-4 space-y-3">
            <div className="text-xs text-muted-foreground mb-2">Anteprima Chat</div>
            
            {/* User message */}
            <div className={`
              flex justify-end transition-all duration-300
              ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}
            `}>
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 max-w-[80%]">
                <p className="text-sm">{userMessage || '...'}</p>
              </div>
            </div>

            {/* AI response */}
            {currentStep >= 5 && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-3 h-3 text-api-gateway" />
                    <span className="text-xs text-api-gateway font-medium">AI</span>
                  </div>
                  <p className="text-sm">{aiResponse}</p>
                </div>
              </div>
            )}

            {/* Loading indicator */}
            {currentStep >= 2 && currentStep < 5 && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {currentStep === 2 && 'Invio al backend...'}
                      {currentStep === 3 && 'Autenticazione...'}
                      {currentStep === 4 && 'Elaborazione AI...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Flow Steps */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground mb-2">Flusso Tecnico</div>
            {flowSteps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all duration-500
                  ${currentStep === step.id ? `bg-${step.color}/20 border border-${step.color}/50 scale-[1.02]` : 'bg-muted/20'}
                  ${currentStep > step.id ? 'opacity-50' : ''}
                `}
                style={{
                  backgroundColor: currentStep === step.id ? `hsl(var(--${step.color}) / 0.15)` : undefined,
                  borderColor: currentStep === step.id ? `hsl(var(--${step.color}) / 0.5)` : 'transparent',
                }}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    transition-all duration-300
                    ${currentStep === step.id ? 'animate-pulse' : ''}
                  `}
                  style={{ 
                    backgroundColor: `hsl(var(--${step.color}) / 0.2)`,
                  }}
                >
                  <step.icon 
                    className="w-4 h-4" 
                    style={{ color: `hsl(var(--${step.color}))` }} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{step.title}</span>
                    <span className="text-xs text-muted-foreground">• {step.subtitle}</span>
                  </div>
                  {currentStep === step.id && (
                    <p className="text-xs text-muted-foreground animate-fade-in">
                      {step.description}
                    </p>
                  )}
                </div>
                {currentStep > step.id && (
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Codice Reale */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Frontend Code */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setShowCode(showCode === 'frontend' ? null : 'frontend')}
            className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-frontend/20 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-frontend" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">📱 Codice Frontend</h4>
                <p className="text-sm text-muted-foreground">React/TypeScript</p>
              </div>
            </div>
            <Code className="w-5 h-5 text-muted-foreground" />
          </button>
          
          {showCode === 'frontend' && (
            <div className="p-4 border-t border-border bg-muted/20 animate-fade-in">
              <pre className="text-xs font-mono overflow-x-auto">
                <code>
{`// Nel componente React
const sendMessage = async (message: string) => {
  // 1. Chiamo l'Edge Function (NON l'AI direttamente!)
  const response = await fetch(
    \`\${SUPABASE_URL}/functions/v1/chat\`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Token PUBBLICO, non la API key!
        'Authorization': \`Bearer \${ANON_KEY}\`
      },
      body: JSON.stringify({ messages: [...] })
    }
  );
  
  // 2. Ricevo la risposta già elaborata
  const data = await response.json();
  return data;
};`}
                </code>
              </pre>
              <div className="mt-3 p-2 rounded bg-accent/10 border border-accent/30">
                <p className="text-xs text-accent">
                  ✅ <strong>Nota:</strong> Il frontend chiama solo l'Edge Function, 
                  MAI l'AI Gateway direttamente!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Backend Code */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setShowCode(showCode === 'backend' ? null : 'backend')}
            className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-edge-function/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-edge-function" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold">⚡ Codice Backend</h4>
                <p className="text-sm text-muted-foreground">Edge Function (Deno)</p>
              </div>
            </div>
            <Code className="w-5 h-5 text-muted-foreground" />
          </button>
          
          {showCode === 'backend' && (
            <div className="p-4 border-t border-border bg-muted/20 animate-fade-in">
              <pre className="text-xs font-mono overflow-x-auto">
                <code>
{`// Edge Function - QUESTO GIRA SUL SERVER
serve(async (req) => {
  const { messages } = await req.json();
  
  // ⭐ MOMENTO CHIAVE: leggo la API Key
  const API_KEY = Deno.env.get("OPENAI_API_KEY");
  //                  ^^^^^^^^^^^^^^^^^^^^^^^^^
  //     La chiave viene dai SECRETS, non dal codice!
  
  // Chiamo OpenAI con la chiave sicura
  const response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      headers: {
        "Authorization": \`Bearer \${API_KEY}\`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages
      })
    }
  );
  
  return new Response(response.body);
});`}
                </code>
              </pre>
              <div className="mt-3 p-2 rounded bg-secrets/10 border border-secrets/30">
                <p className="text-xs text-secrets">
                  🔐 <strong>Sicurezza:</strong> La API Key è letta da Deno.env.get(), 
                  il browser non la vede MAI!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Concetti Chiave */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Perché Questo Pattern è Importante
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-secrets/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-secrets" />
            </div>
            <h4 className="font-medium">🔒 Sicurezza</h4>
            <p className="text-sm text-muted-foreground">
              La tua API Key di OpenAI costa soldi. Se qualcuno la ruba, 
              paga con la tua carta di credito!
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-edge-function/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-edge-function" />
            </div>
            <h4 className="font-medium">⚡ Controllo</h4>
            <p className="text-sm text-muted-foreground">
              Il backend può limitare le richieste, aggiungere logging, 
              e modificare i prompt senza toccare il frontend.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-card/50 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <h4 className="font-medium">🚀 Flessibilità</h4>
            <p className="text-sm text-muted-foreground">
              Puoi cambiare provider (OpenAI → Gemini → Claude) 
              senza modificare una riga di codice frontend!
            </p>
          </div>
        </div>
      </div>

      {/* Servizi AI Supportati */}
      <div className="rounded-xl border border-border bg-card/50 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-api-gateway" />
          Questo Pattern Funziona con Tutti i Servizi AI
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'OpenAI', model: 'GPT-4, GPT-3.5', emoji: '🤖' },
            { name: 'Google', model: 'Gemini Pro', emoji: '🔮' },
            { name: 'Anthropic', model: 'Claude 3', emoji: '🧠' },
            { name: 'Lovable AI', model: 'Gateway Unificato', emoji: '💜' },
          ].map((service) => (
            <div key={service.name} className="p-3 rounded-lg bg-muted/30 text-center">
              <div className="text-2xl mb-1">{service.emoji}</div>
              <p className="font-medium text-sm">{service.name}</p>
              <p className="text-xs text-muted-foreground">{service.model}</p>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4 text-center">
          🎯 <strong>Il concetto è sempre lo stesso:</strong> API Key nel backend, 
          mai nel frontend. Cambia solo l'URL dell'endpoint!
        </p>
      </div>
    </div>
  );
};