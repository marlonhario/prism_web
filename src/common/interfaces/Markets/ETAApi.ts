import ETA from "../ETA";

export interface ETAApi extends ETA {
    seriesPair: string;
    chgNet1d: number;
    underlyingSymbol: string;
    etaYield: number;
    remainingTerm: number;
    ratioEOD: number;
    growthMultipleLast: number;
    growthMultipleOffer: number;
    yieldLast: number;
    yieldOffer: number;
    matchDistance: number;
    etaValueInCirculation: number;
}