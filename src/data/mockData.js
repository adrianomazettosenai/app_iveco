export const IVECO_UNITS = [
  {
    id: 'sp',
    name: 'IVECO São Paulo',
    state: 'SP',
    city: 'São Paulo',
    address: 'Av. das Nações Unidas, 22.000 — Brooklin, São Paulo - SP',
    phone: '(11) 1334-5678',
    email: 'saopaulo@iveco.com',
    cnpj: '12.345.678/0001-90',
    distanceKm: 0,
    active: true,
    totalStock: 128,
    availableForExchange: 42,
    awaitingDisposal: 16,
    reusedParts: 87,
    co2AvoidedKg: 1250,
    openRequests: 7
  },
  {
    id: 'curitiba',
    name: 'IVECO Curitiba',
    state: 'PR',
    city: 'Curitiba',
    address: 'Rod. BR-277, km 4.500 — Mossunguê, Curitiba - PR',
    phone: '(41) 3210-9870',
    email: 'curitiba@iveco.com',
    cnpj: '12.345.678/0002-71',
    distanceKm: 410,
    active: false,
    totalStock: 94,
    availableForExchange: 31,
    awaitingDisposal: 9,
    reusedParts: 62,
    co2AvoidedKg: 910,
    openRequests: 4
  },
  {
    id: 'bh',
    name: 'IVECO Belo Horizonte',
    state: 'MG',
    city: 'Belo Horizonte',
    address: 'Anel Rodoviário Celso Mello Azevedo, 15.200 — Olhos D\'Água, Belo Horizonte - MG',
    phone: '(31) 3450-1122',
    email: 'bh@iveco.com',
    cnpj: '12.345.678/0003-52',
    distanceKm: 585,
    active: false,
    totalStock: 112,
    availableForExchange: 38,
    awaitingDisposal: 14,
    reusedParts: 74,
    co2AvoidedKg: 1080,
    openRequests: 5
  },
  {
    id: 'poa',
    name: 'IVECO Porto Alegre',
    state: 'RS',
    city: 'Porto Alegre',
    address: 'Av. das Indústrias, 800 — São João, Porto Alegre - RS',
    phone: '(51) 3344-5566',
    email: 'poa@iveco.com',
    cnpj: '12.345.678/0004-33',
    distanceKm: 1120,
    active: false,
    totalStock: 76,
    availableForExchange: 22,
    awaitingDisposal: 8,
    reusedParts: 49,
    co2AvoidedKg: 730,
    openRequests: 3
  },
  {
    id: 'rio',
    name: 'IVECO Rio de Janeiro',
    state: 'RJ',
    city: 'Rio de Janeiro',
    address: 'Rod. Presidente Dutra, km 165 — Pavuna, Rio de Janeiro - RJ',
    phone: '(21) 2590-4400',
    email: 'rio@iveco.com',
    cnpj: '12.345.678/0005-14',
    distanceKm: 430,
    active: false,
    totalStock: 105,
    availableForExchange: 35,
    awaitingDisposal: 12,
    reusedParts: 70,
    co2AvoidedKg: 1010,
    openRequests: 6
  },
  {
    id: 'campinas',
    name: 'IVECO Campinas',
    state: 'SP',
    city: 'Campinas',
    address: 'Rod. Anhanguera, km 98 — Jardim Etemp, Campinas - SP',
    phone: '(19) 3788-9000',
    email: 'campinas@iveco.com',
    cnpj: '12.345.678/0006-03',
    distanceKm: 95,
    active: false,
    totalStock: 88,
    availableForExchange: 29,
    awaitingDisposal: 11,
    reusedParts: 58,
    co2AvoidedKg: 850,
    openRequests: 3
  }
];

export const INITIAL_USER = {
  name: 'Gaspar Ricardo Junior',
  roleTitle: 'Técnico Especialista',
  department: 'Técnico EcoOficina',
  email: 'gaspar.junior@iveco.com',
  phone: '(11) 98765-4321',
  registrationId: 'IVC-884920',
  unitId: 'sp',
  accessLevel: 'technician', // technician | manager | admin
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const TRUCK_INSPECTION_MOCK = {
  model: 'IVECO S-WAY',
  subModel: '540 cv • 6x2',
  category: 'Caminhão Pesado',
  fuel: 'Diesel S10',
  year: '2023',
  licensePlate: 'IVC-2E24',
  chassis: '93ZSW480XNC098421',
  mileage: '142.800 km',
  healthScore: 84,
  scanDate: '28/08/2026 — 09:35',
  damages: [
    {
      id: 'dam-1',
      location: 'Para-choque Dianteiro Direito',
      type: 'Impacto / Deformação',
      severity: 'Média',
      severityColor: '#eab308',
      description: 'Amassado de 18cm no canto inferior direito com risco na pintura.',
      recommendation: 'Alinhamento da carcaça e retoque estético de pintura.',
      actionNeeded: 'Reparo de Funilaria',
      icon: 'AlertTriangle'
    },
    {
      id: 'dam-2',
      location: 'Lente do Farol Auxiliar Esquerdo',
      type: 'Trinca / Fissura',
      severity: 'Leve',
      severityColor: '#38bdf8',
      description: 'Microfissura de 3cm na lente de policarbonato sem quebra total.',
      recommendation: 'Selagem ou substituição da lente para evitar infiltração de umidade.',
      actionNeeded: 'Recondicionamento',
      icon: 'AlertCircle'
    },
    {
      id: 'dam-3',
      location: 'Estrutura da Cabine e Chassi',
      type: 'Inspeção Estrutural',
      severity: 'Sem Avarias',
      severityColor: '#00e676',
      description: 'Alinhamento longitudinal e pontos de ancoragem 100% íntegros.',
      recommendation: 'Nenhuma intervenção necessária. Estrutura aprovada.',
      actionNeeded: 'Aprovado',
      icon: 'CheckCircle2'
    },
    {
      id: 'dam-4',
      location: 'Para-brisa Panorâmico',
      type: 'Vidros e Ópticos',
      severity: 'Sem Avarias',
      severityColor: '#00e676',
      description: 'Sem trincas ou lascas na área de varredura dos limpadores.',
      recommendation: 'Vidro original laminado em conformidade com o padrão IVECO.',
      actionNeeded: 'Aprovado',
      icon: 'CheckCircle2'
    }
  ],
  components: [
    {
      id: 'motor',
      name: 'Motor Cursor 13',
      category: 'Propulsão',
      status: 'normal',
      statusLabel: 'Normal',
      wearPercentage: 12,
      health: 'Excelente',
      recommendation: 'Troca periódica de lubrificante em 10.000 km.',
      color: '#00e676'
    },
    {
      id: 'pneus',
      name: 'Pneus e Rodas 295/80R22.5',
      category: 'Rodagem',
      status: 'normal',
      statusLabel: 'Normal',
      wearPercentage: 22,
      health: 'Bom',
      recommendation: 'Pressão equalizada a 110 PSI. Banda de rodagem dentro dos parâmetros.',
      color: '#00e676'
    },
    {
      id: 'freios',
      name: 'Sistema de Freios a Disco',
      category: 'Frenagem',
      status: 'warning',
      statusLabel: 'Manutenção',
      wearPercentage: 65,
      health: 'Atenção',
      description: 'Desgaste acima do recomendado nas pastilhas e discos do eixo dianteiro.',
      recommendation: 'Realizar manutenção preventiva em até 500 km.',
      color: '#eab308',
      compatiblePartCode: '50291832',
      solutionAvailable: true
    },
    {
      id: 'lanterna',
      name: 'Conjunto Óptico / Lanterna Direita',
      category: 'Iluminação',
      status: 'critical',
      statusLabel: 'Ausente',
      wearPercentage: 100,
      health: 'Substituição',
      description: 'Componente danificado/ausente após colisão lateral leve.',
      recommendation: 'Substituição imediata para conformidade com normas de trânsito.',
      color: '#ef4444',
      compatiblePartCode: '5043871102',
      solutionAvailable: true
    },
    {
      id: 'suspensao',
      name: 'Suspensão Pneumática Traseira',
      category: 'Suspensão',
      status: 'wear',
      statusLabel: 'Desgaste',
      wearPercentage: 54,
      health: 'Alto desgaste',
      description: 'Bolsas de ar com microfissuras e buchas com folga milimétrica.',
      recommendation: 'Programar recondicionamento na próxima parada mensal.',
      color: '#f97316',
      compatiblePartCode: '50418756',
      solutionAvailable: true
    }
  ]
};

export const PARTS_CATALOG = [
  {
    id: 'part-1',
    code: '504385987',
    name: 'Alternador 28V 100A',
    category: 'Elétrico',
    manufacturer: 'IVECO Genuine Parts / Bosch',
    productionPlace: 'Sete Lagoas - MG, Brasil',
    manufacturingDate: '14/10/2023',
    compatibility: 'IVECO S-WAY • TECTOR • DAILY',
    year: '2023',
    condition: 'Reutilizável',
    wearPercentage: 20,
    healthPercent: 80,
    status: 'available',
    statusLabel: 'Disponível',
    quantity: 3,
    unit: 'IVECO São Paulo',
    location: 'Almoxarifado B — Prateleira 04 — Gaveta 12',
    availableForExchange: true,
    priceEstimate: 'R$ 2.450,00',
    co2SavingsKg: 38,
    corrosion: 'Nenhuma (0%)',
    deformation: 'Inexistente',
    cracks: 'Inexistente',
    overallState: 'Excelente estado de conservação mecânica e elétrica.',
    recommendation: 'reutilizar' // reutilizar | reaproveitar | recuperar | descartar
  },
  {
    id: 'part-2',
    code: '5801215774',
    name: 'Compressor de Ar Monocilíndrico',
    category: 'Pneumático',
    manufacturer: 'IVECO / Knorr-Bremse',
    productionPlace: 'Turim, Itália',
    manufacturingDate: '08/04/2022',
    compatibility: 'IVECO S-WAY • STRALIS',
    year: '2022',
    condition: 'Reutilizável',
    wearPercentage: 25,
    healthPercent: 75,
    status: 'available',
    statusLabel: 'Disponível',
    quantity: 2,
    unit: 'IVECO São Paulo',
    location: 'Almoxarifado A — Prateleira 02 — Gaveta 08',
    availableForExchange: true,
    priceEstimate: 'R$ 3.800,00',
    co2SavingsKg: 52,
    corrosion: 'Superficial leve (<3%)',
    deformation: 'Inexistente',
    cracks: 'Inexistente',
    overallState: 'Pressão nominal mantida em testes de bancada.',
    recommendation: 'reutilizar'
  },
  {
    id: 'part-3',
    code: '5801871954',
    name: 'Turbo Compressor Garrett Dual Stage',
    category: 'Motor / Turbo',
    manufacturer: 'IVECO / Garrett Turbos',
    productionPlace: 'Guarulhos - SP, Brasil',
    manufacturingDate: '19/11/2021',
    compatibility: 'IVECO S-WAY 480 / 540',
    year: '2021',
    condition: 'Recuperável',
    wearPercentage: 42,
    healthPercent: 58,
    status: 'in_maintenance',
    statusLabel: 'Em análise',
    quantity: 1,
    unit: 'IVECO São Paulo',
    location: 'Bancada de Diagnóstico 03',
    availableForExchange: false,
    priceEstimate: 'R$ 7.200,00',
    co2SavingsKg: 94,
    corrosion: 'Inexistente',
    deformation: 'Folga no rotor de admissão (0.4mm)',
    cracks: 'Inexistente',
    overallState: 'Necessita retífica de eixo e troca de vedações.',
    recommendation: 'recuperar'
  },
  {
    id: 'part-4',
    code: '5043871102',
    name: 'Farol Direito Full LED Matrix',
    category: 'Iluminação',
    manufacturer: 'IVECO / Magneti Marelli',
    productionPlace: 'Hortolândia - SP, Brasil',
    manufacturingDate: '02/03/2024',
    compatibility: 'IVECO S-WAY',
    year: '2024',
    condition: 'Reutilizável',
    wearPercentage: 5,
    healthPercent: 95,
    status: 'available',
    statusLabel: 'Disponível',
    quantity: 4,
    unit: 'IVECO São Paulo',
    location: 'Almoxarifado C — Prateleira 01 — Caixa 05',
    availableForExchange: true,
    priceEstimate: 'R$ 4.100,00',
    co2SavingsKg: 28,
    corrosion: 'Inexistente',
    deformation: 'Inexistente',
    cracks: 'Inexistente',
    overallState: 'Lente intacta, diodos LED e chicote com 100% de emissão.',
    recommendation: 'reutilizar'
  },
  {
    id: 'part-5',
    code: '50418756',
    name: 'Suporte do Eixo Traseiro Forjado',
    category: 'Suspensão / Chassi',
    manufacturer: 'IVECO Genuine Heavy Parts',
    productionPlace: 'Sete Lagoas - MG, Brasil',
    manufacturingDate: '15/07/2022',
    compatibility: 'IVECO S-WAY • STRALIS Hi-Way',
    year: '2022',
    condition: 'Reutilizável',
    wearPercentage: 18,
    healthPercent: 82,
    status: 'available',
    statusLabel: 'Disponível para troca',
    quantity: 2,
    unit: 'IVECO São Paulo',
    location: 'Almoxarifado D — Pátio de Pesados — Box 14',
    availableForExchange: true,
    priceEstimate: 'R$ 1.950,00',
    co2SavingsKg: 45,
    corrosion: 'Tratamento galvanizado 100%',
    deformation: 'Inexistente',
    cracks: 'Inexistente (ensaio por ultrassom aprovado)',
    overallState: '82% — Bom. Pronto para instalação imediata.',
    recommendation: 'reutilizar'
  },
  {
    id: 'part-6',
    code: '50291832',
    name: 'Disco de Freio Ventilado Eixo Dianteiro',
    category: 'Frenagem / Resíduo',
    manufacturer: 'IVECO / Meritor',
    productionPlace: 'Osasco - SP, Brasil',
    manufacturingDate: '10/01/2020',
    compatibility: 'IVECO S-WAY • STRALIS',
    year: '2020',
    condition: 'Descarte',
    wearPercentage: 88,
    healthPercent: 12,
    status: 'disposal',
    statusLabel: 'Destinado ao descarte',
    quantity: 8,
    unit: 'IVECO São Paulo',
    location: 'Área de Sucata e Reciclagem — Caçamba 02',
    availableForExchange: false,
    materialType: 'Ferro fundido nodular',
    totalWeightKg: 96,
    disposalReason: 'Espessura residual abaixo da cota mínima de segurança (34mm < 38mm).',
    recommendation: 'descartar'
  }
];

export const NETWORK_PARTS_SEARCH = [
  {
    unitName: 'IVECO São Paulo',
    state: 'SP',
    distanceKm: 0,
    availableQty: 2,
    healthScore: 82,
    condition: 'Bom',
    statusColor: '#00e676',
    estimatedDeliveryDays: 0,
    partCode: '50418756'
  },
  {
    unitName: 'IVECO Campinas',
    state: 'SP',
    distanceKm: 95,
    availableQty: 1,
    healthScore: 92,
    condition: 'Excelente',
    statusColor: '#00e676',
    estimatedDeliveryDays: 1,
    partCode: '50418756'
  },
  {
    unitName: 'IVECO Curitiba',
    state: 'PR',
    distanceKm: 410,
    availableQty: 1,
    healthScore: 78,
    condition: 'Bom',
    statusColor: '#eab308',
    estimatedDeliveryDays: 2,
    partCode: '50418756'
  },
  {
    unitName: 'IVECO Belo Horizonte',
    state: 'MG',
    distanceKm: 585,
    availableQty: 3,
    healthScore: 85,
    condition: 'Bom',
    statusColor: '#00e676',
    estimatedDeliveryDays: 2,
    partCode: '50418756'
  }
];

export const EXCHANGE_REQUESTS = [
  {
    id: 'REQ-2026-081',
    partName: 'Alternador 28V 100A',
    partCode: '504385987',
    requestingUnit: 'IVECO Curitiba',
    requestingUnitState: 'PR',
    supplyingUnit: 'IVECO São Paulo',
    supplyingUnitState: 'SP',
    quantity: 1,
    requestDate: '28/08/2026',
    status: 'pending',
    statusLabel: 'Aguardando aprovação',
    statusColor: '#eab308',
    currentStep: 1,
    justification: 'Caminhão IVECO S-WAY parado na oficina com alternador queimado. Cliente com carga urgente.',
    trackingHistory: [
      { step: 1, title: 'Solicitação enviada', desc: 'Aguardando aprovação do gestor IVECO SP', date: '28/08 09:15', done: true, current: true },
      { step: 2, title: 'Unidade fornecedora aprova', desc: 'Solicitação aprovada e autorizada', date: 'Pendente', done: false },
      { step: 3, title: 'Separação', desc: 'Peça sendo preparada no Almoxarifado B', date: 'Pendente', done: false },
      { step: 4, title: 'Transporte', desc: 'Peça em trânsito via malha logística IVECO', date: 'Pendente', done: false },
      { step: 5, title: 'Recebimento', desc: 'Inspeção física na chegada em Curitiba', date: 'Pendente', done: false },
      { step: 6, title: 'Estoque atualizado', desc: 'Transferência automática concluída', date: 'Pendente', done: false }
    ]
  },
  {
    id: 'REQ-2026-079',
    partName: 'Turbo Compressor Garrett Dual Stage',
    partCode: '5801871954',
    requestingUnit: 'IVECO Belo Horizonte',
    requestingUnitState: 'MG',
    supplyingUnit: 'IVECO São Paulo',
    supplyingUnitState: 'SP',
    quantity: 1,
    requestDate: '27/08/2026',
    status: 'analyzing',
    statusLabel: 'Em análise',
    statusColor: '#38bdf8',
    currentStep: 2,
    justification: 'Reposição de componente para atendimento de frota de mineração.',
    trackingHistory: [
      { step: 1, title: 'Solicitação enviada', desc: 'Solicitação registrada no sistema', date: '27/08 14:20', done: true },
      { step: 2, title: 'Unidade fornecedora aprova', desc: 'Em análise técnica de compatibilidade', date: '27/08 16:00', done: true, current: true },
      { step: 3, title: 'Separação', desc: 'Alocação de embalagem antichoque', date: 'Pendente', done: false },
      { step: 4, title: 'Transporte', desc: 'Em trânsito interestadual', date: 'Pendente', done: false },
      { step: 5, title: 'Recebimento', desc: 'Chegada em BH', date: 'Pendente', done: false },
      { step: 6, title: 'Estoque atualizado', desc: 'Incorporação ao estoque', date: 'Pendente', done: false }
    ]
  },
  {
    id: 'REQ-2026-074',
    partName: 'Compressor de Ar Monocilíndrico',
    partCode: '5801215774',
    requestingUnit: 'IVECO Porto Alegre',
    requestingUnitState: 'RS',
    supplyingUnit: 'IVECO São Paulo',
    supplyingUnitState: 'SP',
    quantity: 1,
    requestDate: '26/08/2026',
    status: 'in_transit',
    statusLabel: 'Em transporte',
    statusColor: '#00e676',
    currentStep: 4,
    justification: 'Substituição em plano de manutenção preventiva de frotista parceiro.',
    trackingHistory: [
      { step: 1, title: 'Solicitação enviada', desc: 'Criada pela IVECO POA', date: '26/08 08:30', done: true },
      { step: 2, title: 'Unidade fornecedora aprova', desc: 'Aprovada por Gestor SP', date: '26/08 10:15', done: true },
      { step: 3, title: 'Separação', desc: 'Embalado e etiquetado', date: '26/08 13:40', done: true },
      { step: 4, title: 'Transporte', desc: 'Em rota SP -> RS (Previsão: 29/08)', date: '27/08 06:00', done: true, current: true },
      { step: 5, title: 'Recebimento', desc: 'Aguardando entrega na concessionária', date: 'Previsto 29/08', done: false },
      { step: 6, title: 'Estoque atualizado', desc: 'Finalização automática', date: 'Pendente', done: false }
    ]
  }
];

export const DISPOSAL_ITEMS = [
  {
    id: 'disp-1',
    name: 'Filtro de Óleo Blindado Usado',
    category: 'Filtros e Fluidos',
    material: 'Aço / Papel impregnado com resíduo de hidrocarboneto',
    quantity: '2 unidades',
    weightKg: 4.8,
    status: 'Aguardando coleta',
    icon: 'filter'
  },
  {
    id: 'disp-2',
    name: 'Óleo Lubrificante Usado (OLUC)',
    category: 'Óleos e Fluidos',
    material: 'Óleo mineral derivado de petróleo',
    quantity: '20 litros',
    weightKg: 18.2,
    status: 'Armazenado em tambor homologado',
    icon: 'droplet'
  },
  {
    id: 'disp-3',
    name: 'Bateria Chumbo-Ácido Inservível',
    category: 'Baterias',
    material: 'Chumbo, polipropileno e solução ácida',
    quantity: '1 unidade',
    weightKg: 44.0,
    status: 'Área com contenção química',
    icon: 'battery'
  },
  {
    id: 'disp-4',
    name: 'Pneu Inservível Fora de Estrada',
    category: 'Borracha',
    material: 'Borracha vulcanizada e cintas de aço',
    quantity: '4 unidades',
    weightKg: 281.0,
    status: 'Pronto para trituração / asfalto ecológico',
    icon: 'circle'
  }
];

export const SUSTAINABLE_COMPANIES = [
  {
    id: 'comp-1',
    name: 'EcoMetal Reciclagem Industrial',
    badge: 'Certificada ISO 14001',
    distanceKm: 12,
    rating: 4.9,
    acceptedMaterials: ['Ferro fundido', 'Alumínio', 'Aço estrutural', 'Sucata pesada'],
    hasCollectionService: true,
    licenseIbama: 'IBAMA-CTF 8492019/SP',
    address: 'Av. das Indústrias Metalúrgicas, 1420 — Diadema - SP',
    phone: '(11) 4075-8800',
    availableDates: ['29/08/2026', '30/08/2026', '02/09/2026', '15/09/2026']
  },
  {
    id: 'comp-2',
    name: 'ReciclaTech Soluções Ambientais',
    badge: 'Certificada GreenTech',
    distanceKm: 18,
    rating: 4.8,
    acceptedMaterials: ['Componentes eletrônicos', 'Chicotes e cabos', 'Plásticos técnicos', 'Módulos ECU'],
    hasCollectionService: true,
    licenseIbama: 'IBAMA-CTF 7301948/SP',
    address: 'Rua da Tecnologia Verde, 500 — Barueri - SP',
    phone: '(11) 4199-2233',
    availableDates: ['29/08/2026', '01/09/2026', '03/09/2026']
  },
  {
    id: 'comp-3',
    name: 'EcoLub Refino e Re-refino Brasil',
    badge: 'Certificada ANP & Cetesb',
    distanceKm: 24,
    rating: 5.0,
    acceptedMaterials: ['Óleo lubrificante usado (OLUC)', 'Fluidos hidráulicos', 'Filtros de óleo automotivos'],
    hasCollectionService: true,
    licenseIbama: 'IBAMA-CTF 9912044/SP',
    address: 'Polo Petroquímico de Mauá — Mauá - SP',
    phone: '(11) 4547-9000',
    availableDates: ['30/08/2026', '02/09/2026', '04/09/2026']
  }
];

export const SCHEDULED_COLLECTION = {
  id: 'COL-2026-0915',
  companyName: 'EcoMetal Reciclagem',
  date: '15/09/2026',
  timeSlot: '14:00 – 15:00',
  period: 'Tarde (14h às 18h)',
  location: 'IVECO São Paulo — Pátio de Resíduos',
  totalItems: 16,
  totalWeightKg: 348,
  status: 'Agendamento confirmado',
  statusColor: '#00e676',
  notes: 'Deixar materiais na área externa de descarte, junto à doca 04.',
  certificateReady: true,
  certificateCode: 'CERT-ESG-IVECO-2026-0915-08'
};

export const NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Nova solicitação de peça',
    message: 'IVECO Campinas solicitou 1x Suporte de Eixo do seu estoque.',
    timestamp: '10:30',
    type: 'request',
    unread: true,
    iconColor: '#eab308'
  },
  {
    id: 'notif-2',
    title: 'Peça aprovada para envio',
    message: 'Sua solicitação de Turbo Compressor foi aprovada pela unidade IVECO BH.',
    timestamp: 'Ontem',
    type: 'approval',
    unread: true,
    iconColor: '#00e676'
  },
  {
    id: 'notif-3',
    title: 'Coleta de resíduos agendada',
    message: 'A EcoMetal realizará a coleta de 348 kg amanhã às 14:00.',
    timestamp: 'Ontem',
    type: 'disposal',
    unread: true,
    iconColor: '#38bdf8'
  },
  {
    id: 'notif-4',
    title: 'Análise com IA concluída',
    message: 'Diagnóstico do caminhão IVECO S-WAY 480cv finalizado com sucesso.',
    timestamp: '2 dias',
    type: 'scanner',
    unread: false,
    iconColor: '#38bdf8'
  },
  {
    id: 'notif-5',
    title: 'Estoque atualizado',
    message: '3x Alternadores adicionados ao almoxarifado B após inspeção técnica.',
    timestamp: '3 dias',
    type: 'stock',
    unread: false,
    iconColor: '#ef4444'
  }
];

export const HISTORY_ITEMS = [
  {
    id: 'hist-1',
    type: 'received',
    title: 'Peça recebida',
    detail: 'Alternador 28V 100A • Origem: IVECO Curitiba',
    date: '28/08/2026 — 08:30',
    color: '#00e676',
    tab: 'trocas'
  },
  {
    id: 'hist-2',
    type: 'sent',
    title: 'Peça enviada',
    detail: 'Turbo Compressor • Destino: IVECO BH',
    date: '27/08/2026 — 15:40',
    color: '#ef4444',
    tab: 'trocas'
  },
  {
    id: 'hist-3',
    type: 'disposal',
    title: 'Coleta realizada com sucesso',
    detail: 'Óleo lubrificante (20L) • Filtros • Baterias • EcoLub',
    date: '25/08/2026 — 14:00',
    color: '#00e676',
    tab: 'descarte'
  },
  {
    id: 'hist-4',
    type: 'analysis',
    title: 'Análise de IA concluída',
    detail: 'IVECO S-WAY 480cv • Placa IVC-2E24',
    date: '24/08/2026 — 11:20',
    color: '#38bdf8',
    tab: 'geral'
  },
  {
    id: 'hist-5',
    type: 'stock_add',
    title: 'Peça adicionada ao estoque',
    detail: 'Compressor de Ar Monocilíndrico (2 unidades)',
    date: '22/08/2026 — 09:10',
    color: '#eab308',
    tab: 'geral'
  }
];

export const AI_SUGGESTIONS = [
  {
    id: 'sug-1',
    type: 'reuse',
    title: 'Oportunidade de reaproveitamento',
    description: 'A unidade IVECO Curitiba possui um Suporte de Eixo compatível com o caminhão atualmente em manutenção na sua oficina.',
    actionLabel: 'Ver peça compatível',
    actionTarget: 'part_detail',
    color: '#00e676'
  },
  {
    id: 'sug-2',
    type: 'dormant_stock',
    title: 'Estoque parado identificado',
    description: 'Você possui 4 unidades de Farol Full LED sem movimentação há 180 dias.',
    actionLabel: 'Disponibilizar para a rede',
    actionTarget: 'stock_share',
    color: '#eab308'
  },
  {
    id: 'sug-3',
    type: 'prevent_waste',
    title: 'Descarte evitável detectado',
    description: '2 peças destinadas ao descarte possuem 65% de potencial de recuperação mecânica.',
    actionLabel: 'Reanalisar com IA',
    actionTarget: 'scanner_parts',
    color: '#38bdf8'
  }
];

export const CIRCULAR_ECONOMY_METRICS = {
  reusedParts: 87,
  exchangedParts: 42,
  recycledWasteKg: 1240,
  co2AvoidedKg: 1890,
  circularityRatePercent: 84,
  printed3DParts: 38,
  lightweightWeightSavedKg: 164,
  co2RoadSavingsKg: 640,
  activeHubs3D: 5,
  monthlyEvolution: [
    { month: 'Mar', reused: 45, co2: 620, recycledKg: 580, printed3D: 12 },
    { month: 'Abr', reused: 58, co2: 810, recycledKg: 790, printed3D: 18 },
    { month: 'Mai', reused: 68, co2: 950, recycledKg: 940, printed3D: 24 },
    { month: 'Jun', reused: 75, co2: 1080, recycledKg: 1090, printed3D: 29 },
    { month: 'Jul', reused: 82, co2: 1190, recycledKg: 1180, printed3D: 33 },
    { month: 'Ago', reused: 87, co2: 1890, recycledKg: 1240, printed3D: 38 }
  ]
};

export const PRINT_3D_CATALOG = [
  {
    id: 'cad-001',
    code: 'CAD-504187-CF',
    name: 'Suporte Articulado do Chicote de Sensores',
    category: 'Suportes & Carenagem',
    compatibleModel: 'IVECO S-Way 540 / Hi-Way',
    material: 'PA12-CF (Nylon c/ Fibra de Carbono Contínua)',
    originalMaterial: 'Aço Carbono Estampado',
    originalWeightKg: 2.8,
    printedWeightKg: 0.92,
    weightReductionPercent: 67,
    tensileStrengthMpa: 165,
    tempResistanceCelsius: 180,
    printTimeHours: 4.5,
    co2ManufactureSavedKg: 28.5,
    co2RoadSavedPer100kKmKg: 42.0,
    totalCo2BenefitKg: 70.5,
    cadStatus: 'Homologado Engenharia IVECO',
    costEstimateBrl: 185.00,
    originalCostBrl: 890.00,
    imageType: 'bracket'
  },
  {
    id: 'cad-002',
    code: 'CAD-502919-CF',
    name: 'Duto Direcionador de Fluxo do Intercooler',
    category: 'Sistema de Admissão & Turbo',
    compatibleModel: 'IVECO Daily 35-160 / Eurocargo',
    material: 'PETG-CF Antichama (V-0)',
    originalMaterial: 'Alumínio Fundido',
    originalWeightKg: 3.4,
    printedWeightKg: 1.15,
    weightReductionPercent: 66,
    tensileStrengthMpa: 92,
    tempResistanceCelsius: 125,
    printTimeHours: 6.2,
    co2ManufactureSavedKg: 36.2,
    co2RoadSavedPer100kKmKg: 51.0,
    totalCo2BenefitKg: 87.2,
    cadStatus: 'Homologado Engenharia IVECO',
    costEstimateBrl: 240.00,
    originalCostBrl: 1250.00,
    imageType: 'duct'
  },
  {
    id: 'cad-003',
    code: 'CAD-503412-CF',
    name: 'Carcaça Protetora da ECU de Cabine',
    category: 'Eletrônica Embarcada',
    compatibleModel: 'IVECO Tector 240E28 / Daily',
    material: 'PA6-CF Anti-UV & Resistente a Óleo',
    originalMaterial: 'Aço Laminado Galvanizado',
    originalWeightKg: 1.9,
    printedWeightKg: 0.62,
    weightReductionPercent: 67,
    tensileStrengthMpa: 140,
    tempResistanceCelsius: 160,
    printTimeHours: 3.8,
    co2ManufactureSavedKg: 19.8,
    co2RoadSavedPer100kKmKg: 29.0,
    totalCo2BenefitKg: 48.8,
    cadStatus: 'Homologado Engenharia IVECO',
    costEstimateBrl: 140.00,
    originalCostBrl: 680.00,
    imageType: 'housing'
  },
  {
    id: 'cad-004',
    code: 'CAD-501823-CF',
    name: 'Presilha de Alta Pressão das Linhas Pneumáticas (Kit c/ 4)',
    category: 'Pneumática & Freios',
    compatibleModel: 'IVECO Stralis / Hi-Way / S-Way',
    material: 'PEEK Alta Performance Reforçado',
    originalMaterial: 'Latão & Ferro Forjado',
    originalWeightKg: 1.2,
    printedWeightKg: 0.38,
    weightReductionPercent: 68,
    tensileStrengthMpa: 210,
    tempResistanceCelsius: 240,
    printTimeHours: 2.2,
    co2ManufactureSavedKg: 15.0,
    co2RoadSavedPer100kKmKg: 19.5,
    totalCo2BenefitKg: 34.5,
    cadStatus: 'Homologado Engenharia IVECO',
    costEstimateBrl: 110.00,
    originalCostBrl: 490.00,
    imageType: 'clamp'
  }
];

export const HUB_3D_PRINTERS = [
  {
    id: 'prt-01',
    name: 'Célula 3D Alfa — IVECO SP',
    model: 'Industrial Markforged FX20 / Bambu X1E Carbon',
    technology: 'FDM Compósito Fibra Contínua',
    location: 'IVECO São Paulo — Almoxarifado Técnico',
    status: 'printing',
    currentJob: {
      partName: 'Suporte Articulado do Chicote CAD-504187-CF',
      progressPercent: 72,
      layerCurrent: 432,
      layerTotal: 600,
      timeLeftMinutes: 48,
      chamberTempCelsius: 85,
      materialLoaded: 'PA12-CF + Fibra de Carbono Contínua',
      operator: 'Técnico Gaspar Ricardo Junior'
    },
    spoolWeightRemainingG: 1420,
    jobsCompletedMonth: 18,
    co2AvoidedMonthKg: 520
  },
  {
    id: 'prt-02',
    name: 'Célula 3D Beta — IVECO SP',
    model: 'SLS Polímeros Industriais Sintratec S3',
    technology: 'Sinterização a Laser (SLS)',
    location: 'IVECO São Paulo — Célula de Prototipagem',
    status: 'ready',
    currentJob: null,
    spoolWeightRemainingG: 4800,
    jobsCompletedMonth: 12,
    co2AvoidedMonthKg: 410
  },
  {
    id: 'prt-03',
    name: 'Célula 3D Curitiba',
    model: 'Roboze One+400 PEEK / Carbon',
    technology: 'FDM Superpolímeros de Alta Temperatura',
    location: 'IVECO Curitiba — PR (410 km)',
    status: 'ready',
    currentJob: null,
    spoolWeightRemainingG: 2200,
    jobsCompletedMonth: 8,
    co2AvoidedMonthKg: 280
  }
];
