import { each, round, map } from 'lodash';

export const getImageSrc = (path) =>  `/public/images/${path}`;
export const socketURL = '/calculators/prism-web-watcher';
export const topics = '/topic/canyon/';
export const defaultTopic = 'WOW/RED';

export const GREEN = 'Green';
export const RED = 'Red';
export const BLUE = 'Blue';

export const etaTitleMapping = {
    [GREEN]: {
        growthTitle: 'PureGrowth',
        incomeTitle: 'PureDiv',
        growthColor: '#C7DB6D',
        incomeColor: '#73BD59'
    },
    [BLUE]: {
        growthTitle: 'MaxGrowth',
        incomeTitle: 'DivGuard',
        growthColor: '#65CDF3',
        incomeColor: '#1C59A8'
    },
    [RED]: {
        growthTitle: 'GrowthGuard',
        incomeTitle: 'MaxDiv',
        growthColor: '#DB3155',
        incomeColor: '#F5BD1A'
    }
}

export const etaDropdownData = [
  { name: "GREEN", id: "GREEN" },
  { name: "RED", id: "RED" },
  { name: "BLUE", id: "BLUE" }
];

export const parseChartContent = (chartResponse, xAxisKey, yAxisKey) => {
  each(chartResponse, (value) => {
    each(value, (dataValue, dataKey) => {
      if(dataKey === xAxisKey) {
        value.xAxisValue = dataValue;
      }
      if(dataKey === yAxisKey) {
        value.yAxisValue = dataValue;
      }
    });
  });
  return chartResponse;
}

export const chartScaling = 3;
export const prismAnnualFee = 0.003;

export const getDividend = (chartScaling) =>  100 * chartScaling;

export const getScaledPrice = (actualPrice, targetPrice) => {
  return (100 * actualPrice) / round(targetPrice, 2);
};

export const getXAxisEndPoint = (chartScaling) => 100 + chartScaling;
 
export const getInvertedPrice = (endPoint, scaledPrice) => { return endPoint - scaledPrice } ;

export const getXAxisLocation = (invertedPrice, chartScaling) => ( getDividend(chartScaling) / invertedPrice); 

export const getIssuingPriceGap =  (underLyingLastAvailablePrice, growthMaxBidPrice, incomeMaxBidPrice) => {
  return round((underLyingLastAvailablePrice - growthMaxBidPrice - incomeMaxBidPrice),2);
}

export const getGrowthTargetPrice = (growthMaxBidPrice, incomeMaxBidPrice, issuingPriceGap) => {
  return round((growthMaxBidPrice + (issuingPriceGap * growthMaxBidPrice) / (growthMaxBidPrice + incomeMaxBidPrice)),2);
}

export const getIncomeTargetPrice = (growthMaxBidPrice, incomeMaxBidPrice, issuingPriceGap) => {
  return round((incomeMaxBidPrice + (issuingPriceGap * incomeMaxBidPrice) / (growthMaxBidPrice + incomeMaxBidPrice)),2);
}

export const getIncomeYield = (incomePrice, forwardYield, underLyingLastAvailablePrice, underlyingEstablishmentPrice) => {
  return 100 * ((underLyingLastAvailablePrice * forwardYield) - (prismAnnualFee * underlyingEstablishmentPrice)) / incomePrice;
} ;

export const getSharePercent = (price, underLyingLastAvailablePrice) => {
  return (round(price,2)/underLyingLastAvailablePrice) * 100;
}

export const getGrowthYield = (price, underLyingLastAvailablePrice) => {
  return (underLyingLastAvailablePrice/ round(price, 2));
} ;

export const getImpliedPrice = (price, underLyingLastAvailablePrice) => {
  return underLyingLastAvailablePrice - price;
}

export const getImpliedPercentage = (price, underLyingLastAvailablePrice) => {
  return (price/underLyingLastAvailablePrice) * 100;
}

export const getImpliedGrowthRatio = (price, underLyingLastAvailablePrice) => {
  return  underLyingLastAvailablePrice/ price;
}

export const apiEndpoints = {
  securityListEndpoint: '/calculators/securities',
  etaDetails: '/calculators/etas/details',
}

export const calculatePlotContent = (income, growth, growthBestPrice, incomeBestPrice, issuingPriceGap) => {
  let growthVolume = 0;
  let incomeVolume = 0;
  const growthTargetPrice = getGrowthTargetPrice(growthBestPrice, incomeBestPrice, issuingPriceGap);
  const incomeTargePrice = getIncomeTargetPrice(growthBestPrice, incomeBestPrice, issuingPriceGap);
  const xAxisEndPoint = getXAxisEndPoint(chartScaling);
    map (growth, (value) => {
      const scaledPrice = getScaledPrice(value.price, growthTargetPrice);
      const invertedValue = getInvertedPrice(xAxisEndPoint, round (scaledPrice, 2));
      const xAxisLocation = getXAxisLocation(invertedValue, chartScaling);
      growthVolume = growthVolume + value.volume;
      value.scaledPrice = scaledPrice;
      value.invertedValue = invertedValue;
      value.location = xAxisLocation;
      value.cumulativeVolume = growthVolume;
    });
    map (income, (value) => {
      const scaledPrice = getScaledPrice(value.price, incomeTargePrice);
      const invertedValue = getInvertedPrice(xAxisEndPoint, round (scaledPrice, 2));
      const xAxisLocation = getXAxisLocation(invertedValue, chartScaling);
      incomeVolume = incomeVolume + value.volume;
      value.scaledPrice = scaledPrice;
      value.invertedValue = invertedValue;
      value.location = xAxisLocation;
      value.cumulativeVolume = incomeVolume;
    });
    return {income,  growth};
}

