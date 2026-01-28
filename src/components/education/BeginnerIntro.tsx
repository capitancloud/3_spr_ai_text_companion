import { Rocket, Target, AlertTriangle, CheckCircle } from 'lucide-react';

/*
  ====================================
  COMPONENTE: BeginnerIntro
  ====================================
  
  Introduzione per chi parte da zero,
  spiega cosa imparerai e i prerequisiti.
*/

export const BeginnerIntro = () => {
  return (
    <div className="space-y-6">
      {/* Hero intro */}
      <div className="text-center py-8 px-4 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-border">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Rocket className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">
          Benvenuto, Futuro Sviluppatore! 👋
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Questa guida interattiva ti mostrerà <strong>esattamente</strong> come 
          un'applicazione web comunica con un servizio di Intelligenza Artificiale.
          Nessuna esperienza richiesta!
        </p>
      </div>

      {/* Cosa imparerai */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold">🎯 Cosa Imparerai</h3>
          </div>
          <ul className="space-y-2">
            {[
              'Come un\'app web è divisa in Frontend e Backend',
              'Perché le API key devono stare al sicuro',
              'Come i dati viaggiano dal tuo browser all\'AI',
              'Come proteggere le informazioni sensibili',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <h3 className="font-semibold">⚠️ Errore Comune da Evitare</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Molti principianti fanno questo errore:
          </p>
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 font-mono text-sm">
            <p className="text-destructive">// ❌ MAI fare così!</p>
            <p>const API_KEY = "sk-abc123..."</p>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Mettere la chiave API nel codice frontend significa che 
            <strong className="text-destructive"> chiunque può rubarla</strong>!
          </p>
        </div>
      </div>

      {/* Come usare questa guida */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-xl">🧭</span> Come Usare Questa Guida
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="text-center p-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-2">1</div>
            <p className="text-sm text-muted-foreground">
              Premi <strong>▶️ Play</strong> per vedere l'animazione automatica
            </p>
          </div>
          <div className="text-center p-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-2">2</div>
            <p className="text-sm text-muted-foreground">
              Usa le <strong>frecce ◀ ▶</strong> per andare passo dopo passo
            </p>
          </div>
          <div className="text-center p-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-2">3</div>
            <p className="text-sm text-muted-foreground">
              Esplora le <strong>3 sezioni</strong> in alto per approfondire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
