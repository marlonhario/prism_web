import { SecuritySort } from "common/interfaces/Markets/SecuritySort";
import React from "react";
import { VirtuosoHandle } from "react-virtuoso";
import { ETATypes, Nullable } from "common/types";
import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ISecurity } from "common/interfaces";

export interface IndexInterface {
    letter: string;
    index: number;
}

export interface MarketsPublicProps {
    setShowMarkets: (showMarkets: boolean) => void;
    onCloseMarkets: () => void;
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}

export interface MarketsCalcedProps {
    virtuoso: React.RefObject<VirtuosoHandle>;
    allShown: boolean;
    securitySort: SecuritySort;
    selectedRegions: string[];
    selectedEtas: string[];
    searchValue: string;
    showModal: boolean;
    marketsRef: React.RefObject<HTMLDivElement>;
    sectors: string[],
    industries: string[],
    sector: Nullable<string>;
    industry: Nullable<string>;
    securityList: MarketsSecurity[];
    setSecurityList: (securityList: MarketsSecurity[]) => void;
    setSector: (sector: Nullable<string>) => void;
    setIndustry: (sector: Nullable<string>) => void;
    setShowModal: (showModal: boolean) => void;
    backToTop: () => void;
    closeMarkets: () => void;
    setIndexes: (index: IndexInterface[]) => void;
    setSearchValue: (searchValue: string) => void;
    handleSelectRegion: (value: string) => void;
    handleSelectEta: (value: string) => void;
    setSecuritySort: (securitySort: SecuritySort) => void;
    setAllShown: (allShown: boolean) => void;
    onHandleLetterClick: (letter: string) => void;
    setSelectedRegions: (selectedRegions: string[]) => void;
    setSelectedEtas: (selectedEtas: string[]) => void;
    sortSecurities: (column: string, order: 'asc' | 'desc') => void;
}

export type MarketsProps = MarketsPublicProps & MarketsCalcedProps;