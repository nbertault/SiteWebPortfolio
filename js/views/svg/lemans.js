/**
 * CIRCUIT DES 24 HEURES DU MANS (CIRCUIT DE LA SARTHE)
 * Sens horaire.
 *
 * Ordre réel : Ligne droite des stands -> Dunlop -> Chapelle -> Esses
 * -> Tertre Rouge -> Hunaudières (chicane Daytona, chicane Michelin)
 * -> Mulsanne -> Indianapolis -> Arnage -> Porsche -> Corvette
 * -> Maison Blanche -> chicanes Ford -> Stands.
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
// S1 : DÉPART - DUNLOP - CHAPELLE - ESSES - TERTRE ROUGE
// ==========================================

const S1 = [      
  P(290, 500, 10),        
  P(210, 500, 10),
  P(170, 480, 12),        
  P(150, 460, 10),
  P(110, 415, 15),
  P(95, 420, 10),        
  P(75, 400, 20),
  P(55, 350, 20),
  P(30, 350, 20),
  P(20, 300, 5),
  P(75, 250, 12),
  P(78, 250,12),
];


// ==========================================
// S2 : TERTRE ROUGE - HUNAUDIÈRES - DAYTONA - MICHELIN - MULSANNE
// ==========================================

const S2 = [
  P(75, 250, 12),
  P(210, 190,12),
  P(240, 200,12),
  P(250, 180,12),
  P(405, 110,12),
  P(415, 90,12),
  P(435, 100,10),
  P(590, 30,15),
  P(680, 10, 10),
  P(700, 15,10),
  P(700, 26, 12)
];


// ==========================================
// S3 : INDIANAPOLIS - ARNAGE
// ==========================================

const S3 = [
  P(700, 25, 15),
  P(695, 105, 12),
  P(675, 220, 12),
  P(640, 290, 10),
  P(610, 300, 5),
  P(615, 340, 5),
  P(560, 345, 15),
  P(520, 370)
];


// ==========================================
// S4 : ARNAGE - COURBES PORSCHE - CORVETTE
// ==========================================

const S4 = [
  P(525, 368),
  P(495, 400, 15),
  P(470, 390, 15),
  P(450, 370, 15),
  P(435, 390, 15),
  P(440, 410, 15),
  P(430, 430, 15),
  P(400, 420, 15),
  P(396, 425, 15),
  P(394, 425, 10)
];


// ==========================================
// S5 : CORVETTE - MAISON BLANCHE - FORD - STANDS
// ==========================================

const S5 = [
  P(396, 425, 15),
  P(316, 475, 10),
  P(315, 483, 8),
  P(305, 490, 8),
  P(300, 505, 5),
  P(292, 500),
  P(290, 500) 
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
  P(200, 440),  // S1
  P(360, 170),  // S2
  P(680, 290),  // S3
  P(440, 340),  // S4
  P(320, 430)   // S5
];


// ==========================================
// VIRAGES
// ==========================================

export const CORNERS = [
  ['DUNLOP', P(140, 480), 'end'],
  ['CHAPELLE', P(50, 390), 'end'],
  ['ESSES', P(110, 350), 'end'],
  ['TERTRE ROUGE', P(-50, 300), 'middle'],

  ['DAYTONA', P(240, 230), 'middle'],
  ['MICHELIN', P(440, 140), 'middle'],
  ['MULSANNE', P(700, 0), 'middle'],

  ['INDIANAPOLIS', P(580, 270), 'middle'],
  ['ARNAGE', P(600, 370), 'start'],

  ['PORSCHE', P(500, 420), 'middle'],
  ['CORVETTE', P(460, 450), 'end'],
  ['MAISON BLANCHE', P(350, 400), 'middle'],
  ['FORD', P(300, 530), 'start']
];


// ==========================================
// DÉPART / ARRIVÉE
// ==========================================

export const START = P(290, 500);


// ==========================================
// LIGNE DROITE DES HUNAUDIÈRES
// ==========================================

export const STRAIGHT_LABEL = {
  at: P(320, 110),
  angle: -23};