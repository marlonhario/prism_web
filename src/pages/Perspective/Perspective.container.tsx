import { useEffect, useState, FC, useContext } from 'react';
import { PerspectiveProps } from './Perspective.props';
import ETAShowCase from './Perspective.view';
import {
  prismAnnualFee,
  growthProfileContent,
  incomeProfileContent,
} from './utils';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import _, { isEmpty, isUndefined, max } from 'lodash';
import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import { MainContext } from 'context/MainContext';
import apiFetch from 'services/apiFetch';
import { GetETADetails } from 'services/apiEndpoints';
import LoginModal from 'components/fragments/LoginModal';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { Perspective, Profile } from 'components/NewCubeModel';
import ROUTES from 'common/consts/routes';
import { Resizable } from 'components/NewLearnMoreMarket/Resizable';
import PerspectiveMobileView from './Perspective.mobile';
import useWindowSize from 'hooks/useWindowSize';
import { AuthContext } from 'context/AuthContext';
import { motion } from 'framer-motion';
import LeftHandSide from 'components/layouts/LeftHandSide';
import RightHandSide from 'components/layouts/RightHandSide';
import EducationTabs, {
  EducationTabIndex,
} from 'components/fragments/EducationTabs';
import { Intro, About } from 'components/articles';
import { NewLearnMoreMarket } from 'components/NewLearnMoreMarket';
import { ETATypes, Undefinable } from 'common/types';
import useIsDesktop from 'hooks/useIsDesktop';

const PerspectiveContainer: FC = () => {
  const { isOnSecondLayoutChange } = useWindowSize();
  const isDesktop = useIsDesktop();
  const [lockETA, setLockETA] = useState<boolean | undefined>();
  const { prism } = useSelectorSafe((state) => state) || {};
  const navigate = useNavigate();
  const location = useLocation();
  const { expand, educationTabIndex, setETAPairs, setExpand } =
    useContext(MainContext);
  const { isLogin } = useContext(AuthContext);
  const [sliderPercentage, setSliderPercentage] = useState<[number, number]>([
    50, 50,
  ]);
  const [activeSecurity, setActiveSecurity] = useState<Security>(
    {} as Security
  );
  const [securityValue, setSecurityValue] =
    useState<Undefinable<string>>(undefined);
  const [activeEtaType, setActiveEtaType] = useState<Profile | ''>('');
  const [etaType, setEtaType] = useState<Perspective | ''>('');
  const [showMarkets, setShowMarkets] = useState(false);
  const [lastPrice, setLastPrice] = useState<number>(0.0);
  const [yieldValue, setYieldValue] = useState<number>(0.0);
  const [blueState, setBlueValue] = useState<ETAData>({} as ETAData);
  const [redState, setRedValue] = useState<ETAData>({} as ETAData);
  const [purpleState, setPurpleValue] = useState<ETAData>({} as ETAData);
  const [greenState, setGreenValue] = useState<ETAData>({} as ETAData);
  // Either "red", "blue" or 'green'
  // Either "Growth" or "Income"
  const [greenContent, setGreenContent] = useState<Content>({} as Content);
  const [blueContent, setBlueContent] = useState<Content>({} as Content);
  const [redContent, setRedContent] = useState<Content>({} as Content);
  const [purpleContent, setPurpleContent] = useState<Content>({} as Content);
  const initialSliderPosition = 50;
  const [viewMode, setViewMode] = useState<string>('cube');
  // Example Stock will be enabled later
  //const [securityValue, setSecurityValue] = useState(`${exampleSecurityContent.longName} (${exampleSecurityContent.ticker})`);
  // "Undefined is used inorder to render the Placeholder in the ANTD framework"
  const [growthProfile, setGrowthProfile] = useState(growthProfileContent);
  const [incomeProfile, setIncomeProfile] = useState(incomeProfileContent);
  const [showLogin, setShowLogin] = useState(false);
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setActiveSecurity({} as Security);
      setEtaType('');
    };
  }, []);

  useEffect(() => {
    if (showLogin) {
      setExpand(false);
    }
  }, [showLogin]);

  /**
   * @description sets the type whether the eta is growth or income
   * @param eta 
   */
  const setEta = (eta: ETATypes) => {
    let type: Profile = 'growth';
    switch (eta) {
      case 'MaxGrowth':
      case 'PureGrowth':
      case 'GrowthGuard':
      case 'UltraGrowth':
        type = 'growth';
        break;
      case 'MaxDiv':
      case 'PureDiv':
      case 'DivGuard':
      case 'UltraGuard':
        type = 'income';
        break;
      default:
        break;
    }
    setActiveEtaType(type);
  };


  /**
   * @description sets the content and callback for the eta data depending of the eta color
   * @param etaType 
   */
  const fetchEtaContent = (etaType: Perspective | '') => {
    let etaContent = {} as ETAData;
    let etaCallback;
    if (etaType === 'green') {
      etaContent = greenState;
      etaCallback = updateGreenETAContent;
    } else if (etaType === 'blue') {
      etaContent = blueState;
      etaCallback = updateBlueETAContent;
    } else if (etaType === 'red') {
      etaContent = redState;
      etaCallback = updateRedETAContent;
    } else {
      etaContent = purpleState;
      etaCallback = updatePurpleETAContent;
    }
    return {
      etaContent,
      etaCallback,
    };
  };


  /**
   * @description calculate the data to be shown in the  perspective page charts
   * @param etaData 
   * @param lastPrice last price of the selected security
   * @param yieldValueFromObject yield value of the selected security
   * @param slider growth slider value
   * @param slider2 income slider value
   */
  const calculateETAData = (
    etaData: ETAData,
    lastPrice: number,
    yieldValueFromObject: number,
    slider: number,
    slider2?: number
  ) => {
    const growthEstablishmentPrice = etaData.growthEstablishmentPrice;
    const incomeEstablishmentPrice = etaData.incomeEstablishmentPrice;
    const growthLastPrice = etaData.growthLastPrice;
    const incomeLastPrice = etaData.incomeLastPrice;
    const impliedUnderlyingPrice = growthLastPrice + incomeLastPrice;
    // impliedUnderlyingPrice = parseFloat(impliedUnderlyingPrice);
    const sliderRange = slider;
    let adjustGrowthPrice = 0;
    let adjustedIncomePrice = 0;
    if (sliderRange >= 50) {
      const incomeCalcPrice = incomeLastPrice * (1 - (sliderRange - 50) / 50);
      const temp = max<number>([0.01, incomeCalcPrice]);
      const maxValue = !isUndefined(temp) ? temp : 0.01;
      adjustGrowthPrice = impliedUnderlyingPrice - maxValue;
    } else {
      const growthCalcPrice = growthLastPrice * (1 - (50 - sliderRange) / 50);
      const temp = max<number>([0.01, growthCalcPrice]);
      adjustGrowthPrice = !isUndefined(temp) ? temp : 0.01;
    }
    const multipler = lastPrice / adjustGrowthPrice;
    if (!slider2) {
      adjustedIncomePrice = impliedUnderlyingPrice - adjustGrowthPrice;
    } else {
      if (slider2 >= 50) {
        const growthCalcPrice = growthLastPrice * (1 - (slider2 - 50) / 50);
        const temp = max<number>([0.01, growthCalcPrice]);
        const maxValue = !isUndefined(temp) ? temp : 0.01;
        adjustedIncomePrice = impliedUnderlyingPrice - maxValue;
      } else {
        const incomeCalcPrice = incomeLastPrice * (1 - (50 - slider2) / 50);
        const temp = max<number>([0.01, incomeCalcPrice]);
        adjustedIncomePrice = !isUndefined(temp) ? temp : 0.01;
      }
    }

    const normalisedScale = 100;
    // eslint-disable-next-line no-unused-vars
    const normalisedGrowthPrice =
      adjustGrowthPrice * (normalisedScale / impliedUnderlyingPrice); // This will be used while rendering the cube
    // eslint-disable-next-line no-unused-vars
    // const growthMulitplier = lastPrice / adjustGrowthPrice; // This will be used while rendering the cube
    const growthValue = multipler.toFixed(2);

    // const growthETAPrice = parseFloat(adjustGrowthPrice);
    const growthETAPrice = adjustGrowthPrice;
    const growthPercentageofShare =
      (100 * adjustGrowthPrice) / impliedUnderlyingPrice;
    // const incomeETAPrice = parseFloat(adjustedIncomePrice);
    const incomeETAPrice = adjustedIncomePrice;
    const incomePercentageofShare =
      (100 * adjustedIncomePrice) / impliedUnderlyingPrice;
    const derivedDivident =
      (100 *
        (lastPrice * yieldValueFromObject -
          prismAnnualFee *
            (growthEstablishmentPrice + incomeEstablishmentPrice))) /
      adjustedIncomePrice;
    const dividentValue = derivedDivident.toFixed(2);
    // eslint-disable-next-line no-unused-vars
    // const incomeForwardYield = dividentValue; // This will be used while rendering the cube
    const growthSymbol = etaData.growthSymbol;
    const incomeSymbol = etaData.incomeSymbol;
    return {
      growthValue,
      dividentValue,
      growthETAPrice,
      growthPercentageofShare,
      incomeETAPrice,
      incomePercentageofShare,
      growthSymbol,
      incomeSymbol,
      normalisedGrowthPrice,
      growthLastPrice,
      growthEstablishmentPrice,
      incomeEstablishmentPrice,
      incomeLastPrice,
    };
  };

  /**
   * @param etaType 
   */
  const resetExpandedETA = (etaType: Perspective) => {
    const etaData = fetchEtaContent(etaType);
    const derivedETAContent = calculateETAData(
      etaData.etaContent,
      lastPrice,
      yieldValue / 100,
      initialSliderPosition
    );
    etaData.etaCallback(derivedETAContent);
  };

  const updateETAType = (
    newEtaType: Perspective | '',
    activeEtaTypeValue: Profile | '',
    skipResetExpandedETA?: boolean,
    derivedETAContent?: ETAData
  ) => {
    if (fetching) return;

    //Cube
    // Skipping the reset the ETA while navigating between securities
    if (!skipResetExpandedETA && !isEmpty(etaType)) {
      // Resets the already expanded state to it initial state before expanding the new one
      resetExpandedETA(etaType);
    }
    // setEtaType(newEtaType);
    setActiveEtaType(activeEtaTypeValue);

    setEtaType(newEtaType);
    // set the cube to correct colours and highlighted section.
  };

  /**
   * @description This method update the Purple etatype
   * @param calculatedContent Calculated content for the Active Purple ETA Content
   */

  const updatePurpleETAContent = (calculatedContent: ETAData) => {
    const growthData = { ...growthProfile };
    growthData.purple.multipler = calculatedContent.growthValue.split('.');
    setGrowthProfile(growthData);
    const incomeData = { ...incomeProfile };
    incomeData.purple.yield = calculatedContent.dividentValue.split('.');
    setIncomeProfile(incomeData);
    setPurpleContent({
      growthETAPrice: calculatedContent.growthETAPrice,
      growthPercentageofShare: calculatedContent.growthPercentageofShare,
      incomeETAPrice: calculatedContent.incomeETAPrice,
      incomePercentageofShare: calculatedContent.incomePercentageofShare,
      growthSymbol: calculatedContent.growthSymbol,
      incomeSymbol: calculatedContent.incomeSymbol,
      growthLastPrice: calculatedContent.growthLastPrice,
      incomeLastPrice: calculatedContent.incomeLastPrice,
      growthEstablishmentPrice: calculatedContent.growthEstablishmentPrice,
      incomeEstablishmentPrice: calculatedContent.incomeEstablishmentPrice,
    });
  };

  /**
   * @description This method update the RED etatype
   * @param calculatedContent Calculated content for the Active Red ETA Content
   */

  const updateRedETAContent = (calculatedContent: ETAData) => {
    const growthData = { ...growthProfile };
    growthData.red.multipler = calculatedContent.growthValue.split('.');
    setGrowthProfile(growthData);
    const incomeData = { ...incomeProfile };
    incomeData.red.yield = calculatedContent.dividentValue.split('.');
    setIncomeProfile(incomeData);
    setRedContent({
      growthETAPrice: calculatedContent.growthETAPrice,
      growthPercentageofShare: calculatedContent.growthPercentageofShare,
      incomeETAPrice: calculatedContent.incomeETAPrice,
      incomePercentageofShare: calculatedContent.incomePercentageofShare,
      growthSymbol: calculatedContent.growthSymbol,
      incomeSymbol: calculatedContent.incomeSymbol,
      growthLastPrice: calculatedContent.growthLastPrice,
      incomeLastPrice: calculatedContent.incomeLastPrice,
      growthEstablishmentPrice: calculatedContent.growthEstablishmentPrice,
      incomeEstablishmentPrice: calculatedContent.incomeEstablishmentPrice,
    });
  };

  /**
   * @description This method update the BLUE etatype
   * @param calculatedContent Calculated content for the Active Blue ETA Content
   */
  const updateBlueETAContent = (calculatedContent: ETAData) => {
    const growthData = { ...growthProfile };
    growthData.blue.multipler = calculatedContent.growthValue.split('.');
    setGrowthProfile(growthData);
    const incomeData = { ...incomeProfile };
    incomeData.blue.yield = calculatedContent.dividentValue.split('.');
    setIncomeProfile(incomeData);
    setBlueContent({
      growthETAPrice: calculatedContent.growthETAPrice,
      growthPercentageofShare: calculatedContent.growthPercentageofShare,
      incomeETAPrice: calculatedContent.incomeETAPrice,
      incomePercentageofShare: calculatedContent.incomePercentageofShare,
      growthSymbol: calculatedContent.growthSymbol,
      incomeSymbol: calculatedContent.incomeSymbol,
      growthLastPrice: calculatedContent.growthLastPrice,
      incomeLastPrice: calculatedContent.incomeLastPrice,
      growthEstablishmentPrice: calculatedContent.growthEstablishmentPrice,
      incomeEstablishmentPrice: calculatedContent.incomeEstablishmentPrice,
    });
  };

  /**
   * @description This method update the GREEN etatype
   * @param calculatedContent Calculated content for the Active Green ETA Content
   */
  const updateGreenETAContent = (calculatedContent: ETAData) => {
    const growthData = { ...growthProfile };
    growthData.green.multipler = calculatedContent.growthValue.split('.');
    setGrowthProfile(growthData);
    const incomeData = { ...incomeProfile };
    incomeData.green.yield = calculatedContent.dividentValue.split('.');
    setIncomeProfile(incomeData);
    setGreenContent({
      growthETAPrice: calculatedContent.growthETAPrice,
      growthPercentageofShare: calculatedContent.growthPercentageofShare,
      incomeETAPrice: calculatedContent.incomeETAPrice,
      incomePercentageofShare: calculatedContent.incomePercentageofShare,
      growthSymbol: calculatedContent.growthSymbol,
      incomeSymbol: calculatedContent.incomeSymbol,
      growthLastPrice: calculatedContent.growthLastPrice,
      incomeLastPrice: calculatedContent.incomeLastPrice,
      growthEstablishmentPrice: calculatedContent.growthEstablishmentPrice,
      incomeEstablishmentPrice: calculatedContent.incomeEstablishmentPrice,
    });
  };

  /**
   * @description gets the eta data of the security for all eta colors
   * @param lastPrice last price of the selected security
   * @param currentTickerCode ticker code of the selected security
   * @param yieldValue yield value of the selected security
   */
  const getETAs = async (
    lastPrice: number,
    currentTickerCode: string,
    yieldValue: number
  ) => {
    setFetching(true);

    const promise = Promise.all([
      apiFetch(GetETADetails(currentTickerCode, 'GREEN')),
      apiFetch(GetETADetails(currentTickerCode, 'RED')),
      apiFetch(GetETADetails(currentTickerCode, 'BLUE')),
      apiFetch(GetETADetails(currentTickerCode, 'PURPLE')),
    ]).then((response) => {
      return {
        greenETA: response[0].data || {},
        redETA: response[1].data || {},
        blueETA: response[2].data || {},
        purpleETA: response[3].data || {},
      };
    });
    const res: { [key: string]: any } = await promise;
    const names: string[] = _.keys(res || {});
    const etaPairs = names.reduce((arr: Perspective[], k) => {
      if (_.isEmpty(res[k])) return arr;
      return arr.concat(k?.replace('ETA', '') as Perspective);
    }, []);

    const greenETA = res.greenETA;
    const redETA = res.redETA;
    const blueETA = res.blueETA;
    const purpleETA = res.purpleETA;

    // Get all available ETA color for this security
    setETAPairs(etaPairs);
    setFetching(false);

    const greenCalculatedContent = calculateETAData(
      greenETA,
      lastPrice,
      yieldValue,
      initialSliderPosition
    );
    setGreenValue(greenETA);
    updateGreenETAContent(greenCalculatedContent);

    const redCalculatedContent = calculateETAData(
      redETA,
      lastPrice,
      yieldValue,
      initialSliderPosition
    );
    setRedValue(redETA);
    updateRedETAContent(redCalculatedContent);

    const blueCalculatedContent = calculateETAData(
      blueETA,
      lastPrice,
      yieldValue,
      initialSliderPosition
    );
    setBlueValue(blueETA);
    updateBlueETAContent(blueCalculatedContent);

    const purpleCalculatedContent = calculateETAData(
      purpleETA,
      lastPrice,
      yieldValue,
      initialSliderPosition
    );
    setPurpleValue(purpleETA);
    updatePurpleETAContent(purpleCalculatedContent);
  };


  /**
   * @description Handles the selection of Security in the dropdown
   * @param selectedSecurityHeld 
   * @param securityOption 
   * @param updateETA 
   * @param updateETAContent 
   * @param skipETACall 
   */
  const onHandleSecurityHeld = (
    selectedSecurityHeld: string,
    securityOption: Security,
    updateETA = true,
    updateETAContent = true,
    skipETACall?: boolean
  ) => {
    setActiveSecurity(securityOption);
    setSecurityValue(selectedSecurityHeld);
    if (updateETA) {
      updateETAType('', '', true);
    }

    const currentTickerCode = securityOption.ticker;
    const activeSecurity = securityOption;
    setActiveSecurity(activeSecurity);
    setSecurityValue(`${securityOption.longName} (${securityOption.ticker})`);
    if (!isEmpty(activeSecurity)) {
      setLastPrice(parseFloat(activeSecurity.lastPrice.toFixed(2)));
      const forwardYield = activeSecurity.forwardDivYield * 100;
      setYieldValue(parseFloat(forwardYield.toFixed(2)));
    }

    if (!skipETACall) {
      if (!isEmpty(currentTickerCode)) {
        if (updateETAContent) {
          getETAs(
            parseFloat(activeSecurity.lastPrice.toFixed(2)),
            currentTickerCode,
            activeSecurity.forwardDivYield
          );
        }
      }
    }

    navigate(`${ROUTES.PERSPECTIVE}?ticker=${activeSecurity.ticker}`);
  };

  useEffect(() => {
    const securities = prism?.securities;
    if (location.pathname === ROUTES.PERSPECTIVE && !isEmpty(securities)) {
      const search = location.search;
      const ticker = new URLSearchParams(search).get('ticker');
      const security = securities?.find(
        (security) => security.ticker === ticker
      );
      if (isUndefined(security) && isEmpty(activeSecurity)) {
        navigate(ROUTES.HOME);
      } else if (isEmpty(activeSecurity)) {
        onHandleSecurityHeld(
          `${security?.longName} (${security?.ticker})`,
          security as Security,
          false,
          true
        );
      }
    }
  }, [location.pathname, prism]);

  useEffect(() => {
    const { eta, security } = location.state || {};

    if (eta && security) {
      onHandleSecurityHeld(
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

      setEtaType(etaTypeColor as Perspective);
      setEta(eta);
      setShowMarkets(false);
    }
  }, [location.state]);

  /**
   * @description shows the market view if the location state has show markets
   */
  useEffect(() => {
    if (location.state?.showMarkets) {
      if (isLogin) {
        setShowMarkets(true);
      } else {
        if (isOnSecondLayoutChange) {
          setShowLogin(true);
        }
      }

      // navigate(".", { replace: true });
    }
  }, [location.state]);

  useEffect(() => {
    if (
      location.pathname === ROUTES.PERSPECTIVE &&
      !isLogin &&
      isOnSecondLayoutChange
    ) {
      setShowLogin(true);
    }
  }, [location.pathname]);

  const combinedProps: PerspectiveProps = {
    activeSecurity,
    securityValue,
    lastPrice,
    yieldValue,
    activeEtaType,
    etaType,
    viewMode,
    greenContent,
    blueContent,
    redContent,
    purpleContent,
    growthProfile,
    incomeProfile,
    initialSliderPosition,
    sliderPercentage,
    showMarkets,
    setShowMarkets,
    setSliderPercentage,
    setEtaType,
    updateETAType,
    setActiveEtaType,
    setViewMode,
    onHandleSecurityHeld,
    fetchEtaContent,
    calculateETAData,
    setShowLogin,
    setEta,
    lockETA,
    setLockETA,
  };

  const showCase = (
    <Resizable
      render={(width, height) =>
        isOnSecondLayoutChange ? (
          <PerspectiveMobileView
            {...combinedProps}
            dimensions={{ width, height }}
          />
        ) : (
          <ETAShowCase {...combinedProps} />
        )
      }
    />
  );
  // return showLogin ? <LoginModal setShowLogin={setShowLogin} /> : showCase;

  const isCubeActive = !!(!isEmpty(activeSecurity) && etaType);

  //set the left hand side and right hand site display (hidden or shown) depending on the tab selected and if it is desktop or mobile view
  let leftHandClass: string = 'block';
  let rightHandClass: string = 'hidden lg:block';
  if (!isEmpty(activeSecurity) || showMarkets) {
    leftHandClass = 'hidden lg:block';
    rightHandClass = 'block';
    if (educationTabIndex === EducationTabIndex.ABOUT && etaType !== '') {
      if (!isDesktop) {
        setActiveSecurity({} as Security);
      }

      setEtaType('');
    }
  }
  return (
    <>
      <LeftHandSide className={leftHandClass}>
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: !isCubeActive ? 0 : '100%' }}
            exit={{ x: !isCubeActive ? '100%' : 0 }}
            transition={{ bounce: 0 }}
            className={'absolute top-0 right-0 bottom-0 left-0'}
          >
            <EducationTabs>
              <>
                {educationTabIndex === EducationTabIndex.HOME && (
                  <Intro expanded={expand} />
                )}
                {educationTabIndex === EducationTabIndex.ABOUT && (
                  <About expanded={expand} />
                )}
              </>
            </EducationTabs>
          </motion.div>

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: isCubeActive ? 0 : '100%' }}
            exit={{ x: isCubeActive ? '100%' : 0 }}
            transition={{ bounce: 0 }}
            className={'absolute top-0 right-0 bottom-0 left-0'}
          >
            {isCubeActive && (
              <NewLearnMoreMarket
                activeSecurity={activeSecurity}
                perspective={etaType as Perspective}
                expanded={expand}
                activeEtaType={activeEtaType}
              />
            )}
          </motion.div>
        </>
      </LeftHandSide>
      <RightHandSide className={rightHandClass}>
        {showLogin ? <LoginModal setShowLogin={setShowLogin} /> : showCase}
      </RightHandSide>
    </>
  );
};

export default PerspectiveContainer;
