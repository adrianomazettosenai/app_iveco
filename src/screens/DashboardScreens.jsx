import React, { useState } from 'react';
import { 
  Bell, 
  Layers, 
  RefreshCw, 
  Recycle, 
  Trash2, 
  Leaf, 
  Truck, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Award, 
  ChevronLeft,
  Filter,
  Check,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { 
  NOTIFICATIONS, 
  HISTORY_ITEMS, 
  AI_SUGGESTIONS, 
  CIRCULAR_ECONOMY_METRICS 
} from '../data/mockData';
import { 
  getNotifications, 
  markAllNotificationsAsRead, 
  getHistory, 
  getCircularMetrics, 
  getAiSuggestions 
} from '../services/supabaseService';
import { useEffect } from 'react';

/**
 * 6. DASHBOARD PRINCIPAL (INÍCIO)
 */
export const DashboardScreen = ({ user, unit, onNavigate }) => {
  const currentUnit = unit || { name: 'IVECO São Paulo', city: 'São Paulo', state: 'SP', totalStock: 128, availableForExchange: 42, reusedParts: 87, awaitingDisposal: 16, co2AvoidedKg: 1250, openRequests: 7 };
  const [unreadCount, setUnreadCount] = useState(3);
  const [recentActivities, setRecentActivities] = useState(NOTIFICATIONS);

  useEffect(() => {
    getNotifications('sp').then(data => {
      if (data && data.length > 0) {
        setUnreadCount(data.filter(n => n.unread).length);
        setRecentActivities(data.slice(0, 5));
      }
    });
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] overflow-y-auto pb-6">
      {/* Top Bar */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between sticky top-0 bg-[#0a0e14]/90 backdrop-blur-md z-10">
        <div>
          <h1 className="text-xl font-extrabold text-white">Início</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
            <span className="text-[10px] font-semibold text-[#00e676]">Supabase Online</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate('notificacoes')}
          className="relative p-2 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 hover:text-white hover:border-[#00e676]/40 transition-all"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00e676] text-black text-[10px] font-extrabold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Greeting Header */}
      <div className="px-5 mt-2">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141c26] to-[#0f1620] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00e676]" />
              <span className="text-xs font-bold text-[#00e676] uppercase tracking-wider">
                {currentUnit.name}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Bom dia, {user?.name?.split(' ')[0] || 'Técnico'}!
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Plataforma conectada • 6 unidades ativas na rede
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-3 translate-y-3 w-28 h-28 bg-[#00e676]/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>

      {/* AI Smart Suggestion Pill / Banner */}
      <div className="px-5 mt-3">
        <button
          onClick={() => onNavigate('inteligencia_rede')}
          className="w-full p-3 rounded-xl bg-gradient-to-r from-[#14231b] via-[#101c18] to-[#121922] border border-[#00e676]/30 hover:border-[#00e676] flex items-center justify-between text-left transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#00e676]/20 text-[#00e676] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#00e676] uppercase tracking-wider">
                  IA Oportunidade
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-200 group-hover:text-white line-clamp-1">
                Peça compatível encontrada na IVECO Curitiba
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#00e676] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Indicadores Grid */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Indicadores da Unidade
          </h3>
          <button
            onClick={() => onNavigate('impacto_ambiental')}
            className="text-xs text-[#00e676] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Ver Impacto ESG</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Peças em estoque */}
          <button
            onClick={() => onNavigate('estoque_local')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">Peças em estoque</span>
              <div className="w-7 h-7 rounded-lg bg-[#00e676]/15 text-[#00e676] flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white group-hover:text-[#00e676] transition-colors">
              {currentUnit.totalStock || 128}
            </div>
          </button>

          {/* Card 2: Peças disponíveis para troca */}
          <button
            onClick={() => onNavigate('estoque_rede')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#38bdf8]/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">Disponíveis troca</span>
              <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white group-hover:text-[#38bdf8] transition-colors">
              {currentUnit.availableForExchange || 42}
            </div>
          </button>

          {/* Card 3: Peças reutilizadas */}
          <button
            onClick={() => onNavigate('impacto_ambiental')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">Peças reutilizadas</span>
              <div className="w-7 h-7 rounded-lg bg-[#00e676]/15 text-[#00e676] flex items-center justify-center">
                <Recycle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white group-hover:text-[#00e676] transition-colors">
              {currentUnit.reusedParts || 87}
            </div>
          </button>

          {/* Card 4: Itens aguardando descarte */}
          <button
            onClick={() => onNavigate('descarte_central')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-orange-500/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">Aguardando descarte</span>
              <div className="w-7 h-7 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                <Trash2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
              {currentUnit.awaitingDisposal || 16}
            </div>
          </button>

          {/* Card 5: CO2 evitado */}
          <button
            onClick={() => onNavigate('impacto_ambiental')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">CO₂ evitado</span>
              <div className="w-7 h-7 rounded-lg bg-[#00e676]/15 text-[#00e676] flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl font-extrabold text-[#00e676]">
              {Number(currentUnit.co2AvoidedKg || 1250).toLocaleString('pt-BR')} kg
            </div>
          </button>

          {/* Card 6: Solicitações de outras unidades */}
          <button
            onClick={() => onNavigate('trocas_lista')}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#38bdf8]/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-gray-400">Solicitações rede</span>
              <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-white group-hover:text-[#38bdf8] transition-colors">
              {currentUnit.openRequests || 7}
            </div>
          </button>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Atividades Recentes
          </h3>
          <button
            onClick={() => onNavigate('historico')}
            className="text-xs text-[#00e676] font-semibold hover:underline"
          >
            Ver histórico
          </button>
        </div>

        <div className="space-y-2">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              onClick={() => onNavigate('historico')}
              className="p-3 rounded-xl bg-[#141b24] border border-white/5 hover:border-white/20 flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: act.iconColor || act.color || '#00e676' }}
                />
                <div>
                  <h4 className="text-xs font-semibold text-white line-clamp-1">{act.title}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">{act.message || act.detail}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-gray-400 shrink-0 ml-2">
                {act.timestamp || act.date || 'Hoje'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 35. NOTIFICAÇÕES SCREEN
 */
export const NotificationsScreen = ({ onNavigate }) => {
  const [filter, setFilter] = useState('all'); // all | unread
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  useEffect(() => {
    getNotifications('sp').then(data => {
      if (data && data.length > 0) setNotifications(data);
    });
  }, []);

  const filtered = filter === 'unread' 
    ? notifications.filter(n => n.unread) 
    : notifications;

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    await markAllNotificationsAsRead('sp');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Notificações</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-[#00e676] text-black font-bold'
                : 'bg-[#141b24] text-gray-400 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'unread'
                ? 'bg-[#00e676] text-black font-bold'
                : 'bg-[#141b24] text-gray-400 hover:text-white'
            }`}
          >
            <span>Não lidas</span>
            <span className="w-4 h-4 rounded-full bg-black/30 text-[10px] flex items-center justify-center font-bold">
              {notifications.filter(n => n.unread).length}
            </span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 mt-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all ${
                item.unread
                  ? 'bg-gradient-to-r from-[#17221d] to-[#121a22] border-[#00e676]/40'
                  : 'bg-[#141b24] border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: item.iconColor }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{item.message}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gray-400 shrink-0">
                  {item.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <button
        onClick={markAllRead}
        className="w-full py-3 mt-4 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 hover:text-white hover:border-[#00e676]/50 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
      >
        <Check className="w-3.5 h-3.5 text-[#00e676]" />
        <span>Marcar todas como lidas</span>
      </button>
    </div>
  );
};

/**
 * 34. HISTÓRICO SCREEN
 */
export const HistoryScreen = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('geral'); // geral | trocas | descarte
  const [historyItems, setHistoryItems] = useState(HISTORY_ITEMS);

  useEffect(() => {
    getHistory('sp').then(data => {
      if (data && data.length > 0) setHistoryItems(data);
    });
  }, []);

  const filtered = activeTab === 'geral'
    ? historyItems
    : historyItems.filter(item => item.tab === activeTab);

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] px-5 py-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold">Histórico</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 p-1 rounded-xl bg-[#141b24] border border-white/10 mb-4">
        {['geral', 'trocas', 'descarte'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#00e676] text-black font-bold shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline items */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#141b24] border border-white/5 flex items-start gap-3"
          >
            <div
              className="w-3 h-3 rounded-full mt-1 shrink-0 ring-4 ring-white/5"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">{item.title}</h4>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">{item.detail}</p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 font-mono">
                <Clock className="w-3 h-3" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 33 & 26. IMPACTO AMBIENTAL & ECONOMIA CIRCULAR
 */
export const EnvironmentalImpactScreen = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState(CIRCULAR_ECONOMY_METRICS);

  useEffect(() => {
    getCircularMetrics('sp').then(data => {
      if (data) setMetrics(data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold">Impacto Ambiental</span>
        </button>
        <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full border border-[#00e676]/30">
          ESG IVECO 2026
        </span>
      </div>

      {/* Main Hero Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#12261a] via-[#101d16] to-[#0c131a] border border-[#00e676]/40 text-center relative overflow-hidden mb-4 shadow-lg shadow-[#00e676]/10">
        <div className="w-12 h-12 rounded-full bg-[#00e676]/20 text-[#00e676] flex items-center justify-center mx-auto mb-2">
          <Leaf className="w-6 h-6" />
        </div>
        <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
          CO₂ Evitado Acumulado
        </span>
        <div className="text-3xl font-extrabold text-[#00e676] mt-0.5 glow-text-green">
          {metrics.co2AvoidedKg.toLocaleString('pt-BR')} kg
        </div>
        <p className="text-xs text-gray-300 mt-1 max-w-[240px] mx-auto">
          Equivalente ao plantio de 89 árvores nativas ou 8.400 km a menos de rodagem.
        </p>
      </div>

      {/* Grid of Circular Indicators */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
          <span className="text-[11px] text-gray-400">Peças Reutilizadas</span>
          <div className="text-xl font-bold text-white mt-1">{metrics.reusedParts} un.</div>
          <span className="text-[10px] text-[#00e676]">+12% este mês</span>
        </div>

        <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
          <span className="text-[11px] text-gray-400">Peças Trocadas</span>
          <div className="text-xl font-bold text-white mt-1">{metrics.exchangedParts} un.</div>
          <span className="text-[10px] text-[#38bdf8]">6 concessionárias</span>
        </div>

        <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
          <span className="text-[11px] text-gray-400">Resíduos Reciclados</span>
          <div className="text-xl font-bold text-white mt-1">{metrics.recycledWasteKg} kg</div>
          <span className="text-[10px] text-yellow-400">100% certificado</span>
        </div>

        <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
          <span className="text-[11px] text-gray-400">Taxa Reaproveitamento</span>
          <div className="text-xl font-bold text-[#00e676] mt-1">{metrics.circularityRatePercent}%</div>
          <span className="text-[10px] text-[#00e676]">Meta 2026 superada</span>
        </div>
      </div>

      {/* Interactive Monthly Evolution Chart */}
      <div className="p-4 rounded-2xl bg-[#141b24] border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Evolução Mensal de Reutilização
          </h4>
          <span className="text-[10px] text-gray-400 font-mono">Últimos 6 meses</span>
        </div>

        {/* Bar chart visualization */}
        <div className="flex items-end justify-between h-32 pt-4 px-2 border-b border-white/10">
          {metrics.monthlyEvolution.map((item, idx) => {
            const heightPercent = Math.round((item.reused / 100) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 group">
                <span className="text-[10px] font-mono text-[#00e676] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.reused}
                </span>
                <div
                  className="w-5 rounded-t-md bg-gradient-to-t from-[#00b359] to-[#00e676] transition-all group-hover:brightness-125"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-mono text-gray-400 mt-1">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Button to View Certificates */}
      <button
        onClick={() => onNavigate('certificado_destinacao')}
        className="w-full py-3.5 rounded-xl bg-[#141b24] border border-[#00e676]/40 text-white font-semibold text-xs hover:border-[#00e676] flex items-center justify-center gap-2 transition-all"
      >
        <FileText className="w-4 h-4 text-[#00e676]" />
        <span>Ver Certificados de Destinação Emitidos</span>
      </button>
    </div>
  );
};

/**
 * 27. INTELIGÊNCIA ENTRE UNIDADES SCREEN
 */
export const AiIntelligenceScreen = ({ onNavigate }) => {
  const [suggestions, setSuggestions] = useState(AI_SUGGESTIONS);

  useEffect(() => {
    getAiSuggestions('sp').then(data => {
      if (data && data.length > 0) setSuggestions(data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold">Inteligência de Rede</span>
        </button>
        <Sparkles className="w-5 h-5 text-[#00e676]" />
      </div>

      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Oportunidades com IA</h2>
        <p className="text-xs text-gray-400">
          Cruzamento em tempo real de inventários, manutenções em andamento e rotas logísticas.
        </p>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-3">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            className="p-4 rounded-2xl bg-[#141b24] border border-white/10 hover:border-white/20 transition-all space-y-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: sug.color }}
              />
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                {sug.title}
              </h4>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              “{sug.description}”
            </p>

            <button
              onClick={() => {
                if (sug.type === 'reuse') onNavigate('estoque_detalhe');
                else if (sug.type === 'dormant_stock') onNavigate('disponibilizar_troca');
                else onNavigate('scanner_peca_live');
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00e676] font-semibold text-xs hover:bg-[#00e676]/10 hover:border-[#00e676]/40 transition-all flex items-center justify-center gap-1.5"
            >
              <span>{sug.actionLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
