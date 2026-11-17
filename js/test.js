import { TIPOS, PREGUNTAS, MUNDOS, PREG_MUNDO } from "./data.js";
import { guardar, salaActual, MODE } from "./store.js";

const $ = (id) => document.getElementById(id);
const screens = ["sStart", "sQ", "sR"];
function show(id) {
  screens.forEach((s) => $(s).classList.toggle("on", s === id));
  scrollTo({ top: 0 });
}

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

let preguntas = [];
let idx = 0;
let pts = { T: 0, E: 0, S: 0, A: 0 };
let mundoPts = {};

function buildQueue() {
  const bartle = shuffle(PREGUNTAS).map((p) => ({ kind: "b", q: p.q, o: shuffle(p.o) }));
  const mundo = PREG_MUNDO.map((p) => ({ kind: "m", q: p.q, o: shuffle(p.o) }));
  // las de "mundo" van intercaladas al final para variar el ritmo
  return [...bartle.slice(0, 12), mundo[0], ...bartle.slice(12, 15), mundo[1], ...bartle.slice(15), mundo[2]];
}

function renderProgress() {
  $("prog").innerHTML = preguntas.map((_, i) => `<span class="${i < idx ? "done" : ""}"></span>`).join("");
  $("hudScore").textContent = "×" + String(idx).padStart(2, "0");
}

function renderQ() {
  const p = preguntas[idx];
  renderProgress();
  $("qnum").textContent = `PREGUNTA ${idx + 1}/${preguntas.length}`;
  $("qtext").textContent = p.q;
  const keys = ["A", "B", "C", "D"];
  $("opts").innerHTML = "";
  p.o.forEach((op, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.innerHTML = `<span class="key">${keys[i]}</span><span></span>`;
    b.lastChild.textContent = op[1];
    b.addEventListener("click", () => answer(op[0]));
    $("opts").appendChild(b);
  });
  $("opts").firstChild.focus({ preventScroll: true });
}

function answer(tag) {
  const p = preguntas[idx];
  if (p.kind === "b") pts[tag] += 1;
  else tag.forEach((g) => (mundoPts[g] = (mundoPts[g] || 0) + 1));
  idx += 1;
  if (idx < preguntas.length) renderQ();
  else finish();
}

addEventListener("keydown", (e) => {
  if (!$("sQ").classList.contains("on")) return;
  const k = e.key.toUpperCase();
  const i = { A: 0, B: 1, C: 2, D: 3, 1: 0, 2: 1, 3: 2, 4: 3 }[k];
  const btns = $("opts").querySelectorAll(".opt");
  if (i !== undefined && btns[i]) btns[i].click();
});

async function finish() {
  renderProgress();
  const order = ["T", "E", "S", "A"];
  // tipo principal: el de más puntos; empate → al azar entre los empatados
  const max = Math.max(...order.map((k) => pts[k]));
  const tops = order.filter((k) => pts[k] === max);
  const tipo = tops[Math.floor(Math.random() * tops.length)];
  const mmax = Math.max(...Object.values(mundoPts));
  const mtops = Object.keys(mundoPts).filter((k) => mundoPts[k] === mmax);
  const mundo = mtops[Math.floor(Math.random() * mtops.length)];

  const T = TIPOS[tipo];
  $("rSprite").src = T.sprite;
  $("rSprite").alt = T.personaje;
  $("rType").textContent = `${T.nombre}`;
  $("rType").style.color = T.color;
  $("rWho").textContent = `${T.palo} · ${T.personaje}`;
  $("rQuote").textContent = T.frase;
  $("rDetail").textContent = T.detalle;
  $("rBars").innerHTML = order.map((k) => {
    const pct = Math.round((pts[k] / 9) * 100);
    return `<div class="bar"><img src="${TIPOS[k].icono}" alt="${TIPOS[k].nombre}">
      <div class="track"><div class="fill" data-w="${pct}" style="background:${TIPOS[k].color}"></div></div>
      <span class="pct">${pct}%</span></div>`;
  }).join("");
  const M = MUNDOS[mundo];
  $("mIcon").src = M.icono;
  $("mIcon").alt = M.nombre;
  $("mName").textContent = M.nombre;
  $("mDesc").textContent = M.desc;
  show("sR");
  requestAnimationFrame(() => document.querySelectorAll(".bar .fill").forEach((f) => (f.style.width = f.dataset.w + "%")));

  const apodo = $("apodo").value.trim().replace(/\s+/g, " ").slice(0, 20) || null;
  const sala = salaActual();
  $("saved").textContent = "GUARDANDO…";
  try {
    const r = await guardar({ sala, t: pts.T, e: pts.E, s: pts.S, a: pts.A, tipo, mundo, apodo });
    $("saved").textContent = r.ok
      ? (MODE === "demo" ? "MODO DEMO: GUARDADO SOLO EN ESTE NAVEGADOR" : `¡LISTO! YA SALES EN LA PANTALLA (SALA ${sala.toUpperCase()})`)
      : "NO SE PUDO GUARDAR, PERO TU RESULTADO ES ESTE :)";
  } catch {
    $("saved").textContent = "SIN CONEXIÓN: TU RESULTADO ES ESTE :)";
  }
}

function start() {
  preguntas = buildQueue();
  idx = 0;
  pts = { T: 0, E: 0, S: 0, A: 0 };
  mundoPts = {};
  show("sQ");
  renderQ();
}

$("go").addEventListener("click", start);
$("again").addEventListener("click", () => show("sStart"));
$("ptag").textContent = "P1";
