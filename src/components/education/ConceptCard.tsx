import { HelpCircle, Lightbulb } from 'lucide-react';

/*
  ====================================
  COMPONENTE: ConceptCard
  ====================================
  
  Card che spiega un concetto tecnico
  con analogie del mondo reale.
*/

interface ConceptCardProps {
  term: string;
  definition: string;
  analogy: string;
  icon: React.ReactNode;
  color: string;
}

export const ConceptCard = ({ 
  term, 
  definition, 
  analogy, 
  icon, 
  color 
}: ConceptCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `hsl(var(--${color}) / 0.2)` }}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-lg">{term}</h4>
          <p className="text-sm text-muted-foreground">{definition}</p>
        </div>
      </div>

      {/* Analogia */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 mt-3">
        <Lightbulb className="w-4 h-4 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-warning mb-1">Analogia</p>
          <p className="text-sm text-muted-foreground">{analogy}</p>
        </div>
      </div>
    </div>
  );
};
