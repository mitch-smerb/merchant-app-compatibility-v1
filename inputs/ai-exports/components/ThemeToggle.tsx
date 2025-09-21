import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getNextTheme = () => {
    switch (theme) {
      case "light":
        return "dark";
      case "dark":
        return "system";
      case "system":
        return "light";
      default:
        return "light";
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      case "system":
        return "System";
      default:
        return "Light";
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(getNextTheme())}
      className="h-9 w-full justify-start gap-3 px-6 py-3 font-['Open_Sans'] font-medium text-[16px] sm:text-[18px] hover:bg-accent/50"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[8px] bg-muted flex items-center justify-center">
        {getThemeIcon()}
      </div>
      <span style={{ color: 'var(--foreground)' }}>Theme: {getThemeLabel()}</span>
    </Button>
  );
}