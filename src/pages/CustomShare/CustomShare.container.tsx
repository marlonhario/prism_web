import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftHandSide from 'components/layouts/LeftHandSide';
import RightHandSide from 'components/layouts/RightHandSide';
import EducationTabs from 'components/fragments/EducationTabs';
import CustomShareVariable from 'components/CustomShareVariable';
import { motion } from 'framer-motion';
import {
  contextDefaultValues,
  useCustomShareContext,
} from 'context/CustomShareContext';
import useMediaQuery from 'hooks/useMediaQuery';
import { prismAnnualFee } from 'components/Canyon/utils';
import { Allocations, Perspective } from 'components/NewCubeModel';
import { formatNumber } from 'components/NewLearnMoreMarket/utils';
import { Resizable } from 'components/NewLearnMoreMarket/Resizable';
import { calculateETAData, calculateETAMaturityData } from './utils';
import CustomShareViewMobile from './CustomShare.mobile';
import CustomShareView from './CustomShare.view';
import {
  DivColors,
  DIV_CHART_BLUE,
  DIV_CHART_DEFAULT,
  DIV_CHART_GREEN,
  DIV_CHART_PURPLE,
  DIV_CHART_RED,
  GrowthColors,
  GROWTH_CHART_BLUE,
  GROWTH_CHART_DEFAULT,
  GROWTH_CHART_GREEN,
  GROWTH_CHART_PURPLE,
  GROWTH_CHART_RED,
} from 'common/consts/chartColors';
import {
  growthProfileContent,
  incomeProfileContent,
} from 'pages/Perspective/utils';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import Markets from 'components/Markets';
import ROUTES from 'common/consts/routes';

export default function CustomShareContainer({
  useMobileHeader = true,
}: {
  useMobileHeader?: boolean;
}) {
  const {
    security,
    eta,
    underlyingShare,
    dividendYield,
    lastPriceSlider,
    maturityPriceSlider,
    maturityTermSlider,
    profileView,
    currency,
    setETA,
    setLastPriceSlider,
    setMaturityPriceSlider,
    setMaturityTermSlider,
    setProfileView,
  } = useCustomShareContext();

  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [growthProfile, setGrowthProfile] = useState<ProfileInterface>(
    {} as ProfileInterface
  );
  const [incomeProfile, setIncomeProfile] = useState<ProfileInterface>(
    {} as ProfileInterface
  );
  const [growthChartColor, setGrowthChartColor] = useState<GrowthColors>(
    {} as GrowthColors
  );
  const [divChartColor, setDivChartColor] = useState<DivColors>(
    {} as DivColors
  );

  const [growthRiskExposure, setGrowthRiskExposure] =
    useState<React.ReactChild>('');
  const [incomeRiskExposure, setIncomeRiskExposure] =
    useState<React.ReactChild>('');
  const [showMarkets, setShowMarkets] = useState<boolean>(false);

  const etaMaturityData = useMemo(() => {
    const { growthETALastPrice, incomeETALastPrice } = security;

    return calculateETAMaturityData(
      growthETALastPrice,
      incomeETALastPrice,
      maturityPriceSlider
    );
  }, [security, maturityPriceSlider]);

  /**
   * compute and memoized initial eta data
   */
  const etaData = useMemo(() => {
    const { growthETALastPrice, incomeETALastPrice } = security;
    const { maturityGrowthETAPrice, maturityIncomeETAPrice } = etaMaturityData;
    const dividendYieldPercentage = dividendYield / 100;

    return calculateETAData(
      underlyingShare,
      dividendYieldPercentage,
      growthETALastPrice,
      incomeETALastPrice,
      maturityGrowthETAPrice,
      maturityIncomeETAPrice,
      lastPriceSlider
    );
  }, [
    security,
    underlyingShare,
    dividendYield,
    lastPriceSlider,
    etaMaturityData,
  ]);

  /**
   * compute and memoized dividend forecast individual price
   */
  const dividendForecastData = useMemo(() => {
    const dividendYieldPercentage = dividendYield / 100;
    const establishmentPrice =
      etaData.growthEstablishmentPrice + etaData.incomeEstablishmentPrice;
    const feeAmount = establishmentPrice * prismAnnualFee;
    const perShareAmount =
      underlyingShare * dividendYieldPercentage - feeAmount;

    return Array(maturityTermSlider).fill({
      dividendETA: formatNumber(perShareAmount, 2),
    });
  }, [underlyingShare, dividendYield, maturityTermSlider, etaData]);

  /**
   * compute and memoized cube allocation/distribution
   */
  const cubePercentage = useMemo((): Allocations => {
    const { maturityGrowthETAPrice, maturityIncomeETAPrice } = etaMaturityData;

    return profileView === 'default'
      ? [50, 50]
      : [
        (maturityGrowthETAPrice / underlyingShare) * 100,
        (maturityIncomeETAPrice / underlyingShare) * 100,
      ];
  }, [underlyingShare, profileView, etaMaturityData]);

  const etaColors = useMemo(() => {
    const colors = [
      undefined,
      'red',
      'green',
      'blue',
      'purple',
    ] as Perspective[];

    if (isMobile) {
      return colors.filter(Boolean);
    }

    return colors;
  }, [isMobile]);

  const getCapitalGuard = (profileType: 'growth' | 'income') => {
    const contentGuardValue =
      profileType === 'growth'
        ? etaData.growthPercentageofShare
        : etaData.incomePercentageofShare;
    const guardValue = (100 - contentGuardValue).toFixed(2);
    return guardValue.split('.');
  };

  useEffect(() => {
    return () => {
      setETA(undefined);
      setLastPriceSlider(contextDefaultValues.lastPriceSlider);
      setMaturityPriceSlider(contextDefaultValues.maturityPriceSlider);
      setMaturityTermSlider(contextDefaultValues.maturityTermSlider);
    };
  }, []);

  useEffect(() => {
    const growthCapitalGuard = getCapitalGuard('growth');
    const divCapitalGuard = getCapitalGuard('income');
    switch (eta) {
      case 'red':
        setGrowthProfile(growthProfileContent.red);
        setIncomeProfile(incomeProfileContent.red);
        setGrowthChartColor(GROWTH_CHART_RED);
        setDivChartColor(DIV_CHART_RED);
        setGrowthRiskExposure(
          <>
            {growthCapitalGuard[0]}.{growthCapitalGuard[1]}%
            <br />
            <span className="text-xs">GUARDED</span>
          </>
        );
        setIncomeRiskExposure(
          <>
            1<sup className="text-xxs">st</sup> Loss
          </>
        );
        break;
      case 'blue':
        setGrowthProfile(growthProfileContent.blue);
        setIncomeProfile(incomeProfileContent.blue);
        setGrowthChartColor(GROWTH_CHART_BLUE);
        setDivChartColor(DIV_CHART_BLUE);
        setGrowthRiskExposure(
          <>
            1<sup className="text-xxs">st</sup> Loss
          </>
        );
        setIncomeRiskExposure(
          <>
            {divCapitalGuard[0]}.{divCapitalGuard[1]}%
            <br />
            <span className="text-xs">GUARDED</span>
          </>
        );
        break;
      case 'green':
        setGrowthProfile(growthProfileContent.green);
        setIncomeProfile(incomeProfileContent.green);
        setGrowthChartColor(GROWTH_CHART_GREEN);
        setDivChartColor(DIV_CHART_GREEN);
        setGrowthRiskExposure(<>Shared</>);
        setIncomeRiskExposure(<>Shared</>);
        break;
      case 'purple':
        setGrowthProfile(growthProfileContent.purple);
        setIncomeProfile(incomeProfileContent.purple);
        setGrowthChartColor(GROWTH_CHART_PURPLE);
        setDivChartColor(DIV_CHART_PURPLE);
        setGrowthRiskExposure(
          <>
            1<sup className="text-xxs">st</sup> Loss
          </>
        );
        setIncomeRiskExposure(
          <>
            {divCapitalGuard[0]}.{divCapitalGuard[1]}%
            <br />
            <span className="text-xs">GUARDED</span>
          </>
        );
        break;
      default:
        setGrowthProfile(growthProfileContent.red);
        setIncomeProfile(incomeProfileContent.red);
        setGrowthChartColor(GROWTH_CHART_DEFAULT);
        setDivChartColor(DIV_CHART_DEFAULT);
        setGrowthRiskExposure(
          <>
            {growthCapitalGuard[0]}.{growthCapitalGuard[1]}%
            <br />
            <span className="text-xs">GUARDED</span>
          </>
        );
        setIncomeRiskExposure(
          <>
            1<sup className="text-xxs">st</sup> Loss
          </>
        );
        break;
    }
  }, [eta]);

  useEffect(() => {
    if (isMobile) {
      setETA('red');
    } else {
      setETA(undefined);
    }
  }, [isMobile]);

  useEffect(() => {
    setShowMarkets(location.state?.showMarkets || false);
  }, [location.state]);

  const handleShowMarkets = (show = true) => {
    setShowMarkets(show);
  };

  const childProps = {
    eta,
    etaColors,
    currency,
    underlyingShare,
    dividendYield,
    etaData,
    etaMaturityData,
    dividendForecastData,
    cubePercentage,
    lastPrice: lastPriceSlider,
    maturityPrice: maturityPriceSlider,
    maturityTerm: maturityTermSlider,
    profileView,
    growthProfile,
    incomeProfile,
    growthChartColor,
    divChartColor,
    growthRiskExposure,
    incomeRiskExposure,
    onChangeETA: setETA,
    onChangeLastPrice: setLastPriceSlider,
    onChangeMaturityPrice: setMaturityPriceSlider,
    onChangeMaturityTerm: setMaturityTermSlider,
    onChangeProfileView: setProfileView,
    onShowMarkets: handleShowMarkets,
  };

  return (
    <>
      <LeftHandSide className='hidden lg:block'>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ bounce: 0 }}
          className={'absolute top-0 right-0 bottom-0 left-0'}
        >
          <EducationTabs>
            {isMobile ? null : <CustomShareVariable />}
          </EducationTabs>
        </motion.div>
      </LeftHandSide>

      <RightHandSide>
        {showMarkets ? (
          <Markets
            onCloseMarkets={() => handleShowMarkets(false)}
            setShowMarkets={setShowMarkets}
            handleETAClick={(eta, security) =>
              navigate(`${ROUTES.PERSPECTIVE}?ticker=${security.ticker}`, {
                state: { eta, security },
              })
            }
          />
        ) : (
          <Resizable
            render={(width, height) =>
              width <= 1024 ? (
                <CustomShareViewMobile
                  {...childProps}
                  dimensions={{ width, height }}
                  isMobile={isMobile}
                  useMobileHeader={useMobileHeader}
                />
              ) : (
                <CustomShareView {...childProps} />
              )
            }
          />
        )}
      </RightHandSide>
    </>
  );
}
