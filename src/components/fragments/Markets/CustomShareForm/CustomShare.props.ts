export interface CustomShareFormProps {
    underlyingShareForm: number | undefined;
    dividendYieldForm: number | undefined;
    currency: string;
    setUnderlyingShareForm: (underlyingShareForm: number) => void;
    setDividendYieldForm: (underlyingShareForm: number) => void;
    setCurrency: (currency: string) => void;
    handleFormRequest: () => void;
}