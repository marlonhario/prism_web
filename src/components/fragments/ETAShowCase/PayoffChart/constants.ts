export const etaDetails = [
  {
    etaType: "Green",
    growthTitle: "PureGrowth",
    incomeTitle: "PureDiv",
    firstLoss: "Shared",
  },
  {
    etaType: "Red",
    growthTitle: "GrowthGuard",
    incomeTitle: "MaxDiv",
    firstLoss: "Income",
  },
  {
    etaType: "Blue",
    growthTitle: "MaxGrowth",
    incomeTitle: "DivGuard",
    firstLoss: "Growth",
  },
];

export const etaTypes = [
  "PureGrowth",
  "PureDiv",
  "GrowthGuard",
  "MaxDiv",
  "MaxGrowth",
  "DivGuard",
];

/* Mock-up data to plot chart */
export const dataForPloting = [
  {
    name: "ETA1 Percent",
    values: [
      { value: -100, price: -80 },
      { value: -5, price: 0 },
      { value: 0, price: 0 },
      { value: 10, price: 0 },
      { value: 50, price: 70 },
      { value: 100, price: 100 },
    ],
  },
  {
    name: "ETA2 Percent",
    values: [
      { value: -100, price: -20 },
      { value: -5, price: 70 },
      { value: 0, price: 93 },
      { value: 10, price: 97 },
      { value: 50, price: 100 },
      { value: 80, price: 110 },
    ],
  },
  {
    name: "Combained Percent",
    values: [
      { value: -100, price: 10 },
      { value: -5, price: 30 },
      { value: 0, price: 40 },
      { value: 10, price: 51 },
      { value: 50, price: 60 },
      { value: 100, price: 80 },
    ],
  },
];

export const EtaColorCode = {
  PureGrowth: "#C7DB6D",
  PureDiv: "#3D8E74",
  MaxDiv: "#d4c2b8",
  GrowthGuard: "#DB3155",
  MaxGrowth: "#65CDF3",
  DivGuard: "#3e5c91",
  UltraGuard: '#342C53',
  UnderlyingShare: 'grey',
  CombinedPercent: 'black'
};

export const EtaColorCodeStroke = {
    PureGrowth: "#C7DB6D",
    PureDiv: "#73BD59",
    MaxDiv: "#F5BD1A",
    GrowthGuard: "#DB3155",
    MaxGrowth: "#65CDF3",
    DivGuard: "#1C59A8",
    UnderlyingShare: 'grey',
    CombinedPercent: 'black'
  };




export const etaDropdownData = [
  { name: "GREEN", id: "GREEN" },
  { name: "RED", id: "RED" },
  { name: "BLUE", id: "BLUE" }
];
