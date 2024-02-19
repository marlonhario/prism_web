import { ISecurity } from "common/interfaces";
import { MarketsETA } from "common/interfaces/Markets/MarketsETA";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ETATypes } from "common/types";
import React from "react";
import { ETASort } from "../MarketsETAHeader/MarketsETAHeader.props";

export interface ETAListPublicProps {
    selectedEtas: string[];
    setSelectedEtas: (selectedEtas: string[]) => void;
    closeMarkets: () => void;
    setAllShown: (allShown: boolean) => void;
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}
export interface ETAListCalcedProps {
    growthETAs: MarketsETA[];
    divETAs: MarketsETA[];
    setGrowthETAs: React.Dispatch<React.SetStateAction<MarketsETA[]>>
    setDivETAs: React.Dispatch<React.SetStateAction<MarketsETA[]>>
}

export type  ETAListProps = ETAListPublicProps & ETAListCalcedProps;