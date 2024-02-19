import { ETAData } from 'common/interfaces/ETAShowcase/ETAData';
import { toString, map, isEmpty } from 'lodash';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';

export const securityHeaderLabel = 'Select a share to reveal the values within';
export const securityAutoComplete = 'SEARCH SHARE NAME OR TICKER CODE';
export const GREEN = 'Green';
export const RED = 'Red';
export const BLUE = 'Blue';
export const prismAnnualFee = 0.003;
export const whiteSecurityImageSuffix = '_wht';


export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat().format(
    Number(toString(value).replace(/[^0-9.-]+/g, ''))
  );
};

/**
 * @description This methods used to parse the ETA Security details before rendering
 * @param {object} data Security details from the API
 */
export const parseSecurityData = (data: Security[]) => {
  if (!isEmpty(data)) {
    map(data, (underlying) => {
      underlying.value = `${underlying.longName} (${underlying.ticker})`;
      underlying.text = `${underlying.longName} (${underlying.ticker})`;
    });
  }
  return data;
};

export const growthProfileContent = {
  blue: {
    label: 'MaxGrowth',
    incomeLabel: 'DivGuard',
    growthLabel: '',
    subLabel: 'ETA',
    riskProfile: 'AGGRESSIVE',
    renderOnlybar: false,
    colorCode: '#65CDF3',
    type: 'blue',
    yield: [],
    multipler: [],
    rangeLabel: 'GROWTH MULTIPIER',
    valueAllocation: 'Price growth only',
    capitalExposure: '1ST CAPITAL EXPOSURE',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #65CDF3 0%, rgba(101, 205, 243, 0.5) 100%), #1C59A8',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #65CDF3 0%, rgba(101, 205, 243, 0.5) 100%), #1C59A8',
    collapsedHeaderColor:
      'linear-gradient(130.53deg, #65CDF3 0%, rgba(101, 205, 243, 0.5) 100%), #1C59A8',
    collapsedContentColor:
      ' linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #65CDF3 0%, rgba(101, 205, 243, 0.5) 100%), #1C59A8',
  } as ProfileInterface,
  green: {
    label: 'PureGrowth',
    incomeLabel: 'PureDiv',
    growthLabel: '',
    subLabel: 'ETA',
    riskProfile: 'MARKET',
    renderOnlybar: false,
    colorCode: '#C7DB6D',
    type: 'green',
    multipler: [],
    yield: [],
    rangeLabel: 'GROWTH MULTIPIER',
    valueAllocation: 'Price growth only',
    capitalExposure: 'Shared',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #C7DB6D 0%, rgba(199, 219, 109, 0.5) 100%), #73BD59',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #C7DB6D 0%, rgba(199, 219, 109, 0.5) 100%), #73BD59',
    collapsedHeaderColor:
      'linear-gradient(130.53deg, #C7DB6D 0%, rgba(199, 219, 109, 0.5) 100%), #73BD59',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #C7DB6D 0%, rgba(199, 219, 109, 0.5) 100%), #73BD59',
  } as ProfileInterface,
  red: {
    label: 'GrowthGuard',
    incomeLabel: 'MaxDiv',
    growthLabel: '',
    subLabel: 'ETA',
    riskProfile: 'GUARDED',
    renderOnlybar: false,
    colorCode: '#DB3155',
    type: 'red',
    yield: [],
    multipler: [],
    rangeLabel: 'GROWTH MULTIPIER',
    valueAllocation: 'Price growth only',
    isCapitalGuardRequired: true,
    capitalGuardImageColor: '#db3155',
    capitalExposure: '2nd capital exposure',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    collapsedHeaderColor:
      'linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), #F5BD1A',
  } as ProfileInterface,
  purple: {
    label: 'UltraGrowth',
    incomeLabel: 'UltraGuard',
    growthLabel: '',
    subLabel: 'ETA',
    riskProfile: 'AGGRESSIVE',
    renderOnlybar: false,
    colorCode: '#DB3155',
    type: 'purple',
    yield: [],
    multipler: [],
    rangeLabel: 'GROWTH MULTIPIER',
    valueAllocation: 'Price growth only',
    isCapitalGuardRequired: false,
    capitalGuardImageColor: '#db3155',
    capitalExposure: '2nd capital exposure',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    collapsedHeaderColor:
      'linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), rgba(245, 189, 26, 0.8)',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #DB3155 0%, rgba(219, 49, 85, 0.6) 100%), #F5BD1A',
  } as ProfileInterface,
};

export const incomeProfileContent = {
  red: {
    label: 'MaxDiv',
    growthLabel: 'GrowthGuard',
    incomeLabel: '',
    subLabel: 'ETA',
    riskProfile: 'AGGRESSIVE',
    colorCode: '#F5BD1A',
    type: 'red',
    multipler: [],
    yield: [],
    rangeLabel: 'Dividend yield',
    valueAllocation: 'Dividends only',
    capitalExposure: '1ST CAPITAL EXPOSURE',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #F5BD1A 0%, rgba(245, 189, 26, 0.7) 100%), #DB3155',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)), linear-gradient(130.53deg, #F5BD1A 0%, rgba(245, 189, 26, 0.7) 100%), #DB3155',
    collapsedHeaderColor:
      'linear-gradient(130.53deg, #F5BD1A 0%, rgba(245, 189, 26, 0.7) 100%), #DB3155',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #F5BD1A 0%, rgba(245, 189, 26, 0.7) 100%), #DB3155',
  } as ProfileInterface,
  green: {
    label: 'PureDiv',
    growthLabel: 'PureGrowth',
    incomeLabel: '',
    subLabel: 'ETA',
    riskProfile: 'MARKET',
    colorCode: '#73BD59',
    type: 'green',
    multipler: [],
    yield: [],
    rangeLabel: 'Dividend yield',
    valueAllocation: 'Dividends only',
    capitalExposure: 'shared',
    expandedHeaderColor:
      'linear-gradient(131.96deg, #73BD59 -2.45%, rgba(115, 189, 89, 0.4) 100%), #C7DB6D',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(131.96deg, #73BD59 -2.45%, rgba(115, 189, 89, 0.4) 100%), #C7DB6D',
    collapsedHeaderColor:
      'linear-gradient(131.96deg, #73BD59 -2.45%, rgba(115, 189, 89, 0.4) 100%), #C7DB6D',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #F5BD1A 0%, rgba(245, 189, 26, 0.7) 100%), #DB3155',
  } as ProfileInterface,
  blue: {
    label: 'DivGuard',
    growthLabel: 'MaxGrowth',
    incomeLabel: '',
    subLabel: 'ETA',
    riskProfile: 'GUARDED',
    colorCode: '#1C59A8',
    type: 'blue',
    multipler: [],
    yield: [],
    rangeLabel: 'Dividend yield',
    valueAllocation: 'Dividends only',
    capitalExposure: '2ND CAPITAL EXPOSURE',
    isCapitalGuardRequired: true,
    capitalGuardImageColor: '#1c59ab',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    collapsedHeaderColor:
      ' linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
  } as ProfileInterface,
  purple: {
    label: 'UltraGuard',
    growthLabel: 'UltraGrowth',
    incomeLabel: '',
    subLabel: 'ETA',
    riskProfile: 'GUARDED',
    colorCode: '#1C59A8',
    type: 'purple',
    multipler: [],
    yield: [],
    rangeLabel: 'Dividend yield',
    valueAllocation: 'Dividends only',
    capitalExposure: '2ND CAPITAL EXPOSURE',
    isCapitalGuardRequired: true,
    capitalGuardImageColor: '#1c59ab',
    expandedHeaderColor:
      'linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    expandedContentColor:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    collapsedHeaderColor:
      ' linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
    collapsedContentColor:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), linear-gradient(130.53deg, #1C59A8 0%, rgba(28, 89, 168, 0.5) 100%), #65CDF3',
  } as ProfileInterface,
};

/**
 * @description This object stores info about the Example Stock
 */
export const exampleSecurityContent = {
  ticker: 'EXS',
  longName: 'Example Stock',
  forwardDivYield: 0.05,
  lastPrice: 100.0,
  marketCap: 10000.0,
  region: 'AU',
};

export const exampleRedETA: ETAData = {
  etaName: 'EXS Red',
  etaType: 'RED',
  underlyingSymbol: 'EXS',
  growthSymbol: 'EXSPRG',
  incomeSymbol: 'EXSPRI',
  growthLastPrice: 70,
  incomeLastPrice: 30,
  growthEstablishmentPrice: 70,
  incomeEstablishmentPrice: 30,
  growthMultiple: 1.43,
  etaYield: 0.1667,
  issueDate: '',
  maturityDate: '',
  growthValue: '',
  dividentValue: '',
  growthETAPrice: 0.0,
  growthPercentageofShare: 0.0,
  incomeETAPrice: 0.0,
  incomePercentageofShare: 0.0,
};

export const exampleGreenETA: ETAData = {
  etaName: 'EXS Green',
  etaType: 'GREEN',
  underlyingSymbol: 'EXS',
  growthSymbol: 'EXSPGG',
  incomeSymbol: 'EXSPGI',
  growthLastPrice: 50.0,
  incomeLastPrice: 50.0,
  growthEstablishmentPrice: 50.0,
  incomeEstablishmentPrice: 50.0,
  growthMultiple: 2.0,
  etaYield: 0.1,
  issueDate: '',
  maturityDate: '',
  growthValue: '',
  dividentValue: '',
  growthETAPrice: 0.0,
  growthPercentageofShare: 0.0,
  incomeETAPrice: 0.0,
  incomePercentageofShare: 0.0,
};

export const exampleBlueETA: ETAData = {
  etaName: 'EXS Blue',
  etaType: 'BLUE',
  underlyingSymbol: 'EXS',
  growthSymbol: 'EXSPBG',
  incomeSymbol: 'EXSPBI',
  growthLastPrice: 30.0,
  incomeLastPrice: 70.0,
  growthEstablishmentPrice: 30.0,
  incomeEstablishmentPrice: 70.0,
  growthMultiple: 3.33,
  etaYield: 0.0714,
  issueDate: '',
  maturityDate: '',
  growthValue: '',
  dividentValue: '',
  growthETAPrice: 0.0,
  growthPercentageofShare: 0.0,
  incomeETAPrice: 0.0,
  incomePercentageofShare: 0.0,
};

export const examplePurpleETA: ETAData = {
  etaName: 'EXS Purple',
  etaType: 'PURPLE',
  underlyingSymbol: 'EXS',
  growthSymbol: 'EXSPRG',
  incomeSymbol: 'EXSPRI',
  growthLastPrice: 70,
  incomeLastPrice: 30,
  growthEstablishmentPrice: 70,
  incomeEstablishmentPrice: 30,
  growthMultiple: 1.43,
  etaYield: 0.1667,
  issueDate: '',
  maturityDate: '',
  growthValue: '',
  dividentValue: '',
  growthETAPrice: 0.0,
  growthPercentageofShare: 0.0,
  incomeETAPrice: 0.0,
  incomePercentageofShare: 0.0,
};