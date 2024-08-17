import type { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient({
  env,
  sharedMap,
}: {
  env: EnvGetter;
  sharedMap?: Map<string, any>;
}) {
  if (sharedMap?.has("supabaseClient")) {
    return sharedMap.get("supabaseClient") as ReturnType<typeof createClient>;
  }
  const supabaseUrl = "https://rzoqdvamntfrabpvvnsp.supabase.co";
  const key = env.get("SUPABASE_KEY") as string;
  const client = createClient(supabaseUrl, key);
  sharedMap?.set("supabaseClient", client);
  return client;
}
