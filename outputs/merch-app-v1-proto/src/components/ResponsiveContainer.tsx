import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] mx-auto ${className}`}>
      {children}
    </div>
  );
}