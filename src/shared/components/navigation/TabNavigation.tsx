import { cn } from "@/lib/utils";
import { tabButtonStyles, activeIndicatorStyles } from "./styles";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="flex items-center justify-around border-b border-border">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(tabButtonStyles({ active: isActive }))}
          >
            {tab}

            {isActive && <span className={activeIndicatorStyles()} />}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;
