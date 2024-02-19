import { CubeModelConfigProps } from './types';

export const CubeConfig: CubeModelConfigProps = {
  views: [
    'cubeTopView',
    'cubeRightView',
    'cubeLeftView'
  ],
  infographics: {
    main: {
      topRight: {
        component: 'typography',
        first: 'Max',
        second: 'Div',
        superscript: 'ETA',
        etaType: 'red',
        profileType: 'income',
        height: 100,
        outerGlow: {
          top: -225,
          right: 20,
          background: 'radial-gradient(50% 50% at 50% 50%, #FCF4ED 78.65%, #FFFFFF 100%)'
        }
      },
      centerRight: {
        component: 'typography',
        first: 'Pure',
        second: 'Div',
        superscript: 'ETA',
        etaType: 'green',
        profileType: 'income',
        height: 90,
        outerGlow: {
          top: -205,
          right: 0,
          background: 'radial-gradient(50% 50% at 50% 50%, #205544 64.58%, #FFFFFF 100%)'
        }
      },
      bottomRight: {
        component: 'typography',
        first: 'Div',
        second: 'Guard',
        superscript: 'ETA',
        etaType: 'blue',
        profileType: 'income',
        height: 100,
        outerGlow: {
          bottom: -225,
          right: 20,
          background: 'radial-gradient(50% 50% at 50% 50%, #426299 82.29%, #FFFFFF 100%)'
        }
      },
      bottomLeft: {
        component: 'typography',
        first: 'Growth',
        second: 'Guard',
        superscript: 'ETA',
        etaType: 'red',
        profileType: 'growth',
        height: 100,
        outerGlow: {
          bottom: -225,
          left: 20,
          background: 'radial-gradient(50% 50% at 50% 50%, #A94447 78.12%, #FFFFFF 100%)'
        }
      },
      centerLeft: {
        component: 'typography',
        first: 'Pure',
        second: 'Growth',
        superscript: 'ETA',
        etaType: 'green',
        profileType: 'growth',
        height: 90,
        outerGlow: {
          top: -205,
          right: 0,
          background: 'radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #CDEAE4 45.31%)'
        }
      },
      topLeft: {
        component: 'typography',
        first: 'Max',
        second: 'Growth',
        superscript: 'ETA',
        etaType: 'blue',
        profileType: 'growth',
        height: 100,
        outerGlow: {
          top: -225,
          left: 20,
          background: 'radial-gradient(50% 50% at 50% 50%, #CBEBF7 78.65%, #FFFFFF 100%)'
        }
      },
      outerBottomRight: {
        component: 'typography',
        first: 'Ultra',
        second: 'Guard',
        superscript: 'ETA',
        etaType: 'purple',
        profileType: 'income',
        height: 30,
        outerGlow: {
          bottom: -185,
          right: -20,
          background: 'radial-gradient(50% 50% at 50% 50%, #7268AF 78.65%, #FFFFFF 100%)'
        }
      },
      outerTopLeft: {
        component: 'typography',
        first: 'Ultra',
        second: 'Growth',
        superscript: 'ETA',
        etaType: 'purple',
        profileType: 'growth',
        height: 30,
        outerGlow: {
          top: -190,
          left: -10,
          background: 'radial-gradient(50% 50% at 50% 50%, #BDBED8 76.56%, #FFFFFF 100%)'
        }
      },
    },
    perspective: {
      red: {
        main: {
          topRight: {
            component: 'typography',
            first: 'Max',
            second: 'Div',
            superscript: 'ETA',
            etaType: 'red',
            profileType: 'income',
          },
          bottomLeft: {
            component: 'typography',
            first: 'Growth',
            second: 'Guard',
            superscript: 'ETA',
            etaType: 'red',
            profileType: 'growth',
          }
        },
        allocation: {
          0: {
            view: 'cubeLeftView',
            property: 'top',
            style: {
              left: 15,
            }
          },
          1: {
            view: 'cubeRightView',
            property: 'bottom',
            adjustedPropertyValue: -22,
            style: {
              right: 10,
            }
          }
        }
      },
      green: {
        main: {
          centerRight: {
            component: 'typography',
            first: 'Pure',
            second: 'Div',
            superscript: 'ETA',
            etaType: 'green',
            profileType: 'income',
          },
          centerLeft: {
            component: 'typography',
            first: 'Pure',
            second: 'Growth',
            superscript: 'ETA',
            etaType: 'green',
            profileType: 'growth',
          }
        },
        allocation: {
          0: {
            view: 'cubeTopView',
            property: 'right',
            style: {
              top: 20,
              left: 'calc(50% - 12px)',
              transform: 'rotate(90deg)'
            }
          },
          1: {
            view: 'cubeTopView',
            property: 'right',
            style: {
              top: 20,
              left: 'calc(50% - 14px)',
              transform: 'rotate(90deg)'
            }
          }
        }
      },
      blue: {
        main: {
          bottomRight: {
            component: 'typography',
            first: 'Div',
            second: 'Guard',
            superscript: 'ETA',
            etaType: 'blue',
            profileType: 'growth',
          },
          topLeft: {
            component: 'typography',
            first: 'Max',
            second: 'Growth',
            superscript: 'ETA',
            etaType: 'blue',
            profileType: 'income',
          }
        },
        allocation: {
          0: {
            view: 'cubeLeftView',
            property: 'top',
            style: {
              left: 15,
            }
          },
          1: {
            view: 'cubeRightView',
            property: 'bottom',
            adjustedPropertyValue: -22,
            style: {
              right: 10,
            }
          }
        }
      },
      purple: {
        main: {
          outerBottomRight: {
            component: 'typography',
            first: 'Ultra',
            second: 'Guard',
            superscript: 'ETA',
            etaType: 'blue',
            profileType: 'growth',
          },
          outerTopLeft: {
            component: 'typography',
            first: 'Ultra',
            second: 'Growth',
            superscript: 'ETA',
            etaType: 'blue',
            profileType: 'income',
          }
        },
        allocation: {
          0: {
            view: 'cubeLeftView',
            property: 'top',
            style: {
              left: 15,
            }
          },
          1: {
            view: 'cubeRightView',
            property: 'bottom',
            adjustedPropertyValue: -22,
            style: {
              right: 10,
            }
          }
        },
      }
    },
    customShare: {
      red: {
        growth: {
          first: 'Growth',
          second: 'Guard',
          superscript: 'ETA',
          color: '#551919'
        },
        income: {
          first: 'Max',
          second: 'Div',
          superscript: 'ETA',
          color: '#FCF4ED'
        }
      },
      green: {
        growth: {
          first: 'Pure',
          second: 'Growth',
          superscript: 'ETA',
          color: '#CDEAE4'
        },
        income: {
          first: 'Pure',
          second: 'Div',
          superscript: 'ETA',
          color: '#205544'
        }
      },
      blue: {
        growth: {
          first: 'Max',
          second: 'Growth',
          superscript: 'ETA',
          color: '#CBEBF7'
        },
        income: {
          first: 'Div',
          second: 'Guard',
          superscript: 'ETA',
          color: '#426299'
        }
      },
      purple: {
        growth: {
          first: 'Ultra',
          second: 'Growth',
          superscript: 'ETA',
          color: '#DFE1F0'
        },
        income: {
          first: 'Ultra',
          second: 'Guard',
          superscript: 'ETA',
          color: '#342C53'
        }
      }
    },
    sliders: {
      red: {
        0: {
          trackStyle: {
            background: '#A94447',
            boxShadow: 'inset -3px 3px 6px rgba(135, 54, 57, 0.2), inset 3px -3px 6px rgba(135, 54, 57, 0.2), inset -3px -3px 6px rgba(203, 82, 85, 0.9), inset 3px 3px 8px rgba(135, 54, 57, 0.9)'
          },
          trackThumbStyle: {
            background: '#A94447',
            border: '2.01904px solid #551919',
            boxShadow: 'inset -5px 5px 10px rgba(68, 27, 28, 0.2), inset 5px -5px 10px rgba(68, 27, 28, 0.2), inset -5px -5px 10px rgba(255, 109, 114, 0.9), inset 5px 5px 13px rgba(68, 27, 28, 0.9)'
          }
        },
        1: {
          style: {
            transform: 'rotate(180deg)'
          },
          trackStyle: {
            background: '#C1ABA0',
            boxShadow: 'inset -3px 3px 6px rgba(154, 137, 128, 0.2), inset 3px -3px 6px rgba(154, 137, 128, 0.2), inset -3px -3px 6px rgba(232, 205, 192, 0.9), inset 3px 3px 8px rgba(154, 137, 128, 0.9)'
          },
          trackThumbStyle: {
            background: '#C1ABA0',
            border: '2.01904px solid #C1ABA0',
            boxShadow: 'inset -5px 5px 10px rgba(101, 98, 95, 0.2), inset 5px -5px 10px rgba(101, 98, 95, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(101, 98, 95, 0.9)'
          }
        },
      },
      green: {
        0: {
          trackStyle: {
            background: '#B5E0D5',
            boxShadow: 'inset -3px 3px 6px rgba(145, 179, 170, 0.2), inset 3px -3px 6px rgba(145, 179, 170, 0.2), inset -3px -3px 6px rgba(217, 255, 255, 0.9), inset 3px 3px 8px rgba(145, 179, 170, 0.9)'
          },
          trackThumbStyle: {
            background: '#B5E0D5',
            border: '2.01904px solid #B5E0D5',
            boxShadow: 'inset -5px 5px 10px rgba(72, 90, 85, 0.2), inset 5px -5px 10px rgba(72, 90, 85, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(72, 90, 85, 0.9)'
          }
        },
        1: {
          style: {
            transform: 'rotate(180deg)'
          },
          trackStyle: {
            background: '#205544',
            boxShadow: 'inset -3px 3px 6px rgba(26, 68, 54, 0.2), inset 3px -3px 6px rgba(26, 68, 54, 0.2), inset -3px -3px 6px rgba(38, 102, 82, 0.9), inset 3px 3px 8px rgba(26, 68, 54, 0.9)'
          },
          trackThumbStyle: {
            background: '#3D8E74',
            border: '2.01904px solid #205544',
            boxShadow: 'inset -5px 5px 10px rgba(24, 57, 46, 0.2), inset 5px -5px 10px rgba(24, 57, 46, 0.2), inset -5px -5px 10px rgba(98, 227, 186, 0.9), inset 5px 5px 13px rgba(24, 57, 46, 0.9)'
          }
        },
      },
      blue: {
        0: {
          trackStyle: {
            background: '#B1D6E8',
            boxShadow: 'inset -3px 3px 6px rgba(142, 171, 186, 0.2), inset 3px -3px 6px rgba(142, 171, 186, 0.2), inset -3px -3px 6px rgba(212, 255, 255, 0.9), inset 3px 3px 8px rgba(142, 171, 186, 0.9)'
          },
          trackThumbStyle: {
            background: '#C4E6F3',
            border: '2.01904px solid #CBEBF7',
            boxShadow: 'inset -5px 5px 10px rgba(78, 92, 97, 0.2), inset 5px -5px 10px rgba(78, 92, 97, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(78, 92, 97, 0.9)'
          }
        },
        1: {
          style: {
            transform: 'rotate(180deg)'
          },
          trackStyle: {
            background: '#1A2741',
            boxShadow: 'inset -3px 3px 6px rgba(21, 31, 52, 0.2), inset 3px -3px 6px rgba(21, 31, 52, 0.2), inset -3px -3px 6px rgba(31, 47, 78, 0.9), inset 3px 3px 8px rgba(21, 31, 52, 0.9)'
          },
          trackThumbStyle: {
            background: '#1A2741',
            border: '2.01904px solid #1A2741',
            boxShadow: 'inset -5px 5px 10px rgba(26, 39, 61, 0.2), inset 5px -5px 10px rgba(26, 39, 61, 0.2), inset -5px -5px 10px rgba(106, 157, 245, 0.9), inset 5px 5px 13px rgba(26, 39, 61, 0.9)'
          }
        },
      },
      purple: {
        0: {
          trackStyle: {
            background: '#BDBED8',
            boxShadow: 'inset -22px 22px 44px rgba(178, 179, 203, 0.2), inset 22px -22px 44px rgba(178, 179, 203, 0.2), inset -22px -22px 44px rgba(200, 201, 229, 0.9), inset 22px 22px 55px rgba(178, 179, 203, 0.9)'
          },
          trackThumbStyle: {
            background: '#BDBED8',
            border: '2.01904px solid #BDBED8',
            boxShadow: 'inset -5px 5px 10px rgba(78, 92, 97, 0.2), inset 5px -5px 10px rgba(78, 92, 97, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.9), inset 5px 5px 13px rgba(78, 92, 97, 0.9)'
          }
        },
        1: {
          style: {
            transform: 'rotate(180deg)'
          },
          trackStyle: {
            background: '#342C53',
            boxShadow: 'inset -3px 3px 6px rgba(42, 35, 66, 0.2), inset 3px -3px 6px rgba(42, 35, 66, 0.2), inset -3px -3px 6px rgba(62, 53, 100, 0.9), inset 3px 3px 8px rgba(42, 35, 66, 0.9)'
          },
          trackThumbStyle: {
            background: '#7268AF',
            border: '2.01904px solid #342C53',
            boxShadow: 'inset -6px 6px 12px rgba(46, 42, 70, 0.2), inset 6px -6px 12px rgba(46, 42, 70, 0.2), inset -6px -6px 12px rgba(182, 166, 255, 0.9), inset 6px 6px 15px rgba(46, 42, 70, 0.9)'
          }
        },
      }
    }
  }
}