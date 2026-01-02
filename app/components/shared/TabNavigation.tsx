"use client";

import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: "default" | "compact" | "rounded";
  className?: string;
}

const TabNavigation = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  variant = "default",
  className = "" 
}: TabNavigationProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "flex gap-1",
          tab: "px-2 py-1 text-xs",
          active: "bg-purple-600/40 border-purple-400 text-white",
          inactive: "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
        };
      case "rounded":
        return {
          container: "flex gap-3",
          tab: "px-4 py-2 text-sm rounded-full",
          active: "bg-purple-600 text-white shadow-lg",
          inactive: "bg-white/10 text-white/70 hover:bg-white/15"
        };
      default:
        return {
          container: "flex gap-2",
          tab: "px-3 py-1 text-xs rounded-full border",
          active: "bg-purple-600/30 border-purple-400 text-white",
          inactive: "bg-white/10 border-white/20 text-white/80 hover:bg-white/15"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${styles.tab} font-semibold transition-all duration-200 ${
            activeTab === tab.id ? styles.active : styles.inactive
          }`}
        >
          {tab.icon && <span className="mr-1">{tab.icon}</span>}
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
};

export default TabNavigation;