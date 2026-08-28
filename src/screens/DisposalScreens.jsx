import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Trash2, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  Share2, 
  Plus, 
  ChevronRight, 
  Leaf, 
  Check, 
  QrCode, 
  Building2,
  FileText,
  Truck
} from 'lucide-react';
import { 
  DISPOSAL_ITEMS, 
  SUSTAINABLE_COMPANIES, 
  SCHEDULED_COLLECTION 
} from '../data/mockData';
import { 
  getDisposalItems, 
  addDisposalItem, 
  getSustainableCompanies 
} from '../services/supabaseService';
import { useEffect } from 'react';

/**
 * 28 & 19. CENTRAL DE DESCARTE SUSTENTÁVEL
 */
export const DisposalCenterScreen = ({ onNavigate }) => {
  const [items, setItems] = useState(DISPOSAL_ITEMS);

  useEffect(() => {
    getDisposalItems('sp').then(data => {
      if (data && data.length > 0) setItems(data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-extrabold text-white">Descarte Sustentável</h1>
          <button
            onClick={() => onNavigate('adicionar_descarte')}
            className="p-2 rounded-xl bg-[#00e676] text-black font-bold text-xs flex items-center gap-1 shadow-sm shadow-[#00e676]/30 hover:brightness-110"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Novo</span>
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-3">Central de Destinação Ecológica e Reciclagem</p>

        {/* Dashboard 4 Mini Indicators */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 block">Itens para Descarte</span>
            <span className="text-xl font-extrabold text-white">{items.length}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 block">Peso Estimado</span>
            <span className="text-xl font-extrabold text-[#00e676]">
              {items.reduce((acc, curr) => acc + (curr.weightKg || 0), 0).toFixed(1)} kg
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 block">Coletas Agendadas</span>
            <span className="text-xl font-extrabold text-[#38bdf8]">3</span>
          </div>

          <div className="p-3 rounded-xl bg-[#141b24] border border-white/10">
            <span className="text-[10px] text-gray-400 block">Reciclados no Ano</span>
            <span className="text-xl font-extrabold text-yellow-400">1.240 kg</span>
          </div>
        </div>

        {/* Itens para descarte list matching visual reference */}
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
          Itens aguardando coleta
        </h3>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-[#141b24] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-gray-400">{item.quantity} • {item.weightKg} kg</p>
                </div>
              </div>
              <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-md font-semibold">
                Pendente
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-3">
        <button
          onClick={() => onNavigate('agendar_coleta')}
          className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Agendar coleta
        </button>

        <button
          onClick={() => onNavigate('empresas_sustentaveis')}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white font-semibold text-xs hover:border-[#00e676]/40 transition-all flex items-center justify-center gap-1.5"
        >
          <Building2 className="w-4 h-4 text-[#00e676]" />
          <span>Ver Empresas Especializadas e Certificados</span>
        </button>
      </div>
    </div>
  );
};

/**
 * 29 & 20. CADASTRAR ITEM PARA DESCARTE
 */
export const AddDisposalItemScreen = ({ onNavigate }) => {
  const [material, setMaterial] = useState('Ferro fundido');
  const [name, setName] = useState('Disco de Freio Desgastado');
  const [quantity, setQuantity] = useState('8 unidades');
  const [weight, setWeight] = useState('96');
  const [reason, setReason] = useState('Desgaste acima do limite de segurança');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDisposalItem({
        name,
        category: material,
        material,
        quantity,
        weightKg: parseFloat(weight) || 0,
        status: 'Aguardando coleta',
        unitId: 'sp'
      });
      alert('Item cadastrado com sucesso no banco de dados do Supabase!');
      onNavigate('descarte_central');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar item de descarte.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('descarte_central')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">+ Novo Descarte</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('qr_code_scanner')}
          className="w-full p-3 rounded-xl bg-[#141b24] border border-[#00e676]/30 text-[#00e676] text-xs font-semibold flex items-center justify-center gap-2 mb-3"
        >
          <QrCode className="w-4 h-4" />
          <span>Escanear peça com QR Code / Câmera</span>
        </button>

        <form id="add-disp-form" onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Nome do Item</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium text-gray-300 block mb-1">Tipo de Material</label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
              >
                <option>Ferro fundido / Metais</option>
                <option>Baterias (Chumbo)</option>
                <option>Borracha / Pneus</option>
                <option>Óleos e Fluidos</option>
                <option>Eletrônicos / ECU</option>
                <option>Plásticos Técnicos</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-300 block mb-1">Quantidade</label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Peso Total Estimado (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Motivo do Descarte</label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#00e676]"
              required
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        form="add-disp-form"
        className="w-full py-3.5 mt-4 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Confirmar Cadastro para Descarte
      </button>
    </div>
  );
};

/**
 * 30 & 22. EMPRESAS DE DESTINAÇÃO SUSTENTÁVEL
 */
export const SustainableCompaniesScreen = ({ onNavigate }) => {
  const [companies, setCompanies] = useState(SUSTAINABLE_COMPANIES);

  useEffect(() => {
    getSustainableCompanies().then(data => {
      if (data && data.length > 0) setCompanies(data);
    });
  }, []);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('descarte_central')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Empresas Parceiras</span>
          </button>
        </div>

        <h2 className="text-base font-bold text-white mb-1">Empresas Homologadas</h2>
        <p className="text-xs text-gray-400 mb-3">
          Parceiros certificados com licença ambiental IBAMA / Cetesb para coleta e reciclagem.
        </p>

        <div className="space-y-3">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="p-4 rounded-2xl bg-[#141b24] border border-white/5 hover:border-white/20 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e676]" />
                  <h3 className="text-xs font-bold text-white">{comp.name}</h3>
                </div>
                <span className="text-[10px] text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded-full font-bold border border-[#00e676]/30">
                  {comp.badge}
                </span>
              </div>

              <p className="text-xs text-gray-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00e676]" />
                <span>{comp.distanceKm} km de distância • {comp.address.split('—')[1] || 'SP'}</span>
              </p>

              <div className="bg-black/30 p-2.5 rounded-xl text-xs space-y-1">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Aceita:</span>
                <div className="flex flex-wrap gap-1">
                  {comp.acceptedMaterials.map((mat, idx) => (
                    <span key={idx} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded-md">
                      ✓ {mat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('agendar_coleta')}
                className="w-full py-2.5 rounded-xl bg-[#00e676] text-black font-bold text-xs hover:brightness-110 transition-all"
              >
                Agendar coleta com esta empresa
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * 32 & 23. AGENDAR COLETA DE RESÍDUOS
 */
export const ScheduleCollectionScreen = ({ onNavigate }) => {
  const [selectedDay, setSelectedDay] = useState(15);
  const [period, setPeriod] = useState('Tarde (14h às 18h)');
  const [notes, setNotes] = useState('Deixar materiais na área externa.');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('confirmacao_coleta');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('descarte_central')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Agendar Coleta</span>
          </button>
        </div>

        <form id="sched-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Calendar Picker matching visual reference */}
          <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">Maio 2026</span>
              <span className="text-[10px] text-gray-400 font-mono">Selecione a data</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] text-gray-400 font-bold py-1">{d}</span>
              ))}
              {days.map((day) => {
                const isSelected = day === selectedDay;
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#00e676] text-black font-extrabold shadow-sm shadow-[#00e676]/40 scale-105'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Período</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
            >
              <option>Manhã (8h às 12h)</option>
              <option>Tarde (14h às 18h)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium text-gray-300 block mb-1">Observações</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs focus:outline-none"
            />
          </div>
        </form>
      </div>

      <button
        type="submit"
        form="sched-form"
        className="w-full py-3.5 mt-4 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Confirmar agendamento
      </button>
    </div>
  );
};

/**
 * 33 & 24. CONFIRMAÇÃO DA COLETA
 */
export const CollectionConfirmationScreen = ({ onNavigate }) => {
  const col = SCHEDULED_COLLECTION;

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('descarte_central')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Coleta Agendada</span>
          </button>
        </div>

        {/* Big Confirmation Badge Card matching visual reference */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#16271c] to-[#0f1a14] border border-[#00e676] text-center space-y-3 mb-4 shadow-lg shadow-[#00e676]/15">
          <div className="w-12 h-12 rounded-full bg-[#00e676] text-black flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>

          <div>
            <span className="text-[10px] text-[#00e676] font-bold uppercase tracking-wider">Status</span>
            <h3 className="text-base font-extrabold text-white">{col.status}</h3>
            <p className="text-xs text-gray-300 mt-1 font-semibold">{col.companyName}</p>
          </div>

          <div className="bg-black/40 p-3 rounded-xl space-y-2 text-xs text-left">
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5 text-[#00e676]" /> Data:</span>
              <strong className="text-white">{col.date}</strong>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#00e676]" /> Horário:</span>
              <strong className="text-white">{col.timeSlot}</strong>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00e676]" /> Local:</span>
              <strong className="text-white">{col.location}</strong>
            </div>
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-[#00e676]" /> Carga:</span>
              <strong className="text-[#00e676]">{col.totalWeightKg} kg de resíduos</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button
          onClick={() => onNavigate('rastreamento_descarte')}
          className="w-full py-3 rounded-xl bg-[#00e676] text-black font-bold text-xs tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          Acompanhar Rastreamento da Coleta
        </button>

        <button
          onClick={() => onNavigate('certificado_destinacao')}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-[#00e676]/30 text-[#00e676] font-semibold text-xs hover:bg-[#00e676]/10 transition-all"
        >
          Ver Certificado Oficial de Destinação
        </button>

        <button
          onClick={() => onNavigate('descarte_central')}
          className="w-full py-2 text-center text-xs text-gray-400 hover:text-white"
        >
          Voltar para Central de Descarte
        </button>
      </div>
    </div>
  );
};

/**
 * 34 & 25. RASTREAMENTO DO DESCARTE
 */
export const DisposalTrackingScreen = ({ onNavigate }) => {
  const steps = [
    { num: 1, title: 'Coleta agendada', desc: 'Confirmada para 15/09 com EcoMetal', done: true, current: false },
    { num: 2, title: 'Material coletado', desc: 'Caminhão baú realizou retirada na doca 04', done: true, current: true },
    { num: 3, title: 'Em transporte', desc: 'Em rota para usina de processamento', done: false },
    { num: 4, title: 'Recebido pela empresa', desc: 'Triagem e pesagem oficial no destino', done: false },
    { num: 5, title: 'Processamento iniciado', desc: 'Descontaminação e trituração', done: false },
    { num: 6, title: 'Destinação concluída', desc: 'Certificado ESG homologado emitido', done: false }
  ];

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('confirmacao_coleta')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Rastreamento do Descarte</span>
          </button>
        </div>

        <div className="space-y-3 my-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  s.current
                    ? 'bg-[#00e676] text-black ring-4 ring-[#00e676]/30 font-black'
                    : s.done
                    ? 'bg-[#00b359] text-black'
                    : 'bg-[#141b24] border border-white/10 text-gray-500'
                }`}
              >
                {s.done ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
              </div>
              <div className="flex-1 pt-0.5">
                <h4 className={`text-xs font-bold ${s.current ? 'text-[#00e676]' : s.done ? 'text-white' : 'text-gray-500'}`}>
                  {s.title}
                </h4>
                <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate('certificado_destinacao')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Visualizar Certificado de Destinação
      </button>
    </div>
  );
};

/**
 * 35 & 25. CERTIFICADO DE DESTINAÇÃO SUSTENTÁVEL
 */
export const DestinationCertificateScreen = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('descarte_central')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Certificado ESG</span>
          </button>
        </div>

        {/* Certificate Paper Style Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141f18] to-[#0c1410] border-2 border-[#00e676] text-center space-y-3 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#00e676]/30 pb-2">
            <span className="text-[10px] font-bold text-[#00e676] uppercase tracking-widest">
              IVECO ESG SUSTAINABILITY
            </span>
            <span className="text-[9px] font-mono text-gray-400">CERT-2026-0915</span>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-white">CERTIFICADO DE DESTINAÇÃO SUSTENTÁVEL</h3>
            <p className="text-[11px] text-gray-300 mt-0.5">
              Atestamos que os resíduos industriais abaixo foram recolhidos e destinados em conformidade com as normas ambientais vigentes.
            </p>
          </div>

          <div className="bg-black/50 p-3 rounded-xl text-left space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Unidade Geradora:</span>
              <strong className="text-white">IVECO São Paulo</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Empresa Receptora:</span>
              <strong className="text-[#00e676]">EcoMetal Reciclagem</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Licença IBAMA:</span>
              <strong className="text-white font-mono">CTF 8492019/SP</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantidade / Peso:</span>
              <strong className="text-white">16 itens • 348 kg</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Método de Destinação:</span>
              <strong className="text-[#00e676]">Reciclagem Siderúrgica / Re-refino</strong>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1">
            <ShieldCheck className="w-5 h-5 text-[#00e676]" />
            <span className="text-[10px] font-bold text-[#00e676] uppercase">Autenticado Digitalmente</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <button
          onClick={() => alert('Download do Certificado PDF iniciado!')}
          className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Baixar Certificado em PDF</span>
        </button>

        <button
          onClick={() => alert('Link seguro para auditoria copiado para a área de transferência.')}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-gray-300 font-semibold text-xs hover:text-white flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartilhar para Auditoria</span>
        </button>
      </div>
    </div>
  );
};
