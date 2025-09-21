import { Check } from 'lucide-react';

interface InsightBadgeProps {
  text: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'yellow';
}

const colorVariants = {
  blue: {
    bg: 'bg-[#eff6ff] dark:bg-[#2563eb]/10',
    textColor: '#1d4ed8',
    textColorDark: '#2563eb',
    iconColor: '#2563eb'
  },
  green: {
    bg: 'bg-[#f0fdf4] dark:bg-[#15803d]/10',
    textColor: '#166534',
    textColorDark: '#15803d',
    iconColor: '#15803d'
  },
  purple: {
    bg: 'bg-[#faf5ff] dark:bg-[#9333ea]/10',
    textColor: '#7c3aed',
    textColorDark: '#9333ea',
    iconColor: '#9333ea'
  },
  orange: {
    bg: 'bg-[#fffbeb] dark:bg-[#d97706]/10',
    textColor: '#92400e',
    textColorDark: '#d97706',
    iconColor: '#d97706'
  },
  cyan: {
    bg: 'bg-[#ecfeff] dark:bg-[#0891b2]/10',
    textColor: '#0f766e',
    textColorDark: '#0891b2',
    iconColor: '#0891b2'
  },
  yellow: {
    bg: 'bg-[#fef3c7] dark:bg-[#d97706]/10',
    textColor: '#92400e',
    textColorDark: '#d97706',
    iconColor: '#d97706'
  }
};

export function InsightBadge({ text, color }: InsightBadgeProps) {
  const variant = colorVariants[color];
  
  return (
    <div className={`inline-flex items-start ${variant.bg} rounded-full px-4 py-3`}>
      <Check 
        className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" 
        style={{ color: variant.iconColor }}
      />
      <span 
        className="leading-tight"
        style={{ 
          color: variant.textColor,
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '13px'
        }}
      >
        {text}
      </span>
    </div>
  );
}