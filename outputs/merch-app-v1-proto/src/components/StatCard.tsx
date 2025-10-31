import { ReactNode } from 'react';
import { InsightBadge } from './InsightBadge';

interface StatCardProps {
  title: string;
  value: string;
  insight?: string;
  insightColor?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'yellow';
  children?: ReactNode;
  dataId?: string;
}

export function StatCard({ title, value, insight, insightColor = 'blue', children, dataId }: StatCardProps) {
  return (
    <div className="bg-card shadow-sm border border-border rounded-[16px]" data-id={dataId}>
      <div className="pb-0 px-8 pt-8">
        <h4 className="text-card-title">{title}</h4>
      </div>
      <div className={`${children ? "pt-12" : "pt-0"} px-8 pb-8`}>
        {value && (
          <div className="mb-6">
            <h1 className="text-stat-large tabular-nums">{value}</h1>
          </div>
        )}
        {children}
        {insight && (
          <div className="flex items-start">
            <InsightBadge text={insight} color={insightColor} />
          </div>
        )}
      </div>
    </div>
  );
}