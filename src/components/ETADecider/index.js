import React, { useEffect, useState } from 'react';
import './styles.scss';
import { toUpper, toLower, map } from 'lodash';
import { CATEGORIES_TEXT, ETA_TEXT, INVESTMENT_TEXT, ETA_TYPE_DETAILS, INCOME, GROWTH, MARKET, AGGRESSIVE, CONSERVATIVE } from './utils';

const EtaDecider = () => {
  const catergoryRowClassname = "flex flex-row w-full py-2";
  const [seletedInvestmentType, setSeletedInvestmentType] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [etaTypes, setEtaTypes] = useState([])

  const onHandleInvestmentSelection = (value) => {
    if (seletedInvestmentType === value) {
      setSeletedInvestmentType("");
    } else {
      setSeletedInvestmentType(value);
    }
  }

  const onHandleRiskSelection = (value) => {
    if (selectedRisk === value) {
      setSelectedRisk("");
    } else {
      setSelectedRisk(value);
    }
  }

  useEffect(() => {
    if (seletedInvestmentType !== '' && selectedRisk !== '') {
      map(ETA_TYPE_DETAILS, data => {
        if (toUpper(data.riskProfile) === toUpper(selectedRisk)) {
          setEtaTypes(data[seletedInvestmentType]);
        }
      });
    }
    else {
      setEtaTypes([]);
    }
  }, [selectedRisk, seletedInvestmentType]);

  const GetButton = ({classname, buttonValue, functionName = () => {}, selectedButton = "", appendText = ""}) => {
    return (
      <button
        className={`${classname} ${(selectedButton === toLower(buttonValue)) ? 'selected' : ''}`}
        type="button"
        value={toLower(buttonValue)}
        onClick={(functionName !== "") ? (e) => functionName(e.target.value) : ''}
      >
        {`${buttonValue} ${appendText}`}
      </button>
    );
  }

  return (
    <div className="etaDecider">
      <div className="headerText text-2xl leading-10 font-light">
        ETA DECIDER
      </div>
      <div className="content">
        <div className="investment">
          <div>{INVESTMENT_TEXT}</div>
          <div className="investFor">
            <GetButton
              classname="w-1/2 income-btn mr-8"
              buttonValue={toUpper(INCOME)}
              functionName={onHandleInvestmentSelection}
              selectedButton={seletedInvestmentType}
            />
            <GetButton
              classname="w-1/2 income-btn"
              buttonValue={toUpper(GROWTH)}
              functionName={onHandleInvestmentSelection}
              selectedButton={seletedInvestmentType}
            />
          </div>
        </div>
        <div className="categories">
          <div>{CATEGORIES_TEXT}</div>
          <div className="categoryTypes">
            <div className={catergoryRowClassname}>
              <GetButton
                classname="w-1/2"
                buttonValue={toUpper(MARKET)}
                functionName={onHandleRiskSelection}
                selectedButton={selectedRisk}
              />
              <label className="w-1/2"> I only want to be exposed to market risk </label>
            </div>
            <div className={catergoryRowClassname}>
              <GetButton
                classname="w-1/2"
                buttonValue={toUpper(AGGRESSIVE)}
                functionName={onHandleRiskSelection}
                selectedButton={selectedRisk}
              />
              <label className="w-1/2"> I only want to be exposed to market risk </label>
            </div>
            <div className={catergoryRowClassname}>
              <GetButton
                classname="w-1/2"
                buttonValue={toUpper(CONSERVATIVE)}
                functionName={onHandleRiskSelection}
                selectedButton={selectedRisk}
              />
              <label className="w-1/2"> I only want to be exposed to market risk </label>
            </div>
          </div>
        </div>
        <div className="eta">
          <div>{ETA_TEXT}</div>
          <div className="etaTypes">
          {
            map(etaTypes, eta => (
              <GetButton
                key={eta}
                classname={`w-1/2 ${eta}`}
                buttonValue={eta}
                appendText="ETA"
              />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtaDecider;