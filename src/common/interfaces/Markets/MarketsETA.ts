import { ETATypes } from "common/types";

export interface MarketsETA {
    ticker?: string;
    etaType: ETATypes;
    remainingTerm: number;
    change: number;
    last: number;
    offer: number;
    matchDistance: number;
    valueInCirculation: number;
}