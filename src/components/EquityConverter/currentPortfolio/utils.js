import { isEmpty, map } from 'lodash';

export const sectionTitle = 'Current Equity Position';
export const sectionDescription = '.';
export const stepInfo = 'Search a current share holding then a quantity to convert';
export const securityAutoComplete = 'SEARCH SHARE NAME OR TICKER CODE';

export const parseSecurityData = (data) => {
  if (!isEmpty(data)) {
    map(data, (underlying) => {
      if (typeof underlying === 'object') {
        underlying.value = `${underlying.longName} (${underlying.ticker})`;
        underlying.label = `${underlying.longName} (${underlying.ticker})`;
      }
    })
  }
  return data;
};

export const moreInformationContent = "What percentage of your invested capital is truly aligned to your unique objective & risk appetite? And what percentage is invested as consequence of having to own the whole share? If you could adjust these ratios by trading out of what's no longer serving you, for more of what does, would your answer still be the same?";
export const otherInformationContent = "What percentage of your invested capital is truly aligned to your unique objective & risk appetite? And what percentage is invested as consequence of having to own the whole share? If you could adjust these ratios by trading out of what's no longer serving you, for more of what does, would your answer still be the same?";
