import { useState, useEffect, useRef } from "react";
import { Menu, X, Target, Settings, Receipt, Play, HelpCircle, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "./ThemeToggle";

const menuItems = [
  { 
    name: "Campaign Center", 
    icon: Target, 
    available: false,
    iconColor: "#334bc1",
    bgColor: "bg-[#334bc1]/5"
  },
  { 
    name: "Incentives Controller", 
    icon: Settings, 
    available: true,
    iconColor: "#30CCD5",
    bgColor: "bg-[#30CCD5]/5"
  },
  { 
    name: "Billing", 
    icon: Receipt, 
    available: true,
    iconColor: "#22c55e",
    bgColor: "bg-[#22c55e]/5"
  },
  { 
    name: "Demo", 
    icon: Play, 
    available: false,
    iconColor: "#f59e0b",
    bgColor: "bg-[#f59e0b]/5"
  },
  { 
    name: "FAQ", 
    icon: HelpCircle, 
    available: false,
    iconColor: "#9333ea",
    bgColor: "bg-[#9333ea]/5"
  }
];

interface HamburgerMenuProps {
  onNavigate?: (screen: string) => void;
}

export function HamburgerMenu({ onNavigate }: HamburgerMenuProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.available && onNavigate) {
      onNavigate(item.name);
      setIsOpen(false);
    } else {
      toast.success(`${item.name} coming soon...`, {
        duration: 2000,
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[44px] h-[44px] -m-2 rounded-[8px] hover:bg-accent/50 transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6" style={{ color: 'var(--primary)' }} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 transition-opacity" />
      )}

      {/* Slide-out Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] lg:w-[360px] bg-card shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-border">
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: '18px' }}>
            Menu
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-[44px] h-[44px] -m-2 rounded-[8px] hover:bg-accent/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleMenuItemClick(item)}
                className={`w-full px-6 sm:px-8 py-3 text-left hover:bg-accent/50 transition-colors min-h-[60px] sm:min-h-[70px] flex items-center justify-between group ${
                  !item.available ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] flex items-center justify-center ${item.bgColor}`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: item.iconColor }} />
                  </div>
                  <span style={{ 
                    color: 'var(--foreground)',
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: '16px'
                  }}>
                    {item.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.available && (
                    <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
                  )}
                  <ChevronRight className="w-4 h-4 group-hover:text-primary transition-colors" style={{ color: 'var(--muted-foreground)' }} />
                </div>
              </button>
            );
          })}
          
          {/* Theme Toggle */}
          <div className="px-0 py-2 border-t border-border mt-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 border-t border-border bg-muted/50">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded mr-2"></div>
            <span style={{ 
              color: 'var(--muted-foreground)',
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '12px'
            }}>
              Plink Merchant App V1
            </span>
          </div>
        </div>
      </div>
    </>
  );
}