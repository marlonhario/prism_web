
import * as React from 'react';
import SockJsClient from "react-stomp";
import { useState, useEffect } from 'react';
import { isEmpty, map, filter, upperCase, capitalize, orderBy} from 'lodash';
import Dropdown from 'components/Canyon/utils/Dropdown'
import { apiEndpoints, socketURL, topics, etaDropdownData, defaultTopic, parseChartContent, calculatePlotContent, getIssuingPriceGap, etaTitleMapping } from "components/Canyon/utils";
import Canyon from 'components/Canyon';
import axios from 'axios';


const ChartContent = ({ isRenderDropdown = true }) => {
  const [leftSegmentData, setLeftSegmentData] = useState([]);
  const [rightSegmentData, setRightSegmentData] = useState([]);
  const [security, setSecurity] = useState('');
  const [eta, setETA] = useState(''); 
  const [securityList, setSecurityList] = useState();
  const [securityMetaData, setSecurityMetaData] = useState();
  const [etaMetaData, setEtaMetaData] = useState();
  const [ growthLastPrice, setGrowthLastPrice] = useState('');
  const [ incomeLastPrice, setIncomeLastPrice] = useState('');
  const [ lastAvailablePrice, setLastAvailablePrice] = useState('');
  const dimensions = {
    width: 900,
    height: 600,
    margin: {top: 50, right: 0, bottom: 30, left: 0}
  };

  useEffect(() => {
    if (!isEmpty(security) && !isEmpty(eta)) {
      axios.get(`${apiEndpoints.etaDetails}/${security}/${upperCase(eta)}`).then((response) => {
        if (response?.status === 200) {
          const etaMetaDataResponse = response.data;
          setGrowthLastPrice(etaMetaDataResponse.growthLastPrice);
          setIncomeLastPrice(etaMetaDataResponse.incomeLastPrice);
          setEtaMetaData(etaMetaDataResponse);
          setLeftSegmentData([]);
          setRightSegmentData([]);
        }
      });
    }
  }, [security, eta]);
  
  useEffect(() => {
    axios.get(apiEndpoints.securityListEndpoint).then((response) => {
      if(response?.status === 200) {
        const securityData = parseSecurityData(response.data);
        setSecurityList(securityData);
      }
    });
  }, []);

const parseSecurityData = (data) => {
  if(!isEmpty(data)) {
    map(data, (security) => {
      security.name = security.ticker;
      security.id = security.ticker;
    })
  }
  return data;
};

const parseChartData = (leftSegmentResponse, rightSegmentResponse, xAxisKey, yAxisKey) => {
  setLeftSegmentData(parseChartContent(leftSegmentResponse, xAxisKey, yAxisKey));
  setRightSegmentData(parseChartContent(rightSegmentResponse, xAxisKey, yAxisKey));
}

const messageCallback = (socketResponse) => {
  parseSocketResponse(socketResponse);
};

  const parseSocketResponse = (socketResponse) => {
    const issuePriceGap = getIssuingPriceGap(lastAvailablePrice, growthLastPrice, incomeLastPrice );
    if (!isEmpty(socketResponse)){
      const { incomeBids,  growthBids } = socketResponse;
      const chartData = calculatePlotContent(incomeBids, growthBids, growthLastPrice, incomeLastPrice, issuePriceGap);
      const sortIncome = orderBy(chartData.income, 'price',['asc']);
      const sortGrowth = orderBy(chartData.growth, 'price',['asc']);
      parseChartData(sortGrowth, sortIncome, 'location', 'cumulativeVolume')
    }
  }

  const onChangeTopic = (value, type) => {
    if(isRenderDropdown && !isEmpty(value)  && !isEmpty(value)) {
      if(type === 'security') {
        setSecurity(value);
        if(!isEmpty(securityList)) {
          const activeSecurity  = filter(securityList, { id : value})[0];
          setLastAvailablePrice(activeSecurity.lastPrice);
          setSecurityMetaData(activeSecurity);
        }
      } else {
        setETA(upperCase(value));
      }
    }
  };

  const getTopicURL = () => {
    return isRenderDropdown ? `${topics}${security}/${eta}` : `${topics}${defaultTopic}` 
  }

  return (
    <>
    <div>
    <h1 className="text-5xl font-bold justify-center flex">Prism Markets Grand Canyon</h1>
    </div> 
    <div>
      { isRenderDropdown && (
        <div className='flex justify-center'>
        { !isEmpty(securityList) && (
          <span>
            <Dropdown
              placeHolder={"Choose Security"}
              type={"security"}
              data={securityList}
              handleChange={onChangeTopic}
            />
          </span>
        )}
        <span>
          <Dropdown
            placeHolder={"Choose ETA"}
            type={"eta"}
            data={etaDropdownData}
            handleChange={onChangeTopic}
        />
        </span>
      </div>
      )}

    { !isEmpty(security) && !isEmpty(eta) && (
      <>
      <SockJsClient
        headers={{ authorization: true }}
        url={socketURL}
        topics={[getTopicURL()]}
        onMessage={messageCallback}
      />
      { isEmpty(leftSegmentData) && isEmpty(rightSegmentData) && (
        <div className='flex justify-center mt-10'>Loading...</div> 
       )
      }
      </>
    )}
     <div className='flex justify-center'>
      {!isEmpty(leftSegmentData) && !isEmpty(rightSegmentData) && !isEmpty(securityMetaData) && !isEmpty(etaMetaData) ? (
        <Canyon
          leftSegmentData={leftSegmentData}
          rightSegmentData={rightSegmentData}
          leftSegmentTitle={etaTitleMapping[capitalize(eta)].growthTitle}
          rightSegmentTitle={etaTitleMapping[capitalize(eta)].incomeTitle} 
          xAxisLabel={'Price'}
          yAxisLabel={'Volume'}
          dimensions={dimensions}
          leftSegmentColor={etaTitleMapping[capitalize(eta)].growthColor}
          rightSegmentColor={etaTitleMapping[capitalize(eta)].incomeColor}
          isRenderDropdown={isRenderDropdown}
          securityMetaData={securityMetaData}
          etaMetaData={etaMetaData}
        />
      ) : '' }
      </div>
    </div>
    </>
  );
};

export default ChartContent;




