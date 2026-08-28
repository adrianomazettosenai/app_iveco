import React from 'react';
import { 
  Bell, 
  Search, 
  Plus, 
  Scan, 
  ShieldCheck, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const DesktopHeader = ({ 
  currentScreen, 
  onNavigate, 
  user, 
  selectedUnit,
  unreadCount = 3 
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard': return 'Visão Geral da Oficina';
      case 'notificacoes': return 'Central de Notificações';
      case 'historico': return 'Histórico de Atividades & Peças';
      case 'impacto_ambiental': return 'Indicadores de Sustentabilidade & ESG';
      case 'inteligencia_rede': return 'Oportunidades & IA da Rede IVECO';
      case 'estoque_local': return 'Estoque Local da Unidade';
      case 'estoque_rede': return 'Rede Nacional de Peças IVECO';
      case 'estoque_detalhe': return 'Detalhes do Componente';
      case 'adicionar_peca': return 'Cadastro de Nova Peça no Estoque';
      case 'trocas_lista': return 'Solicitações de Troca na Rede';
      case 'nova_solicitacao': return 'Nova Solicitação de Peça';
      case 'rastreamento_troca': return 'Rastreamento Logístico da Peça';
      case 'scanner_home': return 'Central de Visão Computacional & Scanner';
      case 'scanner_caminhao_live': return 'Scanner de Caminhões: Modelo & Avarias';
      case 'resultado_caminhao': return 'Relatório de Inspeção do Caminhão';
      case 'scanner_peca_live': return 'Scanner de Peças: Diagnóstico por IA';
      case 'resultado_peca': return 'Diagnóstico da Peça & Compatibilidade';
      case 'qr_code_scanner': return 'Leitor de QR Code OEM';
      case 'descarte_central': return 'Central de Descarte Sustentável';
      case 'perfil': return 'Perfil do Técnico & Permissões';
      default: return 'ECOFICINA IVECO 2.0';
    }
  };

  return (
    <header className="h-16 px-6 bg-[#0d1218]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between select-none z-10 shrink-0">
      {/* Screen Title & Breadcrumb */}
      <div>
        <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>{getScreenTitle()}</span>
          <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full border border-[#00e676]/30">
            {selectedUnit?.name || 'IVECO SP'}
          </span>
        </h2>
      </div>

      {/* Right Controls & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Action: Cadastrar Peça */}
        <button
          onClick={() => onNavigate('adicionar_peca')}
          className="px-3.5 py-1.5 rounded-xl bg-[#00e676] text-black font-bold text-xs flex items-center gap-1.5 hover:brightness-110 shadow-sm shadow-[#00e676]/20 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Cadastrar Peça</span>
        </button>

        {/* Quick Action: Scanner */}
        <button
          onClick={() => onNavigate('scanner_home')}
          className="px-3.5 py-1.5 rounded-xl bg-[#141b24] border border-[#00e676]/30 text-[#00e676] hover:border-[#00e676] font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Scan className="w-3.5 h-3.5" />
          <span>Scanner & IA</span>
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => onNavigate('notificacoes')}
          className="relative p-2 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 hover:text-white hover:border-[#00e676]/40 transition-all"
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00e676] text-black text-[9px] font-extrabold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
