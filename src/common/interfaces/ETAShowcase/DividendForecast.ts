import { Nullable } from 'common/types';

export interface DividendForecast {
  declareDate: Date;
  exDate: Date;
  id?: Nullable<string>;
  optionsImpliedHight?: Nullable<string>;
  optionsImpliedLow?: Nullable<string>;
  payDate: Date;
  perShareAmount: number;
  ticker: string;
  timestamp: number;
  trend: number;
  dividendETA?: number;
}
