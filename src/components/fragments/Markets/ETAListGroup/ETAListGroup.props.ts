import { ISecurity } from "common/interfaces";
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ETATypes } from "common/types";

export interface ETAListGroupProps {
    etas: MarketsETA[];
    selectedEtas: string[];
    type: 'GROWTH MULTIPLE' | 'YIELD';
    setEtas: React.Dispatch<React.SetStateAction<MarketsETA[]>>
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}