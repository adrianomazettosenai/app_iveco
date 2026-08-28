import React from 'react';

/**
 * Realistic 3D-styled IVECO S-Way Truck graphic
 */
export const IvecoTruckVisual = ({ className = "w-full h-auto", scanning = false, showPins = false, activePin = null, onSelectPin }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2732" />
            <stop offset="40%" stopColor="#0f151c" />
            <stop offset="100%" stopColor="#090d12" />
          </linearGradient>
          <linearGradient id="grilleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121820" />
            <stop offset="50%" stopColor="#090d12" />
            <stop offset="100%" stopColor="#151d27" />
          </linearGradient>
          <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b2e3b" />
            <stop offset="50%" stopColor="#0a1218" />
            <stop offset="100%" stopColor="#13232c" />
          </linearGradient>
          <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0" />
            <stop offset="50%" stopColor="#00e676" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00e676" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ledHeadlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e676" />
            <stop offset="100%" stopColor="#e6fffa" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Ground Glow */}
        <ellipse cx="200" cy="295" rx="160" ry="18" fill="url(#greenGlow)" filter="url(#glowFilter)" />
        <ellipse cx="200" cy="295" rx="180" ry="12" fill="#000000" opacity="0.6" />

        {/* Truck Roof Aerodynamic Cap */}
        <path
          d="M 120 40 Q 200 28 280 40 L 295 70 L 105 70 Z"
          fill="url(#cabinGrad)"
          stroke="#2d3748"
          strokeWidth="1.5"
        />
        {/* Sun Visor / Upper Light Bar */}
        <rect x="110" y="65" width="180" height="8" rx="3" fill="#121820" stroke="#00e676" strokeWidth="0.8" opacity="0.8" />
        <circle cx="140" cy="69" r="2" fill="#00e676" />
        <circle cx="160" cy="69" r="2" fill="#00e676" />
        <circle cx="240" cy="69" r="2" fill="#00e676" />
        <circle cx="260" cy="69" r="2" fill="#00e676" />

        {/* Windshield */}
        <path
          d="M 108 72 L 292 72 L 285 138 L 115 138 Z"
          fill="url(#windshieldGrad)"
          stroke="#1f2937"
          strokeWidth="2"
        />
        {/* Windshield reflection streak */}
        <path d="M 125 76 L 160 76 L 138 132 L 118 132 Z" fill="#ffffff" opacity="0.08" />
        <path d="M 175 76 L 195 76 L 168 132 L 152 132 Z" fill="#ffffff" opacity="0.04" />
        {/* Rearview mirror mounts */}
        <path d="M 100 80 L 80 88 L 78 130 L 92 132 L 95 90 Z" fill="#161e27" stroke="#374151" strokeWidth="1" />
        <path d="M 300 80 L 320 88 L 322 130 L 308 132 L 305 90 Z" fill="#161e27" stroke="#374151" strokeWidth="1" />
        {/* Mirror glass */}
        <rect x="80" y="92" width="10" height="34" rx="2" fill="#1e293b" />
        <rect x="310" y="92" width="10" height="34" rx="2" fill="#1e293b" />

        {/* Main Cabin Body */}
        <path
          d="M 95 138 L 305 138 L 312 250 L 290 270 L 110 270 L 88 250 Z"
          fill="url(#cabinGrad)"
          stroke="#2d3748"
          strokeWidth="1.5"
        />

        {/* Aerodynamic Side Flaps */}
        <path d="M 88 140 L 95 140 L 88 245 L 80 240 Z" fill="#111827" />
        <path d="M 312 140 L 305 140 L 312 245 L 320 240 Z" fill="#111827" />

        {/* IVECO Center Grille - Signature Trapezoid */}
        <path
          d="M 130 148 L 270 148 L 260 230 L 140 230 Z"
          fill="url(#grilleGrad)"
          stroke="#00e676"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Grille Honeycomb / Horizontal Bars */}
        <line x1="134" y1="162" x2="266" y2="162" stroke="#263342" strokeWidth="2.5" />
        <line x1="136" y1="176" x2="264" y2="176" stroke="#263342" strokeWidth="2.5" />
        <line x1="138" y1="190" x2="262" y2="190" stroke="#263342" strokeWidth="2.5" />
        <line x1="140" y1="204" x2="260" y2="204" stroke="#263342" strokeWidth="2.5" />
        <line x1="142" y1="218" x2="258" y2="218" stroke="#263342" strokeWidth="2.5" />

        {/* IVECO Emblem Header Bar */}
        <rect x="135" y="165" width="130" height="20" rx="3" fill="#0b0f14" stroke="#334155" strokeWidth="0.8" />
        <text
          x="200"
          y="180"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="13"
          fontWeight="900"
          letterSpacing="4"
          fontFamily="Outfit, sans-serif"
        >
          IVECO
        </text>

        {/* LED Headlight Units - Left and Right Matrix */}
        {/* Left Headlight */}
        <g>
          <path
            d="M 102 208 L 132 208 L 126 238 L 98 232 Z"
            fill="#090d12"
            stroke="#00e676"
            strokeWidth="1.2"
          />
          {/* Glowing LED V-Shape */}
          <path
            d="M 106 212 L 128 212 L 122 226 L 104 222 Z"
            fill="url(#ledHeadlight)"
            filter="url(#glowFilter)"
            opacity="0.9"
          />
          <circle cx="112" cy="226" r="3" fill="#ffffff" />
          <circle cx="120" cy="227" r="3" fill="#ffffff" />
        </g>

        {/* Right Headlight */}
        <g>
          <path
            d="M 298 208 L 268 208 L 274 238 L 302 232 Z"
            fill="#090d12"
            stroke="#00e676"
            strokeWidth="1.2"
          />
          {/* Glowing LED V-Shape */}
          <path
            d="M 294 212 L 272 212 L 278 226 L 296 222 Z"
            fill="url(#ledHeadlight)"
            filter="url(#glowFilter)"
            opacity="0.9"
          />
          <circle cx="288" cy="226" r="3" fill="#ffffff" />
          <circle cx="280" cy="227" r="3" fill="#ffffff" />
        </g>

        {/* Lower Bumper & Fog Lights */}
        <path
          d="M 90 248 L 310 248 L 300 282 L 100 282 Z"
          fill="#131a22"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        {/* License Plate */}
        <rect x="170" y="258" width="60" height="15" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <rect x="170" y="258" width="60" height="4" fill="#0284c7" />
        <text x="200" y="270" textAnchor="middle" fill="#0f172a" fontSize="7.5" fontWeight="800" fontFamily="monospace">
          IVC-2E24
        </text>

        {/* Front Tires / Wheels Ground View */}
        <rect x="94" y="260" width="22" height="32" rx="4" fill="#0a0a0a" stroke="#1f2937" strokeWidth="1" />
        <rect x="284" y="260" width="22" height="32" rx="4" fill="#0a0a0a" stroke="#1f2937" strokeWidth="1" />
        <line x1="98" y1="270" x2="112" y2="270" stroke="#374151" strokeWidth="1" />
        <line x1="98" y1="280" x2="112" y2="280" stroke="#374151" strokeWidth="1" />
        <line x1="288" y1="270" x2="302" y2="270" stroke="#374151" strokeWidth="1" />
        <line x1="288" y1="280" x2="302" y2="280" stroke="#374151" strokeWidth="1" />

        {/* Green Accent Trim Lines */}
        <path d="M 125 142 L 275 142" stroke="#00e676" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 100 248 L 300 248" stroke="#00e676" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Scanning Overlay Effect */}
        {scanning && (
          <g>
            <rect x="70" y="25" width="260" height="265" rx="12" fill="none" stroke="#00e676" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.6" />
            {/* Viewfinder Corners */}
            <path d="M 65 50 L 65 35 L 80 35" stroke="#00e676" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 335 50 L 335 35 L 320 35" stroke="#00e676" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 65 265 L 65 280 L 80 280" stroke="#00e676" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 335 265 L 335 280 L 320 280" stroke="#00e676" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>

      {/* Interactive Inspection Hotspots / Pins */}
      {showPins && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Motor Pin */}
          <button
            onClick={() => onSelectPin && onSelectPin('motor')}
            className={`absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-transform duration-200 ${
              activePin === 'motor' ? 'bg-[#00e676] text-black ring-4 ring-[#00e676]/40 scale-110' : 'bg-black/75 text-white border border-[#00e676]/60 hover:scale-105'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-ping" />
            <span>Motor</span>
            <span className="text-[10px] text-[#00e676] font-bold">95%</span>
          </button>

          {/* Freios Pin */}
          <button
            onClick={() => onSelectPin && onSelectPin('freios')}
            className={`absolute top-[78%] left-[22%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-transform duration-200 ${
              activePin === 'freios' ? 'bg-yellow-400 text-black ring-4 ring-yellow-400/40 scale-110' : 'bg-black/75 text-white border border-yellow-400/60 hover:scale-105'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span>Freios</span>
            <span className="text-[10px] text-yellow-400 font-bold">65%</span>
          </button>

          {/* Lanterna Pin */}
          <button
            onClick={() => onSelectPin && onSelectPin('lanterna')}
            className={`absolute top-[64%] right-[10%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-transform duration-200 ${
              activePin === 'lanterna' ? 'bg-red-500 text-white ring-4 ring-red-500/40 scale-110' : 'bg-black/75 text-white border border-red-500/60 hover:scale-105'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Lanterna</span>
            <span className="text-[10px] text-red-400 font-bold">Ausente</span>
          </button>

          {/* Suspensão Pin */}
          <button
            onClick={() => onSelectPin && onSelectPin('suspensao')}
            className={`absolute top-[82%] right-[22%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition-transform duration-200 ${
              activePin === 'suspensao' ? 'bg-orange-500 text-white ring-4 ring-orange-500/40 scale-110' : 'bg-black/75 text-white border border-orange-500/60 hover:scale-105'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Suspensão</span>
            <span className="text-[10px] text-orange-400 font-bold">54%</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Realistic 3D Alternator Mechanical Component Graphic
 */
export const AlternatorVisual = ({ className = "w-full h-auto", scanning = false }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        <defs>
          <radialGradient id="metalGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
          <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="aluCasing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Background Ambient Glow */}
        <circle cx="120" cy="120" r="95" fill="#00e676" opacity="0.06" filter="blur(15px)" />

        {/* Outer Mounting Flanges */}
        <path d="M 40 70 L 65 95 L 45 115 Z" fill="url(#aluCasing)" stroke="#475569" strokeWidth="1" />
        <circle cx="48" cy="90" r="5" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
        <path d="M 200 70 L 175 95 L 195 115 Z" fill="url(#aluCasing)" stroke="#475569" strokeWidth="1" />
        <circle cx="192" cy="90" r="5" fill="#0f172a" stroke="#64748b" strokeWidth="1" />

        {/* Bottom Mounting Bracket */}
        <path d="M 85 190 L 155 190 L 145 215 L 95 215 Z" fill="url(#aluCasing)" stroke="#475569" strokeWidth="1" />
        <circle cx="120" cy="202" r="6" fill="#0f172a" stroke="#64748b" strokeWidth="1.2" />

        {/* Main Stator Casing Housing */}
        <circle cx="120" cy="120" r="76" fill="url(#aluCasing)" stroke="#64748b" strokeWidth="2" />

        {/* Stator Copper Coils Visible through Vents */}
        <circle cx="120" cy="120" r="65" fill="none" stroke="url(#copperGrad)" strokeWidth="12" strokeDasharray="8 4" opacity="0.9" />

        {/* Cooling Air Vents & Ribs */}
        <g stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round">
          <line x1="120" y1="58" x2="120" y2="78" />
          <line x1="155" y1="70" x2="142" y2="86" />
          <line x1="178" y1="102" x2="158" y2="108" />
          <line x1="178" y1="138" x2="158" y2="132" />
          <line x1="155" y1="170" x2="142" y2="154" />
          <line x1="120" y1="182" x2="120" y2="162" />
          <line x1="85" y1="170" x2="98" y2="154" />
          <line x1="62" y1="138" x2="82" y2="132" />
          <line x1="62" y1="102" x2="82" y2="108" />
          <line x1="85" y1="70" x2="98" y2="86" />
        </g>

        {/* Front Bearing Hub & Pulley */}
        <circle cx="120" cy="120" r="44" fill="url(#metalGrad)" stroke="#64748b" strokeWidth="1.5" />
        {/* Multi-ribbed V-belt Pulley */}
        <circle cx="120" cy="120" r="34" fill="#1e293b" stroke="#00e676" strokeWidth="1" strokeOpacity="0.8" />
        <circle cx="120" cy="120" r="28" fill="#0f172a" />
        <circle cx="120" cy="120" r="22" fill="#334155" stroke="#475569" strokeWidth="1" />
        
        {/* Center Shaft Nut & Hexagonal Bolt */}
        <polygon points="120,108 129,114 129,126 120,132 111,126 111,114" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="120" cy="120" r="3.5" fill="#0f172a" />

        {/* Green Laser / HUD overlay */}
        {scanning && (
          <g>
            <circle cx="120" cy="120" r="88" fill="none" stroke="#00e676" strokeWidth="1.5" strokeDasharray="12 6" className="animate-spin" style={{ animationDuration: '10s' }} />
            <line x1="30" y1="120" x2="210" y2="120" stroke="#00e676" strokeWidth="1" opacity="0.6" strokeDasharray="4 4" />
            <line x1="120" y1="30" x2="120" y2="210" stroke="#00e676" strokeWidth="1" opacity="0.6" strokeDasharray="4 4" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Realistic 3D Brake Caliper & Ventilated Disc Graphic
 */
export const BrakeDiscVisual = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        <defs>
          <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#334155" />
            <stop offset="70%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="caliperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>
        </defs>

        {/* Rotor Ventilated Disc */}
        <circle cx="120" cy="120" r="92" fill="url(#discGrad)" stroke="#64748b" strokeWidth="2" />
        <circle cx="120" cy="120" r="78" fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.5" />
        <circle cx="120" cy="120" r="64" fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.5" />

        {/* Slotted & Drilled Cooling Holes on Rotor */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 120 120)`}>
            <circle cx="120" cy="45" r="2.2" fill="#0f172a" />
            <circle cx="120" cy="53" r="2.2" fill="#0f172a" />
            <line x1="116" y1="60" x2="124" y2="72" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}

        {/* Center Hub Hat */}
        <circle cx="120" cy="120" r="42" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        {/* Wheel Studs / Lug Holes */}
        {[0, 72, 144, 216, 288].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 120 120)`}>
            <circle cx="120" cy="94" r="5" fill="#090d12" stroke="#64748b" strokeWidth="1.2" />
          </g>
        ))}
        {/* Center Axle Bore */}
        <circle cx="120" cy="120" r="18" fill="#090d12" stroke="#334155" strokeWidth="2" />

        {/* Heavy Duty 4-Piston Caliper (Yellow/Gold Accent) */}
        <path
          d="M 135 30 C 185 35, 205 75, 210 120 L 175 115 C 172 85, 155 60, 125 55 Z"
          fill="url(#caliperGrad)"
          stroke="#fef08a"
          strokeWidth="1.2"
        />
        {/* Caliper Cylinders */}
        <circle cx="170" cy="65" r="8" fill="#713f12" stroke="#eab308" strokeWidth="1" />
        <circle cx="185" cy="95" r="8" fill="#713f12" stroke="#eab308" strokeWidth="1" />
        {/* IVECO Logo on Caliper */}
        <text x="180" y="70" fill="#ffffff" fontSize="7" fontWeight="900" transform="rotate(35 180 70)">
          IVECO
        </text>
      </svg>
    </div>
  );
};

/**
 * Realistic 3D Turbocharger / Compressor Visual
 */
export const TurboCompressorVisual = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        <defs>
          <linearGradient id="snailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="turbineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>

        {/* Exhaust Turbine Housing (Hot Side - Cast Iron / Bronze) */}
        <path
          d="M 60 70 C 30 110, 40 170, 90 190 L 105 155 C 75 140, 70 100, 85 75 Z"
          fill="url(#turbineGrad)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        {/* Wastegate Actuator Cylinder */}
        <rect x="35" y="45" width="22" height="42" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1" transform="rotate(-25 35 45)" />
        <line x1="45" y1="85" x2="65" y2="120" stroke="#94a3b8" strokeWidth="2.5" />

        {/* Center Bearing Housing (CHRA) */}
        <rect x="95" y="95" width="30" height="50" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />

        {/* Cold Compressor Snail Scroll Housing */}
        <path
          d="M 120 70 C 170 40, 210 80, 205 135 C 200 185, 150 200, 115 180 L 125 150 C 150 160, 175 150, 178 120 C 180 90, 150 70, 120 85 Z"
          fill="url(#snailGrad)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* Compressor Air Inlet Bellmouth */}
        <circle cx="150" cy="115" r="32" fill="#0f172a" stroke="#00e676" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Precision Machined Billet Compressor Wheel / Impeller Blades */}
        <circle cx="150" cy="115" r="24" fill="#1e293b" />
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
          <path
            key={deg}
            d="M 150 115 Q 160 105 168 98"
            stroke="#e2e8f0"
            strokeWidth="1.8"
            strokeLinecap="round"
            transform={`rotate(${deg} 150 115)`}
          />
        ))}
        {/* Impeller Shaft Hex Nut */}
        <circle cx="150" cy="115" r="5" fill="#00e676" />
      </svg>
    </div>
  );
};

/**
 * Dealership / Concessionária Facility Vector Art
 */
export const IvecoFacilityVisual = ({ className = "w-full h-auto" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden rounded-xl ${className}`}>
      <svg viewBox="0 0 360 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a1017" />
            <stop offset="60%" stopColor="#141f2c" />
            <stop offset="100%" stopColor="#1a2b3c" />
          </linearGradient>
          <linearGradient id="bldgGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0f2035" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Night Sky Background */}
        <rect width="360" height="180" fill="url(#skyGrad)" />

        {/* Distant Trees & Horizon */}
        <path d="M 0 135 Q 90 125 180 135 T 360 135 L 360 180 L 0 180 Z" fill="#0a1017" />

        {/* Showroom Building */}
        <rect x="40" y="55" width="220" height="90" rx="4" fill="#111822" stroke="#253446" strokeWidth="1.5" />
        {/* Glass Showroom Curtain Wall */}
        <rect x="50" y="70" width="130" height="70" rx="2" fill="url(#bldgGlass)" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="82" y1="70" x2="82" y2="140" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
        <line x1="115" y1="70" x2="115" y2="140" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />
        <line x1="148" y1="70" x2="148" y2="140" stroke="#38bdf8" strokeWidth="0.8" opacity="0.3" />

        {/* IVECO Illuminated Sign on Showroom Header */}
        <rect x="50" y="48" width="80" height="18" rx="2" fill="#000000" stroke="#00e676" strokeWidth="1" />
        <text x="90" y="61" textAnchor="middle" fill="#00e676" fontSize="10" fontWeight="900" letterSpacing="2" fontFamily="Outfit, sans-serif">
          IVECO
        </text>

        {/* Service Workshop Bay Doors */}
        <rect x="190" y="80" width="30" height="60" rx="2" fill="#182330" stroke="#334155" strokeWidth="1" />
        <line x1="190" y1="95" x2="220" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="190" y1="110" x2="220" y2="110" stroke="#334155" strokeWidth="1" />
        <line x1="190" y1="125" x2="220" y2="125" stroke="#334155" strokeWidth="1" />

        <rect x="225" y="80" width="30" height="60" rx="2" fill="#182330" stroke="#334155" strokeWidth="1" />
        <line x1="225" y1="95" x2="255" y2="95" stroke="#334155" strokeWidth="1" />
        <line x1="225" y1="110" x2="255" y2="110" stroke="#334155" strokeWidth="1" />
        <line x1="225" y1="125" x2="255" y2="125" stroke="#334155" strokeWidth="1" />

        {/* Tall Pylon / Totem Sign at Front */}
        <rect x="290" y="30" width="16" height="120" rx="3" fill="#090d14" stroke="#334155" strokeWidth="1" />
        <rect x="286" y="35" width="24" height="35" rx="3" fill="#000000" stroke="#00e676" strokeWidth="1.2" />
        <text x="298" y="55" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="900" letterSpacing="1">
          IVECO
        </text>
        <circle cx="298" cy="63" r="2" fill="#00e676" />

        {/* Asphalt Ground & Green Parking Marking */}
        <rect x="0" y="145" width="360" height="35" fill="#090e15" />
        <line x1="20" y1="145" x2="340" y2="145" stroke="#00e676" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
};
