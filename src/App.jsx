import React, { useState } from 'react';
import { BottomNavBar } from './components/BottomNavBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { DesktopHeader } from './components/DesktopHeader';

// Auth Screens
import { 
  SplashScreen, 
  LoginScreen, 
  CadastroStep1Screen, 
  CadastroStep2Screen, 
  CadastroStep3Screen 
} from './screens/AuthScreens';

// Dashboard Screens
import { 
  DashboardScreen, 
  NotificationsScreen, 
  HistoryScreen, 
  EnvironmentalImpactScreen, 
  AiIntelligenceScreen 
} from './screens/DashboardScreens';

// Scanner Screens
import { 
  ScannerHomeScreen, 
  ScannerTruckLiveScreen, 
  TruckAnalysisLoadingScreen, 
  TruckResultScreen, 
  ComponentDetailScreen, 
  ScannerPartLiveScreen, 
  QRCodeScannerScreen, 
  PartAnalysisLoadingScreen, 
  PartResultScreen, 
  PartDiagnosticDetailScreen, 
  PartDestinationDecisionScreen 
} from './screens/ScannerScreens';

// Stock Screens
import { 
  UnitStockScreen, 
  NetworkStockSearchScreen, 
  StockPartDetailScreen, 
  AddStockPartScreen, 
  SharePartModalScreen, 
  ExchangeListScreen, 
  NewExchangeRequestScreen, 
  ExchangeTrackingScreen 
} from './screens/StockScreens';

// Disposal Screens
import { 
  DisposalCenterScreen, 
  AddDisposalItemScreen, 
  SustainableCompaniesScreen, 
  ScheduleCollectionScreen, 
  CollectionConfirmationScreen, 
  DisposalTrackingScreen, 
  DestinationCertificateScreen 
} from './screens/DisposalScreens';

// Profile Screens
import { 
  UserProfileScreen, 
  MyUnitScreen, 
  PermissionsScreen, 
  SettingsScreen 
} from './screens/ProfileScreens';

import { INITIAL_USER, IVECO_UNITS, PARTS_CATALOG, TRUCK_INSPECTION_MOCK } from './data/mockData';
import { getUnits, getUserProfile, getParts, getTruckInspection } from './services/supabaseService';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { useEffect } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(INITIAL_USER);
  const [selectedUnit, setSelectedUnit] = useState(IVECO_UNITS[0]);
  const [selectedPart, setSelectedPart] = useState(PARTS_CATALOG[0]);
  const [selectedComponent, setSelectedComponent] = useState(TRUCK_INSPECTION_MOCK.components[2]);
  const [selectedExchange, setSelectedExchange] = useState(null);

  // Load live data from Supabase on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [unitsData, profileData, partsData, inspectionData] = await Promise.all([
          getUnits(),
          getUserProfile(),
          getParts('sp'),
          getTruckInspection('sp')
        ]);

        if (unitsData && unitsData.length > 0) setSelectedUnit(unitsData[0]);
        if (profileData) setUser(profileData);
        if (partsData && partsData.length > 0) setSelectedPart(partsData[0]);
        if (inspectionData && inspectionData.components?.length > 0) {
          setSelectedComponent(inspectionData.components[2] || inspectionData.components[0]);
        }
      } catch (e) {
        console.warn('Erro ao carregar dados do Supabase:', e);
      }
    }

    loadInitialData();

    // Set up Realtime subscriptions if configured
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel('app-realtime-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'parts' },
          (payload) => {
            if (payload.new && payload.new.code) {
              console.log('Realtime part update:', payload.new);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  // Determine which bottom tab is active
  const getActiveTab = () => {
    if (['dashboard', 'notificacoes', 'historico', 'impacto_ambiental', 'inteligencia_rede'].includes(currentScreen)) {
      return 'inicio';
    }
    if (currentScreen.startsWith('scanner') || currentScreen.startsWith('analise') || currentScreen.startsWith('resultado') || currentScreen.startsWith('detalhes_componente') || currentScreen.startsWith('qr_code') || currentScreen.startsWith('diagnostico') || currentScreen.startsWith('decisao')) {
      return 'scanner';
    }
    if (['estoque_local', 'estoque_rede', 'estoque_detalhe', 'adicionar_peca', 'disponibilizar_troca', 'trocas_lista', 'nova_solicitacao', 'rastreamento_troca'].includes(currentScreen)) {
      return 'estoque';
    }
    if (['descarte_central', 'adicionar_descarte', 'empresas_sustentaveis', 'agendar_coleta', 'confirmacao_coleta', 'rastreamento_descarte', 'certificado_destinacao'].includes(currentScreen)) {
      return 'descarte';
    }
    if (['perfil', 'minha_unidade', 'permissoes', 'configuracoes'].includes(currentScreen)) {
      return 'perfil';
    }
    return '';
  };

  const handleTabSelect = (tabId) => {
    switch (tabId) {
      case 'inicio':
        setCurrentScreen('dashboard');
        break;
      case 'scanner':
        setCurrentScreen('scanner_home');
        break;
      case 'estoque':
        setCurrentScreen('estoque_local');
        break;
      case 'descarte':
        setCurrentScreen('descarte_central');
        break;
      case 'perfil':
        setCurrentScreen('perfil');
        break;
      default:
        break;
    }
  };

  // Render current screen content
  const renderScreen = () => {
    switch (currentScreen) {
      // Auth & Onboarding
      case 'splash':
        return <SplashScreen onNavigate={setCurrentScreen} />;
      case 'login':
        return (
          <LoginScreen 
            onNavigate={setCurrentScreen} 
            onLogin={() => {}} 
          />
        );
      case 'cadastro_1':
        return (
          <CadastroStep1Screen 
            onNavigate={setCurrentScreen} 
            formData={user} 
            setFormData={setUser} 
          />
        );
      case 'cadastro_2':
        return (
          <CadastroStep2Screen 
            onNavigate={setCurrentScreen} 
            selectedUnit={selectedUnit} 
            setSelectedUnit={setSelectedUnit} 
          />
        );
      case 'cadastro_3':
        return (
          <CadastroStep3Screen 
            onNavigate={setCurrentScreen} 
            selectedUnit={selectedUnit} 
            onCompleteSignup={(unit) => setSelectedUnit(unit)} 
          />
        );

      // Dashboard
      case 'dashboard':
        return (
          <DashboardScreen 
            user={user} 
            unit={selectedUnit} 
            onNavigate={setCurrentScreen} 
          />
        );
      case 'notificacoes':
        return <NotificationsScreen onNavigate={setCurrentScreen} />;
      case 'historico':
        return <HistoryScreen onNavigate={setCurrentScreen} />;
      case 'impacto_ambiental':
        return <EnvironmentalImpactScreen onNavigate={setCurrentScreen} />;
      case 'inteligencia_rede':
        return <AiIntelligenceScreen onNavigate={setCurrentScreen} />;

      // Scanner & AI Diagnosis
      case 'scanner_home':
        return <ScannerHomeScreen onNavigate={setCurrentScreen} />;
      case 'scanner_caminhao_live':
        return <ScannerTruckLiveScreen onNavigate={setCurrentScreen} />;
      case 'analise_caminhao_loading':
        return <TruckAnalysisLoadingScreen onNavigate={setCurrentScreen} />;
      case 'resultado_caminhao':
        return (
          <TruckResultScreen 
            onNavigate={setCurrentScreen} 
            onSelectComponent={(c) => setSelectedComponent(c)} 
          />
        );
      case 'detalhes_componente':
        return (
          <ComponentDetailScreen 
            onNavigate={setCurrentScreen} 
            component={selectedComponent} 
          />
        );
      case 'scanner_peca_live':
        return <ScannerPartLiveScreen onNavigate={setCurrentScreen} />;
      case 'qr_code_scanner':
        return <QRCodeScannerScreen onNavigate={setCurrentScreen} />;
      case 'analise_peca_loading':
        return <PartAnalysisLoadingScreen onNavigate={setCurrentScreen} />;
      case 'resultado_peca':
        return (
          <PartResultScreen 
            onNavigate={setCurrentScreen} 
            part={selectedPart} 
          />
        );
      case 'diagnostico_detalhado':
        return (
          <PartDiagnosticDetailScreen 
            onNavigate={setCurrentScreen} 
            part={selectedPart} 
          />
        );
      case 'decisao_destino':
        return (
          <PartDestinationDecisionScreen 
            onNavigate={setCurrentScreen} 
            part={selectedPart} 
          />
        );

      // Stock & Exchanges
      case 'estoque_local':
        return (
          <UnitStockScreen 
            onNavigate={setCurrentScreen} 
            onSelectPart={(p) => setSelectedPart(p)} 
          />
        );
      case 'estoque_rede':
        return <NetworkStockSearchScreen onNavigate={setCurrentScreen} />;
      case 'estoque_detalhe':
        return (
          <StockPartDetailScreen 
            onNavigate={setCurrentScreen} 
            part={selectedPart} 
          />
        );
      case 'adicionar_peca':
        return <AddStockPartScreen onNavigate={setCurrentScreen} />;
      case 'disponibilizar_troca':
        return <SharePartModalScreen onNavigate={setCurrentScreen} />;
      case 'trocas_lista':
        return (
          <ExchangeListScreen 
            onNavigate={setCurrentScreen} 
            onSelectExchange={(req) => setSelectedExchange(req)} 
          />
        );
      case 'nova_solicitacao':
        return <NewExchangeRequestScreen onNavigate={setCurrentScreen} />;
      case 'rastreamento_troca':
        return (
          <ExchangeTrackingScreen 
            onNavigate={setCurrentScreen} 
            exchange={selectedExchange} 
          />
        );

      // Disposal
      case 'descarte_central':
        return <DisposalCenterScreen onNavigate={setCurrentScreen} />;
      case 'adicionar_descarte':
        return <AddDisposalItemScreen onNavigate={setCurrentScreen} />;
      case 'empresas_sustentaveis':
        return <SustainableCompaniesScreen onNavigate={setCurrentScreen} />;
      case 'agendar_coleta':
        return <ScheduleCollectionScreen onNavigate={setCurrentScreen} />;
      case 'confirmacao_coleta':
        return <CollectionConfirmationScreen onNavigate={setCurrentScreen} />;
      case 'rastreamento_descarte':
        return <DisposalTrackingScreen onNavigate={setCurrentScreen} />;
      case 'certificado_destinacao':
        return <DestinationCertificateScreen onNavigate={setCurrentScreen} />;

      // Profile & Unit
      case 'perfil':
        return (
          <UserProfileScreen 
            user={user} 
            unit={selectedUnit} 
            onNavigate={setCurrentScreen} 
            onLogout={() => setCurrentScreen('login')} 
          />
        );
      case 'minha_unidade':
        return (
          <MyUnitScreen 
            unit={selectedUnit} 
            onNavigate={setCurrentScreen} 
          />
        );
      case 'permissoes':
        return (
          <PermissionsScreen 
            user={user} 
            setUser={setUser} 
            onNavigate={setCurrentScreen} 
          />
        );
      case 'configuracoes':
        return <SettingsScreen onNavigate={setCurrentScreen} />;

      default:
        return (
          <DashboardScreen 
            user={user} 
            unit={selectedUnit} 
            onNavigate={setCurrentScreen} 
          />
        );
    }
  };

  const isAuthScreen = ['splash', 'login', 'cadastro_1', 'cadastro_2', 'cadastro_3'].includes(currentScreen);
  const showBottomNav = !['splash', 'login', 'cadastro_1', 'cadastro_2', 'cadastro_3', 'analise_caminhao_loading', 'analise_peca_loading'].includes(currentScreen);

  // Layout para Telas de Autenticação (Centralizado no Desktop / Tela cheia no Mobile)
  if (isAuthScreen) {
    return (
      <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#070a0e] flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-md h-full sm:h-auto sm:max-h-[90vh] sm:rounded-3xl bg-[#0a0e14] flex flex-col relative overflow-hidden sm:border sm:border-white/10 shadow-2xl">
          {renderScreen()}
        </div>
      </div>
    );
  }

  // Layout Responsivo Unificado (Mobile + Desktop)
  return (
    <div className="w-full min-h-[100dvh] h-[100dvh] bg-[#070a0e] flex overflow-hidden">
      {/* 🖥️ Barra Lateral Fixa para Desktop (lg+) */}
      <div className="hidden lg:flex h-full">
        <DesktopSidebar 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
          user={user} 
          selectedUnit={selectedUnit} 
          setSelectedUnit={setSelectedUnit} 
        />
      </div>

      {/* 📱 / 🖥️ Área Principal do Aplicativo */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#0a0e14]">
        {/* Topo no Desktop (lg+) */}
        <div className="hidden lg:block">
          <DesktopHeader 
            currentScreen={currentScreen} 
            onNavigate={setCurrentScreen} 
            user={user} 
            selectedUnit={selectedUnit} 
          />
        </div>

        {/* Conteúdo da Tela */}
        <main className="flex-1 w-full relative overflow-y-auto flex flex-col">
          <div className="w-full h-full max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto flex flex-col">
            {renderScreen()}
          </div>
        </main>

        {/* 📱 Barra de Navegação Inferior Apenas no Mobile (< lg) */}
        {showBottomNav && (
          <div className="lg:hidden">
            <BottomNavBar 
              activeTab={getActiveTab()} 
              onSelectTab={handleTabSelect} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
