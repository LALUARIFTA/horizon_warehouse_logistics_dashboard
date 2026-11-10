// =========================================================================
// VIEWS: FLEET (all vehicles, active trucks, maintenance, drivers)
// =========================================================================

function renderFleetListView(menuKey) {
  const list = menuKey === 'active-trucks'
    ? state.trucks.filter(t => t.status === 'Loading' || t.status === 'Ready')
    : state.trucks;

  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">${menuKey === 'all-vehicles' ? 'Complete Commercial Fleet Inventory' : 'Currently Active & Loading Trucks'}</h2>
          <p class="text-xs text-slate-400">Click any vehicle row to inspect dock load progress and axle telemetry</p>
        </div>
        <button onclick="openQuickShipmentModal()" class="px-3 py-1.5 rounded-lg bg-[#15803d] text-white text-xs font-semibold">+ Add Vehicle Dispatch</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        ${list.map((t, i) => `
          <div onclick="openTruckInspector('${t.id}')" style="animation-delay:${i*45}ms" class="stagger-card truck-card cursor-pointer bg-[#f6f7f9] dark:bg-slate-800/70 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700">
            <div class="flex items-center justify-between">
              ${getStatusBadgeHTML(t.status)}
              <span class="text-xs font-semibold text-slate-400">${t.dock}</span>
            </div>
            <div class="my-2 flex justify-center">
              ${getTruckSVG(t.vehicleType)}
            </div>
            <div class="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/70 dark:border-slate-700">
              <div class="flex justify-between text-xs font-bold text-slate-800 dark:text-white">
                <span>${t.id} (${t.route})</span>
                <span>${t.weightText}</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5 mb-2">Driver: ${t.driver}</div>
              <div class="w-full h-1.5 rounded-full progress-hatched-track overflow-hidden">
                <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${t.progress}%" style="width:0%"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderMaintenanceView() {
  const tickets = [
    { unit: 'TRC-204', issue: 'Scheduled 50,000 km Brake Pad & Air Line Inspection', bay: 'Workshop Bay #2', cost: '$640', status: 'In Service', pct: 75 },
    { unit: 'TRC-551', issue: 'Sleeper Cab HVAC Filter & Fifth-Wheel Lubrication', bay: 'Workshop Bay #1', cost: '$310', status: 'In Service', pct: 40 },
    { unit: 'TRC-118', issue: 'Rear Liftgate Hydraulic Seal Check', bay: 'Completed Yesterday', cost: '$480', status: 'Resolved', pct: 100 },
    { unit: 'TRC-622', issue: 'Tire Rotation & Alignment Calibration', bay: 'Scheduled Next Tue', cost: '$220', status: 'Scheduled', pct: 15 },
    { unit: 'TRC-392', issue: 'Diesel Particulate Filter (DPF) Regeneration', bay: 'Completed', cost: '$390', status: 'Resolved', pct: 100 }
  ];
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700 space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Fleet Maintenance & Diagnostic Work Orders</h2>
          <p class="text-xs text-slate-400">2 active workshop bays currently servicing fleet vehicles</p>
        </div>
        <span class="px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-semibold">2 Active Tickets</span>
      </div>
      <div class="space-y-3">
        ${tickets.map((tk, i) => `
          <div style="animation-delay:${i*50}ms" class="stagger-card p-4 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-slate-900 dark:text-white">${tk.unit}</span>
                <span class="px-2 py-0.5 rounded text-[11px] font-semibold ${tk.status === 'In Service' ? 'bg-amber-500/15 text-amber-700' : tk.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-700' : 'bg-slate-200 text-slate-700'}">${tk.status}</span>
                <span class="text-xs text-slate-400">• ${tk.bay}</span>
              </div>
              <div class="text-xs text-slate-600 dark:text-slate-300 mt-1">${tk.issue}</div>
            </div>
            <div class="w-full sm:w-56 shrink-0">
              <div class="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Est. Cost: <strong>${tk.cost}</strong></span>
                <span>${tk.pct}%</span>
              </div>
              <div class="w-full h-1.5 rounded-full progress-hatched-track overflow-hidden">
                <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${tk.pct}%" style="width:0%"></div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderDriversView() {
  const drivers = [
    { name: 'Marcus Lee', id: 'DRV-104', license: 'CDL Class A (Hazmat)', safety: '99.4%', truck: 'TRC-204 / TRC-405', shift: 'On Duty • Dock #3', hrs: '5.2 / 11 hrs' },
    { name: 'Hannah Cruz', id: 'DRV-108', license: 'CDL Class A', safety: '98.9%', truck: 'TRC-118', shift: 'Standby • Dock #1', hrs: '1.0 / 11 hrs' },
    { name: 'Alexi Park', id: 'DRV-112', license: 'CDL Class A (Doubles)', safety: '99.8%', truck: 'TRC-551', shift: 'Ready to Depart • Dock #7', hrs: '3.4 / 11 hrs' },
    { name: 'David Kim', id: 'DRV-119', license: 'CDL Class A', safety: '99.1%', truck: 'TRC-392', shift: 'Pre-Trip Check • Dock #5', hrs: '2.1 / 11 hrs' },
    { name: 'Elena Rostova', id: 'DRV-125', license: 'CDL Class A', safety: '97.8%', truck: 'TRC-710', shift: 'Staging • Dock #4', hrs: '0.5 / 11 hrs' },
    { name: 'Devon Brooks', id: 'DRV-131', license: 'CDL Class B', safety: '98.5%', truck: 'TRC-809', shift: 'Loading • Dock #6', hrs: '4.0 / 11 hrs' }
  ];
  return `
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
      <h2 class="text-sm font-semibold text-slate-800 dark:text-white mb-4">Certified Commercial Drivers Directory</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
        ${drivers.map((d, i) => `
          <div style="animation-delay:${i*45}ms" class="stagger-card p-4 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-emerald-600/15 text-[#15803d] dark:text-emerald-300 font-bold text-xs flex items-center justify-center">
                  ${d.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div class="text-xs font-bold text-slate-900 dark:text-white">${d.name}</div>
                  <div class="text-[11px] text-slate-400">${d.license}</div>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-[#15803d] dark:text-emerald-300 text-[11px] font-semibold">${d.safety} Safety</span>
            </div>
            <div class="bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700 text-[11.5px] space-y-1">
              <div class="flex justify-between"><span class="text-slate-400">Assigned Unit:</span><strong class="text-slate-700 dark:text-slate-200">${d.truck}</strong></div>
              <div class="flex justify-between"><span class="text-slate-400">Current Status:</span><span class="text-slate-600 dark:text-slate-300">${d.shift}</span></div>
              <div class="flex justify-between"><span class="text-slate-400">HOS Logbook:</span><span class="text-slate-600 dark:text-slate-300">${d.hrs}</span></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

Views['all-vehicles'] = renderFleetListView;
Views['active-trucks'] = renderFleetListView;
Views['maintenance-repairs'] = renderMaintenanceView;
Views['drivers-directory'] = renderDriversView;
