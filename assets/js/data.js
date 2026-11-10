// =========================================================================
// APPLICATION STATE & MOCK DATA
// Replace with your own API calls or static seed data for a real deployment.
// =========================================================================

const state = {
  activeMenu: 'warehouse-operations',
  statusFilter: 'ALL',
  searchQuery: '',
  layoutMode: 'grid', // 'grid' | 'list'
  sidebarCollapsed: false,
  lastUpdated: 'Today, 14:32 PM',
  kpis: {
    trucksInside: 12,
    unassignedShipments: 48,
    activeLoadingDocs: 6,
    totalLoadingDocs: 10,
    dispatchReady: 4
  },
  trucks: [
    {
      id: 'TRC-204',
      status: 'Loading',
      weightText: '6,500 kg',
      weightPctText: '(48%)',
      route: 'NY → NJ',
      driver: 'Marcus Lee',
      dock: 'Dock #3',
      progress: 48,
      vehicleType: 'box-standard'
    },
    {
      id: 'TRC-118',
      status: 'Not started',
      weightText: '0kg',
      weightPctText: '(0%)',
      route: 'NY → CHI',
      driver: 'Hannah Cruz',
      dock: 'Dock #1',
      progress: 0,
      vehicleType: 'box-ribbed'
    },
    {
      id: 'TRC-551',
      status: 'Completed',
      weightText: '8,870 kg',
      weightPctText: '(92%)',
      route: 'NY → BOS',
      driver: 'Alexi Park',
      dock: 'Dock #7',
      progress: 89,
      vehicleType: 'semi-sleeper'
    },
    {
      id: 'TRC-392',
      status: 'Ready',
      weightText: '10,000 kg',
      weightPctText: '(100%)',
      route: 'NY → PHL',
      driver: 'David Kim',
      dock: 'Dock #5',
      progress: 100,
      vehicleType: 'box-standard'
    },
    {
      id: 'TRC-405',
      status: 'Loading',
      weightText: '850 kg',
      weightPctText: '(12%)',
      route: 'NY → DC',
      driver: 'Marcus Lee',
      dock: 'Dock #2',
      progress: 15,
      vehicleType: 'box-standard'
    },
    {
      id: 'TRC-622',
      status: 'Loading',
      weightText: '7,400kg',
      weightPctText: '(70%)',
      route: 'NY → BAL',
      driver: 'Marcus Lee',
      dock: 'Dock #8',
      progress: 65,
      vehicleType: 'cargo-van'
    },
    {
      id: 'TRC-710',
      status: 'Not started',
      weightText: '0 kg',
      weightPctText: '(0%)',
      route: 'NY → ATL',
      driver: 'Elena Rostova',
      dock: 'Dock #4',
      progress: 0,
      vehicleType: 'box-standard'
    },
    {
      id: 'TRC-809',
      status: 'Loading',
      weightText: '5,200 kg',
      weightPctText: '(52%)',
      route: 'NY → MIA',
      driver: 'Devon Brooks',
      dock: 'Dock #6',
      progress: 52,
      vehicleType: 'box-standard'
    },
    {
      id: 'TRC-914',
      status: 'Loading',
      weightText: '8,100 kg',
      weightPctText: '(81%)',
      route: 'NY → TOR',
      driver: 'Samira Patel',
      dock: 'Dock #9',
      progress: 81,
      vehicleType: 'box-ribbed'
    }
  ],
  unassignedQueue: [
    { id: 'SHP-8821', client: 'Nordic Retail Corp', route: 'NY → BOS', pallets: 18, weight: '4,200 kg', priority: 'High', eta: '15:30 PM' },
    { id: 'SHP-8824', client: 'Apex Medical Supply', route: 'NY → PHL', pallets: 12, weight: '2,950 kg', priority: 'Urgent', eta: '16:00 PM' },
    { id: 'SHP-8829', client: 'Metro Fresh Grocers', route: 'NY → DC', pallets: 24, weight: '7,800 kg', priority: 'Normal', eta: '16:45 PM' },
    { id: 'SHP-8832', client: 'Vanguard Electronics', route: 'NY → CHI', pallets: 30, weight: '9,100 kg', priority: 'High', eta: '17:15 PM' },
    { id: 'SHP-8836', client: 'Harbor Home Goods', route: 'NY → NJ', pallets: 14, weight: '3,400 kg', priority: 'Normal', eta: '18:00 PM' },
    { id: 'SHP-8840', client: 'Solis Industrial Parts', route: 'NY → BAL', pallets: 22, weight: '6,300 kg', priority: 'Normal', eta: '18:30 PM' }
  ]
};
