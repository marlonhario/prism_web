import { MarketsETA } from "common/interfaces/Markets/MarketsETA";

export type ETASortType = 'remainingTerm' | 'change' | 'last' | 'offer' | 'matchDistance' | 'valueInCirculation';

export interface ETASort {
    remainingTerm: 'asc' | 'desc';
    change: 'asc' | 'desc';
    last: 'asc' | 'desc';
    offer: 'asc' | 'desc';
    matchDistance: 'asc' | 'desc';
    valueInCirculation: 'asc' | 'desc';

}
export interface MarketsETAHeaderPublicProps {
    allShown: boolean;
    type: 'GROWTH MULTIPLE' | 'YIELD';
    setEtas?: React.Dispatch<React.SetStateAction<MarketsETA[]>>;
}


export interface MarketsETAHeaderCalcedProps {
    etaSort: ETASort;
    handleSortOnClick: (column: ETASortType, order: 'asc' | 'desc') => void;
}

export type MarketsETAHeaderProps = MarketsETAHeaderPublicProps & MarketsETAHeaderCalcedProps;