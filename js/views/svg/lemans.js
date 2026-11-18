
/**
 * CIRCUIT DES 24 HEURES DU MANS
 * Reconstruction géométrique d'après l'image fournie.
 * Sens horaire.
 *
 * Coordonnées de référence : 688 x 634
 */

export const VIEW = { w: 688, h: 634 };

const P = (x, y, r = 0) => ({
  x,
  y,
  r
});

const f = n => n.toFixed(1);

const dist = (a, b) =>
  Math.hypot(a.x - b.x, a.y - b.y);

const toward = (from, to, r) => {
  const d = dist(from, to);
  if (!d) return { ...from };

  const k = Math.min(r / d, 0.5);

  return {
    x: from.x + (to.x - from.x) * k,
    y: from.y + (to.y - from.y) * k
  };
};

export function roundedPath(pts, withMove = true) {
  if (!pts || pts.length < 2) return "";

  let d = withMove
    ? `M${f(pts[0].x)} ${f(pts[0].y)}`
    : "";

  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const c = pts[i + 1];

    const r = Math.min(
      b.r || 0,
      dist(a, b) / 2,
      dist(b, c) / 2
    );

    if (!r) {
      d += `L${f(b.x)} ${f(b.y)}`;
      continue;
    }

    const p1 = toward(b, a, r);
    const p2 = toward(b, c, r);

    d += `L${f(p1.x)} ${f(p1.y)}`;
    d += `Q${f(b.x)} ${f(b.y)} ${f(p2.x)} ${f(p2.y)}`;
  }

  const e = pts[pts.length - 1];
  return d + `L${f(e.x)} ${f(e.y)}`;
}


// ==========================================
// S1 : DÉPART - DUNLOP - ESSES - TERTRE ROUGE
// ==========================================

const S1 = [
  P(246, 558),
  P(231, 539, 10),
  P(215, 519, 10),
  P(195, 504, 12),
  P(181, 486, 12),
  P(173, 466, 12),
  P(163, 449, 12),
  P(148, 431, 12),
  P(143, 408, 12),
  P(147, 385, 12),
  P(159, 369, 12),
  P(179, 360, 12),
  P(204, 358, 12),
  P(228, 362, 12),
  P(250, 357, 10)
];


// ==========================================
// S2 : TERTRE ROUGE - HUNAUDIÈRES - DAYTONA
// ==========================================

const S2 = [
  P(250, 357),
  P(272, 343),
  P(294, 325),
  P(316, 305),
  P(338, 284),
  P(358, 263),
  P(379, 241),
  P(400, 218),
  P(420, 195),
  P(439, 172),

  // Chicane Daytona
  P(433, 158, 8),
  P(423, 149, 8),
  P(424, 139, 8),
  P(441, 128, 8),

  // Remontée vers Michelin
  P(461, 112),
  P(480, 94),
  P(499, 75),
  P(512, 61),
  P(506, 52, 8),
  P(505, 44, 8),
  P(520, 37, 8)
];


// ==========================================
// S3 : MICHELIN - MULSANNE - INDIANAPOLIS - ARNAGE
// ==========================================

const S3 = [
  P(520, 37),
  P(540, 41),
  P(559, 45),
  P(579, 50),
  P(594, 69, 12),
  P(601, 91, 12),
  P(601, 112, 12),
  P(592, 135, 12),
  P(577, 156, 12),
  P(568, 180),
  P(559, 210),
  P(548, 241),
  P(535, 265),
  P(516, 284),
  P(494, 298),
  P(480, 310, 12),
  P(473, 326, 12),
  P(478, 342, 12),
  P(493, 353, 12),
  P(512, 357, 12),
  P(529, 329)
];


// ==========================================
// S4 : ARNAGE - PORSCHE - CORVETTE
// ==========================================

const S4 = [
  P(529, 329),
  P(520, 349, 10),
  P(507, 363, 10),
  P(489, 369, 10),
  P(469, 367, 10),
  P(450, 363, 10),
  P(431, 369, 10),
  P(413, 382, 10),
  P(393, 394, 10),
  P(374, 400, 10),
  P(354, 398, 10),
  P(336, 386, 10),
  P(319, 384, 10),
  P(301, 394, 10),
  P(283, 413, 10),
  P(267, 419, 10),
  P(251, 408, 10)
];


// ==========================================
// S5 : CORVETTE - MAISON BLANCHE - FORD - STANDS
// ==========================================

const S5 = [
  P(251, 408),
  P(260, 423, 10),
  P(251, 440, 10),
  P(249, 458, 10),
  P(258, 477, 10),
  P(273, 494, 10),
  P(284, 510, 10),
  P(281, 522, 10),
  P(265, 532, 10),
  P(254, 546, 10),
  P(246, 558)
];


// ==========================================
// EXPORT DES SECTEURS
// ==========================================

const S = [S1, S2, S3, S4, S5];

export const SECTOR_PATHS = S.map(pts =>
  roundedPath(pts)
);

export const FULL_PATH = roundedPath(
  S.flatMap((pts, i) =>
    i === 0 ? pts : pts.slice(1)
  )
);


// ==========================================
// BADGES
// ==========================================

export const BADGES = [
  P(166, 464),  // S1
  P(383, 215),  // S2
  P(562, 205),  // S3
  P(399, 431),  // S4
  P(231, 506)   // S5
];


// ==========================================
// VIRAGES
// ==========================================

export const CORNERS = [
  ['DUNLOP', P(164, 498), 'end'],
  ['CHAPELLE', P(117, 455), 'end'],
  ['ESSES', P(130, 414), 'end'],
  ['TERTRE ROUGE', P(190, 360), 'middle'],

  ['DAYTONA', P(473, 158), 'middle'],
  ['MICHELIN', P(560, 72), 'middle'],
  ['MULSANNE', P(564, 104), 'middle'],

  ['INDIANAPOLIS', P(514, 248), 'middle'],
  ['ARNAGE', P(495, 324), 'middle'],

  ['PORSCHE', P(400, 398), 'middle'],
  ['CORVETTE', P(236, 424), 'end'],
  ['MAISON BLANCHE', P(204, 476), 'middle'],
  ['FORD', P(292, 521), 'start']
];


// ==========================================
// DÉPART / ARRIVÉE
// ==========================================

export const START = P(246, 558);


// ==========================================
// LIGNE DROITE DES HUNAUDIÈRES
// ==========================================

export const STRAIGHT_LABEL = {
  at: P(327, 281),
  angle: -45
};
