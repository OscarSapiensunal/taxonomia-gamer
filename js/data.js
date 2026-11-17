// Preguntas propias del equipo. Estructura inspirada en el método de Andreasen & Downey:
// cada pregunta enfrenta a dos tipos de Bartle; los 6 pares aparecen 3 veces (18 preguntas),
// así que cada tipo aparece 9 veces. Puntaje de un tipo = veces elegido / 9.

export const TIPOS = {
  T: { nombre: "TRIUNFADOR", palo: "DIAMANTES", icono: "img/diamante.png", sprite: "img/sapo_dorado.png",
       personaje: "El Sapo Dorado", color: "var(--T)",
       frase: "Puntos, niveles, tesoros. Tú no juegas: completas.",
       detalle: "Actúas sobre el mundo: te mueve dominar el juego y tener pruebas de que lo lograste." },
  E: { nombre: "EXPLORADOR", palo: "PICAS", icono: "img/pica.png", sprite: "img/sapo.png",
       personaje: "El Sapo Rolo", color: "var(--E)",
       frase: "Si hay un rincón sin mapear, ahí estás tú.",
       detalle: "Interactúas con el mundo: quieres entender cómo funciona por dentro y encontrar sus secretos." },
  S: { nombre: "SOCIALIZADOR", palo: "CORAZONES", icono: "img/corazon.png", sprite: "img/talcual.png",
       personaje: "El Tal cual", color: "var(--S)",
       frase: "El juego es la excusa; el parche es lo importante.",
       detalle: "Interactúas con jugadores: lo que te engancha es la gente con la que juegas." },
  A: { nombre: "ASESINO", palo: "TRÉBOLES", icono: "img/trebol.png", sprite: "img/taxi.png",
       personaje: "El Taxista: «yo por allá no voy»", color: "var(--A)",
       frase: "Otros juegan contra la máquina. Tú, contra ellos.",
       detalle: "Actúas sobre jugadores: disfrutas medirte e imponerte sobre personas reales." },
};

export const PREGUNTAS = [
  // T vs E
  { q: "Llegas a un mapa nuevo.", o: [["T", "Voy directo a la misión principal: hay que subir de nivel."], ["E", "Me pierdo por los rincones a ver qué hay escondido."]] },
  { q: "Encuentras una puerta cerrada que no sale en ninguna guía.", o: [["T", "Sigo de largo: no da puntos."], ["E", "No me muevo de ahí hasta saber cómo se abre."]] },
  { q: "Terminaste el juego al 100 %. ¿Qué te da más orgullo?", o: [["T", "Los logros y el trofeo de platino."], ["E", "Los secretos que casi nadie conoce."]] },
  // T vs S
  { q: "Tu clan arma parche el viernes por la noche.", o: [["T", "Voy si hay recompensas dobles."], ["S", "Voy así no haya nada: es por el parche."]] },
  { q: "Acabas de subir de rango.", o: [["T", "Pantallazo para mi colección."], ["S", "Lo cuento en el grupo y celebramos todos."]] },
  { q: "Prefieres que te recuerden como…", o: [["T", "El del mejor equipo del servidor."], ["S", "El que conoce a todo el mundo."]] },
  // T vs A
  { q: "Aparece un jefe difícil.", o: [["T", "Lo farmeo hasta sacarle el botín raro."], ["A", "Prefiero un duelo contra alguien de verdad."]] },
  { q: "Sale el ranking semanal.", o: [["T", "Quiero el top por puntos."], ["A", "Quiero que el top sepa quién lo bajó."]] },
  { q: "Modo de juego favorito.", o: [["T", "Misiones con progreso claro."], ["A", "Todos contra todos."]] },
  // E vs S
  { q: "Entras a la taberna del juego.", o: [["E", "Leo los carteles y el lore."], ["S", "Me pongo a hablar con quien esté."]] },
  { q: "Descubres un bug rarísimo del mapa.", o: [["E", "Lo pruebo hasta entender por qué pasa."], ["S", "Llamo a los parceros para que lo vean."]] },
  { q: "Un jugador nuevo te pide ayuda.", o: [["E", "Le muestro mis rutas secretas."], ["S", "Me vuelvo su parcero y jugamos toda la tarde."]] },
  // E vs A
  { q: "Mapa abierto y sin misiones.", o: [["E", "Paraíso: a explorar."], ["A", "Aburrido si no hay a quién enfrentar."]] },
  { q: "Conoces un atajo que nadie más sabe.", o: [["E", "Me lo guardo: me encanta saberlo."], ["A", "Lo uso para emboscar a los demás."]] },
  { q: "Lo que más disfrutas de un juego nuevo.", o: [["E", "Entender cómo funciona por dentro."], ["A", "Probarme contra otros jugadores."]] },
  // S vs A
  { q: "Te cruzas con otro jugador en el camino.", o: [["S", "Saludo y le pregunto de dónde es."], ["A", "Lo reto a duelo."]] },
  { q: "Chat de voz en la partida.", o: [["S", "Lo mejor del juego."], ["A", "Perfecto para echarle cizaña al rival."]] },
  { q: "Perdiste la partida.", o: [["S", "Igual me reí un montón."], ["A", "Revancha. Ya."]] },
];

// 9 géneros interactivos de Mejías-Climent (2021)
export const MUNDOS = {
  COMBATE: { nombre: "COMBATE", icono: "img/espadas.png", desc: "Reflejos, ataque y defensa." },
  AVENTURA: { nombre: "AVENTURA", icono: "img/llave.png", desc: "Explorar, resolver y seguir una historia." },
  CARRERAS: { nombre: "CARRERAS", icono: "img/carro.png", desc: "Velocidad y coordinación." },
  PUZLES: { nombre: "PUZLES", icono: "img/tetris.png", desc: "Pensamiento lógico y espacial." },
  SIMULACION: { nombre: "SIMULACIÓN", icono: "img/avion.png", desc: "Manejar un mundo como si fuera real." },
  ESTRATEGIA: { nombre: "ESTRATEGIA", icono: "img/torre.png", desc: "Táctica, análisis y planes a largo plazo." },
  RITMO: { nombre: "RITMO", icono: "img/nota.png", desc: "Destreza musical o corporal." },
  DIDACTICOS: { nombre: "DIDÁCTICOS", icono: "img/libro.png", desc: "Jugar para aprender algo." },
  CONCURSOS: { nombre: "CONCURSOS Y AZAR", icono: "img/dado.png", desc: "Saber de todo y tentar a la suerte." },
};

export const PREG_MUNDO = [
  { q: "Un sábado ideal dentro de un juego:", o: [
    [["COMBATE"], "Pelear contra un jefe imposible."],
    [["PUZLES"], "Resolver un acertijo que nadie ha podido."],
    [["CARRERAS"], "Bajar mi récord en una pista."],
    [["RITMO"], "Bailar o cantar sin fallar una nota."]] },
  { q: "¿Cuál es tu destreza?", o: [
    [["ESTRATEGIA"], "Planear la jugada cinco turnos antes."],
    [["AVENTURA"], "Explorar e investigar hasta el final."],
    [["SIMULACION"], "Administrar recursos como en la vida real."],
    [["CONCURSOS"], "Saber datos raros y tener buena suerte."]] },
  { q: "¿Qué te quieres llevar de un juego?", o: [
    [["COMBATE", "CARRERAS"], "Adrenalina pura."],
    [["AVENTURA"], "Una historia que no se me olvide."],
    [["DIDACTICOS"], "Aprender algo de verdad."],
    [["PUZLES", "ESTRATEGIA"], "Ganarle a la lógica."]] },
];
