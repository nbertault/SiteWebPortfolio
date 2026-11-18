/**
 * Modèle : temps par secteur (phases) de chaque projet, avec couleurs façon chronométrage.
 *  - violet : le meilleur temps de chaque secteur (toutes les égalités)
 *  - jaune  : temps inférieur à la moyenne de son secteur
 *  - vert   : autres temps
 */
export function computeTimings(projects) {
  const cols = [0, 1, 2].map((i) => projects.map((p) => p.sectors?.[i]?.weeks ?? null));

  // Moyenne et meilleur temps calculés indépendamment pour chaque secteur.
  const stats = cols.map((col) => {
    const values = col.filter((value) => value > 0);
    return {
      average: values.length
        ? Math.ceil(values.reduce((sum, value) => sum + value, 0) / values.length)
        : Infinity,
      best: values.length ? Math.min(...values) : null,
    };
  });

  const rows = projects.map((project, projectIndex) => ({
    sectors: [0, 1, 2].map((sectorIndex) => {
      const weeks = cols[sectorIndex][projectIndex];
      if (!(weeks > 0)) return { weeks: null, color: 'none' };

      const { average, best } = stats[sectorIndex];
      const color = weeks === best
        ? 'purple'
        : weeks <= average
          ? 'green'
          : 'yellow';

      return { weeks, color };
    }),
  }));

  rows.forEach((row) => {
    const weeks = row.sectors.map((sector) => sector.weeks).filter((value) => value > 0);
    row.total = weeks.length ? weeks.reduce((sum, value) => sum + value, 0) : null;
  });

  return rows;
}

export const fmtWeeks = (weeks, unit) => (weeks == null ? '—' : `${weeks} ${unit}`);
