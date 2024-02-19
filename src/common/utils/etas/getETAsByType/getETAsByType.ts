import { ETAApi } from "common/interfaces/Markets/ETAApi"
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";

const getETAsByType = (etas: ETAApi[]) => {
  let growth: MarketsETA[] = [];
  let div: MarketsETA[] = [];
  etas.forEach((eta) => {
    let growthType = '';
    let divType = '';
    switch (eta.seriesPair) {
      case 'RED':
        growthType = 'GrowthGuard';
        divType = 'MaxDiv';
        break;
      case 'BLUE':
        growthType = 'MaxGrowth';
        divType = 'DivGuard';
        break;
      case 'GREEN':
        growthType = 'PureGrowth';
        divType = 'PureDiv';
        break;
      case 'PURPLE':
        growthType = 'UltraGrowth';
        divType = 'UltraGuard';
        break;
      default:
        break;
    }
    growth.push({
      ticker: eta.underlyingSymbol,
      etaType: growthType,
      remainingTerm: eta.remainingTerm,
      change: eta.chgNet1d,
      last: eta.growthMultipleLast || 0,
      offer: eta.growthMultipleOffer || 0,
      matchDistance: eta.matchDistance,
      valueInCirculation: eta.etaValueInCirculation,
    } as MarketsETA);

    div.push({
      ticker: eta.underlyingSymbol,
      etaType: divType,
      remainingTerm: eta.remainingTerm,
      change: eta.chgNet1d,
      last: eta.yieldLast * 100 || 0,
      offer: eta.yieldOffer * 100 || 0,
      matchDistance: eta.matchDistance,
      valueInCirculation: eta.etaValueInCirculation,
    } as MarketsETA);
  });

  return {
    growth,
    div
  }
}

export default getETAsByType;