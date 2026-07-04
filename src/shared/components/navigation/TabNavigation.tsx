import { cn } from "@/lib/utils";
import { appearance, layout, navigationTab, textElement } from "@/styles";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav
      className={cn(layout({ align: "center", direction: "row" }), appearance({ border: "full" }))}
    >
      <div className={cn(layout({ align: "around" }), "w-full")}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                navigationTab({ active: isActive }),
                textElement({ textSize: "sm", fontWeight: "semibold" }),
                "px-6 py-4",
              )}
            >
              {tab}

              {isActive && <span className={cn(navigationTab({ indicator: "bar" }))} />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
export default TabNavigation;
