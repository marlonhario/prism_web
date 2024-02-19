import * as React from "react";
import { useState, useEffect } from "react";
import { isEmpty, map, filter, upperCase, size, includes } from "lodash";
import Dropdown from "components/payoff-chart/utils/Dropdown";
import Payoff from "components/payoff-chart";
import axios from "axios";
import { apiEndpoints, etaDetails, etaTypes } from "../../components/payoff-chart/constants";

const ChartContent = () => {
  const dimensions = {
    width: 800,
    height: 400,
    margin: 50,
  };
  const [security, setSecurity] = useState("");
  const [securityList, setSecurityList] = useState();
  const [underLyingPrice, setUnderLyingPrice] = useState("");
  const [eta1EstablishmentPrice, setEta1EstablishmentPrice] = useState("");
  const [eta2EstablishmentPrice, setEta2EstablishmentPrice] = useState("");
  const [eta1LastPrice, setEta1LastPrice] = useState("");
  const [eta2LastPrice, setEta2LastPrice] = useState("");

  const [eta1Type, setEta1Type] = useState("");
  const [eta2Type, setEta2Type] = useState("");
  const [eta1Value, setEta1Value] = useState("");
  const [eta2Value, setEta2Value] = useState("");

  const [underlyingEstab1Price, setUnderlyingEstab1Price] = useState(0);
  const [underlyingEstab2Price, setUnderlyingEstab2Price] = useState(0);

  useEffect(() => {
    axios.get(apiEndpoints.securityListEndpoint).then((response) => {
      if (response?.status === 200) {
        const securityData = parseSecurityData(response.data);
        setSecurityList(securityData);
      }
    });
  }, []);

  const parseSecurityData = (data) => {
    if (!isEmpty(data)) {
      map(data, (security) => {
        security.name = security.ticker;
        security.id = security.ticker;
      });
    }
    return data;
  };

  const onChangeSecurity = (value, type) => {
    if (!isEmpty(value)) {
      setSecurity(value);
      if (!isEmpty(securityList)) {
        const activeSecurity = filter(securityList, { id: value })[0];
        setUnderLyingPrice(activeSecurity.lastPrice);
      }
    }
  };

  const getSelectedEtaName = (etaType) => {
    const etaNameObj = filter(etaDetails, (e) => {
      return e.growthTitle === etaType || e.incomeTitle === etaType;
    });
    return size(etaNameObj) > 0 ? etaNameObj[0].etaType : "";
  };

  useEffect(() => {
    if (!isEmpty(security) && (!isEmpty(eta1Type) || !isEmpty(eta2Type))) {
      if (!isEmpty(eta1Type)) {
        const selectedEta1Name = getSelectedEtaName(eta1Type);

        axios.get(`${apiEndpoints.etaDetails}/${security}/${upperCase(selectedEta1Name)}`).then((response) => {
          if (response?.status === 200) {
            setEta1EstablishmentPrice(includes(eta1Type, "Growth") ? response.data.growthEstablishmentPrice : response.data.incomeEstablishmentPrice);
            setEta1LastPrice(includes(eta1Type, "Growth") ? response.data.growthLastPrice : response.data.incomeLastPrice);
            setUnderlyingEstab1Price(response.data.growthEstablishmentPrice + response.data.incomeEstablishmentPrice);
          }
        });
      }
      if (!isEmpty(eta2Type)) {
        const selectedEta2Name = getSelectedEtaName(eta2Type);

        axios.get(`${apiEndpoints.etaDetails}/${security}/${upperCase(selectedEta2Name)}`).then((response) => {
          if (response?.status === 200) {
            setEta2EstablishmentPrice(includes(eta2Type, "Growth") ? response.data.growthEstablishmentPrice : response.data.incomeEstablishmentPrice);
            setEta2LastPrice(includes(eta2Type, "Growth") ? response.data.growthLastPrice : response.data.incomeLastPrice);

            setUnderlyingEstab2Price(response.data.growthEstablishmentPrice + response.data.incomeEstablishmentPrice);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [security, eta1Type, eta2Type, eta1Value, eta2Value]);

  const handleEtaTypeChange = (etaName, type) => {
    if (type === 1) {
      setEta1Type(etaName);
    } else {
      setEta2Type(etaName);
    }
  };

  const handleEtaValueChange = (etaValue, type) => {
    if (type === 1) {
      setEta1Value(etaValue);
    } else {
      setEta2Value(etaValue);
    }
  };

  return (
    <>
      <div className="mt-2">
        <h1 className="text-5xl font-bold justify-center flex">
          Prism Markets Payoff Chart
        </h1>
      </div>
      <div>
        <div className="flex justify-center">
          {!isEmpty(securityList) && (
            <span>
              <Dropdown
                placeHolder={"Choose Security"}
                type={"security"}
                data={securityList}
                handleChange={onChangeSecurity}
              />
            </span>
          )}
        </div>

        <div className="justify-center pb-40">
          {!isEmpty(underLyingPrice.toString()) && (
            <>
              <div className="flex justify-center">
                <select
                  className="m-2"
                  name="eta1Type"
                  onChange={(e) => handleEtaTypeChange(e.target.value, 1)}
                >
                  <option value="">Select Eta Type 1</option>
                  {map(etaTypes, (etaType) => (
                    <option key={`1-${etaType}`} value={etaType}>{etaType}</option>
                  ))}
                </select>
                <input
                  className="m-2 border-2 rounded py-2 px-3"
                  name="eta1Value"
                  onChange={(e) =>
                    handleEtaValueChange(Number(e.target.value), 1)
                  }
                />
              </div>

              <div className="flex justify-center">
                <select
                  className="m-2"
                  name="eta2Type"
                  onChange={(e) => handleEtaTypeChange(e.target.value, 2)}
                >
                  <option value="">Select Eta Type 2</option>
                  {map(etaTypes, (etaType) => (
                    <option key={`2-${etaType}`} value={etaType}>{etaType}</option>
                  ))}
                </select>
                <input
                  className="m-2 border-2 rounded py-2 px-3"
                  name="eta2Value"
                  onChange={(e) => handleEtaValueChange(Number(e.target.value), 2)}
                />
              </div>
            </>
          )}

          {!isEmpty(eta1EstablishmentPrice.toString()) && !isEmpty(eta1LastPrice.toString()) && !isEmpty(eta1Type.toString()) && !isEmpty(eta1Value.toString()) && (
            <Payoff
              dimensions={dimensions}
              useElementDimensions={true}
              underlyingSecurityPrice={underLyingPrice}
              eta1EstablishmentPrice={eta1EstablishmentPrice}
              eta2EstablishmentPrice={eta2EstablishmentPrice}
              eta1LastPrice={eta1LastPrice}
              eta2LastPrice={eta2LastPrice}
              eta1Type={eta1Type}
              eta2Type={eta2Type}
              eta1Value={eta1Value}
              eta2Value={eta2Value}
              underlyingEstab1Price={underlyingEstab1Price}
              underlyingEstab2Price={underlyingEstab2Price}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChartContent;
