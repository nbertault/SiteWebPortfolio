/**
 * Circuit des 24 Heures du Mans (Circuit de la Sarthe) — tracé SIMPLIFIÉ, non à l'échelle, sens horaire.
 * Enchaînement : ligne droite des stands → pont Dunlop → Esses → Tertre Rouge → Hunaudières (2 chicanes)
 * → Mulsanne → Indianapolis → Arnage → courbes Porsche → Corvette → chicanes Ford → stands.
 * Coordonnées en km (x = est, y = sud, origine = ligne de départ), converties en unités SVG.
 */
const K = 130, OX = -0.1, OY = -1.45, PX = 150, PY = 50;
export const VIEW = { w: 640, h: 900 };

const P = (x, y, r = 0) => ({ x: (x - OX) * K + PX, y: (y - OY) * K + PY, r: r * K });

// Ligne droite des Hunaudières : part de Tertre Rouge (T), direction U, normale N
const T = [1.95, -0.95], U = [0.12, 0.993], N = [0.993, -0.12];
const L = (s, o = 0, r = 0) => P(T[0] + s * U[0] + o * N[0], T[1] + s * U[1] + o * N[1], r);
const chicane = (s) => [L(s - 0.32), L(s - 0.1, 0.1, 0.05), L(s + 0.1, -0.1, 0.05), L(s + 0.32)];

// 5 secteurs (les points de jonction sont sur des lignes droites, donc raccord parfait)
const S = [
  /* S1 stands · Dunlop · Esses · Tertre Rouge */
  [
    P(0, 0),
    P(0.02, -0.55),
    P(0.08, -0.88, 0.18),
    P(0.28, -1.05, 0.22),   // Dunlop
    P(0.55, -1.18, 0.18),
    P(0.78, -1.08, 0.16),
    P(0.95, -1.22, 0.14),   // Esses
    P(1.25, -1.28, 0.18),
    P(1.55, -1.38, 0.22),
    P(1.85, -1.32, 0.25),
    P(1.95, -0.95, 0.12),   // Tertre Rouge
    L(0.45)
  ],
  /* S2 Hunaudières + 2 chicanes */
  [
    L(0.45),
    ...chicane(1.85),       // 1ère chicane
    ...chicane(3.55),       // 2ème chicane
    L(4.75)
  ],
  /* S3 Mulsanne · Indianapolis · Arnage */
  [
    L(4.75),
    P(2.55, 4.18, 0.22),    // Virage de Mulsanne
    P(2.15, 4.28, 0.12),
    P(1.55, 4.32, 0.18),
    P(1.15, 4.22, 0.20),    // Indianapolis
    P(0.75, 4.08, 0.16),
    P(0.55, 3.85, 0.18),
    P(0.52, 3.45)           // Arnage
  ],
  /* S4 courbes Porsche */
  [
    P(0.52, 3.45),
    P(0.48, 3.05, 0.14),
    P(0.42, 2.65, 0.16),
    P(0.22, 2.35, 0.18),
    P(0.38, 2.05, 0.16),
    P(0.18, 1.75, 0.14),
    P(0.32, 1.45, 0.14),
    P(0.14, 1.12)
  ],
  /* S5 Corvette · chicanes Ford · stands */
  [
    P(0.14, 1.12),
    P(0.02, 0.85, 0.18),
    P(-0.04, 0.62, 0.12),
    P(-0.02, 0.48, 0.06),
    P(0.06, 0.38, 0.05),    // Ford chicanes
    P(-0.02, 0.28, 0.05),
    P(0.02, 0.18, 0.06),
    P(0, 0)
  ],
];

const f = (n) => n.toFixed(1);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const toward = (from, to, r) => {
  const k = r / dist(from, to);
  return { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
};

/** Polyligne aux angles arrondis (rayon par sommet) : les lignes droites restent droites. */
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

/** Pastilles « S1 … S5 » posées à côté de chaque secteur */
export const BADGES = [
  P(0.35, -1.55),
  P(2.85, 1.35),
  P(1.55, 4.75),
  P(0.85, 2.15),
  P(-0.45, 0.65)
];

/** Noms de virages (mêmes dans les deux langues) : texte, position, ancrage */
export const CORNERS = [
  ['DUNLOP', P(-0.15, -0.70), 'end'],
  ['ESSES', P(0.95, -1.48), 'middle'],
  ['TERTRE ROUGE', P(2.15, -1.38), 'start'],
  ['MULSANNE', P(2.75, 4.05), 'start'],
  ['INDIANAPOLIS', P(1.35, 4.55), 'middle'],
  ['ARNAGE', P(0.55, 4.35), 'middle'],
  ['PORSCHE', P(-0.05, 2.15), 'end'],
  ['FORD', P(0.20, 0.42), 'start'],
];

export const START = P(0, 0);
export const STRAIGHT_LABEL = {
  at: L(2.7, 0.22),
  angle: Math.atan2(U[1], U[0]) * 180 / Math.PI
};