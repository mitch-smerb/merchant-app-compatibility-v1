import { ReactNode } from 'react';

interface ScreenLayoutProps {
  children: ReactNode;
}

export function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <div className="min-h-screen bg-background w-full mx-auto relative pb-20" style={{ color: 'var(--foreground)' }}>
      {children}
    </div>
  );
}

interface ScreenContentProps {
  children: ReactNode;
}

export function ScreenContent({ children }: ScreenContentProps) {
  return (
    <div className="px-6 sm:px-8 lg:px-12 py-8 space-y-6">
      {children}
    </div>
  );
}