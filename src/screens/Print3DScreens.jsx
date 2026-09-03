import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Cpu, 
  Sparkles, 
  Layers, 
  Printer, 
  Feather, 
  Leaf, 
  Zap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sliders, 
  Search, 
  Filter, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Download, 
  Thermometer, 
  Check, 
  Flame,
  Truck
} from 'lucide-react';
import { PRINT_3D_CATALOG, HUB_3D_PRINTERS, CIRCULAR_ECONOMY_METRICS } from '../data/mockData';
import { get3DCatalog, get3DPrinters, send3DPrintOrder } from '../services/supabaseService';

/**
 * 1. HUB 3D HOME — CÉLULA DE MANUFATURA ADITIVA & POLÍMEROS REFORÇADOS
 */
export const Hub3DHomeScreen = ({ onNavigate, onSelect3DPart }) => {
  const [printers, setPrinters] = useState(HUB_3D_PRINTERS);
  const [catalog, setCatalog] = useState(PRINT_3D_CATALOG);

  useEffect(() => {
    get3DPrinters().then(setPrinters);
    get3DCatalog().then(setCatalog);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold">Início</span>
        </button>
        <span className="text-[11px] font-extrabold text-[#00e676] bg-[#00e676]/10 px-3 py-1 rounded-full border border-[#00e676]/30 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
          Hub 3D IVECO Ativo
        </span>
      </div>

      {/* Hero Banner: Conceito Ecoficina de Polímeros Reforçados */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#12281b] via-[#0f1d16] to-[#0a141e] border border-[#00e676]/40 relative overflow-hidden mb-4 shadow-xl shadow-[#00e676]/5">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#00e676]/20 text-[#00e676] flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-[#00e676] uppercase tracking-wider">
              Ecoficina • Manufatura Aditiva
            </span>
          </div>
          <h2 className="text-lg font-black text-white leading-tight">
            Recondicionamento 3D & Polímeros Reforçados
          </h2>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            Elimine descarte de conjuntos completos. Substitua e repare componentes com compósitos de fibra de carbono (<strong className="text-white">PA-CF / PEEK</strong>), aliviando peso e cortando emissões de diesel na rodagem.
          </p>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
            <div>
              <span className="text-[10px] text-gray-400 block">Peças 3D</span>
              <span className="text-sm font-extrabold text-[#00e676]">{CIRCULAR_ECONOMY_METRICS.printed3DParts} un.</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Peso Aliviado</span>
              <span className="text-sm font-extrabold text-[#38bdf8]">-{CIRCULAR_ECONOMY_METRICS.lightweightWeightSavedKg} kg</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">CO₂ Poupado</span>
              <span className="text-sm font-extrabold text-[#00e676]">{CIRCULAR_ECONOMY_METRICS.co2RoadSavingsKg} kg</span>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-32 h-32 bg-[#00e676]/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Quick Navigation Buttons */}
      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <button
          onClick={() => onNavigate('catalogo_3d')}
          className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/50 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-[#00e676] transition-colors">
            Catálogo CAD Homologado
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {catalog.length} modelos de alta resistência prontos
          </p>
        </button>

        <button
          onClick={() => onNavigate('ordem_impressao_3d')}
          className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/50 text-left transition-all group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00e676]/10 text-[#00e676] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-white group-hover:text-[#00e676] transition-colors">
            Nova Ordem de Impressão
          </h4>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Disparar fabricação aditiva na rede
          </p>
        </button>
      </div>

      {/* Industrial 3D Printers Live Status */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00e676]" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
              Células 3D Conectadas na Rede
            </h3>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">
            {printers.filter(p => p.status === 'printing').length} ativas agora
          </span>
        </div>

        <div className="space-y-3">
          {printers.map((printer) => (
            <div
              key={printer.id}
              className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {printer.name}
                    {printer.status === 'printing' && (
                      <span className="w-2 h-2 rounded-full bg-[#00e676] animate-ping" />
                    )}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono block">
                    {printer.model} • {printer.technology}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    printer.status === 'printing'
                      ? 'bg-[#00e676]/10 text-[#00e676] border-[#00e676]/30'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}
                >
                  {printer.status === 'printing' ? 'IMPRIMINDO' : 'DISPONÍVEL'}
                </span>
              </div>

              {printer.status === 'printing' && printer.currentJob && (
                <div className="mt-3 p-3 rounded-xl bg-[#0a0e14]/80 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-300 font-semibold truncate max-w-[200px]">
                      {printer.currentJob.partName}
                    </span>
                    <span className="text-[#00e676] font-mono font-bold">
                      {printer.currentJob.progressPercent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00b359] to-[#00e676] rounded-full transition-all duration-500"
                      style={{ width: `${printer.currentJob.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      Restam {printer.currentJob.timeLeftMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-[#00e676]" />
                      Câmara {printer.currentJob.chamberTempCelsius}°C
                    </span>
                    <span className="font-mono text-gray-300">
                      Camada {printer.currentJob.layerCurrent}/{printer.currentJob.layerTotal}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigate('rastreamento_impressao')}
                    className="w-full mt-2 py-2 rounded-lg bg-[#00e676]/10 hover:bg-[#00e676]/20 border border-[#00e676]/30 text-[#00e676] text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
                  >
                    <span>Monitorar Telemetria em Tempo Real</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {printer.status === 'ready' && (
                <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Filamento Carregado: {printer.spoolWeightRemainingG}g</span>
                  <button
                    onClick={() => onNavigate('ordem_impressao_3d')}
                    className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#00e676]/10 text-white hover:text-[#00e676] text-[11px] font-semibold transition-all border border-white/10"
                  >
                    Enviar Arquivo CAD
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Destaque de Descarbonização por Alívio de Peso (Lightweighting) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#121922] to-[#101720] border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Feather className="w-4 h-4 text-[#38bdf8]" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Alívio de Peso Estrutural (Lightweighting)
          </h4>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Peças fabricadas em <span className="text-[#00e676] font-semibold">PA12-CF</span> pesam até <strong className="text-white">67% menos</strong> que o aço original, mantendo 165 MPa de resistência à tração. Na frota, cada 100 kg a menos poupa <strong className="text-white">~0,35L de diesel/100km</strong>.
        </p>
      </div>
    </div>
  );
};

/**
 * 2. CATÁLOGO DIGITAL DE PEÇAS 3D HOMOLOGADAS
 */
export const DigitalCatalog3DScreen = ({ onNavigate, onSelect3DPart }) => {
  const [catalog, setCatalog] = useState(PRINT_3D_CATALOG);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Suportes & Carenagem', 'Sistema de Admissão & Turbo', 'Eletrônica Embarcada', 'Pneumática & Freios'];

  const filtered = catalog.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.code.toLowerCase().includes(search.toLowerCase()) ||
                          item.compatibleModel.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => onNavigate('hub_3d')}
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold">Hub 3D</span>
        </button>
        <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full border border-[#00e676]/30">
          Arquivos CAD Oficiais
        </span>
      </div>

      <h2 className="text-base font-extrabold text-white mb-0.5">Catálogo Digital de Peças 3D</h2>
      <p className="text-xs text-gray-400 mb-3">
        Peças homologadas pela engenharia IVECO para produção sob demanda com polímeros reforçados.
      </p>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por código CAD, nome ou modelo..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00e676]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#00e676] text-black'
                : 'bg-[#141b24] text-gray-400 border border-white/5 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List of 3D Parts */}
      <div className="space-y-3">
        {filtered.map((part) => (
          <div
            key={part.id}
            className="p-4 rounded-2xl bg-[#141b24] border border-white/10 hover:border-[#00e676]/40 transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded border border-[#00e676]/30">
                  {part.code}
                </span>
                <h4 className="text-xs font-bold text-white mt-1.5 leading-snug">
                  {part.name}
                </h4>
                <span className="text-[11px] text-gray-400 block mt-0.5">
                  Compatível: {part.compatibleModel}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 block">Alívio de Peso</span>
                <span className="text-sm font-extrabold text-[#38bdf8] flex items-center gap-0.5 justify-end">
                  <Feather className="w-3.5 h-3.5" />
                  -{part.weightReductionPercent}%
                </span>
              </div>
            </div>

            {/* Technical Specs Pill Box */}
            <div className="p-2.5 rounded-xl bg-[#0a0e14] border border-white/5 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-gray-400 block text-[10px]">Polímero Técnico:</span>
                <span className="text-gray-200 font-semibold text-[10px]">{part.material}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Peso: Original vs 3D</span>
                <span className="text-gray-200 font-semibold text-[10px]">
                  {part.originalWeightKg}kg ➔ <strong className="text-[#00e676]">{part.printedWeightKg}kg</strong>
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Resistência Mecânica:</span>
                <span className="text-gray-200 font-semibold text-[10px]">{part.tensileStrengthMpa} MPa / {part.tempResistanceCelsius}°C</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">CO₂ Total Poupado:</span>
                <span className="text-[#00e676] font-bold text-[10px]">🌱 {part.totalCo2BenefitKg} kg CO₂e</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] text-gray-400 line-through mr-2">
                  Orig: R$ {part.originalCostBrl.toFixed(2)}
                </span>
                <span className="text-xs font-bold text-white">
                  3D: R$ {part.costEstimateBrl.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => {
                  if (onSelect3DPart) onSelect3DPart(part);
                  onNavigate('ordem_impressao_3d');
                }}
                className="px-3.5 py-2 rounded-xl bg-[#00e676] hover:brightness-110 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#00e676]/20"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Configurar Impressão</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 3. CONFIGURAÇÃO DA ORDEM DE IMPRESSÃO 3D
 */
export const Print3DOrderScreen = ({ onNavigate, selected3DPart }) => {
  const part = selected3DPart || PRINT_3D_CATALOG[0];

  const [selectedMaterial, setSelectedMaterial] = useState('pa12_cf');
  const [infillDensity, setInfillDensity] = useState(70);
  const [selectedHub, setSelectedHub] = useState('sp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleSendOrder = async () => {
    setIsSubmitting(true);
    await send3DPrintOrder({
      partId: part.id,
      partCode: part.code,
      material: selectedMaterial,
      infillDensity,
      hub: selectedHub
    });
    setIsSubmitting(false);
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-6 text-center">
        <div className="my-auto">
          <div className="w-16 h-16 rounded-full bg-[#00e676]/20 text-[#00e676] flex items-center justify-center mx-auto mb-4 border border-[#00e676]/40">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-bold text-[#00e676] uppercase tracking-wider block mb-1">
            Ordem Enviada à Impressora Industrial
          </span>
          <h2 className="text-xl font-black text-white">Fabricação Aditiva Iniciada!</h2>
          <p className="text-xs text-gray-300 mt-2 max-w-xs mx-auto leading-relaxed">
            O arquivo CAD oficial de <strong className="text-white">{part.name}</strong> foi enviado para a Célula 3D Alfa com filamento <strong className="text-[#00e676]">PA12-CF</strong>.
          </p>

          <div className="mt-5 p-4 rounded-2xl bg-[#141b24] border border-white/10 text-left space-y-2 max-w-xs mx-auto">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Tempo de Impressão:</span>
              <span className="font-bold text-white">{part.printTimeHours} horas</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Alívio de Massa:</span>
              <span className="font-bold text-[#38bdf8]">
                -{(part.originalWeightKg - part.printedWeightKg).toFixed(2)} kg no caminhão
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">CO₂ Total Poupado:</span>
              <span className="font-bold text-[#00e676]">{part.totalCo2BenefitKg} kg CO₂e</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onNavigate('rastreamento_impressao')}
            className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-[#00e676]/20"
          >
            Acompanhar Telemetria da Impressora
          </button>
          <button
            onClick={() => onNavigate('hub_3d')}
            className="w-full py-3 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all"
          >
            Voltar ao Hub 3D
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('catalogo_3d')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Catálogo</span>
          </button>
          <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full border border-[#00e676]/30">
            {part.code}
          </span>
        </div>

        <h2 className="text-base font-extrabold text-white mb-0.5">{part.name}</h2>
        <p className="text-xs text-gray-400 mb-4 font-mono">
          Compatibilidade: {part.compatibleModel}
        </p>

        {/* Material Selection */}
        <div className="space-y-3 mb-4">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            1. Selecionar Polímero Reforçado
          </span>

          <div className="space-y-2">
            <button
              onClick={() => setSelectedMaterial('pa12_cf')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedMaterial === 'pa12_cf'
                  ? 'bg-gradient-to-r from-[#12281b] to-[#101e16] border-[#00e676]'
                  : 'bg-[#141b24] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">PA12-CF (Nylon c/ Fibra de Carbono Contínua)</span>
                <span className="text-[10px] font-bold text-[#00e676]">Padrão IVECO</span>
              </div>
              <p className="text-[11px] text-gray-300">
                Resistência mecânica equivalente ao alumínio estrutural (165 MPa), ultraleve e resistente a hidrocarbonetos.
              </p>
            </button>

            <button
              onClick={() => setSelectedMaterial('peek')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                selectedMaterial === 'peek'
                  ? 'bg-gradient-to-r from-[#12281b] to-[#101e16] border-[#00e676]'
                  : 'bg-[#141b24] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">PEEK Reforçado (Superpolímero)</span>
                <span className="text-[10px] font-bold text-yellow-400">Até 240°C</span>
              </div>
              <p className="text-[11px] text-gray-300">
                Para ambientes extremos próximos ao coletor de escape e bloco do motor.
              </p>
            </button>
          </div>
        </div>

        {/* Infill Density Slider */}
        <div className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">2. Densidade de Preenchimento (Infill)</span>
            <span className="text-xs font-mono font-bold text-[#00e676]">{infillDensity}% Sólido</span>
          </div>
          <input
            type="range"
            min="30"
            max="100"
            step="10"
            value={infillDensity}
            onChange={(e) => setInfillDensity(Number(e.target.value))}
            className="w-full accent-[#00e676]"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>30% (Leve)</span>
            <span>70% (Equilíbrio Rigidez)</span>
            <span>100% (Maciço Estrutural)</span>
          </div>
        </div>

        {/* Destination 3D Hub Printer */}
        <div className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 mb-4">
          <span className="text-xs font-bold text-white block mb-2">3. Célula de Impressão Destino</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedHub('sp')}
              className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                selectedHub === 'sp'
                  ? 'bg-[#00e676]/10 border-[#00e676] text-white'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              <span className="block font-bold">Hub Local SP</span>
              <span className="text-[10px] text-[#00e676]">Pronta para Iniciar</span>
            </button>
            <button
              onClick={() => setSelectedHub('curitiba')}
              className={`p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                selectedHub === 'curitiba'
                  ? 'bg-[#00e676]/10 border-[#00e676] text-white'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}
            >
              <span className="block font-bold">Hub Curitiba</span>
              <span className="text-[10px] text-gray-400">410 km de distância</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleSendOrder}
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-[#00e676]/20 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span>Enviando Ordem para o Hub 3D...</span>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              <span>Enviar Arquivo CAD para Impressão 3D</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * 4. RASTREAMENTO E TELEMETRIA DA IMPRESSÃO 3D EM TEMPO REAL
 */
export const PrintQueueDetailScreen = ({ onNavigate }) => {
  const job = HUB_3D_PRINTERS[0].currentJob;

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('hub_3d')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Hub 3D</span>
          </button>
          <span className="text-xs font-bold text-[#00e676] bg-[#00e676]/10 px-2.5 py-1 rounded-full border border-[#00e676]/30 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-ping" />
            Ao Vivo
          </span>
        </div>

        <h2 className="text-base font-extrabold text-white mb-0.5">Telemetria da Impressora</h2>
        <p className="text-xs text-gray-400 mb-4">
          Célula Industrial Markforged FX20 • Célula Alfa IVECO SP
        </p>

        {/* 3D Visualizer Mock Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141d27] to-[#0c1219] border border-white/10 text-center relative overflow-hidden mb-4">
          <div className="w-20 h-20 rounded-2xl bg-[#00e676]/10 border border-[#00e676]/30 flex items-center justify-center mx-auto mb-3">
            <Printer className="w-10 h-10 text-[#00e676] animate-pulse" />
          </div>
          <span className="text-[11px] font-mono text-[#00e676] uppercase tracking-wider block">
            Depositando Camada {job.layerCurrent} de {job.layerTotal}
          </span>
          <h3 className="text-sm font-bold text-white mt-1">{job.partName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Material: {job.materialLoaded}</p>

          <div className="mt-4 w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00b359] to-[#00e676] rounded-full"
              style={{ width: `${job.progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-300 mt-2 font-mono">
            <span>Progresso: {job.progressPercent}%</span>
            <span>Restam: {job.timeLeftMinutes} min</span>
          </div>
        </div>

        {/* Sensor Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Bico Extrusor</span>
            <span className="text-lg font-bold text-white">285°C</span>
            <span className="text-[10px] text-[#00e676] block mt-0.5">Temperatura Estável</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Câmara Térmica</span>
            <span className="text-lg font-bold text-white">{job.chamberTempCelsius}°C</span>
            <span className="text-[10px] text-[#38bdf8] block mt-0.5">Zero Deformação</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Operador Técnico</span>
            <span className="text-xs font-bold text-white truncate block">{job.operator}</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Certificado Nível 3</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Emissão de Frete</span>
            <span className="text-xs font-bold text-[#00e676] block">0 kg CO₂</span>
            <span className="text-[10px] text-[#00e676] block mt-0.5">Fabricação Local</span>
          </div>
        </div>
      </div>

      {/* Action to View Certificate */}
      <button
        onClick={() => onNavigate('impacto_ambiental')}
        className="w-full py-3.5 rounded-xl bg-[#141b24] border border-[#00e676]/40 text-[#00e676] hover:text-white hover:border-[#00e676] font-bold text-xs flex items-center justify-center gap-2 transition-all"
      >
        <Leaf className="w-4 h-4" />
        <span>Ver Contribuição no Painel de Descarbonização</span>
      </button>
    </div>
  );
};
