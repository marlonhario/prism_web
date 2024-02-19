import React from "react";
import { map, size, toUpper, includes } from "lodash";
import "./styles.scss";

const EtaTypeDetails = ({
  underlyingSymbol,
  allEtas,
  checkedGrowthEta,
  checkedDivEta,
  onSelectedEtaTypeCallback,
  security,
  onSelectedCompanyHeaderCallback
}) => {
  const fetchEtaDetails = (eta) => allEtas.find((v) => (v.underlyingSymbol === underlyingSymbol && v.etaType === toUpper(eta.type)));

  /**
   * @description Passing selected eta type and company data to parent component as callback to use those values in ETA showcase and eqity convertor
   * @param {object} etaData 
   * @param {object} securityData 
   */
  const onSelectedEtaType = (etaData, securityData) => {
    onSelectedCompanyHeaderCallback(securityData);
    onSelectedEtaTypeCallback(etaData);
  }

  const getEtaList = (checkedEta, isGrowth) => {
    return map(checkedEta, (eta) => {
      const filteredEtaData = fetchEtaDetails(eta);
      const etaData = {...filteredEtaData, selectedEtaTypeName: eta.name, selectedEtaType: (includes(eta.name, 'Growth') ? 'Growth' : 'Income')};
      return (
        <div
          className="w-full flex flex-row pt-2 pb-2 font-bold"
          key={etaData.growthSymbol}
        >
          <div
            className={`w-11/12 etaDetailsContent pl-2 pr-2 pt-1 pb-1 flex flex-row ${eta.name}`}
            onClick={() => onSelectedEtaType(etaData, security)}
          >
            <div className="flex flex-row w-9/12">
              <div className="tickerCode w-4/12 pr-2">{(isGrowth) ? etaData.growthSymbol : etaData.incomeSymbol}</div>
              <div className="etaType w-8/12">{`${eta.name} ETA`}</div>
            </div>
            <div className="etaPrice w-1/12 text-black">{`$${(isGrowth) ? (etaData.growthLastPrice).toFixed(2) : (etaData.incomeLastPrice).toFixed(2)}`}</div>
            <div className="etaGrowth w-2/12 text-black">{(isGrowth) ? `${(etaData.growthMultiple).toFixed(1)}x` : ''}</div>
            <div className="etaYield w-1/12 text-black">{(!isGrowth) ? `${(etaData.etaYield * 100).toFixed(1)}%` : ''}</div>
          </div>
          <div className="w-1/12 text-center">
            <span className="addSymbol" onClick={() => onSelectedEtaType(etaData, security)}>+</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="etaTypeDetails">
      <div className="etaDetailsHeader font-bold p-2 flex flex-row">
        <div className="etaType w-7/12">ETA TYPE</div>
        <div className="etaPrice w-2/12">ETA PRICE</div>
        <div className="etaGrowth w-2/12">ETA GROWTH</div>
        <div className="etaYield w-2/12">ETA YIELD</div>
        <div className="add w-1/12 text-center pl-3">ADD</div>
      </div>
      {size(checkedGrowthEta) > 0 && getEtaList(checkedGrowthEta, true)}
      {size(checkedDivEta) > 0 && getEtaList(checkedDivEta, false)}
    </div>
  );
};

export default EtaTypeDetails;
