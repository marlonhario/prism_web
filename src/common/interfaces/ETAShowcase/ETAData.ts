export interface ETAData {
    etaName?: string;
    etaType?: string;
    selectedEtaType?: string;
    underlyingSymbol?: string;
    growthValue: string;
    dividentValue: string;
    growthETAPrice: number;
    growthPercentageofShare: number;
    incomeETAPrice: number;
    incomePercentageofShare: number;
    growthSymbol: string;
    incomeSymbol: string;
    normalisedGrowthPrice?: number;
    growthLastPrice: number;
    growthEstablishmentPrice: number;
    incomeEstablishmentPrice: number;
    incomeLastPrice: number;
    growthMultiple?: number;
    etaYield?: number;
    issueDate?: string;
    maturityDate?: string;
}