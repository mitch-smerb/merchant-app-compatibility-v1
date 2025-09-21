interface ProgressBarProps {
  primaryPercentage: number;
  secondaryPercentage: number;
  primaryLabel: string;
  secondaryLabel: string;
  showTick?: boolean;
}

export function ProgressBar({ 
  primaryPercentage, 
  secondaryPercentage, 
  primaryLabel, 
  secondaryLabel, 
  showTick = true 
}: ProgressBarProps) {
  return (
    <div className="mb-2">
      <div className="relative">
        {/* Percentage label positioned above the tick mark */}
        {showTick && (
          <div 
            className="absolute -top-9 transform -translate-x-1/2 z-10" 
            style={{ left: `${primaryPercentage}%` }}
          >
            <p style={{ color: 'var(--primary)' }}>{primaryPercentage}%</p>
          </div>
        )}
        
        {/* Small tick mark at the dividing line - only above the bar */}
        {showTick && (
          <div 
            className="absolute -top-3 w-0.5 h-3 bg-primary transform -translate-x-1/2 z-10" 
            style={{ left: `${primaryPercentage}%` }}
          ></div>
        )}
        
        {/* Segmented progress bar */}
        <div className="w-full bg-muted rounded-[12px] h-4 flex overflow-hidden">
          <div 
            className="bg-primary" 
            style={{ width: `${primaryPercentage}%` }}
          ></div>
          <div 
            className="bg-muted-foreground/30" 
            style={{ width: `${secondaryPercentage}%` }}
          ></div>
        </div>
        
        {/* Labels positioned below the progress bar */}
        <div className="flex justify-between items-center mt-2">
          <p style={{ color: 'var(--foreground)' }}>{primaryLabel}</p>
          <p style={{ color: 'var(--foreground)' }}>{secondaryLabel}</p>
        </div>
      </div>
    </div>
  );
}