import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import { DefaultShares } from 'common/consts';
import { ETAPairs } from 'common/enums';
import { ISecurity } from 'common/interfaces';
import { ETAPairing, Nullable } from 'common/types';
import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';
import apiFetch, { GetETADetails, GetAnnualForecast } from 'services/apiFetch';
import useEquityOptimiser, {
  EquityOptimiserSliders,
} from 'hooks/useEquityOptimiser';
import { EquityOptimiserProps } from './EquityOptimiser.props';
import EquityOptimiserView from './EquityOptimiser.view';
import { OptimiserContext } from 'context/OptimiserContext';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { motion } from 'framer-motion';
import LeftHandSide from 'components/layouts/LeftHandSide';
import RightHandSide from 'components/layouts/RightHandSide';
import EducationTabs from 'components/fragments/EducationTabs';
import { EquityOptimiserEducation } from 'components/articles';

const DEFAULT_ETA_PAIR = 'Red';

const EquityOptimiserContainer: React.FC = () => {
  const { prism } = useSelectorSafe((state) => state) || {};
  const {
    calc,
    etaDetails,
    security,
    sliders,
    totalShares,
    setETADetails,
    setSecurity,
    setTotalShares,
    updateSliders,
  } = useEquityOptimiser();
  const { step, setStep } = useContext(OptimiserContext);
  const [etaPairing, setETAPairing] =
    useState<Nullable<ETAPairing>>(DEFAULT_ETA_PAIR);
  const [etaPairs, setETAPairs] =
    useState<Nullable<{ [key: string]: any }>>(null);
  const [focusField, setFocusField] = useState<string>('shares');
  const [hideSecurities, setHideSecurities] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [dividendForecast, setDividendForecast] = useState<DividendForecast[]>(
    []
  );
  const [showMarkets, setShowMarkets] = useState(false);


  /**
   * @description gets the data to be shown in the page
   * @param ticker current security ticker
   * @param etaPairing 
   */
  const getETAData = async (ticker: string, etaPairing: string) => {
    const etaPairNames: string[] = [];

    for (var n in ETAPairs) {
      if (typeof ETAPairs[n] === 'number') etaPairNames.push(n);
    }

    const promise = Promise.all([
      // Fetch ETA pairs data at once
      ..._.map(etaPairNames, (n) => apiFetch(GetETADetails(ticker, n))),
      apiFetch(GetAnnualForecast(ticker)),
    ]).then((arr) => {
      const etaData = _.reduce(
        etaPairNames,
        (obj, n, i) => ({ ...obj, [n]: arr[i]?.data || null }),
        {}
      );
      return {
        ...etaData,
        forecast: _.orderBy(
          arr[etaPairNames?.length]?.data || [],
          [(obj) => new Date(obj.declareDate)],
          ['asc']
        ),
      };
    });
    const { forecast, ...res }: { [key: string]: any } = await promise;
    setETAPairs(res);
    setDividendForecast(forecast);
    setETADetails(res[etaPairing.toUpperCase()] || null);
  };

  const handleETAChange = (etaColor: ETAPairing) => {
    if (totalShares > 0) {
      if (etaPairs) {
        setETADetails(etaPairs[etaColor.toUpperCase()]);
      }
      setETAPairing(etaColor);
    }
  };

  /**
   * @description handles the selection of the security
   * @param security the selected security in the  dropdown
   */
  const handleSecurityChange = (security: Nullable<ISecurity>) => {
    setETAPairs(null);
    setHideSecurities(security ? true : false);
    setSecurity(security);
    setStep(1);

    if (security) {
      getETAData(security.ticker, etaPairing || DEFAULT_ETA_PAIR);
    }
  };

  const handleSlide = (slider: string, val: number) => {
    updateSliders(slider as keyof EquityOptimiserSliders, val);
  };

  /**
   * @description handles the click of the markets button
   */
  const handleClickMarkets = () => (e: React.MouseEvent) => {
    e.preventDefault();
    // handleSecurityChange({} as ISecurity);
    setShowMarkets(true);
    localStorage.setItem('defaultLightBox', 'EtaMarkets');
  };

  const toggleETASelector = (hidden: boolean) => {
    setHideSecurities(hidden);
  };

  useEffect(() => {
    if (security) {
      setTotalAmount(DefaultShares * (security?.lastPrice || 0));
      setTotalShares(DefaultShares);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security]);

  const combinedProps: EquityOptimiserProps = {
    calc,
    dividendForecast,
    etaDetails,
    etaPairing,
    focusField,
    hideSecurities,
    growthSlider: sliders.growth,
    incomeSlider: sliders.income,
    security,
    totalAmount,
    totalShares,
    showMarkets,
    setShowMarkets,
    handleClickMarkets,
    securities: prism?.securities || [],
    handleChangeAmount: (amount: number) => {
      setTotalAmount(Math.round(amount || 0));
      setTotalShares(Math.trunc(amount / (security?.lastPrice || 0)));
    },
    handleChangeShares: (shares: number) => {
      setTotalAmount((security?.lastPrice || 0) * shares);
      setTotalShares(shares || 0);
    },
    handleChangePresetAll: (slider: keyof EquityOptimiserSliders) => {
      handleSlide(slider, 200);
    },
    handleChangePresetRelease: (slider: keyof EquityOptimiserSliders) => {
      handleSlide(slider, 0);
    },
    handleFocusField: (name: string) => setFocusField(name),
    handleETAChange,
    handleSecurityChange,
    handleSlide,
    toggleETASelector,
  };

  return (
    <>
      <LeftHandSide>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ bounce: 0 }}
          className={'absolute top-0 right-0 bottom-0 left-0'}
        >
          <EducationTabs>
            <EquityOptimiserEducation />
          </EducationTabs>
        </motion.div>
      </LeftHandSide>
      <RightHandSide>
        <EquityOptimiserView {...combinedProps} />;
      </RightHandSide>
    </>
  );
};

export default EquityOptimiserContainer;
