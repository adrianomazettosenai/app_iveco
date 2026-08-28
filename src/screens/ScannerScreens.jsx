import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Settings, 
  Camera, 
  QrCode, 
  Zap, 
  Image as ImageIcon, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  Search, 
  ShieldAlert, 
  Layers, 
  RefreshCw, 
  Cpu, 
  Sparkles,
  Info,
  Sliders
} from 'lucide-react';
import { 
  IvecoTruckVisual, 
  AlternatorVisual, 
  BrakeDiscVisual, 
  TurboCompressorVisual 
} from '../components/VisualIllustrations';
import { CameraView } from '../components/CameraView';
import { analyzePartWithGoogleAI } from '../services/aiVisionService';
import { TRUCK_INSPECTION_MOCK, PARTS_CATALOG } from '../data/mockData';

/**
 * 7. SCANNER — SELEÇÃO DE FUNÇÃO
 */
export const ScannerHomeScreen = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Scanner</span>
          </button>
          <button
            onClick={() => onNavigate('configuracoes')}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-base font-bold text-white mb-1">Escolha o tipo de análise</h2>
        <p className="text-xs text-gray-400">
          Tecnologia de visão computacional e diagnóstico inteligente IVECO com IA.
        </p>
      </div>

      {/* Two Big Interactive Cards */}
      <div className="space-y-4 my-auto py-2">
        {/* Option 1: Caminhões: Modelo & Avarias */}
        <button
          onClick={() => onNavigate('scanner_caminhao_live')}
          className="w-full p-4 rounded-2xl bg-gradient-to-b from-[#16202c] to-[#0f1720] border border-white/10 hover:border-[#00e676]/60 transition-all text-left group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-extrabold text-white group-hover:text-[#00e676] transition-colors">
              Caminhões: Modelo & Avarias
            </h3>
            <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full border border-[#00e676]/30">
              Modelo + Avarias
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Identificação inteligente de modelo, motorização e detecção de avarias por IA.
          </p>

          <div className="relative rounded-xl overflow-hidden bg-black/40 p-2 border border-white/5 flex items-center justify-center">
            <IvecoTruckVisual scanning={true} className="h-32" />
          </div>
        </button>

        {/* Option 2: Análise de Peças */}
        <button
          onClick={() => onNavigate('scanner_peca_live')}
          className="w-full p-4 rounded-2xl bg-gradient-to-b from-[#16202c] to-[#0f1720] border border-white/10 hover:border-[#00e676]/60 transition-all text-left group shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-extrabold text-white group-hover:text-[#00e676] transition-colors">
              Análise de peças
            </h3>
            <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full border border-[#00e676]/30">
              QR Code + IA
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Diagnóstico inteligente de componentes, desgaste, estoque e destinação.
          </p>

          <div className="relative rounded-xl overflow-hidden bg-black/40 p-2 border border-white/5 flex items-center justify-center">
            <AlternatorVisual scanning={true} className="h-32" />
          </div>
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center">
        <button
          onClick={() => onNavigate('qr_code_scanner')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#00e676] hover:underline"
        >
          <QrCode className="w-4 h-4" />
          <span>Acesso direto ao Leitor de QR Code de Peças</span>
        </button>
      </div>
    </div>
  );
};

/**
 * 8. SCANNER DE CAMINHÕES (MODELO & AVARIAS LIVE COM IA)
 */
export const ScannerTruckLiveScreen = ({ onNavigate }) => {
  const [filterMode, setFilterMode] = useState('todos'); // todos | modelo | avarias

  const handleCapture = (photoData) => {
    onNavigate('analise_caminhao_loading');
  };

  return (
    <CameraView onCapture={handleCapture} fallbackVisual={<IvecoTruckVisual scanning={true} className="h-32" />}>
      {({ capturePhoto, toggleFacingMode, openGallery }) => (
        <div className="h-full flex flex-col justify-between select-none relative pointer-events-auto">
          {/* Top HUD */}
          <div className="z-10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('scanner_home')}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Scanner: Modelo & Avarias
              </h3>
              <p className="text-[10px] text-[#00e676] font-mono animate-pulse">
                ● DETECTANDO VEÍCULO & AVARIAS
              </p>
            </div>

            <button
              onClick={toggleFacingMode}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10"
              title="Alternar câmera"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
            </button>
          </div>

          {/* Center Camera Viewfinder with Dedicated Model & Damage Reticles */}
          <div className="relative my-auto flex items-center justify-center">
            {/* Viewfinder Target Brackets */}
            <div className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl border border-[#00e676]/40 p-3 flex items-center justify-center bg-transparent shadow-2xl">
              {/* Target Corners */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#00e676]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#00e676]" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#00e676]" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#00e676]" />

              {/* Dynamic Detection Floating Tags based on filterMode */}
              <div className="absolute inset-x-2 bottom-3 flex flex-col gap-1.5 items-center">
                {(filterMode === 'todos' || filterMode === 'modelo') && (
                  <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#00e676]/60 text-[11px] font-mono text-[#00e676] flex items-center gap-1.5 whitespace-nowrap shadow-md">
                    <Sparkles className="w-3 h-3 text-[#00e676]" />
                    <span>IVECO S-WAY 540 cv (2023) • 99.4%</span>
                  </div>
                )}

                {(filterMode === 'todos' || filterMode === 'avarias') && (
                  <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-yellow-400/60 text-[10px] font-mono text-yellow-300 flex items-center gap-1.5 whitespace-nowrap shadow-md">
                    <AlertTriangle className="w-3 h-3 text-yellow-400" />
                    <span>Avaria Detectada: Para-choque Frontal</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="z-10 space-y-3">
            {/* Filter Mode Selector: Modelo vs Avarias */}
            <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 max-w-[280px] mx-auto text-[11px] font-semibold">
              <button
                onClick={() => setFilterMode('todos')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'todos' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Geral
              </button>
              <button
                onClick={() => setFilterMode('modelo')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'modelo' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Modelo
              </button>
              <button
                onClick={() => setFilterMode('avarias')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  filterMode === 'avarias' ? 'bg-yellow-400 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Avarias
              </button>
            </div>

            {/* Shutter & Actions Bar */}
            <div className="flex items-center justify-around pb-2">
              <button
                onClick={openGallery}
                className="p-3 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all border border-white/10"
                title="Abrir foto da galeria"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              {/* Big White Shutter Button */}
              <button
                onClick={() => {
                  const photo = capturePhoto();
                  handleCapture(photo);
                }}
                className="w-18 h-18 rounded-full border-4 border-white/80 p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black"
              >
                <div className="w-full h-full rounded-full bg-white active:bg-gray-300" />
              </button>

              <button
                onClick={toggleFacingMode}
                className="p-3 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all border border-white/10"
                title="Alternar Câmera"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CameraView>
  );
};

/**
 * 9. ANÁLISE DO CAMINHÃO (LOADING NEURAL: MODELO & AVARIAS)
 */
export const TruckAnalysisLoadingScreen = ({ onNavigate }) => {
  const [progress, setProgress] = useState(15);
  const [stepText, setStepText] = useState('Identificando modelo, versão e motorização IVECO...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStepText('Mapeando superfície da cabine, para-choques e faróis...');
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStepText('Detectando avarias, trincas e deformações com IA...');
    }, 1300);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepText('Relatório de modelo e avarias concluído!');
      setTimeout(() => {
        onNavigate('resultado_caminhao');
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onNavigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0a0e14] px-6 text-center select-none">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#00e676]/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-[#00e676] border-t-transparent animate-spin" />
        <div className="w-full h-full rounded-full bg-[#00e676]/10 flex items-center justify-center text-[#00e676]">
          <Cpu className="w-10 h-10" />
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-1">Diagnóstico do Caminhão por IA</h2>
      <p className="text-xs text-[#00e676] font-mono mb-6">{stepText}</p>

      {/* Progress Bar */}
      <div className="w-full max-w-[240px] h-2 bg-[#141b24] rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#00b359] to-[#00e676] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[11px] font-mono text-gray-400 mt-2">{progress}%</span>
    </div>
  );
};

/**
 * 10. RESULTADO DO CAMINHÃO (MODELO & AVARIAS DETECTADAS)
 */
export const TruckResultScreen = ({ onNavigate, onSelectComponent }) => {
  const [tab, setTab] = useState('avarias'); // avarias | modelo
  const [selectedPin, setSelectedPin] = useState('freios');
  const data = TRUCK_INSPECTION_MOCK;

  const handleComponentClick = (comp) => {
    if (onSelectComponent) onSelectComponent(comp);
    onNavigate('detalhes_componente');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('scanner_home')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Diagnóstico do Caminhão</span>
          </button>
        </div>

        {/* Vehicle Identified Header Card */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 mb-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">{data.model}</h2>
              <span className="text-[10px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full border border-[#00e676]/30">
                Saúde: {data.healthScore}%
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">{data.year} • {data.subModel}</p>
            <p className="text-[11px] text-gray-400 font-mono">Placa: {data.licensePlate} • {data.mileage}</p>
          </div>
          <div className="w-16 h-12 rounded-lg bg-black/40 p-1 flex items-center justify-center border border-white/5">
            <IvecoTruckVisual className="scale-75" />
          </div>
        </div>

        {/* Tabs: Avarias Detectadas (IA) | Modelo & Estrutura */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#141b24] border border-white/10 mb-3">
          <button
            onClick={() => setTab('avarias')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'avarias' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Avarias ({data.damages?.length || 4})</span>
          </button>
          <button
            onClick={() => setTab('modelo')}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              tab === 'modelo' ? 'bg-[#00e676] text-black font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Modelo & Estrutura</span>
          </button>
        </div>

        {/* Tab 1: Avarias Detectadas com IA */}
        {tab === 'avarias' && (
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-[#111720] border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-200">Relatório Visual de Danos</span>
              <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/30">
                2 Recomendações
              </span>
            </div>

            {(data.damages || []).map((dam) => (
              <div
                key={dam.id}
                className="p-3.5 rounded-xl bg-[#141b24] border border-white/10 space-y-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: dam.severityColor }}
                    />
                    <h4 className="text-xs font-bold text-white">{dam.location}</h4>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${dam.severityColor}20`,
                      color: dam.severityColor,
                      border: `1px solid ${dam.severityColor}50`
                    }}
                  >
                    {dam.severity}
                  </span>
                </div>

                <p className="text-xs text-gray-300">{dam.description}</p>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">Ação: <b className="text-gray-200">{dam.actionNeeded}</b></span>
                  <span className="text-[#00e676] font-semibold">{dam.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Modelo & Estrutura Geral */}
        {tab === 'modelo' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 space-y-2.5 text-xs">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider text-gray-400">
                Ficha Técnica do Veículo
              </h3>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Motorização</span>
                  <span className="font-bold text-white">Cursor 13 (540 cv)</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Transmissão</span>
                  <span className="font-bold text-white">Hi-Tronix 12V</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Tração</span>
                  <span className="font-bold text-white">6x2 Rodoviário</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Chassi</span>
                  <span className="font-bold text-white font-mono">{data.chassis}</span>
                </div>
              </div>
            </div>

            {/* Interactive Truck Diagram */}
            <div className="p-2 rounded-2xl bg-[#111720] border border-white/10 relative overflow-hidden">
              <span className="text-[10px] font-mono text-gray-400 block text-center mb-1">
                Mapa estrutural do caminhão
              </span>
              <IvecoTruckVisual
                showPins={true}
                activePin={selectedPin}
                onSelectPin={(pin) => {
                  setSelectedPin(pin);
                  const comp = data.components.find(c => c.id === pin);
                  if (comp) handleComponentClick(comp);
                }}
                className="h-44"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => onNavigate('scanner_home')}
        className="w-full py-3.5 mt-3 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Concluir Inspeção do Caminhão
      </button>
    </div>
  );
};

/**
 * 11. DETALHES DO COMPONENTE (Ex: Freios / Lanterna)
 */
export const ComponentDetailScreen = ({ onNavigate, component }) => {
  const comp = component || TRUCK_INSPECTION_MOCK.components[2]; // Default: Freios

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('resultado_caminhao')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Detalhes do Componente</span>
          </button>
        </div>

        {/* Title & Badge */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-extrabold text-white">{comp.name}</h2>
            <span className="text-xs text-gray-400">{comp.category}</span>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
            style={{
              backgroundColor: `${comp.color}20`,
              color: comp.color,
              border: `1px solid ${comp.color}60`
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: comp.color }} />
            {comp.statusLabel}
          </span>
        </div>

        {/* High Detail 3D Component Render */}
        <div className="p-4 rounded-2xl bg-[#111720] border border-white/10 mb-4 flex items-center justify-center">
          {comp.id === 'freios' ? (
            <BrakeDiscVisual className="h-36" />
          ) : comp.id === 'motor' ? (
            <TurboCompressorVisual className="h-36" />
          ) : (
            <AlternatorVisual className="h-36" />
          )}
        </div>

        {/* Technical Description & Wear Progress Bar */}
        <div className="p-4 rounded-2xl bg-[#141b24] border border-white/10 space-y-3.5 mb-4">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Descrição
            </span>
            <p className="text-xs text-gray-200 mt-1 leading-relaxed">
              {comp.description || 'Desgaste acima do recomendado. Revisão necessária em breve.'}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium text-gray-400">Nível de desgaste</span>
              <span className="font-bold text-white font-mono">{comp.wearPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${comp.wearPercentage}%`,
                  backgroundColor: comp.color
                }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Recomendação Técnica
            </span>
            <p className="text-xs text-[#00e676] font-medium mt-1">
              {comp.recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Button */}
      <button
        onClick={() => onNavigate('estoque_rede')}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e676] to-[#00b359] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <span>Ver soluções e buscar peça na rede</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};

/**
 * 12. SCANNER DE PEÇAS (CÂMERA LIVE)
 */
export const ScannerPartLiveScreen = ({ onNavigate }) => {
  const handleCapture = (photoData) => {
    onNavigate('analise_peca_loading');
  };

  return (
    <CameraView onCapture={handleCapture} fallbackVisual={<AlternatorVisual scanning={true} className="h-32" />}>
      {({ capturePhoto, toggleFacingMode, openGallery }) => (
        <div className="h-full flex flex-col justify-between select-none relative pointer-events-auto">
          {/* Top HUD */}
          <div className="z-10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('scanner_home')}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Scanner de Peças
              </h3>
              <p className="text-[10px] text-[#00e676] font-mono animate-pulse">
                ● CÂMERA AO VIVO COM IA
              </p>
            </div>

            <button
              onClick={toggleFacingMode}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10"
              title="Alternar câmera"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
            </button>
          </div>

          {/* Center Viewfinder */}
          <div className="relative my-auto flex items-center justify-center">
            <div className="relative w-full max-w-[280px] aspect-square rounded-2xl border border-[#00e676]/60 p-4 flex items-center justify-center bg-transparent shadow-2xl">
              {/* Target Corners */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#00e676]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#00e676]" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#00e676]" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#00e676]" />

              {/* AI Part Detection Tag */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#00e676]/60 text-[11px] font-mono text-[#00e676] whitespace-nowrap">
                Alternador 28V 100A • 99.1%
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="z-10 space-y-4">
            <div className="flex items-center justify-around pb-2">
              <button
                onClick={openGallery}
                className="p-3 rounded-full bg-black/60 text-white hover:bg-white/20 transition-all border border-white/10"
                title="Abrir foto da galeria"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  const photo = capturePhoto();
                  handleCapture(photo);
                }}
                className="w-18 h-18 rounded-full border-4 border-white/80 p-1 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <div className="w-full h-full rounded-full bg-white active:bg-gray-300" />
              </button>

              <button
                onClick={() => onNavigate('qr_code_scanner')}
                className="p-3 rounded-full bg-black/60 text-[#00e676] hover:bg-white/20 transition-all border border-white/10"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </CameraView>
  );
};

/**
 * 13. LEITURA DE QR CODE
 */
export const QRCodeScannerScreen = ({ onNavigate }) => {
  const [reading, setReading] = useState(true);

  const simulateScan = () => {
    setReading(false);
    setTimeout(() => {
      onNavigate('resultado_peca');
    }, 400);
  };

  return (
    <CameraView onCapture={simulateScan}>
      {() => (
        <div className="h-full flex flex-col justify-between select-none relative pointer-events-auto">
          {/* Header */}
          <div className="z-10 flex items-center justify-between">
            <button
              onClick={() => onNavigate('scanner_home')}
              className="p-2 rounded-full bg-black/60 text-white border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Leitura de QR Code
            </h3>
            <div className="w-8" />
          </div>

          {/* QR Reticle */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            <div
              onClick={simulateScan}
              className="relative w-64 h-64 rounded-3xl border-2 border-[#00e676] bg-black/40 backdrop-blur-sm p-4 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(0,230,118,0.2)] hover:border-white transition-colors"
            >
              {/* QR Code graphic */}
              <QrCode className="w-32 h-32 text-white opacity-80" />

              <p className="text-xs text-[#00e676] font-mono mt-3 text-center">
                Toque para ler peça: Cód. 504385987
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center max-w-[220px]">
              Aponte para a etiqueta metálica ou gravada no componente IVECO.
            </p>
          </div>

          {/* Bottom Option */}
          <div className="z-10 text-center">
            <button
              onClick={() => onNavigate('scanner_peca_live')}
              className="py-3 px-6 rounded-xl bg-[#141b24] border border-white/10 text-xs font-semibold text-gray-300 hover:text-white"
            >
              Usar Reconhecimento Visual da Câmera
            </button>
          </div>
        </div>
      )}
    </CameraView>
  );
};

/**
 * 14. ANÁLISE DA PEÇA (LOADING POR IA)
 */
export const PartAnalysisLoadingScreen = ({ onNavigate }) => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(60), 600);
    const t2 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => onNavigate('resultado_peca'), 400);
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onNavigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#0a0e14] px-6 text-center select-none">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#00e676]/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-[#00e676] border-t-transparent animate-spin" />
        <div className="w-full h-full rounded-full bg-[#00e676]/10 flex items-center justify-center text-[#00e676]">
          <Cpu className="w-8 h-8" />
        </div>
      </div>

      <h2 className="text-lg font-bold text-white mb-1">Análise Estrutural por IA</h2>
      <p className="text-xs text-[#00e676] font-mono mb-4">
        Medindo fadiga de material, trincas e condutividade...
      </p>

      <div className="w-full max-w-[220px] h-2 bg-[#141b24] rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full bg-[#00e676] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

/**
 * 15. RESULTADO DA PEÇA
 */
export const PartResultScreen = ({ onNavigate, part }) => {
  const currentPart = part || PARTS_CATALOG[0]; // Alternador

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('scanner_home')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Resultado da Peça</span>
          </button>
        </div>

        {/* Part Card Banner */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 mb-3 flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-black/40 p-1 flex items-center justify-center border border-white/5 shrink-0">
            <AlternatorVisual className="scale-90" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">{currentPart.name}</h2>
            <p className="text-xs text-gray-300 font-mono">Código: {currentPart.code}</p>
            <p className="text-[11px] text-gray-400">Categoria: {currentPart.category}</p>
          </div>
        </div>

        {/* Status da Peça - Reutilizável Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#15261c] to-[#101b15] border border-[#00e676]/40 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
            Status da peça
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-4 h-4 rounded-full bg-[#00e676] flex items-center justify-center text-black">
              <CheckCircle2 className="w-3 h-3 stroke-[3]" />
            </div>
            <h3 className="text-base font-extrabold text-[#00e676]">{currentPart.condition}</h3>
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Componente aprovado em bancada e testes de estresse. Em boas condições de uso.
          </p>
        </div>

        {/* Metrics Box */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 space-y-3 mb-3">
          {/* Wear Progress */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-400 font-medium">Nível de desgaste</span>
              <span className="font-bold text-white font-mono">{currentPart.wearPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-[#00e676] rounded-full"
                style={{ width: `${currentPart.wearPercentage}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[11px] text-gray-400 font-medium block">Compatibilidade</span>
            <span className="text-xs font-bold text-white">{currentPart.compatibility}</span>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">Disponibilidade em estoque</span>
            <span className="text-xs font-bold text-[#00e676]">Disponível em {currentPart.quantity} unidades</span>
          </div>
        </div>

        {/* Technical Diagnostic Details link */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => onNavigate('diagnostico_detalhado')}
            className="text-xs text-[#00e676] font-semibold hover:underline flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Ver diagnóstico detalhado</span>
          </button>
          <button
            onClick={() => onNavigate('decisao_destino')}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
          >
            <span>Classificação de Destino</span>
            <ChevronLeft className="w-3 h-3 rotate-180" />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 mt-3">
        <button
          onClick={() => onNavigate('estoque_local')}
          className="w-full py-3 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Ver no estoque
        </button>
        <button
          onClick={() => onNavigate('nova_solicitacao')}
          className="w-full py-3 rounded-xl bg-[#141b24] border border-white/10 text-white font-semibold text-xs hover:border-[#00e676]/40 transition-all"
        >
          Solicitar troca
        </button>
      </div>
    </div>
  );
};

/**
 * 16. DIAGNÓSTICO DETALHADO DA PEÇA
 */
export const PartDiagnosticDetailScreen = ({ onNavigate, part }) => {
  const currentPart = part || PARTS_CATALOG[0];

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('resultado_peca')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Diagnóstico Detalhado</span>
          </button>
        </div>

        <h2 className="text-base font-extrabold text-white mb-0.5">{currentPart.name}</h2>
        <p className="text-xs text-gray-400 mb-3 font-mono">Código: {currentPart.code}</p>

        {/* Detailed Grid Parameters */}
        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-[#141b24] border border-white/5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Fabricante / Origem</span>
            <span className="text-xs font-bold text-white">{currentPart.manufacturer}</span>
            <span className="text-[11px] text-gray-400 block mt-0.5">{currentPart.productionPlace}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-[#141b24] border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Data Fabricação</span>
              <span className="text-xs font-bold text-white">{currentPart.manufacturingDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#141b24] border border-white/5">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">CO₂ Evitado</span>
              <span className="text-xs font-bold text-[#00e676]">{currentPart.co2SavingsKg} kg</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/5 space-y-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Ensaio Não Destrutivo (END)</span>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Corrosão:</span>
              <span className="font-semibold text-white">{currentPart.corrosion}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Deformação:</span>
              <span className="font-semibold text-white">{currentPart.deformation}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Trincas / Fissuras:</span>
              <span className="font-semibold text-white">{currentPart.cracks}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Parecer Geral</span>
            <p className="text-xs text-gray-200 leading-relaxed">{currentPart.overallState}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('decisao_destino')}
        className="w-full py-3 mt-3 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Definir Destino da Peça
      </button>
    </div>
  );
};

/**
 * 17. RECOMENDAÇÃO DE DESTINO (OS 4 DESTINOS DA IA)
 */
export const PartDestinationDecisionScreen = ({ onNavigate, part }) => {
  const destinations = [
    {
      id: 'reutilizar',
      title: 'REUTILIZAR',
      desc: 'Pode voltar diretamente à utilização no estoque local ou em caminhão.',
      color: '#00e676',
      badge: 'Recomendação IA',
      action: () => onNavigate('estoque_local')
    },
    {
      id: 'reaproveitar',
      title: 'REAPROVEITAR',
      desc: 'Pode ser utilizada para outra finalidade ou ter componentes internos aproveitados.',
      color: '#00e676',
      action: () => onNavigate('disponibilizar_troca')
    },
    {
      id: 'recuperar',
      title: 'RECUPERAR',
      desc: 'Precisa passar por manutenção, usinagem ou recondicionamento preventivo.',
      color: '#eab308',
      action: () => onNavigate('estoque_local')
    },
    {
      id: 'descartar',
      title: 'DESCARTAR',
      desc: 'Não possui condição técnica de segurança. Enviar para empresa especializada.',
      color: '#ef4444',
      action: () => onNavigate('adicionar_descarte')
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('resultado_peca')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Destino da Peça</span>
          </button>
        </div>

        <h2 className="text-base font-extrabold text-white mb-1">Classificação por IA</h2>
        <p className="text-xs text-gray-400 mb-4">
          A plataforma prioriza economia circular antes de qualquer recomendação de descarte.
        </p>

        <div className="space-y-2.5">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={dest.action}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                dest.id === 'reutilizar'
                  ? 'bg-gradient-to-r from-[#15261c] to-[#101b15] border-[#00e676] shadow-md shadow-[#00e676]/15'
                  : 'bg-[#141b24] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: dest.color }}
                  />
                  <h4
                    className="text-xs font-black tracking-wider"
                    style={{ color: dest.color }}
                  >
                    {dest.title}
                  </h4>
                </div>
                {dest.badge && (
                  <span className="text-[10px] font-bold bg-[#00e676]/20 text-[#00e676] px-2 py-0.5 rounded-full border border-[#00e676]/40">
                    {dest.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{dest.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onNavigate('adicionar_descarte')}
          className="w-full py-3 rounded-xl bg-[#141b24] border border-red-500/40 text-red-400 font-semibold text-xs hover:border-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <span>Enviar para Descarte Sustentável</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
