import { ReactNode } from 'react';

interface TrendTileProps {
  value: string;
  label: string;
  trend: {
    icon: ReactNode;
    value: string;
    isPositive: boolean;
  };
}

export function TrendTile({ value, label, trend }: TrendTileProps) {
  return (
    <div className="bg-muted rounded-[8px] p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-primary text-[20px] font-bold tabular-nums">
          {value}
        </span>
        <div className="flex items-center">
          {trend.icon}
          <span className={`${trend.isPositive ? 'text-[#22c55e]' : 'text-muted-foreground'} text-[11px] font-medium`}>
            {trend.value}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground text-[11px] leading-tight">
        {label}
      </p>
    </div>
  );
}