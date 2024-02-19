import { toString } from "lodash";

export const GREEN = 'Green';
export const RED = 'Red';
export const BLUE = 'Blue';

export const getGrowthAndIncomeTitle = {
    [GREEN]: {
        growthTitle: 'PureGrowth',
        incomeTitle: 'PureDiv'
    },
    [BLUE]: {
        growthTitle: 'MaxGrowth',
        incomeTitle: 'DivGuard'
    },
    [RED]: {
        growthTitle: 'GrowthGuard',
        incomeTitle: 'MaxDiv'
    }
};

export const currencyFormat = (value) => {
   return new Intl.NumberFormat().format(Number(toString(value).replace(/[^0-9.-]+/g,"")));
}

/**
 * Dummy data
 */
export const addToPortfolio = {
    display: true,
    title: 'Add To Portfolio',
    callback: 'callBackFunction'
};

export const APIPath = {
    listOfSecurities: '/calculators/securities',
    etaDetails: '/calculators/etas/details',
}
