import { PrismState } from './PrismState';
import TokenState from './TokenState';

export interface AppState {
  token: TokenState;
  prism: PrismState;
}
