/** Rétroviseur carbone d'après la photo de Nolhan, en croquis « dessiné à la main ».
 *  Effet main levée : filtre de déformation (feTurbulence) + trait doublé légèrement décalé.
 *  Dans la glace : le reflet de la passerelle Dunlop (24h du Mans). */
const HOUSING = 'M126 366C128 345 140 330 165 315C200 292 250 270 312 258C345 252 370 255 385 272C396 285 398 300 396 315L333 447C318 478 280 495 240 493C220 490 205 482 192 465C165 440 125 410 126 366Z';
const GLASS = 'M214 440C208 400 222 350 250 312C268 290 300 280 322 292C338 305 338 335 330 365L322 420C316 440 300 452 276 456C250 460 222 456 214 440Z';

export const MIRROR = `<svg class="bg-art" viewBox="70 10 500 520"><defs>
<filter id="sk1" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".028" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>
<filter id="sk2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="11"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>
<pattern id="cf" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><path d="M0 0H9M0 4.5H9" stroke="var(--accent)" stroke-width=".9" opacity=".5"/><path d="M0 0V9M4.5 0V9" stroke="var(--accent)" stroke-width=".9" opacity=".28"/></pattern>
<linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".5"/><stop offset="1" stop-color="var(--accent)" stop-opacity=".08"/></linearGradient>
<radialGradient id="fd" gradientUnits="userSpaceOnUse" cx="320" cy="280" r="290"><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient><mask id="fm" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="760"><rect width="640" height="760" fill="url(#fd)"/></mask>
<clipPath id="gl"><path d="${GLASS}"/></clipPath>
<g id="mArt" stroke-linecap="round" stroke-linejoin="round">
 <g class="ln" opacity=".3" stroke-width="1.6" stroke-dasharray="5 5"><path d="M102 180V60L140 30L240 22L276 60V180Z"/><path d="M118 80h30v30h-30zM170 80h30v30h-30zM222 80h30v30h-30zM118 130h30v30h-30zM170 130h30v30h-30zM222 130h30v30h-30z"/><path d="M60 245h40v22H60z"/></g>
 <g class="ln"><path d="M330 250L560 98M346 270L560 124"/>
  <path class="fa" d="M470 215L560 150V470L400 440Z"/><path d="M490 235l50-34M490 262l60-42M490 289l70-50M490 316l70-52M490 343l70-52" stroke-width="1" opacity=".6"/>
  <path d="M18 360C100 338 200 396 324 468L560 528"/><path d="M324 468C380 470 470 500 560 528" opacity="0"/>
  <path d="M290 480C380 540 470 600 560 690M310 470C410 530 500 590 560 640" opacity=".5"/>
  <path d="M120 462C126 560 118 640 130 720M142 470C150 560 140 640 152 720" opacity=".7"/><rect x="38" y="512" width="22" height="34" rx="9" opacity=".7"/>
  <path d="M232 520l-18 22M248 524l-18 22M264 528l-18 22M280 530l-18 22M296 530l-18 22M312 526l-18 22M328 520l-18 22" stroke-width="1" opacity=".55"/></g>
 <path class="ln fa" d="M392 285L474 200L494 204L474 282L454 362L350 450Z"/>
 <path class="ln" d="M440 232L418 330M455 224L432 340" stroke-width="1.2" opacity=".6"/>
 <path class="ln" d="M474 200L496 190L506 206L494 214" stroke-width="2"/>
 <path class="ln" d="${HOUSING}" style="fill:url(#cf)" stroke-width="3.4"/>
 <path class="ln" d="M142 340C175 305 235 280 300 266" stroke-width="6" opacity=".32"/><path class="ln" d="M170 420C158 400 150 385 146 365" stroke-width="3" opacity=".3"/>
 <path class="ln" d="M214 440C210 404 222 352 250 314C268 292 300 282 322 294C338 307 338 335 330 365L322 420C316 440 300 452 276 456C250 460 222 456 214 440Z" style="fill:color-mix(in srgb,var(--bg) 85%,var(--accent))" stroke-width="6"/>
 <g clip-path="url(#gl)"><rect x="205" y="280" width="140" height="190" fill="url(#sk)"/>
  <g class="ln" stroke-width="1.8"><path d="M205 393Q222 384 240 392T276 390T312 392T348 388" class="fa"/><path class="fa" d="M222 470L274 392H278L334 470Z"/><path d="M276 392V470" stroke-dasharray="6 7"/>
   <path d="M232 470L272 392M326 470L282 392" stroke-width="3"/><path class="fa" d="M228 372H328V382H228Z"/><path class="fa" d="M230 382V398M326 382V398"/><path class="fa" d="M228 372Q278 322 328 372"/><path d="M244 352V372M262 338V372M278 334V372M294 338V372M312 352V372" stroke-width="1"/></g>
  <text x="278" y="381" text-anchor="middle" font-size="6.5" font-weight="800" letter-spacing="2.4" fill="var(--accent)">DUNLOP</text>
  <path d="M232 292L262 292L226 460H214Z" fill="#fff" opacity=".12"/></g>
 <path class="ln" d="M250 316C262 300 282 292 304 296" stroke-width="2" opacity=".5"/>
 <g class="ln" opacity=".5" stroke-width="1.2"><path d="M96 560H140M118 540V580"/><path d="M420 600H460M440 580V620"/></g>
</g></defs>
<g mask="url(#fm)"><use href="#mArt" filter="url(#sk1)"/><use href="#mArt" filter="url(#sk2)" transform="translate(1.6 -1.3)" opacity=".4"/></g></svg>`;
