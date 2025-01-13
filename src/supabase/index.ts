import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";
import { Resource } from "sst";

export function createSupabaseClient() {
  const supabaseUrl = "https://rzoqdvamntfrabpvvnsp.supabase.co";
  const client = createClient<Database>(
    supabaseUrl,
    Resource.SupabaseKey.value,
  );
  return client;
}
