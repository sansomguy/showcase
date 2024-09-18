import { createClient } from "@supabase/supabase-js";
import { Resource } from "sst";
import { Database } from "./types";

export function createSupabaseClient() {
  const supabaseUrl = "https://rzoqdvamntfrabpvvnsp.supabase.co";
  const client = createClient<Database>(
    supabaseUrl,
    Resource.SupabaseKey.value
  );
  return client;
}
