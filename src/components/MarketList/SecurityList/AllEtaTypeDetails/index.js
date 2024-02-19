import React, { useEffect, useState } from "react";
import { map, size, orderBy, toLower, toUpper, includes, isUndefined, find } from "lodash";
import "./styles.scss";
import { getAllRegion } from "../../utils";

const AllEtaTypeDetails = ({
  allEtas,
  sortByGrowth,
  sortByYield,
  sortByAlphabet,
  checkedGrowthEta,
  checkedDivEta,
  securityList,
  selectedRegion,
  onSelectedEtaTypeCallback,
  onSelectedCompanyHeaderCallback
}) => {

  const [etaTypelist, setEtaTypelist] = useState();

  /**
   * Sorting function to sort the eta details object
   */
  const sortEtaDetails = (data, sortOrder, sortColumn) => {
    const sortedEtaDetails = orderBy(data, sortColumn, sortOrder);
    setEtaTypelist(sortedEtaDetails);
  };

  useEffect(() => {
    const etaList = getEtaList([...checkedGrowthEta, ...checkedDivEta]).etaListObj;
    sortEtaDetails(etaList, ['asc','asc'], ['etaCode','etaType']);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedGrowthEta, checkedDivEta]);

  useEffect(() => {
    const etaList = getEtaList([...checkedGrowthEta, ...checkedDivEta]).etaListObj;
    (securityList) && sortEtaDetails(etaList, [toLower(sortByAlphabet.order)], ["etaCode"]);
    (sortByGrowth.active) && sortEtaDetails(etaList, [toLower(sortByGrowth.order)], ["growthMultiple"]);
    (sortByYield.active) && sortEtaDetails(etaList, [toLower(sortByYield.order)], ["etaYield"]);
    (sortByAlphabet.active) && sortEtaDetails(etaList, [toLower(sortByAlphabet.order)], ["etaCode"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByGrowth, sortByYield, sortByAlphabet, checkedGrowthEta, checkedDivEta, securityList]);

  const fetchEtaDetails = (checkedEta, etaType) => checkedEta.filter((v) => (toUpper(v.type) === etaType));

  /**
   * @description Filters security list based on region by using underlying symbol
   * @param {string} underlyingSymbol 
   */
  const filterEtaTypesByRegion = (underlyingSymbol) => securityList.filter(security => (security.ticker === underlyingSymbol && (size(getAllRegion(selectedRegion)) > 0 ? includes(getAllRegion(selectedRegion)[0].subRegion, security.region) : true)));
  
  /**
   * @description Filters security list based on underlying symbol to render the eta types
   * @param {string} underlyingSymbol 
   */
  const filterSecurityByName = (underlyingSymbol) => securityList.filter(security => (security.ticker === underlyingSymbol));
  
  /**
   * @description returns eta list object based on multiple filters and serach to render eta types
   * @param {array} checkedEta 
   */
  const getEtaList = (checkedEta) => {
    let etaListObj = [];
    let etaListObjCallback = [];
    map(allEtas, etaObj => {
      const etaTypes = fetchEtaDetails(checkedEta, etaObj.etaType);
      const filteredSecurityList = filterSecurityByName(etaObj.underlyingSymbol);
      const regionFilter = filterEtaTypesByRegion(etaObj.underlyingSymbol);
      if (size(etaTypes) > 0 && (!isUndefined(selectedRegion) ? (size(regionFilter)>0) : true ) && size(filteredSecurityList) > 0) {
        map(etaTypes, eta => {
          etaListObjCallback.push({...etaObj})
          etaListObj.push({
            ...etaObj,
            name: eta.name,
            etaYield: (includes(eta.name, 'Growth') ? '' : etaObj.etaYield),
            growthEstablishmentPrice: (includes(eta.name, 'Growth') ? etaObj.growthEstablishmentPrice : ''),
            growthLastPrice: (includes(eta.name, 'Growth') ? etaObj.growthLastPrice : ''),
            growthMultiple: (includes(eta.name, 'Growth') ? etaObj.growthMultiple : ''),
            growthSymbol: (includes(eta.name, 'Growth') ? etaObj.growthSymbol : ''),
            incomeEstablishmentPrice: (!includes(eta.name, 'Growth') ? etaObj.incomeEstablishmentPrice : ''),
            incomeLastPrice: (!includes(eta.name, 'Growth') ? etaObj.incomeLastPrice : ''),
            incomeSymbol: (!includes(eta.name, 'Growth') ? etaObj.incomeSymbol : ''),
            etaCode: (includes(eta.name, 'Growth') ? etaObj.growthSymbol : etaObj.incomeSymbol),
          })
        })
      }
    });
    return {etaListObj, etaListObjCallback};
  };

  /**
   * @description Passing selected eta type and company data to parent component as callback to use those values in ETA showcase and eqity convertor
   * @param {object} etaData 
   */
  const onSelectedEtaType = (etaData) => {
    const etaListData = getEtaList([...checkedGrowthEta, ...checkedDivEta]).etaListObjCallback;
    const etaTypeCallbackData = find(etaListData, eta => (etaData.etaName === eta.etaName));
    const companyObj = filterSecurityByName(etaData.underlyingSymbol);
    onSelectedCompanyHeaderCallback((size(companyObj) > 0) ? companyObj[0] : {});
    onSelectedEtaTypeCallback({...etaTypeCallbackData, selectedEtaTypeName: etaData.name, selectedEtaType: (includes(etaData.name, 'Growth') ? 'Growth' : 'Income')});
  }

  return (
    <div className="allEtaTypeDetails">
      <div className="etaDetailsHeader font-bold p-2 flex flex-row">
        <div className="etaType w-7/12">ETA TYPE</div>
        <div className="etaPrice w-2/12">ETA PRICE</div>
        <div className="etaGrowth w-2/12">ETA GROWTH</div>
        <div className="etaYield w-2/12">ETA YIELD</div>
        <div className="add w-1/12 text-center pl-3">ADD</div>
      </div>
      {
        (!isUndefined(etaTypelist)) && (
          map(etaTypelist, etaType => (
            <div
              className="w-full flex flex-row pt-2 pb-2 font-bold"
              key={etaType.etaCode}
            >
              <div
                className={`w-11/12 etaDetailsContent pl-2 pr-2 pt-1 pb-1 flex flex-row ${etaType.name}`}
                onClick={() => onSelectedEtaType(etaType)}
              >
                <div className="flex flex-row w-9/12">
                  <div className="tickerCode w-4/12 pr-2">{etaType.etaCode}</div>
                  <div className="etaType w-8/12">{`${etaType.name} ETA`}</div>
                </div>
                <div className="etaPrice w-1/12 text-black">{`$${(includes(etaType.name, 'Growth')) ? (etaType.growthEstablishmentPrice).toFixed(2) : (etaType.incomeEstablishmentPrice).toFixed(2)}`}</div>
                <div className="etaGrowth w-2/12 text-black">{(includes(etaType.name, 'Growth')) ? `${(etaType.growthMultiple).toFixed(1)}x` : ''}</div>
                <div className="etaYield w-1/12 text-black">{(!includes(etaType.name, 'Growth')) ? `${(etaType.etaYield * 100).toFixed(1)}%` : ''}</div>
              </div>
              <div className="w-1/12 text-center">
                <span className="addSymbol" onClick={() => onSelectedEtaType(etaType)}>+</span>
              </div>
            </div>
          ))
        ) 
      }
    </div>
  );
};

export default AllEtaTypeDetails;
