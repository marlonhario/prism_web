import { ISecurity } from "common/interfaces";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ETATypes } from "common/types";


export interface MarketsTableBodyContentProps {
    index: number;
    security: MarketsSecurity;
    selectedEtas: string[];
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}