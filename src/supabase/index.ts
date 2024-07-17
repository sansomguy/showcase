import { createClient } from "@supabase/supabase-js";
import { Resource } from "sst";

export function createSupabaseClient() {
  const supabaseUrl = "https://rzoqdvamntfrabpvvnsp.supabase.co";
  const client = createClient(supabaseUrl, Resource.SupabaseKey.value);
  return client;
}
