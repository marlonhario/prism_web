import { useContext, useEffect, useState } from 'react';
import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import { isEmpty, isUndefined } from 'lodash';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { MainContext } from 'context/MainContext';

import { ETACubeProps, ETACubePublicProps } from './ETACube.props';
import ETACube from './ETACube.view';
import { Perspective, Profile } from 'components/NewCubeModel';

const ETACubeContainer: React.FC<ETACubePublicProps> = (
  props: ETACubePublicProps
) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLastView, setIsLastView] = useState(false);

  const { etaPairs } = useContext(MainContext);

  const [eta, setEta] = useState<any>({
    percentage: [50, 50],
  });

  /**
   * @description handles the change of the slider values
   * @param value the slider values
   * @param etaType the current ETA color
   */
  const handleETAPercentageChange = (
    value: [number, number],
    etaType: Perspective | ''
  ) => {
    // setEta((prev: any) => ({
    //   ...prev,
    //   percentage: value,
    // }));
    props.setSliderPercentage(value);

    const etaData = props.fetchEtaContent(etaType || '');
    const derivedETAContent = props.calculateETAData(
      etaData.etaContent,
      props.lastPrice,
      props.yieldValue / 100,
      value[0],
      value[1]
    );
    if (etaType !== 'red') {
      setEta((prev: any) => ({
        ...prev,
        percentage: [
          derivedETAContent.growthPercentageofShare,
          derivedETAContent.incomePercentageofShare,
        ],
      }));
    } else {
      setEta((prev: any) => ({
        ...prev,
        percentage: [
          derivedETAContent.incomePercentageofShare,
          derivedETAContent.growthPercentageofShare,
        ],
      }));
    }

    etaData.etaCallback(derivedETAContent);
  };

  /**
   * @description gets the content to show in the Perspective page depending on the eta type
   */
  const getActiveContent = () => {
    if (props.etaType === 'green') return props.greenContent;
    else if (props.etaType === 'red') return props.redContent;
    else if (props.etaType === 'purple') return props.purpleContent;
    return props.blueContent;
  };

  /**
   * @description Resets the sliders value once a new ETA is selected
   * @param newEtaType newEtaType the new selected eta color
   * @param derivedETAContent 
   */
  const setCubePercentage = (
    newEtaType: Perspective | '',
    derivedETAContent?: ETAData
  ) => {
    let contentValue = {} as Content;
    switch (newEtaType) {
      case 'green':
        contentValue = isUndefined(derivedETAContent)
          ? props.greenContent
          : derivedETAContent;
        break;
      case 'blue':
        contentValue = isUndefined(derivedETAContent)
          ? props.blueContent
          : derivedETAContent;

        break;
      case 'red':
        contentValue = isUndefined(derivedETAContent)
          ? props.redContent
          : derivedETAContent;
        break;
      case 'purple':
        contentValue = isUndefined(derivedETAContent)
          ? props.purpleContent
          : derivedETAContent;
        break;
      default:
        break;
    }

    if (newEtaType !== 'red') {
      setEta((prev: any) => ({
        ...prev,
        percentage: [
          contentValue.growthPercentageofShare,
          contentValue.incomePercentageofShare,
        ],
      }));
    } else {
      setEta((prev: any) => ({
        ...prev,
        percentage: [
          contentValue.incomePercentageofShare,
          contentValue.growthPercentageofShare,
        ],
      }));
    }
    props.setSliderPercentage([50, 50]);
  };

  /**
   * @description updates the cube allocation percentage when a new eta color is selected
   * @param newEtaType the new selected eta color
   * @param activeEtaTypeValue the active eta (growth or income)
   * @param skipResetExpandedETA 
   * @param derivedETAContent 
   */
  const updateCubePercentage = (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: ETAData
  ) => {
    props.updateETAType(
      newEtaType,
      activeEtaTypeValue,
      skipResetExpandedETA,
      derivedETAContent
    );
    if (!isEmpty(newEtaType)) {
      setCubePercentage(newEtaType, derivedETAContent);
    }
  };

  useEffect(() => {
    if (
      (!!props.activeEtaType &&
        !!props.etaType &&
        !isEmpty(props.greenContent)) ||
      !isEmpty(props.blueContent || !isEmpty(props.redContent))
    ) {
      setCubePercentage(props.etaType || '');

      props.setSliderPercentage([50, 50]);
    }
  }, [
    props.etaType,
    props.greenContent.growthSymbol,
    props.blueContent.growthSymbol,
    props.redContent.growthSymbol,
    props.purpleContent.growthSymbol,
  ]);

  useEffect(() => {
    if (props.purpleContent.growthSymbol) {
      updateCubePercentage('purple', 'growth');
    }
  }, [props.purpleContent.growthSymbol]);

  const combinedProps: ETACubeProps = {
    ...props,
    activeSecurity: props.activeSecurity,
    eta,
    etaPairs,
    getActiveContent,
    handleETAPercentageChange,
    updateCubePercentage,
    showIntro,
    setShowIntro,
    isLastView,
    setIsLastView,
    lockETA: props.lockETA,
    handleSecurityChange: props.handleSecurityChange,
    setShowMarkets: props.setShowMarkets,
  };

  return <ETACube {...combinedProps} />;
};

export default ETACubeContainer;
