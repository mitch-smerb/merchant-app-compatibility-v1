import { ReactNode } from 'react';

interface StatTileProps {
  value: string;
  label: string;
  dataId?: string;
  variant?: 'default' | 'small' | 'colored';
  color?: string;
  trend?: {
    icon: ReactNode;
    value: string;
    isPositive: boolean;
  };
}

export function StatTile({ value, label, dataId, variant = 'default', color, trend }: StatTileProps) {
  const getValueSize = () => {
    switch (variant) {
      case 'small':
        return 'text-[18px]';
      case 'colored':
        return 'text-[20px]';
      default:
        return 'text-[24px]';
    }
  };

  const getLabelSize = () => {
    switch (variant) {
      case 'colored':
        return 'text-[11px]';
      default:
        return 'text-[12px]';
    }
  };

  const getValueColor = () => {
    if (variant === 'colored' && color) {
      return `text-[${color}]`;
    }
    return 'text-primary';
  };

  return (
    <div 
      className={`bg-muted rounded-[12px] ${variant === 'colored' ? 'p-3' : 'p-4'}`} 
      data-id={dataId}
    >
      {trend ? (
        <div className="flex items-center justify-between mb-1">
          <span className={`${getValueColor()} font-['Montserrat'] font-bold ${getValueSize()} leading-none tabular-nums`}>
            {value}
          </span>
          <div className="flex items-center">
            {trend.icon}
            <span className={`${trend.isPositive ? 'text-[#22c55e]' : 'text-[#ef4444]'} font-['Open_Sans'] text-[11px] font-medium`}>
              {trend.value}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-primary font-['Montserrat'] font-bold text-[18px] leading-none mb-2 tabular-nums">
          {value}
        </div>
      )}
      <p className={`text-muted-foreground font-['Open_Sans'] ${getLabelSize()} leading-tight`}>
        {label}
      </p>
    </div>
  );
}