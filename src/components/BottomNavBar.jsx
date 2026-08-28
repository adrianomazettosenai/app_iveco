import React from 'react';
import { Home, Scan, Layers, Trash2, User } from 'lucide-react';

export const BottomNavBar = ({ activeTab, onSelectTab, unreadNotifCount = 3, pendingExchanges = 1 }) => {
  const navItems = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'estoque', label: 'Estoque', icon: Layers, badge: pendingExchanges },
    { id: 'scanner', label: 'Scanner', icon: Scan, isSpecial: true },
    { id: 'descarte', label: 'Descarte', icon: Trash2 },
    { id: 'perfil', label: 'Perfil', icon: User }
  ];

  return (
    <nav className="relative z-20 bg-[#0d1218]/95 backdrop-blur-xl border-t border-white/10 px-3 pt-2 pb-3.5 sm:pb-2 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="relative -top-3 flex flex-col items-center group focus:outline-none"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                isActive 
                  ? 'bg-gradient-to-tr from-[#00e676] to-[#00b359] text-black shadow-[#00e676]/40 scale-105 ring-4 ring-[#00e676]/20' 
                  : 'bg-gradient-to-tr from-[#16221c] to-[#121a22] text-[#00e676] border border-[#00e676]/40 hover:border-[#00e676] hover:scale-105'
              }`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className={`text-[10px] font-semibold mt-0.5 tracking-tight transition-colors ${
                isActive ? 'text-[#00e676] font-bold' : 'text-gray-400 group-hover:text-gray-200'
              }`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className="flex flex-col items-center py-1 px-3 relative group focus:outline-none transition-transform active:scale-95"
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-colors duration-200 ${
                isActive ? 'text-[#00e676] stroke-[2.4]' : 'text-gray-400 group-hover:text-gray-200 stroke-[1.8]'
              }`} />
              {item.badge && item.badge > 0 && !isActive && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#00e676]" />
              )}
            </div>
            <span className={`text-[10px] mt-1 tracking-tight transition-colors duration-200 ${
              isActive ? 'text-[#00e676] font-bold' : 'text-gray-400 group-hover:text-gray-200 font-medium'
            }`}>
              {item.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#00e676] mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
