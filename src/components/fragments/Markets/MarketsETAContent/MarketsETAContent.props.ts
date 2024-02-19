import { ISecurity } from "common/interfaces";
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ETATypes } from "common/types";

export interface MarketsETAContentProps {
    eta: MarketsETA;
    ticker: string;
    selectedEtas: string[];
    security?: MarketsSecurity;
    type: 'GROWTH MULTIPLE' | 'YIELD';
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}