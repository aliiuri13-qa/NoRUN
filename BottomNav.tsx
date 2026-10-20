import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isWorkoutActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  isWorkoutActive = false,
}) => {
  const navItems: { id: TabType; label: string; icon: string; badge?: boolean }[] = [
    { id: 'hoje', label: 'Hoje', icon: 'fitness_center' },
    { id: 'treino', label: 'Treino', icon: 'local_fire_department', badge: isWorkoutActive },
    { id: 'resultados', label: 'Resultados', icon: 'emoji_events' },
    { id: 'historico', label: 'Histórico', icon: 'history' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#080e1b]/92 backdrop-blur-xl border-t border-white/5 shadow-[0_-2px_16px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-4 items-center h-16 px-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
                isActive
                  ? 'text-[#00d2ff] font-semibold'
                  : 'text-[#859399] hover:text-[#dde2f5]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px] transition-transform duration-200"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-[#69f6b9] animate-pulse shadow-[0_0_8px_#69f6b9]" />
                )}
              </div>
              <span
                className={`font-label-caps text-[10px] tracking-wider mt-0.5 uppercase transition-colors ${
                  isActive ? 'text-[#00d2ff] font-bold' : 'text-[#859399]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#00d2ff] rounded-full shadow-[0_0_8px_#00d2ff]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
