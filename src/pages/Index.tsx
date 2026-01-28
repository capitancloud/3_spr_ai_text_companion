import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Code2, Zap } from 'lucide-react';
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram';
import { CodeViewer } from '@/components/architecture/CodeViewer';
import { SecurityFlow } from '@/components/architecture/SecurityFlow';
import { FlowController } from '@/components/architecture/FlowController';
import { DataFlowVisualization } from '@/components/architecture/DataFlowVisualization';

/*
  ====================================
  PAGINA: AI Text Companion - Educativo
  ====================================
  
  Questa app è progettata per INSEGNARE come funziona
  l'integrazione di un'API AI in un'applicazione full-stack.
  
  NON è una chat funzionante, ma una visualizzazione
  interattiva dell'architettura.
*/

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<'architecture' | 'security' | 'flow'>('architecture');
  const totalSteps = 4;

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">AI Text Companion</h1>
                <p className="text-xs text-muted-foreground">Impara l'integrazione AI Full-Stack</p>
              </div>
            </div>

            {/* Navigation tabs */}
            <nav className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              {[
                { id: 'architecture', label: 'Architettura', icon: Code2 },
                { id: 'security', label: 'Sicurezza', icon: BookOpen },
                { id: 'flow', label: 'Flusso Dati', icon: Zap },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id as any)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                    ${activeSection === id 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Intro */}
        <div className="text-center mb-8 fade-in">
          <h2 className="text-3xl font-bold mb-3">
            Come Funziona un'Integrazione AI
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scopri passo dopo passo come un'applicazione web comunica in modo sicuro 
            con un servizio AI, proteggendo le API key sensibili.
          </p>
        </div>

        {/* Controller */}
        <div className="mb-8 fade-in stagger-1">
          <FlowController
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onStepChange={setCurrentStep}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onReset={handleReset}
          />
        </div>

        {/* Content based on active section */}
        <div className="space-y-8">
          {activeSection === 'architecture' && (
            <>
              {/* Architecture Diagram */}
              <section className="rounded-2xl border border-border bg-card p-6 fade-in stagger-2">
                <ArchitectureDiagram 
                  activeStep={currentStep} 
                  isAnimating={isPlaying} 
                />
              </section>

              {/* Code Viewer */}
              <section className="fade-in stagger-3">
                <CodeViewer 
                  step={currentStep} 
                  isAnimating={isPlaying} 
                />
              </section>
            </>
          )}

          {activeSection === 'security' && (
            <section className="fade-in">
              <h3 className="text-xl font-bold mb-6 text-center">
                Perché la API Key va nei Secrets?
              </h3>
              <SecurityFlow isAnimating={isPlaying} />
              
              {/* Additional explanation */}
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <h4 className="font-semibold mb-4">📚 Riassunto Sicurezza</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-primary mb-2">Frontend (Client)</p>
                    <p className="text-sm text-muted-foreground">
                      Tutto il codice qui è PUBBLICO. Chiunque può vederlo con DevTools.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-secondary mb-2">Edge Function (Server)</p>
                    <p className="text-sm text-muted-foreground">
                      Codice PRIVATO che gira sui server. Solo qui puoi usare secrets.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="font-medium text-warning mb-2">Secrets (Vault)</p>
                    <p className="text-sm text-muted-foreground">
                      Variabili criptate accessibili solo dal backend. Mai nel codice!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'flow' && (
            <section className="fade-in">
              <h3 className="text-xl font-bold mb-6 text-center">
                Flusso Completo: Richiesta e Risposta
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border bg-card p-6">
                  <DataFlowVisualization 
                    activeStep={currentStep} 
                    direction="request" 
                  />
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                  <DataFlowVisualization 
                    activeStep={currentStep} 
                    direction="response" 
                  />
                </div>
              </div>

              {/* Timeline explanation */}
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <h4 className="font-semibold mb-4">⏱️ Cosa succede in ogni passo</h4>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Utente invia messaggio', desc: 'Il frontend raccoglie il messaggio e lo invia all\'Edge Function via HTTP POST.' },
                    { step: 2, title: 'Edge Function elabora', desc: 'Valida la richiesta, recupera la API key dai secrets, prepara il payload.' },
                    { step: 3, title: 'Accesso ai Secrets', desc: 'Deno.env.get() recupera la chiave criptata. Mai esposta al client!' },
                    { step: 4, title: 'Chiamata all\'AI Gateway', desc: 'L\'Edge Function chiama l\'AI con la chiave segreta, riceve lo stream e lo inoltra.' },
                  ].map(({ step, title, desc }) => (
                    <div 
                      key={step}
                      className={`
                        flex gap-4 p-3 rounded-lg transition-all
                        ${currentStep >= step - 1 ? 'bg-primary/10' : 'opacity-40'}
                      `}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold
                        ${currentStep >= step - 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                      `}>
                        {step}
                      </div>
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            🎓 Progetto educativo per imparare l'integrazione AI full-stack
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
