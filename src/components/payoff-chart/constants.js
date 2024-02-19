import * as d3 from "d3";

export const etaDetails = [
  {
    etaType: "Green",
    growthTitle: "PureGrowth",
    incomeTitle: "PureDiv",
    firstLoss: "Shared",
  },
  {
    etaType: "Red",
    growthTitle: "GrowthGuard",
    incomeTitle: "MaxDiv",
    firstLoss: "Income",
  },
  {
    etaType: "Blue",
    growthTitle: "MaxGrowth",
    incomeTitle: "DivGuard",
    firstLoss: "Growth",
  },
];

export const etaTypes = [
  "PureGrowth",
  "PureDiv",
  "GrowthGuard",
  "MaxDiv",
  "MaxGrowth",
  "DivGuard",
];

/* Mock-up data to plot chart */
export const dataForPloting = [
  {
    name: "ETA1 Percent",
    values: [
      { value: -100, price: -80 },
      { value: -5, price: 0 },
      { value: 0, price: 0 },
      { value: 10, price: 0 },
      { value: 50, price: 70 },
      { value: 100, price: 100 },
    ],
  },
  {
    name: "ETA2 Percent",
    values: [
      { value: -100, price: -20 },
      { value: -5, price: 70 },
      { value: 0, price: 93 },
      { value: 10, price: 97 },
      { value: 50, price: 100 },
      { value: 80, price: 110 },
    ],
  },
  {
    name: "Combained Percent",
    values: [
      { value: -100, price: 10 },
      { value: -5, price: 30 },
      { value: 0, price: 40 },
      { value: 10, price: 51 },
      { value: 50, price: 60 },
      { value: 100, price: 80 },
    ],
  },
];

export const EtaColorCode = {
  PureGrowth: "#C7DB6D",
  PureDiv: "#73BD59",
  MaxDiv: "#F5BD1A",
  GrowthGuard: "#DB3155",
  MaxGrowth: "#65CDF3",
  DivGuard: "#1C59A8",
  UnderlyingShare: 'grey',
  CombinedPercent: 'black'
};

export const bisectDate = d3.bisector(function (data) { return data.xAxisValue }).right;

export const mousemoveCommon = (focus, height, width, xScale, yScale, data, etaType = 'combined') => {
  var x0 = xScale.invert(d3.mouse(this)[0]),
    i = bisectDate(data, x0, 1),
    d0 = data[i - 1],
    d1 = data[i],
    d = x0 - d0.xAxisValue > d1.xAxisValue - x0 ? d1 : d0;

  let yAxisValue = d.combinedYAxisValue;
  if (etaType === 1) {
    yAxisValue = d.eta1YAxisValue;
  } else if (etaType === 2) {
    yAxisValue = d.eta2YAxisValue;
  }
  focus.attr("transform", "translate(" + xScale(d.xAxisValue) + "," + yScale(yAxisValue) + ")");
  focus.select("text").text(function () { return `${yAxisValue}%`; });
  focus.style("cursor", "pointer")
  focus.select(".x-hover-line").attr("y2", height - yScale(yAxisValue) + 5);
  focus.select(".y-hover-line").attr("x2", width + width - 10);
}


export const etaDropdownData = [
  { name: "GREEN", id: "GREEN" },
  { name: "RED", id: "RED" },
  { name: "BLUE", id: "BLUE" }
];

export const apiEndpoints = {
  securityListEndpoint: '/calculators/securities',
  etaDetails: '/calculators/etas/details',
}

export const topics = '/topic/canyon/';
export const defaultTopic = 'WOW/RED';