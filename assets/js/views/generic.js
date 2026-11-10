// =========================================================================
// VIEWS: SETTINGS + GENERIC FALLBACK FOR REMAINING SUBMENUS
// (Fuel, Tire Sensors, Cold Chain, Active Shipments, History, Customs,
//  Claims, Analytics, Customers, Team, Help)
// =========================================================================

function renderSettingsView() {
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700 max-w-3xl space-y-5">
      <div>
        <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Horizon Warehouse Control Preferences</h2>
        <p class="text-xs text-slate-400">Configure automated dock gates, weight scale thresholds, and alert webhooks</p>
      </div>
      <div class="space-y-3">
        ${[
          { title: 'Automated Dock Door Interlock', desc: 'Prevent green dispatch status until rear cargo door sensor is locked', enabled: true },
          { title: 'Overweight Axle Load Alerting', desc: 'Trigger immediate dispatcher notification when truck exceeds 10,000 kg capacity', enabled: true },
          { title: 'Live GPS Telemetry Polling (5s)', desc: 'Continuously sync truck positions along NY, NJ, BOS, CHI corridors', enabled: true }
        ].map(s => `
          <div class="p-3.5 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div class="text-xs font-semibold text-slate-800 dark:text-white">${s.title}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">${s.desc}</div>
            </div>
            <button onclick="showToast('Setting updated')" class="w-9 h-5 rounded-full bg-[#16a34a] p-0.5 flex items-center justify-end">
              <span class="w-4 h-4 rounded-full bg-white shadow"></span>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

Views['settings'] = renderSettingsView;

// Fallback renderer used by any menu key without a dedicated view module.
function renderGenericView(menuKey) {
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">${PAGE_TITLES[menuKey] || 'Operations Module'}</h2>
          <p class="text-xs text-slate-400">Real-time operational records synchronized with NY Central Warehouse Hub</p>
        </div>
        <button onclick="switchMenu('warehouse-operations')" class="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium self-start">← Back to Warehouse Grid</button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        ${state.trucks.slice(0, 6).map((t, idx) => `
          <div onclick="openTruckInspector('${t.id}')" style="animation-delay:${idx*45}ms" class="stagger-card cursor-pointer p-4 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 space-y-2.5 hover:border-slate-300 transition-all">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-slate-900 dark:text-white">${t.id} • ${t.route}</span>
              ${getStatusBadgeHTML(t.status)}
            </div>
            <div class="text-[11.5px] text-slate-500 dark:text-slate-400">
              Operator: <strong class="text-slate-700 dark:text-slate-200">${t.driver}</strong> (${t.dock})
            </div>
            <div class="text-[11.5px] text-slate-500 dark:text-slate-400">
              Recorded Payload: <strong class="text-slate-700 dark:text-slate-200">${t.weightText}</strong>
            </div>
            <div class="w-full h-1.5 rounded-full progress-hatched-track overflow-hidden">
              <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${t.progress}%" style="width:0%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

Views.fallback = renderGenericView;
