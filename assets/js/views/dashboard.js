// =========================================================================
// VIEW: EXECUTIVE DASHBOARD
// =========================================================================

function renderDashboardView() {
  const corridorMetrics = [
    { route: 'New York → Boston (I-95 N)', volume: '142 tons', onTime: '98.4%', trucks: 14, pct: 92 },
    { route: 'New York → Chicago (I-80 W)', volume: '218 tons', onTime: '94.1%', trucks: 19, pct: 78 },
    { route: 'New York → Philadelphia (I-95 S)', volume: '184 tons', onTime: '99.2%', trucks: 16, pct: 96 },
    { route: 'New York → Washington DC', volume: '115 tons', onTime: '91.8%', trucks: 11, pct: 68 },
    { route: 'New York → Baltimore Port', volume: '96 tons', onTime: '96.5%', trucks: 9, pct: 84 }
  ];

  return `
    <!-- Top Executive Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      ${[
        { label: 'Daily Freight Throughput', val: '755.4 t', sub: '+14.2% vs yesterday', color: 'text-emerald-600' },
        { label: 'On-Time Dispatch SLA', val: '96.8%', sub: 'Above 95.0% target', color: 'text-emerald-600' },
        { label: 'Average Dock Turnaround', val: '42 min', sub: '-6 min improvement', color: 'text-emerald-600' },
        { label: 'Active Regional Fleet', val: '69 / 74', sub: '2 units in maintenance', color: 'text-amber-600' }
      ].map((item, i) => `
        <div style="animation-delay:${i*50}ms" class="stagger-card bg-white dark:bg-slate-800 rounded-2xl p-4 border border-[#e6e8ec] dark:border-slate-700">
          <div class="text-xs font-medium text-slate-400">${item.label}</div>
          <div class="text-2xl font-bold text-slate-900 dark:text-white mt-2">${item.val}</div>
          <div class="text-[11px] font-medium ${item.color} mt-1.5">${item.sub}</div>
        </div>
      `).join('')}
    </div>

    <!-- Middle Row: Hourly Dock Volume Chart + Corridor Utilization -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
      <div class="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Hourly Warehouse Loading Throughput</h3>
            <p class="text-xs text-slate-400">Pallets loaded across Docks #1 – #10 today</p>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-[#15803d] dark:text-emerald-300 text-xs font-semibold">Peak: 14:00 (210 pallets)</span>
        </div>
        <div class="h-48 flex items-end gap-2.5 pt-6 px-2 border-b border-slate-100 dark:border-slate-700">
          ${[
            { hr: '06:00', h: 35, val: 68 },
            { hr: '07:00', h: 48, val: 92 },
            { hr: '08:00', h: 64, val: 128 },
            { hr: '09:00', h: 78, val: 156 },
            { hr: '10:00', h: 70, val: 140 },
            { hr: '11:00', h: 86, val: 174 },
            { hr: '12:00', h: 60, val: 118 },
            { hr: '13:00', h: 90, val: 185 },
            { hr: '14:00', h: 100, val: 210 },
            { hr: '15:00', h: 74, val: 148 }
          ].map(bar => `
            <div class="flex-1 flex flex-col items-center gap-2 group">
              <span class="text-[10px] font-semibold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">${bar.val}</span>
              <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-t-md h-32 flex items-end overflow-hidden">
                <div class="w-full bg-[#16a34a] group-hover:bg-[#15803d] rounded-t-md transition-all duration-700" style="height:${bar.h}%"></div>
              </div>
              <span class="text-[10px] text-slate-400">${bar.hr}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Corridor Performance -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700 space-y-3.5">
        <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Freight Corridor Capacity</h3>
        <div class="space-y-3">
          ${corridorMetrics.map(c => `
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-slate-700 dark:text-slate-200">${c.route}</span>
                <span class="text-slate-500">${c.volume} • ${c.pct}%</span>
              </div>
              <div class="w-full h-1.5 rounded-full progress-hatched-track overflow-hidden">
                <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${c.pct}%" style="width:0%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Bottom Live Dock Activity Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-[#e6e8ec] dark:border-slate-700">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-semibold text-slate-800 dark:text-white">Active Dock Assignments & Bay Telemetry</h3>
        <button onclick="switchMenu('warehouse-operations')" class="text-xs font-semibold text-[#15803d] dark:text-emerald-400 hover:underline">Open Warehouse Grid →</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-100 dark:border-slate-700 text-slate-400 uppercase text-[10.5px]">
              <th class="pb-2.5 font-semibold">Truck ID</th>
              <th class="pb-2.5 font-semibold">Dock Bay</th>
              <th class="pb-2.5 font-semibold">Assigned Driver</th>
              <th class="pb-2.5 font-semibold">Corridor</th>
              <th class="pb-2.5 font-semibold">Payload</th>
              <th class="pb-2.5 font-semibold">Progress</th>
              <th class="pb-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60">
            ${state.trucks.map(t => `
              <tr onclick="openTruckInspector('${t.id}')" class="hover:bg-slate-50 dark:hover:bg-slate-700/40 cursor-pointer transition-colors">
                <td class="py-2.5 font-bold text-slate-800 dark:text-white">${t.id}</td>
                <td class="py-2.5 text-slate-600 dark:text-slate-300">${t.dock}</td>
                <td class="py-2.5 text-slate-600 dark:text-slate-300">${t.driver}</td>
                <td class="py-2.5 font-semibold text-slate-800 dark:text-slate-200">${t.route}</td>
                <td class="py-2.5 text-slate-500">${t.weightText}</td>
                <td class="py-2.5 w-40">
                  <div class="w-32 h-1.5 rounded-full progress-hatched-track overflow-hidden">
                    <div class="h-full bg-[#16a34a] rounded-full progress-fill-bar" data-target-width="${t.progress}%" style="width:0%"></div>
                  </div>
                </td>
                <td class="py-2.5">${getStatusBadgeHTML(t.status)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

Views['dashboard'] = renderDashboardView;
