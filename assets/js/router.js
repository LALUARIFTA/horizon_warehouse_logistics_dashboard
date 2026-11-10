// =========================================================================
// ROUTER — hash navigation, sidebar builder, filters, layout & dark mode
// =========================================================================

// Resolve the current menu key from the URL hash (deep-linkable pages).
function currentHashKey() {
  const m = location.hash.match(/^#\/([\w-]+)$/);
  return m ? m[1] : DEFAULT_MENU;
}

// Navigate programmatically; the hashchange listener does the actual render.
function navigate(key) {
  if (state.activeMenu === key) {
    renderCurrentView();
    return;
  }
  location.hash = '#/' + key;
}

// Backwards-compatible alias used by all inline onclick handlers.
function switchMenu(key) {
  navigate(key);
}

function activate(key) {
  state.activeMenu = key;
  syncSidebarActive(key);
  openParentGroup(key);
  renderCurrentView();
  syncBadges();
}

window.addEventListener('hashchange', () => activate(currentHashKey()));

// -------------------------------------------------------------------------
// SIDEBAR
// -------------------------------------------------------------------------
function menuIcon(name, cls) {
  return `<svg class="${cls}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">${ICONS[name] || ''}</svg>`;
}

function badgeHTML(item) {
  const value = item.badge();
  if (item.badgeType === 'amber') {
    return `<span id="hz-badge-${item.key}" class="px-1.5 py-0.2 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-semibold">${value}</span>`;
  }
  return `<span id="hz-badge-${item.key}" class="w-4 h-4 rounded-full bg-slate-800 dark:bg-slate-600 text-white text-[10px] font-semibold flex items-center justify-center sidebar-text">${value}</span>`;
}

function topLevelButton(item) {
  return `
    <button data-menu="${item.key}" onclick="switchMenu('${item.key}')" class="menu-btn w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-all group">
      <span class="flex items-center gap-2.5 truncate">
        ${menuIcon(item.icon, 'w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 menu-icon')}
        <span class="sidebar-text truncate">${item.label}</span>
      </span>
      ${item.badge ? badgeHTML(item) : ''}
    </button>
  `;
}

function childButton(item) {
  return `
    <button data-menu="${item.key}" onclick="switchMenu('${item.key}')" class="menu-btn w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-all">
      <span class="truncate">${item.label}</span>
      ${item.badge ? badgeHTML(item) : ''}
    </button>
  `;
}

function renderMenuItem(item) {
  if (item.children) {
    const openDefault = item.key === 'fleet';
    return `
      <div class="menu-group">
        <button onclick="toggleAccordion('submenu-${item.key}', 'chev-${item.key}')" class="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-all group">
          <span class="flex items-center gap-2.5 truncate">
            ${menuIcon(item.icon, 'w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200')}
            <span class="sidebar-text truncate">${item.label}</span>
          </span>
          <svg id="chev-${item.key}" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${openDefault ? 'rotate-180' : ''} sidebar-text" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        <div id="submenu-${item.key}" class="submenu-accordion ${openDefault ? 'open' : ''} sidebar-text">
          <div class="submenu-inner">
            <div class="relative pl-4 ml-4 mt-0.5 mb-1 border-l border-slate-200 dark:border-slate-700 space-y-0.5">
              ${item.children.map(childButton).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  return topLevelButton(item);
}

function buildSidebar() {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = MENU.map(group => `
    <div>
      <div class="px-2.5 mb-1.5 text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase sidebar-text">
        ${group.group}
      </div>
      <div class="space-y-0.5">
        ${group.items.map(renderMenuItem).join('')}
      </div>
    </div>
  `).join('');
  syncBadges();
}

function syncBadges() {
  MENU.forEach(group => group.items.forEach(item => {
    (item.children || [item]).forEach(entry => {
      if (!entry.badge) return;
      const el = document.getElementById('hz-badge-' + entry.key);
      if (el) el.textContent = entry.badge();
    });
  }));
}

function openParentGroup(key) {
  MENU.forEach(group => group.items.forEach(item => {
    if (!item.children) return;
    const containsKey = item.children.some(c => c.key === key);
    if (!containsKey) return;
    const submenu = document.getElementById('submenu-' + item.key);
    const chevron = document.getElementById('chev-' + item.key);
    if (submenu) submenu.classList.add('open');
    if (chevron) chevron.classList.add('rotate-180');
  }));
}

function syncSidebarActive(menuKey) {
  document.querySelectorAll('.menu-btn').forEach(btn => {
    const key = btn.getAttribute('data-menu');
    const icon = btn.querySelector('.menu-icon');
    if (key === menuKey) {
      btn.className = 'menu-btn active-menu w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] font-semibold bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] border border-slate-200/80 dark:border-slate-700 transition-all group';
      if (icon) {
        icon.classList.remove('text-slate-400');
        icon.classList.add('text-[#15803d]', 'dark:text-emerald-400');
      }
    } else {
      const isSubmenu = btn.closest('.submenu-inner') !== null;
      if (isSubmenu) {
        btn.className = 'menu-btn w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-all';
      } else {
        btn.className = 'menu-btn w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[12.5px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/70 transition-all group';
      }
      if (icon) {
        icon.classList.remove('text-[#15803d]', 'dark:text-emerald-400');
        icon.classList.add('text-slate-400');
      }
    }
  });
}

// -------------------------------------------------------------------------
// RENDER
// -------------------------------------------------------------------------
function renderCurrentView() {
  const container = document.getElementById('dynamicViewContainer');
  const headerTitle = document.getElementById('topHeaderTitle');
  headerTitle.textContent = PAGE_TITLES[state.activeMenu] || 'Operations Module';

  // Trigger smooth view transition animation
  container.classList.remove('view-animate-enter');
  void container.offsetWidth; // force reflow
  container.classList.add('view-animate-enter');

  const render = Views[state.activeMenu] || Views.fallback;
  container.innerHTML = render(state.activeMenu);

  // Animate progress bars smoothly from 0% to target width
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.progress-fill-bar').forEach(bar => {
        const target = bar.getAttribute('data-target-width');
        if (target) bar.style.width = target;
      });
    }, 40);
  });
}

// -------------------------------------------------------------------------
// INTERACTIONS: accordion, collapse, search, filters, layout, refresh, theme
// -------------------------------------------------------------------------
function toggleAccordion(submenuId, chevronId) {
  const submenu = document.getElementById(submenuId);
  const chevron = document.getElementById(chevronId);
  if (!submenu) return;
  const isOpen = submenu.classList.toggle('open');
  if (chevron) chevron.classList.toggle('rotate-180', isOpen);
}

function toggleSidebarCollapse() {
  const sidebar = document.getElementById('sidebar');
  state.sidebarCollapsed = !state.sidebarCollapsed;
  const texts = document.querySelectorAll('.sidebar-text');
  const searchWrap = document.querySelector('.sidebar-search-wrap');

  if (state.sidebarCollapsed) {
    sidebar.style.width = '68px';
    texts.forEach(el => el.classList.add('hidden'));
    if (searchWrap) searchWrap.classList.add('hidden');
  } else {
    sidebar.style.width = '248px';
    texts.forEach(el => el.classList.remove('hidden'));
    if (searchWrap) searchWrap.classList.remove('hidden');
  }
}

function handleTruckSearch(val) {
  state.searchQuery = val;
  renderCurrentView();
}

function handleSidebarSearch(val) {
  const q = val.trim().toLowerCase();
  // Open all accordions when searching so matching submenus are visible
  if (q.length > 0) {
    MENU.forEach(group => group.items.forEach(item => {
      if (!item.children) return;
      const submenu = document.getElementById('submenu-' + item.key);
      const chevron = document.getElementById('chev-' + item.key);
      if (submenu) submenu.classList.add('open');
      if (chevron) chevron.classList.add('rotate-180');
    }));
  }
  document.querySelectorAll('#sidebarNav .menu-btn').forEach(btn => {
    const txt = btn.textContent.toLowerCase();
    btn.style.display = (!q || txt.includes(q)) ? 'flex' : 'none';
  });
}

function toggleHeaderFilterMenu() {
  const dd = document.getElementById('headerFilterDropdown');
  dd.classList.toggle('hidden');
}

function applyStatusFilter(status) {
  state.statusFilter = status;
  document.getElementById('headerFilterDropdown').classList.add('hidden');
  document.getElementById('headerFilterLabel').textContent = status === 'ALL' ? 'Filter' : status;
  if (state.activeMenu !== 'warehouse-operations') {
    switchMenu('warehouse-operations');
  } else {
    renderCurrentView();
  }
}

function cycleStatusFilter() {
  const order = ['ALL', 'Loading', 'Ready', 'Completed', 'Not started'];
  const nextIdx = (order.indexOf(state.statusFilter) + 1) % order.length;
  applyStatusFilter(order[nextIdx]);
}

function resetTruckFilters() {
  state.statusFilter = 'ALL';
  state.searchQuery = '';
  renderCurrentView();
}

function toggleLayoutMode() {
  state.layoutMode = state.layoutMode === 'grid' ? 'list' : 'grid';
  renderCurrentView();
}

function triggerLiveRefresh() {
  const icon = document.getElementById('refreshIcon');
  icon.classList.remove('spin-anim');
  void icon.offsetWidth;
  icon.classList.add('spin-anim');

  // Increment loading trucks progress slightly to show live animation
  state.trucks.forEach(t => {
    if (t.status === 'Loading' && t.progress < 100) {
      t.progress = Math.min(100, t.progress + Math.floor(Math.random() * 6) + 2);
      const kg = Math.round((t.progress / 100) * 10000);
      t.weightText = kg.toLocaleString() + ' kg';
      t.weightPctText = `(${t.progress}%)`;
      if (t.progress === 100) {
        t.status = 'Ready';
        state.kpis.dispatchReady += 1;
      }
    }
  });

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  state.lastUpdated = `Today, ${hh}:${mm} PM`;

  renderCurrentView();
  showToast('Warehouse telemetry & dock load sensors refreshed');
}

function toggleDarkMode() {
  const html = document.documentElement;
  const knob = document.getElementById('darkModeKnob');
  const switchEl = document.getElementById('darkModeSwitch');
  const isDark = html.classList.toggle('dark');

  if (isDark) knob.classList.add('translate-x-3.5');
  else knob.classList.remove('translate-x-3.5');
  if (switchEl) switchEl.setAttribute('aria-checked', String(isDark));
  localStorage.setItem('hz-theme', isDark ? 'dark' : 'light');
}

// -------------------------------------------------------------------------
// GLOBAL SHORTCUTS
// -------------------------------------------------------------------------
// Keyboard shortcut Cmd+F / Ctrl+F focuses sidebar search
window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
    e.preventDefault();
    const input = document.getElementById('sidebarSearchInput');
    if (input) input.focus();
  }
  if (e.key === 'Escape') {
    closeQuickShipmentModal();
    closeTruckInspector();
    closeUpgradeModal();
    document.getElementById('headerFilterDropdown').classList.add('hidden');
  }
});

// Close filter dropdown when clicking outside
document.addEventListener('click', (e) => {
  const dd = document.getElementById('headerFilterDropdown');
  if (dd && !dd.parentElement.contains(e.target)) {
    dd.classList.add('hidden');
  }
});
