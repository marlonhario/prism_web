
import { MarketsETA } from 'common/interfaces/Markets/MarketsETA';
import { useContext, useEffect, useState } from 'react';
import {
  MarketsTableETAPublicProps,
  MarketsTableETAProps,
} from './MarketsTableETA.props';
import MarketsTableETAView from './MarketsTableETA.view';
import { MainContext } from 'context/MainContext';
import { getETAsByType } from 'common/utils/etas';

const MarketsTableETAContainer: React.FC<MarketsTableETAPublicProps> = (
  props: MarketsTableETAPublicProps
) => {
  const { etas } = useContext(MainContext);
  const [growthETAs, setGrowthETAs] = useState<MarketsETA[]>([]);
  const [divETAs, setDivETAs] = useState<Array<MarketsETA>>([]);

  useEffect(() => {
    const securityETAs = etas.filter(
      (eta) => eta.underlyingSymbol === props.security.ticker
    );
    let { growth, div } = getETAsByType(securityETAs);
    setGrowthETAs(growth);
    setDivETAs(div);
  }, [etas]);

  const combinedProps: MarketsTableETAProps = {
    ...props,
    growthETAs,
    divETAs,
  };

  return <MarketsTableETAView {...combinedProps} />;
};

export default MarketsTableETAContainer;
