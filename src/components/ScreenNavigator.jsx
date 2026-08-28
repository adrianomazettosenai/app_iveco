import React, { useState } from 'react';
import { 
  Grid, 
  X, 
  Search, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Camera, 
  Trash2, 
  User, 
  Home,
  CheckCircle2
} from 'lucide-react';

export const ScreenNavigator = ({ currentScreen, onSelectScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const screenGroups = [
    {
      category: '1. Autenticação & Onboarding',
      icon: ShieldCheck,
      color: '#00e676',
      screens: [
        { id: 'splash', name: '1. Splash / Apresentação Hero' },
        { id: 'login', name: '2. Login Corporativo' },
        { id: 'cadastro_1', name: '3. Cadastro 1/3 — Dados Pessoais' },
        { id: 'cadastro_2', name: '4. Cadastro 2/3 — Seleção de Unidade' },
        { id: 'cadastro_3', name: '5. Cadastro 3/3 — Unidade Vinculada' }
      ]
    },
    {
      category: '2. Dashboard, Notificações & ESG',
      icon: Home,
      color: '#38bdf8',
      screens: [
        { id: 'dashboard', name: '6. Dashboard Principal (Início)' },
        { id: 'notificacoes', name: '7. Central de Notificações' },
        { id: 'historico', name: '8. Histórico de Movimentações' },
        { id: 'impacto_ambiental', name: '9. Economia Circular & Impacto ESG' },
        { id: 'inteligencia_rede', name: '10. Inteligência entre Unidades' }
      ]
    },
    {
      category: '3. Scanner com IA & Diagnóstico',
      icon: Camera,
      color: '#00e676',
      screens: [
        { id: 'scanner_home', name: '11. Scanner — Seleção de Função' },
        { id: 'scanner_caminhao_live', name: '12. Scanner de Caminhão (Câmera Live)' },
        { id: 'analise_caminhao_loading', name: '13. Análise Neural do Caminhão' },
        { id: 'resultado_caminhao', name: '14. Resultado do Caminhão' },
        { id: 'detalhes_componente', name: '15. Detalhes do Componente / Freios' },
        { id: 'scanner_peca_live', name: '16. Scanner de Peça (Câmera Live)' },
        { id: 'qr_code_scanner', name: '17. Leitor de QR Code' },
        { id: 'analise_peca_loading', name: '18. Análise da Peça por IA' },
        { id: 'resultado_peca', name: '19. Resultado da Peça' },
        { id: 'diagnostico_detalhado', name: '20. Diagnóstico Técnico Detalhado' },
        { id: 'decisao_destino', name: '21. Recomendação de Destino (4 Destinos)' }
      ]
    },
    {
      category: '4. Estoque & Trocas entre Unidades',
      icon: Layers,
      color: '#eab308',
      screens: [
        { id: 'estoque_local', name: '22. Estoque da Minha Unidade' },
        { id: 'estoque_rede', name: '23. Busca de Peças na Rede IVECO' },
        { id: 'estoque_detalhe', name: '24. Detalhes da Peça no Estoque' },
        { id: 'adicionar_peca', name: '25. Cadastrar Peça no Estoque' },
        { id: 'disponibilizar_troca', name: '26. Disponibilizar Peça para Troca' },
        { id: 'trocas_lista', name: '27. Lista de Trocas / Solicitações' },
        { id: 'nova_solicitacao', name: '28. Nova Solicitação de Peça' },
        { id: 'rastreamento_troca', name: '29. Fluxo e Rastreamento da Troca (6 Etapas)' }
      ]
    },
    {
      category: '5. Descarte Sustentável & ESG',
      icon: Trash2,
      color: '#f97316',
      screens: [
        { id: 'descarte_central', name: '30. Central de Descarte Sustentável' },
        { id: 'adicionar_descarte', name: '31. Cadastrar Item para Descarte' },
        { id: 'empresas_sustentaveis', name: '32. Empresas de Destinação Homologadas' },
        { id: 'agendar_coleta', name: '33. Agendamento de Coleta' },
        { id: 'confirmacao_coleta', name: '34. Confirmação da Coleta Agendada' },
        { id: 'rastreamento_descarte', name: '35. Rastreamento do Ciclo de Descarte' },
        { id: 'certificado_destinacao', name: '36. Certificado Oficial de Destinação ESG' }
      ]
    },
    {
      category: '6. Perfil, Unidade & Configurações',
      icon: User,
      color: '#a855f7',
      screens: [
        { id: 'perfil', name: '37. Perfil do Técnico' },
        { id: 'minha_unidade', name: '38. Minha Concessionária IVECO' },
        { id: 'permissoes', name: '39. Níveis de Permissão por Perfil' },
        { id: 'configuracoes', name: '40. Configurações do Aplicativo' }
      ]
    }
  ];

  return (
    <>
      {/* Floating Presentation Navigator Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#141b24]/95 hover:bg-[#1a2430] border border-[#00e676]/50 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="w-6 h-6 rounded-full bg-[#00e676] text-black flex items-center justify-center font-bold text-xs">
            38
          </div>
          <span className="text-xs font-bold text-[#00e676] group-hover:text-white">
            Navegador de Telas
          </span>
          <Grid className="w-4 h-4 text-gray-400 group-hover:text-[#00e676]" />
        </button>
      </div>

      {/* Modal / Drawer of all 38 Screens */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-2xl max-h-[88vh] bg-[#0d1218] border border-white/15 rounded-3xl p-5 flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                  <h2 className="text-base font-extrabold text-white">
                    Navegador de Telas — ECOFICINA IVECO 2.0
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Acesse instantaneamente qualquer uma das telas do ecossistema
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter */}
            <div className="relative my-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nome da tela ou número..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            {/* Screens Grid List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {screenGroups.map((grp, gIdx) => {
                const Icon = grp.icon;
                const filteredScreens = grp.screens.filter(s =>
                  s.name.toLowerCase().includes(search.toLowerCase()) ||
                  s.id.toLowerCase().includes(search.toLowerCase())
                );

                if (filteredScreens.length === 0) return null;

                return (
                  <div key={gIdx} className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <Icon className="w-4 h-4" style={{ color: grp.color }} />
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                        {grp.category}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {filteredScreens.map((s) => {
                        const isCurrent = currentScreen === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => {
                              onSelectScreen(s.id);
                              setIsOpen(false);
                            }}
                            className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                              isCurrent
                                ? 'bg-gradient-to-r from-[#17251d] to-[#121c16] border-[#00e676] text-[#00e676] font-bold shadow-sm shadow-[#00e676]/20'
                                : 'bg-[#141b24] border-white/5 text-gray-300 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <span className="line-clamp-1">{s.name}</span>
                            {isCurrent ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 text-center flex items-center justify-between text-xs text-gray-400">
              <span>Proporção Mobile iOS (9:19.5) • Alta Fidelidade</span>
              <button
                onClick={() => {
                  onSelectScreen('dashboard');
                  setIsOpen(false);
                }}
                className="text-[#00e676] font-semibold hover:underline"
              >
                Ir para o Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
