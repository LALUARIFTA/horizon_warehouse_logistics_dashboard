// =========================================================================
// VIEW: UNASSIGNED SHIPMENTS (interactive queue)
// =========================================================================

function renderUnassignedShipmentsView() {
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Unassigned Shipments Queue (${state.kpis.unassignedShipments} pending)</h2>
          <p class="text-xs text-slate-400">Assign staged pallet manifests directly to available warehouse docks</p>
        </div>
        <button onclick="openQuickShipmentModal()" class="px-3.5 py-2 rounded-lg bg-[#15803d] text-white text-xs font-semibold self-start sm:self-auto">+ Create Shipment Manifest</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        ${state.unassignedQueue.map((item, idx) => `
          <div style="animation-delay:${idx*50}ms" class="stagger-card bg-[#f6f7f9] dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-center justify-between">
                <span class="font-bold text-sm text-slate-900 dark:text-white">${item.id}</span>
                <span class="px-2 py-0.5 rounded text-[10.5px] font-semibold ${item.priority === 'Urgent' ? 'bg-rose-500/15 text-rose-600' : item.priority === 'High' ? 'bg-amber-500/15 text-amber-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}">${item.priority} Priority</span>
              </div>
              <div class="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">${item.client}</div>
              <div class="mt-3 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 grid grid-cols-3 text-center text-[11px]">
                <div>
                  <div class="text-slate-400">Route</div>
                  <div class="font-bold text-slate-800 dark:text-white mt-0.5">${item.route}</div>
                </div>
                <div>
                  <div class="text-slate-400">Volume</div>
                  <div class="font-bold text-slate-800 dark:text-white mt-0.5">${item.pallets} plts</div>
                </div>
                <div>
                  <div class="text-slate-400">Weight</div>
                  <div class="font-bold text-slate-800 dark:text-white mt-0.5">${item.weight}</div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-1">
              <span class="text-[11px] text-slate-400">Target Cutoff: ${item.eta}</span>
              <button onclick="assignPendingShipment('${item.id}')" class="px-3 py-1.5 rounded-lg bg-[#15803d] hover:bg-[#166534] text-white text-xs font-semibold transition-all active:scale-95">
                Assign to Dock
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

Views['unassigned-shipments'] = renderUnassignedShipmentsView;
