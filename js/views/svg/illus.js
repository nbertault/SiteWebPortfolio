/**
 * Illustrations « schéma technique » de remplacement (une par type de bloc).
 * Utilisées tant qu'aucune image n'est fournie dans content.json ; elles prennent la couleur d'accent de la page.
 * Types : wheel · pcb · chip · box · doc · robot · drone · plan
 */
const wrap = (inner) => `<svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <g class="il-bg">${inner}</g>
  <path class="il-mark" d="M24 150h14M362 150h14M200 18v14M200 268v14"/><circle class="il-mark" cx="200" cy="150" r="3"/></svg>`;
const F = 'fill="currentColor" fill-opacity=".1"';

const pins = (x, y, w, h, n) => {            // broches d'un circuit intégré
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = x + (w / (n + 1)) * (i + 1), b = y + (h / (n + 1)) * (i + 1);
    d += `M${a} ${y}v-12M${a} ${y + h}v12M${x} ${b}h-12M${x + w} ${b}h12`;
  }
  return d;
};

export const ILLUS = {
  wheel: wrap(`<circle cx="200" cy="150" r="92" stroke-width="12" ${F}/><circle cx="200" cy="150" r="26" ${F}/>
    <path d="M110 150h64M226 150h64M200 176v66"/>
    <g stroke-width="0" fill="currentColor"><circle cx="128" cy="86" r="5" opacity=".35"/><circle cx="152" cy="70" r="5" opacity=".5"/><circle cx="176" cy="60" r="5" opacity=".65"/><circle cx="200" cy="57" r="5" opacity=".8"/><circle cx="224" cy="60" r="5" opacity=".9"/><circle cx="248" cy="70" r="5"/><circle cx="272" cy="86" r="5"/></g>
    <circle cx="140" cy="196" r="9"/><circle cx="260" cy="196" r="9"/><rect x="186" y="104" width="28" height="14" rx="3"/>`),
  pcb: wrap(`<rect x="56" y="84" width="288" height="132" rx="8" ${F}/>
    <circle cx="74" cy="102" r="6"/><circle cx="326" cy="102" r="6"/><circle cx="74" cy="198" r="6"/><circle cx="326" cy="198" r="6"/>
    <rect x="150" y="120" width="72" height="60" rx="3"/><path d="${pins(150, 120, 72, 60, 4)}"/>
    <rect x="256" y="132" width="52" height="36" rx="3"/><path d="M92 128h34v-14h22M92 150h46M92 172h34v14h22M222 140h34M222 160h34M308 150h22l8 10"/>
    <circle cx="118" cy="128" r="3"/><circle cx="118" cy="172" r="3"/><rect x="332" y="138" width="10" height="24" rx="2"/>
    <path d="M70 216v16h58M96 216v8" opacity=".6"/>`),
  chip: wrap(`<rect x="120" y="80" width="160" height="140" rx="8" ${F}/><path d="${pins(120, 80, 160, 140, 6)}"/>
    <circle cx="142" cy="102" r="5"/><path d="M160 150h80M160 168h50" opacity=".6"/>`),
  box: wrap(`<path d="M200 74 312 122 200 170 88 122Z" ${F}/><path d="M88 122v78l112 50V170Z" ${F}/><path d="M312 122v78l-112 50V170Z" ${F}/>
    <path d="M88 150l112 50 112-50M88 178l112 50 112-50" opacity=".4" stroke-dasharray="3 6"/><circle cx="200" cy="122" r="12"/><path d="M164 106l72 32" opacity=".5"/>`),
  doc: wrap(`<path d="M132 62h104l40 40v136H132Z" ${F}/><path d="M236 62v40h40"/><path d="M156 128h92M156 150h92M156 172h60"/>
    <rect x="156" y="196" width="22" height="26" rx="2"/><rect x="186" y="186" width="22" height="36" rx="2"/><rect x="216" y="176" width="22" height="46" rx="2"/>`),
  robot: wrap(`<g><rect x="156" y="116" width="88" height="82" rx="14" ${F}/><rect x="170" y="78" width="60" height="38" rx="8"/><path d="M200 78V60M190 60h20"/><circle cx="186" cy="97" r="5"/><circle cx="214" cy="97" r="5"/><circle cx="176" cy="212" r="12"/><circle cx="224" cy="212" r="12"/><path d="M172 150h56"/></g>
    <g transform="translate(-92 56) scale(.62)"><rect x="156" y="116" width="88" height="82" rx="14" ${F}/><rect x="170" y="78" width="60" height="38" rx="8"/><circle cx="186" cy="97" r="5"/><circle cx="214" cy="97" r="5"/><circle cx="176" cy="212" r="12"/><circle cx="224" cy="212" r="12"/></g>
    <g transform="translate(150 56) scale(.62)"><rect x="156" y="116" width="88" height="82" rx="14" ${F}/><rect x="170" y="78" width="60" height="38" rx="8"/><circle cx="186" cy="97" r="5"/><circle cx="214" cy="97" r="5"/><circle cx="176" cy="212" r="12"/><circle cx="224" cy="212" r="12"/></g>
    <path d="M120 232q40-26 80-4t80 4" stroke-dasharray="4 7" opacity=".5"/>`),
  drone: wrap(`<ellipse cx="200" cy="150" rx="16" ry="86" ${F}/><path d="M184 130 60 150l124 24M216 130l124 20-124 24" ${F}/><path d="M200 222v26M176 248h48"/>
    <path d="M112 112 188 134M288 112l-76 22M112 200l76-30M288 200l-76-30" opacity=".6"/>
    <circle cx="106" cy="104" r="26"/><circle cx="294" cy="104" r="26"/><circle cx="106" cy="206" r="26"/><circle cx="294" cy="206" r="26"/>
    <path d="M92 104h28M106 90v28M280 104h28M294 90v28M92 206h28M106 192v28M280 206h28M294 192v28" opacity=".5"/>`),
  plan: wrap(`<rect x="96" y="82" width="208" height="136" rx="6" ${F}/><circle cx="200" cy="150" r="40"/><path d="M96 238h208M96 230v16M304 230v16M330 82v136M322 82h16M322 218h16" opacity=".6"/>
    <path d="M96 82l208 136M304 82 96 218" opacity=".25"/>`),
};
export const illus = (kind) => ILLUS[kind] || ILLUS.plan;
