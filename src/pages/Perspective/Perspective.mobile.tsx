import ETACube from 'components/fragments/ETAShowCase/ETACube';
import { FC } from 'react';
import Markets from 'components/Markets';
import { PerspectiveProps } from './Perspective.props';
import { Security } from 'common/interfaces/ETAShowcase/Security';

import 'pages/ShowCase/styles.scss';
interface PerspectivePropsMobile extends PerspectiveProps {
  dimensions: {
    width: number;
    height: number;
  };
}

const PerspectiveMobileView: FC<PerspectivePropsMobile> = (props) => {
  const getEtaType = (eta: string) => {
    switch (eta) {
      case 'MaxGrowth':
      case 'DivGuard':
        return 'blue';

      case 'PureGrowth':
      case 'PureDiv':
        return 'green';

      case 'GrowthGuard':
      case 'MaxDiv':
        return 'red';

      case 'UltraGrowth':
      case 'UltraGuard':
        return 'purple';

      default:
        return 'red';
    }
  }

  const handleSelectSecurity = (eta: string, security: Security) => {
    props.onHandleSecurityHeld(
      `${security.longName} (${security.ticker})`,
      security,
      false,
      true
    );

    props.setEtaType(getEtaType(eta));
    props.setShowMarkets(false);
  };

  return (
    <>
      {props.showMarkets ? (
        <Markets
          onCloseMarkets={() => {
            props.setShowMarkets(false);
          }}
          setShowMarkets={props.setShowMarkets}
          handleETAClick={handleSelectSecurity}
        />
      ) : (
        <div className="mobile-perspective w-full h-full">
          <div className="eta-showcase container-cube w-full flex flex-col font-din2014 h-full gray-background">
            <div className="eta-index-model absolute z-1"> </div>

            <ETACube
              isMobileCubeView
              dimensions={{ ...props.dimensions, margin: 0 }}
              activeEtaType={props.activeEtaType}
              etaType={props.etaType}
              viewMode={props.viewMode}
              lastPrice={props.lastPrice}
              yieldValue={props.yieldValue}
              greenContent={props.greenContent}
              blueContent={props.blueContent}
              redContent={props.redContent}
              purpleContent={props.purpleContent}
              activeSecurity={props.activeSecurity}
              growthProfile={props.growthProfile}
              incomeProfile={props.incomeProfile}
              initialSliderPosition={props.initialSliderPosition}
              sliderPercentage={props.sliderPercentage}
              lockETA={props.lockETA}
              setSliderPercentage={props.setSliderPercentage}
              setEtaType={props.setEtaType}
              updateETAType={props.updateETAType}
              setActiveEtaType={props.setActiveEtaType}
              setViewMode={props.setViewMode}
              fetchEtaContent={props.fetchEtaContent}
              calculateETAData={props.calculateETAData}
              setShowLogin={props.setShowLogin}
              handleSecurityChange={(security) => handleSelectSecurity('red', security)}
              setShowMarkets={props.setShowMarkets}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PerspectiveMobileView;
