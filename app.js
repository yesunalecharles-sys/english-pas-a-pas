/* English Pas à Pas — logique de l'application (accueil, histoires, 8 jeux, micro, points et étoiles). */

const GAMES = [
  { id: "comp",   ic: "📖", tint: "#fff1b8", name: "Questions sur l'histoire", k: "4 questions", d: "Répondez à l'oral ou en touchant la bonne réponse." },
  { id: "repeat", ic: "🎙️", tint: "#d0f4f0", name: "Répéter après l'audio",   k: "5 phrases",   d: "Écoutez une phrase de l'histoire, puis répétez-la." },
  { id: "quiz",   ic: "❓", tint: "#ffe8a3", name: "Quiz illustré",          k: "8 questions", d: "Une image ou un mot : trouvez la bonne réponse." },
  { id: "pairs",  ic: "🔗", tint: "#cfe3ff", name: "Associer les paires",    k: "5 paires",    d: "Reliez chaque mot anglais à sa traduction." },
  { id: "listen", ic: "🎧", tint: "#d8f3dc", name: "Écoute",                 k: "8 mots",      d: "Écoutez le mot et choisissez comment il s'écrit." },
  { id: "dictee", ic: "⌨️", tint: "#ffd6e0", name: "Écrire le mot entendu", k: "6 mots",      d: "Écoutez, puis écrivez le mot en anglais." },
  { id: "order",  ic: "🧩", tint: "#e5d4ff", name: "Construire la phrase",   k: "3 phrases",   d: "Remettez les mots anglais dans le bon ordre." },
  { id: "gap",    ic: "✏️", tint: "#ffe0c2", name: "Compléter la phrase",    k: "3 phrases",   d: "Choisissez le mot qui manque dans la phrase." }
];
const MAX_UNIT = GAMES.length * 3;
const KEY = "english-pas-a-pas-v2";

/* ---------- Sauvegarde sur l'appareil ---------- */
let P = { name: "", level: "debutant", xp: 0, stars: {} };
try {
  const s = localStorage.getItem(KEY);
  if (s) P = Object.assign(P, JSON.parse(s));
  else { const old = JSON.parse(localStorage.getItem("english-pas-a-pas-v1") || "null"); if (old && old.xp) P.xp = old.xp; }
} catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} }

/* ---------- Outils ---------- */
const $app = document.getElementById("app");
const rnd = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const unitById = id => UNITS.find(u => u.id === id);
const unitsOf = lv => UNITS.filter(u => u.level === lv);
const unitStars = u => GAMES.reduce((t, g) => t + (P.stars[u.id + "-" + g.id] || 0), 0);
const starsHTML = (n, max = 3) => '<span class="stars" aria-label="' + n + ' étoile(s) sur ' + max + '">' + "★".repeat(n) + '<span class="off">' + "★".repeat(max - n) + "</span></span>";
const norm = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z' ]/g, " ").replace(/\s+/g, " ").trim();
const toTop = () => window.scrollTo(0, 0);

const canSpeak = () => "speechSynthesis" in window;
function speak(text) {
  try {
    if (!canSpeak()) return false;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB"; u.rate = .85;
    const v = speechSynthesis.getVoices().find(v => /^en(-|_)/i.test(v.lang));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}
function bindSay() { $app.querySelectorAll("[data-say]").forEach(b => b.onclick = () => speak(b.dataset.say)); }
const plain = s => s.replace(/[“”"]/g, "");

/* ---------- Micro : reconnaissance vocale (Chrome, Edge, Safari récents) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const canListen = () => !!SR;
let rec = null;
function listenOnce(onText, onError, onEnd) {
  try {
    if (rec) { try { rec.abort(); } catch (e) {} }
    speechSynthesis && speechSynthesis.cancel && speechSynthesis.cancel();
    rec = new SR();
    rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 3;
    let got = false;
    rec.onresult = e => { got = true; onText(Array.from(e.results[0]).map(a => a.transcript)); };
    rec.onerror = e => { got = true; onError(e.error); };
    rec.onend = () => { if (!got) onError("no-speech"); onEnd && onEnd(); };
    rec.start();
  } catch (e) { onError("start"); onEnd && onEnd(); }
}
const MIC_ERR = {
  "not-allowed": "Le micro est bloqué. Touchez le cadenas à côté de l'adresse, puis autorisez le micro.",
  "service-not-allowed": "Le micro est bloqué. Touchez le cadenas à côté de l'adresse, puis autorisez le micro.",
  "no-speech": "Je n'ai rien entendu. Touchez le micro et parlez juste après.",
  "network": "Le micro a besoin d'internet. Connectez-vous pour cet exercice, ou continuez avec les autres jeux.",
  "audio-capture": "Aucun micro trouvé sur cet appareil.",
  "start": "Le micro n'a pas pu démarrer. Réessayez."
};
const micMsg = code => MIC_ERR[code] || "Le micro n'a pas fonctionné. Réessayez.";

/* Comparaison de ce qui a été dit avec le texte attendu */
const NUM = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty".split(" ");
const TENS = { 30: "thirty", 40: "forty", 50: "fifty", 60: "sixty", 70: "seventy", 80: "eighty", 90: "ninety" };
function numWord(n) {
  n = +n;
  if (n <= 20) return NUM[n];
  if (n < 100) { const t = Math.floor(n / 10) * 10, r = n % 10; return (n < 30 ? "twenty" : TENS[t]) + (r ? " " + NUM[r] : ""); }
  return String(n);
}
const CONTR = { "i'm": "i am", "it's": "it is", "he's": "he is", "she's": "she is", "that's": "that is", "what's": "what is", "let's": "let us", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "can not", "cannot": "can not", "won't": "will not", "i'll": "i will", "he'll": "he will", "she'll": "she will", "we'll": "we will", "you're": "you are", "we're": "we are", "they're": "they are", "isn't": "is not", "aren't": "are not", "i've": "i have", "o'clock": "o clock", "mr": "mister", "mrs": "missus", "mum": "mom", "colour": "color", "colours": "colors", "favourite": "favorite", "grey": "gray" };
function words(s) {
  s = s.toLowerCase().replace(/[’‘]/g, "'").replace(/(\d+)%/g, "$1 percent").replace(/(\d),(\d)/g, "$1$2").replace(/-/g, " ");
  s = s.replace(/\d+/g, d => numWord(d));
  return s.replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean)
    .map(w => CONTR[w] || w.replace(/^'+|'+$/g, "")).join(" ").split(" ").filter(Boolean);
}
function matchWords(target, heard) {
  const bag = {}; heard.forEach(w => bag[w] = (bag[w] || 0) + 1);
  return target.map(w => { if (bag[w]) { bag[w]--; return true; } return false; });
}
/* Retourne {score, marks} : marks = mots du texte avec vrai/faux */
function scoreSpeech(text, alts) {
  const t = words(text); let best = { score: 0, marks: t.map(() => false), heard: alts[0] || "" };
  alts.forEach(a => {
    const m = matchWords(t, words(a)), sc = t.length ? m.filter(Boolean).length / t.length : 0;
    if (sc > best.score) best = { score: sc, marks: m, heard: a };
  });
  best.words = t;
  return best;
}
function marked(res) {
  return res.words.map((w, i) => '<span class="' + (res.marks[i] ? "w-ok" : "w-ko") + '">' + esc(w) + "</span>").join(" ");
}
const STOP = new Set(["the", "a", "an", "to", "in", "on", "at", "of", "and", "is", "it", "his", "her", "for"]);
function answerHeard(answer, alts) {
  const key = words(answer).filter(w => !STOP.has(w));
  const need = key.length ? key : words(answer);
  return alts.some(a => { const h = new Set(words(a)); return need.filter(w => h.has(w)).length / need.length >= .75; });
}

/* ---------- Points et niveaux ---------- */
function updateHeader() {
  const inLv = P.xp % 100;
  document.getElementById("lvlBadge").textContent = "Niveau " + (Math.floor(P.xp / 100) + 1);
  document.getElementById("xpBar").style.width = inLv + "%";
  document.getElementById("xpText").textContent = inLv + " / 100 XP";
}
function addXP(n) { P.xp += n; save(); updateHeader(); }

/* ---------- Page d'accueil ---------- */
function welcome() {
  let chosen = P.level || "debutant";
  $app.innerHTML =
    '<div class="welcome">' +
      '<div><span class="club"><i></i>Proposé par l\'Anndaal English Club</span>' +
        '<h1>Parlez anglais <em>pas à pas</em>, en jouant.</h1>' +
        '<p class="intro">Chaque unité commence par une courte histoire à écouter et à lire à voix haute. Ensuite, une petite leçon et des jeux pour retenir les mots et oser parler.</p>' +
        '<form class="form" id="startForm" novalidate>' +
          '<div><label for="name">Votre prénom</label><input type="text" id="name" maxlength="30" autocomplete="given-name" placeholder="Par exemple : Aïcha" value="' + esc(P.name) + '"></div>' +
          '<div><label>Votre niveau</label><div class="levels">' +
            Object.entries(LEVELS).map(([k, v]) => '<button type="button" class="lv" data-lv="' + k + '" aria-pressed="' + (k === chosen) + '"><b>' + v.name + "</b><span>" + v.desc + "</span></button>").join("") +
          "</div></div>" +
          '<p class="err" id="err" aria-live="polite"></p>' +
          '<button class="btn go" type="submit">Commencer à jouer</button>' +
        "</form></div>" +
      '<div class="welcome-art">' + ART.hero() + "</div>" +
    "</div>" +
    '<div id="installZone"></div><div class="features">' +
      '<div class="feature"><span class="ic">📚</span><h3>' + UNITS.length + ' unités illustrées</h3><span class="muted">Salutations, marché, bureau, téléphone, banque, voyage, santé…</span></div>' +
      '<div class="feature"><span class="ic">📖</span><h3>Une histoire par unité</h3><span class="muted">Suivez Amina, sa famille et son collègue Kofi. Écoutez, puis lisez à voix haute.</span></div>' +
      '<div class="feature"><span class="ic">🎙️</span><h3>8 jeux, dont 2 à l\'oral</h3><span class="muted">Questions sur l\'histoire, répétition, quiz, paires, écoute, dictée, phrases.</span></div>' +
      '<div class="feature"><span class="ic">⭐</span><h3>Points et étoiles</h3><span class="muted">10 points par bonne réponse, un niveau tous les 100 points.</span></div>' +
    "</div>";
  $app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => {
    chosen = b.dataset.lv;
    $app.querySelectorAll("[data-lv]").forEach(x => x.setAttribute("aria-pressed", x === b));
  });
  renderInstall();
  document.getElementById("startForm").onsubmit = e => {
    e.preventDefault();
    const n = document.getElementById("name").value.trim();
    if (!n) { document.getElementById("err").textContent = "Écrivez votre prénom pour commencer."; document.getElementById("name").focus(); return; }
    P.name = n; P.level = chosen; save(); home();
  };
  toTop();
}

/* ---------- Liste des unités ---------- */
function home() {
  const list = unitsOf(P.level);
  const got = list.reduce((t, u) => t + unitStars(u), 0);
  let h = '<div class="greet-row"><div><h1>Hello ' + esc(P.name) + " !</h1>" +
    '<p class="muted" style="margin:6px 0 0">Choisissez une unité. ' + got + " / " + list.length * MAX_UNIT + " étoiles gagnées au niveau " + LEVELS[P.level].name + ".</p></div>" +
    '<div class="tabs" role="group" aria-label="Niveau">' +
    Object.entries(LEVELS).map(([k, v]) => '<button data-tab="' + k + '" aria-pressed="' + (k === P.level) + '">' + v.name + "</button>").join("") + "</div></div>" +
    '<div class="units">';
  list.forEach((u, i) => {
    const s = unitStars(u);
    h += '<button class="unit" data-unit="' + u.id + '"><span class="art">' + ART[u.art](u.color) + "</span>" +
      '<span class="meta"><span class="s">Unité ' + (i + 1) + " · " + esc(u.en) + '</span><span class="t">' + esc(u.title) + "</span>" +
      '<span class="s">' + s + " / " + MAX_UNIT + ' étoiles</span><span class="prog"><i style="width:' + Math.round(s / MAX_UNIT * 100) + '%"></i></span></span></button>';
  });
  h += '</div><div id="installZone"></div><div class="foot"><span>Progression gardée sur cet appareil.</span><span class="confirm" id="zone">' +
    '<button class="btn alt" id="rename">Changer de prénom</button><button class="btn alt" id="reset">Recommencer à zéro</button></span></div>';
  $app.innerHTML = h;
  renderInstall();
  $app.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { P.level = b.dataset.tab; save(); home(); });
  $app.querySelectorAll("[data-unit]").forEach(b => b.onclick = () => unit(b.dataset.unit));
  document.getElementById("rename").onclick = welcome;
  document.getElementById("reset").onclick = () => {
    document.getElementById("zone").innerHTML = '<span>Effacer tous les points et étoiles ?</span><button class="btn" id="yes">Oui, effacer</button><button class="btn alt" id="no">Annuler</button>';
    document.getElementById("yes").onclick = () => { P.xp = 0; P.stars = {}; save(); updateHeader(); home(); };
    document.getElementById("no").onclick = home;
  };
  toTop();
}

/* ---------- Une unité : histoire, leçon, jeux, vocabulaire ---------- */
function unit(id) {
  const u = unitById(id), idx = unitsOf(u.level).indexOf(u) + 1, st = STORIES[u.id];
  const mic = canListen();
  let h = '<button class="back" id="back">← Toutes les unités</button>' +
    '<div class="unit-head"><span class="art">' + ART[u.art](u.color) + "</span><div>" +
    '<p class="muted" style="margin:0">' + LEVELS[u.level].name + " · Unité " + idx + "</p><h1>" + esc(u.title) + "</h1>" +
    '<p class="muted" style="margin:4px 0 0">' + esc(u.en) + " — " + unitStars(u) + " / " + MAX_UNIT + " étoiles</p></div></div>" +
    '<ol class="path"><li class="on">1. Lire l\'histoire</li><li>2. La leçon</li><li>3. Les jeux</li></ol>' +
    '<article class="story" id="story"><span class="k">L\'histoire</span><h2>' + esc(st.title) + "</h2>" +
    '<p class="muted" style="margin:6px 0 12px">Écoutez chaque phrase, puis lisez-la à voix haute' + (mic ? " avec le bouton micro." : ".") + " Touchez « FR » pour voir la traduction.</p>" +
    '<div class="story-tools">' + (canSpeak() ? '<button class="btn" id="playAll">🔊 Écouter toute l\'histoire</button>' : "") +
    '<button class="btn alt" id="allFr">Afficher toutes les traductions</button></div>' +
    '<div class="lines">' + st.lines.map((l, i) =>
      '<div class="line" id="line' + i + '"><p class="en">' + esc(l[0]) + '</p><p class="fr" hidden>' + esc(l[1]) + "</p>" +
      '<div class="line-tools">' + (canSpeak() ? '<button class="say" data-say="' + esc(plain(l[0])) + '" aria-label="Écouter la phrase">🔊 Écouter</button>' : "") +
      (mic ? '<button class="say mic" data-read="' + i + '" aria-label="Lire la phrase au micro">🎙️ Lire</button>' : "") +
      '<button class="say" data-fr="' + i + '">FR</button></div><div class="read-res" id="res' + i + '" aria-live="polite"></div></div>').join("") + "</div>" +
    (mic ? "" : '<p class="note">Pour lire à voix haute et être corrigé, ouvrez l\'application dans Chrome (ordinateur ou Android) ou dans Safari sur iPhone.</p>') +
    '<div class="club-q"><span class="k">À discuter en club</span><ul>' + st.discuss.map(q => "<li>" + esc(q) + "</li>").join("") + "</ul></div>" +
    '<div class="actions"><button class="btn go" id="toGames">J\'ai lu l\'histoire : aux jeux !</button></div></article>' +
    '<div class="lesson" id="lesson"><span class="k">La leçon</span><h3>' + esc(u.lesson.title) + "</h3><ul>" + u.lesson.points.map(p => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
    '<div class="ex">' + u.lesson.examples.map(e => "<div><b>" + esc(e[0]) + "</b><span>" + esc(e[1]) + "</span>" + (canSpeak() ? '<button class="say" data-say="' + esc(e[0]) + '">Écouter</button>' : "") + "</div>").join("") + "</div></div>" +
    '<section id="games"><h2>Les jeux</h2><p class="muted" style="margin:4px 0 0">Tous les jeux utilisent les mots et les phrases de l\'histoire.</p><div class="games">' +
    GAMES.map(g => '<button class="game" data-game="' + g.id + '"><span class="ic" style="background:' + g.tint + '">' + g.ic + '</span><span class="k">' + g.k + "</span><h3>" + g.name + '</h3><span class="muted" style="font-size:.88rem">' + g.d + "</span>" + starsHTML(P.stars[u.id + "-" + g.id] || 0) + "</button>").join("") +
    "</div></section>" +
    '<div class="vocab"><h3>Les mots de l\'histoire</h3><ul>' +
    u.words.map(w => '<li><span class="pic">' + w[2] + "</span><div><b>" + esc(w[0]) + "</b><span>" + esc(w[1]) + "</span></div>" + (canSpeak() ? '<button class="say" data-say="' + esc(w[0]) + '" aria-label="Écouter ' + esc(w[0]) + '">♪</button>' : "<span></span>") + "</li>").join("") +
    "</ul></div>";
  $app.innerHTML = h;
  document.getElementById("back").onclick = home;
  $app.querySelectorAll("[data-game]").forEach(b => b.onclick = () => play(u, b.dataset.game));
  document.getElementById("toGames").onclick = () => document.getElementById("lesson").scrollIntoView({ behavior: "smooth" });
  $app.querySelectorAll("[data-fr]").forEach(b => b.onclick = () => { const f = document.querySelector("#line" + b.dataset.fr + " .fr"); f.hidden = !f.hidden; });
  let shown = false;
  document.getElementById("allFr").onclick = e => { shown = !shown; $app.querySelectorAll(".line .fr").forEach(f => f.hidden = !shown); e.target.textContent = shown ? "Masquer les traductions" : "Afficher toutes les traductions"; };
  const pa = document.getElementById("playAll");
  if (pa) pa.onclick = () => readAll(st.lines);
  $app.querySelectorAll("[data-read]").forEach(b => b.onclick = () => readLine(st.lines[+b.dataset.read][0], b, document.getElementById("res" + b.dataset.read)));
  bindSay();
  toTop();
}
function readAll(lines) {
  try {
    speechSynthesis.cancel();
    lines.forEach((l, i) => {
      const u = new SpeechSynthesisUtterance(plain(l[0]));
      u.lang = "en-GB"; u.rate = .85;
      const v = speechSynthesis.getVoices().find(v => /^en(-|_)/i.test(v.lang)); if (v) u.voice = v;
      u.onstart = () => { document.querySelectorAll(".line").forEach(x => x.classList.remove("now")); const el = document.getElementById("line" + i); if (el) { el.classList.add("now"); el.scrollIntoView({ block: "center", behavior: "smooth" }); } };
      u.onend = () => { if (i === lines.length - 1) document.querySelectorAll(".line").forEach(x => x.classList.remove("now")); };
      speechSynthesis.speak(u);
    });
  } catch (e) {}
}
/* Lire une phrase au micro et montrer les mots reconnus */
function readLine(text, btn, out, done) {
  btn.disabled = true; const label = btn.innerHTML; btn.innerHTML = "🔴 Parlez…";
  out.innerHTML = '<span class="muted">Je vous écoute…</span>';
  listenOnce(alts => {
    const r = scoreSpeech(plain(text), alts), pct = Math.round(r.score * 100);
    const ok = r.score >= .8;
    if (ok) addXP(5);
    out.innerHTML = '<div class="said">' + marked(r) + '</div><b class="' + (ok ? "ok" : "ko") + '">' + pct + " % des mots reconnus" + (ok ? " · Très bien ! +5 XP" : r.score >= .5 ? " · Presque ! Les mots en rouge sont à retravailler." : " · Réessayez plus lentement.") + "</b>";
    done && done(r.score);
  }, code => { out.innerHTML = '<b class="ko">' + micMsg(code) + "</b>"; done && done(null); },
  () => { btn.disabled = false; btn.innerHTML = label; });
}

/* ---------- Cadre commun des jeux ---------- */
function play(u, g) { if (rec) { try { rec.abort(); } catch (e) {} } ({ comp, repeat, quiz, pairs, listen, dictee, order, gap })[g](u); toTop(); }
function shell(u, g) {
  const G = GAMES.find(x => x.id === g);
  $app.innerHTML = '<button class="back" id="back">← ' + esc(u.title) + "</button><h2>" + G.ic + " " + G.name + '</h2><div class="play" id="play"></div>';
  document.getElementById("back").onclick = () => unit(u.id);
  return document.getElementById("play");
}
function head(label, n, total, good) {
  return '<div class="progress"><span>' + label + " " + (n + 1) + " / " + total + "</span><span>" + good + " bonne(s) réponse(s)</span></div>" +
    '<div class="steps">' + Array.from({ length: total }, (_, k) => "<i" + (k < n ? ' class="done"' : "") + "></i>").join("") + "</div>";
}
function nextBtn(isLast, onNext) {
  const nx = document.getElementById("next");
  nx.innerHTML = '<button class="btn">' + (isLast ? "Voir le résultat" : "Suivant") + "</button>";
  nx.firstChild.onclick = onNext;
  nx.firstChild.focus();
}
function finish(u, g, good, total) {
  const pct = good / total, s = pct >= .9 ? 3 : pct >= .7 ? 2 : pct >= .5 ? 1 : 0;
  const k = u.id + "-" + g, before = P.stars[k] || 0;
  if (s > before) { P.stars[k] = s; save(); }
  const msg = s === 3 ? "Excellent, " + esc(P.name) + " !" : s === 2 ? "Très bien !" : s === 1 ? "Pas mal, continuez !" : "Réessayez, vous allez progresser.";
  const others = GAMES.filter(x => x.id !== g && (P.stars[u.id + "-" + x.id] || 0) < 3);
  const sugg = others.length ? others[0] : null;
  document.getElementById("play").innerHTML = '<div class="result"><div class="big-stars">' + "★".repeat(s) + '<span class="off">' + "★".repeat(3 - s) + "</span></div>" +
    '<div class="score">' + good + " / " + total + "</div><p>" + msg + (s > before && before > 0 ? " Nouveau record." : "") + "</p>" +
    '<div class="actions"><button class="btn" id="again">Rejouer</button>' + (sugg ? '<button class="btn go" id="nextGame">Jeu suivant : ' + sugg.name + "</button>" : "") +
    '<button class="btn alt" id="toUnit">Retour à l\'unité</button></div></div>';
  document.getElementById("again").onclick = () => play(u, g);
  if (sugg) document.getElementById("nextGame").onclick = () => play(u, sugg.id);
  document.getElementById("toUnit").onclick = () => unit(u.id);
}
function choiceRound(opts, isRight, after) {
  document.querySelectorAll(".opts .opt").forEach(b => b.onclick = () => {
    const right = isRight(b.dataset.o);
    document.querySelectorAll(".opts .opt").forEach(x => { x.disabled = true; if (isRight(x.dataset.o)) x.classList.add("ok"); });
    if (!right) b.classList.add("ko");
    after(right);
  });
}
function feedback(right, text) {
  const fb = document.getElementById("fb");
  fb.className = "feedback " + (right ? "ok" : "ko");
  fb.textContent = text;
}

/* 3. Quiz illustré */
function quiz(u) {
  const W = u.words, box = shell(u, "quiz");
  const picOk = new Set(W.map(w => w[2])).size === W.length;
  const qs = shuffle(W).slice(0, 8).map((w, k) => ({ w, t: picOk && k % 3 === 0 ? "img" : Math.random() < .6 ? "en" : "fr" }));
  let n = 0, good = 0;
  const show = () => {
    const q = qs[n], w = q.w;
    const ans = q.t === "en" ? w[1] : w[0];
    const opts = shuffle([w, ...shuffle(W.filter(x => x !== w)).slice(0, 3)]).map(x => q.t === "en" ? x[1] : x[0]);
    const ask = q.t === "img" ? '<div class="pic-big pop">' + w[2] + '</div><p class="hint">Comment dit-on cela en anglais ?</p>'
      : q.t === "en" ? '<div class="pic-big">' + w[2] + '</div><div class="prompt pop">' + esc(w[0]) + '</div><p class="hint">Que veut dire ce mot en français ?' + (canSpeak() ? ' <button class="say" data-say="' + esc(w[0]) + '">Écouter</button>' : "") + "</p>"
      : '<div class="prompt pop">' + esc(w[1]) + '</div><p class="hint">Comment dit-on cela en anglais ?</p>';
    box.innerHTML = head("Question", n, qs.length, good) + ask +
      '<div class="opts">' + opts.map(o => '<button class="opt" data-o="' + esc(o) + '">' + esc(o) + "</button>").join("") + '</div><div class="feedback" id="fb"></div><div class="actions" id="next"></div>';
    bindSay();
    choiceRound(opts, o => o === ans, right => {
      if (right) { good++; addXP(10); }
      feedback(right, right ? "Correct ! +10 XP" : "Réponse : " + w[2] + " " + w[0] + " = " + w[1]);
      speak(w[0]);
      nextBtn(n + 1 === qs.length, () => { n++; n < qs.length ? show() : finish(u, "quiz", good, qs.length); });
    });
  };
  show();
}

/* 4. Associer les paires */
function pairs(u) {
  const set = shuffle(u.words).slice(0, 5), box = shell(u, "pairs");
  let sel = null, matched = 0, errors = 0;
  box.innerHTML = '<div class="progress"><span>Touchez un mot anglais, puis sa traduction</span><span id="pinfo">0 / 5 paires</span></div>' +
    '<div class="pairs"><div class="col">' + shuffle(set).map(w => '<button class="opt" data-side="L" data-k="' + set.indexOf(w) + '"><span class="e">' + w[2] + "</span>" + esc(w[0]) + "</button>").join("") + "</div>" +
    '<div class="col">' + shuffle(set).map(w => '<button class="opt" data-side="R" data-k="' + set.indexOf(w) + '">' + esc(w[1]) + "</button>").join("") + "</div></div>" +
    '<div class="feedback" id="fb"></div>';
  box.querySelectorAll(".pairs .opt").forEach(b => b.onclick = () => {
    if (b.disabled) return;
    if (!sel || sel.dataset.side === b.dataset.side) {
      if (sel) sel.classList.remove("sel");
      sel = b; b.classList.add("sel");
      if (b.dataset.side === "L") speak(set[+b.dataset.k][0]);
      return;
    }
    if (sel.dataset.k === b.dataset.k) {
      [sel, b].forEach(x => { x.classList.remove("sel"); x.classList.add("ok"); x.disabled = true; });
      matched++; addXP(10); feedback(true, "Bonne paire ! +10 XP");
      document.getElementById("pinfo").textContent = matched + " / 5 paires";
      if (matched === 5) setTimeout(() => finish(u, "pairs", 5, 5 + errors), 700);
    } else {
      errors++; const a = sel, c = b; a.classList.remove("sel"); [a, c].forEach(x => x.classList.add("ko"));
      feedback(false, "Ce n'est pas la bonne paire. Réessayez.");
      setTimeout(() => [a, c].forEach(x => x.classList.remove("ko")), 600);
    }
    sel = null;
  });
}

/* 5. Écoute */
function noVoice(u, box) {
  box.innerHTML = '<p>Ce navigateur ne lit pas les mots à voix haute. Ouvrez l\'application dans <b>Chrome</b> ou <b>Safari</b>, ou essayez un autre jeu.</p><div class="actions"><button class="btn" id="toUnit">Retour à l\'unité</button></div>';
  document.getElementById("toUnit").onclick = () => unit(u.id);
}
function listen(u) {
  const box = shell(u, "listen");
  if (!canSpeak()) return noVoice(u, box);
  const W = u.words, qs = shuffle(W).slice(0, 8);
  let n = 0, good = 0;
  const show = () => {
    const w = qs[n], opts = shuffle([w, ...shuffle(W.filter(x => x !== w)).slice(0, 3)]).map(x => x[0]);
    box.innerHTML = head("Mot", n, qs.length, good) +
      '<div class="actions" style="margin:20px 0 6px"><button class="btn big" id="hear">🔊 Écouter le mot</button></div><p class="hint">Touchez le bouton, puis choisissez le mot entendu.</p>' +
      '<div class="opts">' + opts.map(o => '<button class="opt" data-o="' + esc(o) + '">' + esc(o) + "</button>").join("") + '</div><div class="feedback" id="fb"></div><div class="actions" id="next"></div>';
    document.getElementById("hear").onclick = () => speak(w[0]);
    choiceRound(opts, o => o === w[0], right => {
      if (right) { good++; addXP(10); }
      feedback(right, (right ? "Correct ! +10 XP · " : "C'était : ") + w[2] + " " + w[0] + " = " + w[1]);
      nextBtn(n + 1 === qs.length, () => { n++; n < qs.length ? show() : finish(u, "listen", good, qs.length); });
    });
  };
  show();
}

/* 6. Écrire le mot entendu */
function dictee(u) {
  const box = shell(u, "dictee"), voice = canSpeak();
  const qs = shuffle(u.words).slice(0, 6);
  let n = 0, good = 0;
  const show = () => {
    const w = qs[n];
    box.innerHTML = head("Mot", n, qs.length, good) +
      (voice ? '<div class="actions" style="margin:20px 0 6px"><button class="btn big" id="hear">🔊 Écouter le mot</button></div><p class="hint">Indice : ' + w[2] + " " + esc(w[1]) + "</p>"
             : '<div class="pic-big">' + w[2] + '</div><div class="prompt">' + esc(w[1]) + '</div><p class="hint">Écrivez ce mot en anglais.</p>') +
      '<form class="typing" id="tf"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Votre réponse en anglais" placeholder="Écrivez ici…"><button class="btn" type="submit">Vérifier</button></form>' +
      '<div class="feedback" id="fb"></div><div class="actions" id="next"></div>';
    if (voice) document.getElementById("hear").onclick = () => speak(w[0]);
    const input = document.getElementById("ans");
    document.getElementById("tf").onsubmit = e => {
      e.preventDefault();
      const v = norm(input.value);
      if (!v) { input.focus(); return; }
      const target = norm(w[0]), right = v === target || v === target.replace(/^to /, "");
      if (right) { good++; addXP(10); }
      input.disabled = true; e.target.querySelector("button").disabled = true;
      feedback(right, right ? "Bien écrit ! +10 XP" : "La bonne orthographe : " + w[0]);
      speak(w[0]);
      nextBtn(n + 1 === qs.length, () => { n++; n < qs.length ? show() : finish(u, "dictee", good, qs.length); });
    };
    input.focus();
  };
  show();
}

/* 7. Construire la phrase (phrases de l'histoire) */
function order(u) {
  const max = u.level === "debutant" ? 11 : 14;
  const pool = STORIES[u.id].lines.filter(l => !/[“”]/.test(l[0]) && l[0].split(" ").length >= 4 && l[0].split(" ").length <= max);
  const S = shuffle(pool).slice(0, 3), box = shell(u, "order");
  let n = 0, good = 0;
  const show = () => {
    const [en, fr] = S[n], target = en.replace(/[.!?]$/, ""), tokens = target.split(" ");
    let tiles = shuffle(tokens.map((t, k) => ({ t, k })));
    if (tiles.map(x => x.t).join(" ") === target) tiles = tiles.slice(1).concat(tiles[0]);
    let picked = [];
    box.innerHTML = head("Phrase", n, S.length, good) +
      '<p class="hint" style="margin-top:16px">Retrouvez cette phrase de l\'histoire :</p><div class="prompt pop" style="font-size:1.4rem">' + esc(fr) + "</div>" +
      '<div class="line-ans" id="line" aria-label="Votre phrase"></div><div class="tiles" id="pool">' +
      tiles.map(x => '<button class="tile" data-k="' + x.k + '">' + esc(x.t) + "</button>").join("") + "</div>" +
      '<div class="actions"><button class="btn" id="check" disabled>Vérifier</button><button class="btn alt" id="clear">Effacer</button></div><div class="feedback" id="fb"></div><div class="fix" id="fix"></div><div class="actions" id="next"></div>';
    const line = document.getElementById("line"), check = document.getElementById("check");
    const draw = () => {
      line.innerHTML = picked.map((k, p) => '<button class="tile" data-p="' + p + '">' + esc(tokens[k]) + "</button>").join("");
      box.querySelectorAll("#pool .tile").forEach(b => b.classList.toggle("used", picked.includes(+b.dataset.k)));
      line.querySelectorAll(".tile").forEach(b => b.onclick = () => { picked.splice(+b.dataset.p, 1); draw(); });
      check.disabled = picked.length !== tokens.length;
    };
    box.querySelectorAll("#pool .tile").forEach(b => b.onclick = () => { if (!picked.includes(+b.dataset.k)) { picked.push(+b.dataset.k); draw(); } });
    document.getElementById("clear").onclick = () => { picked = []; draw(); };
    check.onclick = () => {
      const right = picked.map(k => tokens[k]).join(" ") === target;
      if (right) { good++; addXP(10); }
      feedback(right, right ? "Bravo, phrase correcte ! +10 XP" : "Pas tout à fait.");
      document.getElementById("fix").innerHTML = "Dans l'histoire : <b>" + esc(en) + "</b>";
      speak(en);
      box.querySelectorAll(".tile").forEach(t => t.disabled = true);
      check.disabled = true; document.getElementById("clear").disabled = true;
      nextBtn(n + 1 === S.length, () => { n++; n < S.length ? show() : finish(u, "order", good, S.length); });
    };
  };
  show();
}

/* 8. Compléter la phrase (phrases de l'histoire) */
function gap(u) {
  const G = shuffle(STORIES[u.id].gaps), box = shell(u, "gap");
  let n = 0, good = 0;
  const show = () => {
    const [sent, ans, fr, wrong] = G[n];
    const startsWithGap = /^[“"]?___/.test(sent);
    const opts = shuffle([ans, ...wrong]);
    const parts = sent.split("___");
    box.innerHTML = head("Phrase", n, G.length, good) +
      '<div class="gap-sentence pop">' + esc(parts[0]) + '<u id="slot">&nbsp;</u>' + esc(parts[1]) + "</div>" +
      '<p class="hint">' + esc(fr) + "</p>" +
      '<div class="opts">' + opts.map(o => '<button class="opt" data-o="' + esc(o) + '">' + esc(o) + "</button>").join("") + '</div><div class="feedback" id="fb"></div><div class="actions" id="next"></div>';
    choiceRound(opts, o => o === ans, right => {
      if (right) { good++; addXP(10); }
      const word = startsWithGap ? cap(ans) : ans;
      document.getElementById("slot").textContent = word;
      feedback(right, right ? "Correct ! +10 XP" : "Le mot qui manquait : « " + ans + " »");
      speak(plain(parts[0] + word + parts[1]));
      nextBtn(n + 1 === G.length, () => { n++; n < G.length ? show() : finish(u, "gap", good, G.length); });
    });
  };
  show();
}

/* 1. Questions sur l'histoire (réponse à l'oral ou au toucher) */
function comp(u) {
  const st = STORIES[u.id], Q = shuffle(st.questions), box = shell(u, "comp"), mic = canListen();
  let n = 0, good = 0;
  const show = () => {
    const [q, ans, ...wrong] = Q[n];
    const opts = shuffle([ans, ...wrong]);
    box.innerHTML = head("Question", n, Q.length, good) +
      '<div class="prompt pop" style="font-size:1.6rem">' + esc(q) + "</div>" +
      '<p class="hint">' + (canSpeak() ? '<button class="say" data-say="' + esc(q) + '">🔊 Écouter la question</button> ' : "") +
      '<button class="say" id="peek">Revoir l\'histoire</button></p>' +
      '<div class="peek" id="peekBox" hidden>' + st.lines.map(l => "<p>" + esc(l[0]) + "</p>").join("") + "</div>" +
      (mic ? '<div class="actions" style="margin:4px 0 14px"><button class="btn big" id="say">🎙️ Répondre à l\'oral</button></div><p class="hint" id="heard">Dites la réponse en anglais, ou touchez-la ci-dessous.</p>' : "") +
      '<div class="opts">' + opts.map(o => '<button class="opt" data-o="' + esc(o) + '">' + esc(o) + "</button>").join("") + '</div><div class="feedback" id="fb"></div><div class="actions" id="next"></div>';
    bindSay();
    document.getElementById("peek").onclick = () => { const p = document.getElementById("peekBox"); p.hidden = !p.hidden; };
    let answered = false;
    const conclude = (right, oral) => {
      if (answered) return; answered = true;
      document.querySelectorAll(".opts .opt").forEach(x => { x.disabled = true; if (x.dataset.o === ans) x.classList.add("ok"); });
      const sb = document.getElementById("say"); if (sb) sb.disabled = true;
      if (right) { good++; addXP(oral ? 15 : 10); }
      feedback(right, right ? (oral ? "Bien dit ! +15 XP" : "Correct ! +10 XP") : "La bonne réponse : " + ans);
      speak(ans);
      nextBtn(n + 1 === Q.length, () => { n++; n < Q.length ? show() : finish(u, "comp", good, Q.length); });
    };
    choiceRound(opts, o => o === ans, right => conclude(right, false));
    const sb = document.getElementById("say");
    if (sb) sb.onclick = () => {
      sb.disabled = true; sb.textContent = "🔴 Parlez…";
      listenOnce(alts => {
        document.getElementById("heard").innerHTML = "Vous avez dit : <b>« " + esc(alts[0]) + " »</b>";
        if (answerHeard(ans, alts)) conclude(true, true);
        else { const hit = wrong.find(w => answerHeard(w, alts)); if (hit) { const b = [...document.querySelectorAll(".opts .opt")].find(x => x.dataset.o === hit); if (b) b.classList.add("ko"); conclude(false, true); } else feedback(false, "Je n'ai pas reconnu la réponse. Réessayez ou touchez-la."); }
      }, code => feedback(false, micMsg(code)), () => { if (!answered) { sb.disabled = false; sb.textContent = "🎙️ Répondre à l'oral"; } });
    };
  };
  show();
}

/* 2. Répéter après l'audio */
function repeat(u) {
  const box = shell(u, "repeat");
  if (!canListen() || !canSpeak()) {
    box.innerHTML = '<p>Ce jeu a besoin du micro et de la voix du navigateur. Ouvrez l\'application dans <b>Chrome</b> (ordinateur ou Android) ou <b>Safari</b> (iPhone).</p><div class="actions"><button class="btn" id="toUnit">Retour à l\'unité</button></div>';
    document.getElementById("toUnit").onclick = () => unit(u.id); return;
  }
  const max = u.level === "debutant" ? 10 : 14;
  const S = shuffle(STORIES[u.id].lines.filter(l => plain(l[0]).split(" ").length <= max)).slice(0, 5);
  let n = 0, good = 0;
  const show = () => {
    const [en, fr] = S[n], txt = plain(en);
    let tries = 0, best = 0;
    box.innerHTML = head("Phrase", n, S.length, good) +
      '<p class="hint" style="margin-top:16px">1. Écoutez la phrase. 2. Touchez le micro et répétez-la.</p>' +
      '<div class="actions"><button class="btn big" id="hear">🔊 Écouter</button><button class="btn big" id="talk">🎙️ Répéter</button></div>' +
      '<div class="prompt" style="font-size:1.35rem;margin-top:16px" id="txt">' + esc(en) + '</div><p class="hint">' + esc(fr) + "</p>" +
      '<div class="read-res" id="out" aria-live="polite"></div><div class="actions" id="next"></div>';
    document.getElementById("hear").onclick = () => speak(txt);
    const talk = document.getElementById("talk"), out = document.getElementById("out");
    talk.onclick = () => readLine(txt, talk, out, score => {
      if (score === null) return;
      tries++; best = Math.max(best, score);
      if (best >= .8 || tries >= 3) {
        if (best >= .8) good++;
        nextBtn(n + 1 === S.length, () => { n++; n < S.length ? show() : finish(u, "repeat", good, S.length); });
      } else out.insertAdjacentHTML("beforeend", '<p class="muted">Essai ' + tries + " sur 3. Écoutez encore et réessayez.</p>");
    });
    setTimeout(() => speak(txt), 300);
  };
  show();
}


/* ---------- Installation sur le téléphone (application hors ligne) ---------- */
let installEvt = null;
const isStandalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; renderInstall(); });
window.addEventListener("appinstalled", () => { installEvt = null; renderInstall(); });
function renderInstall() {
  const z = document.getElementById("installZone");
  if (!z) return;
  if (isStandalone()) { z.innerHTML = ""; return; }
  if (installEvt) {
    z.innerHTML = '<div class="install"><div><b>📲 Installez l\'application</b><span>Elle s\'ouvrira depuis votre écran d\'accueil, même sans internet.</span></div><button class="btn" id="doInstall">Installer</button></div>';
    document.getElementById("doInstall").onclick = async () => { installEvt.prompt(); try { await installEvt.userChoice; } catch (e) {} installEvt = null; renderInstall(); };
  } else if (isIOS()) {
    z.innerHTML = '<div class="install"><div><b>📲 Installer sur iPhone</b><span>Dans Safari, touchez le bouton Partager, puis « Sur l\'écran d\'accueil ».</span></div></div>';
  } else {
    z.innerHTML = '<div class="install"><div><b>📲 Utiliser sans internet</b><span>Dans Chrome, ouvrez le menu ⋮ puis « Installer l\'application » ou « Ajouter à l\'écran d\'accueil ».</span></div></div>';
  }
}
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

/* ---------- Démarrage ---------- */
document.getElementById("brand").onclick = () => P.name ? home() : welcome();
if (canSpeak()) { try { speechSynthesis.getVoices(); } catch (e) {} }
updateHeader();
P.name ? home() : welcome();
