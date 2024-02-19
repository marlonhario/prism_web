import { toString } from 'lodash';
import greenDivision from "assets/images/green-division.png";
import redDivision from "assets/images/red-division.png";
import blueDivision from "assets/images/blue-division.png";

export const primsAnnualFee = 0.30;
export const totalLineLength = 500;
export const lineGrowthStart = 0;

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
  { 
    name: "Green Division", 
    id: "GREEN", 
    colorCode:'#73BD59',
    imagePath: greenDivision,
    classname: 'green'
  },
  { 
    name: "Red Division", 
    id: "RED",
    colorCode:'#DB3155',
    imagePath: redDivision,
    classname: 'red'
  },
  { 
    name: "Blue Division", 
    id: "BLUE", 
    colorCode:'#1C59A8',
    imagePath: blueDivision,
    classname: 'blue'
  }
];

export const currencyFormat = (value) => {
   return new Intl.NumberFormat().format(Number(toString(value).replace(/[^0-9.-]+/g,"")));
}

export const APIPath = {
  listOfSecurities: '/calculators/securities',
  etaDetails: '/calculators/etas/details',
}

export const whiteSecurityImageSuffix = "_wht"
