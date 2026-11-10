// =========================================================================
// View registry — populated by each module in assets/js/views/.
const Views = {};

// APP CONFIG — navigation structure, icons, page titles.
// Add or remove menu items here; the sidebar rebuilds itself automatically.
// =========================================================================

const DEFAULT_MENU = 'warehouse-operations';

// Inner SVG paths per icon name. Reused across the sidebar.
const ICONS = {
  dashboard: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />',
  fleet: '<path d="M10 17h4V5H2v12h3m15 0h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" />',
  shipments: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  warehouse: '<path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  analytics: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  customers: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 20v-1a5 5 0 0 1 10 0v1"/>',
  team: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  help: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>'
};

// Each item: { key, label, icon?, badge?, badgeType?, children? }
// badge() returns the current live value; badgeType: 'solid' | 'amber'
const MENU = [
  {
    group: 'Main menu',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      {
        key: 'fleet',
        label: 'Fleet Management',
        icon: 'fleet',
        children: [
          { key: 'all-vehicles', label: 'All Vehicles' },
          { key: 'active-trucks', label: 'Active Trucks' },
          { key: 'maintenance-repairs', label: 'Maintenance & Repairs', badge: () => 2, badgeType: 'solid' },
          { key: 'fuel-telematics', label: 'Fuel & Telematics' },
          { key: 'drivers-directory', label: 'Drivers Directory' },
          { key: 'tire-axle-logs', label: 'Tire & Axle Sensors' },
          { key: 'cold-chain-units', label: 'Cold-Chain Reefers' }
        ]
      },
      {
        key: 'shipments',
        label: 'Shipments & Deliveries',
        icon: 'shipments',
        children: [
          { key: 'active-shipments', label: 'Active Shipments' },
          { key: 'unassigned-shipments', label: 'Unassigned Shipments', badge: () => state.kpis.unassignedShipments, badgeType: 'amber' },
          { key: 'delivery-history', label: 'Delivery History' },
          { key: 'customs-manifests', label: 'Customs & Manifests' },
          { key: 'damaged-claims', label: 'Claims & Returns' }
        ]
      },
      { key: 'warehouse-operations', label: 'Warehouse Operations', icon: 'warehouse' },
      { key: 'route-planning', label: 'Route Planning', icon: 'route', badge: () => 3, badgeType: 'solid' },
      { key: 'analytics-reports', label: 'Analytics & Reports', icon: 'analytics' }
    ]
  },
  {
    group: 'Support',
    items: [
      { key: 'customers', label: 'Customers', icon: 'customers' },
      { key: 'team-roles', label: 'Team & Roles', icon: 'team' },
      { key: 'help-support', label: 'Help & support', icon: 'help' }
    ]
  }
];

const PAGE_TITLES = {
  'dashboard': 'Executive Dashboard',
  'all-vehicles': 'Fleet Management • All Vehicles',
  'active-trucks': 'Fleet Management • Active Trucks',
  'maintenance-repairs': 'Fleet Management • Maintenance & Repairs',
  'fuel-telematics': 'Fleet Management • Fuel & Telematics',
  'drivers-directory': 'Fleet Management • Drivers Directory',
  'tire-axle-logs': 'Fleet Management • Tire & Axle Sensors',
  'cold-chain-units': 'Fleet Management • Cold-Chain Reefers',
  'active-shipments': 'Shipments & Deliveries • Active Shipments',
  'unassigned-shipments': 'Shipments & Deliveries • Unassigned Shipments',
  'delivery-history': 'Shipments & Deliveries • Delivery History',
  'customs-manifests': 'Shipments & Deliveries • Customs & Manifests',
  'damaged-claims': 'Shipments & Deliveries • Claims & Returns',
  'warehouse-operations': 'Warehouse operations',
  'route-planning': 'Route Planning & Corridor Telemetry',
  'analytics-reports': 'Analytics & Reports',
  'customers': 'Customers & SLA Directory',
  'team-roles': 'Team & Roles Permissions',
  'help-support': 'Help & Support Center',
  'settings': 'Workspace Settings'
};
