import { SecuritySort } from "common/interfaces/Markets/SecuritySort";


export type SecuritySortType = 'lastPrice' | 'chgNet1d' | 'forwardDivYield' | 'dvdPayoutRatio' | 'peRatioEod' | 'marketCap' | 'region' | 'sector' | 'industry' | 'etaValueInCirculation'

export interface MarketsTableHeaderPublicProps {
    securitySort: SecuritySort;
    setSecuritySort: (securitySort: SecuritySort) => void;
    setAllShown: (allShown: boolean) => void;
    sortSecurities: (column: string, order: 'asc' | 'desc') => void;
}

export interface MarketsTableHeaderCalcedProps {
    handleSortOnClick: (column: SecuritySortType, order: 'asc' | 'desc') => void;
}

export type MarketsTableHeaderProps = MarketsTableHeaderPublicProps & MarketsTableHeaderCalcedProps;