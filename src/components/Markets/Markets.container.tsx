import {
  IndexInterface,
  MarketsProps,
  MarketsPublicProps,
} from './Markets.props';
import MarketsView from './Markets.view';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { SecuritySort } from 'common/interfaces/Markets/SecuritySort';
import { VirtuosoHandle } from 'react-virtuoso';
import { Nullable } from 'common/types';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { isEmpty, map, orderBy, sortBy, toLower, uniq } from 'lodash';
import { MainContext } from 'context/MainContext';
import apiFetch, { GetETAs } from 'services/apiFetch';
import { MarketsSecurity } from 'common/interfaces/Markets/MarketsSecurity';

const MarketsContainer: React.FC<MarketsPublicProps> = (
  props: MarketsPublicProps
) => {
  const { prism } = useSelectorSafe((state) => state) || {};
  const [securityList, setSecurityList] = useState<MarketsSecurity[]>(
    sortBy(prism?.securities, ['ticker']) || []
  );
  const [industries, setIndustries] = useState<string[]>(
    uniq(
      map(prism?.securities, 'industry').filter((industry) => industry !== null)
    )
  );
  const [sectors, setSectors] = useState<string[]>(
    uniq(map(prism?.securities, 'sector')).filter((sector) => sector !== null)
  );

  const { etas, setEtas } = useContext(MainContext);

  const marketsRef = useRef<HTMLDivElement>(null);
  const etaRef = useRef<HTMLInputElement[]>([]);
  const virtuoso = useRef<VirtuosoHandle>(null);

  // const [allShown, setAllShown] = useState<boolean>(false);
  const [allShown, setAllShown] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [industry, setIndustry] = useState<Nullable<string>>(null);
  const [sector, setSector] = useState<Nullable<string>>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['AU']);

  const [selectedEtas, setSelectedEtas] = useState<string[]>([
    'PureDiv',
    'MaxDiv',
    'DivGuard',
    'UltraGuard',
    'GrowthGuard',
    'PureGrowth',
    'MaxGrowth',
    'UltraGrowth',
  ]);

  const [indexes, setIndexes] = useState<IndexInterface[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');

  const [securitySort, setSecuritySort] = useState<SecuritySort>({
    lastPrice: 'asc',
    chgNet1d: 'asc',
    forwardDivYield: 'asc',
    dvdPayoutRatio: 'asc',
    peRatioEod: 'asc',
    marketCap: 'asc',
    region: 'asc',
    sector: 'asc',
    industry: 'asc',
    etaValueInCirculation: 'asc',
  } as SecuritySort);

  /**
   * @description sort the securities in the markets table
   * @param column the table column selected which corresponds to a field in the securities
   * @param order 
   */
  const sortSecurities = (column: string, order: 'asc' | 'desc') => {
    setSecurityList((prev: MarketsSecurity[]) =>
      orderBy(prev, [column], [order])
    );
  };

  /**
   * @returns the filtered securities
   */
  const filteredSecurityList = (): MarketsSecurity[] => {
    return securityList.filter((security) => {
      const isIndustry = industry ? security.industry === industry : true;
      const isSector = sector ? security.sector === sector : true;
      return (
        selectedRegions.includes(security.region) &&
        isSector &&
        isIndustry &&
        (toLower(security.ticker).includes(toLower(searchValue)) ||
          toLower(security.longName).includes(toLower(searchValue)))
      );
    });
  };

  /**
   * @description Indexes the first security with the same letter in the alphabet
   */
  const addToIndexes = () => {
    const securities = filteredSecurityList();
    let indexes = [] as IndexInterface[];
    securities.forEach((security, index) => {
      if (!indexes.some((i) => i.letter === security.ticker.charAt(0))) {
        indexes.push({
          letter: security.ticker.charAt(0),
          index: index,
        });
      }
    });
    setIndexes(indexes);
  };

  const backToTop = () => {
    marketsTableScroll(0);
  };

  /**
   * Scrolls the table to the security with the first letter as the letter selected
   * @param letter the letter selected in the left side of the table
   */
  const onHandleLetterClick = (letter: string) => {
    const letterIndex = indexes.find((index) => index.letter === letter);
    if (letterIndex) {
      marketsTableScroll(letterIndex.index);
    }
  };

  /**
   * @description the scroll handler
   * @param index the  index of the security with the first letter of the selected letter
   */
  const marketsTableScroll = (index: number) => {
    virtuoso.current?.scrollToIndex({
      index: index,
      align: 'start',
      behavior: 'smooth',
    });
  };

  /**
   * @description handle the selection of regions
   * @param value the region selected
   */
  const handleSelectRegion = (value: string) => {
    let newRegions = [...selectedRegions];
    if (newRegions.includes(value)) {
      newRegions = newRegions.filter((region) => region !== value);
    } else {
      newRegions.push(value);
    }
    setSelectedRegions(newRegions);
  };

  /**
   * handles the selection of the eta filters
   * @param value the eta selected
   */
  const handleSelectEta = (value: string) => {
    setSelectedEtas(filterCheckboxes(etaRef.current));

    let newEtas = [...selectedEtas];
    if (newEtas.includes(value)) {
      newEtas = newEtas.filter((eta) => eta !== value);
    } else {
      newEtas.push(value);
    }
    setSelectedEtas(newEtas);
  };

  const filterCheckboxes = (checkboxRef: HTMLInputElement[]) => {
    return checkboxRef
      ? checkboxRef
          ?.filter((val: HTMLInputElement) => val.checked)
          ?.map((val: HTMLInputElement) => val.value)
      : [];
  };

  useEffect(() => {
    if (isEmpty(etas)) {
      apiFetch(GetETAs).then((res) => {
        const etaData = res.data;
        setEtas(etaData);
      });
    }
  }, []);

  useEffect(() => {
    addToIndexes();
  }, [securityList, selectedRegions, searchValue]);

  const combinedProps: MarketsProps = {
    ...props,
    virtuoso,
    allShown,
    securitySort,
    selectedRegions,
    selectedEtas,
    searchValue,
    showModal,
    marketsRef,
    industries,
    sectors,
    sector,
    industry,
    setSector,
    setIndustry,
    setShowModal,
    backToTop,
    securityList: filteredSecurityList(),
    setSecurityList,
    closeMarkets: props.onCloseMarkets,
    setIndexes,
    setSearchValue,
    handleSelectRegion,
    handleSelectEta,
    setSecuritySort,
    setAllShown,
    onHandleLetterClick,
    setSelectedEtas,
    setSelectedRegions,
    sortSecurities,
  };

  return <MarketsView {...combinedProps} />;
};

export default MarketsContainer;
