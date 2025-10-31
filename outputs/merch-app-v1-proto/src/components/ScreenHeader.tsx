import { ReactNode } from 'react';
import { HamburgerMenu } from './HamburgerMenu';
import { colors } from '../theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  neighborhood?: string;
  icon?: ReactNode;
  onNavigate?: (tab: string) => void;
}

export function ScreenHeader({ title, subtitle, neighborhood, icon, onNavigate }: ScreenHeaderProps) {
  const getDynamicSubtitle = () => {
    if (title === "Area Reach" && neighborhood) {
      return `${neighborhood} & Nearby Neighborhoods`;
    }
    if (title === "Neighborhood Reach" && neighborhood) {
      const possessive = (name: string) => name.endsWith('s') ? `${name}'` : `${name}'s`;
      return `Reaching ${possessive(neighborhood)} best Local Shoppers`;
    }
    return subtitle || '';
  };
  return (
    <div className="bg-card px-6 sm:px-8 lg:px-12 pt-4 pb-3 shadow-sm border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-primary font-['Montserrat'] font-semibold text-[20px]">Plink.</span>
        <HamburgerMenu onNavigate={onNavigate} />
      </div>

      <h2 style={{ color: colors.text.primary }} className="font-['Montserrat'] font-semibold text-[24px] sm:text-[28px] mb-2">{title}</h2>

      {(subtitle || neighborhood) && (
        <p style={{ color: 'var(--muted-foreground)' }} className="flex items-center">
          {icon && <span className="mr-1">{icon}</span>}
          <span>{getDynamicSubtitle()}</span>
        </p>
      )}
    </div>
  );
}