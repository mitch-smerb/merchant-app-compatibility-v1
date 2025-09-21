import { TrendingUp, Target, ShoppingBag } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'audience' | 'zone' | 'shoppers';
  onNavigate?: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onNavigate }: BottomNavigationProps) {
  const tabs = [
    {
      id: 'audience',
      label: 'Area',
      icon: TrendingUp,
      navigationTarget: 'Area Reach'
    },
    {
      id: 'zone',
      label: 'Neighborhood',
      icon: Target,
      navigationTarget: 'Neighborhood Reach'
    },
    {
      id: 'shoppers',
      label: 'Shoppers',
      icon: ShoppingBag,
      navigationTarget: 'Current Shoppers'
    }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] bg-card border-t border-border px-6 sm:px-8 lg:px-12 py-3">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          if (isActive) {
            return (
              <div key={tab.id} className="flex flex-col items-center min-h-[44px] justify-center">
                <Icon className="w-6 h-6 mb-1" style={{ color: 'var(--primary)' }} />
                <span 
                  style={{ 
                    color: 'var(--primary)',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '12px'
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          }
          
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate?.(tab.navigationTarget)}
              className="flex flex-col items-center min-h-[44px] justify-center"
            >
              <Icon className="w-6 h-6 mb-1" style={{ color: 'var(--muted-foreground)' }} />
              <span 
                style={{ 
                  color: 'var(--muted-foreground)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '12px'
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}