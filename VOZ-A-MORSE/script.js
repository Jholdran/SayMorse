// ==========================================================
//  SAYMORSE - script.js
//  Voz/Texto ⇄ Morse, con sonido, luz, tono, diccionario,
//  modo noche, dos idiomas (Español Latinoamérica / English),
//  conexión Bluetooth con Arduino (LED y zumbador)
//  y COLOR GUÍA que muestra por dónde va la transmisión
// ==========================================================

// ---------- TEXTOS EN CADA IDIOMA ----------
// Para agregar o cambiar un texto, edítalo aquí.
const TEXTOS = {
  es: {
    titulo: "SayMorse — Tu voz en puntos y rayas",
    descripcion: "SayMorse: habla o escribe y convierte tu mensaje a código Morse, o traduce Morse a texto. Con sonido y luz.",
    subtitulo: "Tu voz en puntos y rayas",
    pie: "SayMorse · Tu voz en puntos y rayas",

    // Tema (día / noche)
    temaNoche: "Noche",
    temaDia: "Día",
    ariaIrNoche: "Cambiar a modo noche",
    ariaIrDia: "Cambiar a modo día",

    // Entrada
    tuMensaje: "Tu mensaje",
    tuMorse: "Tu Morse",
    borrarTodo: "Borrar todo",
    placeholderTexto: "Habla con el micrófono o escribe aquí tu mensaje...",
    placeholderMorse: "Escribe puntos y rayas. Ej: .... --- .-.. .-  /  -- ..- -. -.. ---",
    ayudaEntrada: "Usa puntos (.), rayas (-), un espacio entre letras y una barra / entre palabras.",

    // Voz
    dictar: "🎤 Dictar",
    detener: "⏹ Detener",
    estado_apagado: "Micrófono apagado",
    estado_escuchando: "Escuchando...",
    estado_permiso: "Permiso de micrófono denegado.",
    estado_sinmicro: "No se encontró ningún micrófono.",
    estado_red: "Error de red. Revisa tu conexión.",
    estado_sinsoporte: "Dictado no disponible aquí (usa Chrome o Edge). Puedes escribir.",

    // Teclado Morse
    punto: "punto",
    raya: "raya",
    letra: "letra",
    palabra: "palabra",
    borrar: "borrar",
    ariaPunto: "Punto",
    ariaRaya: "Raya",
    ariaLetra: "Espacio entre letras",
    ariaPalabra: "Separador de palabras",
    ariaBorrar: "Borrar un carácter",

    // Invertir
    chipTexto: "Texto",
    chipMorse: "Morse",
    invertir: "Invertir dirección",
    invertirAria: "Invertir dirección de la traducción",

    // Salida
    codigoMorse: "Código Morse",
    textoTraducido: "Texto traducido",
    vacioMorse: "El Morse aparecerá aquí...",
    vacioTexto: "El texto aparecerá aquí...",
    luzTitulo: "Luz del telégrafo",
    transmitir: "▶ Transmitir",
    parar: "⏹ Parar",
    copiarMorse: "📋 Copiar Morse",
    copiarTexto: "📋 Copiar texto",
    copiado: "✅ ¡Copiado!",
    noCopio: "No se pudo copiar",

    // Leyenda del color guía
    leyPendiente: "Por sonar",
    leyAhora: "Sonando ahora",
    leyHecho: "Ya sonó",

    // Ajustes
    ajustesSonido: "Ajustes de sonido",
    velocidad: "⏱ Velocidad:",
    ppm: "ppm",
    tono: "🎵 Tono:",
    grave: "Grave",
    agudo: "Agudo",
    sonidoActivado: "🔊 Sonido activado",

    // Arduino (Bluetooth)
    arduinoTitulo: "Conexión con Arduino (Bluetooth)",
    arduinoAyuda: "Conecta tu módulo Bluetooth para que el LED y el zumbador del Arduino se enciendan y suenen igual que la luz de la página.",
    arduinoModulo: "Módulo",
    optBle: "BLE (HM-10, AT-09, JDY-08)",
    optSerial: "Clásico (HC-05, HC-06): solo computador",
    arduinoConectar: "🔌 Conectar Arduino",
    arduinoDesconectar: "⏏ Desconectar",
    arduinoProbar: "💡 Probar",
    arduino_desconectado: "Arduino desconectado",
    arduino_conectando: "Conectando...",
    arduino_conectado: "Conectado a ",
    arduino_cancelado: "Conexión cancelada.",
    arduino_error: "No se pudo conectar. Revisa el módulo e inténtalo de nuevo.",
    arduino_servicio: "Ese dispositivo no es un módulo BLE compatible (servicio FFE0).",
    arduino_perdido: "Se perdió la conexión con el Arduino.",
    arduino_nosoporte: "Tu navegador no permite Bluetooth. Usa Chrome o Edge.",

    // Diccionario
    diccionario: "Diccionario Morse",
    tocaLetra: "Toca una letra o un número para oírlo.",
    letras: "Letras",
    numeros: "Números",
    nota: "Un punto dura una unidad y una raya, tres. Entre las señales de una misma letra hay una unidad de silencio, tres entre letras y siete entre palabras. Las tildes se transmiten sin acento y la Ñ tiene su propio código (--.--)."
  },

  en: {
    titulo: "SayMorse — Your voice in dots and dashes",
    descripcion: "SayMorse: speak or type your message and convert it to Morse code, or translate Morse back to text. With sound and light.",
    subtitulo: "Your voice in dots and dashes",
    pie: "SayMorse · Your voice in dots and dashes",

    temaNoche: "Night",
    temaDia: "Day",
    ariaIrNoche: "Switch to night mode",
    ariaIrDia: "Switch to day mode",

    tuMensaje: "Your message",
    tuMorse: "Your Morse",
    borrarTodo: "Clear all",
    placeholderTexto: "Speak into the microphone or type your message here...",
    placeholderMorse: "Type dots and dashes. E.g.: .... . .-.. .-.. ---  /  .-- --- .-. .-.. -..",
    ayudaEntrada: "Use dots (.), dashes (-), a space between letters and a slash / between words.",

    dictar: "🎤 Dictate",
    detener: "⏹ Stop",
    estado_apagado: "Microphone off",
    estado_escuchando: "Listening...",
    estado_permiso: "Microphone permission denied.",
    estado_sinmicro: "No microphone found.",
    estado_red: "Network error. Check your connection.",
    estado_sinsoporte: "Dictation isn't available here (use Chrome or Edge). You can still type.",

    punto: "dot",
    raya: "dash",
    letra: "letter",
    palabra: "word",
    borrar: "delete",
    ariaPunto: "Dot",
    ariaRaya: "Dash",
    ariaLetra: "Space between letters",
    ariaPalabra: "Word separator",
    ariaBorrar: "Delete one character",

    chipTexto: "Text",
    chipMorse: "Morse",
    invertir: "Swap direction",
    invertirAria: "Swap translation direction",

    codigoMorse: "Morse code",
    textoTraducido: "Translated text",
    vacioMorse: "The Morse will appear here...",
    vacioTexto: "The text will appear here...",
    luzTitulo: "Telegraph light",
    transmitir: "▶ Transmit",
    parar: "⏹ Stop",
    copiarMorse: "📋 Copy Morse",
    copiarTexto: "📋 Copy text",
    copiado: "✅ Copied!",
    noCopio: "Couldn't copy",

    leyPendiente: "To play",
    leyAhora: "Playing now",
    leyHecho: "Already played",

    ajustesSonido: "Sound settings",
    velocidad: "⏱ Speed:",
    ppm: "wpm",
    tono: "🎵 Pitch:",
    grave: "Low",
    agudo: "High",
    sonidoActivado: "🔊 Sound on",

    arduinoTitulo: "Arduino connection (Bluetooth)",
    arduinoAyuda: "Connect your Bluetooth module so the Arduino's LED and buzzer turn on and sound just like the light on the page.",
    arduinoModulo: "Module",
    optBle: "BLE (HM-10, AT-09, JDY-08)",
    optSerial: "Classic (HC-05, HC-06): computer only",
    arduinoConectar: "🔌 Connect Arduino",
    arduinoDesconectar: "⏏ Disconnect",
    arduinoProbar: "💡 Test",
    arduino_desconectado: "Arduino disconnected",
    arduino_conectando: "Connecting...",
    arduino_conectado: "Connected to ",
    arduino_cancelado: "Connection cancelled.",
    arduino_error: "Couldn't connect. Check the module and try again.",
    arduino_servicio: "That device isn't a compatible BLE module (FFE0 service).",
    arduino_perdido: "The connection to the Arduino was lost.",
    arduino_nosoporte: "Your browser doesn't support Bluetooth. Use Chrome or Edge.",

    diccionario: "Morse dictionary",
    tocaLetra: "Tap a letter or a number to hear it.",
    letras: "Letters",
    numeros: "Numbers",
    nota: "A dot lasts one unit and a dash lasts three. Within a letter there is one unit of silence between signals, three between letters and seven between words. Accents are sent without the accent mark, and Ñ has its own code (--.--)."
  }
};

// Idioma de la página: "es" (principal) o "en"
let idiomaPagina = "es";

// Devuelve el texto en el idioma actual
function t(clave) {
  return TEXTOS[idiomaPagina][clave] || TEXTOS.es[clave] || clave;
}

// ---------- DICCIONARIO MORSE ----------
const MORSE = {
  // Letras
  "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",   "E": ".",
  "F": "..-.",  "G": "--.",   "H": "....",  "I": "..",    "J": ".---",
  "K": "-.-",   "L": ".-..",  "M": "--",    "N": "-.",    "Ñ": "--.--",
  "O": "---",   "P": ".--.",  "Q": "--.-",  "R": ".-.",   "S": "...",
  "T": "-",     "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
  "Y": "-.--",  "Z": "--..",

  // Números
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",

  // Signos de puntuación
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--",
  "'": ".----.", "\"": ".-..-.", "(": "-.--.",  ")": "-.--.-",
  ":": "---...", ";": "-.-.-.", "=": "-...-",  "+": ".-.-.",
  "-": "-....-", "@": ".--.-."
};

// Diccionario al revés: de ".-" a "A"
const INVERSO = {};
for (const caracter in MORSE) {
  INVERSO[MORSE[caracter]] = caracter;
}

// ---------- REFERENCIAS A LOS ELEMENTOS DE LA PÁGINA ----------
const boton = document.getElementById("btn-micro");
const indicador = document.getElementById("indicador");
const textoEstado = document.getElementById("texto-estado");
const panelVoz = document.getElementById("panel-voz");

const mensaje = document.getElementById("mensaje");
const btnBorrar = document.getElementById("btn-borrar");
const tituloEntrada = document.getElementById("titulo-entrada");
const ayudaEntrada = document.getElementById("ayuda-entrada");

const panelTeclado = document.getElementById("panel-teclado");
const btnPunto = document.getElementById("btn-punto");
const btnRaya = document.getElementById("btn-raya");
const btnLetra = document.getElementById("btn-letra");
const btnPalabra = document.getElementById("btn-palabra");
const btnRetroceso = document.getElementById("btn-retroceso");

const btnInvertir = document.getElementById("btn-invertir");
const chipOrigen = document.getElementById("chip-origen");
const chipDestino = document.getElementById("chip-destino");

const cajaSalida = document.getElementById("caja-salida");
const tituloSalida = document.getElementById("titulo-salida");
const resultado = document.getElementById("resultado");
const barraProgreso = document.getElementById("barra-progreso");
const luz = document.getElementById("luz-morse");
const btnTransmitir = document.getElementById("btn-transmitir");
const btnCopiar = document.getElementById("btn-copiar");

const chkSonido = document.getElementById("chk-sonido");
const sliderVelocidad = document.getElementById("velocidad");
const valorVelocidad = document.getElementById("valor-velocidad");
const sliderTono = document.getElementById("tono");
const valorTono = document.getElementById("valor-tono");

const btnTema = document.getElementById("btn-tema");
const btnEs = document.getElementById("btn-es");
const btnEn = document.getElementById("btn-en");

const btnArduino = document.getElementById("btn-arduino");
const btnArduinoPrueba = document.getElementById("btn-arduino-prueba");
const luzArduino = document.getElementById("luz-arduino");
const textoArduino = document.getElementById("texto-arduino");
const selectBluetooth = document.getElementById("tipo-bluetooth");

const metaTema = document.querySelector('meta[name="theme-color"]');
const metaDescripcion = document.querySelector('meta[name="description"]');

// ---------- ESTADO ----------
// "texto" = Texto → Morse   |   "morse" = Morse → Texto
let modo = "texto";

// Función que apaga el dictado (la define iniciarApp más abajo)
let detenerDictado = null;

// Función que cambia el idioma del dictado (la define iniciarApp más abajo)
let cambiarIdiomaDictado = null;

// Estado del micrófono: apagado | escuchando | permiso | sinmicro | red | sinsoporte
let estadoMicro = "apagado";

// Pinta el botón y el mensaje del micrófono en el idioma actual
function refrescarMicro() {
  const escuchando = estadoMicro === "escuchando";
  boton.classList.toggle("activo", escuchando);
  indicador.classList.toggle("escuchando", escuchando);
  boton.textContent = escuchando ? t("detener") : t("dictar");
  textoEstado.textContent = t("estado_" + estadoMicro);
}

// ---------- MODO DÍA / NOCHE ----------
function temaActual() {
  return document.documentElement.getAttribute("data-tema") === "noche" ? "noche" : "dia";
}

// Aplica el tema; si "guardar" es true, recuerda la elección
function aplicarTema(tema, guardar) {
  const esNoche = tema === "noche";

  document.documentElement.setAttribute("data-tema", tema);

  // El botón muestra a qué modo se puede cambiar
  btnTema.querySelector(".tema-icono").textContent = esNoche ? "☀️" : "🌙";
  btnTema.querySelector(".tema-texto").textContent = esNoche ? t("temaDia") : t("temaNoche");
  btnTema.setAttribute(
    "aria-label",
    esNoche ? t("ariaIrDia") : t("ariaIrNoche")
  );

  // Color de la barra del navegador en el celular
  if (metaTema) {
    metaTema.setAttribute("content", esNoche ? "#0d1526" : "#f7f0e1");
  }

  if (guardar) {
    try {
      localStorage.setItem("saymorse-tema", tema);
    } catch (error) {
      // si el navegador no deja guardar, no pasa nada
    }
  }
}

btnTema.addEventListener("click", () => {
  aplicarTema(temaActual() === "noche" ? "dia" : "noche", true);
});

// ---------- IDIOMA DE LA PÁGINA (ES / EN) ----------
function aplicarIdioma(idioma, guardar) {
  idiomaPagina = idioma === "en" ? "en" : "es";

  document.documentElement.lang = idiomaPagina === "en" ? "en" : "es-419";
  document.title = t("titulo");
  if (metaDescripcion) metaDescripcion.setAttribute("content", t("descripcion"));

  // Textos fijos marcados en el HTML
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // Selector ES | EN: se marca el idioma activo
  btnEs.setAttribute("aria-pressed", idiomaPagina === "es" ? "true" : "false");
  btnEn.setAttribute("aria-pressed", idiomaPagina === "en" ? "true" : "false");

  // El idioma del dictado es el mismo de la página
  if (cambiarIdiomaDictado) cambiarIdiomaDictado();

  // Textos que cambian según el estado de la app
  aplicarTema(temaActual(), false);
  refrescarMicro();
  refrescarArduino();
  etiquetaTransmitir(reproduciendo);
  aplicarModo();

  if (guardar) {
    try {
      localStorage.setItem("saymorse-idioma", idiomaPagina);
    } catch (error) {
      // si el navegador no deja guardar, no pasa nada
    }
  }
}

btnEs.addEventListener("click", () => aplicarIdioma("es", true));
btnEn.addEventListener("click", () => aplicarIdioma("en", true));

// Idioma que usa el micrófono: español latinoamericano o inglés
function idiomaDictado() {
  return idiomaPagina === "en" ? "en-US" : "es-419";
}

// Idioma guardado (si no hay ninguno, la página arranca en español)
function idiomaInicial() {
  try {
    const guardado = localStorage.getItem("saymorse-idioma");
    if (guardado === "en" || guardado === "es") return guardado;
  } catch (error) {
    // sin almacenamiento: usamos español
  }
  return "es";
}

// ---------- TRADUCCIÓN: TEXTO → MORSE ----------

// Pasa a mayúsculas y quita las tildes (á → A), pero conserva la Ñ
function limpiarTexto(texto) {
  return texto
    .toUpperCase()
    .replace(/Ñ/g, "#")                 // protegemos la Ñ temporalmente
    .normalize("NFD")                   // separa las letras de sus tildes
    .replace(/[\u0300-\u036f]/g, "")    // elimina las tildes
    .replace(/#/g, "Ñ");                // devolvemos la Ñ
}

function textoAMorse(texto) {
  const limpio = limpiarTexto(texto);

  return limpio
    .split(/\s+/)                       // separa en palabras
    .filter((palabra) => palabra.length > 0)
    .map((palabra) =>
      palabra
        .split("")                      // separa en caracteres
        .map((caracter) => MORSE[caracter])
        .filter(Boolean)                // descarta lo que no está en el diccionario
        .join(" ")                      // espacio entre letras
    )
    .filter((palabra) => palabra.length > 0)
    .join(" / ");                       // " / " entre palabras
}

// ---------- TRADUCCIÓN: MORSE → TEXTO ----------

// Acepta variantes de símbolos y descarta todo lo que no sea Morse
function limpiarMorse(texto) {
  return texto
    .replace(/[•·]/g, ".")              // puntos "bonitos" → .
    .replace(/[—–−_]/g, "-")            // rayas "bonitas" → -
    .replace(/[^.\-\/\s]/g, "");        // quita cualquier otro carácter
}

// Deja el Morse escrito listo para sonar
function morseParaReproducir(texto) {
  return limpiarMorse(texto)
    .replace(/\s{3,}/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
}

// Divide un Morse limpio en palabras y letras, recordando en qué posición
// de la cadena empieza y termina cada letra (sirve para el color guía)
function modeloMorse(morse) {
  const palabras = [];
  let actual = [];
  const buscador = /[.\-]+|\//g;
  let coincidencia;

  while ((coincidencia = buscador.exec(morse)) !== null) {
    if (coincidencia[0] === "/") {
      if (actual.length) {
        palabras.push(actual);
        actual = [];
      }
    } else {
      actual.push({
        codigo: coincidencia[0],
        ini: coincidencia.index,
        fin: coincidencia.index + coincidencia[0].length - 1
      });
    }
  }
  if (actual.length) palabras.push(actual);

  return palabras;
}

// ---------- COLOR GUÍA (por dónde va la transmisión) ----------
// pos = posición del símbolo que suena dentro del Morse mostrado
//   (un número entero = sonando ahora; con ,5 = ese símbolo ya terminó)
const progreso = { activo: false, pos: -1 };

// El Morse que se está mostrando ahora (o el que se va a reproducir)
let morseActual = "";

// Dibuja el resultado en pantalla, con cada punto/raya (o cada letra) como pieza
// separada para poder pintarla. Devuelve el Morse que sonaría.
function pintarResultado() {
  const esTexto = modo === "texto";
  const fragmento = document.createDocumentFragment();
  let morse;

  if (esTexto) {
    morse = textoAMorse(mensaje.value);

    for (let i = 0; i < morse.length; i++) {
      const c = morse[i];
      if (c === "." || c === "-") {
        const pieza = document.createElement("span");
        pieza.className = "sim";
        pieza.dataset.ini = i;
        pieza.dataset.fin = i;
        pieza.textContent = c;
        fragmento.appendChild(pieza);
      } else {
        fragmento.appendChild(document.createTextNode(c));
      }
    }
  } else {
    morse = morseParaReproducir(mensaje.value);
    const palabras = modeloMorse(morse);

    palabras.forEach((palabra, n) => {
      if (n > 0) fragmento.appendChild(document.createTextNode(" "));

      palabra.forEach((letra) => {
        const pieza = document.createElement("span");
        pieza.className = "let";
        pieza.dataset.ini = letra.ini;
        pieza.dataset.fin = letra.fin;
        pieza.textContent = INVERSO[letra.codigo] || "?";
        fragmento.appendChild(pieza);
      });
    });
  }

  resultado.replaceChildren(fragmento);
  morseActual = morse;
  pintarProgreso();
  return morse;
}

// Aplica los colores: verde = ya sonó, naranja = sonando ahora, azul = por sonar
function pintarProgreso() {
  const piezas = resultado.querySelectorAll(".sim, .let");
  let piezaActual = null;

  piezas.forEach((pieza) => {
    let hecho = false;
    let ahora = false;

    if (progreso.activo) {
      const ini = Number(pieza.dataset.ini);
      const fin = Number(pieza.dataset.fin);
      if (fin < progreso.pos) {
        hecho = true;
      } else if (ini <= progreso.pos) {
        ahora = true;
      }
    }

    pieza.classList.toggle("hecho", hecho);
    pieza.classList.toggle("ahora", ahora);
    if (ahora) piezaActual = pieza;
  });

  // Barra de progreso
  let porcentaje = 0;
  if (progreso.activo && morseActual.length > 0) {
    porcentaje = Math.min(100, ((progreso.pos + 1) / morseActual.length) * 100);
  }
  barraProgreso.style.width = porcentaje + "%";

  // Si lo que suena quedó fuera de la pantalla, la página baja o sube sola
  if (piezaActual) {
    const caja = piezaActual.getBoundingClientRect();
    if (caja.top < 0 || caja.bottom > window.innerHeight) {
      piezaActual.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }
}

// Ficha del diccionario que está sonando (se ilumina)
let fichaActiva = null;

function limpiarFicha() {
  if (fichaActiva) {
    fichaActiva.classList.remove("sonando");
    fichaActiva = null;
  }
}

// Quita todos los colores guía y deja la barra en cero
function limpiarProgreso() {
  progreso.activo = false;
  progreso.pos = -1;
  limpiarFicha();
  pintarProgreso();
}

// ---------- AUDIO (Web Audio API) ----------
let audioCtx = null;
let oscilador = null;
let ganancia = null;

// Crea el sistema de audio (debe hacerse tras un clic del usuario)
function prepararAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    oscilador = audioCtx.createOscillator();
    oscilador.type = "sine";
    oscilador.frequency.value = Number(sliderTono.value);

    ganancia = audioCtx.createGain();
    ganancia.gain.value = 0; // empieza en silencio

    oscilador.connect(ganancia);
    ganancia.connect(audioCtx.destination);
    oscilador.start();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

// Enciende o apaga el pitido (con una transición mínima para evitar "clics")
function sonar(encendido) {
  if (!audioCtx || !chkSonido.checked) return;
  const volumen = encendido ? 0.4 : 0;
  ganancia.gain.setTargetAtTime(volumen, audioCtx.currentTime, 0.005);
}

// ---------- REPRODUCCIÓN DEL MORSE ----------
// Cada elemento de la cola es { morse, desde, ficha }:
//   morse = lo que va a sonar
//   desde = posición donde empieza dentro del Morse mostrado (-1 = no pintar)
//   ficha = (opcional) ficha del diccionario que se ilumina
const cola = [];            // frases pendientes por sonar
let reproduciendo = false;  // ¿hay algo sonando?
let generacion = 0;         // sirve para poder cancelar una reproducción

function dormir(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

// Duración de un "punto" en ms según la velocidad (1200 / palabras por minuto)
function unidad() {
  return 1200 / Number(sliderVelocidad.value);
}

function etiquetaTransmitir(activo) {
  btnTransmitir.textContent = activo ? t("parar") : t("transmitir");
  btnTransmitir.classList.toggle("activo", activo);
  cajaSalida.classList.toggle("transmitiendo", activo);
}

// Pitido + luz (y Arduino) durante "ms" milisegundos
async function emitirTono(ms, miGen) {
  encenderLuz(true);
  sonar(true);
  await dormir(ms);
  if (miGen === generacion) {
    encenderLuz(false);
    sonar(false);
  }
}

// Reproduce una cadena como ".... --- .-.. .- / -- ..-"
async function reproducirMorse(morse, miGen, desde) {
  const pintar = desde >= 0;
  if (pintar) progreso.activo = true;

  for (let k = 0; k < morse.length; k++) {
    if (miGen !== generacion) return; // alguien pulsó Parar
    const simbolo = morse[k];
    const u = unidad();

    if (simbolo === "." || simbolo === "-") {
      // Este símbolo pasa a "sonando ahora"
      if (pintar) {
        progreso.pos = desde + k;
        pintarProgreso();
      }

      await emitirTono(simbolo === "." ? u : u * 3, miGen); // punto = 1, raya = 3
      if (miGen !== generacion) return;

      // Este símbolo ya sonó
      if (pintar) {
        progreso.pos = desde + k + 0.5;
        pintarProgreso();
      }

      await dormir(u);                  // pausa entre símbolos = 1 unidad
    } else if (simbolo === " " || simbolo === "/") {
      await dormir(u * 2);              // completa pausa entre letras (3) y palabras (7)
    }
  }
}

async function reproducirCola() {
  if (reproduciendo) return;
  reproduciendo = true;
  etiquetaTransmitir(true);
  const miGen = generacion;

  while (cola.length > 0 && miGen === generacion) {
    const elemento = cola.shift();

    // Si viene de una ficha del diccionario, se ilumina mientras suena
    limpiarFicha();
    if (elemento.ficha) {
      fichaActiva = elemento.ficha;
      fichaActiva.classList.add("sonando");
    }

    await reproducirMorse(elemento.morse, miGen, elemento.desde);
    if (miGen !== generacion) break;
    await dormir(unidad() * 7); // pausa entre frases
  }

  if (miGen === generacion) {
    reproduciendo = false;
    etiquetaTransmitir(false);
    limpiarFicha();

    // Terminó todo: se marca todo como "ya sonó" y un momento después se limpia
    if (progreso.activo) {
      progreso.pos = morseActual.length;
      pintarProgreso();

      setTimeout(() => {
        if (!reproduciendo) limpiarProgreso();
      }, 1200);
    }
  }
}

// Corta todo lo que esté sonando y vacía la cola
function detenerReproduccion() {
  generacion++;
  cola.length = 0;
  reproduciendo = false;
  encenderLuz(false);
  sonar(false);
  etiquetaTransmitir(false);
  limpiarProgreso();
}

// Pitido corto para probar el tono cuando mueves el control
async function probarTono() {
  if (reproduciendo) return;
  sonar(true);
  await dormir(200);
  if (!reproduciendo) sonar(false);
}

// Suena un punto (1) o una raya (3) al pulsar el teclado Morse
async function tocarSimbolo(unidades) {
  prepararAudio();
  if (reproduciendo) return;
  await emitirTono(unidad() * unidades, generacion);
}

// ---------- MODO: TEXTO → MORSE  /  MORSE → TEXTO ----------

function etiquetaCopiar() {
  return modo === "texto" ? t("copiarMorse") : t("copiarTexto");
}

// Actualiza la traducción y muestra u oculta botones según haya contenido
function actualizarVista() {
  // Dibuja el resultado y devuelve el Morse que sonaría
  const morseParaSonar = pintarResultado();

  const hayEntrada = mensaje.value.trim().length > 0;
  btnBorrar.hidden = !hayEntrada; // la basura solo aparece si hay algo escrito

  btnTransmitir.disabled = morseParaSonar.length === 0;
  btnCopiar.disabled = resultado.textContent.length === 0;
}

// Cambia textos y paneles según la dirección elegida
function aplicarModo() {
  const esTexto = modo === "texto";

  chipOrigen.textContent = esTexto ? t("chipTexto") : t("chipMorse");
  chipDestino.textContent = esTexto ? t("chipMorse") : t("chipTexto");

  tituloEntrada.textContent = esTexto ? t("tuMensaje") : t("tuMorse");
  tituloSalida.textContent = esTexto ? t("codigoMorse") : t("textoTraducido");

  mensaje.placeholder = esTexto ? t("placeholderTexto") : t("placeholderMorse");
  mensaje.setAttribute("aria-label", esTexto ? t("tuMensaje") : t("tuMorse"));
  mensaje.classList.toggle("entrada-morse", !esTexto);

  resultado.classList.toggle("morse", esTexto);
  resultado.dataset.vacio = esTexto ? t("vacioMorse") : t("vacioTexto");

  panelVoz.hidden = !esTexto;
  panelTeclado.hidden = esTexto;
  ayudaEntrada.hidden = esTexto;

  btnCopiar.textContent = etiquetaCopiar();

  actualizarVista();
}

// ⇄ Invertir: lo que era resultado pasa a ser la entrada
btnInvertir.addEventListener("click", () => {
  detenerReproduccion();
  if (detenerDictado) detenerDictado();

  const nuevaEntrada = resultado.textContent;
  modo = modo === "texto" ? "morse" : "texto";
  mensaje.value = nuevaEntrada;

  btnInvertir.classList.toggle("girado");
  aplicarModo();
});

// ---------- CUADRO DE MENSAJE ----------

// Texto provisional (lo que el micrófono va entendiendo) mostrado dentro del cuadro
let interinoMostrado = "";

function quitarInterino() {
  if (interinoMostrado && mensaje.value.endsWith(interinoMostrado)) {
    mensaje.value = mensaje.value.slice(0, mensaje.value.length - interinoMostrado.length);
  }
  interinoMostrado = "";
}

function mostrarInterino(texto) {
  const limpio = texto.trim();
  if (!limpio) return;
  const separador = mensaje.value.trim() ? " " : "";
  interinoMostrado = separador + limpio;
  mensaje.value += interinoMostrado;
}

// Agrega una frase confirmada al final del mensaje
function agregarTexto(texto) {
  const limpio = texto.trim();
  if (!limpio) return;

  mensaje.value = mensaje.value.trim()
    ? mensaje.value.trimEnd() + " " + limpio
    : limpio;
}

// Escribir a mano también actualiza la traducción
mensaje.addEventListener("input", actualizarVista);

// 🗑️ Borrar todo
btnBorrar.addEventListener("click", () => {
  detenerReproduccion();
  interinoMostrado = "";
  mensaje.value = "";
  actualizarVista();
  if (modo === "texto") mensaje.focus();
});

// ---------- TECLADO MORSE ----------
function insertarEnMensaje(texto) {
  const inicio = mensaje.selectionStart;
  const fin = mensaje.selectionEnd;
  mensaje.setRangeText(texto, inicio, fin, "end");
  actualizarVista();
}

function retrocederEnMensaje() {
  const inicio = mensaje.selectionStart;
  const fin = mensaje.selectionEnd;

  if (inicio !== fin) {
    mensaje.setRangeText("", inicio, fin, "end");
  } else if (inicio > 0) {
    mensaje.setRangeText("", inicio - 1, inicio, "end");
  }
  actualizarVista();
}

btnPunto.addEventListener("click", () => {
  insertarEnMensaje(".");
  tocarSimbolo(1);
});

btnRaya.addEventListener("click", () => {
  insertarEnMensaje("-");
  tocarSimbolo(3);
});

btnLetra.addEventListener("click", () => insertarEnMensaje(" "));
btnPalabra.addEventListener("click", () => insertarEnMensaje(" / "));
btnRetroceso.addEventListener("click", retrocederEnMensaje);

// ---------- TRANSMITIR Y COPIAR ----------

// ▶ Transmitir / ⏹ Parar
btnTransmitir.addEventListener("click", () => {
  prepararAudio();

  if (reproduciendo) {
    detenerReproduccion();
    return;
  }

  const morse = modo === "texto"
    ? textoAMorse(mensaje.value)
    : morseParaReproducir(mensaje.value);

  if (!morse) return;

  // Se vuelve a dibujar el resultado para que el color guía empiece desde cero
  pintarResultado();

  cola.push({ morse: morse, desde: 0, ficha: null });
  reproducirCola();
});

// 📋 Copiar el resultado
btnCopiar.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(resultado.textContent);
    btnCopiar.textContent = t("copiado");
  } catch (error) {
    btnCopiar.textContent = t("noCopio");
  }
  setTimeout(() => {
    btnCopiar.textContent = etiquetaCopiar();
  }, 1500);
});

// ---------- AJUSTES ----------
sliderVelocidad.addEventListener("input", () => {
  valorVelocidad.textContent = sliderVelocidad.value;
});

sliderTono.addEventListener("input", () => {
  valorTono.textContent = sliderTono.value;
  if (oscilador) {
    oscilador.frequency.setTargetAtTime(
      Number(sliderTono.value),
      audioCtx.currentTime,
      0.01
    );
  }
});

// Al soltar el control de tono, suena un pitido corto de prueba
sliderTono.addEventListener("change", () => {
  prepararAudio();
  probarTono();
});

// ---------- DICCIONARIO ----------
function tocarCaracter(caracter, ficha) {
  prepararAudio();
  detenerReproduccion();
  // desde = -1: no pinta el resultado de arriba, solo ilumina la ficha tocada
  cola.push({ morse: MORSE[caracter], desde: -1, ficha: ficha });
  reproducirCola();
}

function llenarDiccionario(contenedor, caracteres) {
  caracteres.forEach((caracter) => {
    const ficha = document.createElement("button");
    ficha.type = "button";
    ficha.className = "ficha";
    ficha.innerHTML =
      '<span class="ficha-letra">' + caracter + "</span>" +
      '<span class="ficha-codigo">' + MORSE[caracter] + "</span>";
    ficha.addEventListener("click", () => tocarCaracter(caracter, ficha));
    contenedor.appendChild(ficha);
  });
}

function crearDiccionario() {
  llenarDiccionario(
    document.getElementById("dic-letras"),
    "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
  );
  llenarDiccionario(
    document.getElementById("dic-numeros"),
    "0123456789".split("")
  );
}

// ---------- RECONOCIMIENTO DE VOZ ----------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function iniciarApp() {
  const reconocimiento = new SpeechRecognition();
  reconocimiento.lang = idiomaDictado();
  reconocimiento.continuous = true;     // sigue escuchando sin cortarse
  reconocimiento.interimResults = true; // muestra texto mientras hablas

  let quiereEscuchar = false; // lo que decide el usuario con el botón

  // Lo usa el botón ⇄ para apagar el micrófono al cambiar de modo
  detenerDictado = () => {
    if (quiereEscuchar) {
      quiereEscuchar = false;
      reconocimiento.stop();
    }
  };

  // Al cambiar el idioma de la página (si está escuchando, se reinicia solo con el nuevo idioma)
  cambiarIdiomaDictado = () => {
    reconocimiento.lang = idiomaDictado();
    if (quiereEscuchar) {
      reconocimiento.stop();
    }
  };

  // Clic en el botón: iniciar o detener
  boton.addEventListener("click", () => {
    if (quiereEscuchar) {
      quiereEscuchar = false;
      reconocimiento.stop();
    } else {
      prepararAudio(); // el audio solo se puede crear tras un clic
      quiereEscuchar = true;
      reconocimiento.start();
    }
  });

  reconocimiento.onstart = () => {
    estadoMicro = "escuchando";
    refrescarMicro();
  };

  // Cuando llega texto reconocido: aparece dentro del cuadro de mensaje
  reconocimiento.onresult = (evento) => {
    let finales = "";
    let interino = "";

    for (let i = evento.resultIndex; i < evento.results.length; i++) {
      const transcripcion = evento.results[i][0].transcript;

      if (evento.results[i].isFinal) {
        finales += transcripcion + " ";
      } else {
        interino += transcripcion;
      }
    }

    quitarInterino(); // quita lo provisional anterior antes de poner lo nuevo

    if (finales.trim()) {
      agregarTexto(finales);

      // La frase confirmada también suena en Morse
      const morseFrase = textoAMorse(finales);
      if (morseFrase) {
        // La frase nueva queda al final del Morse mostrado: ahí empieza su color guía
        const morseTotal = textoAMorse(mensaje.value);
        const desde = morseTotal.length - morseFrase.length;

        cola.push({ morse: morseFrase, desde: desde, ficha: null });
        reproducirCola();
      }
    }

    if (interino.trim()) {
      mostrarInterino(interino);
    }

    actualizarVista();
  };

  reconocimiento.onend = () => {
    interinoMostrado = ""; // lo que haya quedado se conserva como texto normal

    if (quiereEscuchar) {
      // Chrome a veces corta solo tras un silencio: lo reiniciamos
      reconocimiento.start();
    } else {
      // Si hubo un error, se conserva su mensaje; si no, queda apagado
      if (estadoMicro === "escuchando") estadoMicro = "apagado";
      refrescarMicro();
    }
  };

  reconocimiento.onerror = (evento) => {
    console.error("Error de reconocimiento:", evento.error);

    if (evento.error === "not-allowed" || evento.error === "service-not-allowed") {
      estadoMicro = "permiso";
      quiereEscuchar = false;
    } else if (evento.error === "audio-capture") {
      estadoMicro = "sinmicro";
      quiereEscuchar = false;
    } else if (evento.error === "network") {
      estadoMicro = "red";
      quiereEscuchar = false;
    }
    refrescarMicro();
    // "no-speech" (silencio) lo ignoramos: onend lo reinicia solo
  };
}

// ---------- CONEXIÓN CON ARDUINO (BLUETOOTH) ----------
// La página envía un solo carácter cada vez que cambia la luz:
//   "1" = encender (LED + zumbador)    "0" = apagar
// Hay dos formas de conectarse, según el módulo Bluetooth:
//   • BLE (HM-10, AT-09, JDY-08): Web Bluetooth. Funciona en computador y en celular Android.
//   • Clásico (HC-05, HC-06): Web Serial. Solo computador (primero hay que emparejarlo en el sistema).

const codificador = new TextEncoder();

let conexion = null;           // { nombre, escribir(datos), cerrar() } mientras hay conexión
let cadenaEnvio = Promise.resolve(); // los envíos se hacen en fila para que lleguen en orden
let estadoArduino = "desconectado";
let nombreArduino = "";
let luzEncendida = false;

// Enciende o apaga la luz de la página y avisa al Arduino
function encenderLuz(encendida) {
  luzEncendida = encendida;
  luz.classList.toggle("encendida", encendida);
  enviarArduino(encendida ? "1" : "0");
}

// Manda un texto corto al Arduino (si no hay conexión, no hace nada)
function enviarArduino(texto) {
  const actual = conexion;
  if (!actual) return;

  cadenaEnvio = cadenaEnvio
    .then(() => actual.escribir(codificador.encode(texto)))
    .catch((error) => console.error("Error al enviar al Arduino:", error));
}

// Pinta el botón, la luz y el mensaje de la sección de Arduino
function refrescarArduino() {
  const conectado = estadoArduino === "conectado";
  const ocupado = estadoArduino === "conectando";

  luzArduino.classList.toggle("encendida", conectado);
  btnArduino.classList.toggle("activo", conectado);
  btnArduino.textContent = conectado ? t("arduinoDesconectar") : t("arduinoConectar");
  btnArduino.disabled = ocupado || estadoArduino === "nosoporte";
  btnArduinoPrueba.disabled = !conectado;
  selectBluetooth.disabled = conectado || ocupado || estadoArduino === "nosoporte";
  textoArduino.textContent = t("arduino_" + estadoArduino) + (conectado ? nombreArduino : "");
}

// Se llama si el módulo se apaga o se aleja
function alPerderConexion() {
  if (!conexion) return; // si fue a propósito, ya no hay nada que avisar
  conexion = null;
  estadoArduino = "perdido";
  refrescarArduino();
}

// --- Módulos BLE (HM-10, AT-09, JDY-08...): servicio 0xFFE0, característica 0xFFE1 ---
async function conectarBLE() {
  const dispositivo = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [0xFFE0]
  });

  const servidor = await dispositivo.gatt.connect();
  let caracteristica;

  try {
    const servicio = await servidor.getPrimaryService(0xFFE0);
    caracteristica = await servicio.getCharacteristic(0xFFE1);
  } catch (error) {
    servidor.disconnect();
    const fallo = new Error("Servicio no compatible");
    fallo.codigo = "servicio";
    throw fallo;
  }

  dispositivo.addEventListener("gattserverdisconnected", alPerderConexion);

  return {
    nombre: dispositivo.name || "Arduino",
    escribir: (datos) =>
      caracteristica.writeValueWithoutResponse
        ? caracteristica.writeValueWithoutResponse(datos)
        : caracteristica.writeValue(datos),
    cerrar: async () => {
      dispositivo.removeEventListener("gattserverdisconnected", alPerderConexion);
      if (dispositivo.gatt.connected) dispositivo.gatt.disconnect();
    }
  };
}

// --- Módulos clásicos (HC-05, HC-06): puerto serie creado al emparejarlos ---
async function conectarSerial() {
  const puerto = await navigator.serial.requestPort();
  await puerto.open({ baudRate: 9600 });
  const escritor = puerto.writable.getWriter();

  const alDesconectar = (evento) => {
    if (evento.target === puerto) alPerderConexion();
  };
  navigator.serial.addEventListener("disconnect", alDesconectar);

  return {
    nombre: "HC-05 / HC-06",
    escribir: (datos) => escritor.write(datos),
    cerrar: async () => {
      navigator.serial.removeEventListener("disconnect", alDesconectar);
      try { escritor.releaseLock(); } catch (error) { /* ya estaba suelto */ }
      try { await puerto.close(); } catch (error) { /* ya estaba cerrado */ }
    }
  };
}

async function desconectarArduino() {
  const actual = conexion;
  if (!actual) return;

  enviarArduino("0");        // deja el LED y el zumbador apagados
  await cadenaEnvio;
  conexion = null;

  try {
    await actual.cerrar();
  } catch (error) {
    console.error("Error al desconectar:", error);
  }

  estadoArduino = "desconectado";
  refrescarArduino();
}

async function alternarArduino() {
  if (conexion) {
    await desconectarArduino();
    return;
  }

  estadoArduino = "conectando";
  refrescarArduino();

  try {
    conexion = selectBluetooth.value === "serial"
      ? await conectarSerial()
      : await conectarBLE();

    nombreArduino = conexion.nombre;
    estadoArduino = "conectado";
    enviarArduino(luzEncendida ? "1" : "0"); // sincroniza el estado inicial
  } catch (error) {
    conexion = null;

    if (error.name === "NotFoundError") {
      estadoArduino = "cancelado";   // la persona cerró la ventana de dispositivos
    } else if (error.codigo === "servicio") {
      estadoArduino = "servicio";
    } else {
      console.error("No se pudo conectar con el Arduino:", error);
      estadoArduino = "error";
    }
  }

  refrescarArduino();
}

// Botón "Probar": enciende el LED y el zumbador medio segundo
btnArduinoPrueba.addEventListener("click", async () => {
  enviarArduino("1");
  await dormir(500);
  enviarArduino("0");
});

btnArduino.addEventListener("click", alternarArduino);

// Revisa qué tipos de Bluetooth admite este navegador
function iniciarArduino() {
  const hayBLE = "bluetooth" in navigator;
  const haySerial = "serial" in navigator;

  selectBluetooth.querySelector('option[value="ble"]').disabled = !hayBLE;
  selectBluetooth.querySelector('option[value="serial"]').disabled = !haySerial;

  if (!hayBLE && haySerial) selectBluetooth.value = "serial";
  if (!hayBLE && !haySerial) estadoArduino = "nosoporte";
}

// ---------- ARRANQUE ----------
crearDiccionario();

if (!SpeechRecognition) {
  // Sin dictado, igual se puede escribir
  estadoMicro = "sinsoporte";
  boton.disabled = true;
} else {
  iniciarApp();
}

iniciarArduino();

// Aplica el idioma guardado (o español) y pinta toda la página
aplicarIdioma(idiomaInicial(), false);