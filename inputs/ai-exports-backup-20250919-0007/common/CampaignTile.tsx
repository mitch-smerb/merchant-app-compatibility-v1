interface CampaignTileProps {
  value: number;
  label: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}

const colorVariants = {
  primary: {
    bg: 'bg-[#334bc1]/10',
    text: 'text-primary'
  },
  secondary: {
    bg: 'bg-[#30CCD5]/10',
    text: 'text-secondary'
  },
  success: {
    bg: 'bg-[#22c55e]/10',
    text: 'text-[#22c55e]'
  },
  warning: {
    bg: 'bg-[#f59e0b]/10',
    text: 'text-[#f59e0b]'
  }
};

export function CampaignTile({ value, label, color }: CampaignTileProps) {
  const variant = colorVariants[color];
  
  return (
    <div className={`flex items-center justify-between ${variant.bg} rounded-[8px] px-3 py-2`}>
      <div>
        <h4 className={`${variant.text} tabular-nums`}>
          {value}
        </h4>
        <p className="text-foreground/70 text-[11px]">{label}</p>
      </div>
    </div>
  );
}