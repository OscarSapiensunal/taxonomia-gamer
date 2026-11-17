// Guardado de respuestas: Supabase si hay config.js con llaves; si no, "modo demo"
// con localStorage (sirve para probar sin internet ni base de datos).
import { CONFIG } from "./config.js";

const hasSupabase = Boolean(CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY);
let client = null;

async function sb() {
  if (!client) {
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm");
    client = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  }
  return client;
}

export const MODE = hasSupabase ? "supabase" : "demo";

export function salaActual() {
  const p = new URLSearchParams(location.search).get("sala");
  const s = (p || CONFIG.SALA_DEFAULT || "cv").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 24);
  return s || "cv";
}

const LKEY = "taxo-demo-respuestas";
function demoAll() {
  try { return JSON.parse(localStorage.getItem(LKEY) || "[]"); } catch { return []; }
}

export async function guardar(r) {
  if (!hasSupabase) {
    try {
      const all = demoAll();
      all.push({ ...r, id: Date.now(), created_at: new Date().toISOString() });
      localStorage.setItem(LKEY, JSON.stringify(all));
    } catch { /* sin almacenamiento: igual mostramos el resultado */ }
    return { ok: true, demo: true };
  }
  const c = await sb();
  const { error } = await c.from("respuestas").insert(r);
  return { ok: !error, error };
}

export async function leer(sala) {
  if (!hasSupabase) return demoAll().filter((r) => r.sala === sala);
  const c = await sb();
  const { data, error } = await c.from("respuestas").select("id,t,e,s,a,tipo,mundo,apodo,created_at")
    .eq("sala", sala).order("created_at", { ascending: true }).limit(1000);
  if (error) throw error;
  return data;
}

// Llama onNew(fila) con cada respuesta nueva. Devuelve una función para cancelar.
export async function escuchar(sala, onNew) {
  if (!hasSupabase) {
    const h = (ev) => { if (ev.key === LKEY) onNew(null); };
    addEventListener("storage", h);
    return () => removeEventListener("storage", h);
  }
  const c = await sb();
  const ch = c.channel("resp-" + sala)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "respuestas", filter: `sala=eq.${sala}` },
      (p) => onNew(p.new))
    .subscribe();
  return () => c.removeChannel(ch);
}
