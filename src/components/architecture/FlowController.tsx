import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

/*
  ====================================
  COMPONENTE: FlowController
  ====================================
  
  Controlli per navigare tra i passaggi
  dell'architettura e controllare le animazioni.
*/

interface FlowControllerProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onStepChange: (step: number) => void;
  onPlayPause: () => void;
  onReset: () => void;
}

export const FlowController = ({
  currentStep,
  totalSteps,
  isPlaying,
  onStepChange,
  onPlayPause,
  onReset,
}: FlowControllerProps) => {
  const stepLabels = [
    'Frontend',
    'Edge Function',
    'Secrets',
    'AI Gateway',
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress bar */}
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2">
          {stepLabels.map((label, index) => (
            <button
              key={label}
              onClick={() => onStepChange(index)}
              className={`
                text-xs font-medium transition-all
                ${currentStep >= index ? 'text-primary' : 'text-muted-foreground'}
                ${currentStep === index ? 'scale-110' : ''}
              `}
            >
              {label}
            </button>
          ))}
        </div>
        
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-warning transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Controlli */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={onPlayPause}
          className="w-12 h-12"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => onStepChange(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Step counter */}
      <p className="text-sm text-muted-foreground">
        Passo {currentStep + 1} di {totalSteps}
      </p>
    </div>
  );
};
