// =========================================================================
// VIEW: WAREHOUSE OPERATIONS (default landing grid + KPI overview)
// =========================================================================

function renderWarehouseOperationsView() {
  const filteredTrucks = state.trucks.filter(t => {
    const matchesStatus = state.statusFilter === 'ALL' || t.status.toLowerCase() === state.statusFilter.toLowerCase();
    const q = state.searchQuery.trim().toLowerCase();
    const matchesQuery = !q || t.id.toLowerCase().includes(q) || t.driver.toLowerCase().includes(q) || t.route.toLowerCase().includes(q) || t.dock.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const usagePercent = Math.round((state.kpis.activeLoadingDocs / state.kpis.totalLoadingDocs) * 100);
  const readyPadded = String(state.kpis.dispatchReady).padStart(2, '0');

  const cardsHTML = filteredTrucks.map((truck, idx) => {
    const delayMs = idx * 45;
    if (state.layoutMode === 'list') {
      return `
        <div onclick="openTruckInspector('${truck.id}')" style="animation-delay: ${delayMs}ms" class="stagger-card truck-card cursor-pointer bg-[#f8f9fb] dark:bg-slate-800/70 rounded-xl p-3.5 border border-[#e6e8ec] dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4 w-full sm:w-auto">
            <div class="w-28 h-16 flex items-center justify-center shrink-0 overflow-hidden">
              ${getTruckSVG(truck.vehicleType)}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-[14.5px] text-slate-900 dark:text-white">${truck.id}</span>
                ${getStatusBadgeHTML(truck.status)}
              </div>
              <div class="text-[12px] text-slate-500 dark:text-slate-400 mt-1">
                ${truck.weightText} • ${truck.weightPctText} &nbsp;|&nbsp; <strong class="text-slate-700 dark:text-slate-200">${truck.route}</strong> &nbsp;|&nbsp; ${truck.driver} • ${truck.dock}
              </div>
            </div>
          </div>
          <div class="w-full sm:w-64 shrink-0 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/70 dark:border-slate-700">
            <div class="flex items-center justify-between text-[11.5px] text-slate-500 dark:text-slate-400 mb-1.5">
              <span>Load progress</span>
              <span class="font-semibold text-slate-700 dark:text-slate-200">${truck.progress}%</span>
            </div>
            <div class="w-full h-1.5 rounded-full progress-hatched-track overflow-hidden">
              <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${truck.progress}%" style="width: 0%"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Default 3-column card
    return `
      <div onclick="openTruckInspector('${truck.id}')" style="animation-delay: ${delayMs}ms" class="stagger-card truck-card cursor-pointer bg-[#f6f7f9] dark:bg-slate-800/60 rounded-[14px] p-2.5 border border-[#eaecf0] dark:border-slate-700/80 flex flex-col justify-between overflow-hidden">

        <!-- Top Gray Showcase Area -->
        <div class="relative pt-1 px-1.5 pb-2.5 min-h-[132px] flex flex-col justify-between overflow-hidden">
          <div class="z-10">
            ${getStatusBadgeHTML(truck.status)}
          </div>

          <div class="absolute -right-2 top-2.5 pointer-events-none">
            ${getTruckSVG(truck.vehicleType)}
          </div>

          <div class="mt-9 z-10">
            <div class="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
              ${truck.id}
            </div>
            <div class="text-[12px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              ${truck.weightText} <span class="mx-0.5">•</span> ${truck.weightPctText}
            </div>
          </div>
        </div>

        <!-- Bottom Route & Progress Subcard -->
        <div class="bg-white dark:bg-slate-900 rounded-[10px] p-3 border border-[#eaecf0]/90 dark:border-slate-700/70 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
          <div class="flex items-center justify-between text-[12px] mb-2">
            <span class="font-bold text-slate-800 dark:text-white tracking-tight">${truck.route}</span>
            <span class="text-slate-500 dark:text-slate-400 text-[11.5px] truncate ml-2">${truck.driver} &nbsp;•&nbsp; ${truck.dock}</span>
          </div>
          <div class="flex items-center justify-between text-[11.5px] text-slate-400 dark:text-slate-400 mb-1.5">
            <span>Load progress</span>
            <span class="text-slate-600 dark:text-slate-300 font-medium">${truck.progress}%</span>
          </div>
          <div class="w-full h-[6px] rounded-full progress-hatched-track overflow-hidden flex items-center">
            <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${truck.progress}%" style="width: 0%"></div>
          </div>
        </div>

      </div>
    `;
  }).join('');

  return `
    <!-- 1. WAREHOUSE OVERVIEW KPI CARD -->
    <section class="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-[#e6e8ec] dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-[14px] font-semibold text-slate-800 dark:text-white">Warehouse overview</h2>
        <div class="flex items-center gap-2 text-[12px] text-slate-400">
          <span>Last updated: <span id="lastUpdatedLabel">${state.lastUpdated}</span></span>
          <button onclick="triggerLiveRefresh()" class="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.75"/><circle cx="12" cy="12" r="1.75"/><circle cx="12" cy="19" r="1.75"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#eaecf0] dark:divide-slate-700/80">

        <div class="py-2 sm:py-0.5 sm:pr-6">
          <div class="flex items-center gap-2 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M10 17h4V5H2v12h3m15 0h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/>
              <circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
            </svg>
            <span>Trucks inside</span>
          </div>
          <div class="text-[22px] font-bold text-slate-900 dark:text-white mt-3 leading-none tracking-tight">
            ${state.kpis.trucksInside}
          </div>
          <div class="text-[11.5px] text-slate-400 mt-1.5">Active status</div>
        </div>

        <div class="py-2 sm:py-0.5 sm:px-6">
          <div class="flex items-center gap-2 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Unassigned shipments</span>
          </div>
          <div class="text-[22px] font-bold text-slate-900 dark:text-white mt-3 leading-none tracking-tight">
            ${state.kpis.unassignedShipments}
          </div>
          <div class="text-[11.5px] text-slate-400 mt-1.5">Pending status</div>
        </div>

        <div class="py-2 sm:py-0.5 sm:px-6">
          <div class="flex items-center gap-2 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9"/>
              <circle cx="12" cy="12" r="3"/>
              <line x1="12" y1="3" x2="12" y2="9"/>
              <line x1="12" y1="15" x2="12" y2="21"/>
              <line x1="3" y1="12" x2="9" y2="12"/>
              <line x1="15" y1="12" x2="21" y2="12"/>
            </svg>
            <span>active loading docs</span>
          </div>
          <div class="text-[22px] font-bold text-slate-900 dark:text-white mt-3 leading-none tracking-tight">
            ${state.kpis.activeLoadingDocs}/${state.kpis.totalLoadingDocs}
          </div>
          <div class="text-[11.5px] text-slate-400 mt-1.5">${usagePercent}% total usage</div>
        </div>

        <div class="py-2 sm:py-0.5 sm:pl-6">
          <div class="flex items-center gap-2 text-[12.5px] text-slate-500 dark:text-slate-400 font-medium">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>Dispatch ready</span>
          </div>
          <div class="text-[22px] font-bold text-slate-900 dark:text-white mt-3 leading-none tracking-tight">
            ${readyPadded}
          </div>
          <div class="text-[11.5px] text-slate-400 mt-1.5">Ready for today</div>
        </div>

      </div>
    </section>

    <!-- 2. TRUCKS CURRENTLY IN WAREHOUSE GRID -->
    <section class="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-[#e6e8ec] dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.02)]">

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2.5">
          <h2 class="text-[14px] font-semibold text-slate-800 dark:text-white">Trucks currently in warehouse</h2>
          ${state.statusFilter !== 'ALL' ? `
            <button onclick="applyStatusFilter('ALL')" class="px-2 py-0.5 rounded-md bg-emerald-500/10 text-[#15803d] dark:text-emerald-300 text-[11px] font-medium flex items-center gap-1">
              <span>${state.statusFilter}</span>
              <span>×</span>
            </button>
          ` : ''}
        </div>

        <div class="flex items-center gap-2">
          <div class="relative flex items-center">
            <svg class="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              value="${state.searchQuery}"
              oninput="handleTruckSearch(this.value)"
              placeholder="Search for truck ID"
              class="w-44 sm:w-52 pl-8 pr-3 py-1.5 text-[12px] bg-white dark:bg-slate-900 border border-[#e2e5ec] dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#15803d]"
            />
          </div>

          <button onclick="cycleStatusFilter()" class="h-8 px-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-[#e2e5ec] dark:border-slate-700 text-[12px] font-medium flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
              <circle cx="6" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>
            </svg>
            <span>${state.statusFilter === 'ALL' ? 'Filter' : state.statusFilter}</span>
            <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <button onclick="toggleLayoutMode()" class="h-8 px-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-[#e2e5ec] dark:border-slate-700 text-[12px] font-medium flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>${state.layoutMode === 'grid' ? 'Grid' : 'List'}</span>
            <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          </button>
        </div>
      </div>

      ${filteredTrucks.length === 0 ? `
        <div class="py-14 text-center">
          <div class="text-slate-400 text-sm font-medium">No trucks match your filter criteria</div>
          <button onclick="resetTruckFilters()" class="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#15803d] text-white">Reset Filters</button>
        </div>
      ` : `
        <div class="${state.layoutMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5' : 'space-y-3'}">
          ${cardsHTML}
        </div>
      `}
    </section>
  `;
}

Views['warehouse-operations'] = renderWarehouseOperationsView;
