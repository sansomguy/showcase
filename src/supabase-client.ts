import type { RequestEventAction } from '@builder.io/qwik-city'
import { createClient } from '@supabase/supabase-js'

export function createSupabaseClient(event: RequestEventAction) {
  const supabaseUrl = 'https://rzoqdvamntfrabpvvnsp.supabase.co'
  const key = event.env.get('SUPABASE_KEY') as string
  return createClient(supabaseUrl, key)
}
