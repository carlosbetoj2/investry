import { cn } from "@/lib/utils";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex items-center justify-around border-b border-border">
      {tabs.map((tab) => {
        const active = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative px-6 py-4 text-sm font-semibold transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
            {active && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;