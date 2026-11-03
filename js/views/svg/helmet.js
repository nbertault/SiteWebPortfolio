/** Casque intégral de course, profil gauche (visière vers la gauche), style schéma technique. */
const SHELL = 'M400 424C440 414 468 392 478 340C492 270 482 190 420 132C370 90 290 76 214 86C150 96 112 134 98 186C92 214 90 236 88 262C80 290 62 330 62 370C62 404 80 426 112 434C150 442 200 442 210 440L340 436Z';

export const HELMET = `<svg class="bg-art" viewBox="0 0 560 520"><defs><path id="shell" d="${SHELL}"/></defs>
<g class="ln" stroke-width="1.6">
 <!-- axes & cotes -->
 <path class="dash" d="M40 262H540M280 50V470"/>
 <path d="M76 486H478M76 478V494M478 478V494M72 486l10-4v8zM482 486l-10-4v8z"/>
 <path d="M528 82V438M520 82H536M520 438H536M528 82l-3 10h6zM528 438l-3-10h6z"/>
 <!-- ouate / calotte interne -->
 <use href="#shell" class="dash" transform="translate(23 22) scale(.92)"/>
 <!-- coque -->
 <use href="#shell" class="fa" stroke-width="3.4"/>
 <!-- bande de livrée -->
 <path style="fill:color-mix(in srgb,var(--accent) 38%,transparent)" stroke-width="1.6" d="M214 82C320 106 410 150 462 232L440 240C395 168 310 128 196 98Z"/>
 <path d="M188 112C302 142 387 182 432 254M180 126C294 156 379 196 424 268M172 140C286 170 371 210 416 282" stroke-width="1.4" opacity=".7"/>
 <!-- prise d'air supérieure -->
 <path style="fill:color-mix(in srgb,var(--accent) 65%,#000)" stroke-width="2" d="M214 98L252 90L262 112L224 120Z"/><path d="M226 106L248 101M229 113L252 108" stroke-width="1" opacity=".6"/>
 <path style="fill:color-mix(in srgb,var(--accent) 65%,#000)" stroke-width="2" d="M286 92L330 98L336 124L296 120Z"/>
 <!-- visière + ouverture -->
 <path style="fill:color-mix(in srgb,var(--accent) 55%,#000)" stroke-width="2.6" d="M96 198C150 176 238 172 312 186C334 190 340 226 336 256C330 286 306 300 270 302C200 304 130 302 96 292C74 286 74 226 96 198Z"/>
 <path class="dash" d="M108 210C154 192 232 188 302 200C318 204 322 228 318 252C312 274 296 286 268 288C200 290 140 288 106 280C90 276 90 228 108 210Z"/>
 <path d="M130 214C170 202 230 198 280 206M124 232C170 222 232 220 296 228" stroke-width="1" opacity=".55"/>
 <path d="M96 292L72 292Q64 292 66 284L72 246Q74 240 82 240L96 246" stroke-width="2"/>
 <!-- charnière visière -->
 <path class="fa" stroke-width="2.4" d="M330 200H376Q402 200 402 226V262Q402 288 376 288H330Z"/>
 <circle cx="368" cy="244" r="24" stroke-width="2.4"/><circle cx="368" cy="244" r="15" stroke-width="1.6"/><circle cx="368" cy="244" r="6" stroke-width="1.4"/>
 <path d="M368 221V229M368 259V267M345 244H353M383 244H391M352 228l5 5M384 260l-5-5M384 228l-5 5M352 260l5-5" stroke-width="1.2"/>
 <circle cx="344" cy="212" r="3.5" stroke-width="1.4"/><circle cx="344" cy="276" r="3.5" stroke-width="1.4"/><circle cx="388" cy="276" r="3.5" stroke-width="1.4"/>
 <!-- ventilation menton + bavette -->
 <path class="fa" stroke-width="2.2" d="M68 350L98 340L102 392L74 398Z"/><path d="M73 362L99 355M73 372L100 365M74 382L101 375" stroke-width="1.2"/>
 <ellipse cx="82" cy="322" rx="8" ry="6" stroke-width="1.6"/>
 <path d="M92 312C140 318 200 316 250 310" stroke-width="1.2" opacity=".6"/>
 <!-- ancrages HANS + sangle -->
 <circle cx="330" cy="404" r="9" stroke-width="2"/><circle cx="330" cy="404" r="3.5" stroke-width="1.2"/><circle cx="250" cy="414" r="9" stroke-width="2"/><circle cx="250" cy="414" r="3.5" stroke-width="1.2"/>
 <path d="M274 436C280 452 286 462 296 466" stroke-width="1.6"/>
 <!-- joint de cou -->
 <path class="fa" stroke-width="2.2" d="M112 434C150 446 214 450 268 450L352 446L340 436L210 440C160 440 130 438 112 434Z"/>
 <!-- aileron arrière -->
 <path class="fa" stroke-width="2.6" d="M472 262C506 262 532 270 540 284L520 318C502 324 484 322 470 312Z"/><path d="M474 276C500 276 520 282 528 290" stroke-width="1.2"/>
 <!-- repères de coque -->
 <path d="M150 114C128 140 114 170 106 204M96 300C84 330 80 350 84 404" stroke-width="1" opacity=".5"/>
</g></svg>`;
