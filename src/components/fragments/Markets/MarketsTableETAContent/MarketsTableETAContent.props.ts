import { ISecurity } from "common/interfaces";
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ETATypes } from "common/types";

export interface MarketsTableETAContentProps {
    etas: MarketsETA[];
    ticker: string;
    selectedEtas: string[];
    type: 'GROWTH MULTIPLE' | 'YIELD';
    security: MarketsSecurity;
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}