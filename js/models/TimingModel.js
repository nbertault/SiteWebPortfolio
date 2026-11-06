/**
 * Modèle : temps par secteur (phases) de chaque projet, avec couleurs façon chronométrage.
 *  - violet : le meilleur temps de TOUT le tableau (un seul, le premier en cas d'égalité)
 *  - vert   : secteur sous (ou égal à) la médiane de sa colonne
 *  - jaune  : secteur au-dessus
 * Une couleur peut être forcée dans content.json : { "weeks": 6, "color": "green" }.
 */
export function computeTimings(projects) {
  const cols = [0, 1, 2].map((i) => projects.map((p) => p.sectors?.[i]?.weeks ?? null));
  const valid = cols.flat().filter((v) => v > 0);
  const best = valid.length ? Math.min(...valid) : null;
  const median = cols.map((c) => {
    const v = c.filter((x) => x > 0).sort((a, b) => a - b), m = Math.floor(v.length / 2);
    return v.length ? (v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2) : Infinity;
  });

  const rows = projects.map((p, pi) => ({
    sectors: [0, 1, 2].map((i) => {
      const w = cols[i][pi];
      if (!(w > 0)) return { weeks: null, color: 'none' };
      return { weeks: w, color: p.sectors[i].color || (w <= median[i] ? 'green' : 'yellow') };
    }),
  }));

  // un seul violet : celui forcé en premier, sinon le meilleur temps global
  const cells = rows.flatMap((r) => r.sectors);
  let purple = cells.find((c) => c.color === 'purple') || cells.find((c) => c.weeks === best);
  cells.forEach((c) => { if (c.color === 'purple' && c !== purple) c.color = 'green'; });
  if (purple) purple.color = 'purple';

  rows.forEach((r) => {
    const ws = r.sectors.map((s) => s.weeks).filter(Boolean);
    r.total = ws.length ? ws.reduce((a, b) => a + b, 0) : null;
  });
  return rows;
}

export const fmtWeeks = (w, unit) => (w == null ? '—' : `${w} ${unit}`);
