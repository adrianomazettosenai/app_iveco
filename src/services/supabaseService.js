import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { 
  IVECO_UNITS, 
  INITIAL_USER, 
  PARTS_CATALOG, 
  NETWORK_PARTS_SEARCH, 
  EXCHANGE_REQUESTS, 
  DISPOSAL_ITEMS, 
  SUSTAINABLE_COMPANIES, 
  SCHEDULED_COLLECTION, 
  NOTIFICATIONS, 
  HISTORY_ITEMS, 
  AI_SUGGESTIONS, 
  CIRCULAR_ECONOMY_METRICS,
  TRUCK_INSPECTION_MOCK
} from '../data/mockData';

/**
 * SERVIÇO DE INTEGRAÇÃO COM SUPABASE (ECOFICINA IVECO 2.0)
 * Fornece métodos assíncronos para todas as operações com fallback seguro para mockData.
 */

// ==============================================================================
// 1. UNIDADES IVECO
// ==============================================================================
export async function getUnits() {
  if (!isSupabaseConfigured || !supabase) return IVECO_UNITS;
  try {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .order('distance_km', { ascending: true });
    
    if (error || !data || data.length === 0) return IVECO_UNITS;

    return data.map(u => ({
      id: u.id,
      name: u.name,
      state: u.state,
      city: u.city,
      address: u.address,
      phone: u.phone,
      email: u.email,
      cnpj: u.cnpj,
      distanceKm: Number(u.distance_km || 0),
      active: u.active,
      totalStock: u.total_stock || 0,
      availableForExchange: u.available_for_exchange || 0,
      awaitingDisposal: u.awaiting_disposal || 0,
      reusedParts: u.reused_parts || 0,
      co2AvoidedKg: Number(u.co2_avoided_kg || 0),
      openRequests: u.open_requests || 0
    }));
  } catch (err) {
    console.warn('Erro ao consultar units no Supabase:', err);
    return IVECO_UNITS;
  }
}

// ==============================================================================
// 1.1 AUTENTICAÇÃO SUPABASE & GOOGLE OAUTH
// ==============================================================================
export async function signInWithGoogle() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase não configurado');
  }
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
  return data;
}

export async function signInWithEmail(email, password) {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.auth.signOut();
}

// ==============================================================================
// 2. PERFIL DO USUÁRIO
// ==============================================================================
export async function getUserProfile(email = 'adriano.ribeiro@iveco.com') {
  if (!isSupabaseConfigured || !supabase) return INITIAL_USER;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error || !data) return INITIAL_USER;

    return {
      name: data.name,
      roleTitle: data.role_title,
      department: data.department,
      email: data.email,
      phone: data.phone,
      registrationId: data.registration_id,
      unitId: data.unit_id || 'sp',
      accessLevel: data.access_level || 'technician',
      avatarUrl: data.avatar_url || INITIAL_USER.avatarUrl
    };
  } catch (err) {
    console.warn('Erro ao consultar profile no Supabase:', err);
    return INITIAL_USER;
  }
}

export async function updateUserProfile(profileData) {
  if (!isSupabaseConfigured || !supabase) return profileData;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        role_title: profileData.roleTitle,
        department: profileData.department,
        registration_id: profileData.registrationId,
        unit_id: profileData.unitId,
        access_level: profileData.accessLevel,
        avatar_url: profileData.avatarUrl
      }, { onConflict: 'email' })
      .select()
      .single();

    if (error) throw error;
    return profileData;
  } catch (err) {
    console.warn('Erro ao atualizar profile no Supabase:', err);
    return profileData;
  }
}

// ==============================================================================
// 3. ESTOQUE E PEÇAS
// ==============================================================================
export async function getParts(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return PARTS_CATALOG;
  try {
    let query = supabase.from('parts').select('*');
    if (unitId) {
      query = query.eq('unit_id', unitId);
    }
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return PARTS_CATALOG;

    return data.map(p => {
      let images = [];
      if (p.image_url) {
        try {
          if (p.image_url.startsWith('[') || p.image_url.startsWith('{')) {
            images = JSON.parse(p.image_url);
          } else {
            images = [p.image_url];
          }
        } catch {
          images = [p.image_url];
        }
      }

      return {
        id: p.id,
        code: p.code,
        name: p.name,
        category: p.category,
        manufacturer: p.manufacturer,
        productionPlace: p.production_place,
        manufacturingDate: p.manufacturing_date,
        compatibility: p.compatibility,
        year: p.year,
        condition: p.condition,
        wearPercentage: p.wear_percentage,
        healthPercent: p.health_percent,
        status: p.status,
        statusLabel: p.status_label,
        quantity: p.quantity,
        unit: p.unit_id === 'sp' ? 'IVECO São Paulo' : p.unit_id,
        unitId: p.unit_id,
        location: p.location,
        availableForExchange: p.available_for_exchange,
        priceEstimate: p.price_estimate,
        co2SavingsKg: Number(p.co2_savings_kg || 0),
        corrosion: p.corrosion,
        deformation: p.deformation,
        cracks: p.cracks,
        overallState: p.overall_state,
        recommendation: p.recommendation,
        materialType: p.material_type,
        totalWeightKg: p.total_weight_kg,
        disposalReason: p.disposal_reason,
        qrCode: p.qr_code,
        imageUrl: images[0] || null,
        images: images
      };
    });
  } catch (err) {
    console.warn('Erro ao consultar parts no Supabase:', err);
    return PARTS_CATALOG;
  }
}

export async function addPart(partData) {
  if (!isSupabaseConfigured || !supabase) return { ...partData, id: `part-${Date.now()}` };
  try {
    let formattedImageUrl = null;
    if (partData.images && Array.isArray(partData.images) && partData.images.length > 0) {
      formattedImageUrl = JSON.stringify(partData.images.slice(0, 3));
    } else if (partData.imageUrl) {
      formattedImageUrl = partData.imageUrl;
    }

    const dbPayload = {
      code: partData.code,
      name: partData.name,
      category: partData.category || 'Geral',
      manufacturer: partData.manufacturer || 'IVECO Genuine Parts',
      production_place: partData.productionPlace || 'Sete Lagoas - MG, Brasil',
      manufacturing_date: partData.manufacturingDate || new Date().toLocaleDateString('pt-BR'),
      compatibility: partData.compatibility || 'IVECO S-WAY',
      year: partData.year || '2024',
      condition: partData.condition || 'Reutilizável',
      wear_percentage: partData.wearPercentage || 10,
      health_percent: partData.healthPercent || 90,
      status: partData.status || 'available',
      status_label: partData.statusLabel || 'Disponível',
      quantity: partData.quantity || 1,
      unit_id: partData.unitId || 'sp',
      location: partData.location || 'Almoxarifado Geral',
      available_for_exchange: partData.availableForExchange !== false,
      price_estimate: partData.priceEstimate || 'R$ 2.500,00',
      co2_savings_kg: partData.co2SavingsKg || 25,
      corrosion: partData.corrosion || 'Inexistente',
      deformation: partData.deformation || 'Inexistente',
      cracks: partData.cracks || 'Inexistente',
      overall_state: partData.overallState || 'Peça em perfeito estado de funcionamento.',
      recommendation: partData.recommendation || 'reutilizar',
      image_url: formattedImageUrl
    };

    const { data, error } = await supabase
      .from('parts')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Erro ao inserir part no Supabase:', err);
    return { ...partData, id: `part-${Date.now()}` };
  }
}

// ==============================================================================
// 4. SOLICITAÇÕES DE TROCA ENTRE UNIDADES
// ==============================================================================
export async function getExchangeRequests() {
  if (!isSupabaseConfigured || !supabase) return EXCHANGE_REQUESTS;
  try {
    const { data, error } = await supabase
      .from('exchange_requests')
      .select(`
        *,
        exchange_tracking_steps (*)
      `)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return EXCHANGE_REQUESTS;

    return data.map(req => {
      const sortedSteps = (req.exchange_tracking_steps || []).sort((a, b) => a.step_number - b.step_number);
      return {
        id: req.id,
        partName: req.part_name,
        partCode: req.part_code,
        requestingUnit: req.requesting_unit_id === 'curitiba' ? 'IVECO Curitiba' : req.requesting_unit_id === 'bh' ? 'IVECO Belo Horizonte' : req.requesting_unit_id === 'poa' ? 'IVECO Porto Alegre' : 'IVECO Campinas',
        requestingUnitState: req.requesting_unit_id === 'curitiba' ? 'PR' : req.requesting_unit_id === 'bh' ? 'MG' : req.requesting_unit_id === 'poa' ? 'RS' : 'SP',
        supplyingUnit: req.supplying_unit_id === 'sp' ? 'IVECO São Paulo' : 'IVECO Outra',
        supplyingUnitState: 'SP',
        quantity: req.quantity,
        requestDate: req.request_date,
        status: req.status,
        statusLabel: req.status_label,
        statusColor: req.status_color,
        currentStep: req.current_step,
        justification: req.justification,
        trackingHistory: sortedSteps.length > 0 ? sortedSteps.map(s => ({
          step: s.step_number,
          title: s.title,
          desc: s.description,
          date: s.date_label,
          done: s.is_done,
          current: s.is_current
        })) : [
          { step: 1, title: 'Solicitação enviada', desc: 'Aguardando aprovação', date: 'Hoje', done: true, current: true },
          { step: 2, title: 'Unidade fornecedora aprova', desc: 'Em análise', date: 'Pendente', done: false },
          { step: 3, title: 'Separação', desc: 'Alocação', date: 'Pendente', done: false },
          { step: 4, title: 'Transporte', desc: 'Em trânsito', date: 'Pendente', done: false },
          { step: 5, title: 'Recebimento', desc: 'Inspeção física', date: 'Pendente', done: false },
          { step: 6, title: 'Estoque atualizado', desc: 'Concluído', date: 'Pendente', done: false }
        ]
      };
    });
  } catch (err) {
    console.warn('Erro ao consultar exchange_requests no Supabase:', err);
    return EXCHANGE_REQUESTS;
  }
}

export async function createExchangeRequest(reqData) {
  const reqId = `REQ-2026-${Math.floor(100 + Math.random() * 900)}`;
  if (!isSupabaseConfigured || !supabase) {
    return {
      id: reqId,
      ...reqData,
      requestDate: new Date().toLocaleDateString('pt-BR'),
      status: 'pending',
      statusLabel: 'Aguardando aprovação',
      statusColor: '#eab308',
      currentStep: 1,
      trackingHistory: [
        { step: 1, title: 'Solicitação enviada', desc: 'Aguardando aprovação do gestor', date: 'Hoje', done: true, current: true },
        { step: 2, title: 'Unidade fornecedora aprova', desc: 'Solicitação aguardando autorização', date: 'Pendente', done: false },
        { step: 3, title: 'Separação', desc: 'Preparação do item', date: 'Pendente', done: false },
        { step: 4, title: 'Transporte', desc: 'Em trânsito via malha logística IVECO', date: 'Pendente', done: false },
        { step: 5, title: 'Recebimento', desc: 'Inspeção física na chegada', date: 'Pendente', done: false },
        { step: 6, title: 'Estoque atualizado', desc: 'Transferência concluída', date: 'Pendente', done: false }
      ]
    };
  }

  try {
    const { data: requestRecord, error: reqError } = await supabase
      .from('exchange_requests')
      .insert([{
        id: reqId,
        part_name: reqData.partName,
        part_code: reqData.partCode,
        requesting_unit_id: reqData.requestingUnitId || 'curitiba',
        supplying_unit_id: reqData.supplyingUnitId || 'sp',
        quantity: reqData.quantity || 1,
        request_date: new Date().toLocaleDateString('pt-BR'),
        status: 'pending',
        status_label: 'Aguardando aprovação',
        status_color: '#eab308',
        current_step: 1,
        justification: reqData.justification
      }])
      .select()
      .single();

    if (reqError) throw reqError;

    // Criar as 6 etapas no tracking
    const steps = [
      { step_number: 1, title: 'Solicitação enviada', description: 'Aguardando aprovação do gestor', date_label: 'Hoje', is_done: true, is_current: true },
      { step_number: 2, title: 'Unidade fornecedora aprova', description: 'Solicitação aguardando autorização', date_label: 'Pendente', is_done: false, is_current: false },
      { step_number: 3, title: 'Separação', description: 'Preparação do item', date_label: 'Pendente', is_done: false, is_current: false },
      { step_number: 4, title: 'Transporte', description: 'Em trânsito via malha logística IVECO', date_label: 'Pendente', is_done: false, is_current: false },
      { step_number: 5, title: 'Recebimento', description: 'Inspeção física na chegada', date_label: 'Pendente', is_done: false, is_current: false },
      { step_number: 6, title: 'Estoque atualizado', description: 'Transferência concluída', date_label: 'Pendente', is_done: false, is_current: false }
    ].map(s => ({ ...s, request_id: reqId }));

    await supabase.from('exchange_tracking_steps').insert(steps);

    return requestRecord;
  } catch (err) {
    console.warn('Erro ao criar exchange_request no Supabase:', err);
    return { id: reqId, ...reqData };
  }
}

// ==============================================================================
// 5. DESCARTE SUSTENTÁVEL
// ==============================================================================
export async function getDisposalItems(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return DISPOSAL_ITEMS;
  try {
    const { data, error } = await supabase
      .from('disposal_items')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return DISPOSAL_ITEMS;

    return data.map(d => ({
      id: d.id,
      name: d.name,
      category: d.category,
      material: d.material,
      quantity: d.quantity,
      weightKg: Number(d.weight_kg || 0),
      status: d.status,
      icon: d.icon || 'filter'
    }));
  } catch (err) {
    console.warn('Erro ao consultar disposal_items no Supabase:', err);
    return DISPOSAL_ITEMS;
  }
}

export async function addDisposalItem(itemData) {
  const itemId = `disp-${Date.now()}`;
  if (!isSupabaseConfigured || !supabase) return { id: itemId, ...itemData };
  try {
    const { data, error } = await supabase
      .from('disposal_items')
      .insert([{
        id: itemId,
        unit_id: itemData.unitId || 'sp',
        name: itemData.name,
        category: itemData.category,
        material: itemData.material,
        quantity: itemData.quantity,
        weight_kg: Number(itemData.weightKg || 0),
        status: itemData.status || 'Aguardando coleta',
        icon: itemData.icon || 'filter'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Erro ao inserir disposal_item no Supabase:', err);
    return { id: itemId, ...itemData };
  }
}

export async function getSustainableCompanies() {
  if (!isSupabaseConfigured || !supabase) return SUSTAINABLE_COMPANIES;
  try {
    const { data, error } = await supabase
      .from('sustainable_companies')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) return SUSTAINABLE_COMPANIES;

    return data.map(c => ({
      id: c.id,
      name: c.name,
      badge: c.badge,
      distanceKm: Number(c.distance_km || 0),
      rating: Number(c.rating || 5),
      acceptedMaterials: c.accepted_materials || [],
      hasCollectionService: c.has_collection_service,
      licenseIbama: c.license_ibama,
      address: c.address,
      phone: c.phone,
      availableDates: c.available_dates || []
    }));
  } catch (err) {
    console.warn('Erro ao consultar sustainable_companies no Supabase:', err);
    return SUSTAINABLE_COMPANIES;
  }
}

export async function getScheduledCollection(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return SCHEDULED_COLLECTION;
  try {
    const { data, error } = await supabase
      .from('scheduled_collections')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error || !data) return SCHEDULED_COLLECTION;

    return {
      id: data.id,
      companyName: data.company_name,
      date: data.collection_date,
      timeSlot: data.time_slot,
      period: data.period,
      location: data.location,
      totalItems: data.total_items,
      totalWeightKg: Number(data.total_weight_kg),
      status: data.status,
      statusColor: data.status_color,
      notes: data.notes,
      certificateReady: data.certificate_ready,
      certificateCode: data.certificate_code
    };
  } catch (err) {
    console.warn('Erro ao consultar scheduled_collections no Supabase:', err);
    return SCHEDULED_COLLECTION;
  }
}

// ==============================================================================
// 6. NOTIFICAÇÕES & HISTÓRICO
// ==============================================================================
export async function getNotifications(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return NOTIFICATIONS;
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return NOTIFICATIONS;

    return data.map(n => ({
      id: n.id,
      title: n.title,
      message: n.message,
      timestamp: n.timestamp_label || 'Recente',
      type: n.type,
      unread: n.unread,
      iconColor: n.icon_color || '#00e676'
    }));
  } catch (err) {
    console.warn('Erro ao consultar notifications no Supabase:', err);
    return NOTIFICATIONS;
  }
}

export async function markAllNotificationsAsRead(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return true;
  try {
    await supabase
      .from('notifications')
      .update({ unread: false })
      .eq('unit_id', unitId);
    return true;
  } catch (err) {
    console.warn('Erro ao marcar notifications como lidas no Supabase:', err);
    return false;
  }
}

export async function getHistory(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return HISTORY_ITEMS;
  try {
    const { data, error } = await supabase
      .from('history_items')
      .select('*')
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return HISTORY_ITEMS;

    return data.map(h => ({
      id: h.id,
      type: h.type,
      title: h.title,
      detail: h.detail,
      date: h.date_label,
      color: h.color || '#00e676',
      tab: h.tab || 'geral'
    }));
  } catch (err) {
    console.warn('Erro ao consultar history_items no Supabase:', err);
    return HISTORY_ITEMS;
  }
}

// ==============================================================================
// 7. OPORTUNIDADES DA IA & MÉTRICAS ESG
// ==============================================================================
export async function getAiSuggestions(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return AI_SUGGESTIONS;
  try {
    const { data, error } = await supabase
      .from('ai_suggestions')
      .select('*')
      .eq('unit_id', unitId);

    if (error || !data || data.length === 0) return AI_SUGGESTIONS;

    return data.map(s => ({
      id: s.id,
      type: s.type,
      title: s.title,
      description: s.description,
      actionLabel: s.action_label,
      actionTarget: s.action_target,
      color: s.color || '#00e676'
    }));
  } catch (err) {
    console.warn('Erro ao consultar ai_suggestions no Supabase:', err);
    return AI_SUGGESTIONS;
  }
}

export async function getCircularMetrics(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return CIRCULAR_ECONOMY_METRICS;
  try {
    const { data, error } = await supabase
      .from('circular_economy_metrics')
      .select('*')
      .eq('unit_id', unitId)
      .maybeSingle();

    if (error || !data) return CIRCULAR_ECONOMY_METRICS;

    return {
      reusedParts: data.reused_parts || 87,
      exchangedParts: data.exchanged_parts || 42,
      recycledWasteKg: Number(data.recycled_waste_kg || 1240),
      co2AvoidedKg: Number(data.co2_avoided_kg || 1250),
      circularityRatePercent: data.circularity_rate_percent || 78,
      monthlyEvolution: data.monthly_evolution || CIRCULAR_ECONOMY_METRICS.monthlyEvolution
    };
  } catch (err) {
    console.warn('Erro ao consultar circular_economy_metrics no Supabase:', err);
    return CIRCULAR_ECONOMY_METRICS;
  }
}

// ==============================================================================
// 8. INSPEÇÃO DO CAMINHÃO (SCANNER)
// ==============================================================================
export async function getTruckInspection(unitId = 'sp') {
  if (!isSupabaseConfigured || !supabase) return TRUCK_INSPECTION_MOCK;
  try {
    const { data, error } = await supabase
      .from('truck_inspections')
      .select(`
        *,
        truck_inspection_components (*)
      `)
      .eq('unit_id', unitId)
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error || !data) return TRUCK_INSPECTION_MOCK;

    return {
      model: data.model,
      subModel: data.sub_model,
      category: data.category,
      fuel: data.fuel,
      year: data.year,
      licensePlate: data.license_plate,
      chassis: data.chassis,
      mileage: data.mileage,
      healthScore: data.health_score,
      scanDate: new Date(data.scan_date).toLocaleString('pt-BR'),
      components: (data.truck_inspection_components || []).map(c => ({
        id: c.component_key,
        name: c.name,
        category: c.category,
        status: c.status,
        statusLabel: c.status_label,
        wearPercentage: c.wear_percentage,
        health: c.health,
        description: c.description,
        recommendation: c.recommendation,
        color: c.color,
        compatiblePartCode: c.compatible_part_code,
        solutionAvailable: c.solution_available
      }))
    };
  } catch (err) {
    console.warn('Erro ao consultar truck_inspections no Supabase:', err);
    return TRUCK_INSPECTION_MOCK;
  }
}
