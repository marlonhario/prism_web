export const divEtasInitialState = [
  { name: "MaxDiv", checked: true, type: 'Red', risk: 'Aggressive' },
  { name: "PureDiv", checked: true, type: 'Green', risk: 'MarketRisk' },
  { name: "DivGuard", checked: true, type: 'Blue', risk: 'Conservative' },
];

export const growthEtasInitialState = [
  { name: "MaxGrowth", checked: true, type: 'Blue', risk: 'Aggressive' },
  { name: "PureGrowth", checked: true, type: 'Green', risk: 'MarketRisk' },
  { name: "GrowthGuard", checked: true, type: 'Red', risk: 'Conservative' },
];

export const riskProfileInitialState = [
  { name: "MarketRisk", checked: false, type: 'Green' },
  { name: "Conservative", checked: false, type: 'Blue' },
  { name: "Aggressive", checked: false, type: 'Red' },
];

export const regions = [
  { title: "AU", subRegion: ["AU"] },
  { title: "UK", subRegion: ["LN"] },
  { title: "US", subRegion: ["UF", "US"] },
  { title: "EUR", subRegion: ["AV", "BB", "FH", "FP", "GR", "ID", "IM", "NA", "PL", "SM", "SW"] },
];