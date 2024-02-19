const ETAProfiles = {
  MaxGrowth: {
    valueAllocation: 'Price growth only',
    capitalExposure: '1st capital exposure',
    type: 'blue spectrum',
    etaPartner: 'DivGuard',
    etaColor: 'blue',
    profileType: 'growth',
    name: {
      first: 'Max',
      last: 'Growth'
    }
  },
  PureGrowth: {
    valueAllocation: 'Price growth only',
    capitalExposure: 'Shared capital exposure',
    type: 'green spectrum',
    etaPartner: 'PureDiv',
    etaColor: 'green',
    profileType: 'growth',
    name: {
      first: 'Pure',
      last: 'Growth'
    }
  },
  GrowthGuard: {
    valueAllocation: 'Price growth only',
    capitalExposure: '2nd capital exposure',
    type: 'red spectrum',
    etaPartner: 'MaxDiv',
    etaColor: 'red',
    profileType: 'growth',
    name: {
      first: 'Growth',
      last: 'Guard'
    }
  },
  UltraGrowth: {
    valueAllocation: 'Price growth only',
    capitalExposure: 'Shared capital exposure',
    type: 'purple spectrum',
    etaPartner: 'UltraGrowth',
    etaColor: 'purple',
    profileType: 'growth',
    name: {
      first: 'Ultra',
      last: 'Growth'
    }
  },
  MaxDiv: {
    valueAllocation: 'Dividends only',
    capitalExposure: '1st capital exposure',
    type: 'red spectrum',
    etaPartner: 'GrowthGuard',
    etaColor: 'red',
    profileType: 'income',
    name: {
      first: 'Max',
      last: 'Div'
    }
  },
  PureDiv: {
    valueAllocation: 'Dividends only',
    capitalExposure: 'Shared capital exposure',
    type: 'green spectrum',
    etaPartner: 'PureGrowth',
    etaColor: 'green',
    profileType: 'income',
    name: {
      first: 'Pure',
      last: 'Div'
    }
  },
  DivGuard: {
    valueAllocation: 'Dividends only',
    capitalExposure: '2nd capital exposure',
    type: 'blue spectrum',
    etaPartner: 'MaxGrowth',
    etaColor: 'blue',
    profileType: 'income',
    name: {
      first: 'Div',
      last: 'Guard'
    }
  },
  UltraGuard: {
    valueAllocation: 'Dividends only',
    capitalExposure: 'Shared capital exposure',
    type: 'purple spectrum',
    etaPartner: 'UltraGuard',
    etaColor: 'purple',
    profileType: 'income',
    name: {
      first: 'Ultra',
      last: 'Guard'
    }
  }
}
export default ETAProfiles;