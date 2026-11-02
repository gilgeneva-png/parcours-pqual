/* ==========================================================
   Illustrations des thèmes (décoratives, sans contenu)
   ========================================================== */
window.MP_DECO = {

/* ---------------- SOIRÉE ---------------- */
soiree: {
  hero: `<svg viewBox="0 0 170 170" aria-hidden="true">
    <defs>
      <radialGradient id="so-g" cx="34%" cy="30%" r="75%">
        <stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#CFC8EE"/><stop offset="1" stop-color="#4B3C88"/>
      </radialGradient>
      <clipPath id="so-c"><circle cx="85" cy="92" r="54"/></clipPath>
    </defs>
    <g class="swing">
      <line x1="85" y1="0" x2="85" y2="38" stroke="#B9AEDD" stroke-width="2"/>
      <circle cx="85" cy="92" r="54" fill="url(#so-g)"/>
      <g clip-path="url(#so-c)">
        <g stroke="#2A1F55" stroke-opacity=".5" stroke-width="1.4" fill="none">
          <path d="M20 50H150M20 62H150M20 74H150M20 86H150M20 98H150M20 110H150M20 122H150M20 134H150"/>
          <ellipse cx="85" cy="92" rx="12" ry="54"/><ellipse cx="85" cy="92" rx="26" ry="54"/>
          <ellipse cx="85" cy="92" rx="40" ry="54"/><ellipse cx="85" cy="92" rx="52" ry="54"/>
        </g>
        <rect x="60" y="63" width="12" height="10" fill="#FF4FA3" opacity=".85"/>
        <rect x="98" y="87" width="12" height="10" fill="#3EE0F0" opacity=".85"/>
        <rect x="73" y="111" width="12" height="10" fill="#B6F23A" opacity=".8"/>
        <rect x="111" y="63" width="10" height="10" fill="#FFB020" opacity=".7"/>
        <rect x="47" y="99" width="10" height="10" fill="#B590FF" opacity=".8"/>
      </g>
    </g>
    <g fill="#FFFFFF" class="twinkle">
      <path d="M22 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>
      <path d="M150 128l2.4 6 6 2.4-6 2.4-2.4 6-2.4-6-6-2.4 6-2.4z" fill="#3EE0F0"/>
      <path d="M152 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FF4FA3"/>
    </g>
  </svg>`,
  strip: true
},

/* ---------------- FERME ---------------- */
ferme: {
  hero: `<svg viewBox="0 0 190 150" aria-hidden="true">
    <g class="spin-slow" style="transform-origin:150px 32px">
      <circle cx="150" cy="32" r="17" fill="#F2B632"/>
      <g stroke="#F2B632" stroke-width="4" stroke-linecap="round">
        <path d="M150 4v6M150 54v6M122 32h6M172 32h6M130 12l4 4M166 48l4 4M130 52l4-4M166 16l4-4"/>
      </g>
    </g>
    <path d="M0 140 Q60 118 120 130 T190 124 V150 H0Z" fill="#7BA05B"/>
    <path d="M28 132V80l42-30 42 30v52Z" fill="#B3261E"/>
    <path d="M22 84l48-36 48 36" fill="none" stroke="#FFFBF3" stroke-width="7" stroke-linejoin="round"/>
    <rect x="52" y="98" width="36" height="34" fill="#7A1A14"/>
    <path d="M52 98l36 34M88 98l-36 34" stroke="#FFFBF3" stroke-width="4"/>
    <rect x="52" y="98" width="36" height="34" fill="none" stroke="#FFFBF3" stroke-width="4"/>
    <circle cx="70" cy="76" r="8" fill="#FFFBF3"/><circle cx="70" cy="76" r="4" fill="#7A1A14"/>
    <g>
      <rect x="128" y="112" width="40" height="24" rx="5" fill="#E2B04A"/>
      <path d="M134 116v16M142 116v16M150 116v16M158 116v16" stroke="#B9862A" stroke-width="2"/>
      <path d="M126 120h44M126 128h44" stroke="#8A5D00" stroke-width="2.5"/>
    </g>
    <g fill="#FFFBF3" stroke="#76604B" stroke-width="1.5">
      <path d="M2 142v-22l5-6 5 6v22z"/><path d="M178 142v-22l5-6 5 6v22z"/>
    </g>
  </svg>`,
  strip: true
},

/* ---------------- PLAGE ---------------- */
plage: {
  hero: `<svg viewBox="0 0 190 150" aria-hidden="true">
    <circle cx="150" cy="34" r="20" fill="#F7C548"/>
    <path d="M60 136 L92 40" stroke="#7A5230" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 62 Q92 0 154 62 Z" fill="#FFFFFF"/>
    <path d="M30 62 Q46 30 76 22 Q66 40 62 62Z M92 18 Q104 30 108 62 L76 62 Q80 34 92 18Z" fill="#C7402B"/>
    <path d="M154 62 Q140 30 108 22 Q120 40 124 62Z" fill="#0A7FA6"/>
    <path d="M30 62 Q92 0 154 62" fill="none" stroke="#0E3A4F" stroke-opacity=".25" stroke-width="2"/>
    <g class="bob">
      <circle cx="140" cy="112" r="18" fill="#FFFFFF" stroke="#0E3A4F" stroke-opacity=".2"/>
      <path d="M140 94 A18 18 0 0 1 157 106 Q146 110 140 112Z" fill="#C7402B"/>
      <path d="M157 118 A18 18 0 0 1 128 126 Q138 118 140 112Z" fill="#0A7FA6"/>
      <path d="M124 104 A18 18 0 0 1 140 94 Q138 104 140 112Z" fill="#F7C548"/>
    </g>
    <path d="M0 136 Q20 126 40 136 T80 136 T120 136 T160 136 T200 136 V150 H0Z" fill="#0A7FA6" opacity=".85"/>
    <path d="M0 143 Q20 135 40 143 T80 143 T120 143 T160 143 T200 143 V150 H0Z" fill="#0B6E8F"/>
  </svg>`,
  strip: true
},

/* ---------------- BANQUE ---------------- */
banque: {
  hero: `<svg viewBox="0 0 190 150" aria-hidden="true">
    <path d="M20 54 L80 24 L140 54Z" fill="#1B3A6B"/>
    <rect x="22" y="54" width="116" height="8" fill="#B08A2E"/>
    <g fill="#E6EAF0" stroke="#1B3A6B" stroke-width="2">
      <rect x="32" y="64" width="12" height="52"/><rect x="56" y="64" width="12" height="52"/>
      <rect x="92" y="64" width="12" height="52"/><rect x="116" y="64" width="12" height="52"/>
    </g>
    <rect x="18" y="116" width="124" height="8" fill="#1B3A6B"/>
    <rect x="12" y="124" width="136" height="8" fill="#B08A2E"/>
    <circle cx="80" cy="42" r="6" fill="#B08A2E"/>
    <g class="rise">
      <g><ellipse cx="164" cy="128" rx="18" ry="6" fill="#8C6A12"/><rect x="146" y="118" width="36" height="10" fill="#B08A2E"/><ellipse cx="164" cy="118" rx="18" ry="6" fill="#D9B45A"/></g>
      <g><rect x="146" y="106" width="36" height="10" fill="#B08A2E"/><ellipse cx="164" cy="106" rx="18" ry="6" fill="#D9B45A"/></g>
      <g><rect x="146" y="94" width="36" height="10" fill="#B08A2E"/><ellipse cx="164" cy="94" rx="18" ry="6" fill="#E7C977"/></g>
    </g>
    <path d="M140 40 L156 28 L166 34 L184 14" fill="none" stroke="#1F5E4A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="draw"/>
    <path d="M176 14h8v8" fill="none" stroke="#1F5E4A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  strip: true
},

/* ---------------- ARCADE ---------------- */
arcade: {
  hero: `<svg viewBox="0 0 200 150" aria-hidden="true" shape-rendering="crispEdges">
    <g class="bob">
      <path d="M40 46h120c22 0 34 18 38 44l4 26c2 14-10 22-22 16l-26-18H46l-26 18c-12 6-24-2-22-16l4-26c4-26 16-44 38-44z" fill="#2B3266" stroke="#F4F6FF" stroke-width="3"/>
      <g fill="#F4F6FF"><rect x="42" y="68" width="12" height="36"/><rect x="30" y="80" width="36" height="12"/></g>
      <g transform="translate(140 64) scale(1.15)"><circle r="9" fill="#12152B" stroke="#56B4E9" stroke-width="2.5"/><path d="M0-5 5 4H-5z" fill="#56B4E9"/></g>
      <g transform="translate(160 84) scale(1.15)"><circle r="9" fill="#12152B" stroke="#E69F00" stroke-width="2.5"/><circle r="4.4" fill="none" stroke="#E69F00" stroke-width="2.2"/></g>
      <g transform="translate(140 104) scale(1.15)"><circle r="9" fill="#12152B" stroke="#F0E442" stroke-width="2.5"/><path d="M-4-4 4 4M4-4-4 4" stroke="#F0E442" stroke-width="2.4"/></g>
      <g transform="translate(120 84) scale(1.15)"><circle r="9" fill="#12152B" stroke="#CC79A7" stroke-width="2.5"/><rect x="-4" y="-4" width="8" height="8" fill="none" stroke="#CC79A7" stroke-width="2.2"/></g>
      <rect x="84" y="78" width="12" height="5" fill="#AEB4D6"/><rect x="102" y="78" width="12" height="5" fill="#AEB4D6"/>
    </g>
    <g class="twinkle" fill="#F0E442">
      <path d="M18 18h4v4h-4zM22 14h4v4h-4zM22 22h4v4h-4zM26 18h4v4h-4z"/>
      <path d="M176 18h4v4h-4zM180 14h4v4h-4zM180 22h4v4h-4zM184 18h4v4h-4z" fill="#56B4E9"/>
      <path d="M96 10h4v4h-4zM100 6h4v4h-4zM100 14h4v4h-4zM104 10h4v4h-4z" fill="#CC79A7"/>
    </g>
  </svg>`,
  strip: true
},

/* ---------------- SPORT ---------------- */
sport: {
  hero: `<svg viewBox="0 0 190 150" aria-hidden="true">
    <rect x="76" y="6" width="24" height="10" rx="3" fill="#111827"/>
    <rect x="84" y="14" width="8" height="10" fill="#111827"/>
    <path d="M128 30l9-9" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
    <circle cx="88" cy="82" r="58" fill="#111827"/>
    <circle cx="88" cy="82" r="48" fill="#FFFFFF"/>
    <g stroke="#111827" stroke-width="3" stroke-linecap="round">
      <path d="M88 38v8M88 118v8M44 82h8M124 82h8M57 51l5 5M114 108l5 5M57 113l5-5M114 56l5-5"/>
    </g>
    <path d="M88 82 L88 46 A36 36 0 0 1 119 64 Z" fill="#D61A2B" opacity=".18"/>
    <g class="tick" style="transform-origin:88px 82px">
      <path d="M88 82 L88 44" stroke="#D61A2B" stroke-width="4" stroke-linecap="round"/>
    </g>
    <circle cx="88" cy="82" r="5" fill="#D61A2B"/>
    <g transform="translate(150 120)">
      <circle r="20" fill="#FFFFFF" stroke="#111827" stroke-width="2.5"/>
      <path d="M0-8 7.6-2.5 4.7 6.5h-9.4L-7.6-2.5Z" fill="#111827"/>
      <path d="M0-8V-20M7.6-2.5 18.5-6M4.7 6.5 11 16M-4.7 6.5-11 16M-7.6-2.5-18.5-6" stroke="#111827" stroke-width="2"/>
    </g>
  </svg>`,
  strip: true
}
};
