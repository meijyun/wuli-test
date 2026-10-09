/* 30 題手繪風情境插圖（SVG doodle：紙底＋墨線＋淡彩，與題目情境對應） */
(function(){
const INK = "#4a4438";
const S = (inner, bg) => `<svg viewBox="0 0 400 240" role="img" aria-hidden="true"><rect width="400" height="240" rx="14" fill="${bg||"#fbf6ea"}"/><g fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
const person = (x,y,s,skin) => `<circle cx="${x}" cy="${y}" r="${16*s}" fill="${skin||"#ffe4c4"}" stroke="${INK}" stroke-width="3.5"/><path d="M${x} ${y+16*s} v${60*s} M${x} ${y+33*s} l${-25*s} ${15*s} M${x} ${y+33*s} l${25*s} ${15*s} M${x} ${y+76*s} l${-18*s} ${40*s} M${x} ${y+76*s} l${18*s} ${40*s}"/>`;

window.Q_ART = {
// ---- 專注力 ----
f1: S(`<rect x="150" y="25" width="225" height="190" fill="#f3ead6"/>
<rect x="168" y="45" width="58" height="66" transform="rotate(-6 168 45)" fill="#ffd9a0"/>
<rect x="242" y="42" width="58" height="66" transform="rotate(5 242 42)" fill="#bfe3c6"/>
<rect x="168" y="125" width="58" height="62" transform="rotate(4 168 125)" fill="#cfe0f5"/>
<rect x="242" y="122" width="58" height="62" transform="rotate(-5 242 122)" fill="#f5c6c6"/>
<path d="M190 78 l7 14 15 2 -11 11 3 15 -14 -7 -14 7 3 -15 -11 -11 15 -2 z" fill="#fff"/>
<circle cx="272" cy="76" r="10" fill="#fff"/><path d="M272 66 v20 M262 76 h20"/>
${person(75,80,1)}<path d="M95 95 l40 -10"/>`),
f2: S(`<circle cx="200" cy="110" r="70" fill="#fff"/>
<path d="M200 110 V60 M200 110 l38 22"/><circle cx="200" cy="110" r="6" fill="${INK}"/>
<path d="M60 190 q40 -25 80 0 t80 0 t80 0" stroke-dasharray="8 8"/>
<path d="M310 60 l30 -18 M310 60 l24 8 M310 60 l6 26" /><circle cx="322" cy="42" r="12" fill="#ffd9a0"/>`),
f3: S(`<circle cx="150" cy="100" r="48" fill="#ffe9a8"/><path d="M150 72 l9 18 20 3 -14 14 3 20 -18 -9 -18 9 3 -20 -14 -14 20 -3 z" fill="#fff"/>
<path d="M120 160 l-18 45 M180 160 l18 45"/>
<rect x="240" y="70" width="110" height="90" rx="10" fill="#fff"/><path d="M258 105 h74 M258 125 h52"/>
<path d="M330 145 l6 6 12 -14" stroke="#4a7c59" stroke-width="5"/>`),
f4: S(`<rect x="60" y="60" width="150" height="110" rx="8" fill="#fff"/><path d="M80 90 h110 M80 110 h110 M80 130 h70"/>
<path d="M250 90 q30 -18 55 0" /><circle cx="250" cy="110" r="14" fill="#cfe0f5"/><circle cx="305" cy="110" r="14" fill="#cfe0f5"/>
<path d="M264 110 h27 M250 140 q27 18 55 0" stroke-dasharray="6 7"/>
<path d="M120 190 h160" stroke-dasharray="4 8"/>`),
f5: S(`<circle cx="120" cy="120" r="55" fill="#f5c6c6"/><path d="M95 120 h50 M120 95 v50"/>
<path d="M250 60 q40 10 30 60 q-8 45 -50 50" /><circle cx="282" cy="62" r="10" fill="#bfe3c6"/>
<path d="M270 130 q10 -25 35 -28 M285 118 l14 -3 M282 130 l13 5" stroke="#4a7c59"/>
<path d="M320 180 q-25 8 -45 -5" stroke-dasharray="6 6"/>`),
f6: S(`<rect x="60" y="160" width="80" height="34" fill="#ffd9a0"/><rect x="150" y="120" width="80" height="34" fill="#bfe3c6"/><rect x="240" y="80" width="80" height="34" fill="#cfe0f5"/>
<path d="M100 160 v-14 h50 v-12 h90 v-12 h80" stroke-dasharray="10 7"/>
${person(345,120,.8)}<path d="M330 100 l-25 -25" />`),
// ---- 恆毅力 ----
h1: S(`<rect x="50" y="50" width="150" height="140" rx="8" fill="#fff"/><path d="M50 85 h150 M90 50 v35 M160 50 v35"/>
<path d="M230 90 h90 M245 120 h60" /><path d="M235 150 h80 l-14 -14 M235 150 l-14 14" stroke="#4a7c59" stroke-width="5" transform="translate(0,0)"/>
<text x="248" y="112" font-size="26" fill="${INK}" stroke="none" text-anchor="middle" font-family="serif">70→85</text>`),
h2: S(`<rect x="60" y="60" width="110" height="70" rx="8" fill="#ffd9a0"/><rect x="190" y="110" width="110" height="70" rx="8" fill="#fff" transform="rotate(-4 190 110)"/>
<path d="M90 95 h50 M220 140 h50" /><path d="M300 60 q30 20 10 55 q-15 25 -50 20" stroke-dasharray="8 7"/>
<path d="M310 180 l-12 -2 l4 -12" stroke="#4a7c59" stroke-width="5"/>`),
h3: S(`${person(120,90,.9)}<path d="M160 130 h90" stroke-dasharray="10 8"/>
<path d="M260 100 v60" stroke="#c96f3f" stroke-width="5"/><path d="M260 100 h60 l-12 12 h-48" fill="#c96f3f"/>
<path d="M90 190 q30 12 60 0" />`),
h4: S(`<rect x="55" y="60" width="140" height="110" rx="8" fill="#fff"/><path d="M75 95 h100 M75 115 h100 M75 135 h60"/>
<rect x="215" y="60" width="130" height="110" rx="8" fill="#eef4ec"/><path d="M235 100 l12 12 24 -28" stroke="#4a7c59" stroke-width="5"/><path d="M235 140 h80"/>`),
h5: S(`<circle cx="130" cy="115" r="48" fill="#fff"/><path d="M105 115 h50 M130 90 v50"/>
${person(280,85,.9)}<path d="M240 120 l-60 10" stroke-dasharray="7 7"/>
<path d="M90 190 h220" stroke-dasharray="4 8"/>`),
h6: S(`<path d="M120 60 h80 v25 q0 45 -40 60 q-40 -15 -40 -60 z" fill="#ffe9a8"/>
<path d="M160 145 l-20 45 M160 145 l20 45" /><path d="M250 150 q10 -30 40 -35 M265 140 l18 -4 M262 155 l17 6" stroke="#4a7c59"/>
<path d="M100 200 h200" stroke-dasharray="4 8"/>`),
// ---- 爆發力 ----
e1: S(`${person(200,110,1)}<path d="M120 40 l40 50 M280 40 l-40 50" stroke="#c96f3f" stroke-width="5"/>
<circle cx="110" cy="35" r="12" fill="#ffe9a8"/><circle cx="290" cy="35" r="12" fill="#ffe9a8"/>
<path d="M100 200 h200" />`),
e2: S(`<rect x="120" y="120" width="160" height="70" rx="8" fill="#f3ead6"/><rect x="150" y="80" width="100" height="50" rx="6" fill="#fff"/><path d="M165 100 h70 M165 114 h45"/>
<path d="M200 80 v-25" /><circle cx="200" cy="45" r="12" fill="#ffe9a8"/>
<path d="M60 60 q-15 60 0 130 M340 60 q15 60 0 130" stroke-dasharray="6 8"/>`),
e3: S(`<circle cx="300" cy="60" r="30" fill="#ffe9a8"/><path d="M282 60 q18 -18 36 0 q-18 18 -36 0" fill="#fbf6ea"/>
<rect x="60" y="130" width="180" height="60" rx="30" fill="#cfe0f5"/><circle cx="95" cy="160" r="14" fill="#fff"/>
<path d="M270 150 q30 -20 60 0 q-30 8 -60 0 M270 170 q30 -20 60 0" />`),
e4: S(`${person(90,100,.85)}${person(200,90,1)}${person(310,100,.85)}<path d="M200 40 v-18 M188 30 l12 -12 12 12" stroke="#c96f3f" stroke-width="5"/>
<path d="M70 195 h260" /><path d="M150 195 l20 -25 M250 195 l-20 -25" stroke-dasharray="6 6"/>`),
e5: S(`<rect x="80" y="100" width="150" height="80" rx="8" fill="#ffd9a0"/><path d="M80 100 h150 l-20 -30 h-110 z" fill="#f3ead6"/>
<path d="M280 120 h50 l15 20 h-65 z" fill="#fff"/><circle cx="345" cy="130" r="8" fill="#fff"/>
<path d="M100 200 q80 15 160 0" stroke-dasharray="6 7"/>`),
e6: S(`<circle cx="140" cy="120" r="50" fill="#fff"/><circle cx="140" cy="120" r="18" fill="#f3ead6"/>
<path d="M140 70 v-20 M140 170 v20 M90 120 h-20 M190 120 h20 M105 85 l-14 -14 M175 85 l14 -14 M105 155 l-14 14 M175 155 l14 14"/>
${person(300,100,.9)}<path d="M205 130 l55 -10" stroke-dasharray="7 7" stroke="#4a7c59" stroke-width="5"/>`),
// ---- 穩定力 ----
s1: S(`${person(200,105,1)}<path d="M120 190 h160" />
<path d="M290 60 q25 20 0 45 q-25 25 -50 0 q-25 -25 0 -45 q15 -15 25 -15 q10 0 25 15" fill="#f5c6c6"/>
<path d="M110 50 q10 25 0 50 M135 50 q10 25 0 50" />`),
s2: S(`<rect x="70" y="90" width="60" height="90" rx="30" fill="#fff"/><circle cx="100" cy="75" r="22" fill="#cfe0f5"/>
<path d="M170 80 h150 M170 105 h150 M170 130 h100" />
<path d="M170 155 l12 12 24 -28" stroke="#4a7c59" stroke-width="5"/><path d="M215 168 h100" />`),
s3: S(`<rect x="50" y="50" width="140" height="140" rx="8" fill="#fff"/><path d="M70 85 h100 M70 105 h100 M70 125 h60"/>
<circle cx="290" cy="90" r="45" fill="#fff"/><path d="M290 90 V62 M290 90 l24 14"/>
<path d="M230 180 q30 15 60 0 q30 -15 60 0" stroke-dasharray="8 7"/>`),
s4: S(`${person(100,100,.9)}${person(300,100,.9)}<path d="M140 150 q60 40 120 0" stroke="#4a7c59" stroke-width="5"/>
<path d="M170 165 v-20 M200 172 v-22 M230 165 v-20" />`),
s5: S(`<path d="M150 60 q30 35 0 70 q-25 30 -55 10 q-25 -18 -15 -45 q8 -25 35 -32 q20 -6 35 -3" fill="#cfe0f5"/>
<rect x="230" y="120" width="80" height="60" rx="8" fill="#fff"/><path d="M250 145 h40" />
${person(330,120,.7)}`),
s6: S(`<rect x="60" y="70" width="90" height="60" rx="8" fill="#fff" transform="rotate(-8 60 70)"/><rect x="170" y="70" width="90" height="60" rx="8" fill="#ffd9a0" transform="rotate(6 170 70)"/>
<path d="M275 100 h60 l-14 -14 M275 100 l-14 14" stroke="#4a7c59" stroke-width="5"/>
<path d="M120 60 v-25" /><path d="M108 40 h24 l-12 -18 z" fill="#c96f3f"/>`),
// ---- 孤獨力 ----
l1: S(`<rect x="60" y="150" width="180" height="22" rx="8" fill="#c9a87a"/><path d="M80 172 v30 M220 172 v30"/>
<circle cx="300" cy="120" r="28" fill="#fff"/><path d="M285 120 q15 -18 30 0 M285 120 q15 18 30 0 M300 105 v30 M285 120 h30"/>
<rect x="255" y="165" width="90" height="45" rx="6" fill="#fff"/><path d="M265 182 h70 M265 194 h45"/>`),
l2: S(`<circle cx="200" cy="150" r="55" fill="#ffd9a0"/><path d="M130 150 h-30 M270 150 h30 M200 80 v-30" stroke="#c96f3f" stroke-width="5"/>
<path d="M120 195 q80 20 160 0" /><path d="M150 185 l25 8 M250 185 l-25 8" stroke-dasharray="5 6"/>
<circle cx="200" cy="150" r="12" fill="#fff"/>`),
l3: S(`<rect x="80" y="80" width="110" height="100" rx="8" fill="#fff"/><path d="M80 95 l55 40 55 -40"/>
<path d="M150 60 l25 25 M175 60 l-25 25" stroke="#a33" stroke-width="5"/>
<path d="M250 150 q10 -30 40 -35 M265 140 l18 -4" stroke="#4a7c59"/>`),
l4: S(`<path d="M60 200 q60 -120 140 -120" stroke-dasharray="10 8"/><path d="M60 200 q100 -40 200 -20" />
<circle cx="205" cy="75" r="14" fill="#bfe3c6"/>${person(300,120,.8)}
<rect x="40" y="150" width="70" height="45" rx="6" fill="#fff"/><path d="M50 168 h50"/>`),
l5: S(`${person(130,120,.95)}<path d="M130 60 v-30" /><circle cx="280" cy="80" r="30" fill="#ffe9a8"/>
<path d="M280 62 v10 M280 98 v4" /><path d="M265 80 h-12 M295 80 h12" />
<path d="M280 50 q-25 0 -25 28" stroke-dasharray="5 6"/><text x="280" y="90" font-size="30" fill="${INK}" stroke="none" text-anchor="middle" font-family="serif">?</text>`),
l6: S(`<rect x="60" y="110" width="120" height="80" rx="8" fill="#fff"/><path d="M110 110 v-25 h20 v25" /><text x="120" y="165" font-size="34" fill="${INK}" stroke="none" text-anchor="middle" font-family="serif">B</text>
${person(290,110,.9)}<path d="M250 70 q30 -15 60 -5" stroke-dasharray="6 6"/>
<rect x="215" y="170" width="130" height="36" rx="18" fill="#eef4ec"/><path d="M230 188 h100"/>`)
};
})();
