import { Perspective } from 'components/NewCubeModel';
import { ETAData, ETAMaturityData } from 'pages/CustomShare/CustomShare.props';

export interface CustomShareVariableProps {
  eta?: Perspective;
  /**
   * last price
   */
  underlyingShare: number;
  etaData: ETAData;
  etaMaturityData: ETAMaturityData;
  /**
   * initial price
   */
  lastPrice: number;
  /**
   * price at maturity
   */
  maturityPrice: number;
  /**
   * number of years til maturity
   */
  maturityTerm: number;
}