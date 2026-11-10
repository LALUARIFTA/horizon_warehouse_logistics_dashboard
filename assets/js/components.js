// =========================================================================
// SHARED COMPONENTS: truck illustrations, status badges, modals, toasts
// =========================================================================

// Realistic side-profile commercial truck SVG generator.
function getTruckSVG(type) {
  // Every truck faces LEFT on a soft studio ground shadow
  if (type === 'semi-sleeper') {
    // Long-nose aerodynamic sleeper tractor + high-cube trailer
    return `
      <svg viewBox="0 0 250 115" class="w-[188px] h-[92px] truck-illustration select-none overflow-visible">
        <defs>
          <linearGradient id="bodyGradSemi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="75%" stop-color="#f1f5f9"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <linearGradient id="boxGradSemi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="88%" stop-color="#e2e8f0"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <radialGradient id="shadowSemi" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,23,42,0.42)"/>
            <stop offset="65%" stop-color="rgba(15,23,42,0.16)"/>
            <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
          </radialGradient>
        </defs>
        <ellipse cx="138" cy="100" rx="110" ry="7.5" fill="url(#shadowSemi)"/>
        <rect x="134" y="10" width="116" height="68" rx="2" fill="url(#boxGradSemi)" stroke="#cbd5e1" stroke-width="1"/>
        <line x1="134" y1="73" x2="250" y2="73" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="75" y="75" width="165" height="9" rx="2" fill="#334155"/>
        <path d="M 80 78 L 132 78 L 132 20 C 115 20, 102 26, 92 40 L 72 40 L 58 56 L 32 60 C 27 61, 25 65, 25 71 L 25 81 L 80 81 Z" fill="url(#bodyGradSemi)" stroke="#cbd5e1" stroke-width="1"/>
        <path d="M 93 40 Q 110 26 130 23" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
        <path d="M 60 55 L 73 42 L 88 42 L 88 56 Z" fill="#1e293b"/>
        <rect x="94" y="43" width="11" height="12" rx="1.5" fill="#1e293b"/>
        <path d="M 68 45 L 64 45 L 64 56 L 68 56" fill="none" stroke="#334155" stroke-width="1.4"/>
        <rect x="23" y="76" width="14" height="7" rx="2" fill="#94a3b8"/>
        <rect x="26" y="64" width="4" height="10" rx="1" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
        <rect x="75" y="77" width="34" height="10" rx="4" fill="#94a3b8" stroke="#64748b" stroke-width="0.8"/>
        <line x1="80" y1="80" x2="104" y2="80" stroke="#f8fafc" stroke-width="1.2"/>
        <g transform="translate(50, 86)">
          <circle r="13.5" fill="#1e293b"/><circle r="9.5" fill="#475569"/><circle r="6.5" fill="#cbd5e1"/><circle r="3" fill="#334155"/>
        </g>
        <g transform="translate(132, 86)">
          <circle r="13.5" fill="#1e293b"/><circle r="9.5" fill="#475569"/><circle r="6.5" fill="#cbd5e1"/><circle r="3" fill="#334155"/>
        </g>
        <g transform="translate(162, 86)">
          <circle r="13.5" fill="#1e293b"/><circle r="9.5" fill="#475569"/><circle r="6.5" fill="#cbd5e1"/><circle r="3" fill="#334155"/>
        </g>
      </svg>
    `;
  }

  if (type === 'box-ribbed') {
    // Corrugated/ribbed box cargo truck
    return `
      <svg viewBox="0 0 250 115" class="w-[188px] h-[92px] truck-illustration select-none overflow-visible">
        <defs>
          <linearGradient id="cabGradRib" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="80%" stop-color="#f1f5f9"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <pattern id="ribPattern" width="9" height="60" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="6" height="60" fill="#f8fafc"/>
            <rect x="6" y="0" width="3" height="60" fill="#cbd5e1"/>
          </pattern>
          <radialGradient id="shadowRib" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,23,42,0.42)"/>
            <stop offset="68%" stop-color="rgba(15,23,42,0.15)"/>
            <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
          </radialGradient>
        </defs>
        <ellipse cx="145" cy="100" rx="105" ry="7" fill="url(#shadowRib)"/>
        <rect x="65" y="73" width="182" height="10" fill="#1e293b"/>
        <rect x="108" y="14" width="142" height="60" rx="2" fill="url(#ribPattern)" stroke="#94a3b8" stroke-width="1"/>
        <rect x="108" y="14" width="142" height="5" fill="#e2e8f0"/>
        <rect x="108" y="70" width="142" height="4" fill="#cbd5e1"/>
        <path d="M 68 35 C 76 23, 92 18, 106 18 L 106 35 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <path d="M 52 78 L 105 78 L 105 34 L 66 34 C 60 34, 56 39, 53 49 L 49 62 L 49 78 Z" fill="url(#cabGradRib)" stroke="#cbd5e1" stroke-width="1"/>
        <path d="M 55 57 L 60 40 L 84 40 L 84 57 Z" fill="#1e293b"/>
        <rect x="62" y="62" width="6" height="2" rx="1" fill="#475569"/>
        <rect x="46" y="74" width="16" height="8" rx="2" fill="#334155"/>
        <rect x="48" y="67" width="4" height="6" rx="1" fill="#e2e8f0"/>
        <rect x="106" y="75" width="38" height="9" rx="2" fill="#64748b"/>
        <g transform="translate(80, 86)">
          <circle r="13.5" fill="#1e293b"/><circle r="9" fill="#475569"/><circle r="6" fill="#e2e8f0"/><circle r="2.5" fill="#1e293b"/>
        </g>
        <g transform="translate(198, 86)">
          <circle r="13.5" fill="#1e293b"/><circle r="9" fill="#475569"/><circle r="6" fill="#e2e8f0"/><circle r="2.5" fill="#1e293b"/>
        </g>
      </svg>
    `;
  }

  if (type === 'cargo-van') {
    // High-roof Sprinter cargo van
    return `
      <svg viewBox="0 0 250 115" class="w-[188px] h-[92px] truck-illustration select-none overflow-visible">
        <defs>
          <linearGradient id="vanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="72%" stop-color="#f1f5f9"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
          <radialGradient id="shadowVan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,23,42,0.42)"/>
            <stop offset="68%" stop-color="rgba(15,23,42,0.14)"/>
            <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
          </radialGradient>
        </defs>
        <ellipse cx="145" cy="100" rx="102" ry="7" fill="url(#shadowVan)"/>
        <path d="M 42 82 L 248 82 L 248 22 C 248 18, 244 16, 238 16 L 116 16 C 98 16, 86 24, 74 42 L 48 53 C 43 56, 40 62, 40 70 L 40 80 Z" fill="url(#vanGrad)" stroke="#cbd5e1" stroke-width="1"/>
        <rect x="128" y="34" width="54" height="24" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
        <rect x="190" y="34" width="52" height="24" rx="2" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
        <path d="M 40 77 L 248 77 L 248 84 L 40 84 Z" fill="#334155"/>
        <path d="M 73 43 L 94 24 L 116 24 L 116 48 L 78 48 Z" fill="#1e293b"/>
        <rect x="73" y="40" width="5" height="9" rx="1.5" fill="#0f172a"/>
        <path d="M 41 58 L 51 55 L 50 63 L 41 64 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
        <rect x="110" y="54" width="6" height="2" rx="1" fill="#334155"/>
        <rect x="134" y="54" width="6" height="2" rx="1" fill="#334155"/>
        <g transform="translate(76, 85)">
          <circle r="13" fill="#1e293b"/><circle r="8.5" fill="#94a3b8"/><circle r="4" fill="#334155"/>
        </g>
        <g transform="translate(212, 85)">
          <circle r="13" fill="#1e293b"/><circle r="8.5" fill="#94a3b8"/><circle r="4" fill="#334155"/>
        </g>
      </svg>
    `;
  }

  // Default: 'box-standard' (clean white box truck)
  return `
    <svg viewBox="0 0 250 115" class="w-[188px] h-[92px] truck-illustration select-none overflow-visible">
      <defs>
        <linearGradient id="cabGradStd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="78%" stop-color="#f1f5f9"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
        <linearGradient id="boxGradStd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="85%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
        <radialGradient id="shadowStd" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(15,23,42,0.44)"/>
          <stop offset="68%" stop-color="rgba(15,23,42,0.16)"/>
          <stop offset="100%" stop-color="rgba(15,23,42,0)"/>
        </radialGradient>
      </defs>
      <ellipse cx="144" cy="100" rx="106" ry="7.5" fill="url(#shadowStd)"/>
      <rect x="64" y="73" width="184" height="11" rx="2" fill="#1e293b"/>
      <rect x="108" y="12" width="142" height="63" rx="2" fill="url(#boxGradStd)" stroke="#cbd5e1" stroke-width="1"/>
      <line x1="108" y1="71" x2="250" y2="71" stroke="#94a3b8" stroke-width="1.2"/>
      <path d="M 68 32 C 77 19, 92 14, 107 14 L 107 32 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      <path d="M 48 79 L 105 79 L 105 31 L 64 31 C 57 31, 53 37, 50 48 L 46 62 L 46 79 Z" fill="url(#cabGradStd)" stroke="#cbd5e1" stroke-width="1"/>
      <path d="M 52 57 L 57 37 L 85 37 L 85 55 L 52 57 Z" fill="#1e293b"/>
      <rect x="90" y="38" width="9" height="14" rx="1.5" fill="#1e293b"/>
      <path d="M 54 39 L 48 39 L 48 52 L 53 52" fill="none" stroke="#1e293b" stroke-width="1.5"/>
      <rect x="64" y="63" width="6" height="2" rx="1" fill="#334155"/>
      <path d="M 46 73 L 105 73 L 105 81 L 46 81 Z" fill="#334155"/>
      <rect x="114" y="75" width="46" height="9" rx="2" fill="#475569"/>
      <g transform="translate(82, 86)">
        <circle r="13.5" fill="#0f172a"/><circle r="9.5" fill="#334155"/><circle r="6" fill="#cbd5e1"/><circle r="2.5" fill="#0f172a"/>
      </g>
      <g transform="translate(202, 86)">
        <circle r="13.5" fill="#0f172a"/><circle r="9.5" fill="#334155"/><circle r="6" fill="#cbd5e1"/><circle r="2.5" fill="#0f172a"/>
      </g>
    </svg>
  `;
}

// Status badge pill used across every view.
function getStatusBadgeHTML(status) {
  const normalized = status.toLowerCase();
  let dotClass = 'bg-slate-700 dark:bg-slate-400';
  if (normalized === 'loading') dotClass = 'bg-amber-500 dot-pulse';
  else if (normalized === 'completed' || normalized === 'ready') dotClass = 'bg-[#16a34a]';

  return `
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
      ${status}
    </span>
  `;
}

// Toast helper
let toastTimer = null;
function showToast(msg) {
  const box = document.getElementById('toastBox');
  const txt = document.getElementById('toastText');
  txt.textContent = msg;
  box.classList.remove('opacity-0', 'translate-y-3');
  box.classList.add('opacity-100', 'translate-y-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    box.classList.add('opacity-0', 'translate-y-3');
    box.classList.remove('opacity-100', 'translate-y-0');
  }, 2800);
}

// Generic modal helpers
function openModalById(id) {
  const m = document.getElementById(id);
  m.classList.remove('hidden');
  m.classList.add('flex');
}
function closeModalById(id) {
  const m = document.getElementById(id);
  m.classList.add('hidden');
  m.classList.remove('flex');
}

// Truck Inspector Modal
function openTruckInspector(truckId) {
  const truck = state.trucks.find(t => t.id === truckId);
  if (!truck) return;
  const content = document.getElementById('truckInspectorContent');

  content.innerHTML = `
    <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
      <div class="flex items-center gap-2.5">
        <span class="text-base font-bold text-slate-900 dark:text-white">${truck.id}</span>
        ${getStatusBadgeHTML(truck.status)}
      </div>
      <button onclick="closeTruckInspector()" class="text-slate-400 hover:text-slate-600 p-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="my-4 py-3 px-4 rounded-xl bg-[#f6f7f9] dark:bg-slate-900 flex items-center justify-between border border-slate-200/70 dark:border-slate-700">
      <div>
        <div class="text-xs text-slate-400">Corridor Route</div>
        <div class="text-sm font-bold text-slate-900 dark:text-white mt-0.5">${truck.route}</div>
        <div class="text-xs text-slate-500 mt-1">${truck.driver} • ${truck.dock}</div>
        <div class="text-xs font-semibold text-[#15803d] dark:text-emerald-400 mt-1">${truck.weightText} ${truck.weightPctText}</div>
      </div>
      <div class="shrink-0">
        ${getTruckSVG(truck.vehicleType)}
      </div>
    </div>

    <div class="space-y-3 text-xs">
      <div>
        <div class="flex justify-between font-medium text-slate-700 dark:text-slate-200 mb-1">
          <span>Adjust Live Dock Load Progress</span>
          <span id="inspectorPctLabel" class="font-bold text-[#15803d] dark:text-emerald-400">${truck.progress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value="${truck.progress}"
          oninput="updateTruckProgressLive('${truck.id}', this.value)"
          class="w-full accent-[#15803d] cursor-pointer"
        />
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
        <div class="flex gap-1.5">
          <button onclick="setTruckStatus('${truck.id}', 'Loading')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">Set Loading</button>
          <button onclick="setTruckStatus('${truck.id}', 'Ready')" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium">Mark Ready</button>
        </div>
        <button onclick="closeTruckInspector()" class="px-4 py-1.5 rounded-lg bg-[#15803d] text-white font-semibold">Done</button>
      </div>
    </div>
  `;

  openModalById('truckInspectorModal');
}

function updateTruckProgressLive(truckId, newPct) {
  const truck = state.trucks.find(t => t.id === truckId);
  if (!truck) return;
  const pct = parseInt(newPct, 10);
  truck.progress = pct;
  const kg = Math.round((pct / 100) * 10000);
  truck.weightText = kg.toLocaleString() + ' kg';
  truck.weightPctText = `(${pct}%)`;
  if (pct === 0) truck.status = 'Not started';
  else if (pct === 100) truck.status = 'Ready';
  else truck.status = 'Loading';

  const lbl = document.getElementById('inspectorPctLabel');
  if (lbl) lbl.textContent = pct + '%';
  renderCurrentView();
}

function setTruckStatus(truckId, status) {
  const truck = state.trucks.find(t => t.id === truckId);
  if (!truck) return;
  truck.status = status;
  if (status === 'Ready') truck.progress = 100;
  closeTruckInspector();
  renderCurrentView();
  showToast(`${truckId} status updated to ${status}`);
}

function closeTruckInspector() {
  closeModalById('truckInspectorModal');
}

// Quick Shipment Modal
function openQuickShipmentModal() {
  const randomNum = Math.floor(100 + Math.random() * 890);
  document.getElementById('qsTruckId').value = `TRC-${randomNum}`;
  openModalById('quickShipmentModal');
}

function closeQuickShipmentModal() {
  closeModalById('quickShipmentModal');
}

function submitQuickShipment(e) {
  e.preventDefault();
  const id = document.getElementById('qsTruckId').value.trim() || 'TRC-990';
  const vehicleType = document.getElementById('qsVehicleType').value;
  const route = document.getElementById('qsRoute').value.trim() || 'NY → BOS';
  const driverDock = document.getElementById('qsDriverDock').value.split('•');
  const driver = (driverDock[0] || 'Marcus Lee').trim();
  const dock = (driverDock[1] || 'Dock #10').trim();
  const weight = parseInt(document.getElementById('qsWeight').value, 10) || 4500;
  const progress = Math.min(100, Math.max(0, parseInt(document.getElementById('qsProgress').value, 10) || 45));

  const status = progress === 0 ? 'Not started' : progress === 100 ? 'Ready' : 'Loading';

  state.trucks.unshift({
    id,
    status,
    weightText: `${weight.toLocaleString()} kg`,
    weightPctText: `(${progress}%)`,
    route,
    driver,
    dock,
    progress,
    vehicleType
  });

  state.kpis.trucksInside += 1;
  closeQuickShipmentModal();
  switchMenu('warehouse-operations');
  showToast(`${id} dispatched to ${dock}`);
}

function assignPendingShipment(shpId) {
  state.unassignedQueue = state.unassignedQueue.filter(s => s.id !== shpId);
  state.kpis.unassignedShipments = Math.max(0, state.kpis.unassignedShipments - 1);
  syncBadges();
  renderCurrentView();
  showToast(`Manifest ${shpId} assigned to active loading bay`);
}

// Upgrade Modal
function openUpgradeModal() {
  openModalById('upgradeModal');
}
function closeUpgradeModal() {
  closeModalById('upgradeModal');
}
function activatePremiumPlan() {
  closeUpgradeModal();
  showToast('Horizon Enterprise Trial activated for all 10 docks!');
}
