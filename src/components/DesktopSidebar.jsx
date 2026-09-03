import React from 'react';
import { 
  Home, 
  Layers, 
  Scan, 
  Trash2, 
  User, 
  Leaf, 
  Truck, 
  Sparkles, 
  Building2, 
  Bell, 
  LogOut, 
  ShieldCheck,
  ChevronDown,
  QrCode,
  Printer
} from 'lucide-react';
import { IVECO_UNITS } from '../data/mockData';

export const DesktopSidebar = ({ 
  currentScreen, 
  onNavigate, 
  user, 
  selectedUnit, 
  setSelectedUnit,
  unreadCount = 3 
}) => {
  const navSections = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Início / Dashboard', icon: Home, activeScreens: ['dashboard'] },
        { id: 'notificacoes', label: 'Notificações', icon: Bell, badge: unreadCount, activeScreens: ['notificacoes'] },
        { id: 'impacto_ambiental', label: 'Impacto ESG & CO₂', icon: Leaf, activeScreens: ['impacto_ambiental'] },
        { id: 'inteligencia_rede', label: 'IA Oportunidades', icon: Sparkles, activeScreens: ['inteligencia_rede'] },
      ]
    },
    {
      title: 'Operação & Estoque',
      items: [
        { id: 'estoque_local', label: 'Estoque da Unidade', icon: Layers, activeScreens: ['estoque_local', 'estoque_detalhe', 'adicionar_peca'] },
        { id: 'estoque_rede', label: 'Rede Nacional IVECO', icon: Building2, activeScreens: ['estoque_rede'] },
        { id: 'trocas_lista', label: 'Solicitações de Troca', icon: Truck, badge: 1, activeScreens: ['trocas_lista', 'nova_solicitacao', 'rastreamento_troca'] },
      ]
    },
    {
      title: 'Manufatura Aditiva & 3D',
      items: [
        { id: 'hub_3d', label: 'Célula 3D & Status', icon: Printer, activeScreens: ['hub_3d', 'rastreamento_impressao'] },
        { id: 'catalogo_3d', label: 'Catálogo CAD de Peças', icon: Layers, activeScreens: ['catalogo_3d', 'ordem_impressao_3d'] },
      ]
    },
    {
      title: 'Visão Computacional',
      items: [
        { id: 'scanner_home', label: 'Central do Scanner', icon: Scan, activeScreens: ['scanner_home'] },
        { id: 'scanner_caminhao_live', label: 'Scanner de Caminhões & Avarias', icon: Truck, activeScreens: ['scanner_caminhao_live', 'resultado_caminhao', 'detalhes_componente'] },
        { id: 'scanner_peca_live', label: 'Scanner de Peças & Desgaste', icon: Sparkles, activeScreens: ['scanner_peca_live', 'resultado_peca', 'diagnostico_detalhe', 'decisao_destinacao'] },
        { id: 'qr_code_scanner', label: 'Leitor de QR Code OEM', icon: QrCode, activeScreens: ['qr_code_scanner'] },
      ]
    },
    {
      title: 'Economia Circular & ESG',
      items: [
        { id: 'descarte_central', label: 'Central de Descarte', icon: Trash2, activeScreens: ['descarte_central', 'adicionar_descarte', 'empresas_sustentaveis', 'agendar_coleta', 'confirmacao_coleta', 'rastreamento_descarte', 'certificado_destinacao'] },
      ]
    },
    {
      title: 'Conta & Unidade',
      items: [
        { id: 'perfil', label: 'Meu Perfil', icon: User, activeScreens: ['perfil', 'minha_unidade', 'permissoes', 'configuracoes'] },
      ]
    }
  ];

  return (
    <aside className="w-64 xl:w-72 bg-[#0d1218] border-r border-white/10 flex flex-col justify-between h-full select-none shrink-0 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00e676] to-[#00b359] flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-[#00e676]/20">
            IV
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white tracking-tight leading-none">
              ECOFICINA <span className="text-[#00e676]">2.0</span>
            </h1>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">IVECO Circular Platform</p>
          </div>
        </div>

        {/* Unit Selector Dropdown */}
        <div className="mt-4 p-2.5 rounded-xl bg-[#141b24] border border-white/10">
          <label className="text-[9px] font-bold uppercase text-gray-400 tracking-wider block mb-1">
            Unidade Ativa
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
              <select
                value={selectedUnit?.id || 'sp'}
                onChange={(e) => {
                  const u = IVECO_UNITS.find(unit => unit.id === e.target.value);
                  if (u && setSelectedUnit) setSelectedUnit(u);
                }}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-2"
              >
                {IVECO_UNITS.map(u => (
                  <option key={u.id} value={u.id} className="bg-[#141b24] text-white">
                    {u.name} ({u.state})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="px-3 py-4 space-y-6 flex-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider px-3 mb-1.5">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.activeScreens.includes(currentScreen);

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00e676]/20 to-[#00e676]/5 text-[#00e676] border border-[#00e676]/30 font-bold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00e676]' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#00e676] text-black' : 'bg-white/10 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom User Card & Supabase Status */}
      <div className="p-4 border-t border-white/10 bg-[#0a0e14]/50 space-y-3">
        {/* Supabase Realtime Pill */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#141b24] border border-white/5 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
            <span className="text-[#00e676] font-semibold">Supabase Realtime</span>
          </div>
          <span className="text-gray-400">14 Tabelas</span>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover border border-[#00e676]/40"
            />
            <div className="text-left">
              <h4 className="text-xs font-bold text-white line-clamp-1">{user?.name || 'Gaspar Ricardo Junior'}</h4>
              <p className="text-[10px] text-gray-400 line-clamp-1">{user?.roleTitle || 'Técnico Especialista'}</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
