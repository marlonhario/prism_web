import { ETAListPublicProps } from './ETAList.props';
import { MarketsETA } from 'common/interfaces/Markets/MarketsETA';
import { useContext, useEffect, useState } from 'react';
import ETAListView from './ETAList.view';
import { MainContext } from 'context/MainContext';
import { getETAsByType } from 'common/utils/etas';

const ETAListContainer: React.FC<ETAListPublicProps> = (
  props: ETAListPublicProps
) => {
  const { etas } = useContext(MainContext);
  const [growthETAs, setGrowthETAs] = useState<MarketsETA[]>([]);
  const [divETAs, setDivETAs] = useState<MarketsETA[]>([]);
 

  useEffect(() => {
    let { growth, div } = getETAsByType(etas);

    setGrowthETAs(growth);
    setDivETAs(div);
  }, etas);

  return (
    <ETAListView
      divETAs={divETAs}
      growthETAs={growthETAs}
      selectedEtas={props.selectedEtas}
      setAllShown={props.setAllShown}
      setSelectedEtas={props.setSelectedEtas}
      closeMarkets={props.closeMarkets}
      handleETAClick={props.handleETAClick}
      setGrowthETAs={setGrowthETAs}
      setDivETAs={setDivETAs}
    />
  );
};

export default ETAListContainer;
