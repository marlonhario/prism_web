import { ETAPairing, Nullable } from 'common/types';
import { ISecurity } from 'common/interfaces';
import { EquityReleaseCalculator } from 'hooks/useEquityOptimiser';
import { ColorButton } from 'components/primitives';
import { SecurityDropdown } from 'components/snippets';
import SmallCube from 'assets/svg/small_cube.svg';


const EquityTopBar: React.FC<{
  calc: EquityReleaseCalculator;
  etaPairing: Nullable<ETAPairing>;
  hideSecurities?: boolean;
  security: Nullable<ISecurity>;
  securities?: ISecurity[];
  handleETAChange: (etaColor: ETAPairing) => void;
  handleSecurityChange: (security: ISecurity) => void;
  toggleETASelector: (hidden: boolean) => void;
  handleClickMarkets: () => (e: React.MouseEvent) => void;
}> = ({
  calc,
  etaPairing = null,
  hideSecurities = false,
  security = null,
  securities = [],
  ...props
}) => {


  return (
    <>
      <div
        className="market-container flex flex-row gap-x-3 items-center cursor-pointer w-1/4 pl-5"
        onClick={props.handleClickMarkets()}
      >
        <img src={SmallCube} alt="small cube" />
        <div className="flex flex-col">
          <h3 className="mb-0 text-white text-[22px] leading-[22px] font-bold">
            ETA
          </h3>
          <span className="mb-0 text-[#DDDDDD] text-[17px] leading-[17px]">
            MARKETS
          </span>
        </div>
      </div>
      <div
        className="py-1 flex justify-center items-center w-1/2"
        style={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}
      >
        <div className="equity-optimiser__tools security-autocomplete max-w-lg">

          <SecurityDropdown securities={securities} security={security} onSelect={props.handleSecurityChange} />

          
        </div>
      </div>
      {security && (
        <div className="absolute right-1 w-32 h-full flex flex-col justify-center items-center">
          <span className="mb-1 uppercase text-[11px] text-[#474C55]">
            Convert with
          </span>
          <div className="flex gap-x-2">
            {['Red', 'Green', 'Blue'].map((color) => (
              <ColorButton
                key={color}
                active={etaPairing === color}
                color={color as ETAPairing}
                onClick={() => props.handleETAChange(color as ETAPairing)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EquityTopBar;
