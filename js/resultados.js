import { TIPOS, MUNDOS } from "./data.js";
import { leer, escuchar, salaActual, MODE } from "./store.js";

const $ = (id) => document.getElementById(id);
const sala = salaActual();
$("salaLbl").textContent = "SALA " + sala.toUpperCase();
$("modeLbl").textContent = MODE === "demo" ? "MODO DEMO" : "EN VIVO";

const qr = $("qrImg");
qr.addEventListener("load", () => ($("qrBox").hidden = false));

let filas = [];
const dots = new Map();

// jitter estable por id para que los puntos no se superpongan exacto
function jitter(id, salt) {
  let h = 2166136261 ^ salt;
  for (const c of String(id)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 1000 - 0.5;
}

function posicion(r) {
  // X: mundo (+) vs jugadores (−) · Y: actuar (+) vs interactuar (−)
  const x = (r.t + r.e - r.s - r.a) / 18;
  const y = (r.a + r.t - r.s - r.e) / 18;
  const clamp = (v) => Math.max(-44, Math.min(44, v));
  return {
    left: 50 + clamp(x * 75 + jitter(r.id, 1) * 8),
    top: 50 - clamp(y * 75 + jitter(r.id, 2) * 8),
  };
}

function dibujar(nuevoId) {
  const chart = $("chart");
  for (const r of filas) {
    let d = dots.get(r.id);
    if (!d) {
      d = document.createElement("div");
      d.className = "dot" + (r.id === nuevoId ? " new" : "");
      d.style.background = TIPOS[r.tipo]?.color || "#000";
      d.dataset.name = r.apodo || TIPOS[r.tipo]?.nombre || "";
      chart.appendChild(d);
      dots.set(r.id, d);
    }
    const p = posicion(r);
    d.style.left = p.left + "%";
    d.style.top = p.top + "%";
  }
  $("count").textContent = filas.length;
  const n = Math.max(1, filas.length);
  const ct = { T: 0, E: 0, S: 0, A: 0 };
  const cm = {};
  filas.forEach((r) => { ct[r.tipo] = (ct[r.tipo] || 0) + 1; cm[r.mundo] = (cm[r.mundo] || 0) + 1; });
  $("tipos").innerHTML = ["T", "E", "S", "A"].map((k) => `
    <div class="hbar"><img src="${TIPOS[k].icono}" alt=""><span>${TIPOS[k].nombre}</span>
      <div class="track"><div class="fill" style="width:${(ct[k] / n) * 100}%;background:${TIPOS[k].color}"></div></div>
      <span class="n">${ct[k]}</span></div>`).join("");
  const mundos = Object.keys(MUNDOS).filter((k) => cm[k]).sort((a, b) => cm[b] - cm[a]);
  $("mundos").innerHTML = mundos.length ? mundos.map((k) => `
    <div class="hbar"><img src="${MUNDOS[k].icono}" alt=""><span>${MUNDOS[k].nombre}</span>
      <div class="track"><div class="fill" style="width:${(cm[k] / n) * 100}%;background:var(--plum)"></div></div>
      <span class="n">${cm[k]}</span></div>`).join("") : '<p class="small">Aún nadie…</p>';
}

async function recargar() {
  try {
    filas = await leer(sala);
    dibujar();
    $("status").textContent = MODE === "demo" ? "MODO DEMO · SOLO ESTE NAVEGADOR" : "EN VIVO · " + new Date().toLocaleTimeString();
  } catch (e) {
    $("status").textContent = "ERROR AL LEER: REVISA config.js";
  }
}

await recargar();
await escuchar(sala, (fila) => {
  if (fila && !filas.some((r) => r.id === fila.id)) {
    filas.push(fila);
    dibujar(fila.id);
    $("status").textContent = "EN VIVO · " + new Date().toLocaleTimeString();
  } else if (!fila) {
    recargar();
  }
});
// respaldo por si el tiempo real se cae
setInterval(recargar, MODE === "demo" ? 3000 : 8000);
