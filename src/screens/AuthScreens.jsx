import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  BadgeCheck, 
  Search, 
  Check, 
  Building2, 
  Fingerprint,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { IvecoTruckVisual, IvecoFacilityVisual } from '../components/VisualIllustrations';
import { IVECO_UNITS } from '../data/mockData';
import { signInWithGoogle } from '../services/supabaseService';

/**
 * 1. SPLASH / HERO SCREEN
 */
export const SplashScreen = ({ onNavigate }) => {
  return (
    <div className="relative h-full flex flex-col justify-between bg-gradient-to-b from-[#090d13] via-[#0d141d] to-[#080c10] px-6 py-10 overflow-hidden select-none">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00e676]/5 filter blur-3xl pointer-events-none" />

      {/* Top Header & Brand */}
      <div className="text-center pt-8 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00e676]/10 border border-[#00e676]/30 text-[#00e676] text-xs font-semibold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
          Versão 2.0 • IA & Economia Circular
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-[#00e676] drop-shadow-[0_0_15px_rgba(0,230,118,0.5)]">ECOFICINA</span>{' '}
          <span className="text-white">IVECO</span>
        </h1>
        <p className="text-gray-400 text-sm font-medium mt-2 max-w-[260px] mx-auto italic">
          “Transformar descarte em desempenho.”
        </p>
      </div>

      {/* Center 3D Truck Visual */}
      <div className="relative my-auto py-2 z-10">
        <IvecoTruckVisual scanning={true} className="scale-105" />
      </div>

      {/* Bottom Actions */}
      <div className="space-y-3 z-10">
        <button
          onClick={() => onNavigate('login')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00e676] to-[#00b359] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#00e676]/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Acessar Plataforma</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={() => onNavigate('cadastro_1')}
          className="w-full py-3.5 rounded-xl bg-[#141b24] border border-white/10 text-gray-200 font-semibold text-sm hover:border-[#00e676]/40 hover:text-white transition-all"
        >
          Criar Nova Conta Técnica
        </button>

        <p className="text-center text-[11px] text-gray-400">
          Rede Conectada de Unidades e Concessionárias IVECO
        </p>
      </div>
    </div>
  );
};

/**
 * 2. LOGIN SCREEN
 */
export const LoginScreen = ({ onNavigate, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('gaspar.junior@iveco.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
    onNavigate('dashboard');
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      await signInWithGoogle();
    } catch (err) {
      console.warn('Erro ao autenticar com o Google no Supabase:', err.message);
      alert('Iniciando sessão com Google via Supabase Auth...');
      if (onLogin) onLogin();
      onNavigate('dashboard');
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-6 py-8 overflow-y-auto">
      {/* Header */}
      <div className="text-center pt-6">
        <h1 className="text-2xl font-extrabold tracking-tight">
          <span className="text-[#00e676]">ECOFICINA</span>{' '}
          <span className="text-white">IVECO</span>
        </h1>
        <p className="text-gray-300 text-sm mt-1 font-medium">Bem-vindo de volta!</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="my-auto space-y-4 py-3">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
          className="w-full py-3 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] border border-gray-200"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>{loadingGoogle ? 'Conectando ao Google...' : 'Continuar com o Google'}</span>
        </button>

        {/* Divider */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0a0e14] px-3 text-[11px] text-gray-400 uppercase tracking-wider">
            ou com e-mail corporativo
          </span>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5">
            E-mail corporativo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@iveco.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-gray-300">Senha</label>
            <button
              type="button"
              onClick={() => alert('Instruções de recuperação enviadas para o e-mail corporativo.')}
              className="text-xs text-[#00e676] hover:underline"
            >
              Esqueceu sua senha?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha de acesso"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[#00e676] focus:ring-1 focus:ring-[#00e676] transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e676] to-[#00b359] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all mt-4"
        >
          Entrar com E-mail
        </button>

        {/* Biometrics Button */}
        <button
          type="button"
          onClick={() => {
            if (onLogin) onLogin();
            onNavigate('dashboard');
          }}
          className="w-full py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-gray-200 font-medium text-xs hover:border-[#00e676]/50 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <Fingerprint className="w-4 h-4 text-[#00e676]" />
          <span>Entrar com biometria</span>
        </button>
      </form>

      {/* Footer link */}
      <div className="text-center pt-2 pb-2">
        <p className="text-xs text-gray-400">
          Não tem conta?{' '}
          <button
            type="button"
            onClick={() => onNavigate('cadastro_1')}
            className="text-[#00e676] font-semibold hover:underline"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

/**
 * 3. CADASTRO STEP 1/3 — DADOS PESSOAIS
 */
export const CadastroStep1Screen = ({ onNavigate, formData, setFormData }) => {
  const handleChange = (field, val) => {
    if (setFormData) {
      setFormData(prev => ({ ...prev, [field]: val }));
    }
  };

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-6 overflow-y-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Cadastro</span>
          </button>
          <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            1/3
          </span>
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Dados pessoais</h2>
        <p className="text-xs text-gray-400">Preencha suas informações corporativas para identificação técnica.</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-3.5 my-4">
        {/* Nome */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            defaultValue={formData?.name || "Gaspar Ricardo Junior"}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Nome completo"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>

        {/* Email Corporativo */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            defaultValue={formData?.email || "gaspar.junior@iveco.com"}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="E-mail corporativo"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>

        {/* Telefone */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="tel"
            defaultValue={formData?.phone || "(11) 98765-4321"}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Telefone"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>

        {/* Cargo */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Briefcase className="w-4 h-4" />
          </div>
          <input
            type="text"
            defaultValue={formData?.roleTitle || "Técnico Especialista"}
            onChange={(e) => handleChange('roleTitle', e.target.value)}
            placeholder="Cargo / função"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>

        {/* Matrícula */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <BadgeCheck className="w-4 h-4" />
          </div>
          <input
            type="text"
            defaultValue={formData?.registrationId || "IVC-884920"}
            onChange={(e) => handleChange('registrationId', e.target.value)}
            placeholder="Matrícula / ID profissional"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>

        {/* Senha */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            defaultValue="senhaSegura123"
            placeholder="Senha"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400"
          >
            {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
          </button>
        </div>

        {/* Confirmar Senha */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            type={showConfirm ? 'text' : 'password'}
            defaultValue="senhaSegura123"
            placeholder="Confirmar senha"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400"
          >
            {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onNavigate('cadastro_2')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Continuar
      </button>
    </div>
  );
};

/**
 * 4. CADASTRO STEP 2/3 — SELEÇÃO OBRIGATÓRIA DA UNIDADE IVECO
 */
export const CadastroStep2Screen = ({ onNavigate, selectedUnit, setSelectedUnit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = IVECO_UNITS.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-6 overflow-y-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('cadastro_1')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Cadastro</span>
          </button>
          <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            2/3
          </span>
        </div>
        <h2 className="text-lg font-bold text-white mb-1">Selecione sua unidade IVECO</h2>
        <p className="text-xs text-gray-400">
          O vínculo à unidade é obrigatório para gestão de estoque e trocas.
        </p>

        {/* Search Bar */}
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar unidade IVECO"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141b24] border border-white/10 text-white text-xs placeholder-gray-400 focus:outline-none focus:border-[#00e676]"
          />
        </div>
      </div>

      {/* Units List */}
      <div className="my-4 space-y-2.5 overflow-y-auto max-h-[340px] pr-1">
        {filteredUnits.map((unit) => {
          const isSelected = (selectedUnit?.id || 'sp') === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit && setSelectedUnit(unit)}
              className={`w-full p-3.5 rounded-xl flex items-center justify-between border transition-all text-left ${
                isSelected
                  ? 'bg-gradient-to-r from-[#16271c] to-[#121c16] border-[#00e676] shadow-sm shadow-[#00e676]/20'
                  : 'bg-[#141b24] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-[#00e676] text-black' : 'bg-black/40 text-gray-400'
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{unit.name}</h4>
                  <p className="text-[11px] text-gray-400">{unit.city} — {unit.state}</p>
                </div>
              </div>

              {isSelected ? (
                <div className="w-6 h-6 rounded-full bg-[#00e676] flex items-center justify-center text-black">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-500 rotate-180" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action */}
      <button
        onClick={() => onNavigate('cadastro_3')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Continuar
      </button>
    </div>
  );
};

/**
 * 5. CADASTRO STEP 3/3 — UNIDADE VINCULADA & CONFIRMAÇÃO
 */
export const CadastroStep3Screen = ({ onNavigate, selectedUnit, onCompleteSignup }) => {
  const unit = selectedUnit || IVECO_UNITS[0];

  const handleFinish = () => {
    if (onCompleteSignup) onCompleteSignup(unit);
    onNavigate('dashboard');
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-6 overflow-y-auto">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('cadastro_2')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Cadastro</span>
          </button>
          <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            3/3
          </span>
        </div>
      </div>

      {/* Center Card */}
      <div className="my-auto text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#00e676]/10 border border-[#00e676]/30 flex items-center justify-center mx-auto text-[#00e676]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Unidade vinculada
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">{unit.name}</h2>
          <p className="text-xs text-[#00e676] font-medium flex items-center justify-center gap-1 mt-1">
            <span>📍</span> {unit.city} — {unit.state}
          </p>
        </div>

        {/* Visual facility image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg">
          <IvecoFacilityVisual className="h-36" />
        </div>

        <div className="p-3.5 rounded-xl bg-[#141b24] border border-white/5 text-left">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Você ficará permanentemente associado a esta unidade. Para alterar, solicite autorização administrativa através do menu de configurações.
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={handleFinish}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e676] to-[#00b359] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#00e676]/25 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Concluir cadastro
      </button>
    </div>
  );
};
