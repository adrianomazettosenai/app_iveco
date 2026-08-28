import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Settings, 
  User, 
  Building2, 
  Bell, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Layers, 
  Trash2, 
  Calendar as CalendarIcon, 
  Check, 
  Shield, 
  Smartphone,
  Eye
} from 'lucide-react';
import { IvecoFacilityVisual } from '../components/VisualIllustrations';

/**
 * 40 & 4. PERFIL DO USUÁRIO
 */
export const UserProfileScreen = ({ user, unit, onNavigate, onLogout }) => {
  const currentUser = user || {
    name: 'Adriano Ribeiro',
    roleTitle: 'Técnico Especialista',
    department: 'Técnico EcoOficina'
  };
  const currentUnit = unit || { name: 'IVECO São Paulo', city: 'São Paulo', state: 'SP' };

  const menuItems = [
    { id: 'meu_perfil', label: 'Meu Perfil', icon: User, action: () => alert('Editando perfil do usuário.') },
    { id: 'minha_unidade', label: 'Minha Unidade', icon: Building2, action: () => onNavigate('minha_unidade') },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, action: () => onNavigate('configuracoes') },
    { id: 'notificacoes', label: 'Notificações', icon: Bell, action: () => onNavigate('notificacoes') },
    { id: 'historico', label: 'Histórico', icon: Clock, action: () => onNavigate('historico') },
    { id: 'permissoes', label: 'Permissões por Perfil', icon: ShieldCheck, action: () => onNavigate('permissoes') },
    { id: 'ajuda', label: 'Ajuda e suporte', icon: HelpCircle, action: () => alert('Canal direto de suporte técnico IVECO 0800-704-8326.') },
  ];

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
            <span className="font-semibold">Perfil</span>
          </button>
          <button
            onClick={() => onNavigate('configuracoes')}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* User Card matching visual reference */}
        <div className="p-4 rounded-2xl bg-[#141b24] border border-white/10 flex items-center gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-full bg-[#00e676]/20 border-2 border-[#00e676] flex items-center justify-center text-[#00e676] font-bold text-lg overflow-hidden shrink-0">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-7 h-7" />
            )}
          </div>
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">
              {currentUser.department}
            </span>
            <h2 className="text-base font-extrabold text-white">{currentUser.name}</h2>
            <p className="text-xs text-[#00e676] font-medium">{currentUser.roleTitle}</p>
          </div>
        </div>

        {/* Unit Quick Card */}
        <div
          onClick={() => onNavigate('minha_unidade')}
          className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 hover:border-white/20 transition-all cursor-pointer mb-3"
        >
          <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-1">
            Unidade
          </span>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">{currentUnit.name}</h3>
              <p className="text-[11px] text-gray-400">{currentUnit.city} — {currentUnit.state}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Active Unit Badge matching prompt */}
        <div className="p-2.5 rounded-xl bg-[#14231b] border border-[#00e676]/30 text-center mb-3">
          <span className="text-xs font-bold text-[#00e676] flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
            Unidade ativa: {currentUnit.name}
          </span>
        </div>

        {/* Menu Items List */}
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-3 rounded-xl bg-[#141b24] border border-white/5 hover:border-white/20 flex items-center justify-between text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-[#00e676] transition-colors" />
                  <span className="text-xs font-semibold text-gray-200 group-hover:text-white">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout button in Red matching visual reference */}
      <button
        onClick={() => {
          if (onLogout) onLogout();
          onNavigate('login');
        }}
        className="w-full py-3 mt-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold text-xs hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da conta</span>
      </button>
    </div>
  );
};

/**
 * 41 & 30. MINHA UNIDADE SCREEN
 */
export const MyUnitScreen = ({ unit, onNavigate }) => {
  const currentUnit = unit || {
    name: 'IVECO São Paulo',
    city: 'São Paulo',
    state: 'SP',
    address: 'Av. das Nações Unidas, 22.000 — São Paulo - SP',
    phone: '(11) 1334-5678',
    email: 'saopaulo@iveco.com',
    cnpj: '12.345.678/0001-90'
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Minha Unidade</span>
          </button>
        </div>

        {/* Facility Image matching visual reference */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-3 shadow-lg">
          <IvecoFacilityVisual className="h-32" />
        </div>

        <div className="mb-3">
          <h2 className="text-base font-extrabold text-white">{currentUnit.name}</h2>
          <p className="text-xs text-[#00e676] font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{currentUnit.city} — {currentUnit.state}</span>
          </p>
        </div>

        {/* Informations Box */}
        <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/10 space-y-2.5 mb-3 text-xs">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Informações da unidade
          </h4>

          <div className="space-y-1.5 pt-1">
            <div>
              <span className="text-[10px] text-gray-400 block">CNPJ</span>
              <span className="font-mono text-white">{currentUnit.cnpj}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Endereço</span>
              <span className="text-white">{currentUnit.address}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">Telefone</span>
              <span className="text-white">{currentUnit.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block">E-mail</span>
              <span className="text-[#00e676] font-mono">{currentUnit.email}</span>
            </div>
          </div>
        </div>

        {/* Indicadores Summary */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2.5 rounded-xl bg-[#141b24] border border-white/5">
            <span className="text-[10px] text-gray-400 block">Estoque Atual</span>
            <span className="text-sm font-bold text-white">128 peças</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#141b24] border border-white/5">
            <span className="text-[10px] text-gray-400 block">Disponíveis Troca</span>
            <span className="text-sm font-bold text-[#00e676]">42 peças</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => alert('Solicitação de transferência de concessionária enviada para o RH / Administração.')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Solicitar alteração de unidade
      </button>
    </div>
  );
};

/**
 * 42 & 29. PERMISSÕES POR PERFIL SCREEN
 */
export const PermissionsScreen = ({ user, setUser, onNavigate }) => {
  const [role, setRole] = useState(user?.accessLevel || 'technician'); // technician | manager | admin

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (setUser) {
      setUser(prev => ({
        ...prev,
        accessLevel: newRole,
        roleTitle: newRole === 'admin' ? 'Administrador Geral' : newRole === 'manager' ? 'Gestor da Unidade' : 'Técnico Especialista'
      }));
    }
  };

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Níveis de Permissão</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-3">
          Selecione o perfil para simular os diferentes níveis de controle da plataforma:
        </p>

        {/* Roles Switcher Cards */}
        <div className="space-y-3">
          {/* Técnico */}
          <div
            onClick={() => handleRoleChange('technician')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              role === 'technician'
                ? 'bg-gradient-to-r from-[#17241d] to-[#121c17] border-[#00e676] shadow-sm shadow-[#00e676]/20'
                : 'bg-[#141b24] border-white/5 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-white">Técnico Operacional</h3>
              {role === 'technician' && (
                <span className="text-[10px] bg-[#00e676] text-black font-bold px-2 py-0.5 rounded-full">
                  Ativo
                </span>
              )}
            </div>
            <ul className="text-[11px] text-gray-300 space-y-0.5 list-disc pl-4 mt-1">
              <li>Scanner de caminhões e peças com IA</li>
              <li>Consultar catálogo e estoques</li>
              <li>Solicitar peças de outras unidades</li>
              <li>Cadastrar laudos de análise</li>
            </ul>
          </div>

          {/* Gestor da Unidade */}
          <div
            onClick={() => handleRoleChange('manager')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              role === 'manager'
                ? 'bg-gradient-to-r from-[#17241d] to-[#121c17] border-[#00e676] shadow-sm shadow-[#00e676]/20'
                : 'bg-[#141b24] border-white/5 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-white">Gestor da Unidade</h3>
              {role === 'manager' && (
                <span className="text-[10px] bg-[#00e676] text-black font-bold px-2 py-0.5 rounded-full">
                  Ativo
                </span>
              )}
            </div>
            <ul className="text-[11px] text-gray-300 space-y-0.5 list-disc pl-4 mt-1">
              <li>Todas as funções de Técnico</li>
              <li>Gerenciar e aprovar transferências de estoque</li>
              <li>Autorizar e agendar coletas de descarte</li>
              <li>Acompanhar indicadores de desempenho e ESG</li>
            </ul>
          </div>

          {/* Administrador Geral */}
          <div
            onClick={() => handleRoleChange('admin')}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-gradient-to-r from-[#17241d] to-[#121c17] border-[#00e676] shadow-sm shadow-[#00e676]/20'
                : 'bg-[#141b24] border-white/5 opacity-75'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-bold text-white">Administrador de Rede IVECO</h3>
              {role === 'admin' && (
                <span className="text-[10px] bg-[#00e676] text-black font-bold px-2 py-0.5 rounded-full">
                  Ativo
                </span>
              )}
            </div>
            <ul className="text-[11px] text-gray-300 space-y-0.5 list-disc pl-4 mt-1">
              <li>Acesso irrestrito a todas as concessionárias</li>
              <li>Cadastrar e homologar empresas de reciclagem</li>
              <li>Gestão de permissões de usuários</li>
              <li>Relatório executivo consolidado ESG Brasil</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('dashboard')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Confirmar e Voltar ao Início
      </button>
    </div>
  );
};

/**
 * 43 & 38. CONFIGURAÇÕES SCREEN
 */
export const SettingsScreen = ({ onNavigate }) => {
  const [offlineIA, setOfflineIA] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  return (
    <div className="h-full flex flex-col justify-between bg-[#0a0e14] px-5 py-4 overflow-y-auto pb-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Configurações</span>
          </button>
        </div>

        <div className="space-y-3">
          {/* Diagnostic Cache */}
          <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">IA Edge / Modo Offline</h4>
              <p className="text-[11px] text-gray-400">Diagnóstico neural mesmo sem sinal na oficina.</p>
            </div>
            <button
              onClick={() => setOfflineIA(!offlineIA)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                offlineIA ? 'bg-[#00e676] justify-end' : 'bg-gray-700 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black shadow-md" />
            </button>
          </div>

          {/* Biometrics */}
          <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Autenticação Biométrica</h4>
              <p className="text-[11px] text-gray-400">Face ID e leitor digital para agilidade.</p>
            </div>
            <button
              onClick={() => setBiometrics(!biometrics)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                biometrics ? 'bg-[#00e676] justify-end' : 'bg-gray-700 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black shadow-md" />
            </button>
          </div>

          {/* Push Notifs */}
          <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white">Notificações Push</h4>
              <p className="text-[11px] text-gray-400">Alertas de trocas e coletas agendadas.</p>
            </div>
            <button
              onClick={() => setPushNotif(!pushNotif)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                pushNotif ? 'bg-[#00e676] justify-end' : 'bg-gray-700 justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black shadow-md" />
            </button>
          </div>

          {/* App Info Box */}
          <div className="p-3.5 rounded-2xl bg-[#141b24] border border-white/5 space-y-1 text-xs">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Sobre o Aplicativo</span>
            <p className="text-white font-semibold">ECOFICINA IVECO 2.0</p>
            <p className="text-gray-400 text-[11px]">Build 2026.08.28 — Versão Enterprise Oficial</p>
            <p className="text-[#00e676] text-[11px]">Desenvolvido para Concessionárias e Oficinas IVECO</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNavigate('dashboard')}
        className="w-full py-3.5 rounded-xl bg-[#00e676] text-black font-bold text-sm tracking-wide shadow-md shadow-[#00e676]/20 hover:brightness-110 active:scale-[0.98] transition-all"
      >
        Salvar Preferências
      </button>
    </div>
  );
};
