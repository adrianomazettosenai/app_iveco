import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zlnmsdervqnbikgxnusr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_cgq1xSue7rsM9uIBscOIdw_VvOxAE3y';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('sua-url-aqui')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

export async function checkSupabaseConnection() {
  if (!supabase) return { connected: false, message: 'Cliente Supabase não inicializado' };
  try {
    const { data, error } = await supabase.from('units').select('id', { count: 'exact', head: true });
    if (error) return { connected: false, message: error.message };
    return { connected: true, message: 'Conectado ao Supabase com sucesso' };
  } catch (err) {
    return { connected: false, message: err.message };
  }
}
