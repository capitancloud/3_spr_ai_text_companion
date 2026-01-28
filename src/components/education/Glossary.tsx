import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

/*
  ====================================
  COMPONENTE: Glossary
  ====================================
  
  Glossario espandibile con tutti i termini
  tecnici usati nell'app, spiegati semplicemente.
*/

const terms = [
  {
    term: 'Frontend',
    definition: 'La parte dell\'applicazione che vedi nel browser. È il codice che gira sul TUO computer.',
    example: 'Quando clicchi un bottone o scrivi in un campo, stai interagendo con il frontend.',
  },
  {
    term: 'Backend',
    definition: 'La parte dell\'applicazione che gira su un server remoto. L\'utente non la vede mai direttamente.',
    example: 'Quando il tuo messaggio viene elaborato dall\'AI, questo succede nel backend.',
  },
  {
    term: 'API (Application Programming Interface)',
    definition: 'Un "contratto" che definisce come due programmi possono comunicare tra loro.',
    example: 'È come un menu del ristorante: ti dice cosa puoi ordinare e in che formato.',
  },
  {
    term: 'API Key',
    definition: 'Una password speciale che identifica la tua applicazione quando chiama un servizio esterno.',
    example: 'È come la tessera della biblioteca: ti identifica e tiene traccia di cosa fai.',
  },
  {
    term: 'Edge Function',
    definition: 'Codice che gira su un server "vicino" all\'utente, molto veloce e sicuro.',
    example: 'È come un cameriere: prende il tuo ordine e lo porta alla cucina (l\'AI).',
  },
  {
    term: 'Secret / Environment Variable',
    definition: 'Un valore sensibile (come una password) salvato in modo sicuro nel server.',
    example: 'È come la combinazione della cassaforte: solo il personale autorizzato la conosce.',
  },
  {
    term: 'HTTP Request',
    definition: 'Un messaggio che il browser invia a un server per chiedere o inviare dati.',
    example: 'È come spedire una lettera: ha un mittente, destinatario e contenuto.',
  },
  {
    term: 'JSON',
    definition: 'Un formato per scrivere dati in modo leggibile sia da umani che da computer.',
    example: '{ "nome": "Mario", "età": 30 } - È come una scheda con informazioni strutturate.',
  },
];

export const Glossary = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const toggleTerm = (term: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
    }
    setExpandedTerms(newExpanded);
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header cliccabile */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold">📖 Glossario dei Termini</h3>
            <p className="text-sm text-muted-foreground">
              Non conosci un termine? Clicca qui!
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Lista termini */}
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-2">
          {terms.map(({ term, definition, example }) => (
            <div key={term} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggleTerm(term)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
              >
                <span className="font-medium text-sm">{term}</span>
                {expandedTerms.has(term) ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              
              {expandedTerms.has(term) && (
                <div className="px-3 pb-3 space-y-2">
                  <p className="text-sm text-muted-foreground">{definition}</p>
                  <div className="flex items-start gap-2 p-2 rounded bg-accent/10">
                    <span className="text-xs">💡</span>
                    <p className="text-xs text-accent">{example}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
