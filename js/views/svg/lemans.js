/**
 * Circuit des 24 Heures du Mans (Circuit de la Sarthe) — tracé SIMPLIFIÉ, non à l'échelle, sens horaire.
 * Enchaînement : ligne droite des stands → pont Dunlop → Esses → Tertre Rouge → Hunaudières (2 chicanes)
 * → Mulsanne → Indianapolis → Arnage → courbes Porsche → Corvette → chicanes Ford → stands.
 * Coordonnées en km (x = est, y = sud, origine = ligne de départ), converties en unités SVG.
 */
const K = 125, OX = -0.35, OY = -1.55, PX = 175, PY = 45;
export const VIEW = { w: 640, h: 920 };

const P = (x, y, r = 0) => ({ x: (x - OX) * K + PX, y: (y - OY) * K + PY, r: r * K });

// Ligne droite des Hunaudières
const T = [2.05, -1.05];          // sortie Tertre Rouge
const U = [0.105, 0.9945];        // direction principale
const N = [0.9945, -0.105];       // normale
const L = (s, o = 0, r = 0) => P(T[0] + s * U[0] + o * N[0], T[1] + s * U[1] + o * N[1], r);

const chicane = (s) => [
  L(s - 0.38),
  L(s - 0.18, 0.11, 0.04),
  L(s + 0.18, -0.11, 0.04),
  L(s + 0.38)
];

const S = [
  /* S1 – Stands → Dunlop → Esses → Tertre Rouge */
  [
    P(0.00, 0.00),
    P(0.02, -0.48),
    P(0.06, -0.82, 0.16),          // entrée Dunlop
    P(0.18, -1.05, 0.20),          // Dunlop
    P(0.42, -1.18, 0.18),
    P(0.68, -1.12, 0.14),
    P(0.88, -1.28, 0.16),          // Esses
    P(1.15, -1.32, 0.18),
    P(1.48, -1.42, 0.20),
    P(1.82, -1.38, 0.22),
    P(2.05, -1.05, 0.14),          // Tertre Rouge
    L(0.35)
  ],

  /* S2 – Hunaudières + 2 chicanes */
  [
    L(0.35),
    ...chicane(1.95),              // 1ère chicane
    ...chicane(3.75),              // 2ème chicane
    L(5.05)
  ],

  /* S3 – Mulsanne → Indianapolis → Arnage */
  [
    L(5.05),
    P(2.68, 4.05, 0.18),           // entrée Mulsanne
    P(2.52, 4.22, 0.22),           // Virage de Mulsanne
    P(2.18, 4.32, 0.14),
    P(1.72, 4.38, 0.16),
    P(1.28, 4.28, 0.20),           // Indianapolis
    P(0.92, 4.12, 0.16),
    P(0.68, 3.88, 0.18),
    P(0.58, 3.52)                  // Arnage
  ],

  /* S4 – Courbes Porsche (la partie la plus caractéristique) */
  [
    P(0.58, 3.52),
    P(0.52, 3.15, 0.14),
    P(0.38, 2.78, 0.16),
    P(0.18, 2.48, 0.18),           // début des Porsche
    P(0.32, 2.18, 0.16),
    P(0.12, 1.92, 0.14),
    P(0.28, 1.65, 0.14),
    P(0.08, 1.38, 0.13),
    P(0.18, 1.12)
  ],

  /* S5 – Corvette → Ford → Stands */
  [
    P(0.18, 1.12),
    P(0.05, 0.88, 0.16),
    P(-0.02, 0.68, 0.12),
    P(-0.04, 0.52, 0.06),
    P(0.05, 0.40, 0.05),           // Ford chicanes
    P(-0.02, 0.28, 0.05),
    P(0.03, 0.16, 0.06),
    P(0.00, 0.00)
  ]
];

const f = (n) => n.toFixed(1);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const toward = (from, to, r) => {
  const k = r / dist(from, to);
  return { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
};

export function roundedPath(pts, withMove = true) {
  let d = withMove ? `M${f(pts[0].x)} ${f(pts[0].y)}` : '';
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1], b = pts[i], c = pts[i + 1];
    const r = Math.min(b.r || 0, dist(a, b) / 2, dist(b, c) / 2);
    if (!r) {
      d += `L${f(b.x)} ${f(b.y)}`;
      continue;
    }
    const p1 = toward(b, a, r), p2 = toward(b, c, r);
    d += `L${f(p1.x)} ${f(p1.y)}Q${f(b.x)} ${f(b.y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  const e = pts[pts.length - 1];
  return d + `L${f(e.x)} ${f(e.y)}`;
}

export const SECTOR_PATHS = S.map((pts) => roundedPath(pts));
export const FULL_PATH = roundedPath(S.flatMap((pts, i) => (i ? pts.slice(1) : pts)));

export const BADGES = [
  P(0.42, -1.58),   // S1
  P(2.95, 1.45),    // S2
  P(1.65, 4.72),    // S3
  P(0.75, 2.25),    // S4
  P(-0.48, 0.58)    // S5
];

export const CORNERS = [
  ['DUNLOP',       P(-0.22, -0.72), 'end'],
  ['ESSES',        P(0.95, -1.52),  'middle'],
  ['TERTRE ROUGE', P(2.25, -1.42),  'start'],
  ['MULSANNE',     P(2.82, 4.02),   'start'],
  ['INDIANAPOLIS', P(1.35, 4.55),   'middle'],
  ['ARNAGE',       P(0.52, 4.28),   'middle'],
  ['PORSCHE',      P(-0.12, 2.18),  'end'],
  ['FORD',         P(0.22, 0.38),   'start'],
];

export const START = P(0, 0);
export const STRAIGHT_LABEL = {
  at: L(2.85, 0.22),
  angle: Math.atan2(U[1], U[0]) * 180 / Math.PI
};