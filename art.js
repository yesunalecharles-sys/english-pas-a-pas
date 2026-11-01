/* Illustrations dessinées (SVG) : une scène par unité et l'illustration d'accueil.
   Toutes les formes sont dessinées à la main ici, sans image externe. */

const INK = "#15233b", SKIN1 = "#8d5524", SKIN2 = "#c68642", SKIN3 = "#5c3a1e", WHITE = "#ffffff";

function svg(inner, bg) {
  return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<rect width="120" height="120" rx="26" fill="' + bg + '"/>' +
    '<circle cx="96" cy="22" r="30" fill="#ffffff" opacity=".14"/><circle cx="14" cy="108" r="26" fill="#ffffff" opacity=".1"/>' +
    inner + '</svg>';
}
function person(x, y, skin, shirt, s) {
  s = s || 1;
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
    '<path d="M-17 38 Q-17 14 0 14 Q17 14 17 38 Z" fill="' + shirt + '"/>' +
    '<circle cx="0" cy="0" r="11" fill="' + skin + '"/>' +
    '<path d="M-11 -2 Q-10 -13 0 -12 Q10 -13 11 -2 Q6 -8 0 -8 Q-6 -8 -11 -2Z" fill="' + INK + '"/>' +
    '<circle cx="-4" cy="1" r="1.3" fill="' + INK + '"/><circle cx="4" cy="1" r="1.3" fill="' + INK + '"/>' +
    '<path d="M-4 5 Q0 8 4 5" stroke="' + INK + '" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>';
}
function bubble(x, y, w, text, fill, color) {
  return '<g><rect x="' + x + '" y="' + y + '" width="' + w + '" height="22" rx="11" fill="' + fill + '"/>' +
    '<path d="M' + (x + 12) + ' ' + (y + 21) + ' l-4 8 l11 -8z" fill="' + fill + '"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + 15.5) + '" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" font-size="12" text-anchor="middle" fill="' + color + '">' + text + '</text></g>';
}

const ART = {
  greet: c => svg(person(38, 66, SKIN1, "#15233b") + person(84, 70, SKIN2, "#e63946", .9) +
    bubble(14, 18, 50, "Hello!", WHITE, INK) +
    '<path d="M58 58 q4 -10 10 -6" stroke="' + WHITE + '" stroke-width="3" fill="none" stroke-linecap="round"/>', c),
  numbers: c => svg(
    '<rect x="16" y="56" width="28" height="28" rx="6" fill="' + WHITE + '"/><text x="30" y="77" font-size="20" font-weight="800" text-anchor="middle" fill="' + INK + '" font-family="Arial">1</text>' +
    '<rect x="46" y="42" width="28" height="42" rx="6" fill="#ffbf1f"/><text x="60" y="70" font-size="20" font-weight="800" text-anchor="middle" fill="' + INK + '" font-family="Arial">2</text>' +
    '<rect x="76" y="28" width="28" height="56" rx="6" fill="' + INK + '"/><text x="90" y="63" font-size="20" font-weight="800" text-anchor="middle" fill="' + WHITE + '" font-family="Arial">3</text>' +
    '<rect x="12" y="88" width="96" height="6" rx="3" fill="' + INK + '" opacity=".35"/>', c),
  colours: c => svg(
    '<path d="M60 22 C28 22 16 46 20 66 C24 86 44 98 60 96 C70 95 70 86 64 80 C58 74 64 66 74 68 C92 72 104 62 100 46 C96 30 80 22 60 22Z" fill="' + WHITE + '"/>' +
    '<circle cx="42" cy="44" r="7" fill="#e63946"/><circle cx="62" cy="36" r="7" fill="#ffbf1f"/><circle cx="82" cy="46" r="7" fill="#3a86ff"/><circle cx="38" cy="66" r="7" fill="#2a9d8f"/><circle cx="48" cy="84" r="6" fill="#8338ec"/>' +
    '<path d="M86 96 L104 70" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><path d="M104 70 l4 -8 l-8 4z" fill="#e63946"/>', c),
  family: c => svg(person(32, 60, SKIN3, "#15233b") + person(88, 60, SKIN1, "#ffbf1f") + person(60, 78, SKIN2, "#ef476f", .7) +
    '<path d="M50 30 q10 -12 20 0 q-10 10 -10 14 q0 -4 -10 -14z" fill="#ef476f"/>', c),
  food: c => svg(
    '<path d="M18 62 H102 L92 98 Q90 104 84 104 H36 Q30 104 28 98Z" fill="#bc6c25"/>' +
    '<path d="M24 70 H96 M28 82 H92 M32 94 H88" stroke="#8a4d18" stroke-width="2.5"/>' +
    '<circle cx="44" cy="54" r="12" fill="#e63946"/><path d="M44 42 q2 -6 6 -6" stroke="#2a9d8f" stroke-width="3" fill="none"/>' +
    '<ellipse cx="66" cy="50" rx="13" ry="10" fill="#ffbf1f"/><circle cx="86" cy="54" r="11" fill="#90be6d"/>' +
    '<path d="M18 62 Q60 20 102 62" stroke="#8a4d18" stroke-width="5" fill="none"/>', c),
  office: c => svg(
    '<rect x="22" y="30" width="76" height="50" rx="6" fill="' + INK + '"/><rect x="28" y="36" width="64" height="38" rx="3" fill="#bde0fe"/>' +
    '<rect x="34" y="44" width="30" height="5" rx="2" fill="' + INK + '" opacity=".5"/><rect x="34" y="54" width="44" height="5" rx="2" fill="' + INK + '" opacity=".3"/>' +
    '<rect x="34" y="64" width="12" height="5" rx="2" fill="#2a9d8f"/><path d="M14 86 H106 L98 94 H22Z" fill="' + WHITE + '"/>' +
    '<rect x="78" y="12" width="20" height="26" rx="2" fill="' + WHITE + '"/><path d="M82 20 h12 M82 26 h12 M82 32 h8" stroke="' + INK + '" stroke-width="2"/>', c),
  days: c => svg(
    '<rect x="22" y="26" width="76" height="72" rx="10" fill="' + WHITE + '"/><rect x="22" y="26" width="76" height="20" rx="10" fill="#e63946"/><rect x="22" y="38" width="76" height="8" fill="#e63946"/>' +
    '<rect x="38" y="18" width="6" height="16" rx="3" fill="' + INK + '"/><rect x="76" y="18" width="6" height="16" rx="3" fill="' + INK + '"/>' +
    '<g fill="' + INK + '" opacity=".25"><rect x="32" y="54" width="10" height="9" rx="2"/><rect x="47" y="54" width="10" height="9" rx="2"/><rect x="62" y="54" width="10" height="9" rx="2"/><rect x="77" y="54" width="10" height="9" rx="2"/><rect x="32" y="68" width="10" height="9" rx="2"/><rect x="62" y="68" width="10" height="9" rx="2"/><rect x="77" y="68" width="10" height="9" rx="2"/><rect x="32" y="82" width="10" height="9" rx="2"/><rect x="47" y="82" width="10" height="9" rx="2"/></g>' +
    '<rect x="47" y="68" width="10" height="9" rx="2" fill="#ffbf1f"/><text x="60" y="41" font-family="Arial" font-weight="800" font-size="10" text-anchor="middle" fill="' + WHITE + '">MONDAY</text>', c),
  verbs: c => svg(
    '<circle cx="62" cy="26" r="9" fill="' + SKIN1 + '"/>' +
    '<path d="M60 36 L54 62 M58 44 L74 52 M58 44 L42 48 M54 62 L70 78 L66 96 M54 62 L42 80 L28 84" stroke="' + INK + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>' +
    '<path d="M84 40 h16 M88 54 h14 M84 68 h16" stroke="' + WHITE + '" stroke-width="4" stroke-linecap="round"/>', c),
  house: c => svg(
    '<path d="M60 20 L102 56 H18Z" fill="#e63946"/><rect x="26" y="54" width="68" height="46" fill="' + WHITE + '"/>' +
    '<rect x="52" y="70" width="18" height="30" rx="2" fill="#bc6c25"/><circle cx="66" cy="86" r="1.8" fill="' + INK + '"/>' +
    '<rect x="32" y="62" width="14" height="14" rx="2" fill="#bde0fe"/><rect x="76" y="62" width="14" height="14" rx="2" fill="#bde0fe"/>' +
    '<rect x="80" y="26" width="8" height="18" fill="' + INK + '"/>', c),
  town: c => svg(
    '<rect x="14" y="40" width="26" height="48" rx="3" fill="' + WHITE + '"/><rect x="44" y="26" width="30" height="62" rx="3" fill="' + INK + '"/><rect x="78" y="48" width="26" height="40" rx="3" fill="' + WHITE + '"/>' +
    '<g fill="#ffbf1f"><rect x="50" y="34" width="6" height="6"/><rect x="62" y="34" width="6" height="6"/><rect x="50" y="48" width="6" height="6"/><rect x="62" y="48" width="6" height="6"/><rect x="50" y="62" width="6" height="6"/></g>' +
    '<rect x="8" y="88" width="104" height="14" fill="#5a5a6e"/><path d="M14 95 h10 M34 95 h10 M54 95 h10 M74 95 h10 M94 95 h10" stroke="' + WHITE + '" stroke-width="2"/>' +
    '<rect x="22" y="78" width="30" height="12" rx="4" fill="#ffbf1f"/><circle cx="29" cy="91" r="3.5" fill="' + INK + '"/><circle cx="45" cy="91" r="3.5" fill="' + INK + '"/>', c),
  intro: c => svg(person(48, 64, SKIN1, "#15233b", 1.1) +
    '<rect x="78" y="40" width="8" height="30" rx="4" fill="' + INK + '"/><circle cx="82" cy="36" r="10" fill="#adb5bd"/><path d="M76 98 h12 M82 70 v28" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
    bubble(56, 12, 54, "I'm...", WHITE, INK), c),
  phone: c => svg(
    '<rect x="38" y="16" width="44" height="88" rx="10" fill="' + INK + '"/><rect x="43" y="26" width="34" height="62" rx="3" fill="#bde0fe"/>' +
    '<circle cx="60" cy="96" r="3.5" fill="' + WHITE + '"/><circle cx="60" cy="48" r="10" fill="#2a9d8f"/>' +
    '<path d="M55 44 q0 9 9 9 l2 -3 l-3 -2 l-2 2 q-3 -1 -4 -4 l2 -2 l-2 -3z" fill="' + WHITE + '"/>' +
    '<path d="M90 36 q8 8 0 16 M98 30 q14 14 0 28" stroke="' + WHITE + '" stroke-width="4" fill="none" stroke-linecap="round"/>', c),
  meeting: c => svg(
    '<ellipse cx="60" cy="86" rx="44" ry="12" fill="#bc6c25"/>' + person(28, 52, SKIN2, "#e63946", .75) + person(60, 44, SKIN1, "#ffbf1f", .75) + person(92, 52, SKIN3, "#2a9d8f", .75) +
    '<rect x="40" y="78" width="16" height="10" rx="2" fill="' + WHITE + '"/><rect x="66" y="78" width="16" height="10" rx="2" fill="' + WHITE + '"/>', c),
  money: c => svg(
    '<rect x="14" y="40" width="74" height="44" rx="6" fill="#90be6d"/><rect x="20" y="46" width="62" height="32" rx="4" fill="none" stroke="' + WHITE + '" stroke-width="2"/><circle cx="51" cy="62" r="10" fill="' + WHITE + '"/><text x="51" y="67" font-family="Arial" font-weight="800" font-size="13" text-anchor="middle" fill="#2d6a4f">F</text>' +
    '<g fill="#ffbf1f" stroke="#c98a00" stroke-width="2"><ellipse cx="92" cy="92" rx="16" ry="6"/><ellipse cx="92" cy="84" rx="16" ry="6"/><ellipse cx="92" cy="76" rx="16" ry="6"/></g>', c),
  travel: c => svg(
    '<path d="M18 74 Q60 66 104 30" stroke="' + WHITE + '" stroke-width="3" stroke-dasharray="6 6" fill="none"/>' +
    '<g transform="translate(86 38) rotate(-35)"><path d="M-22 0 Q-22 -5 -14 -5 H18 Q26 -5 26 0 Q26 5 18 5 H-14 Q-22 5 -22 0Z" fill="' + WHITE + '"/><path d="M-2 -4 L-14 -20 H-8 L8 -4Z M-2 4 L-14 20 H-8 L8 4Z M-20 -2 L-26 -12 H-22 L-14 -3Z" fill="' + WHITE + '"/></g>' +
    '<rect x="20" y="72" width="34" height="30" rx="5" fill="#e63946"/><rect x="30" y="64" width="14" height="10" rx="3" fill="none" stroke="' + INK + '" stroke-width="3"/><path d="M28 80 v16 M46 80 v16" stroke="' + INK + '" stroke-width="2" opacity=".4"/>', c),
  health: c => svg(
    '<path d="M60 98 C20 72 16 50 26 38 C36 26 52 30 60 42 C68 30 84 26 94 38 C104 50 100 72 60 98Z" fill="' + WHITE + '"/>' +
    '<rect x="52" y="44" width="16" height="40" rx="3" fill="#d62828"/><rect x="40" y="56" width="40" height="16" rx="3" fill="#d62828"/>', c),
  restaurant: c => svg(
    '<circle cx="60" cy="64" r="34" fill="' + WHITE + '"/><circle cx="60" cy="64" r="24" fill="none" stroke="' + INK + '" stroke-width="2" opacity=".2"/>' +
    '<ellipse cx="54" cy="66" rx="13" ry="8" fill="#e76f51"/><circle cx="66" cy="58" r="6" fill="#90be6d"/><circle cx="68" cy="70" r="5" fill="#ffbf1f"/>' +
    '<path d="M18 36 v18 q0 6 4 6 v34" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M14 36 v14 M22 36 v14" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M102 36 q-10 10 0 26 v32" stroke="' + INK + '" stroke-width="4" fill="none" stroke-linecap="round"/>', c),
  interview: c => svg(person(34, 50, SKIN1, "#15233b", .85) + person(86, 50, SKIN3, "#2a9d8f", .85) +
    '<rect x="10" y="80" width="100" height="10" rx="4" fill="#bc6c25"/><rect x="48" y="66" width="22" height="16" rx="2" fill="' + WHITE + '"/><path d="M52 71 h14 M52 76 h10" stroke="' + INK + '" stroke-width="2"/>' +
    '<path d="M50 30 l5 5 l10 -12" stroke="' + WHITE + '" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>', c),
  clothes: c => svg(
    '<path d="M60 20 q-6 0 -6 6 q0 5 6 6 v6" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M60 38 L18 56 h84Z" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linejoin="round"/>' +
    '<path d="M40 52 L26 62 L32 74 L40 70 V100 H80 V70 L88 74 L94 62 L80 52 Q70 58 60 58 Q50 58 40 52Z" fill="' + WHITE + '"/>' +
    '<path d="M60 58 v42" stroke="' + INK + '" stroke-width="1.5" opacity=".3"/><circle cx="60" cy="68" r="1.8" fill="' + INK + '"/><circle cx="60" cy="78" r="1.8" fill="' + INK + '"/><circle cx="60" cy="88" r="1.8" fill="' + INK + '"/>' +
    '<rect x="84" y="80" width="22" height="14" rx="3" fill="#ffbf1f" transform="rotate(-15 95 87)"/><circle cx="88" cy="86" r="2" fill="' + INK + '"/>', c),
  weather: c => svg(
    '<circle cx="42" cy="42" r="16" fill="#ffbf1f"/><g stroke="#ffbf1f" stroke-width="4" stroke-linecap="round"><path d="M42 16 v-6 M42 74 v-6 M16 42 h-6 M24 24 l-4 -4 M60 24 l4 -4 M24 60 l-4 4"/></g>' +
    '<path d="M44 78 q-14 0 -14 -12 q0 -12 14 -12 q4 -14 20 -14 q16 0 20 14 q14 0 14 12 q0 12 -14 12Z" fill="' + WHITE + '"/>' +
    '<g stroke="' + INK + '" stroke-width="4" stroke-linecap="round"><path d="M50 88 l-4 10 M66 88 l-4 10 M82 88 l-4 10"/></g>', c),
  hero: () =>
    '<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<circle cx="290" cy="60" r="70" fill="#ffffff" opacity=".18"/><circle cx="60" cy="210" r="60" fill="#ffffff" opacity=".12"/>' +
    '<rect x="20" y="196" width="320" height="10" rx="5" fill="' + INK + '" opacity=".25"/>' +
    '<g transform="translate(110 132) scale(2.1)">' + person(0, 0, SKIN1, INK).replace(/^<g transform="translate\(0 0\) scale\(1\)">/, "<g>") + '</g>' +
    '<g transform="translate(250 140) scale(1.9)">' + person(0, 0, SKIN2, "#e63946").replace(/^<g transform="translate\(0 0\) scale\(1\)">/, "<g>") + '</g>' +
    '<g transform="translate(12 22)"><rect width="128" height="46" rx="23" fill="' + WHITE + '"/><path d="M60 44 l-6 18 l22 -18z" fill="' + WHITE + '"/><text x="64" y="31" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" font-size="24" text-anchor="middle" fill="' + INK + '">Hello!</text></g>' +
    '<g transform="translate(206 36)"><rect width="140" height="46" rx="23" fill="' + INK + '"/><path d="M60 44 l-4 18 l20 -18z" fill="' + INK + '"/><text x="70" y="31" font-family="Bricolage Grotesque, Arial, sans-serif" font-weight="800" font-size="21" text-anchor="middle" fill="#ffbf1f">How are you?</text></g>' +
    '</svg>'
};
