import {
  MarketsModalFilterProps,
  MarketsModalFilterPublicProps,
} from './MarketsModalFilter.props';
import { defaultTo, isUndefined } from 'lodash';
import MarketsModalFilterView from './MarketsModalFilters.view';
import { useEffect, useRef, useState } from 'react';
import { Nullable } from 'common/types';

const MarketsModalFilterContainer: React.FC<MarketsModalFilterPublicProps> = (
  props: MarketsModalFilterPublicProps
) => {
  const regionRef = useRef<HTMLInputElement[]>([]);
  const [tempIndustry, setTempIndustry] = useState<Nullable<string>>(null);
  const [tempSector, setTempSector] = useState<Nullable<string>>(null);

  useEffect(() => {
    setTempIndustry(props.industry);
    setTempSector(props.sector);
  }, [])

  const addToRegionsRefs = (el: HTMLInputElement) => {
    if (
      !isUndefined(regionRef.current) &&
      el &&
      !regionRef.current.some((e) => e.value === el.value)
    ) {
      regionRef.current.push(el);
    }
  };


  const onFilter = () => {
    props.setSelectedRegions(filterCheckboxes(regionRef.current));
    props.setIndustry(tempIndustry);
    props.setSector(tempSector);
    props.setShowModal(false);
  };

  const filterCheckboxes = (checkboxRef: HTMLInputElement[]) => {
    return checkboxRef
      ? checkboxRef
          ?.filter((val: HTMLInputElement) => val.checked)
          ?.map((val: HTMLInputElement) => val.value)
      : [];
  };

  const combinedProps: MarketsModalFilterProps = {
    ...props,
    tempIndustry,
    tempSector,
    setTempIndustry,
    setTempSector,
    addToRegionsRefs,
    onFilter,
  };

  return <MarketsModalFilterView {...combinedProps} />;
};

export default MarketsModalFilterContainer;
