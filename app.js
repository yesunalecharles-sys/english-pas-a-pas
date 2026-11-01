/* English Pas à Pas — logique de l'application (accueil, unités, 6 jeux, points et étoiles). */

const GAMES = [
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
        '<p class="intro">Des mots du quotidien, du bureau et du voyage, une petite leçon par unité et six jeux pour retenir sans effort. Quelques minutes par jour suffisent.</p>' +
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
    '<div class="features">' +
      '<div class="feature"><span class="ic">📚</span><h3>' + UNITS.length + ' unités illustrées</h3><span class="muted">Salutations, marché, bureau, téléphone, banque, voyage, santé…</span></div>' +
      '<div class="feature"><span class="ic">🎮</span><h3>6 jeux</h3><span class="muted">Quiz, paires, écoute, dictée, phrases à construire et à compléter.</span></div>' +
      '<div class="feature"><span class="ic">⭐</span><h3>Points et étoiles</h3><span class="muted">10 points par bonne réponse, un niveau tous les 100 points.</span></div>' +
    "</div>";
  $app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => {
    chosen = b.dataset.lv;
    $app.querySelectorAll("[data-lv]").forEach(x => x.setAttribute("aria-pressed", x === b));
  });
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
  h += '</div><div class="foot"><span>Progression gardée sur cet appareil.</span><span class="confirm" id="zone">' +
    '<button class="btn alt" id="rename">Changer de prénom</button><button class="btn alt" id="reset">Recommencer à zéro</button></span></div>';
  $app.innerHTML = h;
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

/* ---------- Une unité : leçon, jeux, vocabulaire ---------- */
function unit(id) {
  const u = unitById(id), idx = unitsOf(u.level).indexOf(u) + 1;
  let h = '<button class="back" id="back">← Toutes les unités</button>' +
    '<div class="unit-head"><span class="art">' + ART[u.art](u.color) + "</span><div>" +
    '<p class="muted" style="margin:0">' + LEVELS[u.level].name + " · Unité " + idx + "</p><h1>" + esc(u.title) + "</h1>" +
    '<p class="muted" style="margin:4px 0 0">' + esc(u.en) + " — " + starsHTML(Math.min(3, Math.floor(unitStars(u) / 6))) + " " + unitStars(u) + " / " + MAX_UNIT + " étoiles</p></div></div>" +
    '<div class="lesson"><span class="k">La leçon</span><h3>' + esc(u.lesson.title) + "</h3><ul>" + u.lesson.points.map(p => "<li>" + esc(p) + "</li>").join("") + "</ul>" +
    '<div class="ex">' + u.lesson.examples.map(e => "<div><b>" + esc(e[0]) + "</b><span>" + esc(e[1]) + "</span>" + (canSpeak() ? '<button class="say" data-say="' + esc(e[0]) + '">Écouter</button>' : "") + "</div>").join("") + "</div></div>" +
    "<section><h2>Les jeux</h2><div class=\"games\">" +
    GAMES.map(g => '<button class="game" data-game="' + g.id + '"><span class="ic" style="background:' + g.tint + '">' + g.ic + '</span><span class="k">' + g.k + "</span><h3>" + g.name + '</h3><span class="muted" style="font-size:.88rem">' + g.d + "</span>" + starsHTML(P.stars[u.id + "-" + g.id] || 0) + "</button>").join("") +
    "</div></section>" +
    '<div class="vocab"><h3>Les mots de l\'unité</h3><ul>' +
    u.words.map(w => '<li><span class="pic">' + w[2] + "</span><div><b>" + esc(w[0]) + "</b><span>" + esc(w[1]) + "</span></div>" + (canSpeak() ? '<button class="say" data-say="' + esc(w[0]) + '" aria-label="Écouter ' + esc(w[0]) + '">♪</button>' : "<span></span>") + "</li>").join("") +
    "</ul></div>";
  $app.innerHTML = h;
  document.getElementById("back").onclick = home;
  $app.querySelectorAll("[data-game]").forEach(b => b.onclick = () => play(u, b.dataset.game));
  bindSay();
  toTop();
}

/* ---------- Cadre commun des jeux ---------- */
function play(u, g) { ({ quiz, pairs, listen, dictee, order, gap })[g](u); toTop(); }
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

/* 1. Quiz illustré */
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

/* 2. Associer les paires */
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

/* 3. Écoute */
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

/* 4. Écrire le mot entendu */
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

/* 5. Construire la phrase */
function order(u) {
  const S = shuffle(u.sentences).slice(0, 3), box = shell(u, "order");
  let n = 0, good = 0;
  const show = () => {
    const [en, fr] = S[n], tokens = en.split(" ");
    let tiles = shuffle(tokens.map((t, k) => ({ t, k })));
    if (tiles.map(x => x.t).join(" ") === en) tiles = tiles.slice(1).concat(tiles[0]);
    let picked = [];
    box.innerHTML = head("Phrase", n, S.length, good) +
      '<p class="hint" style="margin-top:16px">Traduisez en anglais :</p><div class="prompt pop" style="font-size:1.5rem">' + esc(fr) + "</div>" +
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
      const right = picked.map(k => tokens[k]).join(" ") === en;
      const pretty = en.replace(/ ([?,!.])/g, "$1");
      if (right) { good++; addXP(10); }
      feedback(right, right ? "Bravo, phrase correcte ! +10 XP" : "Pas tout à fait.");
      document.getElementById("fix").innerHTML = "Bonne réponse : <b>" + esc(pretty) + "</b>";
      speak(pretty);
      box.querySelectorAll(".tile").forEach(t => t.disabled = true);
      check.disabled = true; document.getElementById("clear").disabled = true;
      nextBtn(n + 1 === S.length, () => { n++; n < S.length ? show() : finish(u, "order", good, S.length); });
    };
  };
  show();
}

/* 6. Compléter la phrase */
function gap(u) {
  const G = shuffle(u.gaps), box = shell(u, "gap");
  let n = 0, good = 0;
  const show = () => {
    const [sent, ans, fr] = G[n];
    const related = w => ans.toLowerCase().startsWith(w[0].toLowerCase()) || w[0].toLowerCase().startsWith(ans.toLowerCase());
    const opts = shuffle([ans, ...shuffle(u.words.filter(w => !related(w))).slice(0, 3).map(w => w[0])]);
    const startsWithGap = sent.startsWith("___");
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
      speak((parts[0] + word + parts[1]).replace(/ ,/g, ","));
      nextBtn(n + 1 === G.length, () => { n++; n < G.length ? show() : finish(u, "gap", good, G.length); });
    });
  };
  show();
}

/* ---------- Démarrage ---------- */
document.getElementById("brand").onclick = () => P.name ? home() : welcome();
if (canSpeak()) { try { speechSynthesis.getVoices(); } catch (e) {} }
updateHeader();
P.name ? home() : welcome();
