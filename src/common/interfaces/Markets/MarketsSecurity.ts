import { Security } from "../ETAShowcase/Security";

export interface MarketsSecurity extends Security {
    chgNet1d: number;
    dvdPayoutRatio: number;
    peRatioEod: number;
    sector: string;
    industry: string;
    etaValueInCirculation: number;
}