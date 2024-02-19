import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";
import { ISecurity } from "common/interfaces";
import { VirtuosoHandle } from "react-virtuoso";
import { ETATypes } from "common/types";

export interface MarketsTableBodyProps {
    virtuoso: React.RefObject<VirtuosoHandle>;
    selectedEtas: string[];
    securityList: MarketsSecurity[];
    handleETAClick: (eta: ETATypes, security: MarketsSecurity | ISecurity) => void;
}