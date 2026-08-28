import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#05070a] flex items-center justify-center p-0 sm:p-4 md:p-8 font-sans select-none">
      {/* Smartphone Chassis Container */}
      <div className="w-full sm:max-w-[400px] h-[100dvh] sm:h-[844px] bg-[#0a0e14] sm:rounded-[48px] sm:border-[9px] sm:border-[#1e2632] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col relative overflow-hidden ring-1 ring-black/80">
        
        {/* iOS Dynamic Island & Status Bar */}
        <div className="h-11 w-full bg-[#0a0e14] shrink-0 flex items-center justify-between px-7 pt-1 z-30 select-none">
          {/* Time */}
          <span className="text-xs font-semibold text-white tracking-tight font-mono">
            09:41
          </span>

          {/* Dynamic Island Pill */}
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0d1218] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]/60 animate-pulse" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#1e293b]" />
          </div>

          {/* Icons: Signal, Wifi, Battery */}
          <div className="flex items-center gap-1.5 text-white">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="w-5 h-2.5 border border-white/80 rounded-sm p-0.5 flex items-center">
              <div className="h-full w-full bg-[#00e676] rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Screen Viewport Container */}
        <div className="flex-1 w-full relative overflow-hidden flex flex-col bg-[#0a0e14]">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="h-4 w-full bg-[#0d1218] shrink-0 flex items-center justify-center z-30">
          <div className="w-32 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};
