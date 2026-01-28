import { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, EyeOff, ShieldCheck, AlertTriangle, User, Bot, CreditCard, Globe, Server, Code, Search, DollarSign, Shield, ChevronDown, ChevronUp } from 'lucide-react';

/*
  ====================================
  COMPONENTE: SecurityFlow (Enhanced)
  ====================================
  
  Versione migliorata con spiegazioni dettagliate,
  scenari concreti e analogie per principianti assoluti.
*/

interface SecurityFlowProps {
  isAnimating: boolean;
}

export const SecurityFlow = ({ isAnimating }: SecurityFlowProps) => {
  const [showBadExample, setShowBadExample] = useState(true);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);
  const [attackStep, setAttackStep] = useState(0);

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setShowBadExample(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // Animazione dell'attacco
  useEffect(() => {
    if (!isAnimating || !showBadExample) {
      setAttackStep(0);
      return;
    }
    
    const steps = [0, 1, 2, 3];
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setAttackStep(currentStep);
    }, 1000);

    return () => clearInterval(interval);
  }, [isAnimating, showBadExample]);

  return (
    <div className="space-y-8">
      {/* Intro esplicativa */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 border border-warning/30">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <span className="text-sm font-medium text-warning">Concetto Fondamentale di Sicurezza</span>
        </div>
        
        <h2 className="text-2xl font-bold">
          🔐 Dove Metti la Chiave API Cambia Tutto
        </h2>
        
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Una <strong>API Key</strong> è come la password del tuo account bancario. 
          Se qualcuno la trova, può usare il servizio <strong>a tue spese</strong>.
          Vediamo la differenza tra metterla nel posto sbagliato vs quello giusto.
        </p>
      </div>

      {/* Analogia del mondo reale */}
      <div className="rounded-xl border border-border bg-card/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">🏠 Analogia: La Chiave di Casa</h3>
            <p className="text-sm text-muted-foreground">Per capire meglio, pensa a questo scenario...</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="font-medium text-destructive mb-2">❌ Cosa fai di sbagliato:</p>
            <p className="text-sm text-muted-foreground">
              Appendi la chiave di casa <strong>fuori dalla porta</strong> con un cartello 
              "Ecco la mia chiave!" → Chiunque passa può entrare.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <p className="font-medium text-accent mb-2">✅ Cosa fai di giusto:</p>
            <p className="text-sm text-muted-foreground">
              Tieni la chiave <strong>in tasca</strong> e apri tu la porta quando serve 
              → Solo tu puoi entrare.
            </p>
          </div>
        </div>
      </div>

      {/* Confronto principale con dettagli migliorati */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Esempio SBAGLIATO */}
        <div className={`
          rounded-xl border-2 p-6 transition-all duration-500
          ${showBadExample ? 'border-destructive bg-destructive/5 scale-[1.02]' : 'border-border bg-card opacity-60'}
        `}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-destructive">❌ SBAGLIATO</h3>
              <p className="text-sm text-muted-foreground">API Key scritta nel codice Frontend</p>
            </div>
          </div>

          {/* Spiegazione del contesto */}
          <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>📍 Dove siamo:</strong> Nel codice che gira nel <span className="text-frontend font-medium">browser dell'utente</span>
            </p>
          </div>

          <div className="space-y-4">
            {/* Codice con evidenziazione animata della chiave */}
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm relative overflow-hidden">
              <p className="text-muted-foreground mb-2">// ⚠️ Questo codice è visibile a TUTTI</p>
              <p className="text-muted-foreground">// Nel file React/JavaScript</p>
              <div className="relative">
                <p>const API_KEY = <span className={`
                  font-bold transition-all duration-500
                  ${attackStep >= 3 ? 'text-destructive animate-pulse bg-destructive/30 px-1 rounded' : 'text-destructive'}
                `}>"sk-secret123..."</span></p>
                {/* Indicatore visivo del furto */}
                {attackStep >= 3 && (
                  <div className="absolute -right-2 top-0 animate-bounce">
                    <span className="text-lg">👀</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-muted-foreground">// Poi lo uso per chiamare l'AI</p>
              <p>fetch(url, {'{'} headers: {'{'} Authorization: API_KEY {'}'} {'}'})</p>
              
              {/* Effetto scanning */}
              {attackStep >= 2 && attackStep < 3 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-destructive/20 to-transparent animate-scan pointer-events-none" />
              )}
            </div>

            {/* Visualizzazione dell'attacco MIGLIORATA */}
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 relative overflow-hidden">
              <p className="text-sm font-semibold text-destructive mb-4">🎬 Simulazione Attacco in Tempo Reale:</p>
              
              {/* Timeline visiva */}
              <div className="relative">
                {/* Linea di connessione verticale */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-muted-foreground/20">
                  <div 
                    className="w-full bg-destructive transition-all duration-500 ease-out"
                    style={{ height: `${Math.min(attackStep * 33.33, 100)}%` }}
                  />
                </div>
                
                <div className="space-y-4 relative">
                  {/* Step 1 */}
                  <div className={`
                    flex items-center gap-4 p-3 rounded-lg transition-all duration-500
                    ${attackStep >= 1 ? 'bg-destructive/20 scale-[1.02]' : 'bg-muted/20'}
                  `}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      transition-all duration-500 relative
                      ${attackStep >= 1 ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/50' : 'bg-muted text-muted-foreground'}
                    `}>
                      {attackStep >= 1 ? (
                        <User className="w-5 h-5 animate-pulse" />
                      ) : (
                        <span>1</span>
                      )}
                      {attackStep === 1 && (
                        <span className="absolute -inset-1 rounded-full border-2 border-destructive animate-ping" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${attackStep >= 1 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        Un hacker visita il tuo sito
                      </p>
                      {attackStep >= 1 && (
                        <p className="text-xs text-muted-foreground animate-fade-in">
                          Si comporta come un utente normale...
                        </p>
                      )}
                    </div>
                    {attackStep >= 1 && (
                      <span className="text-xl animate-bounce">🥷</span>
                    )}
                  </div>
                  
                  {/* Step 2 */}
                  <div className={`
                    flex items-center gap-4 p-3 rounded-lg transition-all duration-500
                    ${attackStep >= 2 ? 'bg-destructive/20 scale-[1.02]' : 'bg-muted/20'}
                  `}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      transition-all duration-500 relative
                      ${attackStep >= 2 ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/50' : 'bg-muted text-muted-foreground'}
                    `}>
                      {attackStep >= 2 ? (
                        <Search className="w-5 h-5 animate-pulse" />
                      ) : (
                        <span>2</span>
                      )}
                      {attackStep === 2 && (
                        <span className="absolute -inset-1 rounded-full border-2 border-destructive animate-ping" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${attackStep >= 2 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        Preme F12 → Apre DevTools → Network
                      </p>
                      {attackStep >= 2 && (
                        <p className="text-xs text-muted-foreground animate-fade-in">
                          Inizia a cercare tra le richieste...
                        </p>
                      )}
                    </div>
                    {attackStep >= 2 && (
                      <kbd className="px-2 py-1 rounded bg-muted text-xs font-mono animate-pulse">F12</kbd>
                    )}
                  </div>
                  
                  {/* Step 3 - TROVATO! */}
                  <div className={`
                    flex items-center gap-4 p-3 rounded-lg transition-all duration-500
                    ${attackStep >= 3 ? 'bg-destructive/30 scale-[1.02] border border-destructive animate-pulse' : 'bg-muted/20'}
                  `}>
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                      transition-all duration-500 relative
                      ${attackStep >= 3 ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/50' : 'bg-muted text-muted-foreground'}
                    `}>
                      {attackStep >= 3 ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <span>3</span>
                      )}
                      {attackStep === 3 && (
                        <>
                          <span className="absolute -inset-1 rounded-full border-2 border-destructive animate-ping" />
                          <span className="absolute -inset-2 rounded-full border border-destructive/50 animate-ping" style={{ animationDelay: '0.2s' }} />
                        </>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${attackStep >= 3 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        🚨 TROVATO! Vede la tua API Key!
                      </p>
                      {attackStep >= 3 && (
                        <div className="mt-1 p-2 rounded bg-background/50 border border-destructive animate-fade-in">
                          <code className="text-xs text-destructive font-mono">
                            Authorization: "sk-secret123..."
                          </code>
                        </div>
                      )}
                    </div>
                    {attackStep >= 3 && (
                      <span className="text-2xl">💀</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Alert finale */}
              {attackStep >= 3 && (
                <div className="mt-4 p-3 rounded-lg bg-destructive/40 border border-destructive text-center animate-fade-in">
                  <p className="text-sm font-bold text-destructive-foreground">
                    ⚠️ GAME OVER - La tua chiave è stata rubata!
                  </p>
                </div>
              )}
            </div>

            {/* Conseguenze */}
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
                <Eye className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">👁️ Visibile a CHIUNQUE</p>
                  <p className="text-xs text-muted-foreground">
                    Tutto il codice frontend viene scaricato nel browser. 
                    Basta premere F12 per vederlo!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
                <DollarSign className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive">💸 Fatture salate</p>
                  <p className="text-xs text-muted-foreground">
                    L'hacker usa la tua chiave per fare migliaia di richieste. 
                    Tu paghi il conto!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Esempio CORRETTO */}
        <div className={`
          rounded-xl border-2 p-6 transition-all duration-500
          ${!showBadExample ? 'border-accent bg-accent/5 scale-[1.02]' : 'border-border bg-card opacity-60'}
        `}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-accent">✅ CORRETTO</h3>
              <p className="text-sm text-muted-foreground">API Key salvata nei Secrets del server</p>
            </div>
          </div>

          {/* Spiegazione del contesto */}
          <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>📍 Dove siamo:</strong> Nel codice che gira sul <span className="text-edge-function font-medium">server (Edge Function)</span>
            </p>
          </div>

          <div className="space-y-4">
            {/* Codice con spiegazione */}
            <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
              <p className="text-muted-foreground mb-2">// ✅ Questo codice è INVISIBILE agli utenti</p>
              <p className="text-muted-foreground">// Nell'Edge Function (server)</p>
              <p>const key = <span className="text-accent font-bold">Deno.env.get("API_KEY")</span></p>
              <p className="mt-2 text-muted-foreground">// Il valore viene letto dai secrets</p>
              <p>fetch(url, {'{'} headers: {'{'} Authorization: key {'}'} {'}'})</p>
            </div>

            {/* Come funziona */}
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
              <p className="text-sm font-semibold text-accent mb-3">🔒 Come funziona la protezione:</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">1</div>
                  <Server className="w-4 h-4 text-accent" />
                  <span className="text-sm">La chiave sta nel server, non nel browser</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded bg-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">2</div>
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-sm">È criptata e inaccessibile dall'esterno</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded bg-accent/10">
                  <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">3</div>
                  <EyeOff className="w-4 h-4 text-accent" />
                  <span className="text-sm">Nessuno può vederla, neanche con DevTools!</span>
                </div>
              </div>
            </div>

            {/* Vantaggi */}
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
                <EyeOff className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent">🙈 Invisibile al client</p>
                  <p className="text-xs text-muted-foreground">
                    Il codice dell'Edge Function non viene MAI inviato al browser. 
                    Resta sul server!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
                <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-accent">🔄 Facile da aggiornare</p>
                  <p className="text-xs text-muted-foreground">
                    Se la chiave viene compromessa, la cambi nel pannello secrets 
                    senza toccare il codice!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sezione: Cos'è DevTools */}
      <div className="rounded-xl border border-border bg-card/50 p-6">
        <button 
          onClick={() => setExpandedScenario(expandedScenario === 'devtools' ? null : 'devtools')}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <Code className="w-5 h-5 text-warning" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold">🔍 Cos'è DevTools e come si usa?</h3>
              <p className="text-sm text-muted-foreground">Clicca per scoprire come gli hacker trovano le chiavi</p>
            </div>
          </div>
          {expandedScenario === 'devtools' ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        
        {expandedScenario === 'devtools' && (
          <div className="mt-4 pt-4 border-t border-border space-y-4 fade-in">
            <p className="text-sm text-muted-foreground">
              <strong>DevTools</strong> (Strumenti di Sviluppo) è integrato in ogni browser moderno. 
              Basta premere <kbd className="px-2 py-1 rounded bg-muted text-xs font-mono">F12</kbd> per aprirlo.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <div className="text-3xl mb-2">🖥️</div>
                <p className="font-medium text-sm">Tab "Elements"</p>
                <p className="text-xs text-muted-foreground">Vede tutto l'HTML della pagina</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 text-center border border-destructive/30">
                <div className="text-3xl mb-2">🌐</div>
                <p className="font-medium text-sm text-destructive">Tab "Network"</p>
                <p className="text-xs text-muted-foreground">Vede TUTTE le richieste HTTP, incluse le API Key!</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 text-center">
                <div className="text-3xl mb-2">📝</div>
                <p className="font-medium text-sm">Tab "Sources"</p>
                <p className="text-xs text-muted-foreground">Vede tutto il codice JavaScript</p>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive">
                ⚠️ <strong>Conclusione:</strong> Qualsiasi cosa metti nel frontend è pubblica. 
                Tratta il frontend come una vetrina: tutti possono guardarci dentro!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Riepilogo finale */}
      <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">🎓</span> Regola d'Oro da Ricordare
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="font-medium text-destructive">❌ MAI mettere nel Frontend:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                API Keys private (es. sk-abc123...)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                Password di database
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                Token di autenticazione admin
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                Qualsiasi dato che costa soldi se rubato
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <p className="font-medium text-accent">✅ SEMPRE mettere nei Secrets:</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Chiavi API di servizi a pagamento
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Credenziali di servizi esterni
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Token JWT segreti
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Qualsiasi cosa sensibile o costosa
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
