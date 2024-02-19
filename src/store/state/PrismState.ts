import { MarketsSecurity } from "common/interfaces/Markets/MarketsSecurity";

export type PrismState = {
  securities: MarketsSecurity[];
};

export const PrismEmptyState: PrismState = {
  securities: []
};
