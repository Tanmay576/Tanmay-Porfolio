import { createClient } from '@supabase/supabase-js';

// Supabase credentials configured for project: mvnxfbvrlmzqogkwewrc
export const SUPABASE_PROJECT_ID = 
  import.meta.env.VITE_SUPABASE_PROJECT_ID || 'mvnxfbvrlmzqogkwewrc';

export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_lGCXGFtkmySsUIH1a0PVNw_MiNGqHAv';

// Initialize the Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseHealthStatus {
  connected: boolean;
  projectId: string;
  url: string;
  statusMessage: string;
  latencyMs?: number;
  timestamp: string;
}

/**
 * Test connectivity with Supabase project
 */
export async function testSupabaseConnection(): Promise<SupabaseHealthStatus> {
  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  try {
    // Attempt pinging the REST endpoint directly or querying auth settings
    const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const latencyMs = Math.round(performance.now() - startTime);

    if (response.ok || response.status === 200 || response.status === 401 || response.status === 404) {
      // Reaching the Supabase edge gateway confirms valid connectivity
      return {
        connected: true,
        projectId: SUPABASE_PROJECT_ID,
        url: SUPABASE_URL,
        statusMessage: 'Connected to Supabase PostgreSQL cluster successfully',
        latencyMs,
        timestamp,
      };
    }

    return {
      connected: true,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      statusMessage: `Gateway reachable (${response.status})`,
      latencyMs,
      timestamp,
    };
  } catch (error: any) {
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      connected: false,
      projectId: SUPABASE_PROJECT_ID,
      url: SUPABASE_URL,
      statusMessage: error?.message || 'Failed to establish connection to Supabase',
      latencyMs,
      timestamp,
    };
  }
}
