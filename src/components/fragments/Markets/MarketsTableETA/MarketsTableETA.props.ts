import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";
import { ISecurity } from "common/interfaces";
import { ETATypes } from "common/types";


export interface MarketsTableETAPublicProps {
    security: MarketsSecurity;
    selectedEtas: string[];
    shown: boolean;
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}

export interface MarketsTableETACalcedProps {
    growthETAs: MarketsETA[];
    divETAs: MarketsETA[];
}

export type MarketsTableETAProps = MarketsTableETAPublicProps & MarketsTableETACalcedProps;