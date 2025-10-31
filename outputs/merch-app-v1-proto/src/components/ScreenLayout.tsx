import { ReactNode } from 'react';
import { colors } from '../theme';

interface ScreenLayoutProps {
  children: ReactNode;
}

export function ScreenLayout({ children }: ScreenLayoutProps) {
  return (
    <div className="min-h-screen w-full mx-auto relative pb-16 lg:pb-0" style={{ color: colors.text.primary }}>
      {children}
    </div>
  );
}

interface ScreenContentProps {
  children: ReactNode;
}

export function ScreenContent({ children }: ScreenContentProps) {
  return (
    <div className="px-6 sm:px-8 lg:px-12 py-4 space-y-6">
      {children}
    </div>
  );
}