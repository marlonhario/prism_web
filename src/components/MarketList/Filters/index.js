import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { map, findIndex, update, includes, isUndefined, toUpper, filter, size } from 'lodash';
import './styles.scss';
import { divEtasInitialState, growthEtasInitialState, regions, riskProfileInitialState } from './utils';

const MarketListFilters = ({
  onCheckDivEtaCallback,
  onCheckGrowthEtaCallback,
  onCheckRegionCallback
}) => {
  const [divEtaSelectAll, setDivEtaSelectAll] = useState(true);
  const [growthEtaSelectAll, setGrowthEtaSelectAll] = useState(true);
  const [divEtas, setDivEtas] = useState(divEtasInitialState);
  const [growthEtas, setGrowthEtas] = useState(growthEtasInitialState);
  const [riskProfile, setRiskProfile] = useState(riskProfileInitialState);
  const [selectedRiskType, setSelectedRiskType] = useState();
  const [selectedRegion, setSelectedRegion] = useState();

  /**
   * @description selects all divident eta types checkbox to get selected eta type list for the company
   */
  const onHandleDivSelectAll = () => {
    setDivEtaSelectAll(!divEtaSelectAll);
    setDivEtas(divEtas.map(eta => ({ ...eta, checked: (!divEtaSelectAll) ? true : false })));
  };

  /**
   * @description selects all growth eta types checkbox to get selected eta type list for the company
   */
  const onHandleGrowthSelectAll = () => {
    setGrowthEtaSelectAll(!growthEtaSelectAll);
    setGrowthEtas(growthEtas.map(eta => ({ ...eta, checked: (!growthEtaSelectAll) ? true : false })));
  };

  useEffect(() => {
    const checkedDivEtas = filter(divEtas, eta => (eta.checked));
    const checkedGrowthEtas = filter(growthEtas, eta => (eta.checked));

    /* Select all dividend and growth filter if we choose 0 eta types */
    if (size([...checkedDivEtas, ...checkedGrowthEtas]) === 0) {
      onHandleDivSelectAll();
      onHandleGrowthSelectAll();
    }
    (size(divEtas) !== size(checkedDivEtas)) ? setDivEtaSelectAll(false) : setDivEtaSelectAll(true);
    (size(growthEtas) !== size(checkedGrowthEtas)) ? setGrowthEtaSelectAll(false) : setGrowthEtaSelectAll(true);
    
    onCheckDivEtaCallback(divEtas);
    onCheckGrowthEtaCallback(growthEtas);
    onCheckRegionCallback(selectedRegion);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divEtas, growthEtas, selectedRegion]);
  

  /**
   * Common on change function to checkbox selection for Growth Etas, Dividend Etas and Risk profile
   * It will update the checked value for the corresponding index
   */
  const onChangeCheckBox = (checkedValue, filterType) => {
    let etasObj = {};
    if (filterType === 'GROWTH') {
      etasObj = growthEtas;
      (growthEtaSelectAll) && setGrowthEtaSelectAll(!growthEtaSelectAll)
    }
    else if (filterType === 'DIVIDEND') {
      etasObj = divEtas;
      (divEtaSelectAll) && setDivEtaSelectAll(!divEtaSelectAll)
    }
    else if (filterType === 'RISK') {
      etasObj = riskProfile;
    }

    const checkedObjIndex = findIndex(etasObj, ['name', checkedValue.target.value]);
    update(etasObj[checkedObjIndex], 'checked', () => !etasObj[checkedObjIndex].checked);

    /**
     * setting updated value to its state variable based on condition
     */
    if (filterType === 'GROWTH') {
      setGrowthEtas([...etasObj]);
    } else if (filterType === 'DIVIDEND') {
      setDivEtas([...etasObj]);
    } else if (filterType === 'RISK') {
      setRiskProfile([...etasObj]);
      fetchSelectedRiskType([...etasObj]);
    }
  };

  const fetchSelectedRiskType = (riskObj) => {
    const riskTypeArr = [];
    map(riskObj, riskProfile => {
      if (riskProfile.checked) {
        riskTypeArr.push(riskProfile.name);
      }
    });
    setSelectedRiskType(riskTypeArr)
  };

  useEffect(() => {
    (!isUndefined(selectedRiskType)) && updateDivAndGrowthEtaBasedOnRisk(selectedRiskType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRiskType]);

  /**
   * @description Checks growth and divident eta types filter based on risk profile selection
   * @param {string} selectedRiskType 
   */
  const updateDivAndGrowthEtaBasedOnRisk = (selectedRiskType) => {
    setDivEtas(divEtas.map(eta => ({ ...eta, checked: (includes(toUpper(selectedRiskType), toUpper(eta.risk))) ? true : false })));
    setGrowthEtas(growthEtas.map(eta => ({ ...eta, checked: (includes(toUpper(selectedRiskType), toUpper(eta.risk))) ? true : false })));
  }

  /**
   * Sets region to enable/disable the region button to filter the security list
   * @param {string} value region code
   */
  const onHandleRegion = (value) => {
    if (selectedRegion === value) {
      setSelectedRegion("");
    } else {
      setSelectedRegion(value);
    }
  }

  return (
    <div className='flex flex-row pt-4'>
      <div className='flex flex-col w-1/4'>
        <div>Dividend ETAs</div>
        {map(divEtas, eta => (
          <Checkbox
            key={eta.name}
            className='resetMarginLeft'
            value={eta.name}
            checked={eta.checked}
            onChange={(e) => onChangeCheckBox(e, "DIVIDEND")}
          >
            {eta.name}
          </Checkbox>
        ))}
        <Button
          className={`selectAllDivEta ${(divEtaSelectAll) && 'active'}`}
          size="small"
          onClick={() => onHandleDivSelectAll()}
        >
          Select All
        </Button>
      </div>
      <div className='flex flex-col w-1/4'>
        <div>Growth ETAs</div>
        {map(growthEtas, eta => (
          <Checkbox
            key={eta.name}
            className='resetMarginLeft'
            value={eta.name}
            checked={eta.checked}
            onChange={(e) => onChangeCheckBox(e, 'GROWTH')}
          >
            {eta.name}
          </Checkbox>
        ))}
        <Button
          className={`selectAllGrowthEta ${(growthEtaSelectAll) && 'active'}`}
          size="small"
          onClick={() => onHandleGrowthSelectAll()}
        >
          Select All
        </Button>
      </div>
      <div className='flex flex-col w-1/4'>
        <div>Risk Profile</div>
        {map(riskProfile, risk => (
          <Checkbox
            key={risk.name}
            className='resetMarginLeft'
            value={risk.name}
            checked={risk.checked}
            onChange={(e) => onChangeCheckBox(e, 'RISK')}
          >
            {risk.name}
          </Checkbox>
        ))}
      </div>
      <div className='flex flex-col w-1/4'>
        <div>Region</div>
        <div className='flex flex-row w-full flex-wrap'>
        {map(regions, region => (
          <div className='w-1/2' key={region.title}>
            <button type="button" className={`region ${(selectedRegion === region.title) ? 'active' : ''}`} value={region.title} onClick={(e) => onHandleRegion(e.target.value)} >{region.title}</button>
          </div>
          ))}
          </div>
      </div>
    </div>
  );
}

export default MarketListFilters;