import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Search, 
  Filter, 
  Plus, 
  Check, 
  Layers, 
  RefreshCw, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  QrCode, 
  Building2,
  Box,
  SlidersHorizontal,
  FileCheck
} from 'lucide-react';
import { 
  PARTS_CATALOG, 
  NETWORK_PARTS_SEARCH, 
  EXCHANGE_REQUESTS 
} from '../data/mockData';
import { 
  getParts, 
  addPart, 
  getExchangeRequests, 
  createExchangeRequest 
} from '../services/supabaseService';
import { useEffect } from 'react';
import { 
  AlternatorVisual, 
  BrakeDiscVisual, 
  TurboCompressorVisual 
} from '../components/VisualIllustrations';

/**
 * 18 & 11. ESTOQUE DA MINHA UNIDADE
 */
export const UnitStockScreen = ({ onNavigate, onSelectPart }) => {
  const [filter, setFilter] = useState('todas'); // todas | disponiveis | indisponiveis | descarte
  const [search, setSearch] = useState('');
  const [parts, setParts] = useState(PARTS_CATALOG);

  useEffect(() => {
    getParts('sp').then(data => {
      if (data && data.length > 0) setParts(data);
    });
  }, []);

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(search.toLowerCase()) || 
                          part.code.includes(search);
    if (!matchesSearch) return false;
    if (filter === 'disponiveis') return part.status === 'available';
    if (filter === 'indisponiveis') return part.status !== 'available';
    if (filter === 'descarte') return part.status === 'disposal';
    return true;
  });

  const handlePartClick = (part) => {
    if (onSelectPart) onSelectPart(part);
    onNavigate('estoque_detalhe');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-extrabold text-white">Estoque</h1>
          <button
            onClick={() => onNavigate('adicionar_peca')}
            className="p-2 rounded-xl bg-[#00e676] text-black font-bold text-xs flex items-center gap-1 shadow-sm shadow-[#00e676]/30 hover:brightness-110"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Adicionar</span>
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">128 peças cadastradas • IVECO São Paulo</p>

        {/* Search Bar */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar peça pelo nome ou código"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
          <button
            onClick={() => onNavigate('estoque_rede')}
            title="Buscar na Rede Nacional IVECO"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#00e676] hover:text-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills matching visual reference */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'disponiveis', label: 'Disponíveis' },
            { id: 'indisponiveis', label: 'Indisponíveis' },
            { id: 'descarte', label: 'Descarte' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-[#00e676] text-black font-bold'
                  : 'bg-[#141b24] text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Parts List */}
        <div className="space-y-2.5">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              onClick={() => handlePartClick(part)}
              className="p-3 rounded-2xl bg-[#141b24] border border-white/5 hover:border-[#00e676]/40 flex items-center justify-between cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-black/40 p-1 flex items-center justify-center border border-white/5 shrink-0">
                  {part.category.includes('Frenagem') ? (
                    <BrakeDiscVisual className="scale-75" />
                  ) : part.category.includes('Turbo') ? (
                    <TurboCompressorVisual className="scale-75" />
                  ) : (
                    <AlternatorVisual className="scale-75" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#00e676] transition-colors line-clamp-1">
                    {part.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-mono">Cód: {part.code}</p>
                  <p className="text-[10px] text-[#00e676] font-semibold">
                    {part.quantity} unid. disponíveis
                  </p>
                </div>
              </div>

              <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* Network Search Callout */}
      <div className="pt-3">
        <button
          onClick={() => onNavigate('estoque_rede')}
          className="w-full py-3 rounded-xl bg-[#141b24] border border-[#38bdf8]/40 text-[#38bdf8] font-semibold text-xs hover:border-[#38bdf8] hover:text-white flex items-center justify-center gap-2 transition-all"
        >
          <Truck className="w-4 h-4" />
          <span>Pesquisar na Rede Nacional de Unidades IVECO</span>
        </button>
      </div>
    </div>
  );
};

/**
 * 19 & 14. BUSCA DE PEÇAS ENTRE UNIDADES (MARKETPLACE INTERNO)
 */
export const NetworkStockSearchScreen = ({ onNavigate }) => {
  const [searchCode, setSearchCode] = useState('50418756');
  const [sortBy, setSortBy] = useState('distance'); // distance | health | availability

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('estoque_local')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Estoque Geral IVECO</span>
          </button>
        </div>

        {/* Search Header */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 mb-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Busca de Peças entre Unidades
          </span>
          <div className="relative">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Digite o código da peça..."
              className="w-full pl-3 pr-8 py-2 rounded-xl bg-black/40 border border-[#00e676]/40 text-white text-xs font-mono font-bold focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#00e676] absolute right-3 top-2.5" />
          </div>
          <p className="text-[11px] text-gray-300">
            Componente: <span className="text-white font-semibold">Suporte do Eixo Traseiro (50418756)</span>
          </p>
        </div>

        {/* Sort Options matching prompt */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none text-[11px]">
          <span className="text-gray-400 text-[10px] mr-1">Ordenar por:</span>
          {['Mais próxima', 'Melhor estado', 'Disponibilidade', 'Tempo de envio'].map((label, idx) => (
            <button
              key={idx}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
                idx === 0 ? 'bg-[#00e676] text-black font-bold' : 'bg-[#141b24] text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Peças Disponíveis na Rede
        </h3>

        {/* Dealership Cards List */}
        <div className="space-y-2.5">
          {NETWORK_PARTS_SEARCH.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 hover:border-white/20 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#00e676]" />
                  <h4 className="text-xs font-bold text-white">{item.unitName}</h4>
                </div>
                <span className="text-xs text-[#00e676] font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.distanceKm === 0 ? 'Sua Unidade' : `${item.distanceKm} km`}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 bg-black/30 p-2 rounded-xl">
                <span>Disponível: <strong className="text-white">{item.availableQty} un.</strong></span>
                <span>Estado: <strong className="text-[#00e676]">{item.condition} ({item.healthScore}%)</strong></span>
                <span>Entrega: <strong className="text-white">{item.estimatedDeliveryDays === 0 ? 'Hoje' : `${item.estimatedDeliveryDays} dias`}</strong></span>
              </div>

              <button
                onClick={() => onNavigate('nova_solicitacao')}
                className="w-full py-2 rounded-xl bg-[#00e676]/10 border border-[#00e676]/40 text-[#00e676] hover:bg-[#00e676] hover:text-black font-bold text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Solicitar esta peça</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 20 & 16. DETALHES DA PEÇA DO ESTOQUE
 */
export const StockPartDetailScreen = ({ onNavigate, part }) => {
  const currentPart = part || PARTS_CATALOG[0];

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('estoque_local')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Detalhes da Peça</span>
          </button>
        </div>

        {/* 3D Visual Casing */}
        <div className="p-4 rounded-2xl bg-[#111720] border border-white/10 mb-3 flex items-center justify-center">
          {currentPart.category.includes('Frenagem') ? (
            <BrakeDiscVisual className="h-36" />
          ) : currentPart.category.includes('Turbo') ? (
            <TurboCompressorVisual className="h-36" />
          ) : (
            <AlternatorVisual className="h-36" />
          )}
        </div>

        {/* Info Rows */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 space-y-3 mb-3">
          <div>
            <h2 className="text-base font-extrabold text-white">{currentPart.name}</h2>
            <p className="text-xs text-gray-400 font-mono">Código: {currentPart.code}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Status</span>
              <span className="font-bold text-[#00e676]">{currentPart.statusLabel}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Quantidade</span>
              <span className="font-bold text-white">{currentPart.quantity} unidades</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Condição</span>
              <span className="font-bold text-white">{currentPart.condition}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Ano / Fabr.</span>
              <span className="font-bold text-white">{currentPart.year}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] text-gray-400 uppercase block">Localização Física</span>
            <p className="text-xs text-[#00e676] font-mono mt-0.5">{currentPart.location}</p>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] text-gray-400 uppercase block">Compatibilidade</span>
            <p className="text-xs text-gray-200 mt-0.5">{currentPart.compatibility}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons matching prompt */}
      <div className="space-y-2">
        <button
          onClick={() => {
            alert('Peça reservada com sucesso para sua ordem de serviço.');
            onNavigate('estoque_local');
          }}
          className="w-full py-3 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Reservar peça
        </button>

        <button
          onClick={() => onNavigate('disponibilizar_troca')}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-[#00e676]/40 text-[#00e676] font-semibold text-xs hover:bg-[#00e676]/10 transition-all"
        >
          Disponibilizar para troca na rede IVECO
        </button>

        <button
          onClick={() => onNavigate('nova_solicitacao')}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 font-semibold text-xs hover:text-white transition-all"
        >
          Solicitar troca de outra unidade
        </button>
      </div>
    </div>
  );
};

/**
 * 21 & 12. CADASTRAR PEÇA NO ESTOQUE
 */
export const AddStockPartScreen = ({ onNavigate }) => {
  const [partCode, setPartCode] = useState('504385987');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addPart({
        code: partCode,
        name: partName,
        quantity: parseInt(quantity, 10) || 1,
        location,
        category: 'Geral',
        status: 'available',
        statusLabel: 'Disponível',
        condition: 'Reutilizável',
        unitId: 'sp'
      });
      alert('Peça cadastrada com sucesso no banco de dados do Supabase!');
      onNavigate('estoque_local');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar no banco. Verifique sua conexão.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('estoque_local')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">+ Adicionar Peça</span>
          </button>
        </div>

        {/* Quick QR Autofill button */}
        <button
          type="button"
          onClick={() => onNavigate('qr_code_scanner')}
          className="w-full p-3 rounded-xl bg-[#141b24] border border-[#00e676]/30 text-[#00e676] hover:border-[#00e676] text-xs font-semibold flex items-center justify-center gap-2 mb-3"
        >
          <QrCode className="w-4 h-4" />
          <span>Escanear QR Code para preenchimento automático</span>
        </button>

        {/* Form */}
        <form id="add-part-form" onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Código da Peça</label>
            <input
              type="text"
              value={partCode}
              onChange={(e) => setPartCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs font-mono font-bold focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Nome do Componente</label>
            <input
              type="text"
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium text-gray-300 block mb-1">Quantidade</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
                required
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-gray-300 block mb-1">Estado de Uso</label>
              <select className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none">
                <option>80% — Bom</option>
                <option>95% — Excelente</option>
                <option>60% — Recuperável</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">
              Localização Física na Unidade
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Almoxarifado B — Prateleira 04 — Gaveta 12"
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        form="add-part-form"
        className="w-full py-3.5 mt-4 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Confirmar Cadastro no Estoque
      </button>
    </div>
  );
};

/**
 * 22 & 13. DISPONIBILIZAR PEÇA PARA OUTRAS UNIDADES
 */
export const SharePartModalScreen = ({ onNavigate }) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('estoque_local')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Disponibilizar para Troca</span>
          </button>
        </div>

        {/* Info Card matching visual reference */}
        <div className="p-4 rounded-2xl bg-[#141b24] border border-white/10 space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
            <span className="text-xs font-bold text-[#00e676] uppercase tracking-wider">
              Disponível para troca
            </span>
          </div>

          <div>
            <h3 className="text-base font-extrabold text-white">Suporte do Eixo Traseiro</h3>
            <p className="text-xs text-gray-400 font-mono">Código: 50418756</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
            <div>
              <span className="text-gray-400 block text-[10px]">Estado:</span>
              <span className="font-bold text-white">82% — Bom</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Desgaste:</span>
              <span className="font-bold text-yellow-400">18%</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-gray-400 block text-[10px]">Unidade:</span>
            <span className="font-bold text-white">IVECO São Paulo</span>
          </div>
        </div>

        {/* Toggle Box */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-white">Visibilidade na Rede IVECO</h4>
            <p className="text-[11px] text-gray-400">Outras unidades poderão solicitar este item.</p>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full transition-colors p-0.5 flex items-center ${
              enabled ? 'bg-[#00e676] justify-end' : 'bg-gray-700 justify-start'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-black shadow-md" />
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          alert('Peça compartilhada na rede com sucesso!');
          onNavigate('estoque_local');
        }}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Confirmar Compartilhamento
      </button>
    </div>
  );
};

/**
 * 23 & 15 & 17. SISTEMA DE TROCA DE PEÇAS (LISTA)
 */
export const ExchangeListScreen = ({ onNavigate, onSelectExchange }) => {
  const [tab, setTab] = useState('solicitacoes'); // solicitacoes | minhas
  const [requests, setRequests] = useState(EXCHANGE_REQUESTS);

  useEffect(() => {
    getExchangeRequests().then(data => {
      if (data && data.length > 0) setRequests(data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Troca de Peças</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#141b24] border border-white/10 mb-3">
          <button
            onClick={() => setTab('solicitacoes')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'solicitacoes' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Solicitações
          </button>
          <button
            onClick={() => setTab('minhas')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'minhas' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Minhas solicitações
          </button>
        </div>

        {/* Requests List matching visual reference */}
        <div className="space-y-2.5">
          {requests.map((req) => (
            <div
              key={req.id}
              onClick={() => {
                if (onSelectExchange) onSelectExchange(req);
                onNavigate('rastreamento_troca');
              }}
              className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-[#00e676] transition-colors">
                  {req.requestingUnit}
                </span>
                <span
                  className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${req.statusColor}20`,
                    color: req.statusColor,
                    border: `1px solid ${req.statusColor}40`
                  }}
                >
                  {req.statusLabel}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-200">{req.partName}</h4>
                <p className="text-[11px] text-gray-400">{req.quantity} unidade • Solicitado em {req.requestDate}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] text-gray-400">
                <span>Passo atual: {req.currentStep} de 6</span>
                <span className="text-[#00e676] font-semibold flex items-center gap-0.5">
                  Rastrear <ChevronLeft className="w-3 h-3 rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate('nova_solicitacao')}
        className="w-full py-3.5 mt-3 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        + Nova solicitação
      </button>
    </div>
  );
};

/**
 * 24 & 15. NOVA SOLICITAÇÃO DE PEÇA
 */
export const NewExchangeRequestScreen = ({ onNavigate }) => {
  const [selectedUnit, setSelectedUnit] = useState('IVECO Curitiba');
  const [quantity, setQuantity] = useState('1');
  const [justification, setJustification] = useState('Precisamos da peça para manutenção de um caminhão parado.');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const unitMap = {
        'IVECO Curitiba': 'curitiba',
        'IVECO Belo Horizonte': 'bh',
        'IVECO Porto Alegre': 'poa',
        'IVECO Campinas': 'campinas'
      };
      await createExchangeRequest({
        partName: 'Alternador 28V 100A',
        partCode: '504385987',
        requestingUnitId: unitMap[selectedUnit] || 'curitiba',
        supplyingUnitId: 'sp',
        quantity: parseInt(quantity, 10) || 1,
        justification
      });
      alert('Solicitação enviada e registrada no banco de dados do Supabase!');
      onNavigate('trocas_lista');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar solicitação.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('trocas_lista')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Nova Solicitação</span>
          </button>
        </div>

        {/* Selected Part Box */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 mb-3">
          <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Peça Solicitada</span>
          <h3 className="text-xs font-bold text-white">Alternador 28V 100A (504385987)</h3>
          <p className="text-[11px] text-[#00e676] mt-0.5">3 unidades disponíveis no estoque de origem</p>
        </div>

        <form id="new-req-form" onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Unidade Solicitante</label>
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
            >
              <option>IVECO Curitiba</option>
              <option>IVECO Belo Horizonte</option>
              <option>IVECO Porto Alegre</option>
              <option>IVECO Campinas</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Quantidade</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
            >
              <option>1 unidade</option>
              <option>2 unidades</option>
              <option>3 unidades</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Justificativa Técnica</label>
            <textarea
              rows={3}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        form="new-req-form"
        className="w-full py-3.5 mt-4 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Enviar solicitação
      </button>
    </div>
  );
};

/**
 * 26 & 16. FLUXO E RASTREAMENTO DA TROCA (AS 6 ETAPAS)
 */
export const ExchangeTrackingScreen = ({ onNavigate, exchange }) => {
  const req = exchange || EXCHANGE_REQUESTS[0];
  const [step, setStep] = useState(req.currentStep || 1);

  const stepsData = [
    { num: 1, title: 'Solicitação enviada', desc: 'Aguardando aprovação do gestor IVECO SP' },
    { num: 2, title: 'Unidade fornecedora aprova', desc: 'Solicitação aprovada e liberada para embalagem' },
    { num: 3, title: 'Separação', desc: 'Peça sendo preparada no Almoxarifado B' },
    { num: 4, title: 'Transporte', desc: 'Peça em trânsito via malha logística IVECO' },
    { num: 5, title: 'Recebimento', desc: 'Peça recebida e inspecionada na oficina de destino' },
    { num: 6, title: 'Estoque atualizado', desc: 'Transferência e saldo atualizados automaticamente' }
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('trocas_lista')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Rastreamento do Envio</span>
          </button>
        </div>

        {/* Card Header */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 mb-4">
          <span className="text-[10px] text-gray-400 font-mono">ID: {req.id}</span>
          <h3 className="text-xs font-bold text-white mt-0.5">{req.partName}</h3>
          <p className="text-[11px] text-[#00e676]">Origem: {req.supplyingUnit} ➔ Destino: {req.requestingUnit}</p>
        </div>

        {/* 6-Step Visual Workflow */}
        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
          {stepsData.map((s) => {
            const isDone = s.num <= step;
            const isCurrent = s.num === step;
            return (
              <div key={s.num} className="flex items-start gap-3 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-[#00e676] text-black ring-4 ring-[#00e676]/30 font-black scale-110'
                      : isDone
                      ? 'bg-[#00b359] text-black'
                      : 'bg-[#141b24] border border-white/10 text-gray-500'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <div className="flex-1 pt-0.5">
                  <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#00e676]' : isDone ? 'text-white' : 'text-gray-500'}`}>
                    {s.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulator Button */}
      <div className="space-y-2 pt-4">
        <button
          onClick={() => {
            if (step < 6) setStep(step + 1);
            else {
              alert('Fluxo completo finalizado com sucesso! Peça incorporada ao estoque.');
              onNavigate('estoque_local');
            }
          }}
          className="w-full py-3 rounded-xl bg-[#00e676] text-black font-bold text-xs tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          {step < 6 ? `Avançar Etapa (${step}/6) ➔` : 'Finalizar e Ver no Estoque ✓'}
        </button>
      </div>
    </div>
  );
};
