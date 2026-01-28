import { useState, useEffect } from 'react';
import { Lock, Unlock, Eye, EyeOff, ShieldCheck, AlertTriangle } from 'lucide-react';

/*
  ====================================
  COMPONENTE: SecurityFlow
  ====================================
  
  Visualizza perché la API key deve stare nei secrets
  e non nel codice frontend.
*/

interface SecurityFlowProps {
  isAnimating: boolean;
}

export const SecurityFlow = ({ isAnimating }: SecurityFlowProps) => {
  const [showBadExample, setShowBadExample] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setShowBadExample(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Esempio SBAGLIATO */}
      <div className={`
        rounded-xl border-2 p-6 transition-all duration-500
        ${showBadExample ? 'border-destructive bg-destructive/5 scale-105' : 'border-border bg-card opacity-50'}
      `}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-bold text-destructive">❌ SBAGLIATO</h3>
            <p className="text-sm text-muted-foreground">API Key nel Frontend</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
            <p className="text-muted-foreground">// Nel codice React</p>
            <p>const API_KEY = <span className="text-destructive">"sk-secret123..."</span></p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
            <Eye className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Visibile a tutti!</p>
              <p className="text-xs text-muted-foreground">
                Chiunque può aprire DevTools → Network e vedere la chiave
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10">
            <Unlock className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">Può essere rubata</p>
              <p className="text-xs text-muted-foreground">
                Un malintenzionato può usare la tua chiave e farti pagare
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Esempio CORRETTO */}
      <div className={`
        rounded-xl border-2 p-6 transition-all duration-500
        ${!showBadExample ? 'border-accent bg-accent/5 scale-105' : 'border-border bg-card opacity-50'}
      `}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-accent">✅ CORRETTO</h3>
            <p className="text-sm text-muted-foreground">API Key nei Secrets</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 font-mono text-sm">
            <p className="text-muted-foreground">// Nell'Edge Function</p>
            <p>const key = <span className="text-accent">Deno.env.get("API_KEY")</span></p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
            <EyeOff className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent">Invisibile al client</p>
              <p className="text-xs text-muted-foreground">
                Il codice dell'Edge Function non viene mai inviato al browser
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10">
            <Lock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-accent">Criptata e sicura</p>
              <p className="text-xs text-muted-foreground">
                I secrets sono criptati e accessibili solo dal backend
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
