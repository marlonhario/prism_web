import { Perspective, Profile } from 'components/NewCubeModel';
import { ETAPairingMap, PerspectiveConfig, SliderProps } from './types';

export const underlyingTepConfig = {
  actual: 85,
  normalised: 100
};

export const perspectivePairingMap: Record<Perspective, ETAPairingMap> = {
  red: {
    growth: {
      first: 'Growth',
      second: 'Guard',
    },
    income: {
      first: 'Max',
      second: 'Div',
    }
  },
  green: {
    growth: {
      first: 'Pure',
      second: 'Growth',
    },
    income: {
      first: 'Pure',
      second: 'Div',
    }
  },
  blue: {
    growth: {
      first: 'Max',
      second: 'Growth',
    },
    income: {
      first: 'Div',
      second: 'Guard',
    }
  },
  purple: {
    growth: {
      first: 'Ultra',
      second: 'Growth',
    },
    income: {
      first: 'Ultra',
      second: 'Guard',
    }
  }
};

export const perspectiveConfig: Record<Perspective, PerspectiveConfig> = {
  red: {
    growth: 0,
    income: 1,
    sharedLoss: 0,
    sharedUpside: 0
  },
  green: {
    growth: 0,
    income: 0,
    sharedLoss: 1,
    sharedUpside: 0
  },
  blue: {
    growth: 1,
    income: 0,
    sharedLoss: 0,
    sharedUpside: 0
  },
  purple: {
    growth: 1,
    income: 0,
    sharedLoss: 0,
    sharedUpside: 1
  }
};

export const slidersStyleConfig: Record<Perspective, Record<Profile, Partial<SliderProps>>> = {
  red: {
    growth: {
      iconFill: '#ffffff',
      trackThumbPointerStyle: {
        background: '#A94447',
        border: ' 0.5px solid #551919',
        boxShadow: 'inset -1px 1px 2px rgba(127, 51, 53, 0.2), inset 1px -1px 2px rgba(127, 51, 53, 0.2), inset -1px -1px 2px rgba(211, 85, 89, 0.9), inset 1px 1px 3px rgba(127, 51, 53, 0.9)'
      }
    },
    income: {
      iconFill: '#343741',
      trackThumbPointerStyle: {
        background: '#F4E9E2',
        border: '0.5px solid #F4E9E2',
        boxShadow: 'inset -1px 1px 2px rgba(183, 175, 170, 0.2), inset 1px -1px 2px rgba(183, 175, 170, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.9), inset 1px 1px 3px rgba(183, 175, 170, 0.9)'
      }
    }
  },
  green: {
    growth: {
      iconFill: '#343741',
      trackThumbPointerStyle: {
        background: '#CDEAE4',
        border: '0.5px solid #FFFFFF',
        boxShadow: 'inset 1px 1px 2px rgba(159, 187, 197, 0.2), inset -1px -1px 2px rgba(159, 187, 197, 0.2), inset 1px -1px 2px rgba(233, 255, 255, 0.9), inset -1px 1px 3px rgba(159, 187, 197, 0.9)'
      }
    },
    income: {
      iconFill: '#ffffff',
      trackThumbPointerStyle: {
        background: '#3D8E74',
        border: '0.5px solid #FFFFFF',
        boxShadow: 'inset -2px 2px 4px rgba(50, 116, 95, 0.2), inset 2px -2px 4px rgba(50, 116, 95, 0.2), inset -2px -2px 4px rgba(72, 168, 137, 0.9), inset 2px 2px 5px rgba(50, 116, 95, 0.9)'
      }
    }
  },
  blue: {
    growth: {
      iconFill: '#343741',
      trackThumbPointerStyle: {
        background: '#C4E7F3',
        border: '0.5px solid #FFFFFF',
        boxShadow: 'inset 1px 1px 2px rgba(159, 187, 197, 0.2), inset -1px -1px 2px rgba(159, 187, 197, 0.2), inset 1px -1px 2px rgba(233, 255, 255, 0.9), inset -1px 1px 3px rgba(159, 187, 197, 0.9)'
      }
    },
    income: {
      iconFill: '#ffffff',
      trackThumbPointerStyle: {
        background: '#426299',
        border: '0.5px solid #1A2741',
        boxShadow: 'inset -1px 1px 2px rgba(50, 74, 115, 0.2), inset 1px -1px 2px rgba(50, 74, 115, 0.2), inset -1px -1px 2px rgba(83, 123, 191, 0.9), inset 1px 1px 3px rgba(50, 74, 115, 0.9)'
      }
    }
  },
  purple: {
    growth: {
      iconFill: '#343741',
      trackThumbPointerStyle: {
        background: '#E0E1EE',
        border: '0.5px solid #BDBED8',
        boxShadow: 'inset -1px 1px 2px rgba(157, 158, 167, 0.2), inset 1px -1px 2px rgba(157, 158, 167, 0.2), inset -1px -1px 2px rgba(255, 255, 255, 0.9), inset 1px 1px 3px rgba(157, 158, 167, 0.9)'
      }
    },
    income: {
      iconFill: '#ffffff',
      trackThumbPointerStyle: {
        background: '#7268AF',
        border: '0.5px solid #BDBED8',
        boxShadow: 'inset -1px 1px 2px rgba(80, 73, 123, 0.2), inset 1px -1px 2px rgba(80, 73, 123, 0.2), inset -1px -1px 2px rgba(148, 135, 228, 0.9), inset 1px 1px 3px rgba(80, 73, 123, 0.9)'
      }
    }
  }
}

export const learnMoreMarketTabs = [
  'OVERVIEW',
  'TIMELINE',
  'HOW TO BUY',
  // 'INVESTOR CENTRE',
  'TERM SHEET',
  'PRICE CHART',
  'PDS'
];