import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Code2, Zap, HelpCircle, Brain } from 'lucide-react';
import { ArchitectureDiagram } from '@/components/architecture/ArchitectureDiagram';
import { CodeViewer } from '@/components/architecture/CodeViewer';
import { SecurityFlow } from '@/components/architecture/SecurityFlow';
import { FlowController } from '@/components/architecture/FlowController';
import { DataFlowVisualization } from '@/components/architecture/DataFlowVisualization';
import { BeginnerIntro } from '@/components/education/BeginnerIntro';
import { Glossary } from '@/components/education/Glossary';
import { AIIntegrationDemo } from '@/components/education/AIIntegrationDemo';

/*
  ====================================
  PAGINA: AI Text Companion - Educativo
  ====================================
  
  App educativa per principianti assoluti
  che vogliono capire l'integrazione AI full-stack.
*/

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<'intro' | 'architecture' | 'security' | 'ai-demo' | 'flow'>('intro');
  const totalSteps = 4;

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
    }, 3000);

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
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">AI Text Companion</h1>
                <p className="text-xs text-muted-foreground">Guida Interattiva all'Integrazione AI</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 overflow-x-auto">
              {[
                { id: 'intro', label: 'Introduzione', icon: HelpCircle },
                { id: 'architecture', label: 'Architettura', icon: Code2 },
                { id: 'security', label: 'Sicurezza', icon: BookOpen },
                { id: 'ai-demo', label: 'Demo AI', icon: Brain },
                { id: 'flow', label: 'Flusso', icon: Zap },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id as any)}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
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

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        {/* Glossario sempre visibile */}
        {activeSection !== 'intro' && (
          <div className="mb-6 fade-in">
            <Glossary />
          </div>
        )}

        {/* Controller (non in intro) */}
        {activeSection !== 'intro' && (
          <div className="mb-8 fade-in">
            <FlowController
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              onStepChange={setCurrentStep}
              onPlayPause={() => setIsPlaying(!isPlaying)}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-8">
          {/* INTRO */}
          {activeSection === 'intro' && (
            <section className="fade-in">
              <BeginnerIntro />
              
              {/* CTA per iniziare */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setActiveSection('architecture')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Inizia il Tutorial
                  <Zap className="w-5 h-5" />
                </button>
              </div>
            </section>
          )}

          {/* ARCHITECTURE */}
          {activeSection === 'architecture' && (
            <>
              <section className="rounded-2xl border border-border bg-card p-4 sm:p-6 fade-in">
                <ArchitectureDiagram 
                  activeStep={currentStep} 
                  isAnimating={isPlaying} 
                />
              </section>

              <section className="fade-in">
                <CodeViewer 
                  step={currentStep} 
                  isAnimating={isPlaying} 
                />
              </section>

              {/* Navigazione sezioni */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setActiveSection('security')}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  Vai a: Sicurezza →
                </button>
              </div>
            </>
          )}

          {/* SECURITY */}
          {activeSection === 'security' && (
            <section className="fade-in space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  🔐 Perché la Sicurezza è Importante?
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Se metti la API key nel codice frontend, chiunque può rubarla e usarla a tue spese.
                  Ecco il confronto tra l'approccio sbagliato e quello corretto.
                </p>
              </div>

              <SecurityFlow isAnimating={isPlaying} />
              
              {/* Spiegazione extra per principianti */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <span className="text-xl">🧠</span> Capire la Differenza
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-destructive mb-2">Cosa succede se sbagli?</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span>❌</span>
                        <span>Chiunque può aprire DevTools e vedere la tua API key</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❌</span>
                        <span>I bot automatici scansionano GitHub cercando chiavi esposte</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>❌</span>
                        <span>Potresti ricevere fatture enormi per uso non autorizzato</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-accent mb-2">Cosa succede se fai bene?</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span>✅</span>
                        <span>La chiave è criptata e accessibile solo dal backend</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✅</span>
                        <span>Nessuno può rubarla guardando il codice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>✅</span>
                        <span>Puoi revocarla e cambiarla senza modificare codice</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Navigazione */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setActiveSection('architecture')}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  ← Architettura
                </button>
                <button
                  onClick={() => setActiveSection('ai-demo')}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  Demo AI →
                </button>
              </div>
            </section>
          )}

          {/* AI DEMO */}
          {activeSection === 'ai-demo' && (
            <section className="fade-in space-y-6">
              <AIIntegrationDemo isAnimating={isPlaying} />
              
              {/* Navigazione */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setActiveSection('security')}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  ← Sicurezza
                </button>
                <button
                  onClick={() => setActiveSection('flow')}
                  className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                >
                  Flusso Dati →
                </button>
              </div>
            </section>
          )}

          {/* FLOW */}
          {activeSection === 'flow' && (
            <section className="fade-in space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">
                  🔄 Il Viaggio di un Messaggio
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Segui il percorso completo: da quando premi "Invia" a quando ricevi la risposta dell'AI.
                </p>
              </div>
              
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

              {/* Timeline con spiegazioni dettagliate */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h4 className="font-semibold mb-4">📝 Spiegazione Passo per Passo</h4>
                <div className="space-y-4">
                  {[
                    { 
                      step: 1, 
                      title: 'L\'utente scrive e invia', 
                      desc: 'Il messaggio viene raccolto dal frontend React e preparato per l\'invio.',
                      detail: 'Il frontend usa fetch() per inviare una richiesta HTTP POST al backend.'
                    },
                    { 
                      step: 2, 
                      title: 'L\'Edge Function riceve', 
                      desc: 'Il backend riceve la richiesta e la valida.',
                      detail: 'Controlla che la richiesta sia formattata correttamente e che l\'utente sia autorizzato.'
                    },
                    { 
                      step: 3, 
                      title: 'Recupero della API Key', 
                      desc: 'Il backend legge la chiave segreta dalle variabili d\'ambiente.',
                      detail: 'Deno.env.get("LOVABLE_API_KEY") restituisce la chiave senza esporla.'
                    },
                    { 
                      step: 4, 
                      title: 'Chiamata all\'AI e risposta', 
                      desc: 'Il backend chiama l\'AI con la chiave e inoltra la risposta all\'utente.',
                      detail: 'L\'AI elabora il messaggio e restituisce la risposta che viene mostrata nella chat.'
                    },
                  ].map(({ step, title, desc, detail }) => (
                    <div 
                      key={step}
                      className={`
                        p-4 rounded-lg border transition-all
                        ${currentStep >= step - 1 
                          ? 'border-primary/50 bg-primary/5' 
                          : 'border-border opacity-40'
                        }
                      `}
                    >
                      <div className="flex gap-4">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg
                          ${currentStep >= step - 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                        `}>
                          {step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{title}</p>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                          {currentStep >= step - 1 && (
                            <p className="text-xs text-primary mt-2 p-2 bg-primary/10 rounded">
                              💡 {detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusione */}
              <div className="rounded-xl border-2 border-accent bg-accent/5 p-6 text-center">
                <h4 className="font-bold text-xl mb-2">🎉 Hai Capito!</h4>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Ora sai come un'applicazione web comunica in modo sicuro con un servizio AI.
                  La chiave è sempre: <strong>mai esporre i secrets nel frontend</strong>!
                </p>
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
          <p className="text-xs text-muted-foreground/70 mt-1">
            Creato con ❤️ per i futuri sviluppatori
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
