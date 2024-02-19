import React from 'react';
import { PerspectiveProps } from './Perspective.props';
import ETACube from 'components/fragments/ETAShowCase/ETACube';
import ETAHeader from 'components/fragments/ETAShowCase/ETAHeader';
import Markets from 'components/Markets';
import { MarketsSecurity } from 'common/interfaces/Markets/MarketsSecurity';
import { ISecurity } from 'common/interfaces';
import { useNavigate } from 'react-router-dom';
import { Perspective } from 'components/NewCubeModel';
import ROUTES from 'common/consts/routes';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { ETATypes } from 'common/types';

const PerspectiveView: React.FC<PerspectiveProps> = (
  props: PerspectiveProps
) => {
  const navigate = useNavigate();
  // const [lockETA, setLockETA] = React.useState<boolean | undefined>();

  return (
    <>
      {props.showMarkets ? (
        <Markets
          onCloseMarkets={() => {
            props.setShowMarkets(false);
          }}
          setShowMarkets={props.setShowMarkets}
          handleETAClick={(
            eta: ETATypes,
            security: MarketsSecurity | ISecurity
          ) => {
            props.onHandleSecurityHeld(
              `${security?.longName} (${security?.ticker})`,
              security as Security,
              false,
              true
            );

            let etaTypeColor = 'blue';

            switch (eta) {
              case 'MaxGrowth':
              case 'DivGuard':
                etaTypeColor = 'blue';
                break;
              case 'PureGrowth':
              case 'PureDiv':
                etaTypeColor = 'green';
                break;
              case 'GrowthGuard':
              case 'MaxDiv':
                etaTypeColor = 'red';
                break;
              case 'UltraGrowth':
              case 'UltraGuard':
                etaTypeColor = 'purple';
                break;

              default:
                break;
            }
            props.setEtaType(etaTypeColor as Perspective);
            props.setEta(eta);
            props.setShowMarkets(false);
            navigate(`${ROUTES.PERSPECTIVE}?ticker=${security?.ticker}`);
          }}
        />
      ) : (
        <div className="eta-showcase container-cube w-full flex flex-col font-din2014 h-full gray-background">
          <div className="eta-showcase container-cube flex flex-col font-din2014 h-full">
            <div className="eta-index-model absolute z-1"> </div>
            <ETAHeader
              securityValue={props.securityValue}
              activeSecurity={props.activeSecurity}
              lastPrice={props.lastPrice}
              yieldValue={props.yieldValue}
              lockETA={props.lockETA}
              onHandleSecurityHeld={props.onHandleSecurityHeld}
              onLockETA={props.setLockETA}
              setShowMarkets={props.setShowMarkets}
            />
            <ETACube
              dimensions={{
                width: 450,
                height: 250,
                margin: 15,
              }}
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
              setShowMarkets={props.setShowMarkets}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PerspectiveView;
