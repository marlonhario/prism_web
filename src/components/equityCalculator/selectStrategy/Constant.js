/**
 * Static data for select strategy block
 */

import { GREEN, BLUE, RED } from "../constants";
export const ALL_GROWTH = 'All Growth';
export const ALL_YIELD = 'All Yield';

export const etaTypes = [
  {
      "etaType" : "Green",
      "description" : "Balanced Growth and Income",
      "growthLegName" : "PureGrowth",
      "incomeLegName" : "PureDiv"
  },
  {
      "etaType" : "Blue",
      "description" : "Aggressive Gearing and Conservative Yield",
      "growthLegName" : "MaxGrowth",
      "incomeLegName" : "DivGuard"
  },
  {
      "etaType" : "Red",
      "description" : "Conservative Gearing and Aggressive Yield",
      "growthLegName" : "GrowthGuard",
      "incomeLegName" : "MaxDiv"
  }
];

export const strategyList = [{
  strategyName: ALL_GROWTH,
  shortDescription: 'Keep growth exposure and return cash'
},
{
  strategyName: ALL_YIELD,
  shortDescription: 'Keep yield exposure and return cash'
}];

export const strategyDescriptions = [{
  [GREEN]: [{
    etaName: ALL_GROWTH,
    textDescription: 'A Green ETA with an All-Growth strategy provides up to x2 gearing to increase exposure to capital gains without changing your risk profile.',
  },
  {
    etaName: ALL_YIELD,
    textDescription: 'A Green ETA with an All-Dividend strategy provides up to x2 yield to increase income without changing your risk profile.',
  }],
  [RED]: [{
    etaName: ALL_GROWTH,
    textDescription: 'A Red ETA with an All-Growth strategy provides up to x1.5 gearing to increase exposure to capital gains with protection against downside risk.',
  },
  {
    etaName: ALL_YIELD,
    textDescription: 'A Red ETA with an All-Dividend strategy provides up to x2 yield to increase income at the cost of a higher risk profile.',
  }],
  [BLUE]: [{
    etaName: ALL_GROWTH,
    textDescription: 'A Blue ETA with an All-Growth strategy provides up to x3 gearing to increase exposure to capital gains at the cost of a higher risk profile.',
  },
  {
    etaName: ALL_YIELD,
    textDescription: 'A Blue ETA with an All-Dividend strategy provides up to x1.5 yield increase to income with protection against downside risk.',
  }],
}];

