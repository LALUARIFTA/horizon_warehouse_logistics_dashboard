// =========================================================================
// VIEW: ROUTE PLANNING (corridor telemetry map + advisories)
// =========================================================================

function renderRoutePlanningView() {
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
      <!-- Interactive Northeast Corridor SVG Telemetry Map -->
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
        <div class="flex items-center justify-between mb-3">
          <div>
            <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Northeast Freight Corridor Live Telemetry</h2>
            <p class="text-xs text-slate-400">Active GPS transponders connecting NY Central Hub to regional terminals</p>
          </div>
          <span class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-semibold">3 Weather Advisories</span>
        </div>

        <div class="relative rounded-xl bg-[#f1f5f9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden h-[340px]">
          <svg viewBox="0 0 700 340" class="w-full h-full">
            <defs>
              <pattern id="mapGrid" width="35" height="35" patternUnits="userSpaceOnUse">
                <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(148,163,184,0.18)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="700" height="340" fill="url(#mapGrid)"/>

            <!-- Stylized Coastline Polygon -->
            <path d="M 0 0 L 580 0 L 640 70 L 520 145 L 440 245 L 360 340 L 0 340 Z" fill="rgba(226,232,240,0.55)" class="dark:fill-slate-900"/>

            <!-- Highway Route Lines from NY Hub (440, 155) -->
            <path d="M 440 155 Q 505 115 565 75" fill="none" stroke="#16a34a" stroke-width="3" stroke-dasharray="6 4"/>
            <path d="M 440 155 Q 270 135 110 140" fill="none" stroke="#16a34a" stroke-width="3"/>
            <path d="M 440 155 L 395 200 L 350 250 L 315 285" fill="none" stroke="#16a34a" stroke-width="3"/>
            <path d="M 440 155 Q 370 90 295 55" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="5 5"/>

            <!-- City Hub Nodes -->
            <g transform="translate(440,155)">
              <circle r="12" fill="rgba(22,163,74,0.2)" class="dot-pulse"/>
              <circle r="6" fill="#15803d" stroke="#fff" stroke-width="2"/>
              <text x="12" y="4" class="text-[11px] font-bold fill-slate-800 dark:fill-white">NY Hub (HQ)</text>
            </g>
            <g transform="translate(565,75)">
              <circle r="5" fill="#16a34a" stroke="#fff" stroke-width="1.5"/>
              <text x="10" y="4" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">BOS (TRC-551)</text>
            </g>
            <g transform="translate(110,140)">
              <circle r="5" fill="#16a34a" stroke="#fff" stroke-width="1.5"/>
              <text x="-15" y="-10" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">CHI (TRC-118)</text>
            </g>
            <g transform="translate(395,200)">
              <circle r="5" fill="#16a34a" stroke="#fff" stroke-width="1.5"/>
              <text x="10" y="4" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">PHL (TRC-392)</text>
            </g>
            <g transform="translate(350,250)">
              <circle r="5" fill="#f59e0b" stroke="#fff" stroke-width="1.5"/>
              <text x="10" y="4" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">BAL (TRC-622)</text>
            </g>
            <g transform="translate(315,285)">
              <circle r="5" fill="#16a34a" stroke="#fff" stroke-width="1.5"/>
              <text x="10" y="4" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">DC (TRC-405)</text>
            </g>
            <g transform="translate(295,55)">
              <circle r="5" fill="#f59e0b" stroke="#fff" stroke-width="1.5"/>
              <text x="10" y="4" class="text-[10.5px] font-semibold fill-slate-700 dark:fill-slate-300">TOR (TRC-914)</text>
            </g>
          </svg>
        </div>
      </div>

      <!-- Right Column: Active Route Advisories -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700 space-y-3">
        <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Active Corridor Advisories (3)</h3>
        ${[
          { code: 'I-95 North • Stamford CT', msg: 'Lane restriction near Exit 9. +12 min ETA adjustment applied to TRC-551.', type: 'Amber' },
          { code: 'NJ Turnpike • Exit 14', msg: 'High volume freight queue at Newark interchange. Alternate I-78 recommended.', type: 'Amber' },
          { code: 'I-80 West • Pennsylvania', msg: 'Clear weather corridor. Optimal fuel economy cruise active for TRC-118.', type: 'Green' }
        ].map(adv => `
          <div class="p-3.5 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700">
            <div class="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white">
              <span>${adv.code}</span>
              <span class="w-2 h-2 rounded-full ${adv.type === 'Amber' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
            </div>
            <p class="text-[11.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">${adv.msg}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

Views['route-planning'] = renderRoutePlanningView;
