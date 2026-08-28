# 🗄️ Guia de Configuração e Banco de Dados Supabase — ECOFICINA IVECO 2.0

Este guia contém o **passo a passo detalhado** para criar e configurar o banco de dados PostgreSQL no **Supabase**, além do **script SQL completo** pronto para execução no **SQL Editor**.

---

## 📋 Passo a Passo para Configuração no Supabase

### 1️⃣ Criar conta e projeto no Supabase
1. Acesse **[https://supabase.com](https://supabase.com)** e faça login ou crie uma conta gratuita.
2. Clique em **"New Project"** (Novo Projeto).
3. Preencha os dados:
   - **Name**: `ecoficina-iveco` (ou o nome de sua preferência)
   - **Database Password**: Defina uma senha forte e guarde-a com segurança.
   - **Region**: Selecione `South America (São Paulo - sa-east-1)` para menor latência.
   - **Pricing Plan**: Free Plan (Gratuito).
4. Clique em **"Create new project"** e aguarde 1 a 2 minutos para o provisionamento do banco.

---

### 2️⃣ Executar o Script SQL no SQL Editor
1. No menu lateral esquerdo do painel do Supabase, clique no ícone **SQL Editor** (ícone de terminal `>_`).
2. Clique em **"New Query"** (ou `+`).
3. Copie todo o código SQL fornecido na seção [Script SQL Completo](#-script-sql-completo) deste documento.
4. Cole no editor e clique no botão verde **"RUN"** (ou aperte `Ctrl + Enter`).
5. Verifique se a mensagem **"Success. No rows returned"** é exibida. Todas as tabelas, índices, triggers, políticas de segurança RLS e dados iniciais (Seed) terão sido criados com sucesso!

---

### 3️⃣ Obter as Chaves de Conexão (API Keys)
1. No menu lateral esquerdo, clique em **Project Settings** (ícone de engrenagem ⚙️).
2. Vá na aba **API** (em *Configuration*).
3. Copie os seguintes valores:
   - **Project URL** (ex: `https://xyzcompany.supabase.co`)
   - **Project API Keys** ➔ copie a chave marcada como **`anon` `public`**.

---

### 4️⃣ Configurar o arquivo `.env` no Projeto Local
1. Na pasta raiz do projeto (`IVECO_APP`), crie um arquivo chamado `.env` (ou duplique o `.env.example`).
2. Cole suas chaves no arquivo `.env`:

```env
VITE_SUPABASE_URL=https://seu-id-de-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica-gerada-no-supabase
```

3. Reinicie o servidor de desenvolvimento Vite (`npm run dev`) para carregar as novas variáveis de ambiente.

---

### 5️⃣ (Opcional) Habilitar Storage para Fotos de Peças e Caminhões
1. No menu lateral do Supabase, clique em **Storage**.
2. Clique em **"Create a new bucket"**.
3. Nomeie o bucket como: `iveco-images`.
4. Marque a opção **"Public bucket"** (para permitir visualização de imagens das peças e laudos).
5. Clique em **Save**.

---

## 📜 Script SQL Completo (Copiar e colar no SQL Editor)

```sql
-- ==============================================================================
-- ECOFICINA IVECO 2.0 - SCHEMA COMPLETO POSTGRESQL (SUPABASE)
-- ==============================================================================

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. CRIAÇÃO DAS TABELAS
-- ==============================================================================

-- 2.1 TABELA DE UNIDADES / CONCESSIONÁRIAS IVECO
CREATE TABLE IF NOT EXISTS public.units (
    id VARCHAR(50) PRIMARY KEY,
    name TEXT NOT NULL,
    state VARCHAR(2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(100),
    cnpj VARCHAR(30),
    distance_km NUMERIC DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    total_stock INT DEFAULT 0,
    available_for_exchange INT DEFAULT 0,
    awaiting_disposal INT DEFAULT 0,
    reused_parts INT DEFAULT 0,
    co2_avoided_kg NUMERIC DEFAULT 0,
    open_requests INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.2 PERFIS DE USUÁRIOS E TÉCNICOS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone VARCHAR(30),
    role_title TEXT NOT NULL DEFAULT 'Técnico Especialista',
    department TEXT NOT NULL DEFAULT 'Técnico EcoOficina',
    registration_id VARCHAR(50) NOT NULL DEFAULT 'IVC-884920',
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE SET NULL,
    access_level VARCHAR(20) NOT NULL DEFAULT 'technician', -- 'technician', 'manager', 'admin'
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.3 INSPEÇÕES DE CAMINHÃO (SCANNER 360 / IA)
CREATE TABLE IF NOT EXISTS public.truck_inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    model VARCHAR(100) NOT NULL DEFAULT 'IVECO S-WAY',
    sub_model VARCHAR(100) DEFAULT 'Hi-Way • 480cv',
    category VARCHAR(50) DEFAULT 'Trator Pesado',
    fuel VARCHAR(50) DEFAULT 'Diesel S10',
    year VARCHAR(10) DEFAULT '2022',
    license_plate VARCHAR(20) NOT NULL,
    chassis VARCHAR(50),
    mileage VARCHAR(50),
    health_score INT NOT NULL DEFAULT 100,
    scan_date TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.4 COMPONENTES IDENTIFICADOS NA INSPEÇÃO DO CAMINHÃO
CREATE TABLE IF NOT EXISTS public.truck_inspection_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inspection_id UUID REFERENCES public.truck_inspections(id) ON DELETE CASCADE,
    component_key VARCHAR(50) NOT NULL, -- 'motor', 'pneus', 'freios', 'lanterna', 'suspensao'
    name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'normal', -- 'normal', 'warning', 'critical', 'wear'
    status_label VARCHAR(50) NOT NULL DEFAULT 'Normal',
    wear_percentage INT NOT NULL DEFAULT 0,
    health VARCHAR(50) NOT NULL DEFAULT 'Bom',
    description TEXT,
    recommendation TEXT,
    color VARCHAR(20) DEFAULT '#00e676',
    compatible_part_code VARCHAR(50),
    solution_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.5 CATÁLOGO DE PEÇAS / ESTOQUE
CREATE TABLE IF NOT EXISTS public.parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL,
    name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    manufacturer TEXT,
    production_place TEXT,
    manufacturing_date VARCHAR(30),
    compatibility TEXT,
    year VARCHAR(10),
    condition VARCHAR(50) NOT NULL DEFAULT 'Reutilizável', -- 'Reutilizável', 'Recuperável', 'Descarte'
    wear_percentage INT NOT NULL DEFAULT 0,
    health_percent INT NOT NULL DEFAULT 100,
    status VARCHAR(50) NOT NULL DEFAULT 'available', -- 'available', 'in_maintenance', 'disposal', 'in_transit'
    status_label VARCHAR(50) NOT NULL DEFAULT 'Disponível',
    quantity INT NOT NULL DEFAULT 1,
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    location TEXT,
    available_for_exchange BOOLEAN DEFAULT TRUE,
    price_estimate VARCHAR(50),
    co2_savings_kg NUMERIC DEFAULT 0,
    corrosion TEXT,
    deformation TEXT,
    cracks TEXT,
    overall_state TEXT,
    recommendation VARCHAR(50) DEFAULT 'reutilizar', -- 'reutilizar', 'reaproveitar', 'recuperar', 'descartar'
    material_type TEXT,
    total_weight_kg NUMERIC,
    disposal_reason TEXT,
    qr_code TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.6 SOLICITAÇÕES DE TROCA ENTRE UNIDADES
CREATE TABLE IF NOT EXISTS public.exchange_requests (
    id VARCHAR(50) PRIMARY KEY, -- 'REQ-2026-081'
    part_id UUID REFERENCES public.parts(id) ON DELETE SET NULL,
    part_name TEXT NOT NULL,
    part_code VARCHAR(50) NOT NULL,
    requesting_unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    supplying_unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    request_date VARCHAR(30) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'analyzing', 'in_transit', 'completed', 'cancelled'
    status_label VARCHAR(50) NOT NULL DEFAULT 'Aguardando aprovação',
    status_color VARCHAR(20) DEFAULT '#eab308',
    current_step INT NOT NULL DEFAULT 1,
    justification TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.7 ETAPAS DE RASTREAMENTO DA TROCA
CREATE TABLE IF NOT EXISTS public.exchange_tracking_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id VARCHAR(50) REFERENCES public.exchange_requests(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    date_label TEXT,
    is_done BOOLEAN DEFAULT FALSE,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.8 EMPRESAS HOMOLOGADAS DE DESTINAÇÃO SUSTENTÁVEL
CREATE TABLE IF NOT EXISTS public.sustainable_companies (
    id VARCHAR(50) PRIMARY KEY, -- 'comp-1'
    name TEXT NOT NULL,
    badge VARCHAR(100),
    distance_km NUMERIC DEFAULT 0,
    rating NUMERIC(2,1) DEFAULT 5.0,
    accepted_materials TEXT[] NOT NULL DEFAULT '{}',
    has_collection_service BOOLEAN DEFAULT TRUE,
    license_ibama VARCHAR(100),
    address TEXT,
    phone VARCHAR(30),
    available_dates TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.9 ITENS NA CENTRAL DE DESCARTE SUSTENTÁVEL
CREATE TABLE IF NOT EXISTS public.disposal_items (
    id VARCHAR(50) PRIMARY KEY, -- 'disp-1'
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    material TEXT,
    quantity VARCHAR(50),
    weight_kg NUMERIC NOT NULL DEFAULT 0,
    status VARCHAR(100) NOT NULL,
    icon VARCHAR(50) DEFAULT 'filter',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.10 AGENDAMENTO DE COLETAS SUSTENTÁVEIS
CREATE TABLE IF NOT EXISTS public.scheduled_collections (
    id VARCHAR(50) PRIMARY KEY, -- 'COL-2026-0915'
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    company_id VARCHAR(50) REFERENCES public.sustainable_companies(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    collection_date VARCHAR(30) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    period VARCHAR(50),
    location TEXT NOT NULL,
    total_items INT NOT NULL DEFAULT 1,
    total_weight_kg NUMERIC NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Agendamento confirmado',
    status_color VARCHAR(20) DEFAULT '#00e676',
    notes TEXT,
    certificate_ready BOOLEAN DEFAULT FALSE,
    certificate_code VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.11 NOTIFICAÇÕES DO SISTEMA
CREATE TABLE IF NOT EXISTS public.notifications (
    id VARCHAR(50) PRIMARY KEY, -- 'notif-1'
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp_label VARCHAR(30) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'request', 'approval', 'disposal', 'scanner', 'stock'
    unread BOOLEAN DEFAULT TRUE,
    icon_color VARCHAR(20) DEFAULT '#00e676',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.12 HISTÓRICO DE MOVIMENTAÇÕES
CREATE TABLE IF NOT EXISTS public.history_items (
    id VARCHAR(50) PRIMARY KEY, -- 'hist-1'
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'received', 'sent', 'disposal', 'analysis', 'stock_add'
    title TEXT NOT NULL,
    detail TEXT NOT NULL,
    date_label VARCHAR(50) NOT NULL,
    color VARCHAR(20) DEFAULT '#00e676',
    tab VARCHAR(20) NOT NULL DEFAULT 'geral', -- 'geral', 'trocas', 'descarte'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.13 OPORTUNIDADES DA IA (INTELIGÊNCIA DE REDE)
CREATE TABLE IF NOT EXISTS public.ai_suggestions (
    id VARCHAR(50) PRIMARY KEY, -- 'sug-1'
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'reuse', 'dormant_stock', 'prevent_waste'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_label TEXT NOT NULL,
    action_target TEXT NOT NULL,
    color VARCHAR(20) DEFAULT '#00e676',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2.14 MÉTRICAS DE IMPACTO AMBIENTAL & ESG
CREATE TABLE IF NOT EXISTS public.circular_economy_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id VARCHAR(50) REFERENCES public.units(id) ON DELETE CASCADE UNIQUE,
    reused_parts INT NOT NULL DEFAULT 87,
    exchanged_parts INT NOT NULL DEFAULT 42,
    recycled_waste_kg NUMERIC NOT NULL DEFAULT 1240,
    co2_avoided_kg NUMERIC NOT NULL DEFAULT 1250,
    circularity_rate_percent INT NOT NULL DEFAULT 78,
    monthly_evolution JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 3. GATILHOS (TRIGGERS) PARA ATUALIZAÇÃO AUTOMÁTICA DE updated_at
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trigger_units_updated_at ON public.units;
CREATE TRIGGER trigger_units_updated_at BEFORE UPDATE ON public.units FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_parts_updated_at ON public.parts;
CREATE TRIGGER trigger_parts_updated_at BEFORE UPDATE ON public.parts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_exchange_requests_updated_at ON public.exchange_requests;
CREATE TRIGGER trigger_exchange_requests_updated_at BEFORE UPDATE ON public.exchange_requests FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_disposal_items_updated_at ON public.disposal_items;
CREATE TRIGGER trigger_disposal_items_updated_at BEFORE UPDATE ON public.disposal_items FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ==============================================================================
-- 4. ÍNDICES PARA ALTA PERFORMANCE
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_parts_unit ON public.parts(unit_id);
CREATE INDEX IF NOT EXISTS idx_parts_code ON public.parts(code);
CREATE INDEX IF NOT EXISTS idx_parts_status ON public.parts(status);
CREATE INDEX IF NOT EXISTS idx_exchange_req_requesting ON public.exchange_requests(requesting_unit_id);
CREATE INDEX IF NOT EXISTS idx_exchange_req_supplying ON public.exchange_requests(supplying_unit_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unit ON public.notifications(unit_id);
CREATE INDEX IF NOT EXISTS idx_history_unit ON public.history_items(unit_id);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) E POLÍTICAS DE ACESSO
-- ==============================================================================

ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.truck_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.truck_inspection_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_tracking_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sustainable_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disposal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.circular_economy_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas de Leitura e Escrita Públicas/Autenticadas para Operação do App
CREATE POLICY "Permitir leitura total de units" ON public.units FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de truck_inspections" ON public.truck_inspections FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de truck_inspection_components" ON public.truck_inspection_components FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de parts" ON public.parts FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de exchange_requests" ON public.exchange_requests FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de exchange_tracking_steps" ON public.exchange_tracking_steps FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de sustainable_companies" ON public.sustainable_companies FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de disposal_items" ON public.disposal_items FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de scheduled_collections" ON public.scheduled_collections FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de history_items" ON public.history_items FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de ai_suggestions" ON public.ai_suggestions FOR SELECT USING (true);
CREATE POLICY "Permitir leitura total de circular_economy_metrics" ON public.circular_economy_metrics FOR SELECT USING (true);

CREATE POLICY "Permitir inserção e atualização de parts" ON public.parts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de exchange_requests" ON public.exchange_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de disposal_items" ON public.disposal_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de scheduled_collections" ON public.scheduled_collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de truck_inspections" ON public.truck_inspections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir inserção e atualização de truck_inspection_components" ON public.truck_inspection_components FOR ALL USING (true);

-- ==============================================================================
-- 6. HABILITAR REALTIME (ATUALIZAÇÃO EM TEMPO REAL)
-- ==============================================================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.parts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.exchange_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.scheduled_collections;

-- ==============================================================================
-- 7. SEED DATA (DADOS INICIAIS DA APLICAÇÃO ECOFICINA IVECO)
-- ==============================================================================

-- 7.1 INSERIR UNIDADES
INSERT INTO public.units (id, name, state, city, address, phone, email, cnpj, distance_km, active, total_stock, available_for_exchange, awaiting_disposal, reused_parts, co2_avoided_kg, open_requests)
VALUES
('sp', 'IVECO São Paulo', 'SP', 'São Paulo', 'Av. das Nações Unidas, 22.000 — Brooklin, São Paulo - SP', '(11) 1334-5678', 'saopaulo@iveco.com', '12.345.678/0001-90', 0, true, 128, 42, 16, 87, 1250, 7),
('curitiba', 'IVECO Curitiba', 'PR', 'Curitiba', 'Rod. BR-277, km 4.500 — Mossunguê, Curitiba - PR', '(41) 3210-9870', 'curitiba@iveco.com', '12.345.678/0002-71', 410, false, 94, 31, 9, 62, 910, 4),
('bh', 'IVECO Belo Horizonte', 'MG', 'Belo Horizonte', 'Anel Rodoviário Celso Mello Azevedo, 15.200 — Olhos D''Água, Belo Horizonte - MG', '(31) 3450-1122', 'bh@iveco.com', '12.345.678/0003-52', 585, false, 112, 38, 14, 74, 1080, 5),
('poa', 'IVECO Porto Alegre', 'RS', 'Porto Alegre', 'Av. das Indústrias, 800 — São João, Porto Alegre - RS', '(51) 3344-5566', 'poa@iveco.com', '12.345.678/0004-33', 1120, false, 76, 22, 8, 49, 730, 3),
('rio', 'IVECO Rio de Janeiro', 'RJ', 'Rio de Janeiro', 'Rod. Presidente Dutra, km 165 — Pavuna, Rio de Janeiro - RJ', '(21) 2590-4400', 'rio@iveco.com', '12.345.678/0005-14', 430, false, 105, 35, 12, 70, 1010, 6),
('campinas', 'IVECO Campinas', 'SP', 'Campinas', 'Rod. Anhanguera, km 98 — Jardim Etemp, Campinas - SP', '(19) 3788-9000', 'campinas@iveco.com', '12.345.678/0006-03', 95, false, 88, 29, 11, 58, 850, 3)
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name,
total_stock = EXCLUDED.total_stock,
available_for_exchange = EXCLUDED.available_for_exchange;

-- 7.2 INSERIR PERFIL INICIAL
INSERT INTO public.profiles (name, email, phone, role_title, department, registration_id, unit_id, access_level, avatar_url)
VALUES
('Adriano Ribeiro', 'adriano.ribeiro@iveco.com', '(11) 98765-4321', 'Técnico Especialista', 'Técnico EcoOficina', 'IVC-884920', 'sp', 'technician', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80')
ON CONFLICT (email) DO NOTHING;

-- 7.3 INSERIR PEÇAS DO CATÁLOGO / ESTOQUE
INSERT INTO public.parts (id, code, name, category, manufacturer, production_place, manufacturing_date, compatibility, year, condition, wear_percentage, health_percent, status, status_label, quantity, unit_id, location, available_for_exchange, price_estimate, co2_savings_kg, corrosion, deformation, cracks, overall_state, recommendation, material_type, total_weight_kg, disposal_reason)
VALUES
('a0000001-0000-0000-0000-000000000001', '504385987', 'Alternador 28V 100A', 'Elétrico', 'IVECO Genuine Parts / Bosch', 'Sete Lagoas - MG, Brasil', '14/10/2023', 'IVECO S-WAY • TECTOR • DAILY', '2023', 'Reutilizável', 20, 80, 'available', 'Disponível', 3, 'sp', 'Almoxarifado B — Prateleira 04 — Gaveta 12', true, 'R$ 2.450,00', 38, 'Nenhuma (0%)', 'Inexistente', 'Inexistente', 'Excelente estado de conservação mecânica e elétrica.', 'reutilizar', NULL, NULL, NULL),
('a0000001-0000-0000-0000-000000000002', '5801215774', 'Compressor de Ar Monocilíndrico', 'Pneumático', 'IVECO / Knorr-Bremse', 'Turim, Itália', '08/04/2022', 'IVECO S-WAY • STRALIS', '2022', 'Reutilizável', 25, 75, 'available', 'Disponível', 2, 'sp', 'Almoxarifado A — Prateleira 02 — Gaveta 08', true, 'R$ 3.800,00', 52, 'Superficial leve (<3%)', 'Inexistente', 'Inexistente', 'Pressão nominal mantida em testes de bancada.', 'reutilizar', NULL, NULL, NULL),
('a0000001-0000-0000-0000-000000000003', '5801871954', 'Turbo Compressor Garrett Dual Stage', 'Motor / Turbo', 'IVECO / Garrett Turbos', 'Guarulhos - SP, Brasil', '19/11/2021', 'IVECO S-WAY 480 / 540', '2021', 'Recuperável', 42, 58, 'in_maintenance', 'Em análise', 1, 'sp', 'Bancada de Diagnóstico 03', false, 'R$ 7.200,00', 94, 'Inexistente', 'Folga no rotor de admissão (0.4mm)', 'Inexistente', 'Necessita retífica de eixo e troca de vedações.', 'recuperar', NULL, NULL, NULL),
('a0000001-0000-0000-0000-000000000004', '5043871102', 'Farol Direito Full LED Matrix', 'Iluminação', 'IVECO / Magneti Marelli', 'Hortolândia - SP, Brasil', '02/03/2024', 'IVECO S-WAY', '2024', 'Reutilizável', 5, 95, 'available', 'Disponível', 4, 'sp', 'Almoxarifado C — Prateleira 01 — Caixa 05', true, 'R$ 4.100,00', 28, 'Inexistente', 'Inexistente', 'Inexistente', 'Lente intacta, diodos LED e chicote com 100% de emissão.', 'reutilizar', NULL, NULL, NULL),
('a0000001-0000-0000-0000-000000000005', '50418756', 'Suporte do Eixo Traseiro Forjado', 'Suspensão / Chassi', 'IVECO Genuine Heavy Parts', 'Sete Lagoas - MG, Brasil', '15/07/2022', 'IVECO S-WAY • STRALIS Hi-Way', '2022', 'Reutilizável', 18, 82, 'available', 'Disponível para troca', 2, 'sp', 'Almoxarifado D — Pátio de Pesados — Box 14', true, 'R$ 1.950,00', 45, 'Tratamento galvanizado 100%', 'Inexistente', 'Inexistente (ensaio por ultrassom aprovado)', '82% — Bom. Pronto para instalação imediata.', 'reutilizar', NULL, NULL, NULL),
('a0000001-0000-0000-0000-000000000006', '50291832', 'Disco de Freio Ventilado Eixo Dianteiro', 'Frenagem / Resíduo', 'IVECO / Meritor', 'Osasco - SP, Brasil', '10/01/2020', 'IVECO S-WAY • STRALIS', '2020', 'Descarte', 88, 12, 'disposal', 'Destinado ao descarte', 8, 'sp', 'Área de Sucata e Reciclagem — Caçamba 02', false, NULL, NULL, NULL, NULL, NULL, NULL, 'descartar', 'Ferro fundido nodular', 96, 'Espessura residual abaixo da cota mínima de segurança (34mm < 38mm).')
ON CONFLICT (id) DO NOTHING;

-- 7.4 INSERIR INSPEÇÃO DE CAMINHÃO COM IA
INSERT INTO public.truck_inspections (id, unit_id, model, sub_model, category, fuel, year, license_plate, chassis, mileage, health_score, scan_date)
VALUES
('b0000001-0000-0000-0000-000000000001', 'sp', 'IVECO S-WAY', 'Hi-Way • 480cv', 'Trator Pesado', 'Diesel S10', '2022', 'IVC-2E24', '93ZSW480XNC098421', '142.800 km', 78, NOW())
ON CONFLICT (id) DO NOTHING;

-- 7.5 INSERIR COMPONENTES DA INSPEÇÃO
INSERT INTO public.truck_inspection_components (inspection_id, component_key, name, category, status, status_label, wear_percentage, health, description, recommendation, color, compatible_part_code, solution_available)
VALUES
('b0000001-0000-0000-0000-000000000001', 'motor', 'Motor Cursor 13', 'Propulsão', 'normal', 'Normal', 12, 'Excelente', NULL, 'Troca periódica de lubrificante em 10.000 km.', '#00e676', NULL, true),
('b0000001-0000-0000-0000-000000000001', 'pneus', 'Pneus e Rodas 295/80R22.5', 'Rodagem', 'normal', 'Normal', 22, 'Bom', NULL, 'Pressão equalizada a 110 PSI. Banda de rodagem dentro dos parâmetros.', '#00e676', NULL, true),
('b0000001-0000-0000-0000-000000000001', 'freios', 'Sistema de Freios a Disco', 'Frenagem', 'warning', 'Manutenção', 65, 'Atenção', 'Desgaste acima do recomendado nas pastilhas e discos do eixo dianteiro.', 'Realizar manutenção preventiva em até 500 km.', '#eab308', '50291832', true),
('b0000001-0000-0000-0000-000000000001', 'lanterna', 'Conjunto Óptico / Lanterna Direita', 'Iluminação', 'critical', 'Ausente', 100, 'Substituição', 'Componente danificado/ausente após colisão lateral leve.', 'Substituição imediata para conformidade com normas de trânsito.', '#ef4444', '5043871102', true),
('b0000001-0000-0000-0000-000000000001', 'suspensao', 'Suspensão Pneumática Traseira', 'Suspensão', 'wear', 'Desgaste', 54, 'Alto desgaste', 'Bolsas de ar com microfissuras e buchas com folga milimétrica.', 'Programar recondicionamento na próxima parada mensal.', '#f97316', '50418756', true);

-- 7.6 INSERIR SOLICITAÇÕES DE TROCA
INSERT INTO public.exchange_requests (id, part_name, part_code, requesting_unit_id, supplying_unit_id, quantity, request_date, status, status_label, status_color, current_step, justification)
VALUES
('REQ-2026-081', 'Alternador 28V 100A', '504385987', 'curitiba', 'sp', 1, '28/08/2026', 'pending', 'Aguardando aprovação', '#eab308', 1, 'Caminhão IVECO S-WAY parado na oficina com alternador queimado. Cliente com carga urgente.'),
('REQ-2026-079', 'Turbo Compressor Garrett Dual Stage', '5801871954', 'bh', 'sp', 1, '27/08/2026', 'analyzing', 'Em análise', '#38bdf8', 2, 'Reposição de componente para atendimento de frota de mineração.'),
('REQ-2026-074', 'Compressor de Ar Monocilíndrico', '5801215774', 'poa', 'sp', 1, '26/08/2026', 'in_transit', 'Em transporte', '#00e676', 4, 'Substituição em plano de manutenção preventiva de frotista parceiro.')
ON CONFLICT (id) DO NOTHING;

-- 7.7 INSERIR ETAPAS DE RASTREAMENTO DAS TROCAS
INSERT INTO public.exchange_tracking_steps (request_id, step_number, title, description, date_label, is_done, is_current)
VALUES
('REQ-2026-081', 1, 'Solicitação enviada', 'Aguardando aprovação do gestor IVECO SP', '28/08 09:15', true, true),
('REQ-2026-081', 2, 'Unidade fornecedora aprova', 'Solicitação aprovada e autorizada', 'Pendente', false, false),
('REQ-2026-081', 3, 'Separação', 'Peça sendo preparada no Almoxarifado B', 'Pendente', false, false),
('REQ-2026-081', 4, 'Transporte', 'Peça em trânsito via malha logística IVECO', 'Pendente', false, false),
('REQ-2026-081', 5, 'Recebimento', 'Inspeção física na chegada em Curitiba', 'Pendente', false, false),
('REQ-2026-081', 6, 'Estoque atualizado', 'Transferência automática concluída', 'Pendente', false, false),

('REQ-2026-079', 1, 'Solicitação enviada', 'Solicitação registrada no sistema', '27/08 14:20', true, false),
('REQ-2026-079', 2, 'Unidade fornecedora aprova', 'Em análise técnica de compatibilidade', '27/08 16:00', true, true),
('REQ-2026-079', 3, 'Separação', 'Alocação de embalagem antichoque', 'Pendente', false, false),
('REQ-2026-079', 4, 'Transporte', 'Em trânsito interestadual', 'Pendente', false, false),
('REQ-2026-079', 5, 'Recebimento', 'Chegada em BH', 'Pendente', false, false),
('REQ-2026-079', 6, 'Estoque atualizado', 'Incorporação ao estoque', 'Pendente', false, false),

('REQ-2026-074', 1, 'Solicitação enviada', 'Criada pela IVECO POA', '26/08 08:30', true, false),
('REQ-2026-074', 2, 'Unidade fornecedora aprova', 'Aprovada por Gestor SP', '26/08 10:15', true, false),
('REQ-2026-074', 3, 'Separação', 'Embalado e etiquetado', '26/08 13:40', true, false),
('REQ-2026-074', 4, 'Transporte', 'Em rota SP -> RS (Previsão: 29/08)', '27/08 06:00', true, true),
('REQ-2026-074', 5, 'Recebimento', 'Aguardando entrega na concessionária', 'Previsto 29/08', false, false),
('REQ-2026-074', 6, 'Estoque atualizado', 'Finalização automática', 'Pendente', false, false);

-- 7.8 INSERIR EMPRESAS SUSTENTÁVEIS
INSERT INTO public.sustainable_companies (id, name, badge, distance_km, rating, accepted_materials, has_collection_service, license_ibama, address, phone, available_dates)
VALUES
('comp-1', 'EcoMetal Reciclagem Industrial', 'Certificada ISO 14001', 12, 4.9, ARRAY['Ferro fundido', 'Alumínio', 'Aço estrutural', 'Sucata pesada'], true, 'IBAMA-CTF 8492019/SP', 'Av. das Indústrias Metalúrgicas, 1420 — Diadema - SP', '(11) 4075-8800', ARRAY['29/08/2026', '30/08/2026', '02/09/2026', '15/09/2026']),
('comp-2', 'ReciclaTech Soluções Ambientais', 'Certificada GreenTech', 18, 4.8, ARRAY['Componentes eletrônicos', 'Chicotes e cabos', 'Plásticos técnicos', 'Módulos ECU'], true, 'IBAMA-CTF 7301948/SP', 'Rua da Tecnologia Verde, 500 — Barueri - SP', '(11) 4199-2233', ARRAY['29/08/2026', '01/09/2026', '03/09/2026']),
('comp-3', 'EcoLub Refino e Re-refino Brasil', 'Certificada ANP & Cetesb', 24, 5.0, ARRAY['Óleo lubrificante usado (OLUC)', 'Fluidos hidráulicos', 'Filtros de óleo automotivos'], true, 'IBAMA-CTF 9912044/SP', 'Polo Petroquímico de Mauá — Mauá - SP', '(11) 4547-9000', ARRAY['30/08/2026', '02/09/2026', '04/09/2026'])
ON CONFLICT (id) DO NOTHING;

-- 7.9 INSERIR ITENS DE DESCARTE
INSERT INTO public.disposal_items (id, unit_id, name, category, material, quantity, weight_kg, status, icon)
VALUES
('disp-1', 'sp', 'Filtro de Óleo Blindado Usado', 'Filtros e Fluidos', 'Aço / Papel impregnado com resíduo de hidrocarboneto', '2 unidades', 4.8, 'Aguardando coleta', 'filter'),
('disp-2', 'sp', 'Óleo Lubrificante Usado (OLUC)', 'Óleos e Fluidos', 'Óleo mineral derivado de petróleo', '20 litros', 18.2, 'Armazenado em tambor homologado', 'droplet'),
('disp-3', 'sp', 'Bateria Chumbo-Ácido Inservível', 'Baterias', 'Chumbo, polipropileno e solução ácida', '1 unidade', 44.0, 'Área com contenção química', 'battery'),
('disp-4', 'sp', 'Pneu Inservível Fora de Estrada', 'Borracha', 'Borracha vulcanizada e cintas de aço', '4 unidades', 281.0, 'Pronto para trituração / asfalto ecológico', 'circle')
ON CONFLICT (id) DO NOTHING;

-- 7.10 INSERIR COLETA AGENDADA
INSERT INTO public.scheduled_collections (id, unit_id, company_id, company_name, collection_date, time_slot, period, location, total_items, total_weight_kg, status, status_color, notes, certificate_ready, certificate_code)
VALUES
('COL-2026-0915', 'sp', 'comp-1', 'EcoMetal Reciclagem', '15/09/2026', '14:00 – 15:00', 'Tarde (14h às 18h)', 'IVECO São Paulo — Pátio de Resíduos', 16, 348, 'Agendamento confirmado', '#00e676', 'Deixar materiais na área externa de descarte, junto à doca 04.', true, 'CERT-ESG-IVECO-2026-0915-08')
ON CONFLICT (id) DO NOTHING;

-- 7.11 INSERIR NOTIFICAÇÕES
INSERT INTO public.notifications (id, unit_id, title, message, timestamp_label, type, unread, icon_color)
VALUES
('notif-1', 'sp', 'Nova solicitação de peça', 'IVECO Campinas solicitou 1x Suporte de Eixo do seu estoque.', '10:30', 'request', true, '#eab308'),
('notif-2', 'sp', 'Peça aprovada para envio', 'Sua solicitação de Turbo Compressor foi aprovada pela unidade IVECO BH.', 'Ontem', 'approval', true, '#00e676'),
('notif-3', 'sp', 'Coleta de resíduos agendada', 'A EcoMetal realizará a coleta de 348 kg amanhã às 14:00.', 'Ontem', 'disposal', true, '#38bdf8'),
('notif-4', 'sp', 'Análise com IA concluída', 'Diagnóstico do caminhão IVECO S-WAY 480cv finalizado com sucesso.', '2 dias', 'scanner', false, '#38bdf8'),
('notif-5', 'sp', 'Estoque atualizado', '3x Alternadores adicionados ao almoxarifado B após inspeção técnica.', '3 dias', 'stock', false, '#ef4444')
ON CONFLICT (id) DO NOTHING;

-- 7.12 INSERIR HISTÓRICO
INSERT INTO public.history_items (id, unit_id, type, title, detail, date_label, color, tab)
VALUES
('hist-1', 'sp', 'received', 'Peça recebida', 'Alternador 28V 100A • Origem: IVECO Curitiba', '28/08/2026 — 08:30', '#00e676', 'trocas'),
('hist-2', 'sp', 'sent', 'Peça enviada', 'Turbo Compressor • Destino: IVECO BH', '27/08/2026 — 15:40', '#ef4444', 'trocas'),
('hist-3', 'sp', 'disposal', 'Coleta realizada com sucesso', 'Óleo lubrificante (20L) • Filtros • Baterias • EcoLub', '25/08/2026 — 14:00', '#00e676', 'descarte'),
('hist-4', 'sp', 'analysis', 'Análise de IA concluída', 'IVECO S-WAY 480cv • Placa IVC-2E24', '24/08/2026 — 11:20', '#38bdf8', 'geral'),
('hist-5', 'sp', 'stock_add', 'Peça adicionada ao estoque', 'Compressor de Ar Monocilíndrico (2 unidades)', '22/08/2026 — 09:10', '#eab308', 'geral')
ON CONFLICT (id) DO NOTHING;

-- 7.13 INSERIR OPORTUNIDADES DA IA
INSERT INTO public.ai_suggestions (id, unit_id, type, title, description, action_label, action_target, color)
VALUES
('sug-1', 'sp', 'reuse', 'Oportunidade de reaproveitamento', 'A unidade IVECO Curitiba possui um Suporte de Eixo compatível com o caminhão atualmente em manutenção na sua oficina.', 'Ver peça compatível', 'part_detail', '#00e676'),
('sug-2', 'sp', 'dormant_stock', 'Estoque parado identificado', 'Você possui 4 unidades de Farol Full LED sem movimentação há 180 dias.', 'Disponibilizar para a rede', 'stock_share', '#eab308'),
('sug-3', 'sp', 'prevent_waste', 'Descarte evitável detectado', '2 peças destinadas ao descarte possuem 65% de potencial de recuperação mecânica.', 'Reanalisar com IA', 'scanner_parts', '#38bdf8')
ON CONFLICT (id) DO NOTHING;

-- 7.14 INSERIR MÉTRICAS ESG / ECONOMIA CIRCULAR
INSERT INTO public.circular_economy_metrics (unit_id, reused_parts, exchanged_parts, recycled_waste_kg, co2_avoided_kg, circularity_rate_percent, monthly_evolution)
VALUES
('sp', 87, 42, 1240, 1250, 78, '[
  {"month": "Mar", "reused": 45, "co2": 620, "recycledKg": 580},
  {"month": "Abr", "reused": 58, "co2": 810, "recycledKg": 790},
  {"month": "Mai", "reused": 68, "co2": 950, "recycledKg": 940},
  {"month": "Jun", "reused": 75, "co2": 1080, "recycledKg": 1090},
  {"month": "Jul", "reused": 82, "co2": 1190, "recycledKg": 1180},
  {"month": "Ago", "reused": 87, "co2": 1250, "recycledKg": 1240}
]'::jsonb)
ON CONFLICT (unit_id) DO NOTHING;
```

---

## 🛠️ Como usar no React com `@supabase/supabase-js`

O cliente do Supabase já está instalado e inicializado em [`src/lib/supabase.js`](file:///C:/Users/adria/OneDrive/Área%20de%20Trabalho/IVECO_APP/src/lib/supabase.js).

### Exemplos de Consultas Úteis:

#### 1. Buscar peças do estoque da unidade:
```javascript
import { supabase } from '../lib/supabase';

export async function fetchUnitParts(unitId = 'sp') {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('parts')
    .select('*')
    .eq('unit_id', unitId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar peças:', error);
    return [];
  }
  return data;
}
```

#### 2. Cadastrar uma nova peça:
```javascript
import { supabase } from '../lib/supabase';

export async function createPart(newPart) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('parts')
    .insert([newPart])
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

#### 3. Escutar notificações em Tempo Real (Realtime):
```javascript
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useRealtimeNotifications(onNewNotification) {
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          onNewNotification(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onNewNotification]);
}
```
