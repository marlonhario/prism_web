import React from 'react';
import MaxGrowth from './Growth/MaxGrowth.view';
import DivGuard from './Div/DivGuard.view';
import GrowthGuard from './Growth/GrowthGuard.view';
import MaxDiv from './Div/MaxDiv.view';
import PureGrowth from './Growth/PureGrowth.view';
import PureDiv from './Div/PureDiv.view';
import UltraGrowth from './Growth/UltraGrowth.view';
import UltraGuard from './Div/UltraGuard.view';
import {
  NewDetailedViewProps,
  NewDetailedViewPublicProps,
} from './NewDetailedView.props';

const NewDetailedViewContainer: React.FC<NewDetailedViewPublicProps> = (
  props: NewDetailedViewPublicProps
) => {
  /**
   * @returns the capitalguard
   */
  const getCapitalGuard = () => {
    let capitalGuard: Array<string> = [];
    if (props.profile.isCapitalGuardRequired) {
      const contentGuardValue =
        props.profileType === 'growth'
          ? props.content.growthPercentageofShare
          : props.content.incomePercentageofShare;
      const guardValue = (100 - contentGuardValue).toFixed(2);
      capitalGuard = guardValue.split('.');
    }
    return capitalGuard;
  };

  const combinedProps: NewDetailedViewProps = {
    ...props,
    capitalGuard: getCapitalGuard(),
  };

  switch (props.profile.label) {
    case 'MaxGrowth':
      return <MaxGrowth {...combinedProps} />;
    case 'DivGuard':
      return <DivGuard {...combinedProps} />;
    case 'GrowthGuard':
      return <GrowthGuard {...combinedProps} />;
    case 'MaxDiv':
      return <MaxDiv {...combinedProps} />;
    case 'PureGrowth':
      return <PureGrowth {...combinedProps} />;
    case 'PureDiv':
      return <PureDiv {...combinedProps} />;
    case 'UltraGrowth':
      return <UltraGrowth {...combinedProps} />;
    case 'UltraGuard':
      return <UltraGuard {...combinedProps} />;
    default:
      return <div></div>;
  }
};

export default NewDetailedViewContainer;
