export interface ProfileInterface {
    label: string;
    incomeLabel: string;
    growthLabel: string;
    subLabel?: string;
    riskProfile?: string;
    renderOnlybar?: boolean;
    colorCode?: string;
    type: string;
    multipler: Array<string>;
    rangeLabel: string;
    valueAllocation?: string;
    yield: Array<string>;
    expandedHeaderColor: string;
    collapsedHeaderColor: string;
    collapsedContentColor: string;
    capitalExposure?: string;
    isCapitalGuardRequired?: boolean;
    expandedContentColor?: string;
    capitalGuardImageColor?: string;
}